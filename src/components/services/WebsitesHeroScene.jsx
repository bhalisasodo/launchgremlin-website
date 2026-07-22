import React from 'react';
import {
  Gauge, Code, Zap, ArrowRight, Globe, CheckCircle, Search, Layout, MousePointer, Activity
} from 'lucide-react';

export default function WebsitesHeroScene({ onOpenBooking }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 pb-12">
      {/* LEFT COLUMN — Value Proposition & Action CTAs */}
      <div className="lg:col-span-6 space-y-6">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-400/40 text-emerald-400 text-xs font-mono font-bold tracking-wider shadow-[0_0_15px_rgba(52,211,153,0.2)]">
          <Globe className="w-3.5 h-3.5 fill-current" />
          <span>PILLAR 01 — WEBSITES & DIGITAL PRODUCTS</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] uppercase">
          WEBSITES THAT BECOME <br />
          <span className="relative inline-block text-emerald-400">
            GROWTH ENGINES.
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
          We don&apos;t build slow, bloated WordPress templates. We engineer custom high-converting web applications using Vite, React, and Next.js that load in milliseconds and turn visitors into buyers.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Start Website Build</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>100 Lighthouse Performance Guaranteed</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN — 3D Modern Browser & Digital Product Artwork Scene */}
      <div className="lg:col-span-6 relative mt-6 lg:mt-0">
        <div className="relative w-full h-[520px] sm:h-[580px] lg:h-[620px] max-w-[620px] mx-auto select-none rounded-3xl border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-2xl shadow-[0_0_80px_rgba(52,211,153,0.12)] overflow-hidden">
          
          {/* Cyber Dot Background & Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none z-0" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(9,9,11,0.9)_100%)] pointer-events-none z-1" />

          {/* Central Modern Browser Window Art Asset */}
          <div className="absolute top-[80px] left-[40px] sm:left-[55px] z-15 w-[85%] max-w-[480px] bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden transform -rotate-[2deg] hover:rotate-0 transition-all duration-500">
            {/* Browser Header Bar & Address Bar */}
            <div className="bg-zinc-950 px-4 py-2.5 flex items-center justify-between border-b border-zinc-800">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400 flex items-center gap-1.5 w-60 justify-center">
                <Globe className="w-3 h-3 text-emerald-400" />
                <span className="text-zinc-200">https://launchgremlin.com</span>
              </div>
              <div className="w-8" />
            </div>

            {/* Browser Content Canvas — Studio Web Product Dashboard & Live Code snippet */}
            <div className="p-4 bg-zinc-950 font-mono space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-white font-sans">React 18 + Vite Production App</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-400/10 text-emerald-400 text-[9px] font-bold">
                  SSR & SSG Active
                </span>
              </div>

              {/* Live Code Snippet Display */}
              <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-[10px] text-zinc-300 leading-relaxed font-mono">
                <span className="text-emerald-400 font-bold">// High-converting component scaffold</span> <br />
                <span className="text-purple-400">export default function</span> <span className="text-emerald-300 font-bold">GrowthEngine</span>() {'{'} <br />
                &nbsp;&nbsp;<span className="text-blue-400">return</span> &lt;<span className="text-rose-400">WebsiteApp</span> speed={<span className="text-amber-300">&quot;100%&quot;</span>} conversion={<span className="text-amber-300">&quot;MAX&quot;</span>} /&gt; <br />
                {'}'}
              </div>

              {/* Core Performance Metric Sparkline */}
              <div className="p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-center justify-between text-[10px]">
                <div>
                  <span className="text-zinc-400 block text-[9px]">First Contentful Paint (FCP)</span>
                  <span className="text-emerald-400 font-bold text-xs">0.24s (Instant)</span>
                </div>
                <svg viewBox="0 0 100 25" className="w-24 h-6 stroke-emerald-400 fill-none stroke-2">
                  <path d="M0 20 Q20 18 40 10 T80 5 T100 2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Floating Metric Cards & Badges */}
          
          {/* Card 1: Lighthouse Score 100 (Top Right +2°) */}
          <div className="absolute top-[20px] right-[20px] z-35 transform rotate-[2deg] animate-float-slow pointer-events-auto">
            <div className="p-3 rounded-2xl bg-zinc-950/90 border border-emerald-400/40 backdrop-blur-xl shadow-[0_15px_30px_rgba(0,0,0,0.7)] flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-400/30">
                <Gauge className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-400 block font-bold uppercase">Lighthouse Score</span>
                <span className="text-xs text-emerald-400 font-extrabold font-mono">100 / 100 PERFECT</span>
              </div>
            </div>
          </div>

          {/* Card 2: SEO Score 99/100 (Top Left -3°) */}
          <div className="absolute top-[25px] left-[15px] z-35 transform -rotate-[3deg] animate-float-reverse pointer-events-auto">
            <div className="px-3.5 py-2.5 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-xl text-xs font-mono text-emerald-400 flex items-center gap-2 shadow-[0_15px_30px_rgba(0,0,0,0.7)]">
              <Search className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold text-white">SEO Score</span>
              <span className="text-emerald-400 font-extrabold">99/100</span>
            </div>
          </div>

          {/* Card 3: Performance +340% (Middle Right -2°) */}
          <div className="absolute top-[180px] right-[15px] z-35 transform -rotate-[2deg] animate-float-slow pointer-events-auto">
            <div className="p-3 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-xl shadow-[0_15px_30px_rgba(0,0,0,0.7)] w-44">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-mono text-zinc-400 text-[10px] uppercase font-bold">Speed Lift</span>
                <Zap className="w-3.5 h-3.5 text-emerald-400 fill-current" />
              </div>
              <span className="text-base font-extrabold font-mono text-emerald-400 block">+340% Faster</span>
              <span className="text-[9px] font-mono text-zinc-400 block">vs WordPress / Wix</span>
            </div>
          </div>

          {/* Card 4: Deployment Complete (Middle Left -1°) */}
          <div className="absolute top-[260px] left-[10px] z-35 transform -rotate-[1deg] animate-float-reverse pointer-events-auto">
            <div className="px-3.5 py-2 rounded-2xl bg-zinc-950/90 border border-emerald-400/30 backdrop-blur-xl text-xs font-mono text-emerald-400 flex items-center gap-2 shadow-[0_15px_30px_rgba(0,0,0,0.7)]">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold text-white">Deployment Complete</span>
              <span className="text-emerald-400 font-bold">Vercel Edge</span>
            </div>
          </div>

          {/* Card 5: Core Web Vitals Pass (Lower Left +2°) */}
          <div className="absolute bottom-[35px] left-[20px] z-35 transform rotate-[2deg] animate-float-slow pointer-events-auto">
            <div className="px-3.5 py-2 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-xl text-xs font-mono text-white flex items-center gap-2 shadow-[0_15px_30px_rgba(0,0,0,0.7)]">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold">Core Web Vitals: PASS</span>
            </div>
          </div>

          {/* Floating Cursor Accent */}
          <div className="absolute top-[140px] left-[220px] z-40 transform translate-x-2 translate-y-2 pointer-events-none animate-pulse">
            <MousePointer className="w-5 h-5 text-emerald-400 fill-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </div>

        </div>
      </div>
    </div>
  );
}
