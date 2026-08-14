import React, { useState } from 'react';
import { RotateCw, Sparkles, QrCode, ShieldCheck, Check } from 'lucide-react';

export default function PhysicalCardPreview({ card, qrDataUrl }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [finish, setFinish] = useState('matte-black'); // 'matte-black', 'gold-foil', 'frosted-glass', 'clean-white'
  const [showBleedGuides, setShowBleedGuides] = useState(false);

  const getFinishStyles = () => {
    switch (finish) {
      case 'gold-foil':
        return {
          front: 'bg-gradient-to-br from-amber-950 via-zinc-950 to-amber-900 border-amber-500/40 text-amber-100 shadow-[0_20px_50px_rgba(217,119,6,0.25)]',
          accentText: 'text-amber-400',
          foilBadge: 'border-amber-400/50 bg-amber-950/60 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
        };
      case 'frosted-glass':
        return {
          front: 'bg-gradient-to-br from-zinc-800/80 via-zinc-900/90 to-zinc-950 border-emerald-500/30 text-white backdrop-blur-2xl shadow-[0_20px_50px_rgba(52,211,153,0.2)]',
          accentText: 'text-emerald-400',
          foilBadge: 'border-emerald-400/40 bg-emerald-950/50 text-emerald-300'
        };
      case 'clean-white':
        return {
          front: 'bg-gradient-to-br from-white via-slate-50 to-zinc-100 border-zinc-200 text-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.15)]',
          accentText: 'text-blue-600',
          foilBadge: 'border-zinc-300 bg-zinc-100 text-zinc-800'
        };
      case 'matte-black':
      default:
        return {
          front: 'bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border-zinc-700/80 text-white shadow-[0_25px_60px_rgba(0,0,0,0.6)]',
          accentText: 'text-emerald-400',
          foilBadge: 'border-emerald-500/40 bg-zinc-900 text-emerald-400'
        };
    }
  };

  const currentStyles = getFinishStyles();

  return (
    <div className="w-full flex flex-col items-center space-y-6">
      {/* Finishes Selector & Controls */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2.5 bg-zinc-900/80 border border-zinc-800 p-2.5 sm:p-3 rounded-2xl">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none max-w-full">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mr-1 hidden sm:inline">Finish:</span>
          {[
            { id: 'matte-black', label: 'Matte Obsidian' },
            { id: 'gold-foil', label: 'Gold Foil Luxe' },
            { id: 'frosted-glass', label: 'Frosted NFC' },
            { id: 'clean-white', label: 'Clean Cotton' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFinish(f.id)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                finish === f.id
                  ? 'bg-emerald-400 text-zinc-950 font-bold shadow-sm'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowBleedGuides(!showBleedGuides)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              showBleedGuides
                ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            {showBleedGuides ? 'Hide Bleed' : 'Print Guides'}
          </button>

          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all cursor-pointer border border-zinc-700"
          >
            <RotateCw className={`w-3.5 h-3.5 transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
            <span>{isFlipped ? 'Front' : 'Back (QR)'}</span>
          </button>
        </div>
      </div>

      {/* 3D Perspective Card Container */}
      <div
        className="w-full max-w-[360px] sm:max-w-[440px] aspect-[1.75/1] cursor-pointer perspective-[1200px]"
        onClick={() => setIsFlipped(!isFlipped)}
        title="Click to Flip Card"
      >
        <div
          className={`relative w-full h-full duration-700 preserve-3d transition-transform ease-out ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* FRONT OF CARD */}
          <div
            className={`absolute inset-0 backface-hidden rounded-2xl border-2 p-4 sm:p-6 flex flex-col justify-between overflow-hidden transition-all ${currentStyles.front}`}
          >
            {/* Subtle Metallic Foil Shimmer Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />

            {/* Print Bleed & Safe Area Overlay (Conditional) */}
            {showBleedGuides && (
              <div className="absolute inset-2 border border-dashed border-red-400/60 rounded-xl pointer-events-none z-20 flex items-start justify-end p-1">
                <span className="text-[9px] font-mono text-red-400 bg-black/80 px-1 rounded">Safe Area (3.5" × 2")</span>
              </div>
            )}

            {/* Front Header */}
            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-zinc-950/80 border border-zinc-700/60 flex items-center justify-center font-black text-sm sm:text-base shadow-inner shrink-0">
                  {card.avatarUrl ? (
                    <img src={card.avatarUrl} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <span style={{ color: card.primaryColor || '#10b981' }}>
                      {(card.fullName || card.companyName || 'C').charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-black text-xs sm:text-sm tracking-tight leading-snug truncate max-w-[180px] sm:max-w-[240px]">{card.fullName || card.companyName}</h3>
                  <p className={`text-[10px] sm:text-[11px] font-semibold tracking-wide truncate max-w-[180px] sm:max-w-[240px] ${currentStyles.accentText}`}>{card.jobTitle || 'Executive'}</p>
                </div>
              </div>

              {card.verified && (
                <div className={`px-2 py-0.5 rounded-full border text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 shrink-0 ${currentStyles.foilBadge}`}>
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span className="hidden sm:inline">NFC ENABLED</span>
                  <span className="sm:hidden">NFC</span>
                </div>
              )}
            </div>

            {/* Front Center Tagline */}
            {card.tagline && (
              <div className="relative z-10 my-auto py-0.5">
                <p className="text-[9.5px] sm:text-[10.5px] opacity-80 leading-relaxed line-clamp-2 italic">
                  "{card.tagline}"
                </p>
              </div>
            )}

            {/* Front Footer Contact Row */}
            <div className="relative z-10 flex items-end justify-between border-t border-white/10 pt-2 text-[9px] sm:text-[10px] opacity-85">
              <div className="space-y-0.5">
                {card.companyName && card.fullName && (
                  <span className="font-bold block uppercase tracking-wider text-[9px] sm:text-[9.5px] opacity-90 truncate max-w-[140px] sm:max-w-[200px]">{card.companyName}</span>
                )}
                {card.email && <div className="font-mono text-[8.5px] sm:text-[9px] opacity-75 truncate max-w-[140px] sm:max-w-[200px]">{card.email}</div>}
              </div>
              <div className="text-right space-y-0.5 font-mono text-[8.5px] sm:text-[9px]">
                {card.phone && <div>{card.phone}</div>}
                {card.websiteUrl && <div className="text-emerald-400 truncate max-w-[140px] sm:max-w-[180px]">{card.websiteUrl.replace(/^https?:\/\//, '')}</div>}
              </div>
            </div>
          </div>

          {/* BACK OF CARD */}
          <div
            className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border-2 p-4 sm:p-6 flex flex-col justify-between overflow-hidden transition-all ${currentStyles.front}`}
          >
            {/* Print Bleed Guides (Conditional) */}
            {showBleedGuides && (
              <div className="absolute inset-2 border border-dashed border-red-400/60 rounded-xl pointer-events-none z-20 flex items-start justify-end p-1">
                <span className="text-[9px] font-mono text-red-400 bg-black/80 px-1 rounded">Safe Area Back</span>
              </div>
            )}

            {/* Back Header */}
            <div className="flex items-center justify-between relative z-10">
              <div>
                <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">CONNECT INSTANTLY</span>
                <h4 className="font-extrabold text-xs sm:text-sm text-white">Scan or Tap NFC</h4>
              </div>
              <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-zinc-400">
                <span>LaunchGremlin</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>

            {/* Back Center QR Code & Instructions */}
            <div className="flex items-center justify-between gap-3 sm:gap-4 relative z-10 my-auto">
              <div className="space-y-1 sm:space-y-1.5 max-w-[160px] sm:max-w-[200px]">
                <p className="text-[9.5px] sm:text-[10.5px] text-zinc-300 leading-relaxed font-medium">
                  Point camera or tap phone to view portfolio and download contact.
                </p>
                <div className="text-[8.5px] sm:text-[9.5px] font-mono text-emerald-400 truncate">
                  launchgremlin.com/c/{card.slug || 'card'}
                </div>
              </div>

              {/* QR Code Container */}
              <div className="p-1.5 sm:p-2 bg-white rounded-xl shadow-lg shrink-0 border border-zinc-300 flex items-center justify-center">
                {qrDataUrl ? (
                  <img src={qrDataUrl} alt="QR Code" className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-zinc-100 text-zinc-900">
                    <QrCode className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                )}
              </div>
            </div>

            {/* Back Footer */}
            <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-1.5 sm:pt-2 text-[8.5px] sm:text-[9px] text-zinc-400 font-mono">
              <span>Standard ISO 3.5" × 2"</span>
              <span>NFC Integrated</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-zinc-400 text-center font-medium">
        💡 <strong>Tip:</strong> Tap card to flip between front face and scannable QR reverse.
      </p>
    </div>
  );
}
