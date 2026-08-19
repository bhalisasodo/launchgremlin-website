/**
 * Branded QR Code Studio Utility
 * High-Resolution Canvas QR renderer with Error Correction Level 'H' (30%),
 * Center Avatar/Logo Overlay with safety margin, and Vector SVG/PNG exporters.
 */
import QRCode from 'qrcode';

export const QR_STYLES = {
  classic: { id: 'classic', name: 'Classic Sharp Matrix' },
  rounded: { id: 'rounded', name: 'Modern Rounded Dots' },
  cyber: { id: 'cyber', name: 'Cyber Neon Emerald' }
};

/**
 * Render High-Res Branded QR to Canvas
 */
export async function renderBrandedQrToCanvas({
  canvas,
  text,
  size = 1200,
  darkColor = '#09090b',
  lightColor = '#ffffff',
  style = 'rounded',
  centerImageSrc = null,
  centerLogoText = 'LG',
  showCenterBadge = true
}) {
  if (!canvas || !text) return;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // 1. Generate QR Code Matrix (Level 'H' for 30% error tolerance)
  const qrData = QRCode.create(text, {
    errorCorrectionLevel: 'H'
  });

  const modules = qrData.modules;
  const moduleCount = modules.size;
  const margin = Math.round(size * 0.06);
  const qrSize = size - margin * 2;
  const cellSize = qrSize / moduleCount;

  // 2. Fill Background
  ctx.fillStyle = lightColor;
  ctx.fillRect(0, 0, size, size);

  // 3. Draw QR Modules
  ctx.fillStyle = darkColor;

  // Center Exclusion Zone for Badge (Center 22% of matrix)
  const centerSizeModules = Math.ceil(moduleCount * 0.24);
  const centerStart = Math.floor((moduleCount - centerSizeModules) / 2);
  const centerEnd = centerStart + centerSizeModules;

  for (let r = 0; r < moduleCount; r++) {
    for (let c = 0; c < moduleCount; c++) {
      if (modules.get(r, c)) {
        // Skip modules covered by center badge if enabled
        if (
          showCenterBadge &&
          r >= centerStart &&
          r < centerEnd &&
          c >= centerStart &&
          c < centerEnd
        ) {
          continue;
        }

        const x = margin + c * cellSize;
        const y = margin + r * cellSize;

        if (style === 'rounded') {
          // Draw smooth rounded dots
          ctx.beginPath();
          ctx.arc(x + cellSize / 2, y + cellSize / 2, cellSize * 0.44, 0, Math.PI * 2);
          ctx.fill();
        } else if (style === 'cyber') {
          // Rounded rectangles with cyber theme
          ctx.beginPath();
          ctx.roundRect(x + 0.5, y + 0.5, cellSize - 1, cellSize - 1, cellSize * 0.3);
          ctx.fill();
        } else {
          // Classic sharp square
          ctx.fillRect(x, y, cellSize + 0.3, cellSize + 0.3);
        }
      }
    }
  }

  // 4. Center Logo / Avatar Badge Overlay
  if (showCenterBadge) {
    const badgeSize = Math.round(size * 0.22);
    const badgeX = (size - badgeSize) / 2;
    const badgeY = (size - badgeSize) / 2;
    const padding = Math.round(badgeSize * 0.1);

    // White safety buffer box
    ctx.save();
    ctx.fillStyle = lightColor;
    ctx.beginPath();
    ctx.roundRect(
      badgeX - padding,
      badgeY - padding,
      badgeSize + padding * 2,
      badgeSize + padding * 2,
      badgeSize * 0.3
    );
    ctx.fill();
    ctx.restore();

    if (centerImageSrc) {
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = () => resolve(false); // Graceful fallback
          img.src = centerImageSrc;
        });

        if (img.width) {
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(badgeX, badgeY, badgeSize, badgeSize, badgeSize * 0.26);
          ctx.clip();
          ctx.drawImage(img, badgeX, badgeY, badgeSize, badgeSize);
          ctx.restore();

          // Border ring around avatar
          ctx.save();
          ctx.strokeStyle = darkColor;
          ctx.lineWidth = Math.max(3, Math.round(size * 0.005));
          ctx.beginPath();
          ctx.roundRect(badgeX, badgeY, badgeSize, badgeSize, badgeSize * 0.26);
          ctx.stroke();
          ctx.restore();
          return;
        }
      } catch (err) {
        // fallback to monogram
      }
    }

    // Default Monogram Emblem Badge
    ctx.save();
    ctx.fillStyle = darkColor;
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeSize, badgeSize, badgeSize * 0.26);
    ctx.fill();

    ctx.fillStyle = lightColor;
    ctx.font = `900 ${Math.round(badgeSize * 0.44)}px system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(centerLogoText || '⚡', badgeX + badgeSize / 2, badgeY + badgeSize / 2);
    ctx.restore();
  }
}

/**
 * Generate Vector SVG String for Clean Print Export
 */
export async function generateQrSvgString(text, darkColor = '#09090b', lightColor = '#ffffff') {
  return QRCode.toString(text, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 2,
    color: {
      dark: darkColor,
      light: lightColor
    }
  });
}

/**
 * Download Canvas as High-Res PNG
 */
export function downloadQrPng(canvas, filename = 'launchgremlin_qr_1200px.png') {
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

/**
 * Download Vector SVG File
 */
export function downloadQrSvg(svgString, filename = 'launchgremlin_qr_vector.svg') {
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  link.click();
}
