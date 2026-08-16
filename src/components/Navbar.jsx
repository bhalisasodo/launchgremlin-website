import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Globe,
  TrendingUp,
  Bot,
  CreditCard,
  Calculator,
  BookOpen,
  User,
  Sparkles,
  Zap
} from 'lucide-react';

export default function Navbar({ activeTab, onSelectTab, onOpenBooking }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'solutions', 'tools', null
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (e, tab) => {
    e.preventDefault();
    if (onSelectTab) onSelectTab(tab);
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const solutions = [
    {
      key: 'websites',
      title: 'Websites & Digital Products',
      subtitle: 'Sub-second load times & 100/100 Core Web Vitals',
      icon: Globe,
      badge: 'Core Engine'
    },
    {
      key: 'content-strategy',
      title: 'Content Strategy & Growth',
      subtitle: 'Viral short-form systems & multi-channel distribution',
      icon: TrendingUp,
      badge: 'Audience'
    },
    {
      key: 'ai-consulting',
      title: 'AI Consulting & Workflows',
      subtitle: 'Autonomous 24/7 AI agents & vector RAG systems',
      icon: Bot,
      badge: 'Automation'
    }
  ];

  const tools = [
    {
      key: 'resources',
      title: 'Creator Studio & Vault',
      subtitle: 'Free Notion OS, AI prompt chains & cheat sheets',
      icon: Sparkles,
      badge: 'Resource Vault'
    },
    {
      key: 'business-cards',
      title: 'Digital Business Card Studio',
      subtitle: 'Free mobile-first cards with NFC & QR code export',
      icon: CreditCard,
      badge: 'Free Tool'
    },
    {
      key: 'proposal',
      title: 'Scope & AI Proposal Generator',
      subtitle: 'Real-time price calculator & technical brief builder',
      icon: Calculator,
      badge: 'Instant Quote'
    }
  ];

  const isSolutionsActive = ['websites', 'content-strategy', 'ai-consulting'].includes(activeTab);
  const isToolsActive = ['resources', 'creator-studio', 'playbooks', 'prompts', 'templates', 'business-cards', 'proposal', 'card', 'cards', 'quote', 'scope-builder'].includes(activeTab);

  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/80 transition-all duration-300">
      <div
        ref={dropdownRef}
        className="max-w-7xl mx-auto px-6 sm:px-8 h-20 sm:h-22 flex items-center justify-between"
      >
        {/* Left: Brand Logo */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex items-center gap-3 cursor-pointer group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 shrink-0"
          title="LaunchGremlin Home"
        >
          <img
            src="/assets/logo-icon.png"
            alt="LaunchGremlin Logo"
            width="48"
            height="48"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-10 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <span className="font-black text-xl sm:text-2xl text-white tracking-tight">
            Launch<span className="text-emerald-400">Gremlin</span>
          </span>
        </a>

        {/* Center: Desktop Navigation (Spacious & Clean) */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-8 xl:gap-10">
          
          {/* 1. Solutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown('solutions')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              onClick={() => setOpenDropdown(openDropdown === 'solutions' ? null : 'solutions')}
              className={`inline-flex items-center gap-1.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                isSolutionsActive || openDropdown === 'solutions'
                  ? 'text-emerald-400'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              <span>Solutions</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  openDropdown === 'solutions' ? 'rotate-180 text-emerald-400' : 'text-zinc-500'
                }`}
              />
            </button>

            {/* Dropdown Menu Card */}
            {openDropdown === 'solutions' && (
              <div className="absolute top-full -left-6 pt-3 w-[360px] animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="p-3 bg-zinc-900/95 border border-zinc-800 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">
                    Strategic Capability Pillars
                  </div>
                  {solutions.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.key;
                    return (
                      <a
                        key={item.key}
                        href={`/${item.key}`}
                        onClick={(e) => handleNavClick(e, item.key)}
                        className={`p-2.5 rounded-xl transition-all flex items-start gap-3 group cursor-pointer ${
                          isActive
                            ? 'bg-emerald-950/40 border border-emerald-500/30'
                            : 'hover:bg-zinc-800/80 border border-transparent'
                        }`}
                      >
                        <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                          isActive ? 'bg-emerald-400 text-zinc-950' : 'bg-zinc-950 text-emerald-400 group-hover:scale-105 transition-transform'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5 flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                              {item.title}
                            </span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                              {item.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 font-light leading-snug truncate">
                            {item.subtitle}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 2. Free Tools Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown('tools')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              onClick={() => setOpenDropdown(openDropdown === 'tools' ? null : 'tools')}
              className={`inline-flex items-center gap-1.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                isToolsActive || openDropdown === 'tools'
                  ? 'text-emerald-400'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              <span>Interactive Tools</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  openDropdown === 'tools' ? 'rotate-180 text-emerald-400' : 'text-zinc-500'
                }`}
              />
            </button>

            {/* Dropdown Menu Card */}
            {openDropdown === 'tools' && (
              <div className="absolute top-full -left-6 pt-3 w-[360px] animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="p-3 bg-zinc-900/95 border border-zinc-800 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">
                    Self-Serve Creator & Growth Tools
                  </div>
                  {tools.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.key;
                    return (
                      <a
                        key={item.key}
                        href={`/${item.key}`}
                        onClick={(e) => handleNavClick(e, item.key)}
                        className={`p-2.5 rounded-xl transition-all flex items-start gap-3 group cursor-pointer ${
                          isActive
                            ? 'bg-emerald-950/40 border border-emerald-500/30'
                            : 'hover:bg-zinc-800/80 border border-transparent'
                        }`}
                      >
                        <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                          isActive ? 'bg-emerald-400 text-zinc-950' : 'bg-zinc-950 text-emerald-400 group-hover:scale-105 transition-transform'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5 flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                              {item.title}
                            </span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                              {item.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 font-light leading-snug truncate">
                            {item.subtitle}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 3. Content Hub Direct Link */}
          <a
            href="/blog"
            onClick={(e) => handleNavClick(e, 'blog')}
            className={`text-xs font-bold uppercase tracking-wider transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              activeTab === 'blog' || activeTab.startsWith('blog/')
                ? 'text-emerald-400 font-black'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            Content Hub
          </a>

          {/* 4. About Direct Link */}
          <a
            href="/about"
            onClick={(e) => handleNavClick(e, 'about')}
            className={`text-xs font-bold uppercase tracking-wider transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              activeTab === 'about'
                ? 'text-emerald-400 font-black'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            About
          </a>

          {/* 5. Contact Direct Link */}
          <a
            href="/contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className={`text-xs font-bold uppercase tracking-wider transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              activeTab === 'contact'
                ? 'text-emerald-400 font-black'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            Contact
          </a>
        </nav>

        {/* Right: Desktop CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-400 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(52,211,153,0.3)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 shrink-0"
          >
            <span>Book Strategy Call</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          className="lg:hidden p-2.5 text-zinc-300 hover:text-white transition-colors rounded-xl bg-zinc-900 border border-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer (Categorized & Spacious) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[72px] sm:top-[88px] bg-zinc-950/98 backdrop-blur-2xl border-b border-zinc-800 shadow-2xl px-6 py-6 space-y-6 animate-in slide-in-from-top duration-200 z-50 max-h-[calc(100dvh-88px)] overflow-y-auto">
          
          {/* Solutions Section */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
              Solutions & Services
            </span>
            <div className="space-y-1">
              {solutions.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.key;
                return (
                  <a
                    key={item.key}
                    href={`/${item.key}`}
                    onClick={(e) => handleNavClick(e, item.key)}
                    className={`p-3 rounded-xl flex items-center justify-between transition-colors ${
                      isActive ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-500/30' : 'text-zinc-200 hover:bg-zinc-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-xs font-bold">{item.title}</span>
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      {item.badge}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Interactive Tools Section */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
              Interactive Tools
            </span>
            <div className="space-y-1">
              {tools.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.key;
                return (
                  <a
                    key={item.key}
                    href={`/${item.key}`}
                    onClick={(e) => handleNavClick(e, item.key)}
                    className={`p-3 rounded-xl flex items-center justify-between transition-colors ${
                      isActive ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-500/30' : 'text-zinc-200 hover:bg-zinc-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-xs font-bold">{item.title}</span>
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                      {item.badge}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Direct Links */}
          <div className="pt-2 border-t border-zinc-900 grid grid-cols-3 gap-2 text-center text-xs font-bold">
            <a
              href="/blog"
              onClick={(e) => handleNavClick(e, 'blog')}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            >
              Content Hub
            </a>
            <a
              href="/about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            >
              About
            </a>
            <a
              href="/contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            >
              Contact
            </a>
          </div>

          {/* Bottom Mobile Action CTA */}
          <div className="pt-2 space-y-2">
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
