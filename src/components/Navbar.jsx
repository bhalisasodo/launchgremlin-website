import React, { useState } from 'react';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, onSelectTab, onOpenBooking }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e, tab) => {
    e.preventDefault();
    if (onSelectTab) onSelectTab(tab);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { key: 'websites', label: 'Websites & Products', href: '/websites' },
    { key: 'content-strategy', label: 'Content Strategy', href: '/content-strategy' },
    { key: 'ai-consulting', label: 'AI Consulting', href: '/ai-consulting' },
    { key: 'blog', label: 'Content Hub', href: '/blog' },
    { key: 'about', label: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex items-center gap-3 cursor-pointer group"
          title="LaunchGremlin Home"
        >
          <img
            src="/assets/logo-icon.png"
            alt="LaunchGremlin Logo Icon"
            width="48"
            height="48"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <span className="font-black text-xl sm:text-2xl text-white tracking-tight">
            Launch<span className="text-emerald-400">Gremlin</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeTab === link.key || (link.key === 'blog' && activeTab.startsWith('blog/'));
            return (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.key)}
                className={`text-xs font-semibold uppercase tracking-wider transition-colors py-2 border-b-2 ${
                  isActive
                    ? 'border-emerald-400 text-white font-bold'
                    : 'border-transparent text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA Action Button */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-400 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Book Strategy Call</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950/95 border-b border-zinc-800 px-6 py-6 space-y-4">
          <nav aria-label="Mobile Drawer Navigation" className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.key)}
                className="text-sm font-semibold text-zinc-300 hover:text-emerald-400 py-2 border-b border-zinc-900"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-400 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(52,211,153,0.3)]"
            >
              <span>Book Strategy Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
