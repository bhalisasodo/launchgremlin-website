import React from 'react';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import TrustBadges from '../components/common/TrustBadges';
import { ArrowRight, CheckCircle2, ShieldCheck, Award, Zap, Code, Bot, TrendingUp, Sparkles, Building2, RefreshCw, Layers } from 'lucide-react';

export default function AboutPage({ onSelectTab, onOpenBooking }) {
  const handleLinkClick = (e, tab) => {
    e.preventDefault();
    if (onSelectTab) onSelectTab(tab);
  };

  const experienceIndicators = [
    { metric: '10+ Years', label: 'Full-Stack & AI Engineering Experience' },
    { metric: '48+ Builds', label: 'High-Performance Products Shipped' },
    { metric: '0.24s Avg', label: 'First Contentful Paint (FCP) Load Latency' },
    { metric: '100/100', label: 'Guaranteed Core Web Vitals Benchmark' }
  ];

  return (
    <div className="space-y-20 pb-20 select-none">
      {/* Hero Section */}
      <ServiceHeroBackground glowPosition="top-left">
        <div className="max-w-5xl mx-auto text-center space-y-6 pt-8 pb-12 px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-bold tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>ABOUT LAUNCHGREMLIN • INTERNET-NATIVE BUILDERS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-[1.05]">
            ENGINEERING EXCELLENCE FOR AMBITIOUS BRANDS.
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
            LaunchGremlin was founded on a singular premise: speed, simplicity, and aggressive iteration win on the modern internet. We build digital products and AI automation systems designed for maximum commercial growth.
          </p>

          <div className="pt-2">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Schedule Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </ServiceHeroBackground>

      {/* Trust & Guarantee Badges Strip */}
      <TrustBadges />

      {/* Experience Indicators Metric Strip */}
      <section aria-labelledby="experience-heading" className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {experienceIndicators.map((exp, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 text-center space-y-2">
              <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono block">
                {exp.metric}
              </span>
              <span className="text-xs text-zinc-400 font-light block leading-tight">
                {exp.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT THE FOUNDER SECTION */}
      <section aria-labelledby="founder-heading" className="max-w-5xl mx-auto px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-zinc-950 border border-emerald-400/30 shadow-[0_0_40px_rgba(52,211,153,0.12)] space-y-8 relative overflow-hidden">
          {/* Subtle Glow Line */}
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-80" />

          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-zinc-800 pb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <img
                  src="/assets/founder.jpg"
                  alt="Bhalisa Sodo — Founder of LaunchGremlin"
                  width="160"
                  height="160"
                  loading="eager"
                  decoding="async"
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl sm:rounded-3xl object-cover border-2 border-emerald-400/40 shadow-[0_0_25px_rgba(52,211,153,0.2)] shrink-0"
                />
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-bold">
                    <Award className="w-3.5 h-3.5" />
                    <span>FOUNDER & VISIONARY ARCHITECT</span>
                  </div>
                  <h2 id="founder-heading" className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
                    About the Founder
                  </h2>
                  <p className="text-xs font-mono text-emerald-400 font-bold">
                    Bhalisa Sodo • Data Science & Systems Development
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                <span className="px-3 py-1 rounded-xl bg-zinc-950 border border-zinc-800 text-emerald-400 font-semibold">
                  Data Science & Systems
                </span>
                <span className="px-3 py-1 rounded-xl bg-zinc-950 border border-zinc-800 text-emerald-400 font-semibold">
                  AI & Automation
                </span>
              </div>
            </div>

            {/* Profile Bio Details */}
            <div className="space-y-4 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              <p className="text-sm sm:text-base font-normal text-white">
                <strong className="text-emerald-400 font-semibold">Bhalisa Sodo</strong> is the Founder of LaunchGremlin, an AI-native company helping entrepreneurs, creators, and businesses launch and grow through intelligent technology.
              </p>

              <p>
                With a background in Data Science and Systems Development, Bhalisa combines technical expertise with a deep passion for entrepreneurship and emerging technologies. Before founding LaunchGremlin, he worked across customer operations and technology-focused roles while independently building products, exploring blockchain technologies, and developing AI-driven solutions.
              </p>

              <p>
                His experience spans artificial intelligence, automation, data analytics, software development, and digital strategy, with a strong belief that modern AI has fundamentally changed how businesses can be built and scaled. Rather than viewing AI as a replacement for human creativity, he sees it as a force multiplier that enables small teams to deliver enterprise-level outcomes.
              </p>

              {/* Core Philosophy Highlight Card */}
              <div className="p-6 rounded-2xl bg-zinc-950/80 border-l-4 border-emerald-400 border-zinc-800/80 text-zinc-200 font-normal italic space-y-2">
                <p className="not-italic font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold">
                  The LaunchGremlin Philosophy
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  &quot;LaunchGremlin was founded on that philosophy: combining human strategy with AI-powered execution to help businesses move faster, make better decisions, and build a stronger digital presence.&quot;
                </p>
              </div>

              <p>
                Today, Bhalisa leads the company&apos;s vision, product strategy, and AI innovation, continually refining the systems and workflows that power LaunchGremlin&apos;s services while building toward a future where intelligent automation becomes a competitive advantage for every business.
              </p>
            </div>

            {/* Credential Indicators */}
            <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" /> Data Science & Systems Architecture
              </span>
              <span className="flex items-center gap-1.5 text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Autonomous AI & Workflow Pipelines
              </span>
              <span className="flex items-center gap-1.5 text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Digital Strategy & Product Engineering
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY MISSION STATEMENT */}
      <section aria-labelledby="about-philosophy-title" className="px-6 max-w-6xl mx-auto">
        <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 text-center relative overflow-hidden shadow-2xl space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-bold">
            <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
            <span>LaunchGremlin Operating Philosophy</span>
          </div>

          <h2 id="about-philosophy-title" className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto uppercase">
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

      {/* Call to Action */}
      <section aria-labelledby="about-cta-title" className="max-w-4xl mx-auto px-6 text-center">
        <div className="p-10 sm:p-14 rounded-3xl bg-zinc-900/90 border border-emerald-400/40 text-center space-y-6 shadow-[0_0_50px_rgba(52,211,153,0.15)]">
          <h2 id="about-cta-title" className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            Work Directly With Our Senior Engineers.
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-light max-w-xl mx-auto leading-relaxed">
            No account managers. No middle layers. Speak directly with the engineering leads building your digital product.
          </p>

          <button
            onClick={onOpenBooking}
            aria-label="Book Strategy Call"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Book Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
