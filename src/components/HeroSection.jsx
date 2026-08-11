import React from 'react';
import HeroScene from './hero/HeroScene';
import {
  Zap, ChevronRight, Globe, TrendingUp, Bot, Star, Users
} from 'lucide-react';

export default function HeroSection({ onSelectTab, onOpenBooking }) {
  const handleLinkClick = (e, tab) => {
    e.preventDefault();
    if (onSelectTab) onSelectTab(tab);
  };

  return (
    <section className="relative pt-6 sm:pt-8 pb-12 sm:pb-16 px-4 sm:px-6 max-w-7xl mx-auto z-10 select-none overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-emerald-500/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      {/* Main 2-Column Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* LEFT COLUMN — Value Proposition & Pillar Cards */}
          <div className="space-y-1 relative">
            <h1
              className="font-black text-white tracking-tight leading-[1.05] uppercase"
              style={{ fontSize: 'clamp(2.2rem, 7vw, 3.8rem)' }}
            >
              BUILD WEBSITES. <br />
              <span className="relative inline-block text-emerald-400">
                GROW AUDIENCES.
                {/* Underline SVG */}
                <svg
                  className="absolute -bottom-2 inset-x-0 w-full h-3 text-emerald-400/80 overflow-visible"
                  viewBox="0 0 300 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 9C50 3 150 2 297 8"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              <br />
              SCALE WITH AI.
            </h1>

            {/* Glowing Flow Line connecting GROW AUDIENCES to Right Art Scene (Desktop) */}
            <div className="hidden lg:block absolute left-[85%] top-[45%] w-[180px] h-[60px] pointer-events-none z-20">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 180 60" fill="none" aria-hidden="true">
                <path
                  d="M0 10 C 60 10, 100 45, 180 35"
                  stroke="url(#headlineFlowGlow)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
                <circle cx="180" cy="35" r="4" fill="#34d399" className="animate-ping" />
                <defs>
                  <linearGradient id="headlineFlowGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Supporting Copy */}
          <p className="text-xs sm:text-base text-zinc-300 font-light leading-relaxed max-w-xl">
            We help creators and brands build powerful digital homes, grow with content that connects, and scale with AI that actually makes a difference.
          </p>

          {/* 3 Pillar Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 sm:pt-2">
            {/* Card 1: BUILD */}
            <a
              href="/websites"
              onClick={(e) => handleLinkClick(e, 'websites')}
              className="group p-3.5 sm:p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/60 hover:shadow-[0_0_20px_rgba(52,211,153,0.2)] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-white uppercase group-hover:text-emerald-300 block">BUILD</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold block">
                    WEBSITES THAT CONVERT
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-zinc-400 leading-snug font-light">
                  High-performing websites that build trust, generate leads and turn visitors into customers.
                </p>
              </div>
              <div className="pt-2 sm:pt-3 flex justify-end">
                <span className="p-1 rounded-full bg-emerald-400/10 text-emerald-400 group-hover:bg-emerald-400 group-hover:text-zinc-950 transition-all">
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>

            {/* Card 2: GROW */}
            <a
              href="/content-strategy"
              onClick={(e) => handleLinkClick(e, 'content-strategy')}
              className="group p-3.5 sm:p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/60 hover:shadow-[0_0_20px_rgba(52,211,153,0.2)] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-white uppercase group-hover:text-emerald-300 block">GROW</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold block">
                    CONTENT THAT CONNECTS
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-zinc-400 leading-snug font-light">
                  Strategic content systems that grow your audience, strengthen your brand and drive impact.
                </p>
              </div>
              <div className="pt-2 sm:pt-3 flex justify-end">
                <span className="p-1 rounded-full bg-emerald-400/10 text-emerald-400 group-hover:bg-emerald-400 group-hover:text-zinc-950 transition-all">
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>

            {/* Card 3: SCALE */}
            <a
              href="/ai-consulting"
              onClick={(e) => handleLinkClick(e, 'ai-consulting')}
              className="group p-3.5 sm:p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/60 hover:shadow-[0_0_20px_rgba(52,211,153,0.2)] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-white uppercase group-hover:text-emerald-300 block">SCALE</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold block">
                    AI THAT MULTIPLIES
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-zinc-400 leading-snug font-light">
                  Practical AI solutions that automate workflows, save time and unlock new opportunities.
                </p>
              </div>
              <div className="pt-2 sm:pt-3 flex justify-end">
                <span className="p-1 rounded-full bg-emerald-400/10 text-emerald-400 group-hover:bg-emerald-400 group-hover:text-zinc-950 transition-all">
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>
          </div>

          {/* Bottom Creator Trust Stack & Dual CTAs */}
          <div className="pt-3 sm:pt-4 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold italic">
                BUILT FOR CREATORS & HIGH-GROWTH BRANDS
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onOpenBooking}
                aria-label="Book a Strategy Call to start building"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 min-h-[48px] rounded-full bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              >
                <span>Let&apos;s Build Something</span>
                <Zap className="w-3.5 h-3.5 fill-current shrink-0" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — Art Directed Handcrafted 3D Scene */}
        <div className="hidden lg:block lg:col-span-6 relative mt-4 lg:mt-0">
          <HeroScene />
        </div>
      </div>

      {/* BOTTOM METRICS COUNTER ROW */}
      <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-zinc-900 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="p-2 sm:p-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-emerald-400 shrink-0">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
          </span>
          <div>
            <span className="text-xl sm:text-2xl font-black text-white font-mono">100+</span>
            <span className="text-[11px] sm:text-xs text-zinc-400 block font-light">Projects Delivered</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="p-2 sm:p-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-emerald-400 shrink-0">
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
          </span>
          <div>
            <span className="text-xl sm:text-2xl font-black text-white font-mono">50+</span>
            <span className="text-[11px] sm:text-xs text-zinc-400 block font-light">Creators & Brands</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="p-2 sm:p-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-emerald-400 shrink-0">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
          </span>
          <div>
            <span className="text-xl sm:text-2xl font-black text-white font-mono">5★</span>
            <span className="text-[11px] sm:text-xs text-zinc-400 block font-light">Client Satisfaction</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="p-2 sm:p-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-emerald-400 shrink-0">
            <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
          </span>
          <div>
            <span className="text-xl sm:text-2xl font-black text-white font-mono">10M+</span>
            <span className="text-[11px] sm:text-xs text-zinc-400 block font-light">Audience Impacted</span>
          </div>
        </div>
      </div>
    </section>
  );
}
