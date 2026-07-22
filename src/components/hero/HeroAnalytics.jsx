import React from 'react';
import { TrendingUp, BarChart2 } from 'lucide-react';

export default function HeroAnalytics() {
  return (
    <>
      {/* 1. Top Right Card: Audience Growth (+2° rotation) */}
      <div className="absolute top-[20px] right-[15px] sm:top-[25px] sm:right-[25px] z-30 transform rotate-[2deg] hover:rotate-0 transition-transform duration-300 pointer-events-auto">
        <div className="p-3.5 rounded-2xl bg-zinc-950/90 border border-emerald-400/30 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] w-44 sm:w-48 hover:scale-105 transition-all">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-mono text-zinc-400 text-[10px]">Audience Growth</span>
            <span className="font-bold font-mono text-emerald-400 flex items-center gap-0.5 text-xs">
              <TrendingUp className="w-3.5 h-3.5" /> +238%
            </span>
          </div>
          {/* Mini Line Chart Graphic */}
          <svg viewBox="0 0 100 30" className="w-full h-7 stroke-emerald-400 fill-none stroke-2">
            <path d="M0 25 Q20 20 40 18 T80 8 T100 2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* 2. Middle Right Card: Engagement Rate (-2° rotation) */}
      <div className="absolute top-[160px] right-[15px] sm:top-[175px] sm:right-[20px] z-30 transform -rotate-[2deg] hover:rotate-0 transition-transform duration-300 pointer-events-auto">
        <div className="p-3 rounded-2xl bg-zinc-950/90 border border-zinc-800/90 backdrop-blur-xl shadow-[0_10px_25px_rgba(0,0,0,0.6)] w-40 sm:w-44 hover:scale-105 transition-all">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-zinc-400 text-[10px]">Engagement Rate</span>
            <BarChart2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <span className="text-base font-extrabold font-mono text-white block mt-0.5">18.6%</span>
          <span className="text-[9px] font-mono text-emerald-400 block">+7.4% this month</span>
        </div>
      </div>
    </>
  );
}
