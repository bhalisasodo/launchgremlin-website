import React, { useState } from 'react';
import {
  TrendingUp, ArrowRight, Video, Target, BarChart2, Share2, Sparkles, Users,
  Calendar, Flame, Music, Clock, CheckCircle2, Bot, Play, Check, Zap, Eye, Heart, Layers
} from 'lucide-react';

export default function ContentStrategyHeroScene({ onOpenBooking }) {
  const [activeTab, setActiveTab] = useState('planner');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-6 pb-12">
      
      {/* LEFT COLUMN — Outcome-Driven Value Proposition */}
      <div className="lg:col-span-5 space-y-7 text-left">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-400/35 text-emerald-400 text-xs font-mono font-medium tracking-wide shadow-[0_0_20px_rgba(52,211,153,0.15)] backdrop-blur-md">
          <TrendingUp className="w-3.5 h-3.5 fill-current" />
          <span>PILLAR 02 — CONTENT STRATEGY & AUDIENCE ENGINE</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.03] uppercase">
          ENGINEER REPEATABLE <br />
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-200 font-black">
            CREATOR GROWTH.
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

        {/* Copy */}
        <p className="text-base text-zinc-300 font-light leading-relaxed max-w-xl">
          We don&apos;t just plan content. We engineer audience growth. We build data-informed content funnels, viral short-form video systems, and AI repurposing pipelines that turn viewers into loyal clients.
        </p>

        {/* Outcome Pill Checklist */}
        <div className="grid grid-cols-2 gap-3 text-xs font-mono text-zinc-300 pt-1">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>30 Days Planned</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>AI Optimized Hooks</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Algorithm Ready</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Audience Expanding</span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
          >
            <span>Launch Content Engine</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-400 px-4 py-3 rounded-2xl bg-zinc-900/50 border border-zinc-800/80">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Multi-Channel Auto-Pipeline</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN — SINGLE COHESIVE CONTENT OPERATING SYSTEM (CONTENT OS) */}
      <div className="hidden lg:block lg:col-span-7 relative z-10">
        
        {/* Ambient Glows */}
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* 1. CONTENT OS APPLICATION CONTAINER */}
        <div className="relative w-full rounded-2xl bg-zinc-950/90 border border-zinc-800/90 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.95)] overflow-hidden transition-all duration-300">
          
          {/* A. APPLICATION CHROME HEADER */}
          <div className="bg-zinc-900/90 px-4 py-3 flex flex-wrap items-center justify-between border-b border-zinc-800/80 gap-3">
            {/* Traffic Lights & App Title */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-xs font-mono text-zinc-300 font-bold hidden sm:inline">
                LaunchGremlin Content OS v2.4
              </span>
            </div>

            {/* Application Environment Pill */}
            <div className="px-3 py-1 rounded-lg bg-zinc-950 border border-zinc-800/80 text-[11px] font-mono text-zinc-300 flex items-center gap-2 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-bold">● 30 DAYS SCHEDULED</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400">Peak: 18:00 EST</span>
            </div>

            {/* AI Status Tag */}
            <div className="hidden md:flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/30">
              <Bot className="w-3 h-3" />
              <span>AI Strategy Active</span>
            </div>
          </div>

          {/* B. INTERFACE NAVIGATION TABS */}
          <div className="bg-zinc-950 px-4 py-2 flex items-center gap-2 border-b border-zinc-800/60 overflow-x-auto custom-scrollbar">
            <button
              onClick={() => setActiveTab('planner')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'planner'
                  ? 'bg-zinc-900 text-emerald-400 border border-emerald-400/40 shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>1. Content Planner</span>
            </button>

            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'preview'
                  ? 'bg-zinc-900 text-emerald-400 border border-emerald-400/40 shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>2. Real Content Previews</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'analytics'
                  ? 'bg-zinc-900 text-emerald-400 border border-emerald-400/40 shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>3. Audience Growth</span>
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'ai'
                  ? 'bg-zinc-900 text-emerald-400 border border-emerald-400/40 shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>4. AI Workflow</span>
            </button>
          </div>

          {/* C. MAIN APPLICATION DASHBOARD GRID */}
          <div className="p-5 space-y-5 bg-zinc-950">
            
            {/* TOP HALF: 2-COLUMN DASHBOARD MODULES */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              
              {/* MODULE 1: REAL CONTENT PREVIEW CARD (Col-span-7) — Visual Priority #1 */}
              <div className="md:col-span-7 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800/90 space-y-4 shadow-lg flex flex-col justify-between">
                
                {/* Header HUD */}
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                    <span className="text-xs font-bold text-white font-mono">Featured Content Preview</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-400/30">
                    1.2M Views 🔥
                  </span>
                </div>

                {/* Real Short-Form Reel / TikTok Content Card */}
                <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800/80 space-y-3 relative overflow-hidden">
                  
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-emerald-400 font-bold">
                      TikTok / Instagram Reel
                    </span>
                    <span className="text-zinc-400">Scheduled: Today 18:00</span>
                  </div>

                  {/* Reel Card Canvas */}
                  <div className="relative h-32 rounded-lg bg-gradient-to-tr from-zinc-900 to-zinc-950 border border-zinc-800 overflow-hidden p-3 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[9px] font-mono z-10">
                      <span className="px-2 py-0.5 rounded bg-zinc-950/80 text-white font-bold backdrop-blur-md">
                        3 AI Workflows That Saved 20h/Wk
                      </span>
                      <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                        <Play className="w-3 h-3 fill-emerald-400" /> 1.2M
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[9px] font-mono text-zinc-300 z-10">
                      <span className="flex items-center gap-2 text-zinc-400">
                        <span className="flex items-center gap-1 text-rose-400"><Heart className="w-3 h-3 fill-rose-500" /> 4.7K</span>
                        <span className="flex items-center gap-1 text-white"><Eye className="w-3 h-3 text-emerald-400" /> 125K</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-300 font-bold border border-emerald-400/40">
                        Hook Retention: 88.4%
                      </span>
                    </div>
                  </div>

                  {/* Live AI Optimization Checklist */}
                  <div className="grid grid-cols-2 gap-2 text-[9px] font-mono pt-1 text-zinc-300">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>Hook Retention Optimized</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>Caption & Hashtags Generated</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1">
                  <span>Pillar: Creator AI Workflows</span>
                  <span className="text-emerald-400 font-bold">Algorithm Ready</span>
                </div>
              </div>

              {/* MODULE 2: CONTENT CALENDAR & PUBLISHING QUEUE (Col-span-5) */}
              <div className="md:col-span-5 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800/90 space-y-3 shadow-lg flex flex-col justify-between">
                
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                  <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-400" /> Publishing Queue
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/30">
                    30 Days Scheduled
                  </span>
                </div>

                {/* Queue Items */}
                <div className="space-y-2 text-[10px] font-mono">
                  
                  {/* Item 1 */}
                  <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold block">Mon 18:00 • Reel / TikTok</span>
                      <span className="text-zinc-400 text-[9px]">3 AI Workflows Saved 20h</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-400/15 text-emerald-400 font-bold text-[9px] border border-emerald-400/30">
                      Ready
                    </span>
                  </div>

                  {/* Item 2 */}
                  <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold block">Tue 09:00 • LinkedIn Carousel</span>
                      <span className="text-zinc-400 text-[9px]">Modern Creator Tech Stack</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 font-bold text-[9px] border border-zinc-700">
                      Scheduled
                    </span>
                  </div>

                  {/* Item 3 */}
                  <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold block">Wed 12:00 • Beehiiv Newsletter</span>
                      <span className="text-zinc-400 text-[9px]">Issue #42: Audience Scaling</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-purple-400/15 text-purple-300 font-bold text-[9px] border border-purple-400/30">
                      AI Draft
                    </span>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-zinc-400 flex items-center justify-between border-t border-zinc-800/80 pt-2">
                  <span>Peak Audience Time:</span>
                  <span className="text-emerald-400 font-bold">18:00 EST</span>
                </div>
              </div>

            </div>

            {/* BOTTOM HALF: 2-COLUMN CONNECTED TELEMETRY & WORKFLOW PANELS */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              
              {/* MODULE 3: AUDIENCE GROWTH & METRICS TELEMETRY (Col-span-6) — Visual Priority #2 */}
              <div className="md:col-span-6 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800/90 space-y-3 shadow-lg flex flex-col justify-between">
                
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white font-mono">Audience Growth & Reach</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/30">
                    +28.4% Rate
                  </span>
                </div>

                {/* Creator Metrics Bar */}
                <div className="grid grid-cols-3 gap-2 font-mono text-center">
                  <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                    <span className="text-[9px] text-zinc-400 block">Monthly Reach</span>
                    <span className="text-xs font-extrabold text-white">1.2M Impr</span>
                  </div>
                  <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                    <span className="text-[9px] text-zinc-400 block">New Followers</span>
                    <span className="text-xs font-extrabold text-emerald-400">+14.2K</span>
                  </div>
                  <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                    <span className="text-[9px] text-zinc-400 block">Engagement</span>
                    <span className="text-xs font-extrabold text-emerald-400">18.6%</span>
                  </div>
                </div>

                {/* Animated Growth SVG Chart */}
                <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800/80 relative">
                  <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 mb-1">
                    <span>30-Day Follower Velocity</span>
                    <span className="text-emerald-400 font-bold">Top 1% Creator</span>
                  </div>
                  <svg viewBox="0 0 200 40" className="w-full h-9 stroke-emerald-400 fill-none stroke-2 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
                    <path d="M0 36 Q40 30 80 18 T150 10 T200 3" strokeLinecap="round" />
                    <circle cx="200" cy="3" r="3" fill="#34d399" className="animate-ping" />
                  </svg>
                </div>
              </div>

              {/* MODULE 4: AI STRATEGY & WORKFLOW LIFECYCLE (Col-span-6) — Visual Priority #3 */}
              <div className="md:col-span-6 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800/90 space-y-3 shadow-lg flex flex-col justify-between">
                
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white font-mono">AI Creator Operating Pipeline</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/30">
                    Automated
                  </span>
                </div>

                {/* Live Workflow Indicators */}
                <div className="space-y-2 text-[10px] font-mono text-zinc-300">
                  <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Peak Audience Time Found
                    </span>
                    <span className="text-white font-bold">18:00 EST</span>
                  </div>

                  <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Multi-Channel Repurposing
                    </span>
                    <span className="text-emerald-300 font-bold">TikTok • IG • LinkedIn</span>
                  </div>

                  <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Lead Magnet Funnel Link
                    </span>
                    <span className="text-white font-bold">Active</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1 border-t border-zinc-800/80">
                  <span>Lifecycle Status: <strong className="text-white">Growing Faster</strong></span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" /> High Retention
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
                <span>Content Funnel Active</span>
              </span>
              <span className="hidden sm:inline text-zinc-700">•</span>
              <span className="hidden sm:inline text-zinc-300">Audience Expanding</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-200">Instagram</span>
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-200">TikTok</span>
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-200">LinkedIn</span>
              <span className="px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-400 font-bold">Beehiiv</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
