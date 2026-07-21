import React from 'react';
import { RefreshCw, Zap, Shield, Heart, ArrowRight, Layers, Sparkles } from 'lucide-react';

export default function AboutPage({ onOpenBooking }) {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="pt-16 max-w-5xl mx-auto px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About LaunchGremlin</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Internet Native. Creator Focused. <br />
          <span className="text-emerald-400 italic">Built for Speed & Quality.</span>
        </h1>

        <p className="text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          We are not a traditional, bureaucratic agency. We are an internet-native growth product company that builds fast, tests real data, and iterates relentlessly.
        </p>
      </section>

      {/* Manifesto */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="p-10 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Our Company Philosophy</h2>
          <blockquote className="text-lg sm:text-xl font-mono text-emerald-400 italic">
            &quot;Aggressive Iteration. Build. Ship. Measure. Improve. Repeat.&quot;
          </blockquote>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
            Speed creates learning. Quality creates trust. Both are required. We work with ambitious founders and creators who want to win in fast-moving internet markets.
          </p>
        </div>
      </section>
    </div>
  );
}
