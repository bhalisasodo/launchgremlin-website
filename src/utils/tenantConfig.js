/**
 * Multi-Tenant Profile & Industry Blueprint Library
 * Manages client brand profiles, custom strategic pillars, voice guardrails, and color themes.
 */

export const INDUSTRY_BLUEPRINTS = [
  {
    id: 'launchgremlin',
    name: 'LaunchGremlin OS (Default)',
    niche: 'Digital Growth Agency',
    handle: '@LaunchGremlin',
    secondaryHandle: '@needmoney4maserati',
    accentColor: '#10b981',
    themeKey: 'emerald',
    website: 'https://launchgremlin.co.za',
    whatsapp: '+27 82 000 0000',
    defaultCta: 'Visit LaunchGremlin Content Hub / Claim Free WhatsApp Audit (Link in bio)',
    voice: {
      name: 'LaunchGremlin Signature Voice',
      tone: 'Warm, pragmatic, plain-language, anti-agency jargon, South African business focus.',
      bannedWords: ['synergy', 'paradigm', 'retainer trap', 'disruptive enterprise'],
      signatureSignoff: '⚡ LaunchGremlin · Built to Convert'
    },
    pillars: [
      {
        id: 'educational',
        name: 'Educational & Content Hub',
        idPrefix: 'LG-EDU',
        iconName: 'BookOpen',
        weeklyCadence: '2x/week',
        description: 'Micro-breakdowns of local website mistakes, mobile speed, and conversion traps.'
      },
      {
        id: 'cold_calls',
        name: 'Cold-Call Reels',
        idPrefix: 'LG-CALL',
        iconName: 'PhoneCall',
        weeklyCadence: '3-5x/week',
        description: 'Real raw screen recordings auditing live local SA business websites.'
      },
      {
        id: 'vibe_events',
        name: 'Vibe-Coding Events',
        idPrefix: 'LG-VIBE',
        iconName: 'Code2',
        weeklyCadence: '2-3x/week',
        description: 'Live coding sprints and build-in-public sessions in Umhlanga & Durban.'
      },
      {
        id: 'music_competition',
        name: 'Music Video Competition',
        idPrefix: 'LG-COMP',
        iconName: 'Video',
        weeklyCadence: '1-2x/week',
        description: 'NO SKIP artist spotlight challenge and Durban creative submissions.'
      },
      {
        id: 'maserati_narrative',
        name: 'Need Money for Maserati',
        idPrefix: 'MAS-NAR',
        iconName: 'Flame',
        weeklyCadence: '5-7x/week',
        description: 'Founder build-in-public journey directly derived from LaunchGremlin proof points.'
      }
    ]
  },
  {
    id: 'medspa_aesthetic',
    name: 'Aura Med Spa & Aesthetics',
    niche: 'Medical Aesthetics & Wellness',
    handle: '@auramedspa_za',
    secondaryHandle: '',
    accentColor: '#ec4899',
    themeKey: 'purple',
    website: 'https://auramedspa.co.za',
    whatsapp: '+27 83 123 4567',
    defaultCta: 'Book your complimentary skin analysis via WhatsApp (Link in bio)',
    voice: {
      name: 'Medical Elegance & Trust',
      tone: 'Empathetic, reassuring, clinically grounded, luxury aesthetic, plain medical explanations.',
      bannedWords: ['cheap', 'miracle cure', 'guaranteed overnight'],
      signatureSignoff: '✨ Aura Med Spa · Clinical Precision, Natural Glow'
    },
    pillars: [
      {
        id: 'transformations',
        name: 'Patient Transformations',
        idPrefix: 'AURA-TRF',
        iconName: 'Sparkles',
        weeklyCadence: '3x/week',
        description: 'Before & after case studies with patient journey breakdowns.'
      },
      {
        id: 'demystifiers',
        name: 'Procedure Demystifiers',
        idPrefix: 'AURA-DEM',
        iconName: 'BookOpen',
        weeklyCadence: '2x/week',
        description: 'What really happens during Microneedling, Chemical Peels, and Laser.'
      },
      {
        id: 'skincare_myths',
        name: 'Skincare Mythbusters',
        idPrefix: 'AURA-MYTH',
        iconName: 'HelpCircle',
        weeklyCadence: '2x/week',
        description: 'Debunking viral TikTok beauty trends with clinical dermatology science.'
      },
      {
        id: 'behind_scenes',
        name: 'Clinic Behind-the-Scenes',
        idPrefix: 'AURA-BTS',
        iconName: 'Video',
        weeklyCadence: '2x/week',
        description: 'Sanitisation protocols, staff training, and client consultations.'
      }
    ]
  },
  {
    id: 'contractors_solar',
    name: 'VoltSolar & Energy SA',
    niche: 'Solar, Electrical & Trades',
    handle: '@voltsolar_sa',
    secondaryHandle: '',
    accentColor: '#f59e0b',
    themeKey: 'amber',
    website: 'https://voltsolar.co.za',
    whatsapp: '+27 84 987 6543',
    defaultCta: 'Get an instant WhatsApp Load-Shedding & Solar ROI Quote (Link in bio)',
    voice: {
      name: 'Master Electrician & Honest Trade',
      tone: 'Direct, no-nonsense, safety-focused, cost-transparent, practical South African advice.',
      bannedWords: ['free energy forever', 'zero maintenance', 'cheap inverters'],
      signatureSignoff: '☀️ VoltSolar · Keep the Lights On, Cut the Eskom Bill'
    },
    pillars: [
      {
        id: 'loadshedding_roi',
        name: 'Solar ROI & Bill Cutters',
        idPrefix: 'VOLT-ROI',
        iconName: 'Zap',
        weeklyCadence: '3x/week',
        description: 'Real electricity bill breakdowns: Before Solar vs After Solar in SA.'
      },
      {
        id: 'install_traps',
        name: 'Installation Traps & Hacks',
        idPrefix: 'VOLT-TRAP',
        iconName: 'PhoneCall',
        weeklyCadence: '2x/week',
        description: 'Dodgy installations exposed: Fire hazards, wrong wire gauges, and fake inverters.'
      },
      {
        id: 'job_walkthrough',
        name: 'On-Site Job Walkthroughs',
        idPrefix: 'VOLT-SITE',
        iconName: 'Video',
        weeklyCadence: '3x/week',
        description: 'Roof mounting, DB board rewiring, and lithium battery configurations.'
      },
      {
        id: 'system_sizing',
        name: 'System Sizing Guides',
        idPrefix: 'VOLT-SIZE',
        iconName: 'BookOpen',
        weeklyCadence: '2x/week',
        description: '5kW vs 8kW vs 12kW: What your home or business actually needs.'
      }
    ]
  },
  {
    id: 'real_estate',
    name: 'Coastline Luxury Properties',
    niche: 'Luxury Real Estate & Property',
    handle: '@coastline_properties',
    secondaryHandle: '',
    accentColor: '#38bdf8',
    themeKey: 'slate',
    website: 'https://coastlineproperties.co.za',
    whatsapp: '+27 82 555 1234',
    defaultCta: 'Request full property brochure & private viewing via WhatsApp (Link in bio)',
    voice: {
      name: 'Luxury Coastal Realtor',
      tone: 'Sophisticated, aspirational, market-savvy, lifestyle-focused, warm Durban hospitality.',
      bannedWords: ['cheap fixer-upper', 'bargain basement'],
      signatureSignoff: '🏡 Coastline Properties · Prime Coastal Living'
    },
    pillars: [
      {
        id: 'property_tours',
        name: '60s Video Property Tours',
        idPrefix: 'PROP-TOUR',
        iconName: 'Video',
        weeklyCadence: '4x/week',
        description: 'Cinematic walk-throughs of prime homes in Umhlanga, Ballito, and Zimbali.'
      },
      {
        id: 'market_intelligence',
        name: 'KZN Market Intelligence',
        idPrefix: 'PROP-MKT',
        iconName: 'BookOpen',
        weeklyCadence: '2x/week',
        description: 'Interest rate shifts, sectional title vs freehold, and rental yield data.'
      },
      {
        id: 'lifestyle_suburbs',
        name: 'Neighbourhood Spotlight',
        idPrefix: 'PROP-SUB',
        iconName: 'Sparkles',
        weeklyCadence: '2x/week',
        description: 'Best schools, coffee shops, and security estates in North Coast KZN.'
      },
      {
        id: 'buyer_seller_tips',
        name: 'Buyer & Seller Checklists',
        idPrefix: 'PROP-TIPS',
        iconName: 'HelpCircle',
        weeklyCadence: '2x/week',
        description: 'Transfer duty traps, staging secrets to get R200k more, and bond pre-approvals.'
      }
    ]
  },
  {
    id: 'hospitality_food',
    name: 'The Grind & Bean Cafe',
    niche: 'Artisan Coffee & Food',
    handle: '@grindandbean_dbn',
    secondaryHandle: '',
    accentColor: '#f97316',
    themeKey: 'amber',
    website: 'https://grindandbean.co.za',
    whatsapp: '+27 81 222 3333',
    defaultCta: 'View our seasonal menu & reserve a weekend brunch table (Link in bio)',
    voice: {
      name: 'Artisan Barista & Foodie',
      tone: 'Passionate, energetic, sensory, community-centered, warm Durban coffee culture.',
      bannedWords: ['instant coffee', 'pre-packaged'],
      signatureSignoff: '☕ The Grind & Bean · Freshly Roasted in Durban'
    },
    pillars: [
      {
        id: 'coffee_craft',
        name: 'Artisan Coffee Craft',
        idPrefix: 'CAFE-CRAFT',
        iconName: 'BookOpen',
        weeklyCadence: '3x/week',
        description: 'Espresso extraction, latte art tutorials, and single-origin bean cuppings.'
      },
      {
        id: 'menu_highlights',
        name: 'Signature Dishes & Specials',
        idPrefix: 'CAFE-FOOD',
        iconName: 'Sparkles',
        weeklyCadence: '3x/week',
        description: 'Sourdough benedicts, pastry drops, and weekend brunch specials.'
      },
      {
        id: 'behind_counter',
        name: 'Morning Rush & Team BTS',
        idPrefix: 'CAFE-BTS',
        iconName: 'Video',
        weeklyCadence: '2x/week',
        description: 'Baristas cracking jokes at 6:30 AM and baking fresh croissants.'
      }
    ]
  },
  {
    id: 'b2b_saas',
    name: 'StackFlow Cloud Automations',
    niche: 'B2B Tech & SaaS',
    handle: '@stackflow_tech',
    secondaryHandle: '',
    accentColor: '#8b5cf6',
    themeKey: 'purple',
    website: 'https://stackflow.io',
    whatsapp: '+27 82 999 8888',
    defaultCta: 'Book a 15-minute workflow automation audit for your team (Link in bio)',
    voice: {
      name: 'Pragmatic Tech Architect',
      tone: 'Concise, high-leverage, systems-thinking, ROI-focused, developer-friendly.',
      bannedWords: ['revolutionary synergy', 'disrupting paradigms'],
      signatureSignoff: '⚙️ StackFlow · Automate the Boring, Scale the Rest'
    },
    pillars: [
      {
        id: 'workflow_teardowns',
        name: '1-Minute Workflow Teardowns',
        idPrefix: 'TECH-AUTO',
        iconName: 'Code2',
        weeklyCadence: '3x/week',
        description: 'Replacing 10 hours of manual spreadsheet copying with simple webhooks.'
      },
      {
        id: 'stack_audits',
        name: 'SaaS Tool Stack Audits',
        idPrefix: 'TECH-AUD',
        iconName: 'BookOpen',
        weeklyCadence: '2x/week',
        description: 'Cutting R15,000/month in unused software subscriptions for businesses.'
      },
      {
        id: 'founder_metrics',
        name: 'Founder Build-in-Public',
        idPrefix: 'TECH-BIP',
        iconName: 'Flame',
        weeklyCadence: '2x/week',
        description: 'Monthly MRR updates, churn fixes, and software development sprint logs.'
      }
    ]
  }
];

const TENANTS_STORAGE_KEY = 'launchgremlin_content_engine_tenants_v1';
const ACTIVE_TENANT_ID_KEY = 'launchgremlin_active_tenant_id_v1';

export const tenantManager = {
  getTenants: () => {
    try {
      const stored = localStorage.getItem(TENANTS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {}
    // Initialize default blueprints
    localStorage.setItem(TENANTS_STORAGE_KEY, JSON.stringify(INDUSTRY_BLUEPRINTS));
    return INDUSTRY_BLUEPRINTS;
  },

  getActiveTenant: () => {
    const tenants = tenantManager.getTenants();
    const activeId = localStorage.getItem(ACTIVE_TENANT_ID_KEY) || 'launchgremlin';
    return tenants.find((t) => t.id === activeId) || tenants[0];
  },

  setActiveTenantId: (tenantId) => {
    localStorage.setItem(ACTIVE_TENANT_ID_KEY, tenantId);
  },

  saveTenant: (tenantData) => {
    const tenants = tenantManager.getTenants();
    const existingIdx = tenants.findIndex((t) => t.id === tenantData.id);

    let updated;
    if (existingIdx >= 0) {
      updated = [...tenants];
      updated[existingIdx] = tenantData;
    } else {
      updated = [...tenants, tenantData];
    }

    localStorage.setItem(TENANTS_STORAGE_KEY, JSON.stringify(updated));
    return tenantData;
  },

  deleteTenant: (tenantId) => {
    if (tenantId === 'launchgremlin') return false; // Protected
    const tenants = tenantManager.getTenants().filter((t) => t.id !== tenantId);
    localStorage.setItem(TENANTS_STORAGE_KEY, JSON.stringify(tenants));
    if (localStorage.getItem(ACTIVE_TENANT_ID_KEY) === tenantId) {
      tenantManager.setActiveTenantId('launchgremlin');
    }
    return true;
  }
};
