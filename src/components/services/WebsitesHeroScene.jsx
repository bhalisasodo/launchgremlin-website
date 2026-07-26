import React, { useState } from 'react';
import {
  Globe, Zap, Search, ArrowRight, CheckCircle2, ShieldCheck, Gauge,
  Activity, TrendingUp, Cpu, Terminal, Sparkles, Layers, Lock, Play, RefreshCw, Check
} from 'lucide-react';

export default function WebsitesHeroScene({ onOpenBooking }) {
  const [activeTab, setActiveTab] = useState('preview');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-6 pb-12">
      
      {/* LEFT COLUMN — Outcome-Driven Value Proposition */}
      <div className="lg:col-span-5 space-y-7 text-left">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-400/35 text-emerald-400 text-xs font-mono font-medium tracking-wide shadow-[0_0_20px_rgba(52,211,153,0.15)] backdrop-blur-md">
          <Globe className="w-3.5 h-3.5 fill-current" />
          <span>PILLAR 01 — WEBSITES & DIGITAL PRODUCTS</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.03] uppercase">
          WEBSITES THAT BECOME <br />
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-200 font-black">
            GROWTH ENGINES.
            <svg
              className="absolute -bottom-2 inset-x-0 w-full h-3.5 text-emerald-400/90 overflow-visible pointer-events-none"
              viewBox="0 0 300 14"
              fill="none"
            >
              <path
                d="M3 10 C 60 3, 160 2, 297 9"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        {/* Outcome-Driven Copy */}
        <p className="text-base text-zinc-300 font-light leading-relaxed max-w-xl">
          We engineer high-performance web applications optimized for sub-second page loads, automated Google search indexing, and maximum lead conversion.
        </p>

        {/* Outcome Pill Checklist */}
        <div className="grid grid-cols-2 gap-3 text-xs font-mono text-zinc-300 pt-1">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Deploy in Seconds</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Optimized for Google</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Built to Convert</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>AI Powered Workflow</span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
          >
            <span>Start Website Build</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-400 px-4 py-3 rounded-2xl bg-zinc-900/50 border border-zinc-800/80">
            <Gauge className="w-4 h-4 text-emerald-400" />
            <span>100 Lighthouse Guaranteed</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN — SINGLE UNIFIED COHESIVE APPLICATION WINDOW */}
      <div className="hidden lg:block lg:col-span-7 relative z-10">
        
        {/* Ambient Glows around Chrome Window */}
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* 1. COHESIVE APPLICATION BROWSER CONTAINER */}
        <div className="relative w-full rounded-2xl bg-zinc-950/90 border border-zinc-800/90 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.95)] overflow-hidden transition-all duration-300">
          
          {/* A. BROWSER CHROME HEADER */}
          <div className="bg-zinc-900/90 px-4 py-3 flex flex-wrap items-center justify-between border-b border-zinc-800/80 gap-3">
            {/* Traffic Lights Controls & Title */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-xs font-mono text-zinc-400 font-bold hidden sm:inline">
                LaunchGremlin Studio Platform
              </span>
            </div>

            {/* Address Bar */}
            <div className="flex-1 max-w-sm mx-auto px-3 py-1 rounded-lg bg-zinc-950 border border-zinc-800/80 text-[11px] font-mono text-zinc-300 flex items-center justify-between shadow-inner">
              <div className="flex items-center gap-1.5 truncate">
                <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="text-emerald-400 font-semibold">https://</span>
                <span className="text-zinc-200 truncate">launchgremlin.com/studio/platform</span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-emerald-400/10 text-emerald-400 text-[9px] font-bold border border-emerald-400/30 shrink-0">
                ● 100% LIVE
              </span>
            </div>

            {/* Deploy Status Indicator */}
            <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Vercel Edge (0.18s)</span>
            </div>
          </div>

          {/* B. INTERFACE NAVIGATION TABS */}
          <div className="bg-zinc-950 px-4 py-2 flex items-center gap-2 border-b border-zinc-800/60 overflow-x-auto custom-scrollbar">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'preview'
                  ? 'bg-zinc-900 text-emerald-400 border border-emerald-400/40 shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>1. Live Website</span>
            </button>

            <button
              onClick={() => setActiveTab('performance')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'performance'
                  ? 'bg-zinc-900 text-emerald-400 border border-emerald-400/40 shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
              }`}
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>2. Lighthouse & SEO</span>
            </button>

            <button
              onClick={() => setActiveTab('growth')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'growth'
                  ? 'bg-zinc-900 text-emerald-400 border border-emerald-400/40 shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>3. Growth Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'code'
                  ? 'bg-zinc-900 text-emerald-400 border border-emerald-400/40 shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>4. Production Code</span>
            </button>
          </div>

          {/* C. MAIN APPLICATION DASHBOARD GRID */}
          <div className="p-5 space-y-5 bg-zinc-950">
            
            {/* TOP HALF: 2-COLUMN DASHBOARD MODULES */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              
              {/* MODULE 1: REALISTIC MINIATURE WEBSITE PREVIEW (Col-span-7) */}
              <div className="md:col-span-7 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800/90 space-y-4 shadow-lg relative overflow-hidden flex flex-col justify-between">
                
                {/* Header HUD */}
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-white font-mono">Live Website Preview</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-400/30">
                    Production Ready
                  </span>
                </div>

                {/* Miniature Website Mockup Canvas */}
                <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800/80 space-y-3 relative">
                  
                  {/* Website Mini Nav */}
                  <div className="flex items-center justify-between text-[10px] font-mono border-b border-zinc-900 pb-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded bg-emerald-400 text-zinc-950 font-bold flex items-center justify-center text-[9px]">LG</div>
                      <span className="text-white font-bold font-sans">LaunchGremlin</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 text-[9px]">
                      <span>Services</span>
                      <span>Pricing</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-400 text-zinc-950 font-bold">Book Call</span>
                    </div>
                  </div>

                  {/* Website Mini Hero */}
                  <div className="space-y-1.5 text-left py-1">
                    <span className="text-[9px] font-mono text-emerald-400 font-bold">● SUB-SECOND ENGINE</span>
                    <h4 className="text-xs font-bold text-white leading-tight font-sans">
                      High-Performance Websites & AI Workflows
                    </h4>
                    <p className="text-[10px] text-zinc-400 font-light leading-snug">
                      Turn visitors into clients with sub-second speeds and conversion architecture.
                    </p>
                  </div>

                  {/* Mini Stats Bar Overlay */}
                  <div className="grid grid-cols-3 gap-2 pt-1 border-t border-zinc-900 text-center font-mono">
                    <div className="p-1 rounded bg-zinc-900 border border-zinc-800">
                      <span className="text-[8px] text-zinc-400 block">FCP</span>
                      <span className="text-[10px] font-bold text-emerald-400">0.24s</span>
                    </div>
                    <div className="p-1 rounded bg-zinc-900 border border-zinc-800">
                      <span className="text-[8px] text-zinc-400 block">SEO</span>
                      <span className="text-[10px] font-bold text-emerald-400">99/100</span>
                    </div>
                    <div className="p-1 rounded bg-zinc-900 border border-zinc-800">
                      <span className="text-[8px] text-zinc-400 block">Status</span>
                      <span className="text-[10px] font-bold text-white">200 OK</span>
                    </div>
                  </div>
                </div>

                {/* Footer Telemetry Banner */}
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1">
                  <span>Framework: React 18 + Vite</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Core Web Vitals Pass
                  </span>
                </div>
              </div>

              {/* MODULE 2: REAL SOFTWARE METRICS SUITE (Col-span-5) */}
              <div className="md:col-span-5 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800/90 space-y-3 shadow-lg flex flex-col justify-between">
                
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                  <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                    <Gauge className="w-4 h-4 text-emerald-400" /> Software Metrics Audit
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/30">
                    Lighthouse
                  </span>
                </div>

                {/* Metric Ring & Grid */}
                <div className="space-y-2.5">
                  
                  {/* Metric 1: Lighthouse Score 100 */}
                  <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-between font-mono">
                    <div>
                      <span className="text-[10px] text-zinc-400 block">Performance Score</span>
                      <span className="text-xs font-bold text-white">Google PageSpeed</span>
                    </div>
                    <div className="px-2.5 py-1 rounded-md bg-emerald-400/15 border border-emerald-400/40 text-emerald-400 font-extrabold text-sm shadow-[0_0_10px_rgba(52,211,153,0.2)]">
                      100 / 100
                    </div>
                  </div>

                  {/* Metric 2: SEO Score 99 */}
                  <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-between font-mono">
                    <div>
                      <span className="text-[10px] text-zinc-400 block">SEO & Indexing</span>
                      <span className="text-xs font-bold text-white">Pages Indexed</span>
                    </div>
                    <div className="px-2.5 py-1 rounded-md bg-emerald-400/15 border border-emerald-400/40 text-emerald-400 font-extrabold text-sm">
                      99 / 100
                    </div>
                  </div>

                  {/* Metric 3: Core Web Vitals Breakdown */}
                  <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[9px]">
                    <div className="p-1.5 rounded bg-zinc-950 border border-zinc-800">
                      <span className="text-zinc-400 block">LCP</span>
                      <span className="text-emerald-400 font-bold">0.4s</span>
                    </div>
                    <div className="p-1.5 rounded bg-zinc-950 border border-zinc-800">
                      <span className="text-zinc-400 block">CLS</span>
                      <span className="text-emerald-400 font-bold">0.00</span>
                    </div>
                    <div className="p-1.5 rounded bg-zinc-950 border border-zinc-800">
                      <span className="text-zinc-400 block">FID</span>
                      <span className="text-emerald-400 font-bold">12ms</span>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-zinc-400 flex items-center justify-between border-t border-zinc-800/80 pt-2">
                  <span>Average Load Time:</span>
                  <span className="text-emerald-400 font-bold">0.24s (240ms)</span>
                </div>
              </div>

            </div>

            {/* BOTTOM HALF: 2-COLUMN CONNECTED TELEMETRY & CODE PANELS */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              
              {/* MODULE 3: GROWTH & LEAD GENERATION CHART (Col-span-6) */}
              <div className="md:col-span-6 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800/90 space-y-3 shadow-lg flex flex-col justify-between">
                
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white font-mono">Growth & Conversion Engine</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/30">
                    +284% Organic
                  </span>
                </div>

                {/* Metric Counters */}
                <div className="grid grid-cols-3 gap-2 font-mono text-center">
                  <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                    <span className="text-[9px] text-zinc-400 block">Monthly Leads</span>
                    <span className="text-xs font-extrabold text-white">1,420 /mo</span>
                  </div>
                  <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                    <span className="text-[9px] text-zinc-400 block">Conversion Rate</span>
                    <span className="text-xs font-extrabold text-emerald-400">14.8%</span>
                  </div>
                  <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                    <span className="text-[9px] text-zinc-400 block">Bounce Rate</span>
                    <span className="text-xs font-extrabold text-emerald-400">22.1%</span>
                  </div>
                </div>

                {/* Animated Growth SVG Chart */}
                <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800/80 relative">
                  <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 mb-1">
                    <span>30-Day Conversion Trajectory</span>
                    <span className="text-emerald-400 font-bold">$64.2K Revenue</span>
                  </div>
                  <svg viewBox="0 0 200 40" className="w-full h-9 stroke-emerald-400 fill-none stroke-2 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
                    <path d="M0 36 Q40 32 80 20 T150 12 T200 4" strokeLinecap="round" />
                    <circle cx="200" cy="4" r="3" fill="#34d399" className="animate-ping" />
                  </svg>
                </div>
              </div>

              {/* MODULE 4: PRODUCTION CODE & DEPLOYMENT PANEL (Col-span-6) */}
              <div className="md:col-span-6 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800/90 space-y-3 shadow-lg flex flex-col justify-between">
                
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white font-mono">Production React / Next.js Stack</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/30">
                    Vite / React 18
                  </span>
                </div>

                {/* Production Code Snippet */}
                <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/90 font-mono text-[10px] leading-relaxed text-zinc-300 overflow-x-auto custom-scrollbar">
                  <div className="text-zinc-500">{'// Production Component Scaffold'}</div>
                  <div>
                    <span className="text-purple-400">import</span> {'{'} LaunchEngine {'}'} <span className="text-purple-400">from</span> <span className="text-amber-300">&apos;@launchgremlin/core&apos;</span>;
                  </div>
                  <div className="mt-1">
                    <span className="text-purple-400">export default async function</span> <span className="text-emerald-300 font-bold">App</span>() {'{'}
                  </div>
                  <div className="pl-3">
                    <span className="text-purple-400">const</span> app = <span className="text-purple-400">await</span> LaunchEngine.<span className="text-blue-400">optimize</span>({'{'}
                  </div>
                  <div className="pl-6 text-zinc-400">
                    speed: <span className="text-amber-300">&apos;100_LIGHTHOUSE&apos;</span>,
                  </div>
                  <div className="pl-6 text-zinc-400">
                    seo: <span className="text-amber-300">&apos;AUTOMATED_RAG&apos;</span>,
                  </div>
                  <div className="pl-3 text-zinc-300 font-light">
                    {'}'});
                  </div>
                  <div className="pl-3">
                    <span className="text-purple-400">return</span> &lt;<span className="text-rose-400">ProductionPlatform</span> status=<span className="text-amber-300">&quot;LIVE&quot;</span> /&gt;;
                  </div>
                  <div>{'}'}</div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1 border-t border-zinc-800/80">
                  <span>Build Status: <strong className="text-white">0.18s (Success)</strong></span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Edge Deployed
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* D. CHROME FOOTER STATUS BAR */}
          <div className="bg-zinc-900/90 px-4 py-2 border-t border-zinc-800/80 flex flex-wrap items-center justify-between text-[10px] font-mono text-zinc-400 gap-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>AI Workflow Pipeline Active</span>
              </span>
              <span className="hidden sm:inline text-zinc-700">•</span>
              <span className="hidden sm:inline text-zinc-300">Global Edge (32 PoPs)</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-200">React 18</span>
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-200">Next.js</span>
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-200">Vite</span>
              <span className="px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-400 font-bold">Tailwind v4</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
