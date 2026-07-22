import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'launchgremlin_super_secret_dev_key';
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'bhalisasodo10@gmail.com';

// ---------------- Email Notification Dispatcher ----------------
const sendLeadEmailNotification = async (lead) => {
  const recipient = NOTIFICATION_EMAIL;
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: { user: smtpUser, pass: smtpPass },
      });

      const htmlContent = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #09090b; color: #ffffff; padding: 32px; border-radius: 16px; border: 1px solid #27272a;">
          <h2 style="color: #34d399; margin-top: 0; font-size: 22px;">🚀 New LaunchGremlin Lead Alert</h2>
          <p style="color: #a1a1aa; font-size: 14px;">A new lead has submitted a strategy inquiry for recipient: <strong>${recipient}</strong>.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 24px; color: #ffffff; font-size: 14px;">
            <tr style="border-bottom: 1px solid #27272a;"><td style="padding: 12px; font-weight: bold; color: #34d399; width: 140px;">Name</td><td style="padding: 12px;">${lead.name}</td></tr>
            <tr style="border-bottom: 1px solid #27272a;"><td style="padding: 12px; font-weight: bold; color: #34d399;">Email</td><td style="padding: 12px;"><a href="mailto:${lead.email}" style="color: #60a5fa; text-decoration: none;">${lead.email}</a></td></tr>
            <tr style="border-bottom: 1px solid #27272a;"><td style="padding: 12px; font-weight: bold; color: #34d399;">Company</td><td style="padding: 12px;">${lead.company || 'N/A'}</td></tr>
            <tr style="border-bottom: 1px solid #27272a;"><td style="padding: 12px; font-weight: bold; color: #34d399;">Service Pillar</td><td style="padding: 12px; font-weight: bold; color: #facc15;">${lead.service}</td></tr>
            <tr style="border-bottom: 1px solid #27272a;"><td style="padding: 12px; font-weight: bold; color: #34d399;">Budget</td><td style="padding: 12px;">${lead.budget || 'N/A'}</td></tr>
            <tr style="border-bottom: 1px solid #27272a;"><td style="padding: 12px; font-weight: bold; color: #34d399;">Summary / Details</td><td style="padding: 12px;">${lead.summary || lead.details || lead.challenge || 'N/A'}</td></tr>
            <tr><td style="padding: 12px; font-weight: bold; color: #34d399;">Submitted At</td><td style="padding: 12px; font-family: monospace;">${new Date().toLocaleString()}</td></tr>
          </table>
        </div>
      `;

      await transporter.sendMail({
        from: `"LaunchGremlin Engine" <${smtpUser}>`,
        to: recipient,
        subject: `🚨 New Lead: ${lead.name} — ${lead.service} (${lead.company || 'Direct Client'})`,
        html: htmlContent,
      });
      console.log(`[Email] Lead notification email dispatched to ${recipient}`);
    } catch (err) {
      console.error('[Email] Failed to send email via SMTP:', err.message);
    }
  } else {
    // Log formatted email alert payload when SMTP config is pending
    console.log(`\n======================================================`);
    console.log(`🚨 [AUTOMATED LEAD ALERT DISPATCHED TO: ${recipient}]`);
    console.log(`Name: ${lead.name}`);
    console.log(`Email: ${lead.email}`);
    console.log(`Company: ${lead.company || 'N/A'}`);
    console.log(`Service Pillar: ${lead.service}`);
    console.log(`Budget: ${lead.budget || 'N/A'}`);
    console.log(`Details: ${lead.summary || lead.details || lead.challenge || 'N/A'}`);
    console.log(`======================================================\n`);
  }
};

// Default development credentials
const DEV_ADMIN_PASSWORD = 'admin123';
let ADMIN_HASH = process.env.ADMIN_PASSWORD_HASH;

if (!ADMIN_HASH) {
  // Hash 'admin123' for development
  ADMIN_HASH = bcrypt.hashSync(DEV_ADMIN_PASSWORD, 10);
  console.log(`[Auth] No ADMIN_PASSWORD_HASH env variable found. Using default password: '${DEV_ADMIN_PASSWORD}'`);
}

// Check if we should use MongoDB or local JSON fallback
const MONGODB_URI = process.env.MONGODB_URI;
let useMongoose = false;

if (MONGODB_URI) {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('[Database] Connected to MongoDB successfully.');
    useMongoose = true;
  } catch (err) {
    console.error('[Database] MongoDB connection failed. Falling back to local JSON database.', err.message);
  }
} else {
  console.log('[Database] No MONGODB_URI provided. Using local JSON database (leads.json) for development.');
}

// ---------------- Mongoose Model ----------------
const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: String,
  service: { type: String, required: true },
  summary: { type: String, required: true },
  challenge: { type: String, required: true },
  timeline: String,
  budget: String,
  guide: String,
  status: { type: String, default: 'New' }, // New, Contacted, In Progress, Archived
  notes: { type: String, default: '' },
  created_at: { type: Date, default: Date.now }
});

const Lead = mongoose.model('Lead', leadSchema);

// ---------------- Local JSON DB Helpers ----------------
const JSON_DB_FILE = path.join(__dirname, 'leads.json');

const readLocalLeads = () => {
  try {
    if (!fs.existsSync(JSON_DB_FILE)) {
      fs.writeFileSync(JSON_DB_FILE, JSON.stringify([], null, 2));
      return [];
    }
    const data = fs.readFileSync(JSON_DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('[JSON DB] Error reading file:', err);
    return [];
  }
};

const writeLocalLeads = (leads) => {
  try {
    fs.writeFileSync(JSON_DB_FILE, JSON.stringify(leads, null, 2));
  } catch (err) {
    console.error('[JSON DB] Error writing file:', err);
  }
};

// ---------------- Auth Middleware ----------------
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token.' });
    }
    req.user = user;
    next();
  });
};

// ---------------- API Routes ----------------

// 1. Admin Login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  // Single admin user configuration
  if (username !== 'admin') {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  try {
    const isMatch = await bcrypt.compare(password, ADMIN_HASH);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
    return res.json({ token });
  } catch (err) {
    console.error('Login process error:', err);
    return res.status(500).json({ error: 'Login process error.' });
  }
});

// 2. Submit a new lead (Public)
app.post('/api/leads', async (req, res) => {
  const { name, email, company, service, summary, details, challenge, timeline, budget, guide } = req.body;

  if (!name || !email || !service) {
    return res.status(400).json({ error: 'Required fields (name, email, service) are missing.' });
  }

  const summaryText = summary || details || challenge || 'Direct Strategy Inquiry';
  const challengeText = challenge || details || summary || 'N/A';

  const leadData = {
    name,
    email,
    company: company || '',
    service,
    summary: summaryText,
    challenge: challengeText,
    timeline: timeline || '',
    budget: budget || '',
    guide: guide || '',
    status: 'New',
    notes: '',
    created_at: new Date().toISOString()
  };

  try {
    let createdLead;
    if (useMongoose) {
      const newLead = new Lead(leadData);
      createdLead = await newLead.save();
    } else {
      const leads = readLocalLeads();
      createdLead = {
        id: Math.random().toString(36).substring(2) + Date.now().toString(36),
        ...leadData
      };
      leads.push(createdLead);
      writeLocalLeads(leads);
    }

    // Trigger automated email alert to bhalisasodo10@gmail.com
    sendLeadEmailNotification(createdLead);

    return res.status(201).json(createdLead);
  } catch (err) {
    console.error('[API] Error saving lead:', err);
    return res.status(500).json({ error: 'Failed to save lead.' });
  }
});

// 3. Get all leads (Protected)
app.get('/api/leads', authenticateToken, async (req, res) => {
  try {
    if (useMongoose) {
      const leads = await Lead.find().sort({ created_at: -1 });
      return res.json(leads);
    } else {
      const leads = readLocalLeads();
      // Sort by created_at descending
      leads.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      return res.json(leads);
    }
  } catch (err) {
    console.error('[API] Error fetching leads:', err);
    return res.status(500).json({ error: 'Failed to fetch leads.' });
  }
});

// 4. Update a lead's status/notes (Protected)
app.patch('/api/leads/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  try {
    if (useMongoose) {
      const updatedLead = await Lead.findByIdAndUpdate(
        id,
        { ...(status && { status }), ...(notes !== undefined && { notes }) },
        { new: true }
      );
      if (!updatedLead) {
        return res.status(404).json({ error: 'Lead not found.' });
      }
      return res.json(updatedLead);
    } else {
      const leads = readLocalLeads();
      const leadIndex = leads.findIndex(l => l.id === id);
      if (leadIndex === -1) {
        return res.status(404).json({ error: 'Lead not found.' });
      }
      if (status) leads[leadIndex].status = status;
      if (notes !== undefined) leads[leadIndex].notes = notes;
      writeLocalLeads(leads);
      return res.json(leads[leadIndex]);
    }
  } catch (err) {
    console.error('[API] Error updating lead:', err);
    return res.status(500).json({ error: 'Failed to update lead.' });
  }
});

// Serve static assets in production
app.use(express.static(path.join(__dirname, '../dist')));

// Fallback all other routes to index.html for React SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`[Server] Backend running on http://localhost:${PORT}`);
});
