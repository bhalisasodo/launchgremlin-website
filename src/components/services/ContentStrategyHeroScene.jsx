import React from 'react';
import {
  TrendingUp, ArrowRight, Video, Target, BarChart2, Share2, Sparkles, Users, Calendar, Flame, Music, Clock
} from 'lucide-react';

export default function ContentStrategyHeroScene({ onOpenBooking }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 pb-12">
      {/* LEFT COLUMN — Value Proposition & Action CTAs */}
      <div className="lg:col-span-6 space-y-6">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-400/40 text-emerald-400 text-xs font-mono font-bold tracking-wider shadow-[0_0_15px_rgba(52,211,153,0.2)]">
          <TrendingUp className="w-3.5 h-3.5 fill-current" />
          <span>PILLAR 02 — CONTENT STRATEGY & AUDIENCE ENGINE</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] uppercase">
          ENGINEER REPEATABLE <br />
          <span className="relative inline-block text-emerald-400">
            CREATOR GROWTH.
            <svg
              className="absolute -bottom-2 inset-x-0 w-full h-3 text-emerald-400/80 overflow-visible"
              viewBox="0 0 300 12"
              fill="none"
            >
              <path
                d="M3 9C50 3 150 2 297 8"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        {/* Copy */}
        <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed max-w-xl">
          Posting random content without strategy wastes time. We build data-informed content funnels, short-form video systems, and creator growth frameworks that turn attention into loyal fans and high-ticket clients.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Launch Content Engine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Multi-Channel Repurposing Pipeline</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN — Creator Ecosystem Artwork Scene */}
      <div className="lg:col-span-6 relative mt-6 lg:mt-0">
        <div className="relative w-full h-[520px] sm:h-[580px] lg:h-[620px] max-w-[620px] mx-auto select-none rounded-3xl border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-2xl shadow-[0_0_80px_rgba(52,211,153,0.12)] overflow-hidden">
          
          {/* Cyber Dot Grid & Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none z-0" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(9,9,11,0.9)_100%)] pointer-events-none z-1" />

          {/* Ring Light Glow Accent Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border-2 border-emerald-400/30 shadow-[0_0_80px_rgba(52,211,153,0.25)] bg-emerald-400/5 animate-pulse-slow pointer-events-none z-2" />

          {/* Central Smartphone Creator Studio Artwork Container */}
          <div className="absolute top-[65px] left-[50%] -translate-x-1/2 z-15 w-[52%] max-w-[310px] transform rotate-[3deg] hover:rotate-0 transition-all duration-500 pointer-events-auto">
            {/* Phone Body */}
            <div className="p-3 bg-zinc-900 border border-zinc-700/80 rounded-[32px] shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden">
              {/* Phone Top Speaker & Notch */}
              <div className="w-full bg-zinc-950 pt-2 pb-1 flex justify-center border-b border-zinc-800">
                <div className="w-16 h-3.5 bg-zinc-900 rounded-full flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-zinc-950" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>

              {/* Creator Studio App Canvas */}
              <div className="bg-zinc-950 p-3 space-y-3 font-mono text-[10px]">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <span className="text-white font-bold font-sans">LaunchGremlin Creator OS</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-400/10 text-emerald-400 text-[9px] font-bold">
                    REC 🟢
                  </span>
                </div>

                {/* Video Preview Canvas Graphic */}
                <div className="relative h-28 rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden flex items-center justify-center">
                  <Video className="w-8 h-8 text-emerald-400 opacity-60" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[9px] text-white bg-zinc-950/80 px-2 py-1 rounded-lg backdrop-blur-md">
                    <span>Hook Retention</span>
                    <span className="text-emerald-400 font-bold">88.4%</span>
                  </div>
                </div>

                {/* Growth Velocity Bar */}
                <div className="p-2 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1">
                  <div className="flex items-center justify-between text-[9px]">
                    <span className="text-zinc-400">Monthly Reach</span>
                    <span className="text-emerald-400 font-bold">+1.2M Impressions</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 w-[84%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Creator Metric Cards */}

          {/* Card 1: Viral Reel 1.2M Views (Top Right +3°) */}
          <div className="absolute top-[20px] right-[20px] z-35 transform rotate-[3deg] animate-float-slow pointer-events-auto">
            <div className="p-3 rounded-2xl bg-zinc-950/90 border border-emerald-400/40 backdrop-blur-xl shadow-[0_15px_30px_rgba(0,0,0,0.7)] flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-400/30">
                <Flame className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-400 block font-bold uppercase">Viral Reel</span>
                <span className="text-xs text-white font-extrabold font-mono">1.2M Views 🔥</span>
              </div>
            </div>
          </div>

          {/* Card 2: New Followers +14.2K (Top Left -2°) */}
          <div className="absolute top-[20px] left-[15px] z-35 transform -rotate-[2deg] animate-float-reverse pointer-events-auto">
            <div className="px-3.5 py-2.5 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-xl text-xs font-mono text-emerald-400 flex items-center gap-2 shadow-[0_15px_30px_rgba(0,0,0,0.7)]">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold text-white">New Followers</span>
              <span className="text-emerald-400 font-extrabold">+14.2K</span>
            </div>
          </div>

          {/* Card 3: Engagement Rate +28% (Middle Right -2°) */}
          <div className="absolute top-[170px] right-[15px] z-35 transform -rotate-[2deg] animate-float-slow pointer-events-auto">
            <div className="p-3 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-xl shadow-[0_15px_30px_rgba(0,0,0,0.7)] w-44">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-mono text-zinc-400 text-[10px] uppercase font-bold">Engagement</span>
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span className="text-base font-extrabold font-mono text-emerald-400 block">+28.4%</span>
              <span className="text-[9px] font-mono text-zinc-400 block">Top 1% Creator Benchmark</span>
            </div>
          </div>

          {/* Card 4: Content Calendar Active (Middle Left -1°) */}
          <div className="absolute top-[250px] left-[12px] z-35 transform -rotate-[1deg] animate-float-reverse pointer-events-auto">
            <div className="px-3.5 py-2 rounded-2xl bg-zinc-950/90 border border-emerald-400/30 backdrop-blur-xl text-xs font-mono text-emerald-400 flex items-center gap-2 shadow-[0_15px_30px_rgba(0,0,0,0.7)]">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold text-white">Content Calendar</span>
              <span className="text-emerald-400 font-bold">30 Days Scheduled</span>
            </div>
          </div>

          {/* Card 5: Trending Audio Sync (Lower Left +2°) */}
          <div className="absolute bottom-[35px] left-[20px] z-35 transform rotate-[2deg] animate-float-slow pointer-events-auto">
            <div className="px-3.5 py-2 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-xl text-xs font-mono text-white flex items-center gap-2 shadow-[0_15px_30px_rgba(0,0,0,0.7)]">
              <Music className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold">Trending Audio Sync</span>
            </div>
          </div>

          {/* Card 6: Next Upload Scheduled (Lower Right +1°) */}
          <div className="absolute bottom-[40px] right-[25px] z-35 transform rotate-[1deg] animate-float-reverse pointer-events-auto">
            <div className="px-3.5 py-2 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-xl text-xs font-mono text-white flex items-center gap-2 shadow-[0_15px_30px_rgba(0,0,0,0.7)]">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold">Next Upload: 18:00 EST</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
