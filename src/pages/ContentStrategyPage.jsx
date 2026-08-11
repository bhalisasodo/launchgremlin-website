import React from 'react';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import PricingSection from '../components/common/PricingSection';
import TrustBadges from '../components/common/TrustBadges';
import { ArrowRight, CheckCircle2, TrendingUp, Sparkles, Video, Share2, Target, Calendar } from 'lucide-react';

export default function ContentStrategyPage({ onSelectTab, onOpenBooking }) {
  const handleLinkClick = (e, tab) => {
    e.preventDefault();
    if (onSelectTab) onSelectTab(tab);
  };

  const supportingArticles = [
    { slug: 'data-driven-content-strategy-framework', title: 'The Data-Driven Content Strategy Framework: Turn Articles into Clients', readTime: '13 min read' },
    { slug: 'instagram-reels-algorithm-playbook-2026', title: 'The Instagram Reels Algorithm Playbook (2026 Edition)', readTime: '11 min read' },
    { slug: 'short-form-video-scripting-that-hooks-viewers', title: 'Short-Form Video Scripting: The 3-Second Hook Formula That Retains 80%', readTime: '9 min read' },
    { slug: 'multi-channel-content-distribution-engine', title: 'Building a Multi-Channel Content Distribution Engine (5 Platforms, 1 Asset)', readTime: '11 min read' }
  ];

  return (
    <div className="space-y-20 pb-20 select-none">
      {/* Hero Section */}
      <ServiceHeroBackground glowPosition="top-left">
        <div className="max-w-5xl mx-auto text-center space-y-6 pt-8 pb-12 px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-bold tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>CONTENT STRATEGY & AUDIENCE ENGINE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-[1.05]">
            DOMINATE SEARCH & MONETIZE YOUR AUDIENCE.
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
            Data-backed content frameworks, short-form video scripting, multi-channel distribution queues, and audience retention funnels built for ambitious brands.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <span>Book Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="/websites"
              onClick={(e) => handleLinkClick(e, 'websites')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-semibold hover:border-emerald-400 hover:text-white transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <span>Explore High-Speed Websites</span>
            </a>
          </div>
        </div>
      </ServiceHeroBackground>

      <TrustBadges />

      {/* Feature Pillars */}
      <section aria-labelledby="cs-features-title" className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
            Systematic Growth
          </span>
          <h2 id="cs-features-title" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Multi-Channel Content System
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
            <Video className="w-8 h-8 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Short-Form Retention Scripting</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              3-second hook formulas and retention scripts engineered for TikTok, Instagram Reels, and YouTube Shorts.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
            <Share2 className="w-8 h-8 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">5-Platform Content Repurposing</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Turn 1 long-form core asset into 20 social posts, carousels, newsletter issues, and SEO articles automatically.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
            <Target className="w-8 h-8 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Revenue Attribution Tracking</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Connect Google Analytics 4 and custom conversion tracking to measure exact dollar returns on content spend.
            </p>
          </div>
        </div>
      </section>

      {/* CREATOR STUDIO VISUAL STORYTELLING SHOWCASE */}
      <section aria-labelledby="creator-studio-heading" className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center p-8 sm:p-12 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl">
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
              Creator Studio Production
            </span>
            <h2 id="creator-studio-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase leading-tight">
              Turn Authentic Stories Into Paying Clients.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
              We help founders and creators record, edit, and distribute high-retention video content across TikTok, Instagram, YouTube, and LinkedIn. Every asset is backed by retention analytics and lead capture funnels.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-zinc-200 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>3-Second Hook Formulas Retaining 80%+ Audience</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-200 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Multi-Platform Repurposing (1 Shoot = 20 Assets)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-emerald-400/30 shadow-[0_0_40px_rgba(52,211,153,0.15)]">
              <img
                src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=1000&auto=format&fit=crop&q=80"
                alt="Creator recording video content in studio"
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

      {/* Pricing Section */}
      <PricingSection onOpenBooking={onOpenBooking} onSelectTab={onSelectTab} />

      {/* Supporting Blog Guides */}
      <section aria-labelledby="cs-blogs-title" className="max-w-7xl mx-auto px-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase block">
              Content Strategy Knowledge Base
            </span>
            <h2 id="cs-blogs-title" className="text-2xl font-extrabold text-white uppercase tracking-tight">
              Supporting Strategy Guides & Frameworks
            </h2>
          </div>
          <a
            href="/blog"
            onClick={(e) => handleLinkClick(e, 'blog')}
            className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <span>Explore All 100 Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {supportingArticles.map((art) => (
            <a
              key={art.slug}
              href={`/blog/${art.slug}`}
              onClick={(e) => handleLinkClick(e, `blog/${art.slug}`)}
              className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-400/50 transition-all space-y-3 flex flex-col justify-between group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                  {art.readTime}
                </span>
                <h3 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                  {art.title}
                </h3>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 group-hover:text-emerald-400">
                <span>Read Strategy Blueprint</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section aria-labelledby="cs-cta-title" className="max-w-4xl mx-auto px-6">
        <div className="p-10 sm:p-14 rounded-3xl bg-zinc-900/90 border border-emerald-400/40 text-center space-y-6 shadow-[0_0_50px_rgba(52,211,153,0.15)]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Outgrow Social Algorithms</span>
          </div>

          <h2 id="cs-cta-title" className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            Build Your Data-Driven Content Engine.
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-light max-w-xl mx-auto leading-relaxed">
            Schedule a 30-minute content strategy audit session to build your 30-day content calendar and distribution queue.
          </p>

          <button
            onClick={onOpenBooking}
            aria-label="Book Content Strategy Call"
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
