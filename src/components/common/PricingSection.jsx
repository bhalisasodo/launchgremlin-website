import React from 'react';
import { Rocket, CheckCircle, Sparkles, ArrowRight, ShieldCheck, Zap, Bot, Layers, Check } from 'lucide-react';

export default function PricingSection({ onOpenBooking }) {
  return (
    <section className="max-w-7xl mx-auto px-6 space-y-16 py-12 select-none">
      
      {/* 1. FOUNDING CLIENT PRICING BANNER */}
      <div className="max-w-4xl mx-auto p-6 rounded-3xl bg-zinc-900/80 border border-emerald-400/40 backdrop-blur-2xl shadow-[0_0_35px_rgba(52,211,153,0.15)] flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="w-12 h-12 rounded-2xl bg-emerald-400/15 border border-emerald-400/40 text-emerald-400 flex items-center justify-center shrink-0 shadow-inner">
          <Rocket className="w-6 h-6 animate-pulse" />
        </div>

        <div className="space-y-1 flex-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Founding Client Pricing
            </span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <p className="text-xs sm:text-sm text-zinc-200 font-light leading-relaxed">
            We&apos;re offering early-adopter pricing while we continue expanding the LaunchGremlin portfolio. Lock in these rates before they increase.
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
                <span className="text-4xl font-extrabold text-emerald-400 font-mono tracking-tight">R8,500</span>
              </div>
              <p className="mt-3 text-xs text-zinc-300 font-light leading-relaxed">
                Perfect for creators, founders and small businesses ready to establish a premium online presence.
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
            className="w-full py-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs font-bold text-white hover:border-emerald-400 hover:text-emerald-400 transition-all flex items-center justify-center gap-2"
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
                <span className="text-4xl font-extrabold text-emerald-400 font-mono tracking-tight">R19,500</span>
              </div>
              <p className="mt-3 text-xs text-zinc-300 font-light leading-relaxed">
                Built for businesses ready to generate more leads, grow their audience and scale online.
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
            className="w-full py-3.5 rounded-2xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(52,211,153,0.4)] hover:bg-emerald-300 transition-all flex items-center justify-center gap-2"
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
                <span className="text-4xl font-extrabold text-emerald-400 font-mono tracking-tight">R39,500</span>
              </div>
              <p className="mt-3 text-xs text-zinc-300 font-light leading-relaxed">
                Custom digital products, web applications and AI-powered business systems built around your unique requirements.
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
            className="w-full py-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs font-bold text-white hover:border-emerald-400 hover:text-emerald-400 transition-all flex items-center justify-center gap-2"
          >
            <span>Request a Custom Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* 4. TRUST INDICATOR BAR */}
      <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-zinc-300">
        <span className="flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" /> AI-Assisted Development
        </span>
        <span className="flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" /> Fast Turnaround
        </span>
        <span className="flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" /> Modern React & Next.js Stack
        </span>
        <span className="flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" /> Built for Speed & Conversion
        </span>
        <span className="flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" /> Transparent Project Process
        </span>
      </div>

      {/* 5. COMPARISON NOTE & PAYMENT FLEXIBILITY */}
      <div className="max-w-3xl mx-auto space-y-6 text-center pt-4">
        {/* Comparison Note */}
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 leading-relaxed font-light">
          <strong className="text-white font-semibold block mb-1">Why LaunchGremlin Pricing is Different:</strong>
          Traditional agencies often charge significantly more because of larger teams and slower processes. LaunchGremlin uses AI-assisted workflows and modern engineering practices to deliver premium-quality websites faster and more efficiently—passing those efficiencies on to our clients without compromising quality.
        </div>

        {/* Payment Flexibility */}
        <div className="space-y-1.5 font-mono">
          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Flexible Payment Options
          </h4>
          <p className="text-xs text-zinc-400">
            Eligible projects can be completed using milestone-based payments.{' '}
            <button onClick={onOpenBooking} className="text-white underline hover:text-emerald-400">
              Book a strategy call
            </button>{' '}
            to discuss the best approach for your project.
          </p>
        </div>
      </div>

    </section>
  );
}
