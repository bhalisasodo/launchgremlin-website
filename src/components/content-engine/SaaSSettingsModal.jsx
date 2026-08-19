import React, { useState } from 'react';
import { X, Sparkles, Sliders, Shield, Key, Save, CheckCircle2, RotateCcw } from 'lucide-react';

export default function SaaSSettingsModal({ isOpen, onClose, settings, onSaveSettings }) {
  const [formData, setFormData] = useState(settings || {});
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveSettings(formData);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 max-w-xl w-full space-y-6 shadow-2xl relative my-8">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">SaaS Productisation & Brand Config</h3>
              <p className="text-xs text-zinc-400">Configure custom brand voices, API providers, and multi-tenant settings.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Brand Mode Toggle */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
              Operating Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, brandMode: 'launchgremlin' })}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  formData.brandMode === 'launchgremlin'
                    ? 'bg-zinc-950 border-emerald-500 text-white ring-1 ring-emerald-500/40'
                    : 'bg-zinc-950/50 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div className="text-xs font-bold text-emerald-400">LaunchGremlin OS</div>
                <p className="text-[11px] text-zinc-400 mt-1">Pre-loaded 5 pillars, SA small-business voice, and Maserati spine.</p>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, brandMode: 'custom_saas' })}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  formData.brandMode === 'custom_saas'
                    ? 'bg-zinc-950 border-purple-500 text-white ring-1 ring-purple-500/40'
                    : 'bg-zinc-950/50 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div className="text-xs font-bold text-purple-400">Custom SaaS Brand Mode</div>
                <p className="text-[11px] text-zinc-400 mt-1">White-label workspace for agencies, clients, and custom creators.</p>
              </button>
            </div>
          </div>

          {/* Custom Brand Fields if in SaaS mode */}
          {formData.brandMode === 'custom_saas' && (
            <div className="p-4 rounded-xl bg-zinc-950 border border-purple-500/30 space-y-4">
              <div className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Custom Brand Settings
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={formData.customBrandName || ''}
                    onChange={(e) => setFormData({ ...formData, customBrandName: e.target.value })}
                    placeholder="e.g. Apex Marketing"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Social Handle</label>
                  <input
                    type="text"
                    value={formData.customBrandHandle || ''}
                    onChange={(e) => setFormData({ ...formData, customBrandHandle: e.target.value })}
                    placeholder="e.g. @apexmarketing"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">Tone & Voice Guidelines</label>
                <textarea
                  rows={2}
                  value={formData.customTone || ''}
                  onChange={(e) => setFormData({ ...formData, customTone: e.target.value })}
                  placeholder="Describe your brand voice, prohibited words, and audience positioning..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white font-sans"
                />
              </div>
            </div>
          )}

          {/* LLM Engine Provider */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
              AI Generation Engine
            </label>
            <select
              value={formData.provider || 'local_engine'}
              onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="local_engine">Local Heuristic Engine (Offline / Instant / Zero Cost)</option>
              <option value="gemini">Google Gemini 1.5 Flash API</option>
              <option value="openai">OpenAI GPT-4o-mini API</option>
            </select>
          </div>

          {formData.provider !== 'local_engine' && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-emerald-400" /> API Key ({formData.provider?.toUpperCase()})
              </label>
              <input
                type="password"
                value={formData.apiKey || ''}
                onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                placeholder={`Enter your ${formData.provider} API key...`}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
            <span className="text-[11px] text-zinc-500">Settings persist in browser storage.</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
              >
                {isSaved ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" /> Saved!
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" /> Save Configuration
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
