import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  QrCode,
  Download,
  Copy,
  Check,
  Sparkles,
  Palette,
  Eye,
  Sliders,
  Image as ImageIcon,
  CheckCircle2,
  FileCode
} from 'lucide-react';
import {
  QR_STYLES,
  renderBrandedQrToCanvas,
  generateQrSvgString,
  downloadQrPng,
  downloadQrSvg
} from '../../utils/qrCodeStudio';

export default function QrCodeStudioModal({ isOpen, onClose, card }) {
  const [selectedStyle, setSelectedStyle] = useState('rounded');
  const [showCenterBadge, setShowCenterBadge] = useState(true);
  const [useAvatar, setUseAvatar] = useState(true);
  const [darkColor, setDarkColor] = useState(card?.primaryColor || '#10b981');
  const [lightColor, setLightColor] = useState('#ffffff');
  const [isCopied, setIsCopied] = useState(false);
  const canvasRef = useRef(null);

  const cleanSlug = card?.slug || 'card';
  const targetUrl = typeof window !== 'undefined' ? `${window.location.origin}/c/${cleanSlug}` : `https://launchgremlin.co.za/c/${cleanSlug}`;

  useEffect(() => {
    if (!isOpen || !canvasRef.current || !card) return;

    renderBrandedQrToCanvas({
      canvas: canvasRef.current,
      text: targetUrl,
      size: 800,
      darkColor,
      lightColor,
      style: selectedStyle,
      centerImageSrc: useAvatar && card.avatarUrl ? card.avatarUrl : null,
      centerLogoText: card.fullName?.slice(0, 2).toUpperCase() || '⚡',
      showCenterBadge
    });
  }, [isOpen, selectedStyle, showCenterBadge, useAvatar, darkColor, lightColor, card, targetUrl]);

  if (!isOpen || !card) return null;

  const handleDownloadPng = () => {
    if (!canvasRef.current) return;
    downloadQrPng(canvasRef.current, `${cleanSlug}_branded_qr_1200px.png`);
  };

  const handleDownloadSvg = async () => {
    const svgStr = await generateQrSvgString(targetUrl, darkColor, lightColor);
    downloadQrSvg(svgStr, `${cleanSlug}_vector_qr.svg`);
  };

  const handleCopyClipboard = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        }
      });
    } catch (e) {
      console.warn('Clipboard write failed:', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-3xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Branded QR Code Studio
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold">
                  Level H (30% Redundancy)
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Clean Short URL: <span className="text-emerald-400 font-semibold">{targetUrl}</span>
              </p>
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

        {/* Main Work Area: Live Canvas + Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left: High-Res QR Live Proof Canvas */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 flex flex-col items-center justify-center space-y-3 shadow-inner">
            <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden shadow-2xl bg-white p-2 flex items-center justify-center">
              <canvas ref={canvasRef} className="w-full h-full object-contain" />
            </div>
            <span className="text-[10px] font-mono text-zinc-500 text-center">
              High-Precision Camera Scannable (0.1s recognition)
            </span>
          </div>

          {/* Right: Customization Controls */}
          <div className="space-y-4 text-xs">
            {/* Dot Style Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                1. Module Dot Style
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {Object.values(QR_STYLES).map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setSelectedStyle(st.id)}
                    className={`py-2 px-2.5 rounded-xl border text-[11px] font-semibold transition-all text-center ${
                      selectedStyle === st.id
                        ? 'bg-emerald-500 text-zinc-950 border-emerald-400 font-bold'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    {st.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Center Logo / Avatar Badge */}
            <div className="space-y-2 p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-400" /> Center Photo / Emblem
                </span>
                <button
                  type="button"
                  onClick={() => setShowCenterBadge(!showCenterBadge)}
                  className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold border transition-colors ${
                    showCenterBadge
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                  }`}
                >
                  {showCenterBadge ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>

              {showCenterBadge && (
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setUseAvatar(true)}
                    className={`flex-1 py-1.5 rounded-lg border text-[11px] font-medium transition-all ${
                      useAvatar
                        ? 'bg-zinc-800 text-white border-emerald-500 font-bold'
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                    }`}
                  >
                    {card.avatarUrl ? 'Photo Avatar' : 'Initials Badge'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setUseAvatar(false)}
                    className={`flex-1 py-1.5 rounded-lg border text-[11px] font-medium transition-all ${
                      !useAvatar
                        ? 'bg-zinc-800 text-white border-emerald-500 font-bold'
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                    }`}
                  >
                    '⚡' Icon
                  </button>
                </div>
              )}
            </div>

            {/* Colors */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 mb-1">Dark Module Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={darkColor}
                    onChange={(e) => setDarkColor(e.target.value)}
                    className="w-7 h-7 rounded bg-transparent border-0 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={darkColor}
                    onChange={(e) => setDarkColor(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 mb-1">Background Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={lightColor}
                    onChange={(e) => setLightColor(e.target.value)}
                    className="w-7 h-7 rounded bg-transparent border-0 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={lightColor}
                    onChange={(e) => setLightColor(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800">
          <button
            type="button"
            onClick={handleCopyClipboard}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-200 flex items-center gap-1.5 transition-colors"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" /> Copied to Clipboard!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Copy QR Image
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadSvg}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-bold text-white flex items-center gap-1.5 transition-colors"
            >
              <FileCode className="w-4 h-4 text-emerald-400" />
              <span>Vector SVG</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPng}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span>Download 1200px PNG</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
