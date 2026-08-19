/**
 * HTML5 Canvas 1080x1350 Carousel Slide Renderer
 * Generates crisp 4:5 vertical social media cards directly in the browser.
 */

export const SLIDE_THEMES = {
  emerald: {
    id: 'emerald',
    name: 'LaunchGremlin Emerald',
    bgStart: '#09090b',
    bgEnd: '#06130e',
    cardBg: '#11181f',
    cardBorder: '#10b98140',
    accent: '#10b981',
    accentLight: '#34d399',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    badgeText: '#34d399',
    textColor: '#ffffff',
    subtextColor: '#a1a1aa',
    brandName: 'LaunchGremlin',
    brandHandle: '@LaunchGremlin'
  },
  amber: {
    id: 'amber',
    name: 'Maserati Flame Amber',
    bgStart: '#09090b',
    bgEnd: '#1a1005',
    cardBg: '#1c1611',
    cardBorder: '#f59e0b40',
    accent: '#f59e0b',
    accentLight: '#fbbf24',
    badgeBg: 'rgba(245, 158, 11, 0.15)',
    badgeText: '#fbbf24',
    textColor: '#ffffff',
    subtextColor: '#d6d3d1',
    brandName: 'Road to Maserati',
    brandHandle: '@needmoney4maserati'
  },
  slate: {
    id: 'slate',
    name: 'Minimal High-Contrast',
    bgStart: '#030712',
    bgEnd: '#0f172a',
    cardBg: '#1e293b',
    cardBorder: '#38bdf840',
    accent: '#38bdf8',
    accentLight: '#7dd3fc',
    badgeBg: 'rgba(56, 189, 248, 0.15)',
    badgeText: '#38bdf8',
    textColor: '#ffffff',
    subtextColor: '#94a3b8',
    brandName: 'LaunchGremlin',
    brandHandle: '@LaunchGremlin'
  },
  purple: {
    id: 'purple',
    name: 'Neon Builder Purple',
    bgStart: '#090514',
    bgEnd: '#190a2e',
    cardBg: '#21103a',
    cardBorder: '#c084fc40',
    accent: '#c084fc',
    accentLight: '#e879f9',
    badgeBg: 'rgba(192, 132, 252, 0.15)',
    badgeText: '#c084fc',
    textColor: '#ffffff',
    subtextColor: '#cbd5e1',
    brandName: 'LaunchGremlin',
    brandHandle: '@LaunchGremlin'
  }
};

// Helper: Word wrap text on 2D canvas context
function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 10) {
  if (!text) return y;
  const words = text.split(/\s+/);
  let line = '';
  let currentY = y;
  let linesDrawn = 0;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
      linesDrawn++;
      if (linesDrawn >= maxLines - 1 && n < words.length - 1) {
        ctx.fillText(line.trim() + '...', x, currentY);
        return currentY + lineHeight;
      }
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
  return currentY + lineHeight;
}

// Helper: Draw rounded rectangle
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Renders a single slide onto an HTML5 Canvas element (1080 x 1350)
 */
export function renderSlideToCanvas(canvas, slideData, packageMeta = {}, themeKey = 'emerald') {
  if (!canvas || !slideData) return;
  const ctx = canvas.getContext('2d');
  const width = 1080;
  const height = 1350;
  canvas.width = width;
  canvas.height = height;

  const theme = SLIDE_THEMES[themeKey] || SLIDE_THEMES.emerald;
  const slideNum = slideData.slide_number || 1;
  const totalSlides = 5;
  const slideType = slideData.type || 'Guide';
  const headline = slideData.headline || '';
  const body = slideData.body || '';
  const accountHandle = packageMeta.account === 'needmoney4maserati' ? '@needmoney4maserati' : theme.brandHandle;

  // 1. Background Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, theme.bgStart);
  bgGrad.addColorStop(1, theme.bgEnd);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle background glow orb
  const orbGrad = ctx.createRadialGradient(width * 0.8, height * 0.15, 10, width * 0.8, height * 0.15, 450);
  orbGrad.addColorStop(0, theme.accent + '22');
  orbGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = orbGrad;
  ctx.fillRect(0, 0, width, height);

  // Grid texture overlay
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 60) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // 2. Header Bar (Brand & Slide Indicator)
  ctx.save();
  // Brand Pill
  const brandPillX = 80;
  const brandPillY = 80;
  roundRect(ctx, brandPillX, brandPillY, 320, 56, 28);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.stroke();

  // Accent Dot
  ctx.beginPath();
  ctx.arc(brandPillX + 28, brandPillY + 28, 7, 0, Math.PI * 2);
  ctx.fillStyle = theme.accent;
  ctx.fill();

  // Brand Name
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
  ctx.fillText(theme.brandName, brandPillX + 48, brandPillY + 36);

  // Slide Number Pill
  const slidePillWidth = 140;
  const slidePillX = width - 80 - slidePillWidth;
  roundRect(ctx, slidePillX, brandPillY, slidePillWidth, 56, 28);
  ctx.fillStyle = theme.badgeBg;
  ctx.fill();
  ctx.strokeStyle = theme.cardBorder;
  ctx.stroke();

  ctx.fillStyle = theme.badgeText;
  ctx.font = 'bold 20px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`0${slideNum} / 0${totalSlides}`, slidePillX + slidePillWidth / 2, brandPillY + 36);
  ctx.restore();

  // 3. Category / Slide Type Badge
  const badgeY = 220;
  roundRect(ctx, 80, badgeY, 260, 48, 12);
  ctx.fillStyle = theme.badgeBg;
  ctx.fill();
  ctx.strokeStyle = theme.cardBorder;
  ctx.stroke();

  ctx.fillStyle = theme.badgeText;
  ctx.font = 'bold 18px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(slideType.toUpperCase(), 104, badgeY + 31);

  // 4. Slide-Specific Content Layout
  if (slideNum === 1) {
    // === SLIDE 1: HOOK / COVER SLIDE ===
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 64px system-ui, -apple-system, sans-serif';
    const headlineEndY = wrapText(ctx, headline, 80, 360, 920, 84, 5);

    // Decorative Highlight Card
    const cardY = Math.max(headlineEndY + 60, 720);
    const cardHeight = 360;
    roundRect(ctx, 80, cardY, 920, cardHeight, 32);
    ctx.fillStyle = theme.cardBg;
    ctx.fill();
    ctx.strokeStyle = theme.cardBorder;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Card Content
    ctx.fillStyle = theme.accentLight;
    ctx.font = 'bold 24px monospace';
    ctx.fillText('💡 STRATEGIC BREAKDOWN', 130, cardY + 70);

    ctx.fillStyle = theme.subtextColor;
    ctx.font = '500 28px system-ui, -apple-system, sans-serif';
    wrapText(
      ctx,
      packageMeta.title || 'Practical digital storefront frameworks for South African entrepreneurs.',
      130,
      cardY + 130,
      820,
      44,
      4
    );

    // Swipe CTA Indicator
    ctx.fillStyle = theme.accentLight;
    ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
    ctx.fillText('Swipe to read the full guide 👉', 130, cardY + cardHeight - 45);
  } else if (slideNum === 5) {
    // === SLIDE 5: CTA / SAVE FOR LATER SLIDE ===
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 58px system-ui, -apple-system, sans-serif';
    wrapText(ctx, headline || 'Save This Guide For Later 📌', 80, 350, 920, 76, 4);

    // Big Center Conversion Box
    const boxY = 560;
    const boxHeight = 520;
    roundRect(ctx, 80, boxY, 920, boxHeight, 36);
    ctx.fillStyle = theme.cardBg;
    ctx.fill();
    ctx.strokeStyle = theme.cardBorder;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Save Badge Icon
    roundRect(ctx, 130, boxY + 50, 200, 48, 12);
    ctx.fillStyle = theme.badgeBg;
    ctx.fill();
    ctx.fillStyle = theme.badgeText;
    ctx.font = 'bold 18px monospace';
    ctx.fillText('📌 KEY SUMMARY', 150, boxY + 81);

    // Body summary
    ctx.fillStyle = '#ffffff';
    ctx.font = '500 30px system-ui, -apple-system, sans-serif';
    const bodyEndY = wrapText(ctx, body || packageMeta.cta || 'Try LaunchGremlin today.', 130, boxY + 160, 820, 48, 5);

    // Action CTA Button
    const btnY = boxY + boxHeight - 110;
    roundRect(ctx, 130, btnY, 820, 70, 20);
    ctx.fillStyle = theme.accent;
    ctx.fill();

    ctx.fillStyle = '#09090b';
    ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`👉 ${accountHandle} · Link in Bio`, width / 2, btnY + 44);
    ctx.textAlign = 'left';
  } else {
    // === SLIDES 2, 3, 4: CONTENT & FRAMEWORK SLIDES ===
    // Headline
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 54px system-ui, -apple-system, sans-serif';
    const headEndY = wrapText(ctx, headline, 80, 340, 920, 72, 4);

    // Content Card Box
    const cardY = Math.max(headEndY + 40, 520);
    const cardHeight = 620;
    roundRect(ctx, 80, cardY, 920, cardHeight, 32);
    ctx.fillStyle = theme.cardBg;
    ctx.fill();
    ctx.strokeStyle = theme.cardBorder;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Step / Pillar Marker
    ctx.fillStyle = theme.accent;
    ctx.font = 'bold 22px monospace';
    ctx.fillText(`STEP 0${slideNum - 1} · CORE TAKEAWAY`, 130, cardY + 70);

    // Body Text
    ctx.fillStyle = '#f4f4f5';
    ctx.font = '400 32px system-ui, -apple-system, sans-serif';
    wrapText(ctx, body || 'Clear value and rapid execution outperform complex retainers every time.', 130, cardY + 140, 820, 54, 7);

    // Visual cue tag
    if (slideData.visual_cue) {
      const cueY = cardY + cardHeight - 80;
      roundRect(ctx, 130, cueY, 820, 50, 14);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.fill();

      ctx.fillStyle = theme.subtextColor;
      ctx.font = '500 18px monospace';
      ctx.fillText(`🎨 ${slideData.visual_cue.slice(0, 70)}...`, 150, cueY + 32);
    }
  }

  // 5. Footer Ribbon (Handle & Action)
  const footerY = height - 70;
  ctx.fillStyle = theme.subtextColor;
  ctx.font = '500 20px system-ui, -apple-system, sans-serif';
  ctx.fillText(`${accountHandle}`, 80, footerY);

  ctx.textAlign = 'right';
  ctx.fillStyle = theme.accentLight;
  ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
  ctx.fillText(slideNum === 5 ? '🏁 Save & Share' : 'Next Slide 👉', width - 80, footerY);
  ctx.textAlign = 'left';
}

/**
 * Trigger download of current canvas as a 1080x1350 PNG file
 */
export function downloadCanvasAsPng(canvas, filename = 'carousel_slide.png') {
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

/**
 * Copy canvas PNG directly to clipboard
 */
export async function copyCanvasToClipboard(canvas) {
  if (!canvas) return false;
  return new Promise((resolve) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        resolve(false);
        return;
      }
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob
          })
        ]);
        resolve(true);
      } catch (err) {
        console.error('Failed to copy canvas to clipboard:', err);
        resolve(false);
      }
    }, 'image/png');
  });
}
