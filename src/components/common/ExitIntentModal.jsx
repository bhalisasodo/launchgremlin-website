import React, { useState, useEffect } from 'react';
import { X, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

export default function ExitIntentModal({ onOpenBooking }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseLeave = (e) => {
      // Trigger when mouse moves near top edge (clientY <= 10)
      if (e.clientY <= 10 && !hasDismissed) {
        setIsOpen(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasDismissed]);

  const handleClose = () => {
    setIsOpen(false);
    setHasDismissed(true);
  };

  const handleClaim = () => {
    setIsOpen(false);
    setHasDismissed(true);
    if (onOpenBooking) onOpenBooking();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg p-8 rounded-3xl bg-zinc-900 border border-emerald-400/50 shadow-[0_0_60px_rgba(52,211,153,0.2)] text-center space-y-6">
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close Modal"
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-zinc-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Urgency Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>WAIT! BEFORE YOU GO...</span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase leading-tight">
          Claim Your Free 1-on-1 Web Speed & Conversion Audit.
        </h2>

        <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
          Our engineering team will analyze your existing website, benchmark your Core Web Vitals, and map out a custom 72-Hour MVP or growth plan for zero cost.
        </p>

        {/* Proof Bullets */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/90 space-y-2 text-left text-xs font-mono text-zinc-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Discover main-thread JS bottlenecks slowing your site</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Get a custom 100/100 Core Web Vitals action plan</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>🔒 100% Free • Zero Obligation • 24h Response</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="space-y-3">
          <button
            onClick={handleClaim}
            className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Claim Free Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleClose}
            className="text-xs text-zinc-500 hover:text-zinc-300 font-mono underline"
          >
            No thanks, I'll pass on the free audit for now
          </button>
        </div>
      </div>
    </div>
  );
}
