import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Printer,
  Download,
  Palette,
  Eye,
  Check,
  Sparkles,
  Layers,
  ShieldCheck,
  Package
} from 'lucide-react';
import {
  FOIL_FINISHES,
  renderCardFrontToCanvas,
  renderCardBackToCanvas,
  downloadPrintCanvasAsPng
} from '../../utils/printVectorExporter';

export default function PressReadyPrintModal({ isOpen, onClose, card }) {
  const [activeSide, setActiveSide] = useState('front'); // 'front', 'back'
  const [selectedFoil, setSelectedFoil] = useState('emerald');
  const [showBleedGuides, setShowBleedGuides] = useState(true);
  const [isDownloadingBoth, setIsDownloadingBoth] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !canvasRef.current || !card) return;
    if (activeSide === 'front') {
      renderCardFrontToCanvas(canvasRef.current, card, selectedFoil, showBleedGuides);
    } else {
      renderCardBackToCanvas(canvasRef.current, card, selectedFoil, showBleedGuides);
    }
  }, [isOpen, activeSide, selectedFoil, showBleedGuides, card]);

  if (!isOpen || !card) return null;

  const handleDownloadActive = () => {
    if (!canvasRef.current) return;
    const filename = `${card.slug || 'card'}_CR80_${activeSide.toUpperCase()}_${selectedFoil}.png`;
    downloadPrintCanvasAsPng(canvasRef.current, filename);
  };

  const handleDownloadBoth = async () => {
    setIsDownloadingBoth(true);
    const tempCanvas = document.createElement('canvas');

    // 1. Front
    renderCardFrontToCanvas(tempCanvas, card, selectedFoil, showBleedGuides);
    downloadPrintCanvasAsPng(tempCanvas, `${card.slug || 'card'}_CR80_FRONT_${selectedFoil}.png`);

    await new Promise((r) => setTimeout(r, 400));

    // 2. Back
    await renderCardBackToCanvas(tempCanvas, card, selectedFoil, showBleedGuides);
    downloadPrintCanvasAsPng(tempCanvas, `${card.slug || 'card'}_CR80_BACK_${selectedFoil}.png`);

    setIsDownloadingBoth(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-3xl w-full p-4 sm:p-6 md:p-8 space-y-5 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3 sm:pb-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold shrink-0">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-bold text-white tracking-tight">
                  Press-Ready CR80 Print Exporter
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] sm:text-[10px] font-mono font-bold">
                  300 DPI · 3mm Bleed
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-400 font-mono truncate max-w-[200px] sm:max-w-md">
                Standard ISO 85.6mm × 53.98mm with Crop Marks
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls: Side Switcher & Foil Finishes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Side Switcher */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
              1. Card Side:
            </span>
            <div className="flex gap-2 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
              <button
                type="button"
                onClick={() => setActiveSide('front')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeSide === 'front'
                    ? 'bg-emerald-500 text-zinc-950 shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Front Side (Name & NFC)
              </button>
              <button
                type="button"
                onClick={() => setActiveSide('back')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeSide === 'back'
                    ? 'bg-emerald-500 text-zinc-950 shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Back Side (Vector QR)
              </button>
            </div>
          </div>

          {/* Foil Finish Selector */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-emerald-400" /> 2. Metallic Foil Accent:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {Object.values(FOIL_FINISHES).map((foil) => (
                <button
                  key={foil.id}
                  type="button"
                  onClick={() => setSelectedFoil(foil.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
                    selectedFoil === foil.id
                      ? 'bg-zinc-800 text-white border-emerald-500 font-bold'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: foil.color }}
                  ></span>
                  {foil.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bleed Toggle */}
        <div className="flex items-center justify-between text-xs text-zinc-400 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
          <span>Include 3mm Bleed Margin & Corner Trim Marks in output</span>
          <button
            type="button"
            onClick={() => setShowBleedGuides(!showBleedGuides)}
            className={`px-3 py-1 rounded-lg font-mono text-xs font-bold border transition-colors ${
              showBleedGuides
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-zinc-800 text-zinc-500 border-zinc-700'
            }`}
          >
            Guides: {showBleedGuides ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* Live Canvas Proof Frame */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-md aspect-[1082/708] rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 bg-black flex items-center justify-center">
            <canvas
              ref={canvasRef}
              className="w-full h-full object-contain"
              style={{ imageRendering: 'high-quality' }}
            />
          </div>
          <span className="text-[11px] font-mono text-zinc-500 mt-3">
            ISO/IEC 7810 ID-1 Standard (85.60 × 53.98 mm) · 300 DPI High-Res Vector Canvas
          </span>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-zinc-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs text-zinc-400 hover:text-white"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadActive}
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-xs flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Download {activeSide === 'front' ? 'Front' : 'Back'} (300 DPI)</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadBoth}
              disabled={isDownloadingBoth}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
            >
              <Package className="w-4 h-4" />
              <span>{isDownloadingBoth ? 'Generating Package...' : 'Download Full Print Package (Both Sides)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
