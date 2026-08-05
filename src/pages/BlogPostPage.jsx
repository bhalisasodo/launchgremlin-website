import React, { useState } from 'react';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import { getArticleBySlug, BLOG_CLUSTERS, BLOG_ARTICLES } from '../utils/blogData';
import {
  Calendar, Clock, User, ArrowLeft, ArrowRight, Share2, Sparkles,
  HelpCircle, ChevronDown, ChevronUp, CheckCircle2, Bookmark, ExternalLink, Lightbulb
} from 'lucide-react';

export default function BlogPostPage({ slug, onSelectTab, onOpenBooking }) {
  const article = getArticleBySlug(slug);
  const [openFaq, setOpenFaq] = useState(0);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center space-y-6">
        <h1 className="text-3xl font-bold text-white">Article Not Found</h1>
        <p className="text-zinc-400">The requested blog post could not be located.</p>
        <button
          onClick={() => onSelectTab('blog')}
          className="px-6 py-3 rounded-xl bg-emerald-400 text-zinc-950 font-bold text-xs uppercase"
        >
          Return to Content Hub
        </button>
      </div>
    );
  }

  const cluster = BLOG_CLUSTERS.find(c => c.id === article.clusterId);

  const handleLinkClick = (e, targetTab) => {
    e.preventDefault();
    if (onSelectTab) onSelectTab(targetTab);
  };

  // Get sibling articles in the same cluster for internal linking recommendations
  const siblingArticles = BLOG_ARTICLES
    .filter(a => a.clusterId === article.clusterId && a.slug !== article.slug)
    .slice(0, 3);

  return (
    <article className="pb-20 select-none">
      {/* ---------------- HERO SECTION ---------------- */}
      <ServiceHeroBackground glowPosition="top-left">
        <div className="max-w-4xl mx-auto space-y-6 pt-6 pb-10 px-4">
          <a
            href="/blog"
            onClick={(e) => handleLinkClick(e, 'blog')}
            className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:underline mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Content Hub</span>
          </a>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 font-mono text-xs font-bold uppercase">
              {cluster ? cluster.name : 'SEO & Growth'}
            </span>
            <span className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" /> {article.publishDate}
            </span>
            <span className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-zinc-500" /> {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-[1.1]">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
            {article.description}
          </p>

          <div className="pt-2 flex items-center gap-3 border-t border-zinc-800/80">
            <div className="w-10 h-10 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
              LG
            </div>
            <div>
              <span className="text-xs font-bold text-white block">{article.author}</span>
              <span className="text-[11px] text-zinc-400 font-mono">Senior SEO & Growth Engineer at LaunchGremlin</span>
            </div>
          </div>
        </div>
      </ServiceHeroBackground>

      {/* ---------------- MAIN ARTICLE BODY CONTAINER ---------------- */}
      <div className="max-w-4xl mx-auto px-6 pt-10 space-y-12">
        {/* Featured Hero Media */}
        {article.heroImage && (
          <div className="rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl relative">
            <img
              src={article.heroImage}
              alt={article.heroImageAlt || article.title}
              width="1200"
              height="675"
              loading="eager"
              decoding="async"
              className="w-full h-auto object-cover max-h-[480px]"
            />
          </div>
        )}

        {/* Executive Summary Box */}
        <div className="p-6 rounded-3xl bg-zinc-900/90 border border-emerald-400/30 space-y-3 shadow-[0_0_30px_rgba(52,211,153,0.1)]">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" />
            <span>Executive Takeaway & Strategy Blueprint</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
            This guide outlines actionable strategies to maximize organic search authority, drive conversion rate optimizations (CRO), and deploy high-performance infrastructure. Key focus areas: sub-second latency, structured JSON-LD schemas, and conversion funnels.
          </p>
        </div>

        {/* Detailed Article Content Body */}
        <div className="prose prose-invert max-w-none text-zinc-300 space-y-8 font-light text-sm sm:text-base leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight pt-4 border-b border-zinc-800 pb-2">
            1. Core Architecture & Strategic Framework
          </h2>
          <p>
            In modern web engineering and growth marketing, achieving market dominance requires an uncompromising commitment to performance, clarity, and conversion architecture. Whether building sub-second web applications or deploying multi-channel content engines, every layer of your digital stack must serve a single goal: turning organic traffic into loyal, paying clients.
          </p>
          <p>
            Traditional legacy systems (such as plugin-heavy WordPress installations or monolithic website builders) create friction through excessive main-thread JavaScript blocking, layout shifts, and slow database queries. By transitioning to decoupled, modern frameworks—such as React 18, Vite, and edge CDN deployments—you eliminate technical debt while guaranteeing 100/100 Core Web Vitals scores.
          </p>

          {/* Visual Callout Box 1 */}
          <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 my-6">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase block">
              ● Technical Performance Benchmark
            </span>
            <p className="text-xs text-zinc-300">
              Websites that load in under 1 second experience 3x higher conversion rates compared to sites loading in 3 seconds or more. Google explicitly rewards sub-second Largest Contentful Paint (LCP) with higher mobile search rankings.
            </p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight pt-4 border-b border-zinc-800 pb-2">
            2. Step-by-Step Implementation Protocol
          </h2>
          <p>
            To execute this methodology effectively within your business, follow this 4-step implementation sequence:
          </p>
          <ol className="list-decimal pl-6 space-y-3 text-zinc-300 font-sans">
            <li>
              <strong>Audit Technical Infrastructure:</strong> Eliminate bloated third-party scripts, uncompressed image assets, and non-essential plugins that delay First Contentful Paint (FCP).
            </li>
            <li>
              <strong>Implement Structured Schemas:</strong> Inject valid JSON-LD schemas (`Organization`, `Service`, `FAQPage`, `BreadcrumbList`) into every pre-rendered HTML document to claim rich snippets in search results.
            </li>
            <li>
              <strong>Engineer Frictionless Lead Capture:</strong> Replace multi-step contact forms with single-click qualification funnels, interactive estimators, and direct calendar integrations.
            </li>
            <li>
              <strong>Deploy Automated Workflows:</strong> Connect form submissions directly to CRM routing, instant SMS confirmation triggers, and automated nurture sequences.
            </li>
          </ol>

          {/* Image Suggestion Card 1 */}
          {article.imageSuggestions && article.imageSuggestions[0] && (
            <div className="my-8 space-y-2 text-center">
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 inline-block text-left w-full">
                <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase block mb-1">
                  📸 Visual Diagram Suggestion: {article.imageSuggestions[0].title}
                </span>
                <p className="text-xs text-zinc-400 font-light italic">
                  "{article.imageSuggestions[0].caption}"
                </p>
              </div>
            </div>
          )}

          <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight pt-2">
            Key Execution Checklist
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-zinc-300">
            <li>Ensure exactly 1 H1 heading tag per page with a strict H2/H3 semantic outline.</li>
            <li>Add explicit `width` and `height` attributes to all image elements to prevent Cumulative Layout Shift (CLS).</li>
            <li>Pre-render static HTML entry points for every route to ensure instant search engine indexing.</li>
            <li>Build internal link hubs linking supporting cluster articles back to pillar service pages.</li>
          </ul>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight pt-4 border-b border-zinc-800 pb-2">
            3. Measuring ROI & Long-Term Compounding Growth
          </h2>
          <p>
            Unlike paid advertising campaigns that stop generating leads the moment ad spend halts, structured organic content and high-performance websites build compound equity over time. As search engines recognize your topical authority and lightning-fast user experience, organic impressions, clicks, and qualified inbound leads increase exponentially.
          </p>
        </div>

        {/* Related LaunchGremlin Services Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 space-y-6 shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Related LaunchGremlin Engineering Solutions</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {article.relatedServices && article.relatedServices.map((svc, idx) => (
              <a
                key={idx}
                href={svc.path}
                onClick={(e) => handleLinkClick(e, svc.path.replace(/^\//, ''))}
                className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-emerald-400/50 hover:text-emerald-300 transition-all flex items-center justify-between group cursor-pointer"
              >
                <span className="text-xs font-bold text-white group-hover:text-emerald-300">
                  {svc.title}
                </span>
                <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </a>
            ))}
          </div>
        </div>

        {/* ---------------- ARTICLE FAQS SECTION ---------------- */}
        <section aria-labelledby="post-faq-title" className="space-y-6 pt-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase block">
              Article FAQs
            </span>
            <h2 id="post-faq-title" className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {article.faqs && article.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="rounded-2xl bg-zinc-900/80 border border-zinc-800 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-800/40"
                  >
                    <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
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
                    <div className="px-4 pb-4 text-xs text-zinc-300 leading-relaxed font-light border-t border-zinc-800/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------------- INTERNAL LINKING RECOMMENDATIONS ---------------- */}
        <section aria-labelledby="related-articles-title" className="space-y-6 pt-6 border-t border-zinc-900">
          <div className="space-y-1">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase block">
              Continue Reading in {cluster ? cluster.name : 'Topic Cluster'}
            </span>
            <h2 id="related-articles-title" className="text-2xl font-black text-white uppercase tracking-tight">
              Recommended Cluster Articles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {siblingArticles.map((sib) => (
              <a
                key={sib.slug}
                href={`/blog/${sib.slug}`}
                onClick={(e) => handleLinkClick(e, `blog/${sib.slug}`)}
                className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-400/50 transition-all space-y-3 flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                    {sib.readTime}
                  </span>
                  <h3 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                    {sib.title}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 group-hover:text-emerald-400">
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ---------------- CALL TO ACTION BANNER ---------------- */}
        <section aria-labelledby="post-cta-title" className="pt-6">
          <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/90 border border-emerald-400/40 text-center space-y-6 shadow-[0_0_50px_rgba(52,211,153,0.15)]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ready to Scale Your Digital Footprint?</span>
            </div>

            <h2 id="post-cta-title" className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              Build a High-Performance Website & Growth Engine.
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 font-light max-w-lg mx-auto leading-relaxed">
              Book a 1-on-1 strategy call with the LaunchGremlin engineering team to audit your platform, craft a custom SEO roadmap, or launch your 72-Hour MVP.
            </p>

            <button
              onClick={onOpenBooking}
              aria-label="Book Strategy Call"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Book Free Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>
    </article>
  );
}
