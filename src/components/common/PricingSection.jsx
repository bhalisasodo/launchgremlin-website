import React, { useState, useEffect, useRef } from 'react';
import { Rocket, CheckCircle, Sparkles, ArrowRight, Zap, Handshake, Check, ShieldCheck, Clock, Award } from 'lucide-react';

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

  const handleViewWork = () => {
    if (onSelectTab) {
      onSelectTab('websites');
    } else if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 space-y-20 py-12 select-none">
      
      {/* 1. MARKET POSITIONING & FOUNDING CLIENT BANNER */}
      <div className="max-w-4xl mx-auto p-6 rounded-3xl bg-zinc-900/80 border border-emerald-400/40 backdrop-blur-2xl shadow-[0_0_35px_rgba(52,211,153,0.15)] flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left relative overflow-hidden">
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
          Every LaunchGremlin project is engineered for one goal: helping you build faster, grow smarter and scale with confidence. Whether you&apos;re launching your first website or building a custom AI-powered platform, there&apos;s a solution designed for where you are today.
        </p>
      </div>

      {/* 3. THE 3 PRICING CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        
        {/* PACKAGE 01: LAUNCH */}
        <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-all duration-300 flex flex-col justify-between h-full space-y-8">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mb-1">Package 01</span>
              <h3 className="text-2xl font-bold text-white">Launch</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-emerald-400 font-mono tracking-tight">R5,500</span>
              </div>
              <p className="mt-3 text-xs text-zinc-300 font-light leading-relaxed">
                Perfect for creators, startups and small businesses looking to establish a premium online presence without agency pricing.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold block">
                Includes:
              </span>
              <ul className="space-y-2.5 text-xs text-zinc-300 font-mono">
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Custom High-Performance Website</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Fully Mobile Responsive</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Lead Capture Integration</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Basic SEO Foundation</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Contact Form</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Lightning-Fast Performance</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>2 Weeks of Post-Launch Support</span>
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="w-full py-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs font-bold text-white hover:border-emerald-400 hover:text-emerald-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start Your Launch</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* PACKAGE 02: GROWTH ENGINE (MOST POPULAR - VISUALLY DOMINANT) */}
        <div className="p-8 rounded-3xl bg-zinc-900/95 border-2 border-emerald-400/60 shadow-[0_0_40px_rgba(52,211,153,0.25)] hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(52,211,153,0.3)] transition-all duration-300 flex flex-col justify-between h-full space-y-8 relative">
          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-400 text-zinc-950 font-black text-[10px] uppercase font-mono tracking-widest shadow-md">
            MOST POPULAR
          </span>

          <div className="space-y-6 pt-2">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-1">Package 02</span>
              <h3 className="text-2xl font-bold text-white">Growth Engine</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-emerald-400 font-mono tracking-tight">R10,500</span>
              </div>
              <p className="mt-3 text-xs text-zinc-300 font-light leading-relaxed">
                Everything you need to grow your audience, generate leads and scale your business with a high-performance digital presence.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                Everything in Launch plus:
              </span>
              <ul className="space-y-2.5 text-xs text-zinc-200 font-mono">
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-bold">Multi-Page Website</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Blog / CMS Integration</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Advanced SEO Setup</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Analytics Dashboard</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Conversion-Focused Architecture</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Premium Motion & Microinteractions</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Content Management Training</span>
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="w-full py-3.5 rounded-2xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(52,211,153,0.4)] hover:bg-emerald-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Build My Growth Engine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* PACKAGE 03: CUSTOM PLATFORM */}
        <div className="p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-all duration-300 flex flex-col justify-between h-full space-y-8">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mb-1">Package 03</span>
              <h3 className="text-2xl font-bold text-white">Custom Platform</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-xs text-zinc-400 font-mono">From</span>
                <span className="text-4xl font-extrabold text-emerald-400 font-mono tracking-tight">R19,999</span>
              </div>
              <p className="mt-3 text-xs text-zinc-300 font-light leading-relaxed">
                Custom web applications, AI-powered systems and business platforms engineered specifically for your workflow and growth.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold block">
                Includes:
              </span>
              <ul className="space-y-2.5 text-xs text-zinc-300 font-mono">
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Custom Web Application</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Admin Dashboard</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>API Integrations</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Authentication & Database</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>AI Workflow Integration</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Automation Systems</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Scalable Architecture</span>
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="w-full py-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs font-bold text-white hover:border-emerald-400 hover:text-emerald-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Request a Custom Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* 4. NEW SECTION: LAUNCH GUARANTEES */}
      <div ref={guaranteesRef} className="pt-12 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
            Speed & Craftsmanship Committed
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Launch Guarantees
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
            We don&apos;t just promise quality—we commit to speed.
          </p>
        </div>

        {/* 3 Premium Glassmorphism Guarantee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div
            className={`group p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-xl shadow-[0_0_25px_rgba(52,211,153,0.1)] hover:border-emerald-400/60 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(52,211,153,0.35)] transition-all duration-500 ease-out flex flex-col justify-between space-y-6 ${
              guaranteesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(52,211,153,0.15)] group-hover:scale-110 group-hover:border-emerald-400/60 group-hover:bg-emerald-400/10 group-hover:text-emerald-300 transition-all duration-300">
                <Zap className="w-7 h-7 fill-emerald-400/20 group-hover:fill-emerald-400/40" />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                  72-Hour MVP Guarantee
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  For qualifying projects, we&apos;ll deliver a functional Minimum Viable Product within 72 hours. Ideal for founders who need to validate ideas quickly.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800/80 flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Rapid Execution Velocity</span>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className={`group p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-xl shadow-[0_0_25px_rgba(52,211,153,0.1)] hover:border-emerald-400/60 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(52,211,153,0.35)] transition-all duration-500 ease-out flex flex-col justify-between space-y-6 ${
              guaranteesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(52,211,153,0.15)] group-hover:scale-110 group-hover:border-emerald-400/60 group-hover:bg-emerald-400/10 group-hover:text-emerald-300 transition-all duration-300">
                <Rocket className="w-7 h-7 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                  7-Day Website Launch
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  Most standard business websites are delivered within 7–10 business days. Fast without sacrificing craftsmanship.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800/80 flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Award className="w-3.5 h-3.5" />
              <span>Craftsmanship & Speed</span>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className={`group p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-xl shadow-[0_0_25px_rgba(52,211,153,0.1)] hover:border-emerald-400/60 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(52,211,153,0.35)] transition-all duration-500 ease-out flex flex-col justify-between space-y-6 ${
              guaranteesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(52,211,153,0.15)] group-hover:scale-110 group-hover:border-emerald-400/60 group-hover:bg-emerald-400/10 group-hover:text-emerald-300 transition-all duration-300">
                <Handshake className="w-7 h-7" />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                  Transparent Build Process
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  Track progress throughout your project with regular updates, milestone reviews and collaborative feedback. No surprises.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800/80 flex items-center gap-2 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Full Visibility & Trust</span>
            </div>
          </div>

        </div>
      </div>

      {/* 5. TRUST STATEMENT: WHY WE CAN MOVE FASTER */}
      <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800 text-center relative overflow-hidden shadow-2xl space-y-6">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono">
          <Zap className="w-3.5 h-3.5" />
          <span>The AI-Native Advantage</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
          Why We Can Move Faster
        </h2>

        <div className="max-w-2xl mx-auto space-y-4 text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
          <p className="font-semibold text-white">
            Traditional agencies scale by adding people. We scale by combining experienced builders with AI-assisted workflows.
          </p>
          <p>
            That means less time spent on repetitive tasks and more time focused on strategy, design, engineering and user experience.
          </p>
          <p className="text-emerald-300 font-normal">
            The result is faster delivery without compromising the quality of the final product.
          </p>
        </div>
      </div>

      {/* 6. CALL TO ACTION */}
      <div className="max-w-4xl mx-auto p-10 sm:p-14 rounded-3xl bg-zinc-900/90 border border-emerald-400/40 backdrop-blur-2xl text-center space-y-8 shadow-[0_0_60px_rgba(52,211,153,0.18)] relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="space-y-4 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Build?
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Whether you&apos;re launching your first business, growing your audience or building an AI-powered platform, LaunchGremlin is ready to help you move faster.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Book a Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleViewWork}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-bold uppercase tracking-wider hover:border-emerald-400 hover:text-white transition-all cursor-pointer"
          >
            <span>View Our Work</span>
          </button>
        </div>
      </div>

      {/* 7. TRUST INDICATOR BAR */}
      <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-zinc-300">
        <span className="flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" /> AI-Assisted Workflows
        </span>
        <span className="flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" /> 72-Hour MVP Option
        </span>
        <span className="flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" /> Modern React & Next.js Stack
        </span>
        <span className="flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" /> Built for Speed & Conversion
        </span>
        <span className="flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" /> Transparent Build Process
        </span>
      </div>

    </section>
  );
}
