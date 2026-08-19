import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Download,
  Copy,
  Check,
  Sparkles,
  Layers,
  Palette,
  Eye,
  CheckCircle2,
  Package
} from 'lucide-react';
import {
  SLIDE_THEMES,
  renderSlideToCanvas,
  downloadCanvasAsPng,
  copyCanvasToClipboard
} from '../../utils/slideCanvasRenderer';

export default function SlideExporterModal({ isOpen, onClose, draftPackage }) {
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState('emerald');
  const [isCopied, setIsCopied] = useState(false);
  const [isBatchDownloading, setIsBatchDownloading] = useState(false);
  const canvasRef = useRef(null);

  const carousel = draftPackage?.formats?.carousel;
  const slides = carousel?.slides || [];
  const activeSlide = slides[activeSlideIdx] || slides[0];

  // Auto-select Maserati theme if account is needmoney4maserati
  useEffect(() => {
    if (draftPackage?.account === 'needmoney4maserati') {
      setSelectedTheme('amber');
    } else {
      setSelectedTheme('emerald');
    }
  }, [draftPackage]);

  // Re-render canvas whenever slide, theme, or draft changes
  useEffect(() => {
    if (!isOpen || !canvasRef.current || !activeSlide) return;
    renderSlideToCanvas(canvasRef.current, activeSlide, draftPackage, selectedTheme);
  }, [isOpen, activeSlideIdx, selectedTheme, activeSlide, draftPackage]);

  if (!isOpen || !draftPackage || !carousel) return null;

  const handleDownloadCurrent = () => {
    if (!canvasRef.current) return;
    const filename = `${draftPackage.intake_id || 'LG'}_Slide_0${activeSlideIdx + 1}_${selectedTheme}.png`;
    downloadCanvasAsPng(canvasRef.current, filename);
  };

  const handleCopyClipboard = async () => {
    if (!canvasRef.current) return;
    const ok = await copyCanvasToClipboard(canvasRef.current);
    if (ok) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleDownloadAll = async () => {
    setIsBatchDownloading(true);
    const tempCanvas = document.createElement('canvas');
    for (let i = 0; i < slides.length; i++) {
      renderSlideToCanvas(tempCanvas, slides[i], draftPackage, selectedTheme);
      const filename = `${draftPackage.intake_id || 'LG'}_Slide_0${i + 1}_${selectedTheme}.png`;
      downloadCanvasAsPng(tempCanvas, filename);
      // Brief delay between downloads
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
    setIsBatchDownloading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-4xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                1080 × 1350 PNG
              </span>
              <span className="text-xs text-zinc-400 font-mono">Instagram & LinkedIn 4:5 Ready</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              High-Res Carousel Slide Exporter
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls: Slide Picker & Theme Switcher */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Slide Tabs */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
              1. Select Slide ({activeSlideIdx + 1} / {slides.length})
            </span>
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {slides.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlideIdx(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                    activeSlideIdx === idx
                      ? 'bg-emerald-500 text-zinc-950 border-emerald-400 font-bold shadow-lg shadow-emerald-500/20'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  Slide {s.slide_number}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Switcher */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-emerald-400" /> 2. Visual Theme
            </span>
            <div className="flex flex-wrap gap-2">
              {Object.values(SLIDE_THEMES).map((thm) => (
                <button
                  key={thm.id}
                  type="button"
                  onClick={() => setSelectedTheme(thm.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
                    selectedTheme === thm.id
                      ? 'bg-zinc-800 text-white border-emerald-500/80 font-bold ring-1 ring-emerald-500/40'
                      : 'bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: thm.accent }}
                  ></span>
                  {thm.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Canvas Preview Frame */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 flex flex-col items-center justify-center">
          <div className="w-full max-w-[340px] md:max-w-[380px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 bg-black flex items-center justify-center relative group">
            <canvas
              ref={canvasRef}
              className="w-full h-full object-contain"
              style={{ imageRendering: 'high-quality' }}
            />
          </div>
          <span className="text-[11px] font-mono text-zinc-500 mt-2">
            Rendered at 1080 × 1350px · 300 DPI Social Ready
          </span>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-zinc-800">
          <button
            type="button"
            onClick={handleCopyClipboard}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold text-zinc-200 flex items-center gap-2 transition-colors"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" /> Copied Slide PNG!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Copy Slide Image
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadCurrent}
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-xs flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4 text-emerald-400" /> Download Slide {activeSlideIdx + 1}
            </button>

            <button
              type="button"
              onClick={handleDownloadAll}
              disabled={isBatchDownloading}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <Package className="w-4 h-4" />
              {isBatchDownloading ? 'Downloading 5 Slides...' : 'Download All 5 Slides (PNG Batch)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
