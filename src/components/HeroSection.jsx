import React from 'react';
import HeroScene from './hero/HeroScene';
import {
  Zap, ArrowRight, Phone, CheckCircle, Globe, TrendingUp, Bot,
  Heart, Play, UserPlus, Sparkles, ChevronRight, Star, Users, Award
} from 'lucide-react';

export default function HeroSection({ onSelectTab, onOpenBooking }) {
  // Creator Avatar stack images
  const avatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
  ];

  return (
    <section className="relative pt-8 pb-16 px-4 sm:px-6 max-w-7xl mx-auto z-10 select-none overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main 2-Column Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* LEFT COLUMN — Value Proposition & Pillar Cards */}
        <div className="lg:col-span-6 space-y-6">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-400/40 text-emerald-400 text-xs font-mono font-bold tracking-wider shadow-[0_0_15px_rgba(52,211,153,0.2)]">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>FOR CREATORS. BY CREATORS.</span>
          </div>

          {/* Headline */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] uppercase">
              BUILD WEBSITES. <br />
              <span className="relative inline-block text-emerald-400">
                GROW AUDIENCES.
                <svg
                  className="absolute -bottom-2 inset-x-0 w-full h-3 text-emerald-400/80"
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
              </span>{' '}
              <br />
              SCALE WITH AI.
            </h1>
          </div>

          {/* Supporting Copy */}
          <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed max-w-xl">
            We help creators and brands build powerful digital homes, grow with content that connects, and scale with AI that actually makes a difference.
          </p>

          {/* 3 Pillar Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {/* Card 1: BUILD */}
            <div
              onClick={() => onSelectTab('websites')}
              className="group p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/60 hover:shadow-[0_0_20px_rgba(52,211,153,0.2)] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase group-hover:text-emerald-300">BUILD</h3>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold block">
                    WEBSITES THAT CONVERT
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-snug font-light">
                  High-performing websites that build trust, generate leads and turn visitors into customers.
                </p>
              </div>
              <div className="pt-3 flex justify-end">
                <span className="p-1.5 rounded-full bg-emerald-400/10 text-emerald-400 group-hover:bg-emerald-400 group-hover:text-zinc-950 transition-all">
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Card 2: GROW */}
            <div
              onClick={() => onSelectTab('content-strategy')}
              className="group p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/60 hover:shadow-[0_0_20px_rgba(52,211,153,0.2)] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase group-hover:text-emerald-300">GROW</h3>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold block">
                    CONTENT THAT CONNECTS
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-snug font-light">
                  Strategic content systems that grow your audience, strengthen your brand and drive impact.
                </p>
              </div>
              <div className="pt-3 flex justify-end">
                <span className="p-1.5 rounded-full bg-emerald-400/10 text-emerald-400 group-hover:bg-emerald-400 group-hover:text-zinc-950 transition-all">
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Card 3: SCALE */}
            <div
              onClick={() => onSelectTab('ai-consulting')}
              className="group p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/60 hover:shadow-[0_0_20px_rgba(52,211,153,0.2)] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase group-hover:text-emerald-300">SCALE</h3>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold block">
                    AI THAT MULTIPLIES
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-snug font-light">
                  Practical AI solutions that automate workflows, save time and unlock new opportunities.
                </p>
              </div>
              <div className="pt-3 flex justify-end">
                <span className="p-1.5 rounded-full bg-emerald-400/10 text-emerald-400 group-hover:bg-emerald-400 group-hover:text-zinc-950 transition-all">
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Creator Trust Stack & Dual CTAs */}
          <div className="pt-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold italic">
                TRUSTED BY CREATORS & BRANDS
              </span>
              <div className="flex -space-x-2">
                {avatars.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt="Creator avatar"
                    className="w-7 h-7 rounded-full border-2 border-zinc-950 object-cover"
                  />
                ))}
                <span className="w-7 h-7 rounded-full bg-zinc-900 border-2 border-zinc-950 text-emerald-400 text-[10px] font-bold flex items-center justify-center">
                  +
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all"
              >
                <span>Let&apos;s Build Something</span>
                <Zap className="w-3.5 h-3.5 fill-current" />
              </button>

              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-200 text-xs font-semibold hover:border-emerald-400 hover:text-white transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Book a Strategy Call</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — 3D Modular Asset Composition */}
        <div className="lg:col-span-6 relative">
          <HeroScene />
        </div>
      </div>

      {/* BOTTOM METRICS COUNTER ROW */}
      <div className="mt-16 pt-8 border-t border-zinc-900 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-emerald-400">
            <Zap className="w-5 h-5" />
          </span>
          <div>
            <span className="text-2xl font-black text-white font-mono">100+</span>
            <span className="text-xs text-zinc-400 block font-light">Projects Delivered</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-emerald-400">
            <Users className="w-5 h-5" />
          </span>
          <div>
            <span className="text-2xl font-black text-white font-mono">50+</span>
            <span className="text-xs text-zinc-400 block font-light">Creators & Brands</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-emerald-400">
            <Star className="w-5 h-5 fill-current" />
          </span>
          <div>
            <span className="text-2xl font-black text-white font-mono">5★</span>
            <span className="text-xs text-zinc-400 block font-light">Client Satisfaction</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-emerald-400">
            <Globe className="w-5 h-5" />
          </span>
          <div>
            <span className="text-2xl font-black text-white font-mono">10M+</span>
            <span className="text-xs text-zinc-400 block font-light">Audience Impacted</span>
          </div>
        </div>
      </div>
    </section>
  );
}
