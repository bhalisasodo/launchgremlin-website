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
  ArrowRight
} from 'lucide-react';
import QRCode from 'qrcode';

const DEMO_PROFILES = [
  {
    fullName: 'Alex Morgan',
    jobTitle: 'Lead Product Designer',
    companyName: 'Vertex Studio',
    tagline: 'Designing intuitive digital products, brand identities, and high-conversion web experiences for modern tech companies.',
    phone: '+1 (555) 234-5678',
    email: 'alex@vertexstudio.design',
    whatsapp: '+15552345678',
    address: 'Austin, TX & Remote',
    websiteUrl: 'https://vertexstudio.design',
    primaryColor: '#2563eb',
    accentColor: '#38bdf8',
    themeStyle: 'minimal',
    fontStyle: 'modern-sans',
    primaryCta: {
      label: 'Book Discovery Call 🗓️',
      url: 'https://cal.com/alex-vertex'
    },
    socials: {
      linkedin: 'linkedin.com/in/alexmorgan',
      instagram: 'instagram.com/alex.design',
      x: 'x.com/alexmorgan',
      github: 'github.com/alexmorgan'
    },
    portfolio: [
      {
        title: 'Fintech Mobile App',
        description: 'Design of mobile experience for 500k active users.',
        imageUrl: '',
        linkUrl: 'https://vertexstudio.design/fintech'
      }
    ],
    services: ['Product Strategy', 'UI/UX Design', 'Design Systems', 'Webflow Dev'],
    testimonial: {
      quote: 'Alex completely transformed our SaaS flow. Conversion increased 42% in 30 days.',
      author: 'David Chen, Founder @ OrbitHQ'
    },
    businessHours: 'Mon – Fri: 9:00 AM – 5:00 PM CST',
    slug: 'alex-morgan'
  },
  {
    fullName: 'Elena Rostova',
    jobTitle: 'Executive Brand Strategist',
    companyName: 'Luxe Advisory Group',
    tagline: 'Advising luxury hospitality and premier lifestyle brands on market positioning and high-touch customer resonance.',
    phone: '+1 (555) 987-6543',
    email: 'elena@luxeconsulting.com',
    whatsapp: '+15559876543',
    address: 'New York, NY • London • Paris',
    websiteUrl: 'https://luxeconsulting.com',
    primaryColor: '#0f172a',
    accentColor: '#d97706',
    themeStyle: 'deluxe',
    fontStyle: 'elegant-serif',
    primaryCta: {
      label: 'Request Strategy Deck ✦',
      url: 'https://luxeconsulting.com/deck'
    },
    socials: {
      linkedin: 'linkedin.com/in/elena-rostova',
      instagram: 'instagram.com/elena.luxury',
      x: 'x.com/elenarostova'
    },
    portfolio: [
      {
        title: 'Palais Vendôme Rebrand',
        description: 'Comprehensive luxury identity for 5-star hotel.',
        imageUrl: '',
        linkUrl: 'https://luxeconsulting.com/palais'
      }
    ],
    services: ['Brand Architecture', 'Luxury Advisory', 'Keynote Speaking'],
    testimonial: {
      quote: 'Elena is the most insightful brand mind we have collaborated with.',
      author: 'Claire Beaumont, Vogue'
    },
    businessHours: 'By Appointment Only',
    slug: 'elena-rostova'
  },
  {
    fullName: 'Marco Rossi',
    jobTitle: 'Founder & Master Roaster',
    companyName: 'Caffè Luminosa',
    tagline: 'Specialty micro-lot coffee beans roasted fresh daily in Brooklyn. Catering, wholesale, and private espresso tastings.',
    phone: '+1 (555) 432-8765',
    email: 'hello@caffeluminosa.com',
    whatsapp: '+15554328765',
    address: '142 Bedford Ave, Brooklyn, NY',
    websiteUrl: 'https://caffeluminosa.com',
    primaryColor: '#0f766e',
    accentColor: '#2dd4bf',
    themeStyle: 'bold',
    fontStyle: 'bold-tech',
    primaryCta: {
      label: 'Order Beans Online ☕',
      url: 'https://caffeluminosa.com/shop'
    },
    socials: {
      instagram: 'instagram.com/caffeluminosa',
      tiktok: 'tiktok.com/@caffeluminosa',
      facebook: 'facebook.com/caffeluminosa'
    },
    portfolio: [
      {
        title: 'Micro-Lot Single Origins',
        description: 'Award-winning Ethiopian & Colombian Geisha lots.',
        imageUrl: '',
        linkUrl: 'https://caffeluminosa.com/menu'
      }
    ],
    services: ['Espresso Catering', 'Subscriptions', 'Barista Workshops'],
    testimonial: {
      quote: 'Best espresso in NYC. The single origin is legendary.',
      author: 'Eater NY'
    },
    businessHours: 'Open Daily: 7:00 AM – 6:00 PM',
    slug: 'caffe-luminosa'
  }
];

export default function BusinessCardsPage({ onOpenBooking, onSelectTab }) {
  const [card, setCard] = useState(DEMO_PROFILES[0]);
  const [activeStep, setActiveStep] = useState('identity');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [newService, setNewService] = useState('');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [demoIdx, setDemoIdx] = useState(0);
  const avatarInputRef = useRef(null);

  // Generate QR code data URL whenever card slug or colors change
  useEffect(() => {
    const generateQr = async () => {
      try {
        const shareUrl = `https://card.launchgremlin.com/c/${card.slug || 'alex-morgan'}`;
        const url = await QRCode.toDataURL(shareUrl, {
          width: 600,
          margin: 2,
          color: {
            dark: card.primaryColor || '#0f172a',
            light: '#ffffff'
          }
        });
        setQrDataUrl(url);
      } catch (err) {
        console.error('Error generating QR code:', err);
      }
    };
    generateQr();
  }, [card.slug, card.primaryColor]);

  // Load next demo profile
  const handleCycleDemo = () => {
    const nextIdx = (demoIdx + 1) % DEMO_PROFILES.length;
    setDemoIdx(nextIdx);
    setCard(JSON.parse(JSON.stringify(DEMO_PROFILES[nextIdx])));
  };

  // Avatar upload with canvas optimization
  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 400;
        let w = img.width;
        let h = img.height;
        if (w > h && w > maxDim) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else if (h > maxDim) {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setCard(prev => ({ ...prev, avatarUrl: dataUrl }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Add Service Tag
  const handleAddService = () => {
    if (!newService.trim()) return;
    if (!card.services.includes(newService.trim())) {
      setCard(prev => ({ ...prev, services: [...prev.services, newService.trim()] }));
    }
    setNewService('');
  };

  const handleRemoveService = (index) => {
    setCard(prev => ({
      ...prev,
      services: prev.services.filter((_, idx) => idx !== index)
    }));
  };

  // Add Portfolio Item
  const handleAddPortfolio = () => {
    if (card.portfolio.length >= 6) return;
    setCard(prev => ({
      ...prev,
      portfolio: [...prev.portfolio, { title: 'New Featured Project', description: '', imageUrl: '', linkUrl: '' }]
    }));
  };

  const handleRemovePortfolio = (index) => {
    setCard(prev => ({
      ...prev,
      portfolio: prev.portfolio.filter((_, idx) => idx !== index)
    }));
  };

  // Download vCard (.vcf)
  const handleDownloadVCard = () => {
    const cardUrl = `https://card.launchgremlin.com/c/${card.slug || 'card'}`;
    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${card.fullName || card.companyName}`,
      card.fullName ? `N:${card.fullName};;;;` : `N:${card.companyName};;;;`,
      card.companyName ? `ORG:${card.companyName}` : '',
      card.jobTitle ? `TITLE:${card.jobTitle}` : '',
      card.phone ? `TEL;TYPE=CELL,VOICE:${card.phone}` : '',
      card.email ? `EMAIL;TYPE=INTERNET,WORK:${card.email}` : '',
      card.websiteUrl ? `URL;TYPE=WORK:${card.websiteUrl}` : '',
      `URL;TYPE=DIGITAL_CARD:${cardUrl}`,
      card.address ? `ADR;TYPE=WORK:;;${card.address};;;;` : '',
      card.tagline ? `NOTE:${card.tagline.replace(/\n/g, '\\n')}` : '',
      'END:VCARD'
    ];
    const blob = new Blob([lines.filter(Boolean).join('\r\n')], { type: 'text/vcard;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${card.slug || 'business-card'}.vcf`;
    link.click();
  };

  // Copy shareable link
  const handleCopyLink = () => {
    const link = `https://card.launchgremlin.com/c/${card.slug || 'alex-morgan'}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="w-full bg-zinc-950 text-white min-h-screen">
      
      {/* Hero Header Section */}
      <section className="relative pt-12 pb-8 border-b border-zinc-800/60 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-zinc-950/80 to-zinc-950 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            100% Free Self-Serve Generator
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 max-w-3xl mx-auto">
            Digital Business Card <span className="text-emerald-400">Generator</span>
          </h1>

          <p className="text-zinc-400 text-sm sm:text-lg max-w-2xl mx-auto mb-6">
            Create a custom landing page, scannable QR code, and 1-tap contact saving for your brand or freelancing business. No login required.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleCycleDemo}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Load Sample Profile</span>
            </button>
            <button
              onClick={handleDownloadVCard}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export vCard (.vcf)</span>
            </button>
            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-400" />
              <span>Print Physical Cards</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Studio Interface */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Configurator Panels (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-800 scrollbar-none">
            {[
              { id: 'identity', label: '1. Identity', icon: Briefcase },
              { id: 'branding', label: '2. Themes & Color', icon: Palette },
              { id: 'contact', label: '3. Contact & Links', icon: Phone },
              { id: 'portfolio', label: '4. Portfolio', icon: Layers },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeStep === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveStep(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
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

          {/* TAB 1: IDENTITY */}
          {activeStep === 'identity' && (
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden shrink-0">
                  {card.avatarUrl ? (
                    <img src={card.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl font-bold text-zinc-400">
                      {(card.fullName || 'C').charAt(0)}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">Photo / Logo</label>
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
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 cursor-pointer"
                    >
                      Upload Image
                    </button>
                    {card.avatarUrl && (
                      <button
                        type="button"
                        onClick={() => setCard(p => ({ ...p, avatarUrl: '' }))}
                        className="text-red-400 hover:text-red-300 text-xs font-semibold cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={card.fullName}
                    onChange={(e) => setCard(p => ({ ...p, fullName: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-400 outline-none"
                    placeholder="Alex Morgan"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">Job Title / Role</label>
                  <input
                    type="text"
                    value={card.jobTitle}
                    onChange={(e) => setCard(p => ({ ...p, jobTitle: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-400 outline-none"
                    placeholder="Product Designer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">Company Name</label>
                  <input
                    type="text"
                    value={card.companyName}
                    onChange={(e) => setCard(p => ({ ...p, companyName: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-400 outline-none"
                    placeholder="Studio Vertex"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">Location</label>
                  <input
                    type="text"
                    value={card.address}
                    onChange={(e) => setCard(p => ({ ...p, address: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-400 outline-none"
                    placeholder="Austin, TX & Remote"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">Bio / Tagline</label>
                <textarea
                  rows={2}
                  value={card.tagline}
                  onChange={(e) => setCard(p => ({ ...p, tagline: e.target.value }))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-emerald-400 outline-none resize-none"
                  placeholder="Short 1-2 sentence bio or value proposition..."
                />
              </div>
            </div>
          )}

          {/* TAB 2: BRANDING & THEMES */}
          {activeStep === 'branding' && (
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-6">
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-3">Theme Style</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'minimal', name: 'Minimal Clean' },
                    { id: 'bold', name: 'Bold Studio' },
                    { id: 'deluxe', name: 'Executive Luxe' },
                    { id: 'glass', name: 'Neo Glass' }
                  ].map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setCard(p => ({ ...p, themeStyle: t.id }))}
                      className={`p-3 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                        card.themeStyle === t.id
                          ? 'border-emerald-400 bg-emerald-950/40 text-white'
                          : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">Primary Color</label>
                  <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-xl p-2">
                    <input
                      type="color"
                      value={card.primaryColor}
                      onChange={(e) => setCard(p => ({ ...p, primaryColor: e.target.value }))}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <span className="text-xs font-mono font-semibold text-zinc-300">{card.primaryColor}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">Accent Color</label>
                  <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-xl p-2">
                    <input
                      type="color"
                      value={card.accentColor}
                      onChange={(e) => setCard(p => ({ ...p, accentColor: e.target.value }))}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <span className="text-xs font-mono font-semibold text-zinc-300">{card.accentColor}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">Preset Color Schemes</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Emerald Teal', p: '#0f766e', a: '#2dd4bf' },
                    { name: 'Royal Cobalt', p: '#2563eb', a: '#38bdf8' },
                    { name: 'Obsidian Gold', p: '#0f172a', a: '#f59e0b' },
                    { name: 'Violet Berry', p: '#7c3aed', a: '#f43f5e' }
                  ].map(pal => (
                    <button
                      key={pal.name}
                      type="button"
                      onClick={() => setCard(p => ({ ...p, primaryColor: pal.p, accentColor: pal.a }))}
                      className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 flex items-center gap-2 cursor-pointer"
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: pal.p }} />
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: pal.a }} />
                      {pal.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONTACT & LINKS */}
          {activeStep === 'contact' && (
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={card.phone}
                    onChange={(e) => setCard(p => ({ ...p, phone: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-400 outline-none"
                    placeholder="+1 (555) 234-5678"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={card.email}
                    onChange={(e) => setCard(p => ({ ...p, email: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-400 outline-none"
                    placeholder="alex@vertexstudio.design"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">WhatsApp Number</label>
                  <input
                    type="tel"
                    value={card.whatsapp}
                    onChange={(e) => setCard(p => ({ ...p, whatsapp: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-400 outline-none"
                    placeholder="+15552345678"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">Website URL</label>
                  <input
                    type="url"
                    value={card.websiteUrl}
                    onChange={(e) => setCard(p => ({ ...p, websiteUrl: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-400 outline-none"
                    placeholder="https://vertexstudio.design"
                  />
                </div>
              </div>

              {/* Primary Call to Action Button */}
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-3">
                <label className="block text-xs font-bold text-emerald-400 uppercase tracking-wider">Highlight Action Button</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={card.primaryCta?.label || ''}
                    onChange={(e) => setCard(p => ({ ...p, primaryCta: { ...p.primaryCta, label: e.target.value } }))}
                    className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white"
                    placeholder="Button Label (e.g. Book Call)"
                  />
                  <input
                    type="url"
                    value={card.primaryCta?.url || ''}
                    onChange={(e) => setCard(p => ({ ...p, primaryCta: { ...p.primaryCta, url: e.target.value } }))}
                    className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white"
                    placeholder="Destination Link"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PORTFOLIO & SERVICES */}
          {activeStep === 'portfolio' && (
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Featured Projects ({card.portfolio?.length || 0}/6)</label>
                  <button
                    type="button"
                    onClick={handleAddPortfolio}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Project
                  </button>
                </div>

                <div className="space-y-3">
                  {card.portfolio?.map((item, idx) => (
                    <div key={idx} className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2 relative">
                      <button
                        type="button"
                        onClick={() => handleRemovePortfolio(idx)}
                        className="absolute top-3 right-3 text-red-400 hover:text-red-300 p-1"
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
                        placeholder="Project Title"
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
                        placeholder="Short description"
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
                        placeholder="Project URL (https://...)"
                        className="bg-transparent text-xs text-emerald-400 w-full outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">Offerings & Services Tags</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddService())}
                    placeholder="e.g. Brand Strategy, React Development"
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddService}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {card.services?.map((s, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800 text-zinc-200 text-xs">
                      {s}
                      <button type="button" onClick={() => handleRemoveService(idx)} className="text-zinc-400 hover:text-red-400 cursor-pointer">&times;</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick Action Export Bar */}
          <div className="p-5 bg-emerald-950/30 border border-emerald-500/30 rounded-2xl flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white">Share Your Digital Business Card</h4>
              <p className="text-xs text-zinc-400">Scan QR code or copy custom link to connect instantly.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedLink ? 'Copied Link!' : 'Copy Link'}
              </button>
              {qrDataUrl && (
                <a
                  href={qrDataUrl}
                  download={`${card.slug || 'business-card'}-qr.png`}
                  className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download QR</span>
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Phone Preview (5 Cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col items-center">
          
          <div className="w-full max-w-[340px] bg-zinc-900 border-4 border-zinc-800 rounded-[40px] p-2.5 shadow-2xl relative">
            {/* Phone Speaker Notch */}
            <div className="w-24 h-4 bg-zinc-800 rounded-b-xl mx-auto mb-2 flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-zinc-950" />
              <div className="w-8 h-1 rounded-full bg-zinc-950" />
            </div>

            {/* Phone Inner Screen */}
            <div
              className={`rounded-[30px] overflow-hidden text-slate-800 max-h-[580px] overflow-y-auto ${
                card.themeStyle === 'bold' ? 'bg-zinc-950 text-white' :
                card.themeStyle === 'deluxe' ? 'bg-[#faf8f5] text-stone-900' :
                card.themeStyle === 'glass' ? 'bg-zinc-900/90 text-white backdrop-blur-xl' :
                'bg-white text-slate-900'
              }`}
            >
              {/* Header Banner */}
              <div
                className="h-24 w-full relative"
                style={{
                  background: `linear-gradient(135deg, ${card.primaryColor || '#2563eb'}, ${card.accentColor || '#38bdf8'})`
                }}
              />

              {/* Card Profile Section */}
              <div className="px-5 pb-6 -mt-10 relative space-y-4 text-center">
                
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full mx-auto p-1 bg-white shadow-lg flex items-center justify-center overflow-hidden">
                  {card.avatarUrl ? (
                    <img src={card.avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <div
                      className="w-full h-full rounded-full flex items-center justify-center text-white text-2xl font-bold"
                      style={{ background: card.primaryColor || '#2563eb' }}
                    >
                      {(card.fullName || 'C').charAt(0)}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-extrabold text-lg leading-tight">{card.fullName || card.companyName}</h3>
                  {card.jobTitle && <p className="text-xs font-semibold opacity-75">{card.jobTitle}</p>}
                  {card.companyName && card.fullName && <p className="text-xs text-zinc-500">{card.companyName}</p>}
                  {card.tagline && <p className="text-[11.5px] opacity-85 mt-2 leading-relaxed">{card.tagline}</p>}
                </div>

                {/* Direct Action Grid */}
                <div className="grid grid-cols-4 gap-2 pt-1">
                  {card.phone && (
                    <a href={`tel:${card.phone}`} className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-center hover:opacity-80 transition">
                      <Phone className="w-4 h-4 mx-auto mb-1 text-emerald-500" />
                      <span className="text-[10px] font-bold block">Call</span>
                    </a>
                  )}
                  {card.email && (
                    <a href={`mailto:${card.email}`} className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-center hover:opacity-80 transition">
                      <Mail className="w-4 h-4 mx-auto mb-1 text-blue-500" />
                      <span className="text-[10px] font-bold block">Email</span>
                    </a>
                  )}
                  {card.whatsapp && (
                    <a href={`https://wa.me/${card.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-center hover:opacity-80 transition">
                      <MessageCircle className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
                      <span className="text-[10px] font-bold block">WhatsApp</span>
                    </a>
                  )}
                  {card.websiteUrl && (
                    <a href={card.websiteUrl} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-center hover:opacity-80 transition">
                      <Globe className="w-4 h-4 mx-auto mb-1 text-purple-500" />
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
                    className="block w-full py-2.5 px-4 rounded-xl text-white font-bold text-xs shadow-md transition-transform active:scale-95"
                    style={{ background: card.primaryColor || '#2563eb' }}
                  >
                    {card.primaryCta.label}
                  </a>
                )}

                {/* Save Contact Button */}
                <button
                  type="button"
                  onClick={handleDownloadVCard}
                  className="w-full py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  Save to Contacts
                </button>

                {/* Portfolio items in preview */}
                {card.portfolio?.length > 0 && (
                  <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 text-left space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Featured Work</span>
                    {card.portfolio.map((p, i) => (
                      <div key={i} className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs">
                        <div className="font-bold">{p.title}</div>
                        {p.description && <div className="text-[10px] opacity-75">{p.description}</div>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Services list */}
                {card.services?.length > 0 && (
                  <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-1 justify-center">
                    {card.services.map((s, i) => (
                      <span key={i} className="text-[9.5px] px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 font-medium">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Printable Card Modal Dialog */}
      {isPrintModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full p-6 space-y-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">🖨️ Printable Physical Business Card (3.5" × 2")</h3>
                <p className="text-xs text-zinc-400">Standard US dimensions with crop lines and scannable QR code.</p>
              </div>
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="text-zinc-400 hover:text-white text-xl cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-zinc-950 rounded-xl border border-zinc-800">
              {/* Front Preview */}
              <div className="p-4 bg-white text-zinc-900 rounded-lg h-36 flex flex-col justify-between border-l-4" style={{ borderColor: card.primaryColor }}>
                <div>
                  <h4 className="font-extrabold text-sm">{card.fullName || card.companyName}</h4>
                  <p className="text-[10px] font-semibold text-emerald-600">{card.jobTitle}</p>
                  <p className="text-[9px] text-zinc-500">{card.companyName}</p>
                </div>
                <div className="text-[9px] text-zinc-600 space-y-0.5">
                  {card.phone && <div>📞 {card.phone}</div>}
                  {card.email && <div>✉️ {card.email}</div>}
                  {card.websiteUrl && <div>🌐 {card.websiteUrl}</div>}
                </div>
              </div>

              {/* Back Preview */}
              <div className="p-4 rounded-lg h-36 flex items-center justify-between text-white" style={{ background: card.primaryColor || '#0f172a' }}>
                <div className="max-w-[130px]">
                  <h4 className="text-xs font-bold mb-1">Scan to Connect</h4>
                  <p className="text-[9px] opacity-80 leading-tight">View digital portfolio and save contact details.</p>
                </div>
                {qrDataUrl && (
                  <div className="bg-white p-1 rounded">
                    <img src={qrDataUrl} alt="QR Code" className="w-16 h-16 object-contain" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 text-xs font-bold cursor-pointer"
              >
                Print Sheet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Conversion Section */}
      <section className="py-16 border-t border-zinc-800 bg-zinc-950/80">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Need a custom digital card or web platform for your team?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            LaunchGremlin builds bespoke web applications, AI automation tools, and high-conversion landing pages for founders and enterprises.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-400 text-zinc-950 font-bold text-sm uppercase tracking-wider hover:bg-emerald-300 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <span>Book Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
