import React from 'react';
import WebsitesHeroScene from '../components/services/WebsitesHeroScene';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import PricingSection from '../components/common/PricingSection';
import { ArrowRight, CheckCircle2, Globe, Zap, Code, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { INDUSTRIES_DATA } from '../utils/industryData';

export default function WebsitesPage({ onSelectTab, onOpenBooking }) {
  const handleLinkClick = (e, tab) => {
    e.preventDefault();
    if (onSelectTab) onSelectTab(tab);
  };

  const featuredIndustries = Object.keys(INDUSTRIES_DATA).slice(0, 8);

  const supportingArticles = [
    { slug: 'sub-second-website-speed-guide', title: 'The Ultimate Guide to Sub-Second Website Speed: 100/100 Core Web Vitals', readTime: '12 min read' },
    { slug: 'high-converting-landing-page-anatomy', title: 'Anatomy of a High-Converting Landing Page: $1M+ Lead Funnel Framework', readTime: '10 min read' },
    { slug: 'core-web-vitals-optimization-2026', title: 'Core Web Vitals Optimization in 2026: LCP, CLS & INP Masterclass', readTime: '11 min read' },
    { slug: 'react-vs-wordpress-for-business', title: 'React 18 vs. WordPress in 2026: Which Is Better for Growing Businesses?', readTime: '9 min read' }
  ];

  return (
    <div className="space-y-20 pb-20 select-none">
      {/* Hero Section */}
      <ServiceHeroBackground glowPosition="top-right">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 pb-12">
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-bold tracking-wider">
              <Globe className="w-3.5 h-3.5" />
              <span>HIGH-PERFORMANCE WEB ENGINEERING</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-[1.05]">
              Sub-Second Digital Products & Websites.
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 font-light max-w-xl leading-relaxed">
              We build custom, lightning-fast web applications using React 18, Vite, and Next.js. Engineered for 100/100 Core Web Vitals, maximum search engine indexing, and seamless lead conversion.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Book Web Strategy Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="/contact"
                onClick={(e) => handleLinkClick(e, 'contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-semibold hover:border-emerald-400 hover:text-white transition-all cursor-pointer"
              >
                <span>Scope Custom Project</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <WebsitesHeroScene />
          </div>
        </div>
      </ServiceHeroBackground>

      {/* Feature Grid Section */}
      <section aria-labelledby="web-features-heading" className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
            Engineering Excellence
          </span>
          <h2 id="web-features-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Built for Extreme Speed & Conversion
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light">
            Every line of code is optimized to eliminate main-thread latency and turn casual visitors into clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
            <Zap className="w-8 h-8 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Sub-0.3s FCP Load Speeds</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Global CDN edge deployment ensures your website loads instantly anywhere in the world, dramatically reducing bounce rates.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Automated SEO & Schema</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Pre-rendered static HTML with dynamic JSON-LD schemas (`Organization`, `Service`, `FAQPage`) built directly into the build pipeline.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
            <Code className="w-8 h-8 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Modern React 18 Architecture</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Zero plugin clutter. Clean modular React components engineered for security, accessibility, and long-term scalability.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection onOpenBooking={onOpenBooking} onSelectTab={onSelectTab} />

      {/* Industry Verticals Link Grid */}
      <section aria-labelledby="web-verticals-title" className="max-w-7xl mx-auto px-6 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
            Specialized Industry Engineering
          </span>
          <h2 id="web-verticals-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
            Websites Custom Built For Your Sector
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {featuredIndustries.map((key) => {
            const ind = INDUSTRIES_DATA[key];
            return (
              <a
                key={ind.slug}
                href={ind.path}
                onClick={(e) => handleLinkClick(e, ind.slug)}
                className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-400/50 hover:text-emerald-300 transition-all text-center space-y-1 block group cursor-pointer"
              >
                <span className="text-xs font-bold text-white group-hover:text-emerald-300 block truncate">
                  {ind.name}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 block truncate">
                  View Industry Solution →
                </span>
              </a>
            );
          })}
        </div>
      </section>

      {/* Supporting Blog Articles Link Grid */}
      <section aria-labelledby="web-blogs-title" className="max-w-7xl mx-auto px-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase block">
              Knowledge Base
            </span>
            <h2 id="web-blogs-title" className="text-2xl font-extrabold text-white uppercase tracking-tight">
              Supporting Technical Guides & Case Studies
            </h2>
          </div>
          <a
            href="/blog"
            onClick={(e) => handleLinkClick(e, 'blog')}
            className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
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
              className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-400/50 transition-all space-y-3 flex flex-col justify-between group cursor-pointer"
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
                <span>Read Technical Blueprint</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section aria-labelledby="web-cta-title" className="max-w-4xl mx-auto px-6">
        <div className="p-10 sm:p-14 rounded-3xl bg-zinc-900/90 border border-emerald-400/40 text-center space-y-6 shadow-[0_0_50px_rgba(52,211,153,0.15)]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sub-Second Performance Guaranteed</span>
          </div>

          <h2 id="web-cta-title" className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            Ready to Build Your Custom Website?
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-light max-w-xl mx-auto leading-relaxed">
            Schedule a 30-minute web architecture session with our lead engineers to map out your digital product and lead funnel.
          </p>

          <button
            onClick={onOpenBooking}
            aria-label="Book Web Strategy Call"
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
