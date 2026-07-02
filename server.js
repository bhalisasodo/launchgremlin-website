import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

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
const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "changeme";
const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE === "true";
const MAINTENANCE_SECRET = process.env.MAINTENANCE_SECRET || ADMIN_TOKEN;
const LEADS_QUERY_LIMIT = Number(process.env.LEADS_QUERY_LIMIT || 20);
const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000);
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX || 30);

const parseCookies = (cookieHeader = "") => {
    return cookieHeader
        .split(";")
        .map((pair) => pair.split("=").map((value) => value.trim()))
        .filter(([, value]) => value)
        .reduce((cookies, [key, value]) => {
            cookies[key] = decodeURIComponent(value);
            return cookies;
        }, {});
};

const isMaintenanceAuthorized = (req) => {
    const token =
        req.query.secret ||
        req.header("x-admin-token") ||
        req.header("authorization")?.replace(/^Bearer\s+/i, "");

    if (token === MAINTENANCE_SECRET) {
        return true;
    }

    const cookies = parseCookies(req.headers.cookie || "");
    return cookies.maintenance === MAINTENANCE_SECRET;
};

const renderMaintenancePage = (returnTo = "/", errorMessage) => {
    const escapedReturnTo = String(returnTo).replace(/"/g, "&quot;");
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>LaunchGremlin Maintenance</title>
  <style>
    body {font-family: system-ui, sans-serif; padding: 3rem; text-align: center; background: #0b1120; color: #f8fafc;}
    main {max-width: 540px; margin: auto;}
    h1 {font-size: 1.8rem; margin-bottom: 0.75rem;}
    p {margin: 0.75rem 0 1.5rem; color: #cbd5e1;}
    input, button {width: 100%; padding: 0.9rem 1rem; margin-top: 0.75rem; border-radius: 0.5rem; border: 1px solid #334155; background: #020617; color: #f8fafc;}
    button {border-color: #7c3aed; background: #7c3aed; color: white; cursor: pointer;}
    .error {color: #f87171; margin-top: 0.75rem;}
  </style>
</head>
<body>
  <main>
    <h1>LaunchGremlin is currently being finalized.</h1>
    <p>Please check back soon.</p>
    <form method="POST" action="/maintenance/unlock">
      <input type="hidden" name="returnTo" value="${escapedReturnTo}" />
      <input name="secret" type="password" placeholder="Admin secret" autocomplete="off" />
      <button type="submit">Unlock</button>
    </form>
    ${errorMessage ? `<div class="error">${String(errorMessage)}</div>` : ""}
    <p style="margin-top:1.25rem;font-size:0.9rem;color:#94a3b8;">If you already have the bypass secret, use it here or visit <code>/maintenance/bypass?secret=YOUR_SECRET</code>.</p>
  </main>
</body>
</html>`;
};

app.set("trust proxy", 1);
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    if (!MAINTENANCE_MODE) {
        return next();
    }

    if (
        req.path.startsWith("/api") ||
        req.path.startsWith("/maintenance") ||
        req.path === "/admin.html" ||
        req.path.startsWith("/admin")
    ) {
        return next();
    }

    if (isMaintenanceAuthorized(req)) {
        return next();
    }

    return res.status(503).send(renderMaintenancePage(req.originalUrl));
});
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

const sanitizeText = (value) => String(value || "").trim();

export const createLeadRecord = (lead) => ({
    ...lead,
    source: "launchgremlin-website",
    status: "new",
    created_at: new Date().toISOString(),
});

export const getHealthStatus = () => ({
    ok: true,
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
    storage: SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY ? "supabase" : "file",
    emailConfigured: Boolean(SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS),
    webhookConfigured: Boolean(WEBHOOK_URL),
    adminConfigured: Boolean(ADMIN_TOKEN),
});

const persistLeadToSupabase = async (lead) => {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
        return null;
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: "POST",
        headers: {
            apikey: SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
        },
        body: JSON.stringify([lead]),
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(`Supabase insert failed: ${response.status} ${message}`);
    }

    return { provider: "supabase" };
};

const persistLeadToFile = (lead) => {
    try {
        ensureLeadLog();
        const timestamp = new Date().toISOString();
        const entry = `${timestamp} | ${lead.name} | ${lead.email} | ${lead.company || "-"} | ${lead.service || "-"} | ${lead.challenge || "-"} | ${lead.timeline || "-"} | ${lead.budget || "-"} | ${lead.status || "new"} | ${lead.source || "unknown"}\n`;
        fs.appendFileSync(LEAD_LOG_PATH, entry, "utf8");
        return { provider: "file" };
    } catch (error) {
        console.warn("Failed to write lead log:", error.message);
        return { provider: "file", failed: true };
    }
};

export const persistLead = async (lead) => {
    try {
        const supabaseResult = await persistLeadToSupabase(lead);
        if (supabaseResult) {
            return supabaseResult;
        }
    } catch (error) {
        console.warn("Supabase persistence failed, falling back to local file storage:", error.message);
    }

    return persistLeadToFile(lead);
};

const readRecentLeadsFromFile = (limit = LEADS_QUERY_LIMIT) => {
    try {
        if (!fs.existsSync(LEAD_LOG_PATH)) {
            return [];
        }

        const lines = fs.readFileSync(LEAD_LOG_PATH, "utf8")
            .split(/\r?\n/)
            .filter(Boolean)
            .slice(-limit);

        return lines.map((line) => {
            const [created_at, name, email, company, service, challenge, timeline, budget, status, source] = line.split(" | ");
            return {
                created_at,
                name,
                email,
                company,
                service,
                challenge,
                timeline,
                budget,
                status,
                source,
            };
        });
    } catch (error) {
        console.warn("Failed to read lead log:", error.message);
        return [];
    }
};

const readRecentLeadsFromSupabase = async (limit = LEADS_QUERY_LIMIT) => {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
        return [];
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/leads?select=name,email,company,service,challenge,timeline,budget,status,source,created_at&order=created_at.desc&limit=${limit}`, {
        headers: {
            apikey: SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Supabase query failed: ${response.status}`);
    }

    return response.json();
};

export const getRecentLeads = async (limit = LEADS_QUERY_LIMIT) => {
    try {
        if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
            return await readRecentLeadsFromSupabase(limit);
        }
    } catch (error) {
        console.warn("Supabase lead lookup failed, falling back to local log:", error.message);
    }

    return readRecentLeadsFromFile(limit);
};

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

if (NODE_ENV !== "production") {
    app.get("/", (req, res) => {
        res.json({
            message: "LaunchGremlin backend is running.",
            endpoints: {
                health: "/api/health",
                submitLead: "/api/lead",
                recentLeads: "/api/leads",
                adminUI: "/admin.html",
            },
        });
    });
}

app.get(["/admin", "/admin/"], (req, res) => {
    res.redirect(302, "/admin.html");
});

app.get("/admin.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "admin.html"));
});

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

    const lead = createLeadRecord(rawLead);

    try {
        const storageResult = await persistLead(lead);

        const result = { storage: storageResult.provider };
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

app.get("/api/health", (req, res) => {
    res.json(getHealthStatus());
});

app.get("/api/leads", async (req, res) => {
    const token = req.header("x-admin-token") || req.header("authorization")?.replace(/^Bearer\s+/i, "");
    if (!ADMIN_TOKEN || token !== ADMIN_TOKEN) {
        return res.status(401).json({ message: "Admin token required." });
    }

    const leads = await getRecentLeads();
    return res.json({ count: leads.length, leads });
});

app.post("/api/webhook-receiver", (req, res) => {
    const received = {
        timestamp: new Date().toISOString(),
        body: req.body,
    };
    console.log("Webhook receiver received lead:", JSON.stringify(received, null, 2));
    res.json({ message: "Webhook received.", received });
});

app.get("/maintenance/unlock", (req, res) => {
    const returnTo = sanitizeText(req.query.returnTo) || "/";
    res.send(renderMaintenancePage(returnTo));
});

app.get("/maintenance/bypass", (req, res) => {
    const secret = req.query.secret;
    const returnTo = sanitizeText(req.query.returnTo) || "/";

    if (secret !== MAINTENANCE_SECRET) {
        return res.status(401).send(renderMaintenancePage(returnTo, "Invalid bypass secret."));
    }

    res.cookie("maintenance", MAINTENANCE_SECRET, {
        httpOnly: true,
        sameSite: "lax",
        secure: NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24,
    });
    return res.redirect(returnTo);
});

app.post("/maintenance/unlock", (req, res) => {
    const secret = sanitizeText(req.body.secret);
    const returnTo = sanitizeText(req.body.returnTo) || "/";

    if (secret !== MAINTENANCE_SECRET) {
        return res.status(401).send(renderMaintenancePage(returnTo, "Invalid secret."));
    }

    res.cookie("maintenance", MAINTENANCE_SECRET, {
        httpOnly: true,
        sameSite: "lax",
        secure: NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24,
    });
    return res.redirect(returnTo);
});

if (NODE_ENV === "production") {
    const publicPath = path.join(__dirname, "dist");
    app.use(express.static(publicPath));

    app.get(/^(?!\/api).*/, (req, res) => {
        res.sendFile(path.join(publicPath, "index.html"));
    });
}

const isMainModule = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMainModule) {
    app.listen(PORT, () => {
        console.log(`LaunchGremlin backend running on http://localhost:${PORT}`);
        console.log(`Environment: ${NODE_ENV}`);
    });
}

export { app };
