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
import mcpRouter from './mcp/routes/mcpRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });


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
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #09090b; color: #ffffff; padding: 36px 24px; border-radius: 20px; border: 1px solid #27272a; max-width: 600px; margin: 0 auto;">
          <!-- Header Branding -->
          <div style="border-bottom: 1px solid #27272a; padding-bottom: 20px; margin-bottom: 24px;">
            <h1 style="font-size: 24px; font-weight: 900; margin: 0; color: #ffffff; letter-spacing: -0.5px;">
              Launch<span style="color: #34d399;">Gremlin</span>
            </h1>
            <p style="font-size: 11px; color: #a1a1aa; margin: 4px 0 0 0; font-family: monospace; text-transform: uppercase; letter-spacing: 1px;">
              Inbound Client Scope Inquiry
            </p>
          </div>

          <!-- Client Summary Card -->
          <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 14px; padding: 20px; margin-bottom: 24px;">
            <h2 style="font-size: 18px; font-weight: 800; color: #34d399; margin: 0 0 16px 0;">
              ${lead.name}
            </h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr style="border-bottom: 1px solid #27272a;">
                <td style="padding: 10px 0; color: #a1a1aa; font-family: monospace; width: 140px;">Client Email</td>
                <td style="padding: 10px 0; font-weight: 700; color: #60a5fa;"><a href="mailto:${lead.email}" style="color: #60a5fa; text-decoration: none;">${lead.email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #27272a;">
                <td style="padding: 10px 0; color: #a1a1aa; font-family: monospace;">Phone / WhatsApp</td>
                <td style="padding: 10px 0; font-weight: 700; color: #34d399;"><a href="tel:${lead.phone || ''}" style="color: #34d399; text-decoration: none;">${lead.phone || 'N/A'}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #27272a;">
                <td style="padding: 10px 0; color: #a1a1aa; font-family: monospace;">Service Pillar</td>
                <td style="padding: 10px 0; font-weight: 700; color: #facc15;">${lead.service}</td>
              </tr>
              <tr style="border-bottom: 1px solid #27272a;">
                <td style="padding: 10px 0; color: #a1a1aa; font-family: monospace;">Budget Tier</td>
                <td style="padding: 10px 0; font-weight: 700; color: #ffffff;">${lead.budget || 'N/A'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #27272a;">
                <td style="padding: 10px 0; color: #a1a1aa; font-family: monospace;">Current Website</td>
                <td style="padding: 10px 0; color: #e4e4e7;">${lead.website ? `<a href="${lead.website}" style="color: #60a5fa; text-decoration: underline;">${lead.website}</a>` : 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #a1a1aa; font-family: monospace;">Submitted At</td>
                <td style="padding: 10px 0; color: #71717a; font-family: monospace;">${new Date().toLocaleString('en-ZA')}</td>
              </tr>
            </table>
          </div>

          <!-- Detailed Requirements Box -->
          <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 14px; padding: 20px; margin-bottom: 24px;">
            <h3 style="font-size: 11px; font-family: monospace; text-transform: uppercase; color: #a1a1aa; margin: 0 0 10px 0; letter-spacing: 1px;">
              Project Requirements & Scope Notes
            </h3>
            <p style="font-size: 14px; line-height: 1.6; color: #e4e4e7; margin: 0; white-space: pre-wrap;">
              ${lead.summary || lead.details || lead.challenge || 'No additional project details specified.'}
            </p>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"LaunchGremlin Dispatcher" <${smtpUser}>`,
        to: recipient,
        subject: `🔥 [LaunchGremlin Lead] ${lead.name} — ${lead.service} (${lead.budget || 'Inquiry'})`,
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
  phone: String,
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
  const { name, email, phone, company, service, summary, details, challenge, timeline, budget, guide } = req.body;

  if (!name || !email || !service) {
    return res.status(400).json({ error: 'Required fields (name, email, service) are missing.' });
  }

  const summaryText = summary || details || challenge || 'Direct Strategy Inquiry';
  const challengeText = challenge || details || summary || 'N/A';

  const leadData = {
    name,
    email,
    phone: phone || '',
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

// ---------------- Content Engine APIs ----------------
const CONTENT_ENGINE_DIR = path.join(__dirname, '../content-engine');
const INTAKE_REGISTRY_PATH = path.join(CONTENT_ENGINE_DIR, 'data/intake_registry.json');
const TRACKING_CSV_PATH = path.join(CONTENT_ENGINE_DIR, 'data/tracking_sheet.csv');
const DRAFTS_DIR = path.join(CONTENT_ENGINE_DIR, 'distribution/drafts');

app.get('/api/content-engine/intake', (req, res) => {
  try {
    if (fs.existsSync(INTAKE_REGISTRY_PATH)) {
      const data = JSON.parse(fs.readFileSync(INTAKE_REGISTRY_PATH, 'utf-8'));
      return res.json(data.items || []);
    }
  } catch (e) {
    console.error('[API] Error reading intake registry:', e);
  }
  return res.json([]);
});

app.post('/api/content-engine/intake', (req, res) => {
  try {
    const newItem = req.body;
    let data = { items: [], counters: {} };
    if (fs.existsSync(INTAKE_REGISTRY_PATH)) {
      data = JSON.parse(fs.readFileSync(INTAKE_REGISTRY_PATH, 'utf-8'));
    }
    data.items = [newItem, ...(data.items || [])];
    fs.writeFileSync(INTAKE_REGISTRY_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return res.json({ success: true, item: newItem });
  } catch (e) {
    console.error('[API] Error saving intake item:', e);
    return res.status(500).json({ error: 'Failed to save intake item.' });
  }
});

app.get('/api/content-engine/drafts', (req, res) => {
  try {
    const drafts = [];
    if (fs.existsSync(DRAFTS_DIR)) {
      const accounts = fs.readdirSync(DRAFTS_DIR);
      for (const acc of accounts) {
        const accPath = path.join(DRAFTS_DIR, acc);
        if (fs.statSync(accPath).isDirectory()) {
          const files = fs.readdirSync(accPath);
          for (const f of files) {
            if (f.endsWith('.json')) {
              try {
                const draft = JSON.parse(fs.readFileSync(path.join(accPath, f), 'utf-8'));
                drafts.push(draft);
              } catch (err) {}
            }
          }
        }
      }
    }
    return res.json(drafts);
  } catch (e) {
    console.error('[API] Error reading drafts:', e);
    return res.json([]);
  }
});

app.get('/api/content-engine/tracking', (req, res) => {
  try {
    if (fs.existsSync(TRACKING_CSV_PATH)) {
      const content = fs.readFileSync(TRACKING_CSV_PATH, 'utf-8');
      const lines = content.split('\n').filter(Boolean);
      if (lines.length > 1) {
        const headers = lines[0].split(',').map(h => h.trim());
        const rows = lines.slice(1).map(line => {
          const vals = line.split(',');
          const obj = {};
          headers.forEach((h, i) => {
            obj[h] = (vals[i] || '').replace(/^"|"$/g, '').trim();
          });
          return obj;
        });
        return res.json(rows);
      }
    }
  } catch (e) {
    console.error('[API] Error reading tracking sheet:', e);
  }
  return res.json([]);
});

// Save or update draft JSON
app.post('/api/content-engine/drafts', (req, res) => {
  try {
    const draft = req.body;
    const account = draft.account || 'launchgremlin';
    const accountDir = path.join(DRAFTS_DIR, account);
    if (!fs.existsSync(accountDir)) {
      fs.mkdirSync(accountDir, { recursive: true });
    }
    const filePath = path.join(accountDir, `${draft.intake_id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(draft, null, 2), 'utf-8');
    return res.json({ success: true, draft });
  } catch (e) {
    console.error('[API] Error saving draft:', e);
    return res.status(500).json({ error: 'Failed to save draft' });
  }
});

// Approve draft & generate ready-to-post markdown brief
app.post('/api/content-engine/approve', (req, res) => {
  try {
    const { id, reviewerNotes } = req.body;
    const readyDir = path.join(CONTENT_ENGINE_DIR, 'distribution/ready_to_post');
    const accounts = ['launchgremlin', 'needmoney4maserati'];
    let targetDraft = null;
    let targetAccount = 'launchgremlin';

    for (const acc of accounts) {
      const draftPath = path.join(DRAFTS_DIR, acc, `${id}.json`);
      if (fs.existsSync(draftPath)) {
        targetDraft = JSON.parse(fs.readFileSync(draftPath, 'utf-8'));
        targetAccount = acc;
        targetDraft.status = 'APPROVED';
        targetDraft.approved_at = new Date().toISOString();
        targetDraft.review_notes = reviewerNotes || 'Approved via API';
        fs.writeFileSync(draftPath, JSON.stringify(targetDraft, null, 2), 'utf-8');
        break;
      }
    }

    if (targetDraft) {
      const accReadyDir = path.join(readyDir, targetAccount);
      if (!fs.existsSync(accReadyDir)) fs.mkdirSync(accReadyDir, { recursive: true });
      const mdBriefPath = path.join(accReadyDir, `${id}_READY_TO_POST.md`);
      const tc = targetDraft.formats?.talking_clip || {};
      const car = targetDraft.formats?.carousel || {};
      const ba = targetDraft.formats?.before_after || {};
      const co = targetDraft.formats?.caption_only || {};

      const mdContent = `# READY TO POST BRIEF: ${id}
**Account:** @${targetAccount}
**Pillar:** ${targetDraft.pillar}
**Title:** ${targetDraft.title}
**Chosen Hook:** "${targetDraft.chosen_hook}"
**Default CTA:** ${targetDraft.cta}
**Approved At:** ${new Date().toISOString()}

---

## 1. Short-Form Video (Reels / TikTok)
**Duration:** ${tc.duration || '45-60s'}
**Hook:** "${tc.hook || targetDraft.chosen_hook}"

### Scenes:
${tc.scenes?.map(sc => `[Scene ${sc.scene}]\nVisual: ${sc.visual}\nSpoken: "${sc.audio_spoken}"\nText: ${sc.on_screen_text}`).join('\n\n')}

### Instagram Caption:
\`\`\`
${tc.captions?.instagram || ''}
\`\`\`

---

## 2. 5-Slide Carousel Guide
${car.slides?.map(sl => `Slide ${sl.slide_number}: ${sl.headline}\nVisual: ${sl.visual_cue}`).join('\n\n')}

---

## 3. Before & After
${ba.before_state?.description} -> ${ba.after_state?.description}

---

## 4. Text Post
${co.text || ''}
`;
      fs.writeFileSync(mdBriefPath, mdContent, 'utf-8');
      return res.json({ success: true, draft: targetDraft, briefPath: mdBriefPath });
    }

    return res.status(404).json({ error: 'Draft not found' });
  } catch (e) {
    console.error('[API] Error approving draft:', e);
    return res.status(500).json({ error: 'Failed to approve draft' });
  }
});

// Update tracking metrics
app.post('/api/content-engine/metrics', (req, res) => {
  try {
    const { id, views, saves, comments, shares, paid_spend } = req.body;
    if (fs.existsSync(TRACKING_CSV_PATH)) {
      const content = fs.readFileSync(TRACKING_CSV_PATH, 'utf-8');
      const lines = content.split('\n');
      if (lines.length > 1) {
        const headers = lines[0].split(',').map(h => h.trim());
        const postIdx = headers.indexOf('post_id');
        const viewsIdx = headers.indexOf('views');
        const savesIdx = headers.indexOf('saves');
        const comIdx = headers.indexOf('comments');
        const shaIdx = headers.indexOf('shares');
        const paidSpendIdx = headers.indexOf('paid_spend');
        const paidCandIdx = headers.indexOf('paid_candidate');

        const updatedLines = [lines[0]];
        let matched = false;

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;
          const vals = line.split(',');
          if (vals[postIdx]?.replace(/^"|"$/g, '').trim() === id) {
            matched = true;
            if (views !== undefined && viewsIdx >= 0) vals[viewsIdx] = String(views);
            if (saves !== undefined && savesIdx >= 0) vals[savesIdx] = String(saves);
            if (comments !== undefined && comIdx >= 0) vals[comIdx] = String(comments);
            if (shares !== undefined && shaIdx >= 0) vals[shaIdx] = String(shares);
            if (paid_spend !== undefined && paidSpendIdx >= 0) vals[paidSpendIdx] = `"${paid_spend}"`;

            const s = Number(saves || vals[savesIdx] || 0);
            const v = Math.max(Number(views || vals[viewsIdx] || 1), 1);
            const sh = Number(shares || vals[shaIdx] || 0);
            const c = Number(comments || vals[comIdx] || 0);
            const score = (s * 2 + sh * 3 + c) / v;
            const isCand = s >= 20 || score >= 0.045;
            if (paidCandIdx >= 0) vals[paidCandIdx] = `"${isCand ? 'YES' : 'NO'}"`;
          }
          updatedLines.push(vals.join(','));
        }

        if (matched) {
          fs.writeFileSync(TRACKING_CSV_PATH, updatedLines.join('\n'), 'utf-8');
          return res.json({ success: true, id });
        }
      }
    }
    return res.json({ success: true, updated: false });
  } catch (e) {
    console.error('[API] Error updating metrics:', e);
    return res.status(500).json({ error: 'Failed to update metrics' });
  }
});


// ---------------- Digital Business Card API ----------------
const UPLOADS_DIR = path.join(__dirname, 'uploads', 'avatars');
const CARDS_DATA_DIR = path.join(__dirname, 'data', 'cards');

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
if (!fs.existsSync(CARDS_DATA_DIR)) fs.mkdirSync(CARDS_DATA_DIR, { recursive: true });

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 1. Upload Avatar Photo
app.post('/api/cards/upload-avatar', (req, res) => {
  try {
    const { slug, imageBase64 } = req.body;
    if (!imageBase64) return res.status(400).json({ error: 'No image data provided' });

    const matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let buffer;
    let ext = 'jpg';
    if (matches && matches.length === 3) {
      buffer = Buffer.from(matches[2], 'base64');
      if (matches[1].includes('png')) ext = 'png';
      else if (matches[1].includes('webp')) ext = 'webp';
    } else {
      buffer = Buffer.from(imageBase64, 'base64');
    }

    const cleanSlug = (slug || 'card').replace(/[^a-z0-9_-]/gi, '');
    const filename = `avatar_${cleanSlug}_${Date.now()}.${ext}`;
    const filePath = path.join(UPLOADS_DIR, filename);
    fs.writeFileSync(filePath, buffer);

    const avatarUrl = `/uploads/avatars/${filename}`;
    return res.json({ success: true, avatarUrl, filename });
  } catch (err) {
    console.error('[API] Error uploading avatar:', err);
    return res.status(500).json({ error: 'Failed to upload avatar' });
  }
});

// 2. Save Card Profile
app.post('/api/cards/save', (req, res) => {
  try {
    const card = req.body;
    const slug = (card.slug || 'card').toLowerCase().trim();
    const cardPath = path.join(CARDS_DATA_DIR, `${slug}.json`);
    fs.writeFileSync(cardPath, JSON.stringify(card, null, 2), 'utf-8');
    return res.json({ success: true, slug, url: `/c/${slug}` });
  } catch (err) {
    console.error('[API] Error saving card:', err);
    return res.status(500).json({ error: 'Failed to save card' });
  }
});

// 3. Get Card Profile by Slug
app.get('/api/cards/:slug', (req, res) => {
  try {
    const slug = req.params.slug.toLowerCase().trim();
    const cardPath = path.join(CARDS_DATA_DIR, `${slug}.json`);
    if (fs.existsSync(cardPath)) {
      const card = JSON.parse(fs.readFileSync(cardPath, 'utf-8'));
      return res.json({ success: true, card });
    }
    return res.status(404).json({ error: 'Card not found' });
  } catch (err) {
    console.error('[API] Error fetching card:', err);
    return res.status(500).json({ error: 'Failed to fetch card' });
  }
});

// ---------------- Model Context Protocol (MCP) API ----------------
// Exposes SSE stream (/api/mcp/sse) and message dispatcher for Google Spark / AI agents
app.use('/api/mcp', mcpRouter);

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
