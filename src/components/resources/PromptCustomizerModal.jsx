import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Bot, Sparkles, Sliders, ArrowRight, ShieldCheck } from 'lucide-react';
import { injectPromptVariables } from '../../utils/resourcesData';
import { trackEvent } from '../../utils/analytics';

export default function PromptCustomizerModal({ prompt, isOpen, onClose }) {
  const [variables, setVariables] = useState({});
  const [copied, setCopied] = useState(false);

  // Initialize variables from prompt defaults
  useEffect(() => {
    if (prompt && prompt.variables) {
      const initial = {};
      prompt.variables.forEach(v => {
        initial[v.key] = v.default || '';
      });
      setVariables(initial);
    }
  }, [prompt]);

  if (!isOpen || !prompt) return null;

  const handleVariableChange = (key, val) => {
    setVariables(prev => ({ ...prev, [key]: val }));
  };

  const compiledPrompt = injectPromptVariables(prompt.template, variables);

  const handleCopy = () => {
    navigator.clipboard.writeText(compiledPrompt);
    setCopied(true);
    trackEvent('prompt_copied', { promptId: prompt.id, title: prompt.title });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 text-white relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-800 transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 border-b border-zinc-800 pb-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5" />
              {prompt.model || 'Claude 3.5 / GPT-4o'}
            </span>
            <span className="text-xs font-mono text-zinc-400">
              ⚡ {prompt.downloads.toLocaleString()} Copies • ★ {prompt.rating} Rating
            </span>
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight">
            {prompt.title}
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed font-light">
            {prompt.description}
          </p>
        </div>

        {/* 2-Column Workspace: Left Variables Configurator, Right Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT 5 COLS: Variables Customizer Inputs */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Sliders className="w-3.5 h-3.5" />
              <span>Customize Variables</span>
            </div>

            <div className="space-y-3">
              {prompt.variables && prompt.variables.map((v) => (
                <div key={v.key} className="space-y-1">
                  <label className="text-[11px] font-mono text-zinc-300 font-semibold block">
                    {v.label}
                  </label>
                  <input
                    type="text"
                    value={variables[v.key] || ''}
                    onChange={(e) => handleVariableChange(v.key, e.target.value)}
                    placeholder={v.default}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-600 focus:border-emerald-400 outline-none transition"
                  />
                </div>
              ))}
            </div>

            <div className="p-3 bg-zinc-950/60 rounded-xl border border-zinc-800 text-[11px] text-zinc-400 space-y-1">
              <div className="font-bold text-zinc-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                Prompt Optimization Tip
              </div>
              <p>For best results, paste directly into <strong>Claude 3.5 Sonnet</strong> (for nuanced copy) or <strong>GPT-4o</strong>.</p>
            </div>
          </div>

          {/* RIGHT 7 COLS: Live Compiled Prompt Preview & Copy Action */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
                Live Prompt Output
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-md shadow-emerald-500/20"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Custom Prompt'}</span>
              </button>
            </div>

            {/* Code / Text Container */}
            <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 max-h-[380px] overflow-y-auto font-mono text-[11px] text-zinc-300 leading-relaxed whitespace-pre-wrap select-text">
              {compiledPrompt}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-500">
            100% Free Open-Source Resource • LaunchGremlin Vault
          </span>
          <button
            onClick={handleCopy}
            className="px-5 py-2.5 rounded-xl bg-emerald-400 text-zinc-950 font-black text-xs uppercase tracking-wider hover:bg-emerald-300 transition cursor-pointer"
          >
            {copied ? 'Copied!' : 'Copy Prompt'}
          </button>
        </div>

      </div>
    </div>
  );
}
