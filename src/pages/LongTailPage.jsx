import React, { useState } from 'react';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import PricingSection from '../components/common/PricingSection';
import TrustBadges from '../components/common/TrustBadges';
import { getLongTailBySlug, getLongTailByCategory } from '../utils/longTailData';
import {
  Sparkles, ArrowRight, CheckCircle2, Zap, HelpCircle, ChevronDown, ChevronUp,
  Globe, ShieldCheck, Search, Star, Layers
} from 'lucide-react';

export default function LongTailPage({ slug, onOpenBooking, onSelectTab }) {
  const data = getLongTailBySlug(slug);
  const [openFaq, setOpenFaq] = useState(0);

  if (!data) return null;

  const handleLinkClick = (e, targetTab) => {
    e.preventDefault();
    if (onSelectTab) onSelectTab(targetTab);
  };

  // Get sibling long-tail pages in the same category for cross-navigation internal linking
  const siblingPages = getLongTailByCategory(data.category)
    .filter(p => p.slug !== data.slug)
    .slice(0, 8);

  return (
    <div className="space-y-20 pb-20 select-none">
      {/* ---------------- 1. HERO SECTION ---------------- */}
      <ServiceHeroBackground glowPosition="top-left">
        <div className="max-w-5xl mx-auto text-center space-y-6 pt-8 pb-12 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-400/40 text-emerald-400 text-xs font-mono font-bold tracking-wider shadow-[0_0_15px_rgba(52,211,153,0.2)]">
            <Globe className="w-4 h-4 shrink-0" />
            <span>{data.heroBadge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.05]">
            {data.heroHeadline}
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
            {data.heroSubheadline}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              aria-label={`Book strategy call for ${data.label}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <span>{data.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, 'contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-semibold hover:border-emerald-400 hover:text-white transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <span>Request Custom Scope</span>
            </a>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Sub-Second Load Latency (0.24s)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Automated Local SEO Schema
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 7-10 Day Turnaround
            </span>
          </div>
        </div>
      </ServiceHeroBackground>

      <TrustBadges />

      {/* ---------------- 2. BENEFIT PILLARS GRID ---------------- */}
      <section aria-labelledby="lt-benefits-title" className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
            Engineered For {data.label}
          </span>
          <h2 id="lt-benefits-title" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Tailored Features & Growth Pillars
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light">
            Every component is built to maximize conversion rates and drive local search dominance for {data.targetKeyword}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {data.benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/50 hover:shadow-[0_0_25px_rgba(52,211,153,0.15)] transition-all duration-300 flex flex-col justify-between space-y-4 group h-full"
            >
              <div className="space-y-3">
                <span className="px-2.5 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-emerald-400 font-bold inline-block">
                  {benefit.tag}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  {benefit.desc}
                </p>
              </div>
              <div className="pt-3 border-t border-zinc-800/80 text-[10px] font-mono text-emerald-400 font-bold">
                ● CONVERSION OPTIMIZED
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- 3. WHY LAUNCHGREMLIN POSITIONING ---------------- */}
      <section aria-labelledby="lt-why-title" className="max-w-5xl mx-auto px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 shadow-2xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
              The LaunchGremlin Edge
            </span>
            <h2 id="lt-why-title" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              Why Choose Us For {data.label}?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              We combine enterprise full-stack web engineering with aggressive conversion copy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.whyLaunchGremlin.map((point, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/90 flex items-start gap-3 text-xs text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 4. PRICING SECTION ---------------- */}
      <PricingSection onOpenBooking={onOpenBooking} onSelectTab={onSelectTab} />

      {/* ---------------- 5. FAQS SECTION ---------------- */}
      <section aria-labelledby="lt-faq-title" className="max-w-4xl mx-auto px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest block">
            Buyer Intent FAQs
          </span>
          <h2 id="lt-faq-title" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light">
            Everything you need to know about our web design process for {data.label.toLowerCase()}.
          </p>
        </div>

        <div className="space-y-4">
          {data.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="rounded-2xl bg-zinc-900/80 border border-zinc-800 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-800/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <span className="text-sm font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-zinc-300 leading-relaxed font-light border-t border-zinc-800/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------- 6. INTERNAL LINKING CROSS-NAVIGATION ---------------- */}
      <section aria-labelledby="lt-crossnav-title" className="max-w-6xl mx-auto px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
            Related Services in {data.category}
          </span>
          <h2 id="lt-crossnav-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
            Explore Related Niche Solutions
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {siblingPages.map((sib) => (
            <a
              key={sib.slug}
              href={sib.path}
              onClick={(e) => handleLinkClick(e, sib.slug)}
              className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-400/50 hover:text-emerald-300 transition-all text-center space-y-1.5 flex flex-col items-center justify-center group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <span className="text-xs font-semibold text-zinc-200 block truncate w-full group-hover:text-emerald-300">
                {sib.label}
              </span>
              <span className="text-[10px] font-mono text-zinc-500 block truncate w-full">
                {sib.targetKeyword}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ---------------- 7. CALL TO ACTION BANNER ---------------- */}
      <section aria-labelledby="lt-cta-title" className="max-w-4xl mx-auto px-6">
        <div className="p-10 sm:p-14 rounded-3xl bg-zinc-900/90 border border-emerald-400/40 text-center space-y-6 shadow-[0_0_60px_rgba(52,211,153,0.18)]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to Dominate Your Niche?</span>
          </div>

          <h2 id="lt-cta-title" className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            Transform Your {data.label} Website Today.
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-light max-w-xl mx-auto leading-relaxed">
            Schedule a 1-on-1 strategy call with our engineering team to map out your digital footprint and lead capture engine.
          </p>

          <button
            onClick={onOpenBooking}
            aria-label={`Book strategy call for ${data.label}`}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <span>Book Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
