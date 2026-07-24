import React, { useState } from 'react';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import AboutHeroScene from '../components/about/AboutHeroScene';
import {
  Sparkles, Zap, Rocket, Target, ArrowRight, CheckCircle2,
  Terminal, Globe, Repeat, Users,
} from 'lucide-react';

export default function AboutPage({ onOpenBooking, onSelectTab }) {
  const [activeLoopStep, setActiveLoopStep] = useState(2); // SHIP

  const buildLoop = [
    { num: '01', name: 'IDEA', title: 'Idea & Friction', desc: 'Identify core friction points, user pain, and key growth constraints.' },
    { num: '02', name: 'BUILD', title: 'Build MVP', desc: 'Build functional software scaffolds in days, not months.' },
    { num: '03', name: 'SHIP', title: 'Ship to Production', desc: 'Deploy live to global edge infrastructure instantly.' },
    { num: '04', name: 'MEASURE', title: 'Measure Data', desc: 'Analyze real user behavior, telemetry data, and conversion rates.' },
    { num: '05', name: 'LEARN', title: 'Learn Insights', desc: 'Extract high-signal insights from real market usage.' },
    { num: '06', name: 'ITERATE', title: 'Iterate Fast', desc: 'Refine UI, optimize bottlenecks, and scale continuously.' },
    { num: '07', name: 'REPEAT', title: 'Repeat Loop', desc: 'Maintain aggressive build velocity for exponential growth.' },
  ];

  const manifestoCards = [
    {
      icon: Rocket,
      title: 'Ship > Perfect',
      subtitle: 'Speed Creates Velocity',
      desc: 'Speed creates learning velocity. A shipped product in user hands beats 6 months of internal presentations.',
      badge: 'CULTURE 01',
    },
    {
      icon: Repeat,
      title: 'Iteration Beats Perfection',
      subtitle: 'Continuous Optimization',
      desc: "We don't build once and walk away. We measure real user conversion data and optimize continuously.",
      badge: 'CULTURE 02',
    },
    {
      icon: Terminal,
      title: 'Build in Public',
      subtitle: '100% Transparent',
      desc: 'No corporate jargon, hidden markups, or middle management. You work directly with senior builders.',
      badge: 'CULTURE 03',
    },
    {
      icon: Users,
      title: 'Creator First',
      subtitle: 'Built for Founders',
      desc: 'We engineer software, design systems, and AI workflows tailored specifically for internet-native creators.',
      badge: 'CULTURE 04',
    },
    {
      icon: Zap,
      title: 'Default to Action',
      subtitle: 'Prototype First',
      desc: 'When in doubt, build a working prototype. Momentum solves far more problems than analysis paralysis.',
      badge: 'CULTURE 05',
    },
    {
      icon: Target,
      title: 'Customer > Ego',
      subtitle: 'Outcome Driven',
      desc: 'We measure success strictly by business growth, conversion metrics, and time returned to the founder.',
      badge: 'CULTURE 06',
    },
  ];

  return (
    <div className="space-y-24 pb-20 select-none">
      
      {/* ---------------- 1. HERO SECTION & MANIFESTO INTRO ---------------- */}
      <ServiceHeroBackground glowPosition="top-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 pb-12">
          {/* Left Column — Manifesto Headline & Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-400/40 text-emerald-400 text-xs font-mono font-bold tracking-wider shadow-[0_0_15px_rgba(52,211,153,0.2)]">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>THE LAUNCHGREMLIN MANIFESTO — INTERNET NATIVE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] uppercase">
              INTERNET NATIVE BUILDERS. <br />
              <span className="relative inline-block text-emerald-400">
                WE EARN TRUST BY SHIPPING.
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
              LaunchGremlin is not a slow-moving agency. We are an internet-native product company built for creators and founders. We build fast, learn faster, and ship continuously.
            </p>

            {/* Collaborative CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Build With Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Shipping Beats Meetings</span>
              </div>
            </div>
          </div>

          {/* Right Column — Living LaunchGremlin OS Scene */}
          <div className="hidden lg:block lg:col-span-6 relative mt-6 lg:mt-0">
            <AboutHeroScene />
          </div>
        </div>
      </ServiceHeroBackground>

      {/* ---------------- 2. THE BUILD LOOP OPERATING WORKFLOW (EQUAL HEIGHT GRID) ---------------- */}
      <section className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest block">
            Our Operating Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            The Continuous Build Loop
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light">
            How we take ideas to market and scale them through relentless iteration.
          </p>
        </div>

        {/* 7-Step Interactive Equal Height Flow Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-3 items-stretch">
          {buildLoop.map((step, idx) => {
            const isActive = idx === activeLoopStep;
            return (
              <div
                key={step.name}
                onClick={() => setActiveLoopStep(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 h-full relative overflow-hidden ${
                  isActive
                    ? 'bg-zinc-900 border-emerald-400 text-white shadow-[0_0_25px_rgba(52,211,153,0.25)]'
                    : 'bg-zinc-950/80 border-zinc-800/80 hover:border-zinc-700 text-zinc-400'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-emerald-400 animate-pulse" />
                )}
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold text-emerald-400 block">{step.num}</span>
                  <h4 className="text-xs font-extrabold text-white font-mono uppercase">{step.name}</h4>
                </div>
                <p className="text-[10px] text-zinc-400 font-light leading-snug">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------- 3. BRAND MANIFESTO GRID — 6 Culture Cards (EQUAL HEIGHT) ---------------- */}
      <section className="max-w-7xl mx-auto px-6 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest block">
            The LaunchGremlin Code
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            How We Think & Build
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light">
            An opinionated culture of speed, craftsmanship, and execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {manifestoCards.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(52,211,153,0.2)] transition-all flex flex-col justify-between space-y-4 group relative overflow-hidden h-full"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-emerald-400/30 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-emerald-400 font-bold">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white uppercase group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-xs font-mono text-zinc-400 font-medium block mt-0.5">
                      {item.subtitle}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 text-[10px] font-mono text-emerald-400 font-bold">
                  ● LAUNCHGREMLIN MANIFESTO
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------- 4. COMPARISON: TRADITIONAL AGENCY vs LAUNCHGREMLIN ---------------- */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Telemetry Artifact Card */}
        <div className="lg:col-span-6 relative">
          <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-4 shadow-2xl relative overflow-hidden backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white font-mono">LaunchGremlin Telemetry Logs</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-400/20">
                ● 100% AUTOMATED
              </span>
            </div>

            {/* Live Commit Log */}
            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 font-mono text-[11px] space-y-1">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span>commit c49021a (main -&gt; origin/main)</span>
                <span>JUST NOW</span>
              </div>
              <p className="text-zinc-300">&gt; Feature: Edge UI + Autonomous 24/7 AI workforce integration</p>
              <div className="text-[10px] text-zinc-500">Author: LaunchGremlin OS &lt;dev@launchgremlin.com&gt;</div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs">
                <span className="text-zinc-400 text-[10px] block">Build Time</span>
                <span className="text-base font-extrabold text-white block mt-0.5">0.14 seconds</span>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs">
                <span className="text-zinc-400 text-[10px] block">Global Edge Deploy</span>
                <span className="text-base font-extrabold text-emerald-400 block mt-0.5">32 Locations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Comparison Content */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono">
            <Globe className="w-3.5 h-3.5" />
            <span>THE LAUNCHGREMLIN DIFFERENCE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight uppercase">
            WE BUILD LIKE <br />
            <span className="text-emerald-400">INTERNET COMPANIES.</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
            Traditional agencies charge huge retainers, hold endless status meetings, and take 6 months to deliver a static site. We operate like an agile software startup. We build in sprints, measure real user conversion data, and ship continuously.
          </p>

          <div className="space-y-3 font-mono text-xs text-zinc-300">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Sprint Delivery — Days, Not Months</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full-Stack React, Next.js, and AI Automation</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct Access to Senior Builders & Engineers</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 5. CULTURAL COMMANDMENTS BANNER (REMOVING EMPTY SPACE) ---------------- */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="p-8 rounded-3xl bg-zinc-900/90 border border-emerald-400/30 backdrop-blur-2xl text-center space-y-4 shadow-[0_0_50px_rgba(52,211,153,0.12)]">
          <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">
            Our Cultural Commandment
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono uppercase">
            Move Quickly. Stay Humble. Obsess Over Outcomes.
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-mono text-zinc-400">
            <span>● 100% Product Mindset</span>
            <span>● 0% Corporate Fluff</span>
            <span>● Always Shipping</span>
          </div>
        </div>
      </section>

      {/* ---------------- 6. COLLABORATIVE BUILDER CALL TO ACTION ---------------- */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="p-10 sm:p-14 rounded-3xl bg-zinc-900/90 border border-emerald-400/40 backdrop-blur-2xl text-center space-y-6 shadow-[0_0_60px_rgba(52,211,153,0.18)] relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono relative z-10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Build With Us</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight relative z-10 uppercase">
            Ready to Ship Something <br />
            <span className="text-emerald-400 italic">People Remember?</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-light max-w-xl mx-auto leading-relaxed relative z-10">
            Stop waiting for slow agencies. Collaborate with internet-native builders obsessed with helping creators and founders win on the web.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Build With Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectTab && onSelectTab('websites')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-semibold hover:border-emerald-400 hover:text-white transition-all cursor-pointer"
            >
              <span>Explore Our Products</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
