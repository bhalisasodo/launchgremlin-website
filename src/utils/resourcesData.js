// src/utils/resourcesData.js
// Production Resources, Notion Templates, AI Prompts & Technical Cheat Sheets for LaunchGremlin.com

export const RESOURCE_CATEGORIES = [
  { id: 'all', label: 'All Resources', icon: 'Sparkles' },
  { id: 'notion', label: 'Notion Operating Systems', icon: 'FileText' },
  { id: 'prompts', label: 'AI Prompt Vault', icon: 'Bot' },
  { id: 'playbooks', label: 'Growth Playbooks', icon: 'TrendingUp' },
  { id: 'cheatsheets', label: 'Tech & Speed Blueprints', icon: 'Zap' }
];

export const RESOURCES_DATA = [
  // --- NOTION OPERATING SYSTEMS ---
  {
    id: 'notion-client-onboarding',
    title: 'High-Ticket Client Onboarding OS',
    category: 'notion',
    badge: 'Notion Template',
    tag: 'Client Ops',
    author: 'LaunchGremlin Engineering',
    downloads: 1420,
    rating: '5.0',
    description: 'Complete client portal with intake questionnaires, milestone roadmaps, automated invoice tracker, and asynchronous approval pipelines.',
    notionUrl: 'https://launchgremlin.notion.site/Client-Onboarding-OS-Preview-Sample',
    features: [
      'Asynchronous Milestone Approval System',
      'Automated Scope Change Request Log',
      'Brand Asset Drop Zone & Google Drive Sync',
      'Client Dashboard with Shared Calendar'
    ],
    previewData: {
      sections: ['Client Welcome Hub', 'Project Timeline (Gantt)', 'Deliverables Tracker', 'Invoicing & Sign-Offs'],
      type: 'Database OS'
    }
  },
  {
    id: 'notion-content-engine',
    title: '30-Day Viral Content Funnel OS',
    category: 'notion',
    badge: 'Notion Template',
    tag: 'Content Engine',
    author: 'LaunchGremlin Strategy',
    downloads: 2840,
    rating: '4.9',
    description: 'Multi-platform content calendar with 30 hook frameworks, filming checklist, analytics logger, and repurposing pipeline for TikTok, Reels & YouTube.',
    notionUrl: 'https://launchgremlin.notion.site/30-Day-Content-Engine-Preview-Sample',
    features: [
      'Hook Scorecard (Curiosity, Urgency, Friction)',
      'Multi-Format Repurposing Pipeline (1 Video → 5 Assets)',
      'Thumbnail CTR A/B Test Matrix',
      'Weekly Engagement Retention Logger'
    ],
    previewData: {
      sections: ['Script Workspace', 'Production Kanban', 'Repurposing Engine', 'Viral Analytics Hub'],
      type: 'Kanban & Calendar'
    }
  },
  {
    id: 'notion-sprint-tracker',
    title: 'Agile 2-Week Sprint & Architecture Tracker',
    category: 'notion',
    badge: 'Notion Template',
    tag: 'Web Engineering',
    author: 'LaunchGremlin Engineering',
    downloads: 980,
    rating: '5.0',
    description: 'Senior engineer sprint planner with task story points, Lighthouse performance QA checklist, GitHub PR status, and bug triage board.',
    notionUrl: 'https://launchgremlin.notion.site/Agile-Sprint-Tracker-Preview-Sample',
    features: [
      '100/100 Lighthouse Performance QA Board',
      'Component Architecture Inventory',
      'API Endpoint & Webhook Verification Log',
      'Deploy Checklist for Cloudflare / Vercel'
    ],
    previewData: {
      sections: ['Sprint Backlog', 'Active Tickets (Kanban)', 'Performance QA Board', 'Deploy Manifest'],
      type: 'Sprint System'
    }
  },

  // --- AI PROMPT VAULT ---
  {
    id: 'prompt-landing-page-copy',
    title: 'The Sub-Second Landing Page Copywriter',
    category: 'prompts',
    badge: 'AI Prompt',
    tag: 'Copywriting & CRO',
    model: 'Claude 3.5 Sonnet / GPT-4o',
    downloads: 3890,
    rating: '5.0',
    description: 'Generates high-converting hero headlines, objection-handling FAQs, and benefit-driven feature bullets using cognitive psychology frameworks.',
    variables: [
      { key: 'PRODUCT_NAME', label: 'Product / Service Name', default: 'LaunchGremlin' },
      { key: 'TARGET_AUDIENCE', label: 'Ideal Customer Profile', default: 'Tech Founders and Creator-Led Brands' },
      { key: 'CORE_OFFER', label: 'Core Value Proposition', default: 'Sub-second custom websites and automated AI agent workflows' },
      { key: 'PRIMARY_OBJECTION', label: 'Main Customer Hesitation', default: 'Expensive agency pricing and slow 6-month delivery' }
    ],
    template: `You are an elite Direct-Response Copywriter and Conversion Rate Optimization (CRO) Architect who has engineered $50M+ in pipeline.

I need a complete, high-converting landing page copy blueprint for {{PRODUCT_NAME}}.

Product Details:
- Target Customer Profile: {{TARGET_AUDIENCE}}
- Core Value Offer: {{CORE_OFFER}}
- Major Objection to Disarm: {{PRIMARY_OBJECTION}}

Write a structured landing page blueprint including:
1. Above-The-Fold Hero Section:
   - Punchy, high-contrast H1 headline (under 8 words)
   - Specific sub-headline explaining the mechanism
   - 2 High-intent Call To Action button labels
   - Micro-trust guarantee statement
2. 3-Column Value Transformation Matrix (Old Way vs. {{PRODUCT_NAME}} Way)
3. 3 Core Benefit Sections with punchy sub-headers and technical proof points
4. 4 Hard-Hitting Objection-Disarming FAQs addressing {{PRIMARY_OBJECTION}} directly
5. Final Urgency CTA with risk-reversal guarantee

Tone: High-agency, sharp, authoritative, internet-native. Avoid cliché corporate buzzwords.`
  },
  {
    id: 'prompt-youtube-retention-script',
    title: 'YouTube 70%+ Retention Script Framework',
    category: 'prompts',
    badge: 'AI Prompt',
    tag: 'Video Strategy',
    model: 'GPT-4o / Claude 3.5',
    downloads: 2450,
    rating: '4.9',
    description: 'Engineers the first 45 seconds of video scripts with visual pattern interrupts, open loops, and retention resets that keep viewers watching.',
    variables: [
      { key: 'VIDEO_TOPIC', label: 'Video Title / Topic', default: 'How I Built a $10k/mo AI Automation Agency in 30 Days' },
      { key: 'TARGET_VIEWER', label: 'Target Audience', default: 'Aspiring Solo Founders & Software Engineers' },
      { key: 'BIG_PROMISE', label: 'Core Payoff / Deliverable', default: 'The exact tech stack, client pitch scripts, and zero-code workflows used' }
    ],
    template: `You are a Lead YouTube Retention Director responsible for scaling channels past 1,000,000 subscribers.

Topic: {{VIDEO_TOPIC}}
Audience: {{TARGET_VIEWER}}
Core Payoff: {{BIG_PROMISE}}

Write an exact, second-by-second video script for the FIRST 90 SECONDS engineered to maintain 75%+ audience retention.

Structure:
- [0:00 - 0:08] The Immediate Payoff Hook (Zero intro fluff, validate the title immediately)
- [0:08 - 0:25] The Stakes & Open Loop (Why 99% fail and what happens if you ignore this)
- [0:25 - 0:45] The Proof & Authority Injection (Show the outcome / result)
- [0:45 - 1:15] Visual Pattern Interrupt & Chapter Breakdown (What they will learn in order)
- [1:15 - 1:30] Retention Reset & Transition into Point #1

Format with [Visual / B-Roll Cue], [Sound Effect Cue], and [Spoken Script with Inflection Notes].`
  },
  {
    id: 'prompt-cold-outreach-loom',
    title: 'High-Ticket Inbound Audit & Loom Pitch Script',
    category: 'prompts',
    badge: 'AI Prompt',
    tag: 'Client Acquisition',
    model: 'Claude 3.5 / GPT-4o',
    downloads: 1890,
    rating: '5.0',
    description: 'Generates personalized 3-minute video audit scripts that identify high-value technical website flaws and convert prospect CEOs into booked calls.',
    variables: [
      { key: 'PROSPECT_NAME', label: 'Prospect Executive Name', default: 'Alex' },
      { key: 'PROSPECT_COMPANY', label: 'Prospect Company', default: 'Apex Fitness' },
      { key: 'SPECIFIC_FLAW', label: 'Identified Bottleneck', default: 'Mobile page takes 4.2s to load and lead form is buried below 3 screens' },
      { key: 'FIX_OFFER', label: 'Your Proposed Solution', default: 'Sub-second React architecture that lifts mobile lead conversion by 35%+' }
    ],
    template: `You are a High-Ticket Client Acquisition Consultant for high-end technical agencies.

Prospect Name: {{PROSPECT_NAME}}
Company: {{PROSPECT_COMPANY}}
Identified Problem: {{SPECIFIC_FLAW}}
Proposed Solution: {{FIX_OFFER}}

Write a concise, 3-minute personalized Loom / video audit script designed to achieve a 40%+ reply-to-booking rate.

Rules:
1. Do NOT sound like a generic salesperson. Sound like an elite senior engineer giving free value.
2. Structure:
   - 0:00 - 0:30: Compliment a specific strong element of {{PROSPECT_COMPANY}}, then transition to {{SPECIFIC_FLAW}}.
   - 0:30 - 1:45: Screen share demonstration: Show the exact performance or conversion leak in DevTools / Lighthouse.
   - 1:45 - 2:30: Show the solution blueprint ({{FIX_OFFER}}) with live example.
   - 2:30 - 3:00: Low-friction Call To Action: "No hard pitch. Happy to send over the exact Figma wireframe or hop on a quick 15-minute screen share if helpful."`
  },
  {
    id: 'prompt-rag-architecture-spec',
    title: 'Enterprise Vector RAG Architecture Prompt Spec',
    category: 'prompts',
    badge: 'AI Prompt',
    tag: 'AI Engineering',
    model: 'Claude 3.5 Sonnet',
    downloads: 1540,
    rating: '5.0',
    description: 'Generates full-stack technical specifications for vector embedding pipelines, chunking strategies, hybrid keyword search, and LLM guardrails.',
    variables: [
      { key: 'DATA_SOURCE', label: 'Company Knowledge Source', default: 'Internal Notion Workspaces, PDF Contracts & Postgres DB' },
      { key: 'VECTOR_DB', label: 'Vector Database Engine', default: 'Pinecone / pgvector' },
      { key: 'LLM_BACKEND', label: 'LLM Orchestration Layer', default: 'LangChain / LlamaIndex with OpenAI text-embedding-3-small' }
    ],
    template: `You are a Principal AI Systems Architect.

Data Source: {{DATA_SOURCE}}
Vector DB: {{VECTOR_DB}}
LLM Stack: {{LLM_BACKEND}}

Generate a production-ready Technical Architecture Specification (RFC) for a Private Enterprise RAG system.

Include:
1. Document Ingestion & Chunking Strategy (Recursive Character Splitting, Metadata Tagging, Overlap rules).
2. Embedding Generation & Indexing Pipeline with cache layer.
3. Hybrid Search Retrieval (Dense Vector + Sparse BM25 Keyword Search with Cross-Encoder Re-Ranking).
4. Prompt Context Compression & Anti-Hallucination Guardrails.
5. Latency & Token Cost Budget table for 100,000 queries/month.`
  },

  // --- GROWTH PLAYBOOKS & CHEAT SHEETS ---
  {
    id: 'cheatsheet-100-vitals',
    title: '100/100 Core Web Vitals Optimization Checklist',
    category: 'cheatsheets',
    badge: 'Tech Blueprint',
    tag: 'Web Speed',
    author: 'LaunchGremlin Engineering',
    downloads: 3100,
    rating: '5.0',
    description: 'Comprehensive 18-point technical checklist to achieve perfect 100/100 Lighthouse scores, sub-500ms TTFB, and zero layout shift on modern web apps.',
    previewData: {
      sections: [
        '1. Critical CSS & Font Subsetting (woff2 preloads)',
        '2. AVIF / WebP Responsive Picture Elements',
        '3. Edge CDN Caching & Stale-While-Revalidate Headers',
        '4. Third-Party Script Offloading with Web Workers',
        '5. CLS Elimination: Explicit Aspect Ratios & Skeleton Frames'
      ],
      type: 'Architecture Checklist'
    }
  },
  {
    id: 'playbook-viral-hooks',
    title: 'The 50 High-Retention Viral Hook Frameworks',
    category: 'playbooks',
    badge: 'Growth Playbook',
    tag: 'Audience Growth',
    author: 'LaunchGremlin Strategy',
    downloads: 4120,
    rating: '5.0',
    description: '50 battle-tested short-form and long-form hook templates categorized by Curiosity Gap, Counter-Intuitive Truth, and Value Teaser.',
    previewData: {
      sections: [
        'The "Stop Doing X" Negative Framing Hook',
        'The "I Spent $5,000 So You Don\'t Have To" Case Study Hook',
        'The "3 Tools That Feel Illegal To Know" Stack Hook',
        'The "Why 99% Of People Fail At Y" Contrarian Hook'
      ],
      type: 'Swipe File'
    }
  },
  {
    id: 'cheatsheet-jamstack-stack',
    title: 'Modern 2026 JAMstack Tech Stack Cheat Sheet',
    category: 'cheatsheets',
    badge: 'Tech Blueprint',
    tag: 'Engineering',
    author: 'LaunchGremlin Engineering',
    downloads: 1670,
    rating: '4.9',
    description: 'Decision matrix comparing React 18 + Vite vs. Next.js App Router vs. Astro for high-speed client marketing sites and SaaS platforms.',
    previewData: {
      sections: [
        'Framework Comparison: Vite SPA vs. Next.js SSR vs. Astro SSG',
        'Styling: Tailwind CSS v4 vs. Vanilla CSS performance benchmarks',
        'Deployment: Cloudflare Pages vs. Vercel Edge vs. AWS Amplify',
        'Database: Supabase vs. Neon Postgres vs. PlanetScale'
      ],
      type: 'Decision Matrix'
    }
  }
];

/**
 * Replaces {{VARIABLE}} placeholders in a prompt template with provided values
 */
export function injectPromptVariables(template, variablesState = {}) {
  let result = template;
  Object.keys(variablesState).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, variablesState[key]);
  });
  return result;
}
