import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, PhoneCall } from 'lucide-react';

export default function StickyMobileCTA({ onOpenBooking }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      // Show sticky bar after scrolling past 200px
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-zinc-950/95 border-t border-emerald-400/40 backdrop-blur-xl shadow-[0_-10px_30px_rgba(0,0,0,0.8)] transition-all transform translate-y-0">
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenBooking}
          aria-label="Book Free Strategy Call Mobile"
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-400 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(52,211,153,0.4)] active:scale-95 transition-all cursor-pointer"
        >
          <span>⚡ Book Strategy Call</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <a
          href="/contact"
          aria-label="Contact LaunchGremlin"
          className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-emerald-400 hover:text-white transition-colors"
        >
          <PhoneCall className="w-4 h-4" />
        </a>
      </div>
      <div className="text-center pt-1.5">
        <span className="text-[10px] font-mono text-zinc-400">
          🔥 <strong className="text-emerald-400">2 Client Spots Left</strong> For This Month • 100% Free Audit
        </span>
      </div>
    </div>
  );
}
