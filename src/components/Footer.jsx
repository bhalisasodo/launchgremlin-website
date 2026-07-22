import React from 'react';
import { ArrowUpRight, Sparkles, Heart, Instagram } from 'lucide-react';

export default function Footer({ onSelectTab, onOpenBooking }) {
  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-900 py-16 px-6 text-zinc-400 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
        {/* Brand & Mantra Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <img src="/assets/logo-transparent.png" alt="LaunchGremlin Logo" className="h-8 w-auto object-contain" />
            <span className="font-bold text-lg text-white tracking-tight">
              Launch<span className="text-emerald-400">Gremlin</span>
            </span>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed max-w-sm font-light">
            Technology is the engine. Growth is the outcome. We build, grow, and scale digital products, content engines, and custom AI systems for ambitious creators and internet-native businesses.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Aggressive Iteration — Build. Ship. Measure. Improve. Repeat.</span>
          </div>
        </div>

        {/* Pillars Column */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-200 font-bold">Strategic Pillars</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onSelectTab('websites')} className="hover:text-emerald-400 transition-colors">
                🌐 High-Performance Websites
              </button>
            </li>
            <li>
              <button onClick={() => onSelectTab('content-strategy')} className="hover:text-emerald-400 transition-colors">
                📈 Content Strategy & Growth
              </button>
            </li>
            <li>
              <button onClick={() => onSelectTab('ai-consulting')} className="hover:text-emerald-400 transition-colors">
                🤖 AI Consulting & Workflows
              </button>
            </li>
          </ul>
        </div>

        {/* Navigation & Company */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-200 font-bold">Company</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onSelectTab('about')} className="hover:text-white transition-colors">
                About Us
              </button>
            </li>
            <li>
              <button onClick={() => onSelectTab('contact')} className="hover:text-white transition-colors">
                Contact & Scope Builder
              </button>
            </li>
            <li>
              <button onClick={onOpenBooking} className="text-emerald-400 hover:underline">
                Book Strategy Call
              </button>
            </li>
          </ul>
        </div>

        {/* Live System Status */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-200 font-bold">System Status</h4>
          <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-xs space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>All Systems Operational</span>
            </div>
            <p className="text-[10px] text-zinc-500 font-mono">100% Uptime · Vite React Engine</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
        <span>© {new Date().getFullYear()} LaunchGremlin. All rights reserved.</span>

        <div className="flex items-center gap-6 text-zinc-400">
          <a
            href="https://www.tiktok.com/@launchgremlin"
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            title="LaunchGremlin TikTok"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.84V7.59a6.34 6.34 0 0 0-5.11 6.18A6.34 6.34 0 1 0 15.8 7.61a8.31 8.31 0 0 0 3.79.95v-3.47a4.87 4.87 0 0 1 0 1.6z"/>
            </svg>
            <span>TikTok</span>
          </a>
          <a
            href="https://www.instagram.com/launchgremlin/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            title="LaunchGremlin Instagram"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
