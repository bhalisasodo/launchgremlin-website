import React from 'react';
import { TrendingUp, Zap, Activity, Bot, ArrowUpRight, BarChart2 } from 'lucide-react';

export default function HeroLaptop({ style }) {
  return (
    <div
      style={style}
      className="absolute z-30 w-[60%] max-w-[355px] transform -rotate-[5deg] hover:-rotate-[2deg] transition-all duration-500 will-change-transform pointer-events-auto"
    >
      {/* Realist Workspace Ground Shadow (Light Source Upper-Left) */}
      <div className="absolute inset-x-2 bottom-[-14px] h-14 bg-black/90 blur-2xl rounded-full pointer-events-none transform translate-x-5 translate-y-3" />

      {/* Laptop Chassis Frame */}
      <div className="relative z-10 p-2.5 rounded-[22px] bg-zinc-900 border border-zinc-700/80 shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden">
        {/* Top Screen Bezel & Camera Notch */}
        <div className="w-full bg-zinc-950 rounded-t-xl pt-2 pb-1 px-3 flex items-center justify-between border-b border-zinc-800/80">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>LaunchGremlin Studio OS</span>
          </div>
          <div className="w-10" />
        </div>

        {/* Laptop Display Screen — Realistic LaunchGremlin Growth & AI Workflow Dashboard */}
        <div className="w-full bg-zinc-950 p-3 space-y-2.5 rounded-b-xl overflow-hidden border border-zinc-800/60 font-mono text-[10px]">
          {/* Dashboard Header Bar */}
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
            <div>
              <span className="text-white font-bold block text-[11px] font-sans">Growth Engine Dashboard</span>
              <span className="text-emerald-400 text-[9px]">● Live Conversion Optimization</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-[9px] font-bold">
              AI Active
            </span>
          </div>

          {/* Metric Cards Row */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-xl bg-zinc-900/90 border border-zinc-800">
              <span className="text-zinc-400 text-[9px] block">Monthly Leads</span>
              <span className="text-sm font-extrabold text-white block mt-0.5">+340%</span>
              <span className="text-emerald-400 text-[8px] flex items-center gap-0.5">
                <ArrowUpRight className="w-2.5 h-2.5" /> 1,480 leads
              </span>
            </div>

            <div className="p-2 rounded-xl bg-zinc-900/90 border border-zinc-800">
              <span className="text-zinc-400 text-[9px] block">AI Automation</span>
              <span className="text-sm font-extrabold text-emerald-400 block mt-0.5">94.2%</span>
              <span className="text-zinc-400 text-[8px]">Efficiency score</span>
            </div>
          </div>

          {/* Realtime Performance Chart Area */}
          <div className="p-2 rounded-xl bg-zinc-900/70 border border-zinc-800/80">
            <div className="flex items-center justify-between text-[9px] text-zinc-400 mb-1">
              <span>Conversion Curve</span>
              <span className="text-emerald-400 font-bold">$48.5K Rev</span>
            </div>
            <svg viewBox="0 0 120 30" className="w-full h-7 stroke-emerald-400 fill-none stroke-2">
              <path d="M0 25 Q30 22 60 12 T120 4" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Laptop Base Lip Accent */}
        <div className="w-full h-1.5 bg-zinc-800 rounded-b-md mt-1" />
      </div>
    </div>
  );
}
