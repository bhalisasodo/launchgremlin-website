// src/utils/cardData.js

export const CARD_THEMES = [
  {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    description: 'Dark obsidian with vibrant neon emerald glows',
    badge: 'Creator Favorite',
    bgClass: 'bg-zinc-950 text-white',
    cardBg: 'bg-zinc-900/90 border-zinc-800 text-white',
    bannerGradient: 'linear-gradient(135deg, #064e3b 0%, #022c22 50%, #000000 100%)',
    primaryColor: '#10b981',
    accentColor: '#34d399',
    textColor: '#ffffff',
    fontStyle: 'font-sans',
    isDark: true
  },
  {
    id: 'minimal-light',
    name: 'Minimal Light',
    description: 'Crisp editorial white with deep obsidian typography',
    badge: 'Clean & Modern',
    bgClass: 'bg-stone-50 text-zinc-900',
    cardBg: 'bg-white border-zinc-200 text-zinc-900 shadow-sm',
    bannerGradient: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
    primaryColor: '#0f172a',
    accentColor: '#2563eb',
    textColor: '#0f172a',
    fontStyle: 'font-sans',
    isDark: false
  },
  {
    id: 'executive-luxe',
    name: 'Executive Luxe',
    description: 'Midnight sapphire with brushed warm gold accents',
    badge: 'High-End Advisory',
    bgClass: 'bg-[#090d16] text-stone-100',
    cardBg: 'bg-[#0f172a]/95 border-amber-500/20 text-stone-100',
    bannerGradient: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 60%, #1e293b 100%)',
    primaryColor: '#d97706',
    accentColor: '#fbbf24',
    textColor: '#ffffff',
    fontStyle: 'font-serif',
    isDark: true
  },
  {
    id: 'neo-glass',
    name: 'Neo Glass',
    description: 'Frosted glassmorphism with subtle cyan reflections',
    badge: 'Tech & SaaS',
    bgClass: 'bg-zinc-950 text-white',
    cardBg: 'bg-zinc-900/70 backdrop-blur-xl border-zinc-700/50 text-white',
    bannerGradient: 'linear-gradient(135deg, #0e7490 0%, #1e1b4b 50%, #0f172a 100%)',
    primaryColor: '#06b6d4',
    accentColor: '#38bdf8',
    textColor: '#ffffff',
    fontStyle: 'font-sans',
    isDark: true
  },
  {
    id: 'sunset-creator',
    name: 'Sunset Creator',
    description: 'Vibrant coral, rose, and purple gradient aura',
    badge: 'Media & Influencers',
    bgClass: 'bg-zinc-950 text-white',
    cardBg: 'bg-zinc-900/90 border-pink-500/20 text-white',
    bannerGradient: 'linear-gradient(135deg, #f43f5e 0%, #a855f7 50%, #6366f1 100%)',
    primaryColor: '#f43f5e',
    accentColor: '#ec4899',
    textColor: '#ffffff',
    fontStyle: 'font-sans',
    isDark: true
  },
  {
    id: 'clean-dark',
    name: 'Obsidian Stealth',
    description: 'Matte charcoal with high-contrast chrome accents',
    badge: 'Developer & Founder',
    bgClass: 'bg-black text-zinc-100',
    cardBg: 'bg-zinc-950 border-zinc-800 text-zinc-100',
    bannerGradient: 'linear-gradient(135deg, #27272a 0%, #18181b 50%, #09090b 100%)',
    primaryColor: '#e4e4e7',
    accentColor: '#a1a1aa',
    textColor: '#ffffff',
    fontStyle: 'font-mono',
    isDark: true
  }
];

export const DEMO_PROFILES = [
  {
    id: 'alex-morgan',
    slug: 'alex-morgan',
    fullName: 'Alex Morgan',
    jobTitle: 'Lead Product Designer & Founder',
    companyName: 'Vertex Studio',
    tagline: 'Designing intuitive digital products, brand identities, and high-conversion web experiences for modern tech companies.',
    phone: '+1 (555) 234-5678',
    email: 'alex@vertexstudio.design',
    whatsapp: '+15552345678',
    address: 'Austin, TX & Remote',
    websiteUrl: 'https://vertexstudio.design',
    primaryColor: '#10b981',
    accentColor: '#34d399',
    themeStyle: 'cyber-neon',
    fontStyle: 'font-sans',
    verified: true,
    avatarUrl: '',
    primaryCta: {
      label: 'Book Discovery Call 🗓️',
      url: 'https://cal.com/alex-vertex'
    },
    socials: {
      linkedin: 'linkedin.com/in/alexmorgan',
      x: 'x.com/alexmorgan',
      instagram: 'instagram.com/alex.design',
      github: 'github.com/alexmorgan',
      youtube: '',
      tiktok: '',
      discord: '',
      telegram: '',
      spotify: '',
      substack: ''
    },
    portfolio: [
      {
        title: 'Fintech Mobile Banking',
        description: 'Design of mobile experience for 500k active users.',
        imageUrl: '',
        linkUrl: 'https://vertexstudio.design/fintech'
      },
      {
        title: 'AI Analytics Dashboard',
        description: 'Design system & component library built in Figma.',
        imageUrl: '',
        linkUrl: 'https://vertexstudio.design/ai-dash'
      }
    ],
    services: ['Product Strategy', 'UI/UX Design', 'Design Systems', 'Webflow / React Dev'],
    testimonial: {
      quote: 'Alex completely transformed our SaaS flow. Conversion increased 42% in 30 days.',
      author: 'David Chen',
      role: 'Founder @ OrbitHQ'
    },
    businessHours: 'Mon – Fri: 9:00 AM – 5:00 PM CST',
    availabilityNotice: '🟢 Available for Q3 Select Projects'
  },
  {
    id: 'elena-rostova',
    slug: 'elena-rostova',
    fullName: 'Elena Rostova',
    jobTitle: 'Executive Brand Strategist',
    companyName: 'Luxe Advisory Group',
    tagline: 'Advising luxury hospitality and premier lifestyle brands on market positioning, VIP experiences, and brand resonance.',
    phone: '+1 (555) 987-6543',
    email: 'elena@luxeconsulting.com',
    whatsapp: '+15559876543',
    address: 'New York • London • Paris',
    websiteUrl: 'https://luxeconsulting.com',
    primaryColor: '#d97706',
    accentColor: '#fbbf24',
    themeStyle: 'executive-luxe',
    fontStyle: 'font-serif',
    verified: true,
    avatarUrl: '',
    primaryCta: {
      label: 'Request Strategy Deck ✦',
      url: 'https://luxeconsulting.com/deck'
    },
    socials: {
      linkedin: 'linkedin.com/in/elena-rostova',
      instagram: 'instagram.com/elena.luxury',
      x: 'x.com/elenarostova',
      github: '',
      youtube: '',
      tiktok: '',
      discord: '',
      telegram: '',
      spotify: '',
      substack: 'substack.com/@elenarostova'
    },
    portfolio: [
      {
        title: 'Palais Vendôme Rebrand',
        description: 'Comprehensive luxury identity for 5-star Parisian hotel.',
        imageUrl: '',
        linkUrl: 'https://luxeconsulting.com/palais'
      }
    ],
    services: ['Brand Architecture', 'Luxury Advisory', 'Keynote Speaking', 'Market Positioning'],
    testimonial: {
      quote: 'Elena is the most insightful brand mind we have collaborated with.',
      author: 'Claire Beaumont',
      role: 'Creative Director, Maison Vogue'
    },
    businessHours: 'By Appointment Only',
    availabilityNotice: '✦ Accepting Advisory Roles'
  },
  {
    id: 'jordan-hayes',
    slug: 'jordan-hayes',
    fullName: 'Jordan Hayes',
    jobTitle: 'Tech Creator & AI Podcaster',
    companyName: 'The Prompt Club',
    tagline: 'Making emerging AI tools, creator workflows, and future tech practical for 250,000+ weekly builders and founders.',
    phone: '+1 (555) 345-9876',
    email: 'partners@promptclub.media',
    whatsapp: '+15553459876',
    address: 'Los Angeles, CA',
    websiteUrl: 'https://promptclub.media',
    primaryColor: '#f43f5e',
    accentColor: '#ec4899',
    themeStyle: 'sunset-creator',
    fontStyle: 'font-sans',
    verified: true,
    avatarUrl: '',
    primaryCta: {
      label: 'Listen to Latest Podcast 🎙️',
      url: 'https://spotify.com'
    },
    socials: {
      youtube: 'youtube.com/@thepromptclub',
      x: 'x.com/jordanhayes',
      tiktok: 'tiktok.com/@promptclub',
      instagram: 'instagram.com/jordanhayestech',
      discord: 'discord.gg/promptclub',
      linkedin: 'linkedin.com/in/jordanhayes',
      github: '',
      telegram: '',
      spotify: 'open.spotify.com/show/promptclub',
      substack: 'promptclub.substack.com'
    },
    portfolio: [
      {
        title: 'How AI Changes Video (1.2M Views)',
        description: 'Documentary breakdown on automated generative pipelines.',
        imageUrl: '',
        linkUrl: 'https://youtube.com'
      }
    ],
    services: ['Brand Partnerships', 'Keynote Speaking', 'Product Reviews', 'Consulting'],
    testimonial: {
      quote: 'Jordan delivered our highest ROI creator campaign of the year.',
      author: 'Maya Lin',
      role: 'Head of Growth, RunwayML'
    },
    businessHours: 'Mon – Thu: 10:00 AM – 4:00 PM PST',
    availabilityNotice: '🎙️ Q3 Sponsorship Deck Open'
  },
  {
    id: 'marco-rossi',
    slug: 'marco-rossi',
    fullName: 'Marco Rossi',
    jobTitle: 'Founder & Master Roaster',
    companyName: 'Caffè Luminosa',
    tagline: 'Specialty micro-lot coffee roasted fresh weekly in Brooklyn. Wholesale catering, barista workshops, and private espresso tastings.',
    phone: '+1 (555) 432-8765',
    email: 'hello@caffeluminosa.com',
    whatsapp: '+15554328765',
    address: '142 Bedford Ave, Brooklyn, NY',
    websiteUrl: 'https://caffeluminosa.com',
    primaryColor: '#0f766e',
    accentColor: '#2dd4bf',
    themeStyle: 'clean-dark',
    fontStyle: 'font-mono',
    verified: false,
    avatarUrl: '',
    primaryCta: {
      label: 'Order Beans Online ☕',
      url: 'https://caffeluminosa.com/shop'
    },
    socials: {
      instagram: 'instagram.com/caffeluminosa',
      tiktok: 'tiktok.com/@caffeluminosa',
      facebook: '',
      x: 'x.com/caffeluminosa',
      linkedin: '',
      github: '',
      youtube: '',
      discord: '',
      telegram: '',
      spotify: '',
      substack: ''
    },
    portfolio: [
      {
        title: 'Micro-Lot Single Origins',
        description: 'Award-winning Ethiopian & Colombian Geisha lots.',
        imageUrl: '',
        linkUrl: 'https://caffeluminosa.com/menu'
      }
    ],
    services: ['Espresso Catering', 'Wholesale Subscriptions', 'Barista Workshops'],
    testimonial: {
      quote: 'Best espresso in NYC. The single origin roast is legendary.',
      author: 'Eater NY',
      role: 'Culinary Review'
    },
    businessHours: 'Open Daily: 7:00 AM – 6:00 PM EST',
    availabilityNotice: '☕ Taking Wholesale Accounts'
  },
  {
    id: 'dr-maya-patel',
    slug: 'dr-maya-patel',
    fullName: 'Dr. Maya Patel, MD',
    jobTitle: 'Founder & Clinical Director',
    companyName: 'Nova Longevity Institute',
    tagline: 'Personalized preventative medicine, metabolic health optimization, and data-driven longevity protocols for high performers.',
    phone: '+1 (555) 678-1234',
    email: 'info@novalongevity.care',
    whatsapp: '+15556781234',
    address: 'San Francisco, CA & Telehealth',
    websiteUrl: 'https://novalongevity.care',
    primaryColor: '#06b6d4',
    accentColor: '#38bdf8',
    themeStyle: 'neo-glass',
    fontStyle: 'font-sans',
    verified: true,
    avatarUrl: '',
    primaryCta: {
      label: 'Book Consultation 🩺',
      url: 'https://novalongevity.care/book'
    },
    socials: {
      linkedin: 'linkedin.com/in/drmayapatel',
      x: 'x.com/drmayapatel',
      youtube: 'youtube.com/@drmayapatel',
      instagram: 'instagram.com/drmayapatel',
      github: '',
      tiktok: '',
      discord: '',
      telegram: '',
      spotify: '',
      substack: 'mayapatel.substack.com'
    },
    portfolio: [
      {
        title: 'Precision Biomarker Program',
        description: 'Comprehensive 120-marker health analysis.',
        imageUrl: '',
        linkUrl: 'https://novalongevity.care/programs'
      }
    ],
    services: ['Metabolic Mapping', 'Executive Health', 'Longevity Protocols', 'Telehealth'],
    testimonial: {
      quote: 'Dr. Patel revolutionized our team energy, sleep quality, and performance markers.',
      author: 'Samantha Reed',
      role: 'CEO, Apex Systems'
    },
    businessHours: 'Tue – Sat: 8:00 AM – 4:00 PM PST',
    availabilityNotice: '🩺 2 New Patient Slots Open This Month'
  },
  {
    id: 'liam-vance',
    slug: 'liam-vance',
    fullName: 'Liam Vance',
    jobTitle: 'Principal Advisor & Broker',
    companyName: 'Vance Capital Real Estate',
    tagline: 'Representing institutional buyers and private investors in premier commercial acquisitions and trophy residential estates.',
    phone: '+1 (555) 890-5678',
    email: 'liam@vancecapitalre.com',
    whatsapp: '+15558905678',
    address: 'Miami, FL • New York • Aspen',
    websiteUrl: 'https://vancecapitalre.com',
    primaryColor: '#0f172a',
    accentColor: '#3b82f6',
    themeStyle: 'minimal-light',
    fontStyle: 'font-sans',
    verified: true,
    avatarUrl: '',
    primaryCta: {
      label: 'View Exclusive Portfolio 🏢',
      url: 'https://vancecapitalre.com/listings'
    },
    socials: {
      linkedin: 'linkedin.com/in/liamvance',
      instagram: 'instagram.com/liamvancerealestate',
      x: 'x.com/liamvance',
      youtube: 'youtube.com/@liamvance',
      github: '',
      tiktok: '',
      discord: '',
      telegram: '',
      spotify: '',
      substack: ''
    },
    portfolio: [
      {
        title: 'Brickell Commercial Tower',
        description: '$140M mixed-use waterfront acquisition.',
        imageUrl: '',
        linkUrl: 'https://vancecapitalre.com/brickell'
      }
    ],
    services: ['Off-Market Acquisitions', 'Asset Valuation', 'Private Client Representation'],
    testimonial: {
      quote: 'Liam negotiated an off-market deal flawlessly within 14 days.',
      author: 'Marcus Sterling',
      role: 'Managing Partner, Sterling Holdings'
    },
    businessHours: 'Mon – Sat: 8:00 AM – 7:00 PM EST',
    availabilityNotice: '🏢 $250M+ Transacted in 2025-2026'
  }
];

export const SOCIAL_PLATFORMS = [
  { id: 'linkedin', label: 'LinkedIn', prefix: 'https://linkedin.com/in/', placeholder: 'linkedin.com/in/username' },
  { id: 'x', label: 'X / Twitter', prefix: 'https://x.com/', placeholder: 'x.com/username' },
  { id: 'instagram', label: 'Instagram', prefix: 'https://instagram.com/', placeholder: 'instagram.com/username' },
  { id: 'youtube', label: 'YouTube', prefix: 'https://youtube.com/@', placeholder: 'youtube.com/@channel' },
  { id: 'tiktok', label: 'TikTok', prefix: 'https://tiktok.com/@', placeholder: 'tiktok.com/@handle' },
  { id: 'github', label: 'GitHub', prefix: 'https://github.com/', placeholder: 'github.com/username' },
  { id: 'discord', label: 'Discord', prefix: 'https://discord.gg/', placeholder: 'discord.gg/server or user' },
  { id: 'telegram', label: 'Telegram', prefix: 'https://t.me/', placeholder: 't.me/username' },
  { id: 'spotify', label: 'Spotify / Podcast', prefix: 'https://open.spotify.com/', placeholder: 'open.spotify.com/...' },
  { id: 'substack', label: 'Substack / Newsletter', prefix: 'https://', placeholder: 'newsletter.substack.com' }
];

/**
 * Encodes card data into a URL-safe Base64 string
 */
export function encodeCardToUrl(card) {
  try {
    const clone = { ...card };
    // Strip very large embedded base64 images if they exceed safe URL size to preserve link brevity
    if (clone.avatarUrl && clone.avatarUrl.length > 8000) {
      clone.avatarUrl = '';
    }
    const jsonStr = JSON.stringify(clone);
    const base64 = btoa(unescape(encodeURIComponent(jsonStr)));
    return base64;
  } catch (err) {
    console.error('Failed to encode card to URL:', err);
    return '';
  }
}

/**
 * Decodes card data from a URL-safe Base64 string
 */
export function decodeCardFromUrl(encodedStr) {
  try {
    if (!encodedStr) return null;
    const cleanStr = encodedStr.trim().replace(/^#\/?/, '').replace(/^data=/, '');
    const jsonStr = decodeURIComponent(escape(atob(cleanStr)));
    const parsed = JSON.parse(jsonStr);
    return parsed;
  } catch (err) {
    console.error('Failed to decode card from URL:', err);
    return null;
  }
}

/**
 * Generates a standard vCard 3.0 string
 */
export function generateVCardString(card) {
  const cardUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/c/${card.slug || 'card'}`
    : `https://launchgremlin.com/c/${card.slug || 'card'}`;

  const cleanPhone = card.phone ? card.phone.replace(/[^0-9+]/g, '') : '';

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN;CHARSET=UTF-8:${card.fullName || card.companyName}`,
    card.fullName ? `N;CHARSET=UTF-8:${card.fullName};;;;` : `N;CHARSET=UTF-8:${card.companyName};;;;`,
    card.companyName ? `ORG;CHARSET=UTF-8:${card.companyName}` : '',
    card.jobTitle ? `TITLE;CHARSET=UTF-8:${card.jobTitle}` : '',
    cleanPhone ? `TEL;TYPE=CELL,VOICE,PREF:${cleanPhone}` : '',
    card.email ? `EMAIL;TYPE=INTERNET,WORK,PREF:${card.email}` : '',
    card.websiteUrl ? `URL;TYPE=WORK:${card.websiteUrl}` : '',
    `URL;TYPE=DIGITAL_CARD:${cardUrl}`,
    card.address ? `ADR;TYPE=WORK;CHARSET=UTF-8:;;${card.address};;;;` : '',
    card.tagline ? `NOTE;CHARSET=UTF-8:${card.tagline.replace(/\r?\n/g, '\\n')}` : '',
    'X-GENERATED-BY:LaunchGremlin.com Digital Business Card',
    'END:VCARD'
  ];

  return lines.filter(Boolean).join('\r\n');
}

/**
 * Triggers browser download for vCard (.vcf)
 */
export function downloadVCard(card) {
  const vcardStr = generateVCardString(card);
  const blob = new Blob([vcardStr], { type: 'text/vcard;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${card.slug || 'business-card'}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
