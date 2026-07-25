import React from 'react';
import { Calendar, Menu, X } from 'lucide-react';

export default function Navbar({
  activeTab,
  onSelectTab,
  onOpenBooking,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { id: 'websites', label: 'Websites' },
    { id: 'content-strategy', label: 'Content Strategy' },
    { id: 'ai-consulting', label: 'AI Consulting' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 min-h-[72px] sm:min-h-[88px] flex items-center justify-between gap-2">
        {/* Brand Logo & Name */}
        <button
          onClick={() => onSelectTab('home')}
          aria-label="LaunchGremlin Homepage"
          className="flex items-center gap-2.5 sm:gap-4 group text-left focus:outline-none shrink-0"
        >
          <img
            src="/assets/logo-icon.png"
            alt="LaunchGremlin Logo Icon"
            className="h-12 sm:h-18 md:h-22 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-black text-xl sm:text-2xl md:text-3xl text-white tracking-tight leading-none">
              Launch<span className="text-emerald-400">Gremlin</span>
            </span>
            <span className="text-[9px] sm:text-xs font-mono text-zinc-400 tracking-widest uppercase mt-0.5 sm:mt-1">
              Build. Grow. Scale.
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 p-1.5 rounded-2xl border border-zinc-800/80">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onSelectTab(link.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-400 text-zinc-950 font-bold shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-2.5 min-h-[44px] sm:min-h-[48px] rounded-xl bg-emerald-400 text-zinc-950 font-bold text-xs shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Book Strategy Call</span>
            <span className="sm:hidden text-[11px] font-bold">Book Call</span>
          </button>

          {/* Mobile Menu Button (48px Touch Target) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Navigation Menu"
            className="md:hidden p-3 min-h-[44px] min-w-[44px] rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-4 sm:px-6 py-4 space-y-2 animate-fade-up">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onSelectTab(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 min-h-[48px] rounded-xl text-sm font-semibold transition-all flex items-center cursor-pointer ${
                activeTab === link.id
                  ? 'bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
