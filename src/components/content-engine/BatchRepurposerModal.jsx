import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Zap,
  BookOpen,
  Flame,
  Layers,
  CheckCircle2,
  ArrowRight,
  FileText,
  Calendar
} from 'lucide-react';
import { BLOG_ARTICLES } from '../../utils/blogData';

export default function BatchRepurposerModal({ isOpen, onClose, onGenerateSprint, isGenerating }) {
  const [selectedArticleSlug, setSelectedArticleSlug] = useState(BLOG_ARTICLES[0]?.slug || '');
  const [customTitle, setCustomTitle] = useState('');
  const [customBody, setCustomBody] = useState('');
  const [useCustomText, setUseCustomText] = useState(false);

  if (!isOpen) return null;

  const currentArticle = BLOG_ARTICLES.find((a) => a.slug === selectedArticleSlug) || BLOG_ARTICLES[0];

  const handleStartSprint = () => {
    const title = useCustomText ? customTitle : currentArticle?.title || 'LaunchGremlin Masterclass';
    const content = useCustomText ? customBody : currentArticle?.excerpt || currentArticle?.content || '';

    if (!title.trim() || !content.trim()) return;

    onGenerateSprint({
      sourceTitle: title,
      sourceContent: content,
      sourceSlug: useCustomText ? 'custom-transcript' : currentArticle.slug
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                1 Article ➔ 7 Ready Posts
              </span>
              <span className="text-xs text-zinc-400">7-Day Sprint Multiplier</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Article-to-Sprint Batch Repurposer
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setUseCustomText(false)}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              !useCustomText ? 'bg-emerald-500 text-zinc-950 shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            📚 Pick from LaunchGremlin Blog Hub
          </button>
          <button
            type="button"
            onClick={() => setUseCustomText(true)}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              useCustomText ? 'bg-emerald-500 text-zinc-950 shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            ✍️ Paste Custom Transcript / Notes
          </button>
        </div>

        {/* Input Form */}
        {!useCustomText ? (
          <div className="space-y-3">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
              Select Blog Article Source:
            </label>
            <select
              value={selectedArticleSlug}
              onChange={(e) => setSelectedArticleSlug(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
            >
              {BLOG_ARTICLES.map((a) => (
                <option key={a.slug} value={a.slug}>
                  {a.title} ({a.category})
                </option>
              ))}
            </select>

            {currentArticle && (
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-2 text-xs text-zinc-300">
                <span className="text-emerald-400 font-bold font-mono uppercase text-[10px]">
                  Article Excerpt:
                </span>
                <p className="line-clamp-3 leading-relaxed">{currentArticle.excerpt}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block mb-1">
                Source Title:
              </label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="e.g. Call Recordings Breakdown with Durban Contractors"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block mb-1">
                Raw Content / Transcript:
              </label>
              <textarea
                rows={4}
                value={customBody}
                onChange={(e) => setCustomBody(e.target.value)}
                placeholder="Paste transcript or notes here..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans"
              />
            </div>
          </div>
        )}

        {/* 7-Day Sprint Output Preview */}
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
          <span className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> 7-Day Generated Sprint Structure:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
            <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
              <strong className="text-emerald-400">Day 1:</strong> Educational Reel (Hook)
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
              <strong className="text-emerald-400">Day 2:</strong> 5-Slide Carousel Guide
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
              <strong className="text-emerald-400">Day 3:</strong> Before & After Visual Case
            </div>
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200">
              <strong className="text-amber-400">Day 4:</strong> Maserati Momentum Story #1
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
              <strong className="text-emerald-400">Day 5:</strong> Micro-Blog Engagement Post
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
              <strong className="text-emerald-400">Day 6:</strong> Objection Breakdown Reel
            </div>
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 col-span-1 sm:col-span-2">
              <strong className="text-amber-400">Day 7:</strong> Maserati Climax Milestone #2
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
          <span className="text-[11px] text-zinc-500 font-mono">
            Auto-logs all 7 packages to 30/60/90 schedule
          </span>

          <button
            type="button"
            onClick={handleStartSprint}
            disabled={isGenerating}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></div>
                Multiplying 7 Posts...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-current" /> Generate 7-Day Sprint
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
