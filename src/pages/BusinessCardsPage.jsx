import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Smartphone,
  QrCode,
  Download,
  Share2,
  Phone,
  Mail,
  MessageCircle,
  Globe,
  ExternalLink,
  Plus,
  Trash2,
  Check,
  Printer,
  Copy,
  Layers,
  Palette,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  Zap,
  RotateCw,
  Eye,
  CheckCircle2,
  Flame,
  FileText,
  Clock,
  Quote,
  Send,
  UserCheck,
  Users
} from 'lucide-react';
import QRCode from 'qrcode';
import {
  DEMO_PROFILES,
  CARD_THEMES,
  SOCIAL_PLATFORMS,
  encodeCardToUrl,
  downloadVCard
} from '../utils/cardData';
import { SocialIcon } from '../components/cards/SocialIcons';
import PhysicalCardPreview from '../components/cards/PhysicalCardPreview';
import NfcGuideModal from '../components/cards/NfcGuideModal';
import LeadExchangeModal from '../components/cards/LeadExchangeModal';
import CapturedLeadsDrawer from '../components/cards/CapturedLeadsDrawer';
import LockscreenWallpaperModal from '../components/cards/LockscreenWallpaperModal';
import WalletPassModal from '../components/cards/WalletPassModal';
import TeamCardManagerModal from '../components/cards/TeamCardManagerModal';
import PressReadyPrintModal from '../components/cards/PressReadyPrintModal';
import QrCodeStudioModal from '../components/cards/QrCodeStudioModal';
import { cardService } from '../services/cardService';
import { trackEvent } from '../utils/analytics';

export default function BusinessCardsPage({ onOpenBooking, onSelectTab }) {
  // Load initial card from localStorage or default to Alex Morgan
  const [card, setCard] = useState(() => {
    try {
      const saved = localStorage.getItem('lg_card_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.avatarUrl) {
          const userAvatar = localStorage.getItem('lg_user_avatar');
          if (userAvatar) parsed.avatarUrl = userAvatar;
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to load local draft:', e);
    }
    const defaultProfile = { ...DEMO_PROFILES[0] };
    try {
      const userAvatar = localStorage.getItem('lg_user_avatar');
      if (userAvatar) defaultProfile.avatarUrl = userAvatar;
    } catch (e) {}
    return defaultProfile;
  });

  const [activeStep, setActiveStep] = useState('identity');
  const [previewMode, setPreviewMode] = useState('phone'); // 'phone', 'physical', 'stand'
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [newService, setNewService] = useState('');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isNfcModalOpen, setIsNfcModalOpen] = useState(false);
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const [isLeadsDrawerOpen, setIsLeadsDrawerOpen] = useState(false);
  const [isWallpaperModalOpen, setIsWallpaperModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isPressPrintModalOpen, setIsPressPrintModalOpen] = useState(false);
  const [isQrStudioModalOpen, setIsQrStudioModalOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState('editor'); // 'editor' | 'preview'
  const [capturedLeadsCount, setCapturedLeadsCount] = useState(0);
  const [selectedDemoId, setSelectedDemoId] = useState(card.slug || 'alex-morgan');
  const [shareableUrl, setShareableUrl] = useState('');
  const avatarInputRef = useRef(null);

  // Auto-save draft to localStorage and backend API whenever card changes
  useEffect(() => {
    cardService.saveCard(card);
  }, [card]);

  // Load captured leads count
  useEffect(() => {
    const checkLeads = () => {
      try {
        const stored = localStorage.getItem('lg_captured_leads');
        if (stored) {
          const parsed = JSON.parse(stored);
          setCapturedLeadsCount(Array.isArray(parsed) ? parsed.length : 0);
        }
      } catch (e) {}
    };
    checkLeads();
    const interval = setInterval(checkLeads, 3000);
    return () => clearInterval(interval);
  }, []);

  // Compute shareable encoded URL
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const origin = window.location.origin;
    const encoded = encodeCardToUrl(card);
    const fullUrl = `${origin}/c/${card.slug || 'card'}#data=${encoded}`;
    setShareableUrl(fullUrl);
  }, [card]);

  // Generate QR code data URL whenever shareable URL or theme colors change
  useEffect(() => {
    const generateQr = async () => {
      try {
        const targetUrl = shareableUrl || (typeof window !== 'undefined' ? `${window.location.origin}/c/${card.slug || 'card'}` : `https://launchgremlin.com/c/${card.slug || 'card'}`);
        const url = await QRCode.toDataURL(targetUrl, {
          width: 800,
          margin: 2,
          color: {
            dark: card.primaryColor || '#10b981',
            light: '#ffffff'
          }
        });
        setQrDataUrl(url);
      } catch (err) {
        console.error('Error generating QR code:', err);
      }
    };
    generateQr();
  }, [shareableUrl, card.primaryColor, card.slug]);

  // Handle Preset Switching
  const handleSelectPreset = (presetId) => {
    const found = DEMO_PROFILES.find(p => p.id === presetId);
    if (found) {
      setSelectedDemoId(presetId);
      // Retain user's custom photo if one was uploaded
      setCard(prev => ({
        ...JSON.parse(JSON.stringify(found)),
        avatarUrl: prev.avatarUrl || found.avatarUrl || ''
      }));
      trackEvent('card_preset_selected', { presetId });
    }
  };

  // Avatar upload with centered square cropping and canvas optimization
  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = async () => {
        // Center-crop to square and scale to 250x250 for crisp retina quality (~7KB)
        const targetDim = 250;
        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;

        const canvas = document.createElement('canvas');
        canvas.width = targetDim;
        canvas.height = targetDim;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, targetDim, targetDim);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        
        setCard(prev => ({ ...prev, avatarUrl: dataUrl }));
        try {
          localStorage.setItem('lg_user_avatar', dataUrl);
        } catch (err) {}

        // Persist to backend uploads if available
        try {
          const uploadedUrl = await cardService.uploadAvatar(card.slug, dataUrl);
          if (uploadedUrl && uploadedUrl !== dataUrl) {
            setCard(prev => ({ ...prev, avatarUrl: uploadedUrl }));
          }
        } catch (err) {
          // offline fallback
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemoveAvatar = () => {
    setCard(p => ({ ...p, avatarUrl: '' }));
    try {
      localStorage.removeItem('lg_user_avatar');
    } catch (e) {}
    if (avatarInputRef.current) {
      avatarInputRef.current.value = '';
    }
  };

  // Add & Remove Services
  const handleAddService = () => {
    if (!newService.trim()) return;
    if (!card.services?.includes(newService.trim())) {
      setCard(prev => ({ ...prev, services: [...(prev.services || []), newService.trim()] }));
    }
    setNewService('');
  };

  const handleRemoveService = (index) => {
    setCard(prev => ({
      ...prev,
      services: prev.services.filter((_, idx) => idx !== index)
    }));
  };

  // Add & Remove Portfolio
  const handleAddPortfolio = () => {
    if ((card.portfolio?.length || 0) >= 6) return;
    setCard(prev => ({
      ...prev,
      portfolio: [...(prev.portfolio || []), { title: 'Featured Project Title', description: 'Brief description of project impact', imageUrl: '', linkUrl: 'https://' }]
    }));
  };

  const handleRemovePortfolio = (index) => {
    setCard(prev => ({
      ...prev,
      portfolio: prev.portfolio.filter((_, idx) => idx !== index)
    }));
  };

  // Copy shareable link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);
    trackEvent('card_link_copied', { slug: card.slug });
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Reset to clean template
  const handleResetCard = () => {
    if (window.confirm('Reset all card information to default?')) {
      const defaultProfile = DEMO_PROFILES[0];
      setCard(JSON.parse(JSON.stringify(defaultProfile)));
      setSelectedDemoId(defaultProfile.id);
      try {
        localStorage.removeItem('lg_user_avatar');
      } catch (e) {}
      if (avatarInputRef.current) {
        avatarInputRef.current.value = '';
      }
    }
  };

  const activeTheme = CARD_THEMES.find(t => t.id === card.themeStyle) || CARD_THEMES[0];

  return (
    <div className="w-full bg-zinc-950 text-white min-h-screen">
      
      {/* Hero Header Section */}
      <section className="relative pt-12 pb-8 border-b border-zinc-800/80 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/30 via-zinc-950/90 to-zinc-950 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            100% Free Self-Serve Studio • Zero Login Required
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight uppercase">
            Digital Business Card <br className="hidden sm:inline" />
            <span className="text-emerald-400">& NFC Growth Hub</span>
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Create an interactive mobile digital card, instant 1-tap contact saving (.vcf), scannable QR code, and print-ready physical card layout in 60 seconds.
          </p>

          {/* Persona Presets Bar */}
          <div className="pt-2 pb-2">
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
              ⚡ Explore Ready-Made Personas:
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {DEMO_PROFILES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(p.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedDemoId === p.id
                      ? 'bg-emerald-400 text-zinc-950 shadow-md shadow-emerald-500/20 scale-105'
                      : 'bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
                  }`}
                >
                  {p.fullName}
                  <span className="text-[10px] opacity-75 ml-1 font-normal">({p.jobTitle.split(' ')[0]})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Studio Primary Action Shortcuts */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-2 scrollbar-none max-w-full px-2 sm:flex-wrap sm:justify-center">
            <button
              onClick={() => setIsWalletModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-zinc-950 text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-emerald-500/20 hover:scale-105 shrink-0"
            >
              <Smartphone className="w-4 h-4" />
              <span>Apple / Google Wallet Pass</span>
            </button>

            <button
              onClick={() => setIsTeamModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0"
            >
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Team & Corporate Suite</span>
            </button>

            <button
              onClick={() => setIsPressPrintModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>CR80 Print PDF (300 DPI)</span>
            </button>

            <button
              onClick={() => setIsQrStudioModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0"
            >
              <QrCode className="w-4 h-4 text-emerald-400" />
              <span>Branded QR Studio</span>
            </button>

            <button
              onClick={() => {
                downloadVCard(card);
                trackEvent('vcard_downloaded_studio', { slug: card.slug });
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shrink-0"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>vCard (.vcf)</span>
            </button>

            <button
              onClick={() => setIsWallpaperModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shrink-0"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Wallpaper</span>
            </button>

            <button
              onClick={() => setIsNfcModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shrink-0"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>NFC Guide</span>
            </button>

            <button
              onClick={() => setIsLeadsDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-emerald-500/10 shrink-0"
            >
              <Users className="w-4 h-4" />
              <span>Leads ({capturedLeadsCount})</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Studio Work Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-24 lg:pb-10">
        
        {/* LEFT COLUMN: Configurator Panels (7 Cols) */}
        <div className={`lg:col-span-7 space-y-6 ${mobileTab === 'editor' ? 'block' : 'hidden lg:block'}`}>
          
          {/* Step Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-800 scrollbar-none">
            {[
              { id: 'identity', label: '1. Identity & Bio', icon: Briefcase },
              { id: 'branding', label: '2. Themes & Colors', icon: Palette },
              { id: 'contact', label: '3. Contact & Socials', icon: Phone },
              { id: 'portfolio', label: '4. Projects & Skills', icon: Layers },
              { id: 'cta', label: '5. CTAs & Conversion', icon: ArrowRight },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeStep === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveStep(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-400 text-zinc-950 shadow-md shadow-emerald-500/20'
                      : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* TAB 1: IDENTITY & BIO */}
          {activeStep === 'identity' && (
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white">Profile Identity</h3>
                  <p className="text-xs text-zinc-400">Your core contact header and professional branding.</p>
                </div>
                <button
                  type="button"
                  onClick={handleResetCard}
                  className="text-xs text-zinc-500 hover:text-red-400 font-semibold cursor-pointer"
                >
                  Reset Form
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center overflow-hidden shrink-0 shadow-lg">
                  {card.avatarUrl ? (
                    <img src={card.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl font-black text-emerald-400">
                      {(card.fullName || 'C').charAt(0)}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">Photo / Brand Logo</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={avatarInputRef}
                      onChange={handleAvatarUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => avatarInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 cursor-pointer"
                    >
                      Upload New Photo
                    </button>
                    {card.avatarUrl && (
                      <button
                        type="button"
                        onClick={handleRemoveAvatar}
                        className="text-red-400 hover:text-red-300 text-xs font-semibold cursor-pointer px-2"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <span className="text-[11px] text-zinc-500 block">Square image recommended (auto-compressed on upload)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    value={card.fullName}
                    onChange={(e) => setCard(p => ({ ...p, fullName: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-400 outline-none font-medium"
                    placeholder="Alex Morgan"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">Job Title / Role *</label>
                  <input
                    type="text"
                    value={card.jobTitle}
                    onChange={(e) => setCard(p => ({ ...p, jobTitle: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-400 outline-none font-medium"
                    placeholder="Lead Product Designer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">Company / Agency Name</label>
                  <input
                    type="text"
                    value={card.companyName}
                    onChange={(e) => setCard(p => ({ ...p, companyName: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-400 outline-none font-medium"
                    placeholder="Vertex Studio"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">Location / HQ</label>
                  <input
                    type="text"
                    value={card.address}
                    onChange={(e) => setCard(p => ({ ...p, address: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-400 outline-none font-medium"
                    placeholder="Austin, TX & Remote"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">Bio / Value Hook</label>
                <textarea
                  rows={2}
                  value={card.tagline}
                  onChange={(e) => setCard(p => ({ ...p, tagline: e.target.value }))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-emerald-400 outline-none resize-none font-medium"
                  placeholder="Short 1-2 sentence bio or value proposition..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">Status / Availability Notice</label>
                  <input
                    type="text"
                    value={card.availabilityNotice || ''}
                    onChange={(e) => setCard(p => ({ ...p, availabilityNotice: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-400 outline-none font-medium"
                    placeholder="🟢 Available for Q3 Select Projects"
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800 rounded-xl">
                  <div>
                    <span className="text-xs font-bold text-white block">Verified Creator Badge</span>
                    <span className="text-[10px] text-zinc-400">Display blue/green verified checkmark</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={!!card.verified}
                    onChange={(e) => setCard(p => ({ ...p, verified: e.target.checked }))}
                    className="w-5 h-5 accent-emerald-400 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: THEMES & BRANDING */}
          {activeStep === 'branding' && (
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 space-y-6">
              <div>
                <h3 className="text-base font-bold text-white mb-1">Visual Theme Preset</h3>
                <p className="text-xs text-zinc-400 mb-4">Select an aesthetic tailored to your industry and audience.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {CARD_THEMES.map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setCard(p => ({ ...p, themeStyle: t.id, primaryColor: t.primaryColor, accentColor: t.accentColor }))}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        card.themeStyle === t.id
                          ? 'border-emerald-400 bg-emerald-950/30 text-white shadow-lg shadow-emerald-500/10 scale-[1.02]'
                          : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white hover:border-zinc-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-white uppercase tracking-wider">{t.name}</span>
                          <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-zinc-800 font-mono text-zinc-300">{t.badge}</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 font-light leading-snug">{t.description}</p>
                      </div>
                      <div className="flex items-center gap-1.5 pt-3">
                        <span className="w-3 h-3 rounded-full" style={{ background: t.primaryColor }} />
                        <span className="w-3 h-3 rounded-full" style={{ background: t.accentColor }} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-zinc-800/80 pt-5">
                <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-3">Custom Hex Accent Colors</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 mb-1.5">Primary Brand Color</label>
                    <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-xl p-2">
                      <input
                        type="color"
                        value={card.primaryColor}
                        onChange={(e) => setCard(p => ({ ...p, primaryColor: e.target.value }))}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={card.primaryColor}
                        onChange={(e) => setCard(p => ({ ...p, primaryColor: e.target.value }))}
                        className="bg-transparent text-xs font-mono font-bold text-white w-24 outline-none uppercase"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 mb-1.5">Accent Glow Color</label>
                    <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-xl p-2">
                      <input
                        type="color"
                        value={card.accentColor}
                        onChange={(e) => setCard(p => ({ ...p, accentColor: e.target.value }))}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={card.accentColor}
                        onChange={(e) => setCard(p => ({ ...p, accentColor: e.target.value }))}
                        className="bg-transparent text-xs font-mono font-bold text-white w-24 outline-none uppercase"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONTACT & SOCIALS */}
          {activeStep === 'contact' && (
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 space-y-6">
              <div>
                <h3 className="text-base font-bold text-white mb-1">Direct Contact Channels</h3>
                <p className="text-xs text-zinc-400 mb-4">1-tap buttons displayed prominently at the top of your card.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      value={card.phone}
                      onChange={(e) => setCard(p => ({ ...p, phone: e.target.value }))}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-400 outline-none font-medium"
                      placeholder="+1 (555) 234-5678"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={card.email}
                      onChange={(e) => setCard(p => ({ ...p, email: e.target.value }))}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-400 outline-none font-medium"
                      placeholder="alex@vertexstudio.design"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">WhatsApp Number</label>
                    <input
                      type="tel"
                      value={card.whatsapp}
                      onChange={(e) => setCard(p => ({ ...p, whatsapp: e.target.value }))}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-400 outline-none font-medium"
                      placeholder="+15552345678"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">Website URL</label>
                    <input
                      type="url"
                      value={card.websiteUrl}
                      onChange={(e) => setCard(p => ({ ...p, websiteUrl: e.target.value }))}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-400 outline-none font-medium"
                      placeholder="https://vertexstudio.design"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-800/80 pt-5">
                <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-3">Social Media & Creator Profiles</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SOCIAL_PLATFORMS.map(platform => (
                    <div key={platform.id} className="space-y-1">
                      <label className="text-[11px] font-bold text-zinc-400 flex items-center gap-1.5">
                        <SocialIcon platform={platform.id} className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{platform.label}</span>
                      </label>
                      <input
                        type="text"
                        value={card.socials?.[platform.id] || ''}
                        onChange={(e) => {
                          const updated = { ...(card.socials || {}) };
                          updated[platform.id] = e.target.value;
                          setCard(p => ({ ...p, socials: updated }));
                        }}
                        placeholder={platform.placeholder}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-400 outline-none font-mono"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PORTFOLIO & SERVICES */}
          {activeStep === 'portfolio' && (
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">Featured Projects ({card.portfolio?.length || 0}/6)</h3>
                    <p className="text-xs text-zinc-400">Showcase case studies or portfolio pieces on your card.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddPortfolio}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950 border border-emerald-500/30 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Project
                  </button>
                </div>

                <div className="space-y-3">
                  {card.portfolio?.map((item, idx) => (
                    <div key={idx} className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-2 relative">
                      <button
                        type="button"
                        onClick={() => handleRemovePortfolio(idx)}
                        className="absolute top-3 right-3 text-zinc-500 hover:text-red-400 p-1 cursor-pointer"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...card.portfolio];
                          updated[idx].title = e.target.value;
                          setCard(p => ({ ...p, portfolio: updated }));
                        }}
                        placeholder="Project Title (e.g. Fintech App)"
                        className="bg-transparent border-b border-zinc-800 text-sm font-bold text-white w-5/6 pb-1 focus:border-emerald-400 outline-none"
                      />
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => {
                          const updated = [...card.portfolio];
                          updated[idx].description = e.target.value;
                          setCard(p => ({ ...p, portfolio: updated }));
                        }}
                        placeholder="Short outcome summary (e.g. Scaled from 0 to 500k users)"
                        className="bg-transparent text-xs text-zinc-400 w-full outline-none"
                      />
                      <input
                        type="url"
                        value={item.linkUrl}
                        onChange={(e) => {
                          const updated = [...card.portfolio];
                          updated[idx].linkUrl = e.target.value;
                          setCard(p => ({ ...p, portfolio: updated }));
                        }}
                        placeholder="Project Link URL (https://...)"
                        className="bg-transparent text-xs text-emerald-400 font-mono w-full outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-zinc-800/80 pt-5">
                <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">Offerings & Skill Badges</h4>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddService())}
                    placeholder="e.g. AI Strategy, UI Design, Brand Identity"
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white font-medium"
                  />
                  <button
                    type="button"
                    onClick={handleAddService}
                    className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-zinc-950 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {card.services?.map((s, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-medium">
                      {s}
                      <button type="button" onClick={() => handleRemoveService(idx)} className="text-zinc-500 hover:text-red-400 cursor-pointer">&times;</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Service Catalog & Pricing Packages */}
              <div className="border-t border-zinc-800/80 pt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Featured Packages & Pricing Catalog ({card.catalogItems?.length || 0})
                    </h4>
                    <p className="text-[11px] text-zinc-400">
                      Showcase package offerings with direct 1-tap WhatsApp inquiry buttons.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newItem = {
                        id: `cat_${Date.now().toString().slice(-4)}`,
                        name: 'New Package',
                        price: 'R2,500',
                        description: 'Deliverable details and scope summary.',
                        badge: 'Featured'
                      };
                      setCard(p => ({ ...p, catalogItems: [...(p.catalogItems || []), newItem] }));
                    }}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-zinc-950 border border-emerald-500/30 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Package
                  </button>
                </div>

                <div className="space-y-3">
                  {card.catalogItems?.map((item, idx) => (
                    <div key={idx} className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-2 relative">
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (card.catalogItems || []).filter((_, i) => i !== idx);
                          setCard(p => ({ ...p, catalogItems: updated }));
                        }}
                        className="absolute top-3 right-3 text-zinc-500 hover:text-red-400 p-1 cursor-pointer"
                        title="Delete package"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-5/6">
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => {
                              const updated = [...card.catalogItems];
                              updated[idx].name = e.target.value;
                              setCard(p => ({ ...p, catalogItems: updated }));
                            }}
                            placeholder="Package Name (e.g. 24-Hr Storefront)"
                            className="bg-transparent border-b border-zinc-800 text-xs font-bold text-white w-full pb-1 focus:border-emerald-400 outline-none"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={item.price}
                            onChange={(e) => {
                              const updated = [...card.catalogItems];
                              updated[idx].price = e.target.value;
                              setCard(p => ({ ...p, catalogItems: updated }));
                            }}
                            placeholder="Price (e.g. R4,999 or Free)"
                            className="bg-transparent border-b border-zinc-800 text-xs font-mono font-bold text-emerald-400 w-full pb-1 focus:border-emerald-400 outline-none"
                          />
                        </div>
                      </div>

                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => {
                          const updated = [...card.catalogItems];
                          updated[idx].description = e.target.value;
                          setCard(p => ({ ...p, catalogItems: updated }));
                        }}
                        placeholder="Package description / deliverables..."
                        className="bg-transparent text-xs text-zinc-400 w-full outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CTAS & CONVERSION */}
          {activeStep === 'cta' && (
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 space-y-6">
              <div>
                <h3 className="text-base font-bold text-white mb-1">Primary Call to Action</h3>
                <p className="text-xs text-zinc-400 mb-4">Highlighted full-width action button (e.g. Cal.com booking, purchase, or deck download).</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">Button Label</label>
                    <input
                      type="text"
                      value={card.primaryCta?.label || ''}
                      onChange={(e) => setCard(p => ({ ...p, primaryCta: { ...p.primaryCta, label: e.target.value } }))}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
                      placeholder="Book Discovery Call 🗓️"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">Destination URL</label>
                    <input
                      type="url"
                      value={card.primaryCta?.url || ''}
                      onChange={(e) => setCard(p => ({ ...p, primaryCta: { ...p.primaryCta, url: e.target.value } }))}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono"
                      placeholder="https://cal.com/username"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-800/80 pt-5">
                <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-3">Client Quote / Testimonial</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 mb-1">Quote Text</label>
                    <textarea
                      rows={2}
                      value={card.testimonial?.quote || ''}
                      onChange={(e) => setCard(p => ({ ...p, testimonial: { ...p.testimonial, quote: e.target.value } }))}
                      placeholder="Alex completely transformed our product conversion in 30 days..."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={card.testimonial?.author || ''}
                      onChange={(e) => setCard(p => ({ ...p, testimonial: { ...p.testimonial, author: e.target.value } }))}
                      placeholder="Client Name (e.g. David Chen)"
                      className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                    <input
                      type="text"
                      value={card.testimonial?.role || ''}
                      onChange={(e) => setCard(p => ({ ...p, testimonial: { ...p.testimonial, role: e.target.value } }))}
                      placeholder="Role (e.g. Founder @ OrbitHQ)"
                      className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-800/80 pt-5">
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">Business Hours / Availability</label>
                <input
                  type="text"
                  value={card.businessHours || ''}
                  onChange={(e) => setCard(p => ({ ...p, businessHours: e.target.value }))}
                  placeholder="Mon – Fri: 9:00 AM – 5:00 PM CST"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white"
                />
              </div>
            </div>
          )}

          {/* Quick Action Export Bar */}
          <div className="p-6 bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-zinc-900 border border-emerald-500/30 rounded-3xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Your Live Shareable Card Link
                </h4>
                <p className="text-xs text-zinc-400">Zero backend needed. Changes are encoded directly into your link.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 text-xs font-bold inline-flex items-center gap-1.5 transition cursor-pointer shadow"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedLink ? 'Copied Link!' : 'Copy Link'}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2">
              <input
                type="text"
                readOnly
                value={shareableUrl}
                className="bg-transparent text-xs font-mono text-emerald-400 truncate flex-1 outline-none"
              />
              {qrDataUrl && (
                <a
                  href={qrDataUrl}
                  download={`${card.slug || 'business-card'}-qr.png`}
                  className="text-xs text-zinc-400 hover:text-white px-2 py-1 bg-zinc-800 rounded-lg shrink-0"
                  title="Download High Res QR"
                >
                  Download QR
                </a>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Live Previewer (5 Cols) */}
        <div className={`lg:col-span-5 lg:sticky lg:top-24 space-y-4 ${mobileTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
          
          {/* Mode Switcher Tabs */}
          <div className="flex items-center justify-between bg-zinc-900/90 border border-zinc-800 p-1.5 rounded-2xl">
            <button
              onClick={() => setPreviewMode('phone')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                previewMode === 'phone'
                  ? 'bg-emerald-400 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Digital View</span>
            </button>

            <button
              onClick={() => setPreviewMode('physical')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                previewMode === 'physical'
                  ? 'bg-emerald-400 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>3D Flip Card</span>
            </button>

            <button
              onClick={() => setPreviewMode('stand')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                previewMode === 'stand'
                  ? 'bg-emerald-400 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Event Stand</span>
            </button>
          </div>

          {/* VIEW 1: IPHONE PHONE PREVIEW */}
          {previewMode === 'phone' && (
            <div className="flex justify-center">
              <div className="w-full max-w-[340px] bg-zinc-900 border-4 border-zinc-800 rounded-[44px] p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative">
                {/* Phone Speaker Notch */}
                <div className="w-24 h-4 bg-zinc-800 rounded-b-xl mx-auto mb-2 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-zinc-950" />
                  <div className="w-8 h-1 rounded-full bg-zinc-950" />
                </div>

                {/* Inner Screen */}
                <div
                  className={`rounded-[32px] overflow-hidden text-slate-800 max-h-[600px] overflow-y-auto ${
                    activeTheme.isDark ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900'
                  }`}
                >
                  {/* Header Banner */}
                  <div
                    className="h-24 w-full relative"
                    style={{
                      background: activeTheme.bannerGradient || `linear-gradient(135deg, ${card.primaryColor || '#10b981'}, ${card.accentColor || '#34d399'})`
                    }}
                  >
                    {card.availabilityNotice && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[8.5px] font-bold text-emerald-300 border border-white/10">
                        {card.availabilityNotice}
                      </div>
                    )}
                  </div>

                  {/* Profile Info */}
                  <div className="px-5 pb-6 -mt-10 relative space-y-4 text-center">
                    
                    {/* Avatar */}
                    <div className="w-20 h-20 rounded-full mx-auto p-1 bg-zinc-950/80 shadow-lg flex items-center justify-center overflow-hidden border border-white/20">
                      {card.avatarUrl ? (
                        <img src={card.avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                      ) : (
                        <div
                          className="w-full h-full rounded-full flex items-center justify-center text-white text-2xl font-black"
                          style={{ background: card.primaryColor || '#10b981' }}
                        >
                          {(card.fullName || card.companyName || 'C').charAt(0)}
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="inline-flex items-center justify-center gap-1">
                        <h3 className="font-extrabold text-base leading-tight">{card.fullName || card.companyName}</h3>
                        {card.verified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      {card.jobTitle && <p className="text-xs font-semibold opacity-75">{card.jobTitle}</p>}
                      {card.companyName && card.fullName && <p className="text-[11px] text-zinc-500">{card.companyName}</p>}
                      {card.tagline && <p className="text-[11.5px] opacity-85 mt-2 leading-relaxed">{card.tagline}</p>}
                    </div>

                    {/* Direct Action Grid */}
                    <div className="grid grid-cols-4 gap-2 pt-1">
                      {card.phone && (
                        <a href={`tel:${card.phone}`} className="p-2 rounded-xl bg-zinc-800/40 text-center hover:opacity-80 transition">
                          <Phone className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
                          <span className="text-[10px] font-bold block">Call</span>
                        </a>
                      )}
                      {card.email && (
                        <a href={`mailto:${card.email}`} className="p-2 rounded-xl bg-zinc-800/40 text-center hover:opacity-80 transition">
                          <Mail className="w-4 h-4 mx-auto mb-1 text-blue-400" />
                          <span className="text-[10px] font-bold block">Email</span>
                        </a>
                      )}
                      {card.whatsapp && (
                        <a href={`https://wa.me/${card.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-zinc-800/40 text-center hover:opacity-80 transition">
                          <MessageCircle className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
                          <span className="text-[10px] font-bold block">WhatsApp</span>
                        </a>
                      )}
                      {card.websiteUrl && (
                        <a href={card.websiteUrl} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-zinc-800/40 text-center hover:opacity-80 transition">
                          <Globe className="w-4 h-4 mx-auto mb-1 text-purple-400" />
                          <span className="text-[10px] font-bold block">Web</span>
                        </a>
                      )}
                    </div>

                    {/* Primary CTA */}
                    {card.primaryCta?.label && (
                      <a
                        href={card.primaryCta.url || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="block w-full py-2.5 px-4 rounded-xl text-zinc-950 font-black text-xs shadow-md transition-transform active:scale-95"
                        style={{ background: card.primaryColor || '#10b981' }}
                      >
                        {card.primaryCta.label}
                      </a>
                    )}

                    {/* Save Contact & Exchange Contact */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => downloadVCard(card)}
                        className="py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer shadow"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Save Contact
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsExchangeModalOpen(true)}
                        className="py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer shadow"
                      >
                        Exchange Info
                      </button>
                    </div>

                    {/* Portfolio Items in preview */}
                    {card.portfolio?.length > 0 && (
                      <div className="pt-2 border-t border-white/10 text-left space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Featured Work</span>
                        {card.portfolio.map((p, i) => (
                          <div key={i} className="p-2.5 rounded-xl bg-zinc-800/40 text-xs">
                            <div className="font-bold text-current">{p.title}</div>
                            {p.description && <div className="text-[10.5px] opacity-75">{p.description}</div>}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Services list */}
                    {card.services?.length > 0 && (
                      <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1 justify-center">
                        {card.services.map((s, i) => (
                          <span key={i} className="text-[9.5px] px-2 py-0.5 rounded-full bg-zinc-800/60 font-medium">
                            ✓ {s}
                          </span>
                        ))}
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: 3D PHYSICAL CARD PREVIEW */}
          {previewMode === 'physical' && (
            <PhysicalCardPreview card={card} qrDataUrl={qrDataUrl} />
          )}

          {/* VIEW 3: DESK QR STAND PREVIEW */}
          {previewMode === 'stand' && (
            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl text-center space-y-4 shadow-xl">
              <div className="w-12 h-1.5 bg-zinc-800 rounded-full mx-auto" />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase">
                <QrCode className="w-3.5 h-3.5" />
                Conference Desk Stand Mockup
              </div>
              
              <div className="p-6 bg-white text-zinc-950 rounded-2xl max-w-xs mx-auto shadow-2xl border-4 border-zinc-200 space-y-3">
                <div className="font-black text-base">{card.fullName || card.companyName}</div>
                <p className="text-xs text-zinc-600 font-semibold">{card.jobTitle}</p>
                
                <div className="p-2 bg-white rounded-xl border border-zinc-300 inline-block shadow-inner">
                  {qrDataUrl && <img src={qrDataUrl} alt="Stand QR" className="w-36 h-36 object-contain" />}
                </div>

                <p className="text-[11px] text-zinc-500 font-medium">
                  Scan with any phone camera to view portfolio & connect.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Printable Card Modal Dialog with 300 DPI Styles */}
      {isPrintModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                  <Printer className="w-5 h-5 text-emerald-400" />
                  Printable Business Card Sheet (3.5" × 2")
                </h3>
                <p className="text-xs text-zinc-400">Standard ISO/US dimensions with front/back layouts and scannable QR.</p>
              </div>
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="text-zinc-400 hover:text-white text-xl cursor-pointer p-1"
              >
                &times;
              </button>
            </div>

            <div id="printable-card-area" className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
              {/* Front Preview */}
              <div className="p-4 bg-white text-zinc-900 rounded-xl h-40 flex flex-col justify-between border-l-4 shadow-sm" style={{ borderColor: card.primaryColor || '#10b981' }}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-black text-sm">{card.fullName || card.companyName}</h4>
                    <p className="text-[10px] font-semibold text-emerald-600">{card.jobTitle}</p>
                    <p className="text-[9px] text-zinc-500">{card.companyName}</p>
                  </div>
                  {card.avatarUrl ? (
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-zinc-200 shrink-0">
                      <img src={card.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-black shrink-0"
                      style={{ background: card.primaryColor || '#10b981' }}
                    >
                      {(card.fullName || card.companyName || 'C').charAt(0)}
                    </div>
                  )}
                </div>
                <div className="text-[9px] text-zinc-600 space-y-0.5">
                  {card.phone && <div>📞 {card.phone}</div>}
                  {card.email && <div>✉️ {card.email}</div>}
                  {card.websiteUrl && <div>🌐 {card.websiteUrl.replace(/^https?:\/\//, '')}</div>}
                </div>
              </div>

              {/* Back Preview */}
              <div className="p-4 rounded-xl h-40 flex items-center justify-between text-white shadow-sm" style={{ background: card.primaryColor || '#09090b' }}>
                <div className="max-w-[130px] space-y-1">
                  <h4 className="text-xs font-bold">Scan to Connect</h4>
                  <p className="text-[9px] opacity-80 leading-tight">View digital portfolio and save contact details.</p>
                  <div className="text-[8.5px] font-mono text-emerald-300">LaunchGremlin</div>
                </div>
                {qrDataUrl && (
                  <div className="bg-white p-1 rounded-lg">
                    <img src={qrDataUrl} alt="QR Code" className="w-20 h-20 object-contain" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-zinc-400">💡 Uses standard browser print dialog</span>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsPrintModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 text-xs font-bold cursor-pointer shadow"
                >
                  Print Layout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NFC Programming Guide Modal */}
      <NfcGuideModal
        isOpen={isNfcModalOpen}
        onClose={() => setIsNfcModalOpen(false)}
        cardUrl={shareableUrl}
      />

      {/* Lead Exchange Dialog */}
      <LeadExchangeModal
        isOpen={isExchangeModalOpen}
        onClose={() => setIsExchangeModalOpen(false)}
        cardOwnerName={card.fullName || card.companyName}
        cardOwnerEmail={card.email}
      />

      {/* Captured Contacts Drawer */}
      <CapturedLeadsDrawer
        isOpen={isLeadsDrawerOpen}
        onClose={() => setIsLeadsDrawerOpen(false)}
      />

      {/* Lockscreen Wallpaper Modal */}
      <LockscreenWallpaperModal
        isOpen={isWallpaperModalOpen}
        onClose={() => setIsWallpaperModalOpen(false)}
        card={card}
        shareUrl={shareableUrl}
      />

      {/* Apple & Google Wallet Pass Modal */}
      <WalletPassModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        card={card}
      />

      {/* Team & Multi-Employee Directory Modal */}
      <TeamCardManagerModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        onSelectMemberCard={(newCard) => setCard(p => ({ ...p, ...newCard }))}
      />

      {/* Press-Ready CR80 Print Modal */}
      <PressReadyPrintModal
        isOpen={isPressPrintModalOpen}
        onClose={() => setIsPressPrintModalOpen(false)}
        card={card}
      />

      {/* Branded QR Code Studio Modal */}
      <QrCodeStudioModal
        isOpen={isQrStudioModalOpen}
        onClose={() => setIsQrStudioModalOpen(false)}
        card={card}
      />

      {/* Bottom Conversion Section */}
      <section className="py-16 border-t border-zinc-800/80 bg-zinc-950/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Need a bespoke digital platform or web app for your brand?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto font-light">
            LaunchGremlin builds custom high-conversion websites, creator platforms, and AI automation systems for ambitious founders.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider hover:bg-emerald-300 transition-all cursor-pointer shadow-[0_0_25px_rgba(52,211,153,0.3)]"
            >
              <span>Book Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Sticky Mobile Mode Switcher Bar (Bottom Center on Mobile Viewports) */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 lg:hidden flex items-center bg-zinc-900/95 backdrop-blur-md border border-zinc-700/80 rounded-full p-1.5 shadow-2xl shadow-black/90">
        <button
          type="button"
          onClick={() => {
            setMobileTab('editor');
            window.scrollTo({ top: 400, behavior: 'smooth' });
          }}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
            mobileTab === 'editor'
              ? 'bg-emerald-400 text-zinc-950 shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Edit Form</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setMobileTab('preview');
            window.scrollTo({ top: 400, behavior: 'smooth' });
          }}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
            mobileTab === 'preview'
              ? 'bg-emerald-400 text-zinc-950 shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Live Card Preview</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5"></span>
        </button>
      </div>

    </div>
  );
}
