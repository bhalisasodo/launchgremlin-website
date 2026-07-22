import React, { useState } from 'react';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import AboutHeroScene from '../components/about/AboutHeroScene';
import {
  Sparkles, Zap, Rocket, Target, BarChart2, Palette, ArrowRight, CheckCircle,
  GitCommit, Terminal, Cpu, Users, Layers, Repeat, ShieldCheck, Flame, Globe, Bot
} from 'lucide-react';

export default function AboutPage({ onOpenBooking, onSelectTab }) {
  const [activeStep, setActiveStep] = useState(0);

  const timelineSteps = [
    { step: '01', title: 'Discover Problem', desc: 'Identify core friction points, user pain, and key growth constraints.' },
    { step: '02', title: 'Prototype Fast', desc: 'Wireframe and build functional MVP scaffolds in days, not months.' },
    { step: '03', title: 'Launch to Market', desc: 'Deploy live to production using edge infrastructure and modern stacks.' },
    { step: '04', title: 'Collect Feedback', desc: 'Analyze real user behavior, analytics data, and conversion rates.' },
    { step: '05', title: 'Improve & Scale', desc: 'Refine UI, optimize bottlenecks, and scale infrastructure seamlessly.' },
    { step: '06', title: 'Repeat Loop', desc: 'Maintain aggressive iteration velocity for continuous growth.' },
  ];

  return (
    <div className="space-y-24 pb-20 select-none">
      
      {/* 1. HERO SECTION — Handcrafted 2-Column Hero System */}
      <ServiceHeroBackground glowPosition="top-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 pb-12">
          {/* Left Column — Headline & Value Prop */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-400/40 text-emerald-400 text-xs font-mono font-bold tracking-wider shadow-[0_0_15px_rgba(52,211,153,0.2)]">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>ABOUT LAUNCHGREMLIN — INTERNET NATIVE OPERATING SYSTEM</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] uppercase">
              INTERNET NATIVE BUILDERS. <br />
              <span className="relative inline-block text-emerald-400">
                SHIPPING AT LIGHTSPEED.
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

            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed max-w-xl">
              We are not a traditional, slow-moving agency. We are an internet-native growth product company that builds fast, tests with real market feedback, and iterates relentlessly alongside ambitious creators and founders.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all"
              >
                <span>Work With Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Build. Ship. Measure. Improve. Repeat.</span>
              </div>
            </div>
          </div>

          {/* Right Column — Handcrafted Creative OS Scene */}
          <div className="lg:col-span-6 relative mt-6 lg:mt-0">
            <AboutHeroScene />
          </div>
        </div>
      </ServiceHeroBackground>

      {/* 2. THE MANIFESTO GRID — 5 Core Pillars */}
      <section className="max-w-7xl mx-auto px-6 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest block">
            The LaunchGremlin Code
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Our Culture & Manifesto
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light">
            How we think, build, and execute every single day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Manifesto Card 1 */}
          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/50 hover:shadow-[0_0_25px_rgba(52,211,153,0.2)] transition-all space-y-3 group">
            <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase group-hover:text-emerald-300">
              Aggressive Iteration
            </h3>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
              Build. Ship. Measure. Improve. Repeat. Speed creates learning velocity.
            </p>
          </div>

          {/* Manifesto Card 2 */}
          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/50 hover:shadow-[0_0_25px_rgba(52,211,153,0.2)] transition-all space-y-3 group">
            <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
              <Rocket className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase group-hover:text-emerald-300">
              Speed & Execution
            </h3>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
              Move faster than everyone else. Momentum solves most problems.
            </p>
          </div>

          {/* Manifesto Card 3 */}
          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/50 hover:shadow-[0_0_25px_rgba(52,211,153,0.2)] transition-all space-y-3 group">
            <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase group-hover:text-emerald-300">
              Obsessive Quality
            </h3>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
              Fast without quality is noise. We ship products that feel exceptional.
            </p>
          </div>

          {/* Manifesto Card 4 */}
          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/50 hover:shadow-[0_0_25px_rgba(52,211,153,0.2)] transition-all space-y-3 group">
            <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
              <BarChart2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase group-hover:text-emerald-300">
              Data Informed
            </h3>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
              Data beats assumptions. Every architectural decision is backed by telemetry.
            </p>
          </div>

          {/* Manifesto Card 5 */}
          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/50 hover:shadow-[0_0_25px_rgba(52,211,153,0.2)] transition-all space-y-3 group">
            <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase group-hover:text-emerald-300">
              Creator Driven
            </h3>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
              Creators deserve software, strategy, and AI systems built specifically for them.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SECTION WITH VISUAL RHYTHM — "We Build Like Internet Companies" */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Visual — Behind-the-scenes Design & Code Artifact Card */}
        <div className="lg:col-span-6 relative">
          <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-4 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white font-mono">LaunchGremlin Deploy Logs</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 text-[10px] font-mono font-bold">
                ● 100% AUTOMATED
              </span>
            </div>

            {/* Artifact 1: Live Git Commit Log */}
            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 font-mono text-[11px] space-y-1">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span>commit a03098a (main -&gt; origin/main)</span>
                <span>JUST NOW</span>
              </div>
              <p className="text-zinc-300">&gt; Feature: High-converting edge UI + AI workflow RAG pipeline</p>
              <div className="text-[10px] text-zinc-500">Author: LaunchGremlin Studio OS &lt;dev@launchgremlin.com&gt;</div>
            </div>

            {/* Artifact 2: Real-time System Metrics */}
            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs">
                <span className="text-zinc-400 text-[10px] block">Build Time</span>
                <span className="text-base font-extrabold text-white block mt-0.5">0.18 seconds</span>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs">
                <span className="text-zinc-400 text-[10px] block">Global Edge Deploy</span>
                <span className="text-base font-extrabold text-emerald-400 block mt-0.5">32 Locations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Text Content */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono">
            <Globe className="w-3.5 h-3.5" />
            <span>INTERNET NATIVE vs TRADITIONAL AGENCIES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight uppercase">
            WE BUILD LIKE <br />
            <span className="text-emerald-400">INTERNET COMPANIES.</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
            Traditional agencies charge huge retainers, hold endless meetings, and take 6 months to deliver a basic website. We operate like an agile software startup. We build in sprints, measure real user conversion data, and ship continuously.
          </p>

          <ul className="space-y-2.5 text-xs font-mono text-zinc-300">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Sprint-based delivery — Days, not months</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full-stack React, Next.js, and AI automation</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct access to senior builders & engineers</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 4. INTERACTIVE TIMELINE — "The Iteration Loop" */}
      <section className="max-w-6xl mx-auto px-6 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest block">
            The Continuous Iteration Engine
          </span>
          <h2 className="text-3xl font-bold text-white uppercase">How We Work With You</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          {timelineSteps.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                activeStep === idx
                  ? 'bg-zinc-900 border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.25)]'
                  : 'bg-zinc-950/80 border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-emerald-400 block">{item.step}</span>
                <h4 className="text-xs font-bold text-white">{item.title}</h4>
              </div>
              <p className="text-[10px] text-zinc-400 font-light leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BRAND PRINCIPLES GRID — 5 Glass Cards */}
      <section className="max-w-7xl mx-auto px-6 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest block">
            Engineering Excellence
          </span>
          <h2 className="text-3xl font-bold text-white uppercase">Our Operating Principles</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/40 transition-all space-y-3">
            <Zap className="w-6 h-6 text-emerald-400" />
            <h4 className="text-sm font-bold text-white">⚡ Ship Fast</h4>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              We optimize for learning velocity. Fast feedback beats slow planning.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/40 transition-all space-y-3">
            <Target className="w-6 h-6 text-emerald-400" />
            <h4 className="text-sm font-bold text-white">🎯 Build with Purpose</h4>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              No fluff or vanity features. Everything solves a concrete growth problem.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/40 transition-all space-y-3">
            <BarChart2 className="w-6 h-6 text-emerald-400" />
            <h4 className="text-sm font-bold text-white">📊 Measure Everything</h4>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Data beats assumptions. Every optimization is backed by metric proof.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/40 transition-all space-y-3">
            <Users className="w-6 h-6 text-emerald-400" />
            <h4 className="text-sm font-bold text-white">🤝 Create Together</h4>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              We build alongside our clients as embedded growth product partners.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/40 transition-all space-y-3">
            <Bot className="w-6 h-6 text-emerald-400" />
            <h4 className="text-sm font-bold text-white">🤖 AI Native</h4>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              AI isn&apos;t a gimmick. It is embedded into how we build, write, and scale.
            </p>
          </div>
        </div>
      </section>

      {/* 6. POWERFUL END CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="p-10 sm:p-14 rounded-3xl bg-zinc-900/90 border border-emerald-400/40 backdrop-blur-2xl text-center space-y-6 shadow-[0_0_60px_rgba(52,211,153,0.18)] relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono relative z-10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to Build?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight relative z-10">
            Ready to Build Something <br />
            <span className="text-emerald-400 italic">People Remember?</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-light max-w-xl mx-auto leading-relaxed relative z-10">
            Whether you&apos;re launching your first high-converting website, growing your creator audience, or integrating custom AI into your business, let&apos;s build something exceptional together.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Book a Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectTab && onSelectTab('websites')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-semibold hover:border-emerald-400 hover:text-white transition-all"
            >
              <span>Explore Our Work</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
