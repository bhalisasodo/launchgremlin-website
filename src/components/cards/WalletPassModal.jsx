import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Smartphone,
  Download,
  Share2,
  Copy,
  Check,
  Phone,
  MessageCircle,
  Mail,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  QrCode,
  CreditCard
} from 'lucide-react';
import QRCode from 'qrcode';
import { downloadPassJsonFile } from '../../utils/walletPassGenerator';
import { downloadVCard } from '../../utils/cardData';

export default function WalletPassModal({ isOpen, onClose, card }) {
  const [qrUrl, setQrUrl] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const passCanvasRef = useRef(null);

  useEffect(() => {
    if (!card) return;
    const liveUrl = `${window.location.origin}/c/${card.slug || 'card'}`;
    QRCode.toDataURL(liveUrl, {
      width: 200,
      margin: 1,
      color: {
        dark: '#ffffff',
        light: '#00000000'
      }
    })
      .then((url) => setQrUrl(url))
      .catch((err) => console.error(err));
  }, [card]);

  if (!isOpen || !card) return null;

  const accentColor = card.theme?.accent || '#10b981';
  const liveUrl = `${window.location.origin}/c/${card.slug || 'card'}`;

  const handleCopyPassLink = () => {
    navigator.clipboard.writeText(liveUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadWalletImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1125;
    canvas.height = 1500;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#09090b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Pass container
    ctx.fillStyle = '#111827';
    ctx.roundRect(80, 80, 965, 1340, 48);
    ctx.fill();
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Header strip
    ctx.fillStyle = accentColor;
    ctx.fillRect(80, 80, 965, 14);

    // Organization
    ctx.fillStyle = '#9ca3af';
    ctx.font = 'bold 28px monospace';
    ctx.fillText((card.companyName || 'LaunchGremlin').toUpperCase(), 140, 160);

    // Name
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 64px system-ui, sans-serif';
    ctx.fillText(card.fullName || 'Professional', 140, 260);

    // Title
    ctx.fillStyle = accentColor;
    ctx.font = 'bold 36px system-ui, sans-serif';
    ctx.fillText(card.jobTitle || 'Business Executive', 140, 320);

    // Phone / WhatsApp
    ctx.fillStyle = '#d1d5db';
    ctx.font = '500 32px system-ui, sans-serif';
    ctx.fillText(`📞 ${card.phone || '+27 82 000 0000'}`, 140, 420);
    ctx.fillText(`💬 ${card.whatsapp || card.phone || 'Available'}`, 140, 480);
    ctx.fillText(`✉️ ${card.email || 'hello@launchgremlin.co.za'}`, 140, 540);

    // QR Code
    if (qrUrl) {
      const qrImg = new Image();
      qrImg.onload = () => {
        ctx.fillStyle = '#000000';
        ctx.roundRect(362, 680, 400, 400, 32);
        ctx.fill();
        ctx.drawImage(qrImg, 402, 720, 320, 320);

        ctx.fillStyle = '#9ca3af';
        ctx.font = 'bold 24px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('SCAN TO SAVE CONTACT OR CHAT', 562, 1140);
        ctx.fillText(liveUrl, 562, 1190);

        const link = document.createElement('a');
        link.download = `${card.slug || 'card'}_wallet_pass.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      };
      qrImg.src = qrUrl;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-lg w-full p-4 sm:p-6 md:p-8 space-y-5 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3 sm:pb-4">
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-black shadow-md shrink-0"
              style={{ backgroundColor: accentColor }}
            >
              <CreditCard className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Apple & Google Wallet Pass
              </h2>
              <p className="text-[11px] sm:text-xs text-zinc-400 font-mono">Native Mobile Wallet Card</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Realistic Apple Wallet Pass Card Simulator */}
        <div className="flex justify-center">
          <div className="w-full max-w-[340px] bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between relative group">
            {/* Top Accent Strip */}
            <div className="h-2 w-full" style={{ backgroundColor: accentColor }}></div>

            <div className="p-6 space-y-5">
              {/* Organization & Pass Header */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-zinc-400 tracking-wider">
                    {card.companyName || 'LaunchGremlin'}
                  </span>
                  <div className="text-xs font-mono text-emerald-400 flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Digital Pass
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden flex items-center justify-center font-bold text-white text-xs">
                  {card.avatarUrl ? (
                    <img src={card.avatarUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    card.fullName?.slice(0, 2).toUpperCase() || 'LG'
                  )}
                </div>
              </div>

              {/* Primary Member Details */}
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
                  MEMBER NAME
                </span>
                <h3 className="text-xl font-black text-white leading-tight">{card.fullName}</h3>
                <span className="text-xs font-semibold" style={{ color: accentColor }}>
                  {card.jobTitle}
                </span>
              </div>

              {/* Secondary Contact Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-800/80 text-xs">
                <div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block">DIRECT CELL</span>
                  <span className="text-zinc-200 font-mono text-[11px] truncate block">
                    {card.phone || '+27 82 000 0000'}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block">WHATSAPP</span>
                  <span className="text-emerald-400 font-mono text-[11px] font-bold block">
                    1-Tap Active
                  </span>
                </div>
              </div>

              {/* Scannable Pass Barcode Section */}
              <div className="p-4 rounded-2xl bg-black border border-zinc-800 flex flex-col items-center justify-center space-y-2">
                {qrUrl ? (
                  <img src={qrUrl} alt="Wallet Barcode" className="w-32 h-32 object-contain" />
                ) : (
                  <div className="w-32 h-32 bg-zinc-800 animate-pulse rounded-lg"></div>
                )}
                <span className="text-[9px] font-mono text-zinc-400 tracking-wider">
                  SCAN TO OPEN FULL CARD
                </span>
              </div>
            </div>

            {/* Bottom 1-Tap Quick Action Icons */}
            <div className="p-3 bg-zinc-950 border-t border-zinc-800 grid grid-cols-3 gap-2 text-center text-[10px] font-semibold text-zinc-400">
              <a
                href={`tel:${card.phone || ''}`}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 hover:text-white flex flex-col items-center gap-1 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" /> Call
              </a>
              <a
                href={`https://wa.me/${(card.whatsapp || card.phone || '').replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 hover:text-white flex flex-col items-center gap-1 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp
              </a>
              <button
                type="button"
                onClick={() => downloadVCard(card)}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 hover:text-white flex flex-col items-center gap-1 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" /> vCard
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => downloadPassJsonFile(card)}
              className="px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-bold text-white flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Apple Pass Package (.JSON)</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadWalletImage}
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
            >
              <Smartphone className="w-4 h-4" />
              <span>Save Wallet Pass (PNG)</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopyPassLink}
            className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 flex items-center justify-center gap-2 border border-zinc-800 transition-colors"
          >
            {copiedLink ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" /> Copied Direct Card Link!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Copy Direct Pass Link for Google Pay
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
