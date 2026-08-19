/**
 * Lead Magnet & Action Checklist Generator
 * Produces clean, printable 1-page HTML/PDF Action Checklists and Audit Templates
 * for high-converting comment-to-DM lead generation funnels.
 */

export function generateLeadMagnetHtml(draftPackage) {
  const { intake_id, title, pillar, account, chosen_hook, cta, formats } = draftPackage;
  const caro = formats?.carousel || {};
  const slides = caro.slides || [];
  const tc = formats?.talking_clip || {};

  const checklistItems = slides
    .filter((s) => s.slide_number >= 2 && s.slide_number <= 4)
    .map((s) => ({
      title: s.headline,
      description: s.body || s.visual_cue || ''
    }));

  const brandName = account === 'needmoney4maserati' ? 'Road to Maserati · LaunchGremlin' : 'LaunchGremlin Growth Suite';
  const brandAccent = account === 'needmoney4maserati' ? '#f59e0b' : '#10b981';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — Action Checklist & Implementation Swipe-File</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: #09090b;
      color: #f4f4f5;
      padding: 40px 24px;
      line-height: 1.5;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: #111827;
      border: 1px solid #1f2937;
      border-radius: 24px;
      padding: 48px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
    
    .header {
      border-bottom: 1px solid #1f2937;
      padding-bottom: 24px;
      margin-bottom: 32px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    
    .brand-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid ${brandAccent}40;
      color: ${brandAccent};
      padding: 6px 14px;
      border-radius: 100px;
      font-size: 11px;
      font-weight: 700;
      font-family: 'JetBrains Mono', monospace;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 12px;
    }
    
    h1 {
      font-size: 28px;
      font-weight: 900;
      letter-spacing: -0.5px;
      color: #ffffff;
      line-height: 1.25;
      margin-bottom: 8px;
    }
    
    .hook-quote {
      font-size: 15px;
      color: #9ca3af;
      font-style: italic;
      border-left: 3px solid ${brandAccent};
      padding-left: 12px;
      margin-top: 12px;
    }
    
    .doc-meta {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      color: #6b7280;
      text-align: right;
    }
    
    .section-title {
      font-size: 13px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: ${brandAccent};
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .checklist-grid {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 36px;
    }
    
    .check-item {
      background: #09090b;
      border: 1px solid #1f2937;
      border-radius: 16px;
      padding: 20px;
      display: flex;
      gap: 16px;
      align-items: flex-start;
      transition: all 0.2s;
    }
    
    .checkbox-box {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      border: 2px solid ${brandAccent};
      flex-shrink: 0;
      margin-top: 2px;
    }
    
    .check-content h3 {
      font-size: 16px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 4px;
    }
    
    .check-content p {
      font-size: 13px;
      color: #9ca3af;
      line-height: 1.6;
      white-space: pre-line;
    }
    
    .cta-box {
      background: linear-gradient(135deg, #09090b 0%, #06130e 100%);
      border: 1px solid ${brandAccent}60;
      border-radius: 20px;
      padding: 28px;
      text-align: center;
      margin-top: 36px;
    }
    
    .cta-box h4 {
      font-size: 18px;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 6px;
    }
    
    .cta-box p {
      font-size: 13px;
      color: #d1d5db;
      max-width: 500px;
      margin: 0 auto 16px auto;
    }
    
    .cta-btn {
      display: inline-block;
      background: ${brandAccent};
      color: #09090b;
      font-weight: 800;
      font-size: 13px;
      padding: 12px 28px;
      border-radius: 12px;
      text-decoration: none;
      box-shadow: 0 10px 20px -5px ${brandAccent}40;
    }
    
    .print-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #ffffff;
      color: #09090b;
      font-weight: 800;
      font-size: 13px;
      padding: 12px 24px;
      border-radius: 100px;
      border: none;
      cursor: pointer;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
    }
    
    @media print {
      body {
        background: #ffffff;
        color: #000000;
        padding: 0;
      }
      .container {
        border: none;
        box-shadow: none;
        padding: 0;
        background: #ffffff;
      }
      .print-btn {
        display: none;
      }
      .check-item {
        background: #ffffff;
        border: 1px solid #e5e7eb;
      }
      .check-content h3 { color: #000000; }
      .check-content p { color: #4b5563; }
      h1 { color: #000000; }
      .brand-badge { border: 1px solid #000000; color: #000000; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <div class="brand-badge">${brandName} · Action Template</div>
        <h1>${title}</h1>
        <div class="hook-quote">"${chosen_hook}"</div>
      </div>
      <div class="doc-meta">
        <div>Ref: ${intake_id}</div>
        <div>Date: ${new Date().toLocaleDateString('en-ZA')}</div>
      </div>
    </div>
    
    <div class="section-title">⚡ Step-by-Step Implementation Checklist</div>
    <div class="checklist-grid">
      ${checklistItems
        .map(
          (item, idx) => `
        <div class="check-item">
          <div class="checkbox-box"></div>
          <div class="check-content">
            <h3>Step 0${idx + 1}: ${item.title}</h3>
            <p>${item.description}</p>
          </div>
        </div>
      `
        )
        .join('')}
    </div>
    
    <div class="section-title">🎯 Video Script Core Takeaway</div>
    <div class="check-item" style="margin-bottom: 24px;">
      <div class="check-content">
        <p style="font-size: 14px; color: #e4e4e7;">
          "${tc.scenes?.map((s) => s.audio_spoken).join(' ') || chosen_hook}"
        </p>
      </div>
    </div>
    
    <div class="cta-box">
      <h4>Need this built for your South African business?</h4>
      <p>Skip the weeks of agency delays. LaunchGremlin builds high-converting, mobile-optimised digital storefronts in under 24 hours.</p>
      <a href="https://wa.me/27820000000?text=Hi%20LaunchGremlin,%20I%20downloaded%20the%20${encodeURIComponent(
        title
      )}%20checklist" class="cta-btn">
        💬 Claim Free WhatsApp Audit
      </a>
    </div>
  </div>
  
  <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
</body>
</html>`;
}

export function downloadLeadMagnetHtml(draftPackage) {
  const html = generateLeadMagnetHtml(draftPackage);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${draftPackage.intake_id || 'LG'}_ACTION_CHECKLIST.html`;
  link.click();
}
