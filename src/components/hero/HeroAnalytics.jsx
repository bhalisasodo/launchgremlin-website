import React from 'react';
import { TrendingUp, BarChart2, Zap } from 'lucide-react';

export default function HeroAnalytics() {
  return (
    <>
      {/* 1. Top Right Card: Audience Growth (+3° rotation + floatSlow) */}
      <div className="absolute top-[15px] right-[20px] sm:top-[20px] sm:right-[25px] z-35 transform rotate-[3deg] animate-float-slow pointer-events-auto">
        <div className="p-3.5 sm:p-4 rounded-2xl bg-zinc-950/85 border border-white/10 backdrop-blur-xl shadow-[0_15px_30px_rgba(0,0,0,0.7)] w-48 sm:w-52 hover:scale-105 transition-all">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-mono text-zinc-400 text-[10px] uppercase font-bold tracking-wider">
              Audience Growth
            </span>
            <span className="font-bold font-mono text-emerald-400 flex items-center gap-1 text-xs bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/30">
              <TrendingUp className="w-3.5 h-3.5" /> +238%
            </span>
          </div>
          {/* Mini Line Chart Graphic */}
          <svg viewBox="0 0 100 30" className="w-full h-8 stroke-emerald-400 fill-none stroke-2 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">
            <path d="M0 25 Q20 20 40 18 T80 8 T100 2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* 2. Right / Shoulder Card: Engagement Rate (-2° rotation + floatReverse) */}
      <div className="absolute top-[165px] right-[20px] sm:top-[180px] sm:right-[30px] z-35 transform -rotate-[2deg] animate-float-reverse pointer-events-auto">
        <div className="p-3 sm:p-3.5 rounded-2xl bg-zinc-950/85 border border-white/10 backdrop-blur-xl shadow-[0_15px_30px_rgba(0,0,0,0.7)] w-44 sm:w-48 hover:scale-105 transition-all">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-zinc-400 text-[10px] uppercase font-bold tracking-wider">
              Engagement Rate
            </span>
            <div className="p-1 rounded-lg bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
              <BarChart2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <span className="text-lg font-extrabold font-mono text-white block mt-1">18.6%</span>
          <span className="text-[10px] font-mono text-emerald-400 font-semibold block flex items-center gap-1 mt-0.5">
            <Zap className="w-3 h-3 fill-current" /> +7.4% this month
          </span>
        </div>
      </div>
    </>
  );
}
