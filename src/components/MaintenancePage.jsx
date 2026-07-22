import React, { useState } from 'react';
import { Sparkles, Calendar, Mail, ArrowRight, Check, Send, Globe, Twitter, Linkedin, Github } from 'lucide-react';

export default function MaintenancePage({ onOpenBookingModal }) {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between relative overflow-hidden selection:bg-emerald-400 selection:text-black">
      {/* Neon Ambient Background Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-400/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="p-6 md:p-8 flex items-center justify-between relative z-10 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <img src="/assets/logo-transparent.png" alt="LaunchGremlin Logo" className="h-10 w-auto object-contain" />
          <span className="font-bold tracking-tight text-lg hidden sm:inline text-zinc-100">
            Launch<span className="text-emerald-400">Gremlin</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Strategic Upgrade in Progress</span>
          </span>
        </div>
      </header>

      {/* Main Hero Maintenance Card */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10 my-8">
        <div className="w-full max-w-2xl bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 md:p-12 backdrop-blur-2xl shadow-2xl space-y-8 text-center relative overflow-hidden">
          {/* Subtle Cyber Neon Line Accent */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-emerald-300 to-emerald-600" />

          {/* Logo Mark Header */}
          <div className="flex justify-center">
            <div className="relative p-4 rounded-2xl bg-zinc-950/80 border border-emerald-400/30 shadow-[0_0_30px_rgba(52,211,153,0.15)] animate-pulse-slow">
              <img src="/assets/logo-transparent.png" alt="LaunchGremlin Logo Mark" className="w-16 h-16 object-contain" />
            </div>
          </div>

          {/* Headline & Body Copy */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-emerald-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Phase 5 Maintenance Mode</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              We&apos;re Building Something Better.
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-lg mx-auto font-light">
              LaunchGremlin is currently undergoing a strategic upgrade as we reposition our company around{' '}
              <strong className="text-white font-semibold">Websites</strong>,{' '}
              <strong className="text-white font-semibold">Content Strategy</strong> and{' '}
              <strong className="text-white font-semibold">AI Consulting</strong>.
            </p>

            <p className="text-xs sm:text-sm font-mono text-emerald-400">
              We&apos;re moving fast. We&apos;ll be back soon.
            </p>
          </div>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenBookingModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-emerald-400 text-zinc-950 font-bold text-sm shadow-[0_0_25px_rgba(52,211,153,0.35)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="mailto:hello@launchgremlin.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-sm font-semibold hover:border-zinc-700 hover:text-white transition-all"
            >
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>hello@launchgremlin.com</span>
            </a>
          </div>

          {/* Early Access / VIP Lead Capture Form */}
          <div className="pt-6 border-t border-zinc-800/80 max-w-md mx-auto">
            {subscribed ? (
              <div className="p-3.5 rounded-xl bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                <span>You&apos;re on the VIP list. We&apos;ll notify you first!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter email for early VIP access..."
                  className="flex-1 px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-all"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-3 rounded-xl bg-emerald-400 text-zinc-950 font-bold text-xs hover:bg-emerald-300 transition-all shrink-0 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? 'Joining...' : 'Notify Me'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 md:p-8 border-t border-zinc-900 relative z-10 max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
        <div className="flex items-center gap-2">
          <span>© {new Date().getFullYear()} LaunchGremlin. Build. Grow. Scale.</span>
        </div>

        <div className="flex items-center gap-5 text-zinc-400">
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
            <Twitter className="w-4 h-4" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
            <Github className="w-4 h-4" />
          </a>
        </div>
      </footer>
    </div>
  );
}
