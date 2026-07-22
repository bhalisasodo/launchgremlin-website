import React from 'react';
import { TrendingUp, BarChart2 } from 'lucide-react';

export default function HeroAnalytics() {
  return (
    <div className="absolute top-8 right-6 z-30 space-y-3 pointer-events-auto hidden sm:block">
      {/* Audience Growth Widget */}
      <div className="p-3.5 rounded-2xl bg-zinc-950/85 border border-emerald-400/30 backdrop-blur-xl shadow-xl w-48 hover:scale-105 transition-transform">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="font-mono text-zinc-400 text-[10px]">Audience Growth</span>
          <span className="font-bold font-mono text-emerald-400 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +238%
          </span>
        </div>
        {/* Mini Line Chart Graphic */}
        <svg viewBox="0 0 100 30" className="w-full h-8 stroke-emerald-400 fill-none stroke-2">
          <path d="M0 25 Q20 20 40 18 T80 8 T100 2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Engagement Rate Widget */}
      <div className="p-3 rounded-2xl bg-zinc-950/85 border border-zinc-800 backdrop-blur-xl shadow-xl w-44 hover:scale-105 transition-transform">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-zinc-400 text-[10px]">Engagement Rate</span>
          <BarChart2 className="w-3.5 h-3.5 text-emerald-400" />
        </div>
        <span className="text-base font-extrabold font-mono text-white block mt-0.5">18.6%</span>
        <span className="text-[9px] font-mono text-emerald-400 block">+7.4% this month</span>
      </div>
    </div>
  );
}
