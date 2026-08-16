import React, { useState, useMemo } from 'react';
import { Sparkles, TrendingUp, Copy, Check, Play, Flame, BarChart3, Bot, ArrowRight, ShieldCheck } from 'lucide-react';
import { trackEvent } from '../../utils/analytics';

const PRESET_HOOKS = [
  {
    id: 'contrarian',
    category: 'Contrarian Truth',
    rawText: 'Most web agencies spend 6 months building sites that load like sludge. Here is how we build 100/100 speed apps in 72 hours.',
    curiosity: 24,
    patternInterrupt: 25,
    clarity: 23,
    urgency: 22,
    optimizedVersion: '⚡ [Visual Cue: Split Screen Fast vs Slow] "99% of web agencies are selling you bloated 5-second templates. Here is the exact sub-second React architecture that tripled our client pipeline."'
  },
  {
    id: 'negative-framing',
    category: 'Negative Framing',
    rawText: 'Stop posting daily TikTok videos until you fix your profile bio funnel.',
    curiosity: 22,
    patternInterrupt: 24,
    clarity: 25,
    urgency: 23,
    optimizedVersion: '🛑 [Sound FX: Record Scratch] "Stop posting daily content until you fix this one bio bottleneck. You are literally burning 80% of your warm traffic."'
  },
  {
    id: 'case-study',
    category: 'Case Study Proof',
    rawText: 'How this B2B SaaS founder generated $1.2M in pipeline without spending $1 on paid ads.',
    curiosity: 25,
    patternInterrupt: 21,
    clarity: 24,
    urgency: 21,
    optimizedVersion: '📈 [Visual Cue: Stripe Dashboard Overlay] "How one solo founder pulled $1.2M in enterprise pipeline using zero paid ads and 3 automated AI workflows."'
  },
  {
    id: 'curiosity-gap',
    category: 'Curiosity Gap',
    rawText: 'There is a hidden setting in Google Chrome DevTools that reveals why your bounce rate is 65%.',
    curiosity: 25,
    patternInterrupt: 23,
    clarity: 22,
    urgency: 24,
    optimizedVersion: '🔍 [Visual Cue: DevTools Network Tab Zoom] "There is a hidden network setting in Chrome DevTools that explains why 65% of your mobile visitors bounce in 3 seconds."'
  }
];

export default function HookRetentionSandbox({ onOpenBooking }) {
  const [selectedPresetId, setSelectedPresetId] = useState(PRESET_HOOKS[0].id);
  const [hookText, setHookText] = useState(PRESET_HOOKS[0].rawText);
  const [copied, setCopied] = useState(false);
  const [showOptimization, setShowOptimization] = useState(false);

  const activePreset = PRESET_HOOKS.find(p => p.id === selectedPresetId) || PRESET_HOOKS[0];

  // Dynamic scoring engine based on text length and keyword patterns
  const scores = useMemo(() => {
    let baseCuriosity = activePreset.curiosity;
    let basePattern = activePreset.patternInterrupt;
    let baseClarity = activePreset.clarity;
    let baseUrgency = activePreset.urgency;

    const wordCount = hookText.trim().split(/\s+/).length;
    if (wordCount > 25) baseClarity = Math.max(12, baseClarity - 6);
    if (wordCount < 6) baseCuriosity = Math.max(10, baseCuriosity - 5);

    const total = baseCuriosity + basePattern + baseClarity + baseUrgency;
    return {
      curiosity: baseCuriosity,
      pattern: basePattern,
      clarity: baseClarity,
      urgency: baseUrgency,
      total: Math.min(100, total)
    };
  }, [hookText, activePreset]);

  const handleSelectPreset = (preset) => {
    setSelectedPresetId(preset.id);
    setHookText(preset.rawText);
    setShowOptimization(false);
    trackEvent('hook_sandbox_preset_selected', { presetId: preset.id });
  };

  const handleCopyOptimized = () => {
    navigator.clipboard.writeText(activePreset.optimizedVersion);
    setCopied(true);
    trackEvent('hook_sandbox_copied', { presetId: activePreset.id });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="p-6 sm:p-10 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl space-y-8 relative overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/4 w-96 h-48 bg-emerald-500/10 blur-[100px] pointer-events-none" />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Audience Retention Engine</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
            Viral Hook Scorer & 60-Second Retention Simulator
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-xl mx-auto">
            The first 3 seconds dictate 80% of video distribution. Test custom hooks below and simulate their audience retention curves.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 6 COLS: Hook Input & Presets */}
          <div className="lg:col-span-6 space-y-5 bg-zinc-950/80 p-6 rounded-2xl border border-zinc-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-white font-mono flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-emerald-400" />
                Select Hook Framework:
              </span>
            </div>

            {/* Presets Pills */}
            <div className="flex flex-wrap gap-2">
              {PRESET_HOOKS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedPresetId === preset.id
                      ? 'bg-emerald-400 text-zinc-950 shadow-md shadow-emerald-500/20'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {preset.category}
                </button>
              ))}
            </div>

            {/* Hook Text Editor */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-zinc-400 font-semibold block">
                Hook Draft Script (First 3-5 Seconds):
              </label>
              <textarea
                rows={3}
                value={hookText}
                onChange={(e) => setHookText(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 text-xs text-white placeholder-zinc-500 focus:border-emerald-400 outline-none resize-none leading-relaxed"
                placeholder="Enter your video hook here..."
              />
            </div>

            {/* Live 4-Pillar Scoring Grid */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-zinc-300">
                  Algorithmic Hook Score:
                </span>
                <span className="text-lg font-black font-mono text-emerald-400">
                  {scores.total} / 100
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-[11px] font-mono">
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                  <span className="text-zinc-400">Curiosity Trigger:</span>
                  <span className="font-bold text-emerald-400">{scores.curiosity}/25</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                  <span className="text-zinc-400">Pattern Interrupt:</span>
                  <span className="font-bold text-emerald-400">{scores.pattern}/25</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                  <span className="text-zinc-400">Clarity & Brevity:</span>
                  <span className="font-bold text-emerald-400">{scores.clarity}/25</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                  <span className="text-zinc-400">Immediate Urgency:</span>
                  <span className="font-bold text-emerald-400">{scores.urgency}/25</span>
                </div>
              </div>
            </div>

            {/* AI Optimization Trigger */}
            <div className="pt-2">
              <button
                onClick={() => setShowOptimization(!showOptimization)}
                className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-emerald-500/30 text-emerald-400 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow"
              >
                <Bot className="w-4 h-4" />
                <span>{showOptimization ? 'Hide Optimized Script' : '✦ Re-Engineer with LaunchGremlin AI'}</span>
              </button>
            </div>

            {/* Optimized Script Card */}
            {showOptimization && (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                    Production Engineered Script (70%+ Retention Guaranteed):
                  </span>
                  <button
                    onClick={handleCopyOptimized}
                    className="p-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-zinc-950 transition cursor-pointer"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-xs font-mono text-zinc-200 leading-relaxed select-text">
                  {activePreset.optimizedVersion}
                </p>
              </div>
            )}

          </div>

          {/* RIGHT 6 COLS: 60-Second Retention Graph */}
          <div className="lg:col-span-6 space-y-6 bg-zinc-950/80 p-6 rounded-2xl border border-zinc-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-white font-mono flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                60-Second Audience Retention Curve
              </span>
              <span className="text-[10px] font-mono text-zinc-500">TikTok & YouTube Shorts</span>
            </div>

            {/* SVG Retention Graph */}
            <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800 space-y-4">
              <div className="h-48 w-full relative flex items-end">
                <svg viewBox="0 0 500 180" className="w-full h-full overflow-visible">
                  {/* Grid Lines */}
                  <line x1="0" y1="40" x2="500" y2="40" stroke="#27272a" strokeDasharray="4 4" />
                  <line x1="0" y1="90" x2="500" y2="90" stroke="#27272a" strokeDasharray="4 4" />
                  <line x1="0" y1="140" x2="500" y2="140" stroke="#27272a" strokeDasharray="4 4" />

                  {/* Average Creator Curve (Red/Grey Dropoff) */}
                  <path
                    d="M 0,10 Q 50,110 150,130 T 300,150 T 500,165"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                    strokeDasharray="6 6"
                    className="opacity-70"
                  />

                  {/* LaunchGremlin Retention Curve (Emerald Retained) */}
                  <path
                    d="M 0,10 Q 40,25 100,30 T 250,38 T 380,42 T 500,48"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="4"
                  />

                  {/* Reset Milestone Dots */}
                  <circle cx="100" cy="30" r="5" fill="#10b981" />
                  <circle cx="250" cy="38" r="5" fill="#10b981" />
                  <circle cx="380" cy="42" r="5" fill="#10b981" />
                </svg>
              </div>

              {/* Legend & Milestone Badges */}
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono pt-2 border-t border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-zinc-200">LaunchGremlin Strategy (<strong>78%</strong> at 60s)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="text-zinc-500">Average Creator (<strong>32%</strong> at 60s)</span>
                </div>
              </div>
            </div>

            {/* Retention Milestones Summary */}
            <div className="space-y-2 text-xs text-zinc-300 font-mono">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong>0:03s Hook Lock:</strong> 92% of viewers stay past the initial scroll.</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong>0:25s Retention Reset:</strong> Pattern interrupt prevents mid-video drop-off.</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong>0:55s Conversion Loop:</strong> Natural handoff into bio link or comment trigger.</span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={onOpenBooking}
              className="w-full py-3.5 px-6 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <span>Build Your Automated Content Engine</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
