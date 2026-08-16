import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MessageCircle,
  Globe,
  Download,
  UserCheck,
  ExternalLink,
  ShieldCheck,
  Clock,
  Quote,
  Share2,
  Check,
  Copy,
  Sparkles,
  ArrowRight,
  QrCode,
  Smartphone,
  X
} from 'lucide-react';
import QRCode from 'qrcode';
import { CARD_THEMES, downloadVCard } from '../../utils/cardData';
import { SocialIcon } from './SocialIcons';
import LeadExchangeModal from './LeadExchangeModal';
import LockscreenWallpaperModal from './LockscreenWallpaperModal';
import { trackEvent } from '../../utils/analytics';

export default function DigitalCardViewer({ card, onSelectTab }) {
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const [isWallpaperModalOpen, setIsWallpaperModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');

  const theme = CARD_THEMES.find(t => t.id === card?.themeStyle) || CARD_THEMES[0];

  useEffect(() => {
    if (!card) return;
    const generateQr = async () => {
      try {
        const targetUrl = typeof window !== 'undefined' ? window.location.href : `https://launchgremlin.com/c/${card.slug || 'card'}`;
        const url = await QRCode.toDataURL(targetUrl, {
          width: 600,
          margin: 2,
          color: {
            dark: card.primaryColor || '#10b981',
            light: '#ffffff'
          }
        });
        setQrDataUrl(url);
      } catch (e) {
        console.error('Error generating card QR:', e);
      }
    };
    generateQr();
  }, [card]);

  const handleShare = () => {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: `${card.fullName || card.companyName} | Digital Business Card`,
        text: `Connect with ${card.fullName || card.companyName}: ${card.tagline || ''}`,
        url
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      trackEvent('card_share_copied', { slug: card.slug });
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleDownloadVCard = () => {
    downloadVCard(card);
    trackEvent('vcard_downloaded', { slug: card.slug });
  };

  if (!card) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-md">
          <h2 className="text-2xl font-black">Digital Card Not Found</h2>
          <p className="text-zinc-400 text-sm">
            This card link may be invalid or expired. You can generate your own custom digital business card in 60 seconds.
          </p>
          <button
            onClick={() => onSelectTab && onSelectTab('business-cards')}
            className="px-6 py-3 rounded-xl bg-emerald-400 text-zinc-950 font-bold text-xs uppercase tracking-wider"
          >
            Create Your Digital Card
          </button>
        </div>
      </div>
    );
  }

  const cleanPhone = card.phone ? card.phone.replace(/[^0-9+]/g, '') : '';
  const cleanWhatsapp = card.whatsapp ? card.whatsapp.replace(/[^0-9]/g, '') : '';

  return (
    <div className={`min-h-screen ${theme.bgClass} flex flex-col items-center justify-between py-6 px-4 sm:px-6 relative`}>
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-30 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Main Card Container (Mobile optimized standard max-w-md) */}
      <div className="w-full max-w-md relative z-10 space-y-4 my-auto">
        
        {/* Top Floating Action Bar */}
        <div className="flex items-center justify-between px-2">
          <button
            onClick={() => onSelectTab && onSelectTab('home')}
            className="inline-flex items-center gap-1.5 text-xs font-black tracking-tight opacity-70 hover:opacity-100 transition cursor-pointer"
          >
            <span>Launch</span>
            <span className="text-emerald-400">Gremlin</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsQrModalOpen(true)}
              className="p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 backdrop-blur-md text-xs font-bold transition cursor-pointer border border-white/10"
              title="Show QR Code"
            >
              <QrCode className="w-4 h-4 text-emerald-400" />
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 backdrop-blur-md text-xs font-bold transition cursor-pointer border border-white/10"
              title="Share this card"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* The Card Body */}
        <div className={`rounded-3xl border overflow-hidden shadow-2xl transition-all ${theme.cardBg}`}>
          
          {/* Header Banner */}
          <div
            className="h-32 w-full relative"
            style={{
              background: theme.bannerGradient || `linear-gradient(135deg, ${card.primaryColor || '#10b981'}, ${card.accentColor || '#34d399'})`
            }}
          >
            {card.availabilityNotice && (
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-emerald-300 border border-white/10 shadow">
                {card.availabilityNotice}
              </div>
            )}
          </div>

          {/* Profile Details Container */}
          <div className="px-6 pb-8 -mt-14 relative space-y-6 text-center">
            
            {/* Avatar Photo */}
            <div className="w-24 h-24 rounded-full mx-auto p-1.5 bg-zinc-950/80 backdrop-blur-md shadow-xl flex items-center justify-center overflow-hidden border-2 border-white/20">
              {card.avatarUrl ? (
                <img src={card.avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-full" />
              ) : (
                <div
                  className="w-full h-full rounded-full flex items-center justify-center text-white text-3xl font-black"
                  style={{ background: card.primaryColor || '#10b981' }}
                >
                  {(card.fullName || card.companyName || 'C').charAt(0)}
                </div>
              )}
            </div>

            {/* Name, Title & Bio */}
            <div className="space-y-1">
              <div className="inline-flex items-center justify-center gap-1.5">
                <h1 className="font-black text-2xl tracking-tight text-current">
                  {card.fullName || card.companyName}
                </h1>
                {card.verified && (
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" title="Verified Creator Profile" />
                )}
              </div>

              {card.jobTitle && (
                <p className="text-sm font-semibold opacity-85">{card.jobTitle}</p>
              )}

              {card.companyName && card.fullName && (
                <p className="text-xs opacity-60 font-medium">{card.companyName} {card.address ? `• ${card.address}` : ''}</p>
              )}

              {card.tagline && (
                <p className="text-xs opacity-80 pt-2 font-normal leading-relaxed max-w-sm mx-auto">
                  {card.tagline}
                </p>
              )}
            </div>

            {/* Quick Contact Action Icons Row */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              {cleanPhone && (
                <a
                  href={`tel:${cleanPhone}`}
                  className="p-3 rounded-2xl bg-zinc-800/40 hover:bg-zinc-800/80 border border-white/5 text-center transition flex flex-col items-center gap-1"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10.5px] font-bold">Call</span>
                </a>
              )}
              {card.email && (
                <a
                  href={`mailto:${card.email}`}
                  className="p-3 rounded-2xl bg-zinc-800/40 hover:bg-zinc-800/80 border border-white/5 text-center transition flex flex-col items-center gap-1"
                >
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span className="text-[10.5px] font-bold">Email</span>
                </a>
              )}
              {cleanWhatsapp && (
                <a
                  href={`https://wa.me/${cleanWhatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-zinc-800/40 hover:bg-zinc-800/80 border border-white/5 text-center transition flex flex-col items-center gap-1"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10.5px] font-bold">WhatsApp</span>
                </a>
              )}
              {card.websiteUrl && (
                <a
                  href={card.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-zinc-800/40 hover:bg-zinc-800/80 border border-white/5 text-center transition flex flex-col items-center gap-1"
                >
                  <Globe className="w-4 h-4 text-purple-400" />
                  <span className="text-[10.5px] font-bold">Website</span>
                </a>
              )}
            </div>

            {/* Primary Highlight CTA */}
            {card.primaryCta?.label && (
              <a
                href={card.primaryCta.url || '#'}
                target="_blank"
                rel="noreferrer"
                className="block w-full py-3.5 px-6 rounded-2xl text-zinc-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 hover:opacity-90 active:scale-[0.98] transition cursor-pointer"
                style={{ background: card.primaryColor || '#10b981' }}
              >
                {card.primaryCta.label}
              </a>
            )}

            {/* Dual Contact Conversion Stack */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleDownloadVCard}
                className="py-3 px-4 rounded-2xl bg-zinc-950 text-white border border-zinc-700 hover:bg-zinc-900 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Save Contact</span>
              </button>

              <button
                type="button"
                onClick={() => setIsExchangeModalOpen(true)}
                className="py-3 px-4 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Exchange Info</span>
              </button>
            </div>

            {/* Services Offerings Tags */}
            {card.services?.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-white/10 text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Services & Expertise</span>
                <div className="flex flex-wrap gap-1.5">
                  {card.services.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-zinc-800/60 border border-white/5 text-[11px] font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Featured Portfolio / Projects */}
            {card.portfolio?.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-white/10 text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Featured Projects</span>
                <div className="space-y-2">
                  {card.portfolio.map((p, idx) => (
                    <a
                      key={idx}
                      href={p.linkUrl || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="block p-3 rounded-2xl bg-zinc-800/40 hover:bg-zinc-800/80 border border-white/5 transition group"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-current group-hover:text-emerald-400 transition">{p.title}</h4>
                        <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:text-emerald-400" />
                      </div>
                      {p.description && (
                        <p className="text-[11px] opacity-75 mt-0.5">{p.description}</p>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Client Testimonial */}
            {card.testimonial?.quote && (
              <div className="p-4 rounded-2xl bg-zinc-800/30 border border-white/5 text-left space-y-2 relative overflow-hidden">
                <Quote className="w-6 h-6 text-emerald-400/20 absolute -bottom-1 -right-1" />
                <p className="text-xs italic opacity-85 leading-relaxed">
                  "{card.testimonial.quote}"
                </p>
                {card.testimonial.author && (
                  <div className="text-[10px] font-bold opacity-70">
                    — {card.testimonial.author} {card.testimonial.role ? `, ${card.testimonial.role}` : ''}
                  </div>
                )}
              </div>
            )}

            {/* Social Media Channels Grid with Branded SVG Icons */}
            {card.socials && Object.values(card.socials).some(Boolean) && (
              <div className="space-y-2 pt-2 border-t border-white/10 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Connect Online</span>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  {Object.entries(card.socials).map(([key, val]) => {
                    if (!val) return null;
                    const fullUrl = val.startsWith('http') ? val : `https://${val}`;
                    return (
                      <a
                        key={key}
                        href={fullUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-xl bg-zinc-800/60 hover:bg-zinc-700/80 border border-white/10 text-zinc-300 hover:text-white transition hover:scale-110 flex items-center justify-center"
                        title={`Visit ${key}`}
                      >
                        <SocialIcon platform={key} className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Business Hours */}
            {card.businessHours && (
              <div className="inline-flex items-center gap-1.5 text-[11px] opacity-60">
                <Clock className="w-3.5 h-3.5" />
                <span>{card.businessHours}</span>
              </div>
            )}

          </div>
        </div>

        {/* Lockscreen Wallpaper & QR Helper Shortcuts */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <button
            onClick={() => setIsWallpaperModalOpen(true)}
            className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-zinc-900/60 border border-zinc-800 cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Lockscreen Wallpaper</span>
          </button>
        </div>

        {/* Powered by LaunchGremlin Footer */}
        <div className="text-center pt-2 pb-6">
          <button
            onClick={() => onSelectTab && onSelectTab('business-cards')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold shadow-lg transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Built with LaunchGremlin • Create Yours Free</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* QR Code In-Person Modal */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-white">{card.fullName || card.companyName}</h4>
              <button onClick={() => setIsQrModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-white rounded-2xl inline-block shadow-inner">
              {qrDataUrl && <img src={qrDataUrl} alt="Card QR" className="w-52 h-52 object-contain" />}
            </div>

            <p className="text-xs text-zinc-400 font-medium">
              Scan with any mobile camera to view card & sync contact.
            </p>
          </div>
        </div>
      )}

      {/* Lead Exchange Dialog */}
      <LeadExchangeModal
        isOpen={isExchangeModalOpen}
        onClose={() => setIsExchangeModalOpen(false)}
        cardOwnerName={card.fullName || card.companyName}
        cardOwnerEmail={card.email}
      />

      {/* Lockscreen Wallpaper Modal */}
      <LockscreenWallpaperModal
        isOpen={isWallpaperModalOpen}
        onClose={() => setIsWallpaperModalOpen(false)}
        card={card}
        shareUrl={typeof window !== 'undefined' ? window.location.href : `https://launchgremlin.com/c/${card.slug || 'card'}`}
      />
    </div>
  );
}
