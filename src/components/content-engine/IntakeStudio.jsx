import React, { useState } from 'react';
import {
  BookOpen,
  PhoneCall,
  Code2,
  Video,
  Flame,
  Sparkles,
  Zap,
  ArrowRight,
  FileText,
  Layers,
  HelpCircle,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { CONTENT_PILLARS, ENGINE_VOICES } from '../../utils/contentEngineData';
import BatchRepurposerModal from './BatchRepurposerModal';

const ICONS = {
  BookOpen,
  PhoneCall,
  Code2,
  Video,
  Flame
};

export default function IntakeStudio({
  onGenerate,
  isGenerating,
  availableIntakeItems = [],
  onGenerateSprint
}) {
  const [selectedPillarId, setSelectedPillarId] = useState('educational');
  const [account, setAccount] = useState('launchgremlin');
  const [title, setTitle] = useState('The R15,000 Website Myth for SA Small Businesses');
  const [content, setContent] = useState(
    'Most South African small business owners are convinced they need to spend R15k–R30k and wait 6 weeks for an agency to build a website. In reality, 85% of their traffic comes from mobile phones looking for 3 things: what you do, how much it costs, and a 1-tap WhatsApp link. LaunchGremlin replaces bloated agency delays with instant, high-converting digital storefronts.'
  );
  const [sourceType, setSourceType] = useState('content_hub_article');
  const [proofPointRef, setProofPointRef] = useState('');
  const [isRepurposerOpen, setIsRepurposerOpen] = useState(false);

  const currentPillar = CONTENT_PILLARS.find((p) => p.id === selectedPillarId) || CONTENT_PILLARS[0];
  const currentVoice = ENGINE_VOICES[account] || ENGINE_VOICES.launchgremlin;

  const handlePillarSelect = (pillar) => {
    setSelectedPillarId(pillar.id);
    setAccount(pillar.account);
    if (pillar.presets && pillar.presets.length > 0) {
      setTitle(pillar.presets[0].title);
      setContent(pillar.presets[0].content);
      if (pillar.presets[0].proofPointRef) {
        setProofPointRef(pillar.presets[0].proofPointRef);
      } else {
        setProofPointRef('');
      }
    }
  };

  const handlePresetSelect = (preset) => {
    setTitle(preset.title);
    setContent(preset.content);
    if (preset.proofPointRef) {
      setProofPointRef(preset.proofPointRef);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onGenerate({
      id: `LG-${currentPillar.idPrefix.replace('LG-', '')}-${Date.now().toString().slice(-3)}`,
      pillar: selectedPillarId,
      pillarName: currentPillar.name,
      account,
      accountHandle: currentVoice.handle,
      title: title.trim(),
      content: content.trim(),
      sourceType,
      proofPointRef: selectedPillarId === 'maserati_narrative' ? proofPointRef || 'LG-EDU-001' : ''
    });
  };

  return (
    <div className="space-y-8">
      {/* Header Info & Batch Repurpose Trigger */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Stage 1: Content Intake
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Source Material & Pillar Config</h2>
          <p className="text-sm text-zinc-400 mt-1">
            Select a strategic pillar, input your raw source material, or repurpose a blog post into a 7-day sprint.
          </p>
        </div>

        {/* Quick Batch Repurposer Action & Voice Selector */}
        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setIsRepurposerOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
          >
            <Calendar className="w-4 h-4" />
            <span>🚀 Batch Repurpose 7-Day Sprint</span>
          </button>

          <div className="flex items-center gap-1 bg-zinc-900/90 border border-zinc-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setAccount('launchgremlin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                account === 'launchgremlin'
                  ? 'bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-500/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              @LaunchGremlin
            </button>
            <button
              type="button"
              onClick={() => setAccount('needmoney4maserati')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                account === 'needmoney4maserati'
                  ? 'bg-amber-500 text-black font-semibold shadow-lg shadow-amber-500/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              @needmoney4maserati
            </button>
          </div>
        </div>
      </div>

      {/* Pillar Cards Grid */}
      <div>
        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
          1. Choose Content Pillar
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {CONTENT_PILLARS.map((p) => {
            const IconComp = ICONS[p.iconName] || BookOpen;
            const isSelected = selectedPillarId === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handlePillarSelect(p)}
                className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-zinc-900 border-emerald-500/80 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/50'
                    : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 bg-zinc-800/80 px-2 py-0.5 rounded">
                      {p.idPrefix}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{p.name}</h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{p.description}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-zinc-800/50 flex items-center justify-between text-[11px] text-zinc-500">
                  <span>{p.weeklyCadence}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Preset Inspirations */}
      {currentPillar.presets && currentPillar.presets.length > 0 && (
        <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-400" /> One-Click Presets for {currentPillar.name}:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {currentPillar.presets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePresetSelect(preset)}
                className="px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700/60 text-xs text-zinc-300 transition-all text-left"
              >
                ⚡ {preset.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 space-y-2">
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
              Topic / Campaign Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Why R15,000 Websites in SA Are a Trap"
              required
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
              Source Format Type
            </label>
            <select
              value={sourceType}
              onChange={(e) => setSourceType(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
            >
              <option value="content_hub_article">Content Hub Article / URL</option>
              <option value="call_recording">Cold-Call Audio / Notes</option>
              <option value="event_footage">Event Footage Log</option>
              <option value="video_submission">Videographer Submission</option>
              <option value="founder_milestone">Founder Metric / Milestone</option>
            </select>
          </div>
        </div>

        {/* Maserati Proof-Point Picker */}
        {selectedPillarId === 'maserati_narrative' && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-4 h-4" /> Core Guardrail: Linked Pillar Proof-Point
            </div>
            <p className="text-xs text-zinc-300">
              Maserati posts must connect back to real calls landed, events run, or competition entries.
            </p>
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={proofPointRef}
                onChange={(e) => setProofPointRef(e.target.value)}
                placeholder="Proof point reference (e.g. LG-EDU-001 or Umhlanga Event #1)"
                className="flex-1 bg-zinc-950 border border-amber-500/40 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        )}

        {/* Source Text / Transcript */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
              Raw Content / Key Notes / Transcript
            </label>
            <span className="text-[11px] text-zinc-500 font-mono">
              Voice Guardrail: {currentVoice.name}
            </span>
          </div>
          <textarea
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your article draft, call transcription notes, or footage breakdown here..."
            required
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500 transition-colors font-sans leading-relaxed"
          />
        </div>

        {/* Submit Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-zinc-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Outputs 4 formats: Video Script + 5-Slide Carousel + Before/After + Social Post
          </div>

          <button
            type="submit"
            disabled={isGenerating || !title.trim() || !content.trim()}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></div>
                Generating 4-Way Package...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-current" />
                ⚡ Multiply Formats in 1-Click
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Batch Repurposer Modal */}
      <BatchRepurposerModal
        isOpen={isRepurposerOpen}
        onClose={() => setIsRepurposerOpen(false)}
        onGenerateSprint={(sprintData) => {
          setIsRepurposerOpen(false);
          if (onGenerateSprint) {
            onGenerateSprint(sprintData);
          } else {
            onGenerate({
              id: `LG-SPRINT-${Date.now().toString().slice(-3)}`,
              pillar: 'educational',
              account: 'launchgremlin',
              title: sprintData.sourceTitle,
              content: sprintData.sourceContent
            });
          }
        }}
        isGenerating={isGenerating}
      />
    </div>
  );
}
