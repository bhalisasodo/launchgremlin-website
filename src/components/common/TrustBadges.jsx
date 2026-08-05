import React from 'react';
import { ShieldCheck, Zap, Star, Lock } from 'lucide-react';

export default function TrustBadges() {
  return (
    <div className="w-full py-4 bg-zinc-900/60 border-y border-zinc-800/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-around gap-6 text-xs font-mono text-zinc-300">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>100/100 Core Web Vitals Guaranteed</span>
        </div>

        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>72-Hour MVP Rapid Sprint Available</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex text-amber-400">
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="font-bold text-white">5.0 Star Rated (48+ Verified Builds)</span>
        </div>

        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>256-Bit Bank-Grade SSL Encrypted</span>
        </div>
      </div>
    </div>
  );
}
