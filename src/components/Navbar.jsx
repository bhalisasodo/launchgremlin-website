import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, onSelectTab, onOpenBooking }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on escape key or route change
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (e, tab) => {
    e.preventDefault();
    if (onSelectTab) onSelectTab(tab);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { key: 'websites', label: 'Websites & Products', href: '/websites' },
    { key: 'business-cards', label: 'Card Generator', href: '/business-cards' },
    { key: 'proposal', label: 'Scope & Quote', href: '/proposal' },
    { key: 'content-strategy', label: 'Content Strategy', href: '/content-strategy' },
    { key: 'ai-consulting', label: 'AI Consulting', href: '/ai-consulting' },
    { key: 'blog', label: 'Content Hub', href: '/blog' },
    { key: 'about', label: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 shrink-0"
          title="LaunchGremlin Home"
        >
          <img
            src="/assets/logo-icon.png"
            alt="LaunchGremlin Logo Icon"
            width="52"
            height="52"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <span className="font-black text-lg sm:text-2xl text-white tracking-tight">
            Launch<span className="text-emerald-400">Gremlin</span>
          </span>
        </a>

        {/* Desktop Nav Links (Visible from lg: 1024px) */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-4 xl:gap-7">
          {navLinks.map((link) => {
            const isActive = activeTab === link.key || (link.key === 'blog' && activeTab.startsWith('blog/'));
            return (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.key)}
                className={`text-[11px] xl:text-xs font-semibold uppercase tracking-wider transition-all duration-200 py-2 border-b-2 rounded-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
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
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-1.5 px-4 xl:px-5 py-2.5 rounded-xl bg-emerald-400 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 whitespace-nowrap"
          >
            <span>Book Strategy Call</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          className="lg:hidden p-2.5 text-zinc-300 hover:text-white transition-colors rounded-xl bg-zinc-900 border border-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Animated Dropdown Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[72px] sm:top-[80px] bg-zinc-950/98 backdrop-blur-2xl border-b border-zinc-800 shadow-2xl px-6 py-6 space-y-5 animate-in slide-in-from-top duration-200 z-50 max-h-[calc(100dvh-80px)] overflow-y-auto">
          <nav aria-label="Mobile Drawer Navigation" className="flex flex-col divide-y divide-zinc-900">
            {navLinks.map((link) => {
              const isActive = activeTab === link.key || (link.key === 'blog' && activeTab.startsWith('blog/'));
              return (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.key)}
                  className={`text-sm font-semibold py-3 transition-colors flex items-center justify-between ${
                    isActive ? 'text-emerald-400 font-bold' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                </a>
              );
            })}
          </nav>

          <div className="pt-2 space-y-2.5">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-400 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(52,211,153,0.3)] active:scale-95 transition-all cursor-pointer"
            >
              <span>Book Strategy Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <div className="text-center text-[10.5px] font-mono text-zinc-500">
              ⚡ 100% Free 30-Minute Architecture Audit
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
