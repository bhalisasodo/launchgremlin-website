import React from 'react';
import { Calendar, Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({
  activeTab,
  onSelectTab,
  onOpenBooking,
  isMaintenance,
  onToggleMaintenance,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'websites', label: 'Websites' },
    { id: 'content-strategy', label: 'Content Strategy' },
    { id: 'ai-consulting', label: 'AI Consulting' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <img
            src="/assets/logo-transparent.png"
            alt="LaunchGremlin Logo"
            className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-bold text-lg text-white tracking-tight leading-none">
              Launch<span className="text-emerald-400">Gremlin</span>
            </span>
            <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase mt-0.5">
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
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
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
        <div className="flex items-center gap-3">
          {/* Phase 5 Maintenance Mode Toggle Pill */}
          <button
            onClick={onToggleMaintenance}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
              isMaintenance
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
            title="Toggle Phase 5 Maintenance Mode Overlay"
          >
            <span className={`w-2 h-2 rounded-full ${isMaintenance ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
            <span>{isMaintenance ? 'Maintenance Active' : 'Phase 5 View'}</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-400 text-zinc-950 font-bold text-xs shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Book Strategy Call</span>
            <span className="sm:hidden">Book Call</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-6 py-4 space-y-2 animate-fade-up">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onSelectTab(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === link.id
                  ? 'bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-2 border-t border-zinc-900 flex items-center justify-between">
            <button
              onClick={onToggleMaintenance}
              className="text-xs font-mono text-amber-400 underline"
            >
              Toggle Maintenance Mode
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
