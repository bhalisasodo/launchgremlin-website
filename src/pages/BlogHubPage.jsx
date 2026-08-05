import React, { useState } from 'react';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import { BLOG_CLUSTERS, BLOG_ARTICLES } from '../utils/blogData';
import {
  Search, Sparkles, ArrowRight, Calendar, Clock, Filter, BookOpen, Globe,
  Bot, Building2, Rocket, UserCheck, Instagram, Target, TrendingUp, PenTool, CheckCircle2
} from 'lucide-react';

const ICON_MAP = {
  Globe, Bot, Building2, Rocket, UserCheck, Instagram, Sparkles, Target, Search, TrendingUp
};

export default function BlogHubPage({ onSelectTab, onOpenBooking, initialCluster }) {
  const getInitialCluster = () => {
    if (initialCluster && BLOG_CLUSTERS.some(c => c.id === initialCluster)) return initialCluster;
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category') || params.get('cluster') || params.get('tag');
      if (catParam && BLOG_CLUSTERS.some(c => c.id.toLowerCase() === catParam.toLowerCase())) {
        return catParam.toLowerCase();
      }
      const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '');
      const parts = pathname.split('/');
      if (parts[0] === 'blog' && parts.length > 1) {
        const catPart = (parts[1] === 'category' || parts[1] === 'tag') ? parts[2] : parts[1];
        if (catPart) {
          const match = BLOG_CLUSTERS.find(c => c.id.toLowerCase() === catPart.toLowerCase() || c.name.toLowerCase() === catPart.toLowerCase());
          if (match) return match.id;
        }
      }
    }
    return 'all';
  };

  const [selectedCluster, setSelectedCluster] = useState(getInitialCluster);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLinkClick = (e, targetTab) => {
    e.preventDefault();
    if (onSelectTab) onSelectTab(targetTab);
  };

  const filteredArticles = BLOG_ARTICLES.filter((article) => {
    const matchesCluster =
      selectedCluster === 'all' ||
      article.clusterId === selectedCluster ||
      (article.category && article.category.toLowerCase() === selectedCluster.toLowerCase());
    const matchesSearch =
      searchQuery.trim() === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.keywords.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCluster && matchesSearch;
  });

  const featuredArticle = BLOG_ARTICLES[0];

  return (
    <div className="space-y-16 pb-20 select-none">
      {/* ---------------- HERO HEADER ---------------- */}
      <ServiceHeroBackground glowPosition="top-left">
        <div className="max-w-5xl mx-auto text-center space-y-6 pt-8 pb-12 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-400/40 text-emerald-400 text-xs font-mono font-bold tracking-wider shadow-[0_0_15px_rgba(52,211,153,0.2)]">
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>LAUNCHGREMLIN KNOWLEDGE HUB & SEO ACADEMY</span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight uppercase leading-[1.05]">
            100 STRATEGIC GUIDES FOR BUILDERS & CREATORS.
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
            Deep-dive technical blueprints on Web Speed, AI Agents, Local SEO, Audience Growth, Personal Branding, and High-Ticket Lead Generation.
          </p>

          {/* Search Bar Input */}
          <div className="max-w-xl mx-auto pt-2 relative">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-zinc-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 100 articles by keyword, topic, or tech stack..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
              />
            </div>
          </div>
        </div>
      </ServiceHeroBackground>

      {/* ---------------- AI EDITORIAL TEAM TRANSPARENCY CARD ---------------- */}
      <section aria-label="AI Editorial Team Transparency" className="max-w-4xl mx-auto px-6 animate-fade-in">
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/80 border border-emerald-400/30 backdrop-blur-xl shadow-[0_0_30px_rgba(52,211,153,0.12)] text-center space-y-5 relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-80" />

          {/* Title & Badge */}
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-[11px] font-mono font-bold uppercase tracking-wider">
              <Bot className="w-3.5 h-3.5" />
              <span>EDITORIAL TRANSPARENCY</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase">
              Powered by an AI Editorial Team
            </h2>
          </div>

          {/* Body */}
          <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
            Every article published in the LaunchGremlin Content Hub is researched, written, reviewed, and optimized by a specialized team of AI agents. Each agent has a dedicated role—from market research and fact gathering to strategic planning, writing, SEO optimization, editing, and quality assurance. This multi-agent workflow allows us to publish content that is faster, more consistent, and genuinely useful for entrepreneurs, creators, and growing businesses.
          </p>

          {/* Role Chips */}
          <div className="pt-1 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950/90 border border-zinc-800 text-zinc-200 shadow-sm">
              <Search className="w-3.5 h-3.5 text-emerald-400" /> Research Agent
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950/90 border border-zinc-800 text-zinc-200 shadow-sm">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Strategy Agent
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950/90 border border-zinc-800 text-zinc-200 shadow-sm">
              <PenTool className="w-3.5 h-3.5 text-emerald-400" /> Writer Agent
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950/90 border border-zinc-800 text-zinc-200 shadow-sm">
              <Rocket className="w-3.5 h-3.5 text-emerald-400" /> SEO Agent
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950/90 border border-zinc-800 text-zinc-200 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Editor Agent
            </span>
          </div>

          {/* Caption */}
          <p className="text-[11px] font-mono text-zinc-500 pt-0.5">
            &quot;AI-generated. Editorially curated. Continuously improving.&quot;
          </p>
        </div>
      </section>

      {/* ---------------- TOPIC CLUSTER PILLS ---------------- */}
      <section aria-labelledby="clusters-title" className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block" id="clusters-title">
            10 Topic Clusters
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSelectedCluster('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              selectedCluster === 'all'
                ? 'bg-emerald-400 text-zinc-950 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-700'
            }`}
          >
            All 100 Articles ({BLOG_ARTICLES.length})
          </button>

          {BLOG_CLUSTERS.map((c) => {
            const ClusterIcon = ICON_MAP[c.icon] || BookOpen;
            const count = BLOG_ARTICLES.filter((a) => a.clusterId === c.id).length;
            const isSelected = selectedCluster === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCluster(c.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  isSelected
                    ? 'bg-emerald-400 text-zinc-950 font-bold shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                    : 'bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:border-emerald-400/50 hover:text-white'
                }`}
              >
                <ClusterIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{c.name} ({count})</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ---------------- FEATURED HERO ARTICLE (IF ALL IS SELECTED) ---------------- */}
      {selectedCluster === 'all' && searchQuery.trim() === '' && featuredArticle && (
        <section aria-labelledby="featured-article-title" className="max-w-7xl mx-auto px-6">
          <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/90 border border-emerald-400/40 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-[10px] font-mono font-bold">
                  FEATURED GUIDE
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

                <span className="text-xs font-mono text-zinc-400">
                  {featuredArticle.readTime}
                </span>
              </div>

              <h2 id="featured-article-title" className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase group-hover:text-emerald-300 transition-colors">
                {featuredArticle.title}
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                {featuredArticle.description}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400">By {featuredArticle.author} • {featuredArticle.publishDate}</span>
                <a
                  href={`/blog/${featuredArticle.slug}`}
                  onClick={(e) => handleLinkClick(e, `blog/${featuredArticle.slug}`)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider hover:bg-emerald-300 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <span>Read Blueprint</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-zinc-800 aspect-[16/10]">
                <img
                  src={featuredArticle.heroImage}
                  alt={featuredArticle.heroImageAlt || featuredArticle.title}
                  width="800"
                  height="500"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------------- ARTICLE GRID DISPLAY ---------------- */}
      <section aria-labelledby="articles-grid-title" className="max-w-7xl mx-auto px-6 space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <h2 id="articles-grid-title" className="text-xl font-extrabold text-white uppercase tracking-tight">
            Showing {filteredArticles.length} Strategic Guides
          </h2>
          <span className="text-xs font-mono text-zinc-400">
            Page 1 of 1 • 100% Pre-rendered
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredArticles.map((article) => (
            <div
              key={article.slug}
              className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/50 hover:shadow-[0_0_25px_rgba(52,211,153,0.12)] transition-all duration-300 flex flex-col justify-between space-y-4 group h-full"
            >
              <div className="space-y-3">
                <div className="rounded-2xl overflow-hidden border border-zinc-800/80 aspect-[16/9]">
                  <img
                    src={article.heroImage}
                    alt={article.heroImageAlt || article.title}
                    width="600"
                    height="337"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-950 border border-zinc-800 text-emerald-400 font-bold">
                      {article.category}
                    </span>

                    {/* AI Curated Badge with Hover Tooltip */}
                    <div className="relative group/tooltip inline-block">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-[10px] font-mono font-bold cursor-help">
                        <Sparkles className="w-3 h-3" />
                        <span>AI Curated</span>
                      </span>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block z-30 px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-[10px] font-mono whitespace-nowrap shadow-2xl pointer-events-none">
                        Produced by LaunchGremlin&apos;s AI Editorial Team.
                      </div>
                    </div>
                  </div>

                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed font-light line-clamp-3">
                  {article.description}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-500">{article.publishDate}</span>
                <a
                  href={`/blog/${article.slug}`}
                  onClick={(e) => handleLinkClick(e, `blog/${article.slug}`)}
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
