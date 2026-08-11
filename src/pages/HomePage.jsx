import React from 'react';
import HeroSection from '../components/HeroSection';
import TrustBadges from '../components/common/TrustBadges';
import PricingSection from '../components/common/PricingSection';
import { ArrowRight, CheckCircle, Globe, TrendingUp, Bot, RefreshCw, Zap, Layers, Sparkles } from 'lucide-react';

export default function HomePage({ onSelectTab, onOpenBooking }) {
  const handleLinkClick = (e, tab) => {
    e.preventDefault();
    if (onSelectTab) onSelectTab(tab);
  };

  return (
    <div className="space-y-20 pb-20 select-none">
      {/* Primary Hero Section */}
      <HeroSection onSelectTab={onSelectTab} onOpenBooking={onOpenBooking} />

      {/* Trust & Guarantee Badges Strip */}
      <TrustBadges />

      {/* CORE STRATEGIC PILLARS */}
      <section aria-labelledby="pillars-heading" className="px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CORE SERVICES & SOLUTIONS</span>
          </div>
          <h2 id="pillars-heading" className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            Build. Grow. Scale.
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
            Three core capability pillars engineered to take ambitious brands and creators from concept to dominant market presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Pillar 1: WEBSITES & DIGITAL PRODUCTS */}
          <a
            href="/websites"
            onClick={(e) => handleLinkClick(e, 'websites')}
            className="group p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/60 hover:shadow-[0_0_35px_rgba(52,211,153,0.2)] transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-inner group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
                  Pillar 01
                </span>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  Websites & Digital Products
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  Sub-second loading, high-converting custom websites and web applications built with React 18, Vite, and Next.js.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-zinc-300 font-mono">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sub-0.3s FCP Load Speeds</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100/100 Core Web Vitals Guaranteed</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mobile-First Conversion UX</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 flex items-center justify-between text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
              <span>Explore Web Solutions</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Pillar 2: CONTENT STRATEGY & AUDIENCE */}
          <a
            href="/content-strategy"
            onClick={(e) => handleLinkClick(e, 'content-strategy')}
            className="group p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/60 hover:shadow-[0_0_35px_rgba(52,211,153,0.2)] transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-inner group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
                  Pillar 02
                </span>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  Content Strategy & Audience
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  Transform content into a repeatable growth engine. Turn passive viewers into loyal customers with viral distribution funnels.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-zinc-300 font-mono">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Creator Audience Building</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Multi-Channel Content Funnels</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Data-Informed Growth Analytics</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 flex items-center justify-between text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
              <span>Explore Content Engine</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Pillar 3: AI CONSULTING */}
          <a
            href="/ai-consulting"
            onClick={(e) => handleLinkClick(e, 'ai-consulting')}
            className="group p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/60 hover:shadow-[0_0_35px_rgba(52,211,153,0.2)] transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-inner group-hover:scale-110 transition-transform">
                <Bot className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
                  Pillar 03
                </span>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  AI Consulting & Workflows
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  Deploy custom AI agents, LLM integrations, and automated operational pipelines that save hundreds of hours per month.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-zinc-300 font-mono">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Custom AI Agent Development</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>LLM & API Integrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Operational Automation Pipelines</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 flex items-center justify-between text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
              <span>Explore AI Solutions</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        </div>
      </section>

      {/* AI-NATIVE PRICING SECTION */}
      <PricingSection onOpenBooking={onOpenBooking} onSelectTab={onSelectTab} />

      {/* COMPANY PHILOSOPHY: AGGRESSIVE ITERATION */}
      <section aria-labelledby="philosophy-title" className="px-6 max-w-6xl mx-auto">
        <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 text-center relative overflow-hidden shadow-2xl space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-bold">
            <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
            <span>LaunchGremlin Operating Philosophy</span>
          </div>

          <h2 id="philosophy-title" className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto uppercase">
            Aggressive Iteration. <br />
            <span className="text-emerald-400 font-mono">Build. Ship. Measure. Improve. Repeat.</span>
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Speed creates learning. Quality creates trust. Both are required. We don&apos;t spend 6 months in bureaucratic meetings — we ship fast, measure real data, and continuously iterate until your product dominates.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" /> Internet Native
            </span>
            <span className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" /> Creator Focused
            </span>
            <span className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-emerald-400" /> AI First
            </span>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section aria-labelledby="home-cta-title" className="px-6 max-w-5xl mx-auto text-center space-y-6">
        <div className="p-10 sm:p-14 rounded-3xl bg-zinc-900/90 border border-emerald-400/40 text-center space-y-6 shadow-[0_0_50px_rgba(52,211,153,0.15)]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to Build, Grow, or Scale?</span>
          </div>

          <h2 id="home-cta-title" className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            Transform Your Digital Footprint Today.
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base max-w-md mx-auto font-light leading-relaxed">
            Book a 1-on-1 strategy call with our team to map out your technical architecture and growth engine.
          </p>

          <button
            onClick={onOpenBooking}
            aria-label="Book a 1-on-1 strategy call"
            className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-emerald-400 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Book Strategy Call</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
