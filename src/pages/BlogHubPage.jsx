import React, { useState } from 'react';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import { BLOG_CLUSTERS, BLOG_ARTICLES } from '../utils/blogData';
import {
  Search, Sparkles, ArrowRight, Calendar, Clock, Filter, BookOpen, Globe,
  Bot, Building2, Rocket, UserCheck, Instagram, Target, TrendingUp
} from 'lucide-react';

const ICON_MAP = {
  Globe, Bot, Building2, Rocket, UserCheck, Instagram, Sparkles, Target, Search, TrendingUp
};

export default function BlogHubPage({ onSelectTab, onOpenBooking }) {
  const [selectedCluster, setSelectedCluster] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLinkClick = (e, targetTab) => {
    e.preventDefault();
    if (onSelectTab) onSelectTab(targetTab);
  };

  const filteredArticles = BLOG_ARTICLES.filter((article) => {
    const matchesCluster = selectedCluster === 'all' || article.clusterId === selectedCluster;
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
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
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
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-400 text-zinc-950 font-bold shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                    : 'bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:border-emerald-400/50 hover:text-white'
                }`}
              >
                <ClusterIcon className="w-3.5 h-3.5" />
                <span>{c.name} ({count})</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ---------------- ARTICLES GRID ---------------- */}
      <section aria-labelledby="articles-title" className="max-w-7xl mx-auto px-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <h2 id="articles-title" className="text-xl font-extrabold text-white uppercase tracking-tight font-mono">
            Showing {filteredArticles.length} Articles
          </h2>
          <span className="text-xs font-mono text-zinc-500">
            Updated Daily for Search Indexing
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => {
            const articleCluster = BLOG_CLUSTERS.find((c) => c.id === article.clusterId);
            return (
              <a
                key={article.slug}
                href={`/blog/${article.slug}`}
                onClick={(e) => handleLinkClick(e, `blog/${article.slug}`)}
                className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-400/50 hover:shadow-[0_0_25px_rgba(52,211,153,0.15)] transition-all duration-300 flex flex-col justify-between space-y-4 group cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-emerald-400 font-bold uppercase">
                      {articleCluster ? articleCluster.name : 'Guide'}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-500" /> {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed font-light line-clamp-3">
                    {article.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-emerald-400 font-bold">
                  <span>Read Article Blueprint</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* ---------------- CALL TO ACTION BANNER ---------------- */}
      <section aria-labelledby="blog-cta-title" className="max-w-4xl mx-auto px-6">
        <div className="p-10 sm:p-14 rounded-3xl bg-zinc-900/90 border border-emerald-400/40 text-center space-y-6 shadow-[0_0_50px_rgba(52,211,153,0.15)]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Turn Knowledge into Execution</span>
          </div>

          <h2 id="blog-cta-title" className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            Let LaunchGremlin Build Your Growth Engine.
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-light max-w-xl mx-auto leading-relaxed">
            Need sub-second website speed, automated AI agents, or data-driven content strategy? Book a free strategy call today.
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
