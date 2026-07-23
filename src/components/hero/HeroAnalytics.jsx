import React from 'react';
import { TrendingUp, BarChart2, Zap } from 'lucide-react';

export default function HeroAnalytics() {
  return (
    <>
      {/* 1. Top Right Card: Audience Growth (+3° rotation + floatSlow) */}
      <div className="absolute top-[15px] right-[15px] sm:top-[18px] sm:right-[20px] z-15 transform rotate-[3deg] animate-float-slow pointer-events-auto">
        <div className="p-3 sm:p-3.5 rounded-2xl bg-zinc-950/85 border border-white/10 backdrop-blur-xl shadow-[0_15px_30px_rgba(0,0,0,0.7)] w-44 sm:w-48 hover:scale-105 transition-all">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-mono text-zinc-400 text-[10px] uppercase font-bold tracking-wider">
              Audience Growth
            </span>
            <span className="font-bold font-mono text-emerald-400 flex items-center gap-1 text-[10px] bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/30">
              <TrendingUp className="w-3 h-3" /> +238%
            </span>
          </div>
          {/* Mini Line Chart Graphic */}
          <svg viewBox="0 0 100 28" className="w-full h-7 stroke-emerald-400 fill-none stroke-2 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">
            <path d="M0 24 Q20 18 40 16 T80 6 T100 2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* 2. Right Shoulder / Upper Torso Card: Engagement Rate (-2° rotation + floatReverse) */}
      <div className="absolute top-[190px] right-[15px] sm:top-[200px] sm:right-[20px] z-15 transform -rotate-[2deg] animate-float-reverse pointer-events-auto">
        <div className="p-3 rounded-2xl bg-zinc-950/85 border border-white/10 backdrop-blur-xl shadow-[0_15px_30px_rgba(0,0,0,0.7)] w-40 sm:w-44 hover:scale-105 transition-all">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-zinc-400 text-[10px] uppercase font-bold tracking-wider">
              Engagement Rate
            </span>
            <div className="p-1 rounded-lg bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
              <BarChart2 className="w-3 h-3" />
            </div>
          </div>
          <span className="text-base font-extrabold font-mono text-white block mt-1">18.6%</span>
          <span className="text-[9px] font-mono text-emerald-400 font-semibold block flex items-center gap-1 mt-0.5">
            <Zap className="w-2.5 h-2.5 fill-current" /> +7.4% this month
          </span>
        </div>
      </div>
    </>
  );
}
