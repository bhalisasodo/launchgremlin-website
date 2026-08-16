import React, { useRef, useEffect, useState } from 'react';
import { X, Download, Smartphone, Sparkles, Check } from 'lucide-react';
import QRCode from 'qrcode';
import { trackEvent } from '../../utils/analytics';

export default function LockscreenWallpaperModal({ card, isOpen, onClose, shareUrl }) {
  const canvasRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (!isOpen || !card) return;

    const renderCanvas = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const width = 1080;
      const height = 1920;
      canvas.width = width;
      canvas.height = height;

      // 1. Draw Background Gradient
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#09090b');
      grad.addColorStop(0.4, '#18181b');
      grad.addColorStop(1, '#050505');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Glow Orbs
      const primaryHex = card.primaryColor || '#10b981';
      const accentHex = card.accentColor || '#34d399';

      const orb1 = ctx.createRadialGradient(width * 0.5, height * 0.45, 50, width * 0.5, height * 0.45, 600);
      orb1.addColorStop(0, primaryHex + '33');
      orb1.addColorStop(1, 'transparent');
      ctx.fillStyle = orb1;
      ctx.fillRect(0, 0, width, height);

      // 3. Header Spacing for Lockscreen Clock (leave top 300px clear)
      ctx.textAlign = 'center';

      // 4. Draw Avatar or Monogram
      const avatarY = 560;
      const avatarR = 80;
      ctx.save();
      ctx.beginPath();
      ctx.arc(width / 2, avatarY, avatarR, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      if (card.avatarUrl) {
        try {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          await new Promise((res, rej) => {
            img.onload = res;
            img.onerror = rej;
            img.src = card.avatarUrl;
          });
          ctx.drawImage(img, width / 2 - avatarR, avatarY - avatarR, avatarR * 2, avatarR * 2);
        } catch (e) {
          ctx.fillStyle = primaryHex;
          ctx.fill();
        }
      } else {
        ctx.fillStyle = primaryHex;
        ctx.fill();
        ctx.fillStyle = '#09090b';
        ctx.font = 'bold 70px Inter, system-ui, sans-serif';
        ctx.textBaseline = 'middle';
        ctx.fillText((card.fullName || 'C').charAt(0), width / 2, avatarY);
      }
      ctx.restore();

      // Border around avatar
      ctx.beginPath();
      ctx.arc(width / 2, avatarY, avatarR + 4, 0, Math.PI * 2);
      ctx.strokeStyle = primaryHex;
      ctx.lineWidth = 6;
      ctx.stroke();

      // 5. Name & Title
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 58px Inter, system-ui, sans-serif';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText(card.fullName || card.companyName, width / 2, 720);

      ctx.fillStyle = primaryHex;
      ctx.font = '600 34px Inter, system-ui, sans-serif';
      ctx.fillText(card.jobTitle || '', width / 2, 780);

      if (card.companyName && card.fullName) {
        ctx.fillStyle = '#a1a1aa';
        ctx.font = '400 28px Inter, system-ui, sans-serif';
        ctx.fillText(card.companyName, width / 2, 825);
      }

      // 6. Generate and Draw Centered QR Code
      const qrTarget = shareUrl || `https://launchgremlin.com/c/${card.slug || 'card'}`;
      const qrDataUrl = await QRCode.toDataURL(qrTarget, {
        width: 480,
        margin: 2,
        color: {
          dark: '#09090b',
          light: '#ffffff'
        }
      });

      const qrImg = new Image();
      await new Promise(res => {
        qrImg.onload = res;
        qrImg.src = qrDataUrl;
      });

      const qrBoxSize = 520;
      const qrBoxY = 900;

      // QR Background Container Card
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(width / 2 - qrBoxSize / 2, qrBoxY, qrBoxSize, qrBoxSize, 40);
      ctx.fill();

      // Draw QR image
      ctx.drawImage(qrImg, width / 2 - 240, qrBoxY + 20, 480, 480);

      // 7. Instructions under QR
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 32px Inter, system-ui, sans-serif';
      ctx.fillText('Scan with Camera to Connect', width / 2, 1500);

      ctx.fillStyle = '#71717a';
      ctx.font = '400 24px Inter, system-ui, sans-serif';
      ctx.fillText('Save Contact (.vcf) • View Portfolio • Exchange Info', width / 2, 1545);

      // 8. Footer Brand
      ctx.fillStyle = primaryHex;
      ctx.font = 'bold 22px monospace';
      ctx.fillText('⚡ POWERED BY LAUNCHGREMLIN.COM', width / 2, 1820);
    };

    renderCanvas();
  }, [isOpen, card, shareUrl]);

  if (!isOpen || !card) return null;

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setDownloading(true);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${card.slug || 'business-card'}-lockscreen-qr.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      setDownloading(false);
      setDownloaded(true);
      trackEvent('download_lockscreen_wallpaper', { slug: card.slug });
      setTimeout(() => setDownloaded(false), 2500);
    }, 'image/png');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-lg w-full p-6 space-y-5 text-white shadow-2xl animate-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-bold text-base text-white">Lockscreen QR Wallpaper</h3>
              <p className="text-xs text-zinc-400">Set as your phone wallpaper for instant in-person networking.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-zinc-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Canvas Preview */}
        <div className="flex justify-center">
          <div className="w-56 aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border-4 border-zinc-800 bg-black">
            <canvas ref={canvasRef} className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Features & Download Action */}
        <div className="space-y-3 pt-2">
          <div className="text-center text-xs text-zinc-400">
            ✨ Generates high-res 1080×1920 PNG formatted with clock clearance for iPhone & Android.
          </div>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
          >
            {downloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
            <span>{downloaded ? 'Downloaded Wallpaper!' : 'Download Lockscreen PNG'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
