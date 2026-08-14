// src/utils/scopePricingData.js
// Scope Matrix, Pricing Engine & AI Proposal Synthesizer for LaunchGremlin.com

export const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1, label: 'USD ($)' },
  ZAR: { symbol: 'R', rate: 18.5, label: 'ZAR (R)' }
};

export const SCOPE_PILLARS = [
  {
    id: 'web',
    title: 'Web Engineering & Digital Products',
    icon: 'Globe',
    badge: 'Core Engine',
    description: 'Sub-second, high-converting web applications engineered with React, Next.js, and Vite for 100/100 Core Web Vitals.',
    items: [
      {
        id: 'web-landing',
        name: 'High-Converting Landing Page MVP',
        description: 'Single-page conversion funnel with interactive hero, feature showcases, social proof, and CRO lead capture.',
        basePriceUSD: 650,
        estimatedDays: 4,
        category: 'Frontend & UI/UX'
      },
      {
        id: 'web-multipage',
        name: 'Full Multi-Page Marketing Website',
        description: '5 to 8 bespoke pages (Home, Services, Case Studies, About, Blog Hub, Contact) with custom animations and SEO.',
        basePriceUSD: 1400,
        estimatedDays: 8,
        category: 'Full Website'
      },
      {
        id: 'web-app',
        name: 'Custom Web Application / SaaS Platform',
        description: 'Authenticated customer portal, database integration, Stripe payment checkout, and interactive tools.',
        basePriceUSD: 2800,
        estimatedDays: 16,
        category: 'Full-Stack App'
      },
      {
        id: 'web-ecommerce',
        name: 'Headless E-Commerce Storefront',
        description: 'Fast catalog browsing, cart management, instant checkout, inventory sync, and conversion-optimized product pages.',
        basePriceUSD: 2100,
        estimatedDays: 12,
        category: 'E-Commerce'
      },
      {
        id: 'web-migration',
        name: 'Wordpress / Webflow to React Migration',
        description: 'Clean migration to modern JAMstack for sub-500ms load times, zero plugin security bloat, and lower hosting fees.',
        basePriceUSD: 950,
        estimatedDays: 6,
        category: 'Architecture Migration'
      }
    ]
  },
  {
    id: 'content',
    title: 'Content Strategy & Audience Engine',
    icon: 'TrendingUp',
    badge: 'Audience Growth',
    description: 'Data-driven content funnels, short-form video scripts, and multi-platform distribution systems that turn viewers into clients.',
    items: [
      {
        id: 'content-viral30',
        name: '30-Day Short-Form Viral Video System',
        description: '30 high-retention video scripts & hooks for TikTok/Reels/Shorts, filming guides, and thumbnail strategy.',
        basePriceUSD: 750,
        estimatedDays: 5,
        category: 'Short-Form Video'
      },
      {
        id: 'content-youtube',
        name: 'YouTube Long-Form Strategy & Retention Framework',
        description: '4 in-depth long-form video concepts, retention-engineered scripts, pacing blueprints, and CTR title/thumbnail packages.',
        basePriceUSD: 850,
        estimatedDays: 6,
        category: 'Long-Form YouTube'
      },
      {
        id: 'content-seohub',
        name: 'SEO Content Engine (10 Target Cluster Articles)',
        description: '10 keyword-targeted, authoritative articles designed to rank on Google and capture buyer-intent search traffic.',
        basePriceUSD: 950,
        estimatedDays: 7,
        category: 'SEO Content'
      },
      {
        id: 'content-repurpose',
        name: '5-Platform Content Repurposing Pipeline',
        description: 'Turn 1 core piece of content weekly into newsletters, X threads, LinkedIn carousels, and Instagram carousels.',
        basePriceUSD: 600,
        estimatedDays: 4,
        category: 'Distribution System'
      }
    ]
  },
  {
    id: 'ai',
    title: 'Enterprise AI Consulting & Workflow Automation',
    icon: 'Bot',
    badge: 'Multiplier',
    description: 'Autonomous 24/7 AI agents, vector search RAG systems, and custom LLM workflows that automate repetitive business operations.',
    items: [
      {
        id: 'ai-agent-support',
        name: 'Autonomous 24/7 Customer AI Agent',
        description: 'Trained on your business docs to answer queries, qualify leads, and schedule calls directly in your CRM.',
        basePriceUSD: 1100,
        estimatedDays: 6,
        category: 'AI Copilots'
      },
      {
        id: 'ai-rag-search',
        name: 'Vector Database RAG Knowledge System',
        description: 'Semantic vector search across private company PDFs, Notion workspaces, and databases for instant employee recall.',
        basePriceUSD: 1600,
        estimatedDays: 9,
        category: 'Enterprise RAG'
      },
      {
        id: 'ai-lead-pipeline',
        name: 'Automated CRM & Lead Enrichment Pipeline',
        description: 'Connects inbound inquiries via Webhooks, enriches prospect company data with AI, and alerts your team on Slack/WhatsApp.',
        basePriceUSD: 800,
        estimatedDays: 4,
        category: 'Workflow Automation'
      },
      {
        id: 'ai-content-generator',
        name: 'Custom Internal LLM Generation Pipeline',
        description: 'Proprietary fine-tuned prompt chains to generate on-brand marketing copy, proposals, or reports at scale.',
        basePriceUSD: 1250,
        estimatedDays: 7,
        category: 'LLM Engineering'
      }
    ]
  }
];

export const TIMELINE_SPRINTS = [
  {
    id: 'sprint-72hr',
    name: '72-Hour Rapid MVP Sprint',
    badge: '🚀 Emergency Speed',
    description: 'Dedicated senior engineers working in continuous parallel sprints for urgent product launches.',
    multiplier: 1.35,
    daysMultiplier: 0.45,
    idealFor: 'Product launches, investor pitch deadlines, and urgent go-to-market validation.'
  },
  {
    id: 'sprint-2week',
    name: 'Standard 2-Week Production Launch',
    badge: '⚡ Most Popular',
    description: 'Balanced sprint with structured review cycles, interactive prototype testing, and full QA validation.',
    multiplier: 1.0,
    daysMultiplier: 1.0,
    idealFor: 'Standard business launches, major redesigns, and growth content systems.'
  },
  {
    id: 'sprint-4week',
    name: 'Enterprise 4-Week Architecture Build',
    badge: '🏛️ Deep Discovery',
    description: 'Comprehensive enterprise sprint including multi-stakeholder workshops, custom API integrations, and SLA setup.',
    multiplier: 0.95,
    daysMultiplier: 1.8,
    idealFor: 'Complex multi-system platforms, custom vector AI deployments, and high-volume e-commerce.'
  }
];

export const TECHNICAL_ADDONS = [
  {
    id: 'addon-vitals',
    name: '100/100 Core Web Vitals Speed Guarantee',
    description: 'Sub-500ms TTFB, automated asset compression, font subsetting, and edge CDN cache optimization.',
    priceUSD: 350,
    days: 2
  },
  {
    id: 'addon-brand',
    name: 'Vector Brand Identity & Design System',
    description: 'Custom logo vector files, typography hierarchy, UI tokens, and Figma component design system.',
    priceUSD: 450,
    days: 3
  },
  {
    id: 'addon-crm',
    name: 'Automated CRM & WhatsApp Lead Dispatch',
    description: 'Real-time sync to HubSpot, Notion, Google Sheets, and automated SMS/WhatsApp alerts upon lead submission.',
    priceUSD: 300,
    days: 2
  },
  {
    id: 'addon-analytics',
    name: 'Advanced Telemetry & Conversion Funnel Setup',
    description: 'Google Analytics 4 custom conversion events, Plausible tracking, heatmaps, and scroll depth monitors.',
    priceUSD: 250,
    days: 1
  }
];

/**
 * Computes investment estimate, timeline, and deliverables based on user selections
 */
export function calculateScopeQuote(selectedItemIds = [], sprintId = 'sprint-2week', selectedAddonIds = [], currency = 'USD') {
  const sprint = TIMELINE_SPRINTS.find(s => s.id === sprintId) || TIMELINE_SPRINTS[1];

  let rawSubtotalUSD = 0;
  let rawTotalDays = 0;
  const chosenDeliverables = [];

  // 1. Tally selected pillar items
  SCOPE_PILLARS.forEach(pillar => {
    pillar.items.forEach(item => {
      if (selectedItemIds.includes(item.id)) {
        rawSubtotalUSD += item.basePriceUSD;
        rawTotalDays += item.estimatedDays;
        chosenDeliverables.push({
          ...item,
          pillarName: pillar.title
        });
      }
    });
  });

  // 2. Tally selected add-ons
  const chosenAddons = [];
  TECHNICAL_ADDONS.forEach(addon => {
    if (selectedAddonIds.includes(addon.id)) {
      rawSubtotalUSD += addon.priceUSD;
      rawTotalDays += addon.days;
      chosenAddons.push(addon);
    }
  });

  // 3. Apply sprint multiplier
  const totalUSD = Math.round(rawSubtotalUSD * sprint.multiplier);
  const adjustedDays = Math.max(3, Math.round(rawTotalDays * sprint.daysMultiplier));

  // 4. Currency conversion
  const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const finalPrice = Math.round(totalUSD * rateInfo.rate);

  return {
    rawSubtotalUSD,
    totalUSD,
    finalPrice,
    currencySymbol: rateInfo.symbol,
    currencyCode: currency,
    adjustedDays,
    sprint,
    chosenDeliverables,
    chosenAddons,
    itemCount: chosenDeliverables.length + chosenAddons.length
  };
}

/**
 * Generates an executive technical proposal document in structured Markdown format
 */
export function generateProposalDocument(scopeState, clientInfo = {}) {
  const { quote, clientName, companyName, clientEmail, projectGoals } = scopeState;
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const deliverablesList = quote.chosenDeliverables.map((d, i) => `
### ${i + 1}. ${d.name} (${d.category})
- **Scope**: ${d.description}
- **Primary Pillar**: ${d.pillarName}
`).join('');

  const addonsList = quote.chosenAddons.length > 0
    ? quote.chosenAddons.map(a => `- **${a.name}**: ${a.description}`).join('\n')
    : '- Standard LaunchGremlin High-Performance QA Suite';

  const doc = `
# 📄 TECHNICAL STRATEGY PROPOSAL & SCOPE BLUEPRINT
**Prepared by:** LaunchGremlin Engineering  
**Prepared for:** ${clientName || 'Client'} ${companyName ? `(${companyName})` : ''}  
**Date:** ${dateStr}  
**Proposal Reference:** LG-${Math.floor(100000 + Math.random() * 900000)}  
**Sprint Model:** ${quote.sprint.name}  
**Estimated Timeline:** ~${quote.adjustedDays} Business Days  
**Total Investment Estimate:** ${quote.currencySymbol}${quote.finalPrice.toLocaleString()} (${quote.currencyCode})

---

## 1. Executive Summary & Objective

LaunchGremlin was engaged to engineer a comprehensive digital growth architecture designed to solve core conversion and workflow bottlenecks.

### Project Goals
${projectGoals || 'Build a sub-second, conversion-engineered digital home and automated growth infrastructure to scale inbound client acquisition.'}

### Target Outcomes
- **Sub-Second Performance**: 100/100 Core Web Vitals score on mobile and desktop.
- **Conversion Architecture**: Frictionless user journeys from first touch to booking/payment.
- **Automated Workflow**: Reduced operational friction through modern system integrations.

---

## 2. Recommended Deliverables & Scope of Work

${deliverablesList || '*(No specific items selected yet)*'}

### Technical Add-Ons & Enhancements
${addonsList}

---

## 3. Recommended Architecture & Technology Stack

| Layer | Recommended Technology | Strategic Advantage |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18 + Vite / Next.js App Router | Zero-lag page transitions, instant interactivity, and sub-500ms TTFB. |
| **Styling & Design System** | Tailwind CSS v4 + Motion Utilities | Modular design tokens, fluid responsiveness, and dark mode identity. |
| **Edge Deployment & CDN** | Cloudflare Edge / Vercel Global Anycast | Sub-50ms regional latency across North America, Europe, and Africa. |
| **Automation & Data** | Node.js + Python LLM Pipelines + Webhooks | Resilient 24/7 lead routing, automated CRM enrichment, and AI sync. |

---

## 4. Phase-by-Phase Execution Roadmap

\`\`\`mermaid
gantt
    title Project Execution Sprints (~${quote.adjustedDays} Days)
    dateFormat  X
    axisFormat  Day %d
    section Discovery & Architecture
    Discovery, Wireframing & Design Tokens :0, ${Math.max(1, Math.round(quote.adjustedDays * 0.25))}
    section Core Build & Integration
    Engineering, Components & Content Ingestion :${Math.max(1, Math.round(quote.adjustedDays * 0.25))}, ${Math.max(2, Math.round(quote.adjustedDays * 0.7))}
    section QA & Go-Live
    Performance Tuning, 100 Vitals QA & Launch :${Math.max(2, Math.round(quote.adjustedDays * 0.7))}, ${quote.adjustedDays}
\`\`\`

- **Phase 1: Architecture & UX Blueprint (Days 1–${Math.max(1, Math.round(quote.adjustedDays * 0.25))}):** Discovery, wireframes, design tokens, and technical architecture spec.
- **Phase 2: Core Engineering & Systems Build (Days ${Math.max(1, Math.round(quote.adjustedDays * 0.25)) + 1}–${Math.max(2, Math.round(quote.adjustedDays * 0.7))}):** Component development, API wiring, workflow triggers, and content implementation.
- **Phase 3: Performance Optimization & Launch (Days ${Math.max(2, Math.round(quote.adjustedDays * 0.7)) + 1}–${quote.adjustedDays}):** 100/100 Lighthouse audit, cross-browser stress testing, domain DNS cutover, and production handoff.

---

## 5. Commercial Investment & Terms

- **Estimated Total Investment:** **${quote.currencySymbol}${quote.finalPrice.toLocaleString()} ${quote.currencyCode}**
- **Payment Structure:** 50% on project initiation, 50% upon final QA sign-off & production deployment.
- **Guarantees:** 100/100 Core Web Vitals guarantee on core pages, 14 days of post-launch hypercare support, and full intellectual property transfer.

---
*Generated via LaunchGremlin Interactive AI Proposal Engine • https://launchgremlin.com*
`;

  return doc;
}
