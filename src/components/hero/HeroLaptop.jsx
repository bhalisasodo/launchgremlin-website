import React from 'react';
import { TrendingUp, Zap, Activity, Bot, ArrowUpRight, Search, CheckCircle } from 'lucide-react';

export default function HeroLaptop({ style }) {
  return (
    <div
      style={style}
      className="absolute z-35 w-[42%] max-w-[245px] transform -rotate-[8°] hover:-rotate-[4°] transition-all duration-500 will-change-transform pointer-events-auto animate-float-slow"
    >
      {/* 1. Realistic Directional Workspace Ground Shadow & Green Glow */}
      <div className="absolute inset-x-2 bottom-[-16px] h-14 bg-black/95 blur-2xl rounded-full pointer-events-none transform translate-x-4 translate-y-3" />
      <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-2xl pointer-events-none" />

      {/* 2. Tablet / Laptop Chassis Frame */}
      <div className="relative z-10 p-2 rounded-[20px] bg-zinc-900 border border-zinc-700/90 shadow-[0_25px_55px_rgba(0,0,0,0.95)] overflow-hidden">
        {/* Top Screen Bezel & Status Bar */}
        <div className="w-full bg-zinc-950 rounded-t-xl pt-1.5 pb-1 px-2.5 flex items-center justify-between border-b border-zinc-800/80">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500/80" />
            <span className="w-2 h-2 rounded-full bg-amber-500/80" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center gap-1 text-[8px] font-mono text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>LaunchGremlin OS</span>
          </div>
          <span className="text-[8px] font-mono text-emerald-400 font-bold">SEO 99</span>
        </div>

        {/* Multi-Module Interface Display (Website, Analytics, AI Widget, Leads & Content Planner) */}
        <div className="w-full bg-zinc-950 p-2.5 space-y-2 rounded-b-xl overflow-hidden border border-zinc-800/60 font-mono text-[9px]">
          {/* Header Module: Website Preview & AI Status */}
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-1.5">
            <div>
              <span className="text-white font-bold block text-[10px] font-sans">Website & Product Suite</span>
              <span className="text-emerald-400 text-[8px]">● Sub-second FCP (0.24s)</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-emerald-400/10 text-emerald-400 text-[8px] font-bold border border-emerald-400/30 flex items-center gap-1">
              <Bot className="w-2.5 h-2.5" /> AI Active
            </span>
          </div>

          {/* Metric Grid Module: Leads & Conversion */}
          <div className="grid grid-cols-2 gap-1.5">
            <div className="p-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800">
              <span className="text-zinc-400 text-[8px] block">Lead Lift</span>
              <span className="text-xs font-extrabold text-white block mt-0.5">+340%</span>
            </div>

            <div className="p-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800">
              <span className="text-zinc-400 text-[8px] block">SEO Score</span>
              <span className="text-xs font-extrabold text-emerald-400 block mt-0.5">99/100</span>
            </div>
          </div>

          {/* Realtime Growth & Content Analytics Chart Module */}
          <div className="p-1.5 rounded-lg bg-zinc-900/70 border border-zinc-800/80">
            <div className="flex items-center justify-between text-[8px] text-zinc-400 mb-0.5">
              <span>Conversion Curve</span>
              <span className="text-emerald-400 font-bold">$48.5K Rev</span>
            </div>
            <svg viewBox="0 0 120 28" className="w-full h-5 stroke-emerald-400 fill-none stroke-2">
              <path d="M0 24 Q30 20 60 10 T120 2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Base Accent */}
        <div className="w-full h-1 bg-zinc-800 rounded-b-md mt-0.5" />
      </div>
    </div>
  );
}
