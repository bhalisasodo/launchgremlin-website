import React from 'react';
import { Instagram, ShieldCheck, Lock, FileText, Cookie, Calculator } from 'lucide-react';
import { INDUSTRIES_DATA } from '../utils/industryData';
import { LONG_TAIL_PAGES } from '../utils/longTailData';

export default function Footer({ onSelectTab, onOpenBooking }) {
  const handleLinkClick = (e, tab) => {
    e.preventDefault();
    if (onSelectTab) onSelectTab(tab);
  };

  const industriesList = Object.keys(INDUSTRIES_DATA).map(key => INDUSTRIES_DATA[key]);
  const featuredLongTail = LONG_TAIL_PAGES.slice(0, 10);

  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-900 pt-16 pb-28 lg:pb-16 px-6 text-zinc-400 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-12">
        {/* Brand & Mantra Column */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="/assets/logo-icon.png"
              alt="LaunchGremlin Logo Icon"
              width="64"
              height="64"
              loading="lazy"
              decoding="async"
              className="h-14 sm:h-16 w-auto object-contain"
            />
            <span className="font-black text-2xl sm:text-3xl text-white tracking-tight">
              Launch<span className="text-emerald-400">Gremlin</span>
            </span>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed max-w-sm font-light">
            Technology is the engine. Growth is the outcome. We build, grow, and scale digital products, content engines, and custom AI systems for ambitious creators and internet-native businesses.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Aggressive Iteration — Build. Ship. Measure. Repeat.</span>
          </div>
        </div>

        {/* Strategic Pillars & Scope Column */}
        <div className="md:col-span-3 space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-200 font-bold">Strategic Pillars</h2>
          <ul className="space-y-2 text-xs">
            <li>
              <a
                href="/websites"
                onClick={(e) => handleLinkClick(e, 'websites')}
                className="hover:text-emerald-400 transition-colors inline-block py-0.5"
              >
                🌐 High-Performance Websites
              </a>
            </li>
            <li>
              <a
                href="/business-cards"
                onClick={(e) => handleLinkClick(e, 'business-cards')}
                className="hover:text-emerald-400 transition-colors inline-block py-0.5"
              >
                📇 Digital Business Cards (Free Tool)
              </a>
            </li>
            <li>
              <a
                href="/proposal"
                onClick={(e) => handleLinkClick(e, 'proposal')}
                className="hover:text-emerald-400 transition-colors inline-block py-0.5 text-emerald-400 font-semibold"
              >
                ⚡ Scope & AI Proposal Generator
              </a>
            </li>
            <li>
              <a
                href="/content-strategy"
                onClick={(e) => handleLinkClick(e, 'content-strategy')}
                className="hover:text-emerald-400 transition-colors inline-block py-0.5"
              >
                📈 Content Strategy & Growth
              </a>
            </li>
            <li>
              <a
                href="/ai-consulting"
                onClick={(e) => handleLinkClick(e, 'ai-consulting')}
                className="hover:text-emerald-400 transition-colors inline-block py-0.5"
              >
                🤖 AI Consulting & Workflows
              </a>
            </li>
            <li>
              <a
                href="/blog"
                onClick={(e) => handleLinkClick(e, 'blog')}
                className="hover:text-emerald-400 transition-colors inline-block py-0.5 font-bold text-emerald-400"
              >
                📚 100 Article Content Hub
              </a>
            </li>
          </ul>

          <div className="pt-2 space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-200 font-bold">Legal & E-E-A-T Trust</h2>
            <ul className="space-y-1.5 text-xs font-mono">
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => handleLinkClick(e, 'privacy')}
                  className="hover:text-emerald-400 transition-colors py-0.5 inline-block text-zinc-400"
                >
                  🔒 Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => handleLinkClick(e, 'terms')}
                  className="hover:text-emerald-400 transition-colors py-0.5 inline-block text-zinc-400"
                >
                  📄 Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/cookies"
                  onClick={(e) => handleLinkClick(e, 'cookies')}
                  className="hover:text-emerald-400 transition-colors py-0.5 inline-block text-zinc-400"
                >
                  🍪 Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Company & Solutions Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-200 font-bold">Company & Solutions</h2>
            <a
              href="/about"
              onClick={(e) => handleLinkClick(e, 'about')}
              className="text-[11px] font-mono text-emerald-400 hover:underline"
            >
              About Founders →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs">
            {industriesList.slice(0, 6).map((ind) => (
              <a
                key={ind.slug}
                href={ind.path}
                onClick={(e) => handleLinkClick(e, ind.slug)}
                className="hover:text-emerald-400 transition-colors truncate py-0.5 text-zinc-400"
                title={`Websites for ${ind.name}`}
              >
                ● Websites for {ind.shortTitle}
              </a>
            ))}

            {featuredLongTail.map((lt) => (
              <a
                key={lt.slug}
                href={lt.path}
                onClick={(e) => handleLinkClick(e, lt.slug)}
                className="hover:text-emerald-400 transition-colors truncate py-0.5 text-zinc-400"
                title={lt.title}
              >
                ● {lt.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
        <span>© {new Date().getFullYear()} LaunchGremlin. Verified E-E-A-T Enterprise Authority.</span>

        <div className="flex items-center gap-6 text-zinc-400">
          <a
            href="https://www.tiktok.com/@launchgremlin"
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            title="LaunchGremlin TikTok"
            aria-label="LaunchGremlin TikTok profile"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
            aria-label="LaunchGremlin Instagram profile"
          >
            <Instagram className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
