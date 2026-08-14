import React, { useState, useEffect, useRef } from 'react';
import { Rocket, CheckCircle, Sparkles, ArrowRight, Zap, Calculator } from 'lucide-react';

export default function PricingSection({ onOpenBooking, onSelectTab }) {
  const guaranteesRef = useRef(null);
  const [guaranteesVisible, setGuaranteesVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGuaranteesVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (guaranteesRef.current) {
      observer.observe(guaranteesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16 py-10 select-none">
      
      {/* 1. MARKET POSITIONING & FOUNDING CLIENT BANNER */}
      <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-zinc-900/80 border border-emerald-400/40 backdrop-blur-2xl shadow-[0_0_35px_rgba(52,211,153,0.15)] flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="w-12 h-12 rounded-2xl bg-emerald-400/15 border border-emerald-400/40 text-emerald-400 flex items-center justify-center shrink-0 shadow-inner">
          <Rocket className="w-6 h-6 animate-pulse" />
        </div>

        <div className="space-y-1 flex-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              AI-Assisted Internet-Native Product Studio
            </span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <p className="text-xs sm:text-sm text-zinc-200 font-light leading-relaxed">
            LaunchGremlin is focused on delivering premium digital products faster than traditional agencies. Our pricing reflects our market-entry strategy while remaining premium and trustworthy.
          </p>
        </div>
      </div>

      {/* 2. VALUE STATEMENT HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
          Transparent AI-Native Investment
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
          Choose the Right Growth Engine
        </h2>
        <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
          Every LaunchGremlin project is engineered for one goal: helping you build faster, grow smarter and scale with confidence.
        </p>
      </div>

      {/* 3. THE 3 PRICING CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        
        {/* PACKAGE 01: LAUNCH */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/50 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-all duration-300 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mb-1">Package 01</span>
              <h3 className="text-2xl font-bold text-white">Launch</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tracking-tight">R4,999</span>
              </div>
              <p className="mt-2.5 text-xs text-zinc-300 font-light leading-relaxed">
                Perfect for creators, startups and small businesses looking to establish a premium online presence without agency pricing.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold block">
                Includes:
              </span>
              <ul className="space-y-2 text-xs text-zinc-300 font-mono">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Custom High-Performance Website</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Fully Mobile Responsive</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Essential SEO Setup</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Standard 7-10 Day Turnaround</span>
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-200 hover:border-emerald-400 hover:text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <span>Select Launch Package</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* PACKAGE 02: GROW (FEATURED) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border-2 border-emerald-400 hover:-translate-y-1 shadow-[0_0_50px_rgba(52,211,153,0.2)] transition-all duration-300 flex flex-col justify-between space-y-6 relative">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-400 text-zinc-950 font-mono text-[10px] font-extrabold uppercase tracking-widest shadow-[0_0_15px_rgba(52,211,153,0.5)]">
            MOST POPULAR
          </div>

          <div className="space-y-5">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-1">Package 02</span>
              <h3 className="text-2xl font-bold text-white">Grow</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tracking-tight">R9,999</span>
              </div>
              <p className="mt-2.5 text-xs text-zinc-300 font-light leading-relaxed">
                Designed for businesses ready to scale. Includes custom lead funnels, short-form video content strategy, and advanced local SEO.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                Everything in Launch, plus:
              </span>
              <ul className="space-y-2 text-xs text-zinc-300 font-mono">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>30-Day Content Strategy & Scripting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Custom Lead Capture & Booking Funnels</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Advanced Local SEO & Schema Markup</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Priority 5-7 Day Delivery</span>
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(52,211,153,0.4)] hover:bg-emerald-300 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <span>Select Grow Engine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* PACKAGE 03: SCALE */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/50 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-all duration-300 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mb-1">Package 03</span>
              <h3 className="text-2xl font-bold text-white">Scale</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tracking-tight">R19,999</span>
              </div>
              <p className="mt-2.5 text-xs text-zinc-300 font-light leading-relaxed">
                Full-suite digital transformation. Custom AI workflow automation, RAG knowledge bases, multi-channel growth systems, and 72-Hour MVP delivery.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold block">
                Everything in Grow, plus:
              </span>
              <ul className="space-y-2 text-xs text-zinc-300 font-mono">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Custom Autonomous AI Agents</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Vector Search Knowledge Base (RAG)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>72-Hour MVP Rapid Sprint Guarantee</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Dedicated Senior Engineer Support</span>
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-200 hover:border-emerald-400 hover:text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <span>Select Scale Suite</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* 4. CUSTOM SCOPE PROPOSAL CALLOUT */}
      <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 flex items-center justify-center shrink-0">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Need a bespoke scope or specific deliverables?</h4>
            <p className="text-xs text-zinc-400">Use our interactive calculator to customize deliverables and generate an executive technical brief in seconds.</p>
          </div>
        </div>
        <button
          onClick={() => onSelectTab && onSelectTab('proposal')}
          className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-emerald-400 hover:text-white font-mono text-xs font-bold transition whitespace-nowrap cursor-pointer shrink-0"
        >
          Open Scope Builder →
        </button>
      </div>

    </section>
  );
}
