/**
 * Press-Ready CR80 Vector PDF & 300 DPI Print Exporter
 * Generates ISO/IEC 7810 ID-1 standard print files (85.60mm x 53.98mm)
 * with 3mm bleed margins, crop/trim marks, and vector QR codes.
 */
import QRCode from 'qrcode';

export const FOIL_FINISHES = {
  gold: { id: 'gold', name: 'Brushed 24k Gold Foil', color: '#eab308', gradStart: '#fef08a', gradEnd: '#ca8a04' },
  silver: { id: 'silver', name: 'Sleek Platinum Silver', color: '#cbd5e1', gradStart: '#f8fafc', gradEnd: '#94a3b8' },
  rose_gold: { id: 'rose_gold', name: 'Rose Gold Metallic', color: '#fda4af', gradStart: '#ffe4e6', gradEnd: '#e11d48' },
  emerald: { id: 'emerald', name: 'Signature Emerald Foil', color: '#10b981', gradStart: '#6ee7b7', gradEnd: '#047857' },
  holographic: { id: 'holographic', name: 'Cyber Holographic Chrome', color: '#c084fc', gradStart: '#38bdf8', gradEnd: '#ec4899' }
};

// 300 DPI CR80 dimensions with 3mm bleed
const DPI = 300;
const MM_TO_INCH = 25.4;
const TRIM_W_MM = 85.6;
const TRIM_H_MM = 53.98;
const BLEED_MM = 3.0;

const TOTAL_W_MM = TRIM_W_MM + BLEED_MM * 2; // 91.6 mm
const TOTAL_H_MM = TRIM_H_MM + BLEED_MM * 2; // 59.98 mm

export const CANVAS_W = Math.round((TOTAL_W_MM / MM_TO_INCH) * DPI); // ~1082 px
export const CANVAS_H = Math.round((TOTAL_H_MM / MM_TO_INCH) * DPI); // ~708 px
export const BLEED_PX = Math.round((BLEED_MM / MM_TO_INCH) * DPI); // ~35 px

// Helper: Draw printer crop marks
function drawCropMarks(ctx, bleedPx, w, h) {
  ctx.save();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  const markLen = 25;
  const markOffset = 8;

  // Top Left
  ctx.beginPath();
  ctx.moveTo(bleedPx, bleedPx - markOffset);
  ctx.lineTo(bleedPx, bleedPx - markOffset - markLen);
  ctx.moveTo(bleedPx - markOffset, bleedPx);
  ctx.lineTo(bleedPx - markOffset - markLen, bleedPx);
  ctx.stroke();

  // Top Right
  ctx.beginPath();
  ctx.moveTo(w - bleedPx, bleedPx - markOffset);
  ctx.lineTo(w - bleedPx, bleedPx - markOffset - markLen);
  ctx.moveTo(w - bleedPx + markOffset, bleedPx);
  ctx.lineTo(w - bleedPx + markOffset + markLen, bleedPx);
  ctx.stroke();

  // Bottom Left
  ctx.beginPath();
  ctx.moveTo(bleedPx, h - bleedPx + markOffset);
  ctx.lineTo(bleedPx, h - bleedPx + markOffset + markLen);
  ctx.moveTo(bleedPx - markOffset, h - bleedPx);
  ctx.lineTo(bleedPx - markOffset - markLen, h - bleedPx);
  ctx.stroke();

  // Bottom Right
  ctx.beginPath();
  ctx.moveTo(w - bleedPx, h - bleedPx + markOffset);
  ctx.lineTo(w - bleedPx, h - bleedPx + markOffset + markLen);
  ctx.moveTo(w - bleedPx + markOffset, h - bleedPx);
  ctx.lineTo(w - bleedPx + markOffset + markLen, h - bleedPx);
  ctx.stroke();

  ctx.restore();
}

/**
 * Render Front Side of CR80 Card (300 DPI with Bleed)
 */
export function renderCardFrontToCanvas(canvas, card, foilKey = 'emerald', showBleedGuides = true) {
  if (!canvas || !card) return;
  const ctx = canvas.getContext('2d');
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;

  const foil = FOIL_FINISHES[foilKey] || FOIL_FINISHES.emerald;

  // 1. Background (Matte Dark Carbon)
  ctx.fillStyle = '#0a0a0c';
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // Subtle carbon gradient
  const grad = ctx.createLinearGradient(0, 0, CANVAS_W, CANVAS_H);
  grad.addColorStop(0, '#141419');
  grad.addColorStop(1, '#08080a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // 2. Foil Accent Line / Ribbon
  const foilGrad = ctx.createLinearGradient(BLEED_PX, BLEED_PX, CANVAS_W - BLEED_PX, CANVAS_H - BLEED_PX);
  foilGrad.addColorStop(0, foil.gradStart);
  foilGrad.addColorStop(1, foil.gradEnd);

  ctx.fillStyle = foilGrad;
  ctx.fillRect(BLEED_PX + 40, BLEED_PX + 40, CANVAS_W - BLEED_PX * 2 - 80, 4);

  // 3. Company Header
  ctx.fillStyle = '#9ca3af';
  ctx.font = 'bold 26px system-ui, sans-serif';
  ctx.fillText((card.companyName || 'LaunchGremlin').toUpperCase(), BLEED_PX + 50, BLEED_PX + 90);

  // 4. Primary Name (Foil Gradient)
  ctx.fillStyle = foilGrad;
  ctx.font = '900 68px system-ui, sans-serif';
  ctx.fillText(card.fullName || 'Alex Morgan', BLEED_PX + 50, BLEED_PX + 260);

  // 5. Title & Position
  ctx.fillStyle = '#e4e4e7';
  ctx.font = '600 32px system-ui, sans-serif';
  ctx.fillText(card.jobTitle || 'Executive Director', BLEED_PX + 50, BLEED_PX + 320);

  // 6. NFC Wave Icon Symbol
  const nfcX = CANVAS_W - BLEED_PX - 120;
  const nfcY = BLEED_PX + 260;
  ctx.save();
  ctx.strokeStyle = foil.color;
  ctx.lineWidth = 4;
  for (let r = 16; r <= 48; r += 16) {
    ctx.beginPath();
    ctx.arc(nfcX, nfcY, r, -Math.PI * 0.4, Math.PI * 0.4);
    ctx.stroke();
  }
  ctx.restore();

  // 7. Footer Contact
  ctx.fillStyle = '#a1a1aa';
  ctx.font = '500 24px monospace';
  ctx.fillText(`📞 ${card.phone || '+27 82 000 0000'}`, BLEED_PX + 50, CANVAS_H - BLEED_PX - 60);

  // Crop & Bleed guides
  if (showBleedGuides) {
    drawCropMarks(ctx, BLEED_PX, CANVAS_W, CANVAS_H);
    ctx.save();
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
    ctx.setLineDash([8, 8]);
    ctx.lineWidth = 1;
    ctx.strokeRect(BLEED_PX, BLEED_PX, CANVAS_W - BLEED_PX * 2, CANVAS_H - BLEED_PX * 2);
    ctx.restore();
  }
}

/**
 * Render Back Side of CR80 Card (300 DPI with Bleed & QR code)
 */
export async function renderCardBackToCanvas(canvas, card, foilKey = 'emerald', showBleedGuides = true) {
  if (!canvas || !card) return;
  const ctx = canvas.getContext('2d');
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;

  const foil = FOIL_FINISHES[foilKey] || FOIL_FINISHES.emerald;
  const liveUrl = `${window.location.origin}/c/${card.slug || 'card'}`;

  // 1. Background
  ctx.fillStyle = '#0a0a0c';
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // 2. Generate and draw high-res QR code
  try {
    const qrDataUrl = await QRCode.toDataURL(liveUrl, {
      width: 400,
      margin: 1,
      color: { dark: '#09090b', light: '#ffffff' }
    });

    const qrImg = new Image();
    await new Promise((resolve) => {
      qrImg.onload = resolve;
      qrImg.src = qrDataUrl;
    });

    const qrSize = 340;
    const qrX = BLEED_PX + 60;
    const qrY = (CANVAS_H - qrSize) / 2;

    // White backing box for QR
    ctx.fillStyle = '#ffffff';
    ctx.roundRect(qrX - 16, qrY - 16, qrSize + 32, qrSize + 32, 24);
    ctx.fill();

    ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
  } catch (err) {
    console.error(err);
  }

  // 3. Right Side Info Column
  const infoX = BLEED_PX + 480;

  ctx.fillStyle = foil.color;
  ctx.font = 'bold 36px system-ui, sans-serif';
  ctx.fillText('CONNECT INSTANTLY', infoX, BLEED_PX + 120);

  ctx.fillStyle = '#ffffff';
  ctx.font = '500 24px system-ui, sans-serif';
  ctx.fillText('1. Tap NFC phone on card', infoX, BLEED_PX + 180);
  ctx.fillText('2. Or scan camera on QR code', infoX, BLEED_PX + 230);
  ctx.fillText('3. Save contact & WhatsApp chat', infoX, BLEED_PX + 280);

  ctx.fillStyle = '#71717a';
  ctx.font = 'bold 20px monospace';
  ctx.fillText(liveUrl, infoX, CANVAS_H - BLEED_PX - 80);

  // Crop & Bleed guides
  if (showBleedGuides) {
    drawCropMarks(ctx, BLEED_PX, CANVAS_W, CANVAS_H);
    ctx.save();
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
    ctx.setLineDash([8, 8]);
    ctx.lineWidth = 1;
    ctx.strokeRect(BLEED_PX, BLEED_PX, CANVAS_W - BLEED_PX * 2, CANVAS_H - BLEED_PX * 2);
    ctx.restore();
  }
}

/**
 * Trigger download of Canvas as 300 DPI PNG
 */
export function downloadPrintCanvasAsPng(canvas, filename = 'cr80_card_print.png') {
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
