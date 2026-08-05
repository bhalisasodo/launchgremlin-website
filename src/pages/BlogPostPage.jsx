import React, { useState } from 'react';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import PricingSection from '../components/common/PricingSection';
import AuthorBio from '../components/common/AuthorBio';
import { getArticleBySlug, BLOG_ARTICLES } from '../utils/blogData';
import {
  Calendar, Clock, User, ArrowRight, ArrowLeft, Share2, HelpCircle,
  ChevronDown, ChevronUp, Sparkles, CheckCircle2, Bookmark, Code,
  Copy, Check, FileText, Search, AlertTriangle, ExternalLink, Tag
} from 'lucide-react';

export default function BlogPostPage({ slug, onSelectTab, onOpenBooking }) {
  const article = getArticleBySlug(slug);
  const [openFaq, setOpenFaq] = useState(0);
  const [copiedSnippet, setCopiedSnippet] = useState(null);
  const [imgError, setImgError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLinkClick = (e, targetTab) => {
    e.preventDefault();
    if (!onSelectTab) return;
    const cleanTab = targetTab.replace(/^\/+/, '');
    onSelectTab(cleanTab === '' ? 'home' : cleanTab);
  };

  const copyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(index);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  // Helper to parse inline markdown links like [Text](/path) into interactive elements
  const renderBodyWithLinks = (text) => {
    if (!text) return null;
    const parts = [];
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      const linkText = match[1];
      const linkPath = match[2];
      parts.push(
        <a
          key={match.index}
          href={linkPath}
          onClick={(e) => handleLinkClick(e, linkPath)}
          className="text-emerald-400 font-semibold underline decoration-emerald-400/40 hover:decoration-emerald-400 hover:text-emerald-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          {linkText}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts;
  };

  // ---------------- STEP 10: GRACEFUL MISSING ARTICLE / 404 STATE ----------------
  if (!article) {
    const recommendedArticles = BLOG_ARTICLES.slice(0, 3);
    const filteredSearch = searchQuery.trim()
      ? BLOG_ARTICLES.filter(a =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.description.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 6)
      : null;

    return (
      <div className="space-y-16 pb-20 select-none max-w-5xl mx-auto px-6 pt-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/90 border border-zinc-800 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center mx-auto text-emerald-400">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">
              404 — ARTICLE NOT FOUND
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              Looking for Strategic Guidance?
            </h1>
            <p className="text-sm text-zinc-400 max-w-lg mx-auto">
              The guide at <code className="text-emerald-400 font-mono text-xs px-2 py-0.5 rounded bg-zinc-950">/blog/{slug}</code> could not be found or has been relocated.
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-md mx-auto relative">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 100 strategic articles..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              />
            </div>
          </div>

          {filteredSearch ? (
            <div className="space-y-3 text-left pt-4">
              <h2 className="text-xs font-mono text-emerald-400 font-bold uppercase">
                Search Results ({filteredSearch.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredSearch.map(item => (
                  <a
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    onClick={(e) => handleLinkClick(e, `blog/${item.slug}`)}
                    className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-emerald-400/50 transition-all text-xs font-bold text-white hover:text-emerald-300 line-clamp-1"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="/blog"
                onClick={(e) => handleLinkClick(e, 'blog')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider hover:bg-emerald-300 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Content Hub</span>
              </a>
            </div>
          )}
        </div>

        {/* Recommended Fallback Guides */}
        <section className="space-y-6">
          <h2 className="text-lg font-extrabold text-white uppercase tracking-tight">
            Recommended Featured Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recommendedArticles.map((rec) => (
              <a
                key={rec.slug}
                href={`/blog/${rec.slug}`}
                onClick={(e) => handleLinkClick(e, `blog/${rec.slug}`)}
                className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-400/50 transition-all space-y-3 flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                    {rec.category}
                  </span>
                  <h3 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                    {rec.title}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 group-hover:text-emerald-400">
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // Related sibling articles in same cluster/category
  const relatedArticles = BLOG_ARTICLES
    .filter(a => (a.clusterId === article.clusterId || a.category === article.category) && a.slug !== article.slug)
    .slice(0, 3);

  return (
    <div className="space-y-16 pb-20 select-none">
      {/* ---------------- 1. HERO HEADER ---------------- */}
      <ServiceHeroBackground glowPosition="top-left">
        <div className="max-w-4xl mx-auto space-y-6 pt-6 pb-12 px-4 text-left">
          <a
            href="/blog"
            onClick={(e) => handleLinkClick(e, 'blog')}
            className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
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

            {/* AI Curated Badge with Hover Tooltip */}
            <div className="relative group/tooltip inline-block">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-[10px] font-mono font-bold cursor-help">
                <Sparkles className="w-3 h-3" />
                <span>AI Curated</span>
              </span>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block z-30 px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-[10px] font-mono whitespace-nowrap shadow-2xl pointer-events-none">
                Produced by LaunchGremlin&apos;s AI Editorial Team.
              </div>
            </div>

            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Published: {article.publishDate}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Updated: {article.updatedDate || 'August 5, 2026'}</span>
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
          updatedDate={article.updatedDate || 'August 5, 2026'}
          readTime={article.readTime}
        />

        {/* Hero Cover Image with Fallback */}
        {article.heroImage && !imgError ? (
          <div className="rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
            <img
              src={article.heroImage}
              alt={article.heroImageAlt || article.title}
              width="1200"
              height="630"
              loading="eager"
              decoding="async"
              onError={() => setImgError(true)}
              className="w-full h-auto max-h-[450px] object-cover"
            />
          </div>
        ) : (
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-emerald-400/30 text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono">
              <FileText className="w-3.5 h-3.5" />
              <span>{article.category} Blueprint</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white uppercase">{article.title}</h2>
          </div>
        )}

        {/* Formatted Article Body */}
        <div className="space-y-10 text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
          {article.content && article.content.map((section, idx) => {
            const headingId = section.heading
              ? section.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
              : `section-${idx}`;

            return (
              <div key={idx} id={headingId} className="space-y-5">
                {section.heading && (
                  <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight pt-4 border-b border-zinc-800/80 pb-2">
                    {section.heading}
                  </h2>
                )}

                {section.body && (
                  <p className="text-zinc-300 leading-relaxed font-light">
                    {renderBodyWithLinks(section.body)}
                  </p>
                )}

                {/* Key Takeaway Banner */}
                {section.keyTakeaway && (
                  <div className="p-4 rounded-2xl bg-zinc-900/90 border border-emerald-400/30 flex items-start gap-3 text-xs font-mono text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Key Engineering Takeaway: {section.keyTakeaway}</span>
                  </div>
                )}

                {/* Blockquote Section */}
                {section.quote && (
                  <blockquote className="p-6 rounded-2xl bg-zinc-900/90 border-l-4 border-emerald-400 my-6 space-y-2">
                    <p className="text-sm sm:text-base italic text-emerald-200 font-serif">
                      "{section.quote.text}"
                    </p>
                    {section.quote.author && (
                      <cite className="text-xs font-mono text-zinc-400 block font-normal">
                        — {section.quote.author}
                      </cite>
                    )}
                  </blockquote>
                )}

                {/* Code Snippet Box */}
                {section.codeSnippet && (
                  <div className="rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden my-6">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 text-xs font-mono text-zinc-400">
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <Code className="w-3.5 h-3.5" />
                        <span>{section.codeSnippet.filename || section.codeSnippet.language || 'code'}</span>
                      </span>
                      <button
                        onClick={() => copyCode(section.codeSnippet.code, idx)}
                        className="hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {copiedSnippet === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                      <code>{section.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}

                {/* List Items */}
                {section.list && (
                  <div className="py-2">
                    {section.list.type === 'number' ? (
                      <ol className="space-y-2.5 list-none">
                        {section.list.items.map((item, lIdx) => (
                          <li key={lIdx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-400/10 border border-emerald-400/40 text-emerald-400 font-mono text-[10px] font-bold shrink-0 mt-0.5">
                              {lIdx + 1}
                            </span>
                            <span>{renderBodyWithLinks(item)}</span>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <ul className="space-y-2.5 list-none">
                        {section.list.items.map((item, lIdx) => (
                          <li key={lIdx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{renderBodyWithLinks(item)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {/* Data Table */}
                {section.table && (
                  <div className="overflow-x-auto my-6 rounded-2xl border border-zinc-800">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-zinc-900 border-b border-zinc-800 text-emerald-400 font-bold uppercase">
                        <tr>
                          {section.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-3.5">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60 bg-zinc-950/80">
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-zinc-900/40 transition-colors">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className={`p-3.5 ${cIdx === 0 ? 'font-bold text-white' : 'text-zinc-300'}`}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Section Image */}
                {section.image && (
                  <figure className="my-6 space-y-2">
                    <div className="rounded-2xl overflow-hidden border border-zinc-800 aspect-[16/9]">
                      <img
                        src={section.image.url}
                        alt={section.image.alt || section.image.title}
                        width="800"
                        height="450"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {section.image.caption && (
                      <figcaption className="text-xs font-mono text-zinc-400 text-center">
                        {section.image.caption}
                      </figcaption>
                    )}
                  </figure>
                )}
              </div>
            );
          })}
        </div>

        {/* Internal Engineering Links & Services Navigation Box */}
        {(article.internalLinks || article.relatedServices) && (
          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">
              Internal Architecture Resources & Services
            </span>
            <div className="flex flex-wrap gap-2">
              {article.internalLinks && article.internalLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300 hover:border-emerald-400/50 hover:text-emerald-300 transition-all"
                >
                  <Tag className="w-3 h-3 text-emerald-400" />
                  <span>{link.text}</span>
                </a>
              ))}
              {article.relatedServices && article.relatedServices.map((srv, idx) => (
                <a
                  key={`srv-${idx}`}
                  href={srv.path}
                  onClick={(e) => handleLinkClick(e, srv.path)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-400/10 border border-emerald-400/30 text-xs font-mono text-emerald-400 font-bold hover:bg-emerald-400/20 transition-all"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{srv.title}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* ---------------- 3. RELATED SERVICE CALL TO ACTION ---------------- */}
      <section aria-labelledby="blog-service-cta" className="max-w-4xl mx-auto px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/90 border border-emerald-400/40 text-center space-y-6 shadow-[0_0_40px_rgba(52,211,153,0.15)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Need Custom Engineering Implementation?</span>
          </div>

          <h2 id="blog-service-cta" className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Let LaunchGremlin Build Your Growth Engine.
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 font-light max-w-xl mx-auto leading-relaxed">
            Our engineering team will help you implement the exact architecture described in this guide.
          </p>

          <button
            onClick={onOpenBooking}
            aria-label="Book strategy call for this article topic"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <span>Book Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ---------------- 4. ARTICLE FAQS ---------------- */}
      {article.faqs && article.faqs.length > 0 && (
        <section aria-labelledby="article-faqs-title" className="max-w-4xl mx-auto px-6 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest block">
              Article FAQs
            </span>
            <h2 id="article-faqs-title" className="text-2xl font-extrabold text-white uppercase tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {article.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="rounded-2xl bg-zinc-900/80 border border-zinc-800 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-800/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
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

      {/* ---------------- 5. SIBLING ARTICLES IN SAME CATEGORY ---------------- */}
      {relatedArticles.length > 0 && (
        <section aria-labelledby="related-articles-title" className="max-w-4xl mx-auto px-6 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h2 id="related-articles-title" className="text-lg font-extrabold text-white uppercase tracking-tight">
              Related Articles in {article.category}
            </h2>
            <a
              href="/blog"
              onClick={(e) => handleLinkClick(e, 'blog')}
              className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <span>View All 100 Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedArticles.map((rel) => (
              <a
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                onClick={(e) => handleLinkClick(e, `blog/${rel.slug}`)}
                className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-400/50 transition-all space-y-2 flex flex-col justify-between group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                    {rel.readTime}
                  </span>
                  <h3 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                    {rel.title}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 group-hover:text-emerald-400 pt-2">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Pricing Section */}
      <PricingSection onOpenBooking={onOpenBooking} onSelectTab={onSelectTab} />
    </div>
  );
}
