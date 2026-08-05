import React, { useState } from 'react';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import PricingSection from '../components/common/PricingSection';
import AuthorBio from '../components/common/AuthorBio';
import { getArticleBySlug, BLOG_ARTICLES } from '../utils/blogData';
import {
  Calendar, Clock, User, ArrowRight, ArrowLeft, Share2, HelpCircle,
  ChevronDown, ChevronUp, Sparkles, CheckCircle2, Bookmark
} from 'lucide-react';

export default function BlogPostPage({ slug, onSelectTab, onOpenBooking }) {
  const article = getArticleBySlug(slug);
  const [openFaq, setOpenFaq] = useState(0);

  if (!article) return null;

  const handleLinkClick = (e, targetTab) => {
    e.preventDefault();
    if (onSelectTab) onSelectTab(targetTab);
  };

  const relatedArticles = BLOG_ARTICLES
    .filter(a => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  return (
    <div className="space-y-16 pb-20 select-none">
      {/* ---------------- 1. HERO HEADER ---------------- */}
      <ServiceHeroBackground glowPosition="top-left">
        <div className="max-w-4xl mx-auto space-y-6 pt-6 pb-12 px-4 text-left">
          <a
            href="/blog"
            onClick={(e) => handleLinkClick(e, 'blog')}
            className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Content Hub</span>
          </a>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-bold">
              {article.category}
            </span>
            <span className="text-xs font-mono text-zinc-400">
              {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-[1.1]">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
            {article.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-zinc-400 border-t border-zinc-800/80 pt-4">
            <span className="flex items-center gap-1.5 text-zinc-200">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span>By {article.author}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Published: {article.publishDate}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Updated: August 5, 2026</span>
            </span>
          </div>
        </div>
      </ServiceHeroBackground>

      {/* ---------------- 2. ARTICLE CONTENT & BODY ---------------- */}
      <article className="max-w-4xl mx-auto px-6 space-y-10">
        {/* E-E-A-T Author Credentials Box */}
        <AuthorBio
          author={article.author}
          publishDate={article.publishDate}
          updatedDate="August 5, 2026"
          readTime={article.readTime}
        />

        {/* Hero Banner Image */}
        {article.heroImage && (
          <div className="rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
            <img
              src={article.heroImage}
              alt={article.heroImageAlt || article.title}
              width="1200"
              height="630"
              loading="eager"
              decoding="async"
              className="w-full h-auto max-h-[450px] object-cover"
            />
          </div>
        )}

        {/* Formatted Article Body */}
        <div className="space-y-8 text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
          {article.contentSections.map((section, idx) => (
            <section key={idx} className="space-y-4 pt-4 border-t border-zinc-900 first:border-none first:pt-0">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                {section.h2}
              </h2>
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-zinc-300 font-light leading-relaxed">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        {/* Related LaunchGremlin Service Cross-Link Banner */}
        {article.relatedService && (
          <div className="p-8 rounded-3xl bg-zinc-900/90 border border-emerald-400/40 space-y-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(52,211,153,0.12)]">
            <div className="space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase block">
                Related Service Solution
              </span>
              <h3 className="text-xl font-bold text-white uppercase">
                {article.relatedService.name}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light max-w-lg">
                Ready to implement the strategies outlined in this guide? Build your high-performance engine with LaunchGremlin today.
              </p>
            </div>
            <a
              href={article.relatedService.path}
              onClick={(e) => handleLinkClick(e, article.relatedService.path.replace(/^\//, ''))}
              className="px-6 py-3.5 rounded-2xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider hover:bg-emerald-300 transition-all shrink-0 cursor-pointer"
            >
              Explore Service →
            </a>
          </div>
        )}

        {/* ---------------- 3. ARTICLE FAQS ---------------- */}
        {article.faqs && article.faqs.length > 0 && (
          <section aria-labelledby="blog-faq-heading" className="space-y-6 pt-6 border-t border-zinc-800">
            <div className="space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase block">
                Frequently Asked Questions
              </span>
              <h2 id="blog-faq-heading" className="text-2xl font-extrabold text-white uppercase">
                Questions Answered in This Guide
              </h2>
            </div>

            <div className="space-y-4">
              {article.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="rounded-2xl bg-zinc-900/80 border border-zinc-800 overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-800/40"
                    >
                      <span className="text-xs font-bold text-white flex items-center gap-2">
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
        )}

        {/* ---------------- 4. RELATED ARTICLES SIBLINGS ---------------- */}
        {relatedArticles.length > 0 && (
          <section aria-labelledby="blog-related-heading" className="space-y-6 pt-6 border-t border-zinc-800">
            <h2 id="blog-related-heading" className="text-2xl font-extrabold text-white uppercase">
              More Guides in {article.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedArticles.map((rel) => (
                <a
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  onClick={(e) => handleLinkClick(e, `blog/${rel.slug}`)}
                  className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-400/50 transition-all space-y-3 flex flex-col justify-between group cursor-pointer"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                      {rel.readTime}
                    </span>
                    <h3 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                      {rel.title}
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
        )}
      </article>
    </div>
  );
}
