import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Search,
  FileText,
  Bot,
  TrendingUp,
  Zap,
  Download,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  Star,
  Layers,
  X,
  ShieldCheck
} from 'lucide-react';
import { RESOURCE_CATEGORIES, RESOURCES_DATA } from '../utils/resourcesData';
import ServiceHeroBackground from '../components/common/ServiceHeroBackground';
import PromptCustomizerModal from '../components/resources/PromptCustomizerModal';
import { trackEvent } from '../utils/analytics';

export default function CreatorStudioPage({ onOpenBooking, onSelectTab }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [previewResource, setPreviewResource] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Filtered resources based on search and category
  const filteredResources = useMemo(() => {
    return RESOURCES_DATA.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleCopyDirect = (item) => {
    if (item.template) {
      navigator.clipboard.writeText(item.template);
      setCopiedId(item.id);
      trackEvent('resource_direct_copy', { id: item.id, title: item.title });
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleOpenPromptModal = (prompt) => {
    setSelectedPrompt(prompt);
    trackEvent('open_prompt_customizer', { id: prompt.id, title: prompt.title });
  };

  const handleOpenPreview = (resource) => {
    setPreviewResource(resource);
    trackEvent('open_resource_preview', { id: resource.id, title: resource.title });
  };

  return (
    <div className="w-full bg-zinc-950 text-white min-h-screen pb-24 select-none">
      
      {/* Hero Header */}
      <ServiceHeroBackground glowPosition="top-left">
        <div className="max-w-5xl mx-auto text-center space-y-6 pt-8 pb-12 px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FREE CREATOR STUDIO & OPERATING SYSTEMS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-[1.05]">
            High-Leverage Tooling. <br />
            <span className="text-emerald-400">Zero Paywall.</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
            Battle-tested Notion operating systems, curated AI prompt chains with live variable injectors, and engineering blueprints designed to accelerate your growth.
          </p>

          {/* Quick Metrics Strip */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span><strong>6</strong> Notion OS Templates</span>
            </div>
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-emerald-400" />
              <span><strong>12</strong> AI Prompt Chains</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span><strong>18k+</strong> Total Duplications</span>
            </div>
          </div>
        </div>
      </ServiceHeroBackground>

      {/* Main Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        
        {/* Search & Category Filter Toolbar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates, prompt workflows, or blueprints..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-11 pr-4 py-3.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:border-emerald-400 outline-none transition shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Total Results Counter */}
            <span className="text-xs font-mono text-zinc-400 shrink-0">
              Showing <strong>{filteredResources.length}</strong> resources
            </span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {RESOURCE_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    trackEvent('resource_category_changed', { category: cat.id });
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-emerald-400 text-zinc-950 font-black shadow-lg shadow-emerald-500/20'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((item) => {
            const isCopied = copiedId === item.id;
            return (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800/90 hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)] transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  {/* Top Meta Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase">
                      {item.badge}
                    </span>
                    <span className="text-[10.5px] font-mono text-zinc-400 flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-current" />
                      <span>{item.rating}</span>
                      <span className="text-zinc-600">({item.downloads.toLocaleString()})</span>
                    </span>
                  </div>

                  {/* Title & Tag */}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold block mb-1">
                      {item.tag}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {item.description}
                  </p>

                  {/* Features List (if available) */}
                  {item.features && (
                    <ul className="space-y-1.5 pt-2 border-t border-white/5 text-[11px] text-zinc-300 font-mono">
                      {item.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Card Bottom Actions */}
                <div className="pt-4 border-t border-zinc-800/80 flex items-center gap-2">
                  {item.category === 'prompts' ? (
                    <>
                      <button
                        onClick={() => handleOpenPromptModal(item)}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5"
                      >
                        <Bot className="w-3.5 h-3.5" />
                        <span>Customize & Copy</span>
                      </button>
                      <button
                        onClick={() => handleCopyDirect(item)}
                        className="p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition cursor-pointer"
                        title="Quick Copy Raw Template"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleOpenPreview(item)}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5"
                      >
                        <span>Preview & Use</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      {item.notionUrl && (
                        <a
                          href={item.notionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition flex items-center justify-center"
                          title="Open in Notion"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Callout: Custom Architecture */}
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/90 border border-emerald-400/30 text-center space-y-6 shadow-[0_0_50px_rgba(52,211,153,0.15)] max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Need Custom Engineering?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
            Deploy Bespoke Web & AI Workflows
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 font-light max-w-xl mx-auto leading-relaxed">
            Need custom full-stack web applications, proprietary vector RAG databases, or automated lead engines built specifically for your business?
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(52,211,153,0.4)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              <span>Book Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectTab && onSelectTab('proposal')}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
            >
              <span>Scope & Quote Calculator</span>
            </button>
          </div>
        </div>

      </div>

      {/* Prompt Customizer Modal */}
      {selectedPrompt && (
        <PromptCustomizerModal
          prompt={selectedPrompt}
          isOpen={Boolean(selectedPrompt)}
          onClose={() => setSelectedPrompt(null)}
        />
      )}

      {/* Generic Resource Preview Modal */}
      {previewResource && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 text-white relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setPreviewResource(null)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-800 transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 border-b border-zinc-800 pb-4">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase">
                {previewResource.badge}
              </span>
              <h3 className="text-2xl font-black text-white">{previewResource.title}</h3>
              <p className="text-xs text-zinc-400">{previewResource.description}</p>
            </div>

            {previewResource.previewData && (
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 block">
                  Included Sections & Architecture:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {previewResource.previewData.sections.map((sec, i) => (
                    <div key={i} className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs text-zinc-300 font-mono flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                      <span>{sec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-500">
                100% Free • Direct Access
              </span>
              {previewResource.notionUrl ? (
                <a
                  href={previewResource.notionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-emerald-400 text-zinc-950 font-black text-xs uppercase tracking-wider hover:bg-emerald-300 transition inline-flex items-center gap-2"
                >
                  <span>Duplicate to Notion</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(previewResource, null, 2));
                    setPreviewResource(null);
                  }}
                  className="px-6 py-3 rounded-xl bg-emerald-400 text-zinc-950 font-black text-xs uppercase tracking-wider hover:bg-emerald-300 transition"
                >
                  Copy Specification
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
