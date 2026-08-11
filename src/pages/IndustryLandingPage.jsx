import React, { useState } from 'react';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import PricingSection from '../components/common/PricingSection';
import TrustBadges from '../components/common/TrustBadges';
import { getIndustryDataBySlug, INDUSTRIES_DATA } from '../utils/industryData';
import {
  Dumbbell, Utensils, Scissors, Coffee, UserCheck, Flame, Video,
  Sparkles, Camera, Stethoscope, Briefcase, Building, Calculator,
  Hammer, ArrowRight, CheckCircle2, Zap, HelpCircle, ChevronDown, ChevronUp
} from 'lucide-react';

const ICON_MAP = {
  Dumbbell, Utensils, Scissors, Coffee, UserCheck, Flame, Video,
  Sparkles, Camera, Stethoscope, Briefcase, Building, Calculator, Hammer
};

export default function IndustryLandingPage({ industryKey, onOpenBooking, onSelectTab }) {
  const data = getIndustryDataBySlug(industryKey);
  const [openFaq, setOpenFaq] = useState(0);

  if (!data) return null;

  const IconComponent = ICON_MAP[data.iconName] || Sparkles;

  const handleLinkClick = (e, targetTab) => {
    e.preventDefault();
    if (onSelectTab) onSelectTab(targetTab);
  };

  const siblingIndustries = Object.keys(INDUSTRIES_DATA)
    .filter(k => k !== industryKey)
    .slice(0, 6);

  return (
    <div className="space-y-20 pb-20 select-none">
      {/* ---------------- 1. HERO SECTION ---------------- */}
      <ServiceHeroBackground glowPosition="top-left">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 pb-12 px-4">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-400/40 text-emerald-400 text-xs font-mono font-bold tracking-wider shadow-[0_0_15px_rgba(52,211,153,0.2)]">
              <IconComponent className="w-4 h-4 shrink-0" />
              <span>{data.heroBadge}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-[1.05]">
              {data.heroHeadline}
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 font-light max-w-xl leading-relaxed">
              {data.heroSubheadline}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenBooking}
                aria-label={`Book strategy call for ${data.name}`}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>{data.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="/contact"
                onClick={(e) => handleLinkClick(e, 'contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-semibold hover:border-emerald-400 hover:text-white transition-all cursor-pointer"
              >
                <span>Request Custom Scope</span>
              </a>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Sub-Second Load Speeds
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Automated Local SEO
              </span>
            </div>
          </div>

          {/* Hero Photography Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-emerald-400/30 shadow-[0_0_50px_rgba(52,211,153,0.15)] group">
              <img
                src={data.heroImage}
                alt={data.heroImageAlt || data.name}
                width="800"
                height="600"
                loading="eager"
                decoding="async"
                className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent flex items-end p-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">
                    ● TAILORED INDUSTRY UX
                  </span>
                  <p className="text-sm font-extrabold text-white uppercase tracking-tight">
                    Engineered for {data.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ServiceHeroBackground>

      <TrustBadges />

      {/* ---------------- 2. BENEFIT CARDS GRID ---------------- */}
      <section aria-labelledby="benefits-title" className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
            Specialized Features
          </span>
          <h2 id="benefits-title" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Built Specifically For {data.name}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light">
            Every feature is engineered to eliminate drop-off and maximize lead conversion for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/50 hover:shadow-[0_0_25px_rgba(52,211,153,0.15)] transition-all duration-300 flex flex-col justify-between space-y-4 group"
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

      {/* ---------------- 3. HUMAN STORYTELLING FEATURE BREAKDOWN ---------------- */}
      <section aria-labelledby="storytelling-heading" className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center p-8 sm:p-12 rounded-3xl bg-zinc-900/90 border border-zinc-800">
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
              Human-First Design
            </span>
            <h2 id="storytelling-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase leading-tight">
              Real Impact For Real Business Owners.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
              We understand that your website is your digital storefront. It needs to reflect the quality, passion, and operational excellence you bring to your clients every single day.
            </p>

            <div className="space-y-3 pt-2">
              {data.whyLaunchGremlin.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs text-zinc-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider hover:bg-emerald-300 transition-all cursor-pointer"
              >
                <span>Book Strategy Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
              <img
                src={data.featureImage}
                alt={data.featureImageAlt || `${data.name} professional in action`}
                width="1000"
                height="700"
                loading="lazy"
                decoding="async"
                className="w-full h-[380px] sm:h-[440px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 4. PRICING SECTION ---------------- */}
      <PricingSection onOpenBooking={onOpenBooking} onSelectTab={onSelectTab} />

      {/* ---------------- 6. FAQS SECTION ---------------- */}
      <section aria-labelledby="faq-title" className="max-w-4xl mx-auto px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest block">
            Got Questions?
          </span>
          <h2 id="faq-title" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {data.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="rounded-2xl bg-zinc-900/80 border border-zinc-800 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-800/40"
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

      {/* ---------------- 7. CROSS-INDUSTRY NAVIGATION ---------------- */}
      <section aria-labelledby="crossnav-title" className="max-w-6xl mx-auto px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
            Explore Other Industries
          </span>
          <h2 id="crossnav-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
            Specialized Websites For Every Sector
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {siblingIndustries.map((key) => {
            const sib = INDUSTRIES_DATA[key];
            const SibIcon = ICON_MAP[sib.iconName] || Sparkles;
            return (
              <a
                key={sib.slug}
                href={sib.path}
                onClick={(e) => handleLinkClick(e, sib.slug)}
                className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-400/50 hover:text-emerald-300 transition-all text-center space-y-2 flex flex-col items-center justify-center group cursor-pointer"
              >
                <SibIcon className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-zinc-200 block truncate w-full group-hover:text-emerald-300">
                  {sib.shortTitle}
                </span>
              </a>
            );
          })}
        </div>
      </section>

      {/* ---------------- 8. CALL TO ACTION BANNER ---------------- */}
      <section aria-labelledby="cta-title" className="max-w-4xl mx-auto px-6">
        <div className="p-10 sm:p-14 rounded-3xl bg-zinc-900/90 border border-emerald-400/40 text-center space-y-6 shadow-[0_0_50px_rgba(52,211,153,0.15)]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to Scale Your Business?</span>
          </div>

          <h2 id="cta-title" className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            Transform Your {data.name} Website Today.
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-light max-w-xl mx-auto leading-relaxed">
            Schedule a 1-on-1 strategy call with our engineering team to map out your digital product and lead funnel.
          </p>

          <button
            onClick={onOpenBooking}
            aria-label={`Book strategy call for ${data.name}`}
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
