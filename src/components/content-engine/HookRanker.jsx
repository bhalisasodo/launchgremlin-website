import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Edit3, ArrowRight, Zap, Target } from 'lucide-react';

export default function HookRanker({ candidateHooks = [], selectedHook, onSelectHook, onUpdateHook }) {
  const [isEditing, setIsEditing] = useState(false);
  const [customHookText, setCustomHookText] = useState(selectedHook || '');

  const handleSaveCustom = (e) => {
    e.preventDefault();
    if (customHookText.trim() && onUpdateHook) {
      onUpdateHook(customHookText.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Target className="w-3.5 h-3.5" /> Stage 2: Hook Ranker
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">Ranked Candidate Hooks (First 2s)</h3>
          <p className="text-xs text-zinc-400 mt-1">
            Pick the highest-converting hook for this package. The chosen hook synchronizes across all 4 formats.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsEditing(!isEditing);
            setCustomHookText(selectedHook);
          }}
          className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs text-zinc-300 font-medium flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
          {isEditing ? 'Cancel Edit' : 'Custom Hook Edit'}
        </button>
      </div>

      {/* Custom Edit Box */}
      {isEditing && (
        <form onSubmit={handleSaveCustom} className="p-4 rounded-xl bg-zinc-950 border border-emerald-500/40 space-y-3">
          <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Custom Hook Override
          </label>
          <textarea
            rows={2}
            value={customHookText}
            onChange={(e) => setCustomHookText(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20"
            >
              Save & Apply Hook
            </button>
          </div>
        </form>
      )}

      {/* Ranked Hook Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {candidateHooks.map((h, idx) => {
          const isSelected = selectedHook === h.hook;
          return (
            <div
              key={idx}
              onClick={() => onSelectHook(h.hook, idx)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-zinc-950 border-emerald-500 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/40'
                  : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold font-mono ${
                        isSelected ? 'bg-emerald-500 text-zinc-950' : 'bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      #{h.rank || idx + 1}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400 bg-zinc-800/60 px-2 py-0.5 rounded">
                      {h.style || 'Urgent Solution'}
                    </span>
                  </div>

                  {isSelected ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Selected Hook
                    </span>
                  ) : (
                    <span className="text-[11px] text-zinc-500 hover:text-zinc-300">Click to Select</span>
                  )}
                </div>

                <p className="text-sm font-semibold text-white leading-relaxed mt-2">
                  "{h.hook}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/60 text-xs text-zinc-400">
                <span className="text-zinc-500 font-medium">Strategic Rationale:</span> {h.rationale}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
