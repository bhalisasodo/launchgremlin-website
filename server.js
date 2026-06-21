import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || "development";
const EMAIL_TO = process.env.EMAIL_TO || "bhalisasodo10@gmail.com";
const EMAIL_FROM = process.env.EMAIL_FROM || "no-reply@launchgremlin.com";
const SMTP_HOST = process.env.SMTP_HOST || "";
const SMTP_PORT = Number(process.env.SMTP_PORT || 0);
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const WEBHOOK_URL = process.env.WEBHOOK_URL || "";
const LEAD_LOG_PATH = process.env.LEAD_LOG_PATH || "logs/leads.log";
const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000);
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX || 30);

app.set("trust proxy", 1);
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "20kb" }));
app.use(
    rateLimit({
        windowMs: RATE_LIMIT_WINDOW_MS,
        max: RATE_LIMIT_MAX,
        standardHeaders: true,
        legacyHeaders: false,
        message: "Too many requests from this IP, please try again later.",
    }),
);

const ensureLeadLog = () => {
    const dir = path.dirname(LEAD_LOG_PATH);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

const logLead = (lead) => {
    try {
        ensureLeadLog();
        const timestamp = new Date().toISOString();
        const entry = `${timestamp} | ${lead.name} | ${lead.email} | ${lead.company || "-"} | ${lead.service || "-"} | ${lead.challenge || "-"} | ${lead.timeline || "-"} | ${lead.budget || "-"}\n`;
        fs.appendFileSync(LEAD_LOG_PATH, entry, "utf8");
    } catch (error) {
        console.warn("Failed to write lead log:", error.message);
    }
};

const sanitizeText = (value) => String(value || "").trim();

const createEmailBody = ({ name, email, company, summary, service, challenge, timeline, budget, guide }) => {
    return `New LaunchGremlin lead:\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || "-"}\nService interest: ${service || "Not selected"}\nMain challenge: ${challenge || "Not specified"}\nTimeline: ${timeline || "Not specified"}\nBudget: ${budget || "Not specified"}\n\nProject summary:\n${summary}\n\nGenerated guide:\n${guide}`;
};

const sendEmail = async ({ name, email, company, summary, guide }) => {
    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    });

    const mailOptions = {
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: `LaunchGremlin lead from ${name || "new lead"}`,
        text: createEmailBody({ name, email, company, summary, guide }),
    };

    await transporter.sendMail(mailOptions);
};

const sendWebhook = async ({ name, email, company, summary, guide }) => {
    if (!WEBHOOK_URL) {
        return null;
    }

    const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            source: "launchgremlin-website",
            name,
            email,
            company,
            summary,
            guide,
        }),
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(`Webhook error: ${response.status} ${message}`);
    }

    return await response.text();
};

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

app.post("/api/lead", async (req, res) => {
    const rawLead = {
        name: sanitizeText(req.body.name),
        email: sanitizeText(req.body.email),
        company: sanitizeText(req.body.company),
        summary: sanitizeText(req.body.summary),
        service: sanitizeText(req.body.service),
        challenge: sanitizeText(req.body.challenge),
        timeline: sanitizeText(req.body.timeline),
        budget: sanitizeText(req.body.budget),
        guide: sanitizeText(req.body.guide),
    };

    const errors = [];
    if (!rawLead.name) errors.push("Name is required.");
    if (!rawLead.email) {
        errors.push("Email is required.");
    } else if (!isValidEmail(rawLead.email)) {
        errors.push("Email is not valid.");
    }
    if (!rawLead.summary) errors.push("Project summary is required.");
    if (rawLead.summary.length > 5000) errors.push("Project summary is too long.");
    if (rawLead.guide.length > 20000) errors.push("Generated guide is too long.");

    if (errors.length > 0) {
        return res.status(400).json({ message: errors.join(" ") });
    }

    const lead = { ...rawLead };

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
        if (!WEBHOOK_URL) {
            return res.status(500).json({
                message: "No mailer or webhook configuration found. Set SMTP_* or WEBHOOK_URL in .env.",
            });
        }
    }

    try {
        logLead(lead);

        const result = {};
        if (WEBHOOK_URL) {
            result.webhook = await sendWebhook(lead);
        }

        if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS) {
            await sendEmail(lead);
            result.email = "sent";
        }

        return res.json({ message: "Lead submitted.", guide: lead.guide, result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message || "Failed to submit lead." });
    }
});

app.post("/api/webhook-receiver", (req, res) => {
    const received = {
        timestamp: new Date().toISOString(),
        body: req.body,
    };
    console.log("Webhook receiver received lead:", JSON.stringify(received, null, 2));
    res.json({ message: "Webhook received.", received });
});

if (NODE_ENV === "production") {
    const publicPath = path.join(__dirname, "dist");
    app.use(express.static(publicPath));

    app.get("*", (req, res) => {
        res.sendFile(path.join(publicPath, "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`LaunchGremlin backend running on http://localhost:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});
