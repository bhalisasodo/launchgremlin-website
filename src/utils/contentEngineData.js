/**
 * LaunchGremlin Content Engine Data & Utilities
 * Contains pillar definitions, preset intake templates, voice configurations, and scoring logic.
 */

export const ENGINE_VOICES = {
  launchgremlin: {
    id: 'launchgremlin',
    handle: '@LaunchGremlin',
    name: 'LaunchGremlin (Core Brand)',
    tone: 'Warm, plain-language, client/craft-forward, South African small business focus, no technical jargon.',
    perspective: "Team / Brand ('we', 'our team', 'local businesses')",
    badgeColor: 'emerald',
    guardrail: 'Does this help, entertain, or reassure the SA small-business owner — or is it just talking about LaunchGremlin?',
    cta: 'Visit LaunchGremlin Content Hub / Try our instant business-card generator (Link in bio)'
  },
  needmoney4maserati: {
    id: 'needmoney4maserati',
    handle: '@needmoney4maserati',
    name: 'Need Money for Maserati (Founder Narrative)',
    tone: 'First-person, raw, build-in-public, energetic, transparent, high stakes, humorous yet focused.',
    perspective: "Founder ('I', 'me', 'my goal')",
    badgeColor: 'amber',
    guardrail: 'Maserati posts must be derived from real proof-points or events from the other four pillars, never generated in isolation.',
    cta: 'Follow the journey from R0 to Maserati / Drop your feedback or guess the next milestone in comments.'
  }
};

export const CONTENT_PILLARS = [
  {
    id: 'educational',
    name: 'Educational & Content Hub',
    account: 'launchgremlin',
    idPrefix: 'LG-EDU',
    iconName: 'BookOpen',
    color: 'emerald',
    weeklyCadence: '2 posts/week',
    description: 'Debunking digital storefront myths, business-card tool demos, and high-conversion tips for SA businesses.',
    defaultCta: 'Visit LaunchGremlin Content Hub / Try the instant business-card generator',
    presets: [
      {
        title: 'The R15,000 Website Myth for SA Small Businesses',
        content: 'Most South African small business owners are convinced they need to spend R15k–R30k and wait 6 weeks for an agency to build a website. In reality, 85% of their traffic comes from mobile phones looking for 3 things: what you do, how much it costs, and a 1-tap WhatsApp link. LaunchGremlin replaces bloated agency delays with instant, high-converting digital storefronts.'
      },
      {
        title: 'Why Static PDFs Are Costing Your Business Inquiries',
        content: 'Paper business cards and PDF brochures get lost in WhatsApp chats or thrown away. We built an instant digital business card generator that loads in 0.3s, has 1-tap WhatsApp chat, and gives local businesses a professional mobile presence for free.'
      }
    ]
  },
  {
    id: 'cold_calls',
    name: 'Cold-Call Reels',
    account: 'launchgremlin',
    idPrefix: 'LG-COLD',
    iconName: 'PhoneCall',
    color: 'sky',
    weeklyCadence: '3–5 reels/week',
    description: 'Real prospect call reactions, objection handling, and unscripted website audits from LeadGremlin pipeline.',
    defaultCta: 'Book a 15-minute quick storefront audit with LaunchGremlin',
    presets: [
      {
        title: 'Calling 20 Durban Business Owners on WhatsApp',
        content: 'We called 20 local business owners who had no website or a broken mobile site. When we showed one plumbing contractor that he lost 140 Google search clicks last month because his site was not mobile-responsive, his reaction was priceless.'
      }
    ]
  },
  {
    id: 'vibe_coding_events',
    name: 'Vibe-Coding Events',
    account: 'launchgremlin',
    idPrefix: 'LG-EVT',
    iconName: 'Code2',
    color: 'purple',
    weeklyCadence: '1 event/month + 3 teaser/recap posts',
    description: 'In-person live build sessions in Umhlanga & Ballito turning non-technical founders into builders.',
    defaultCta: 'RSVP for our next free in-person build session in Umhlanga/Ballito',
    presets: [
      {
        title: 'Event #1: 10 Founders Build 10 Web Apps in 3 Hours',
        content: 'We hosted Event #1 in Umhlanga with 10 non-technical founders. In 3 hours using modern AI tools and LaunchGremlin templates, every single founder walked out with a live, functioning digital storefront and custom domain.'
      }
    ]
  },
  {
    id: 'music_video_competition',
    name: 'Music Video Competition',
    account: 'launchgremlin',
    idPrefix: 'LG-COMP',
    iconName: 'Video',
    color: 'pink',
    weeklyCadence: '2 posts/week',
    description: 'NO SKIP track briefs, videographer submissions, BTS creator craft showcases, and community voting.',
    defaultCta: 'Submit your music video entry or vote for your favourite creator',
    presets: [
      {
        title: 'NO SKIP Video Competition — 5 Creators, 1 Track',
        content: 'We gave 5 Durban videographers the exact same audio track for NO SKIP. The cinematic diversity was insane — from street drifting footage to high-fashion studio lighting. Voting opens this Friday.'
      }
    ]
  },
  {
    id: 'maserati_narrative',
    name: 'Need Money for Maserati',
    account: 'needmoney4maserati',
    idPrefix: 'MAS-NAR',
    iconName: 'Flame',
    color: 'amber',
    weeklyCadence: '5–7 posts/week (Daily spine)',
    description: 'First-person founder narrative connecting calls landed, events run, and revenue milestones towards the Maserati.',
    defaultCta: 'Follow the journey from R0 to Maserati / Drop your thoughts in comments',
    requiresProofPoint: true,
    presets: [
      {
        title: 'Road to Maserati #14 — Shipping the Content Engine',
        content: 'We just automated our multi-channel content engine. Now every cold call audit and vibe-coding event automatically spins out 4 ready-to-post assets. Speed beats polish when you have a Maserati to buy.',
        proofPointRef: 'LG-EDU-001'
      }
    ]
  }
];

export const INITIAL_INTAKE_ITEMS = [
  {
    id: 'LG-EDU-001',
    pillar: 'educational',
    pillarName: 'Educational & Content Hub',
    account: 'launchgremlin',
    accountHandle: '@LaunchGremlin',
    title: 'The R15,000 Website Myth for SA Small Businesses',
    sourceType: 'content_hub_article',
    content: 'Most South African small business owners are convinced they need to spend R15k–R30k and wait 6 weeks for an agency to build a website. In reality, 85% of their traffic comes from mobile phones looking for 3 things: what you do, how much it costs, and a 1-tap WhatsApp link.',
    proofPointRef: '',
    createdAt: new Date().toISOString(),
    status: 'GENERATED_DRAFT',
    defaultCta: 'Visit LaunchGremlin Content Hub / Try our instant business-card generator'
  },
  {
    id: 'MAS-NAR-001',
    pillar: 'maserati_narrative',
    pillarName: 'Need Money for Maserati',
    account: 'needmoney4maserati',
    accountHandle: '@needmoney4maserati',
    title: 'Building the Content Engine in Public',
    sourceType: 'founder_milestone',
    content: 'Just finished shipping the first automated educational content batch for LaunchGremlin. Tested the business card generator with local entrepreneurs in Durban. Proof that speed beats polish every time when you are building towards the Maserati.',
    proofPointRef: 'LG-EDU-001',
    createdAt: new Date().toISOString(),
    status: 'APPROVED_READY_TO_POST',
    defaultCta: 'Follow the journey / comment what feature we should ship next'
  }
];

export const INITIAL_DRAFTS = [
  {
    intake_id: 'LG-EDU-001',
    account: 'launchgremlin',
    pillar: 'educational',
    title: 'The R15,000 Website Myth for SA Small Businesses',
    status: 'APPROVED',
    suggested_post_time: 'Tomorrow, 10:00 SAST',
    created_at: new Date().toISOString(),
    candidate_hooks: [
      {
        rank: 1,
        hook: '90% of SA small business websites make this exact mistake — here is the 5-minute fix.',
        rationale: 'High-urgency problem/solution opening tailored to SA business owners without buzzwords.',
        style: 'Problem / Urgent Solution'
      },
      {
        rank: 2,
        hook: 'Why paying R15,000 for a static website in 2026 is officially a trap.',
        rationale: 'Addresses direct cost pain point with strong polarizing stance that hooks attention.',
        style: 'Myth-Busting / Pricing'
      },
      {
        rank: 3,
        hook: 'If your website does not do this one thing on mobile, you are losing customers every day.',
        rationale: 'Highlights mobile-first reality for South African consumers.',
        style: 'Practical Check'
      },
      {
        rank: 4,
        hook: 'How to turn a simple business card into a 24/7 sales engine in under 10 minutes.',
        rationale: 'Feature hook that promotes the free business-card tool with tangible outcome.',
        style: 'Tool Showcase'
      }
    ],
    chosen_hook: '90% of SA small business websites make this exact mistake — here is the 5-minute fix.',
    cta: 'Visit LaunchGremlin Content Hub / Try our instant business-card generator (Link in bio)',
    formats: {
      talking_clip: {
        format: 'talking_clip',
        title: 'Reel/TikTok: The R15,000 Website Myth',
        hook: '90% of SA small business websites make this exact mistake — here is the 5-minute fix.',
        duration: '45-60s',
        scenes: [
          {
            scene: 1,
            visual: 'Clean hook shot, creator or product screen with bold high-contrast caption overlay.',
            audio_spoken: '90% of SA small business websites make this exact mistake — here is the 5-minute fix.',
            on_screen_text: '🚨 WATCH BEFORE YOU PAY FOR A WEBSITE'
          },
          {
            scene: 2,
            visual: 'Split-screen showing the common mistake vs the clean, fast modern approach.',
            audio_spoken: 'Most local businesses are told they need weeks of complex dev work. But here is what actually converts customers: speed, clean mobile layout, and a frictionless WhatsApp CTA.',
            on_screen_text: 'Mobile-First + Instant Conversion 📱'
          },
          {
            scene: 3,
            visual: 'Live demo of LaunchGremlin tool working smoothly on an iPhone.',
            audio_spoken: 'Take a look at how this works: 85% of traffic is on mobile. They just want what you do, how much it costs, and a 1-tap WhatsApp button.',
            on_screen_text: 'Simple. Clean. Effective. ✨'
          },
          {
            scene: 4,
            visual: 'Ending screen with LaunchGremlin logo and clean call-out.',
            audio_spoken: 'You do not need a bloated agency quote. Visit LaunchGremlin Content Hub or try our instant business-card generator.',
            on_screen_text: 'Link in Bio 🔗'
          }
        ],
        captions: {
          instagram: '90% of SA small business websites make this exact mistake — here is the 5-minute fix.\n\nSouth African small businesses do not need bloated R15k agency retainers. You need a fast, mobile-optimised digital presence that turns visitors into paying customers.\n\n💡 Visit LaunchGremlin Content Hub / Try the instant business-card generator (Link in bio)\n\n#LaunchGremlin #SABusiness #DurbanBusiness #SouthAfricaEntrepreneurs #WebDesignSA #DigitalMarketing',
          tiktok: '90% of SA small business websites make this exact mistake — here is the 5-minute fix. 🇿🇦 Skip the overpriced agency fluff. Link in bio! #southafrica #smallbusinesssa #webdesign #entrepreneurship',
          facebook: 'Practical digital solutions for South African businesses. Read the full breakdown or try our free business-card tool today: Link in bio.'
        }
      },
      carousel: {
        format: 'carousel',
        title: '5-Slide Carousel: The R15,000 Website Myth',
        slide_count: 5,
        slides: [
          {
            slide_number: 1,
            type: 'Hook / Cover',
            headline: '90% of SA small business websites make this exact mistake',
            visual_cue: 'Bold typography on dark high-contrast background with emerald accent.'
          },
          {
            slide_number: 2,
            type: 'The Problem / Myth',
            headline: 'What Most Small Businesses Get Wrong',
            body: 'Spending thousands on bloated setups before testing if customers can easily reach them on mobile or WhatsApp.',
            visual_cue: 'Side-by-side pain point checklist.'
          },
          {
            slide_number: 3,
            type: 'The Core Shift',
            headline: 'The 3 Essentials That Actually Convert',
            body: '1. Instant mobile loading (< 0.5s)\n2. 1-click WhatsApp/Call button\n3. Transparent pricing & trust proof.',
            visual_cue: 'Numbered icon layout with clean spacing.'
          },
          {
            slide_number: 4,
            type: 'Actionable Framework',
            headline: 'How To Apply This Today',
            body: 'Audit your current link in bio or site. Remove 3 unnecessary clicks between product discovery and contact.',
            visual_cue: 'Flowchart diagram demonstrating simplified funnel.'
          },
          {
            slide_number: 5,
            type: 'CTA / Save for Later',
            headline: 'Save This Guide 📌',
            body: 'Found this valuable? Save for later and share with an entrepreneur friend.\n\n👉 Try our free business-card tool at LaunchGremlin.',
            visual_cue: 'LaunchGremlin badge + save/share icon animation cue.'
          }
        ]
      },
      before_after: {
        format: 'before_after',
        title: 'Visual Comparison & Proof: Website Pricing Myth',
        before_state: {
          label: 'Traditional Agency Model (Slow & Expensive)',
          description: '6-week turnaround, R15,000+ setup cost, cluttered desktop-centric pages with slow mobile response.',
          badge: '❌ High Friction'
        },
        after_state: {
          label: 'The LaunchGremlin Modern Standard',
          description: 'Instant delivery, ultra-clean mobile UX, direct WhatsApp integration, 99+ mobile score.',
          badge: '⚡ High Conversion'
        },
        visual_direction: 'Split screen mockup showing a slow cluttered site vs a lightning-fast LaunchGremlin storefront on an iPhone.',
        post_caption: 'Notice the difference? High conversion comes from clarity, not clutter.\n\n90% of SA small business websites make this exact mistake — here is the 5-minute fix.\n\n👉 Try LaunchGremlin today (Link in bio)'
      },
      caption_only: {
        format: 'caption_only',
        title: 'High-Engagement Text Post',
        text: '90% of SA small business websites make this exact mistake — here is the 5-minute fix.\n\nHere are 3 truths every South African business owner needs to remember:\n\n1. Your customers are 85%+ on mobile phones — if your site takes 4 seconds to load, they bounce.\n2. Trust is built by clear pricing, real local reviews, and effortless contact.\n3. Simplicity always outperforms unnecessary animations and bloated code.\n\n💡 Visit LaunchGremlin Content Hub / Try the instant business-card generator\n\n#LaunchGremlin #SmallBusinessSA #SouthAfrica #DigitalStorefront #LocalBusiness'
      }
    }
  }
];

export const INITIAL_TRACKING_ROWS = [
  {
    post_id: 'LG-EDU-001-TALK',
    timestamp: '2026-08-18 10:00',
    pillar: 'educational',
    account: 'launchgremlin',
    format: 'talking_clip',
    hook_used: '90% of SA small business websites make this exact mistake — here is the 5-minute fix.',
    status: 'APPROVED',
    views: 1450,
    saves: 52,
    comments: 24,
    shares: 38,
    paid_spend: 'R150',
    paid_candidate: 'YES',
    notes: 'Top performer in Durban & JHB test.'
  },
  {
    post_id: 'LG-EDU-001-CARO',
    timestamp: '2026-08-18 10:00',
    pillar: 'educational',
    account: 'launchgremlin',
    format: 'carousel',
    hook_used: '90% of SA small business websites make this exact mistake — here is the 5-minute fix.',
    status: 'APPROVED',
    views: 890,
    saves: 31,
    comments: 12,
    shares: 19,
    paid_spend: 'R0',
    paid_candidate: 'YES',
    notes: 'High save-to-view ratio.'
  },
  {
    post_id: 'MAS-NAR-001-TALK',
    timestamp: '2026-08-18 12:30',
    pillar: 'maserati_narrative',
    account: 'needmoney4maserati',
    format: 'talking_clip',
    hook_used: 'Here is why shipping the content engine brings me closer to the Maserati.',
    status: 'APPROVED',
    views: 620,
    saves: 8,
    comments: 15,
    shares: 6,
    paid_spend: 'R0',
    paid_candidate: 'NO',
    notes: 'Organic build-in-public test.'
  }
];

/**
 * Calculates whether a post qualifies for paid amplification based on 30/60/90 calendar criteria.
 */
export function evaluatePaidCandidate(views, saves, comments, shares) {
  const v = Math.max(Number(views) || 0, 1);
  const s = Number(saves) || 0;
  const c = Number(comments) || 0;
  const sh = Number(shares) || 0;

  const engagementScore = (s * 2 + sh * 3 + c) / v;
  const isCandidate = s >= 20 || engagementScore >= 0.045;

  return {
    isCandidate,
    score: (engagementScore * 100).toFixed(1) + '%',
    recommendedSpend: isCandidate ? 'R150–R200 / day' : 'Gathering Organic Signal',
    rationale: isCandidate
      ? 'High organic resonance (saves & shares threshold reached). Ready for Meta paid boost.'
      : 'Keep monitoring organic engagement before allocating paid budget.'
  };
}

/**
 * Generates local 4-way multi-format package deterministically from intake inputs.
 */
export function generateLocalContentPackage(intakeItem, chosenHookIndex = 0) {
  const { id, pillar, account, title, content, proofPointRef } = intakeItem;
  const pillarObj = CONTENT_PILLARS.find(p => p.id === pillar) || CONTENT_PILLARS[0];
  const voiceObj = ENGINE_VOICES[account] || ENGINE_VOICES.launchgremlin;

  // 1. Candidate Hooks
  let candidateHooks = [];
  if (account === 'needmoney4maserati') {
    candidateHooks = [
      {
        rank: 1,
        hook: `Here's why ${title.toLowerCase()} is bringing me one step closer to the Maserati.`,
        rationale: 'High curiosity and direct tie-in to the founder build-in-public milestone.',
        style: 'Momentum / High-Stakes'
      },
      {
        rank: 2,
        hook: 'I used to think this took 3 weeks. We just proved it takes 24 hours.',
        rationale: 'Contrast hook that challenges standard agency timelines.',
        style: 'Contrarian / Speed'
      },
      {
        rank: 3,
        hook: `The biggest risk I took this week: ${title}.`,
        rationale: 'Vulnerability and drama hook that draws viewers into the messy building reality.',
        style: 'Vulnerability / BTS'
      },
      {
        rank: 4,
        hook: 'If you are building a business in South Africa right now, watch this before you spend R10k.',
        rationale: 'Direct local relevance with money-saving stakes.',
        style: 'Direct Warning'
      }
    ];
  } else {
    candidateHooks = [
      {
        rank: 1,
        hook: `90% of SA small business websites make this exact mistake — here's the 5-minute fix.`,
        rationale: 'High-urgency problem/solution opening tailored to SA business owners without buzzwords.',
        style: 'Problem / Urgent Solution'
      },
      {
        rank: 2,
        hook: `Why paying R15,000 for a static website in 2026 is officially a trap.`,
        rationale: 'Addresses direct cost pain point with strong polarizing stance that hooks attention.',
        style: 'Myth-Busting / Pricing'
      },
      {
        rank: 3,
        hook: `If your website doesn't do this one thing on mobile, you are losing customers every day.`,
        rationale: 'Highlights mobile-first reality for South African consumers.',
        style: 'Practical Check'
      },
      {
        rank: 4,
        hook: `How to turn a simple business card into a 24/7 sales engine in under 10 minutes.`,
        rationale: 'Feature hook that promotes the free business-card tool with tangible outcome.',
        style: 'Tool Showcase'
      }
    ];
  }

  const selectedHook = candidateHooks[chosenHookIndex]?.hook || candidateHooks[0].hook;
  const cta = voiceObj.cta;

  // 2. Video Script
  const talkingClip = {
    format: 'talking_clip',
    title: `Short-Form Video: ${title}`,
    hook: selectedHook,
    duration: '45-60s',
    scenes: [
      {
        scene: 1,
        visual: 'Clean hook shot, high-contrast text overlay, direct camera engagement.',
        audio_spoken: selectedHook,
        on_screen_text: account === 'needmoney4maserati' ? 'ROAD TO THE MASERATI 🏎️💨' : '🚨 MUST WATCH FOR SA BUSINESS OWNERS'
      },
      {
        scene: 2,
        visual: 'Split-screen or screen-recording displaying the common friction vs modern solution.',
        audio_spoken: account === 'needmoney4maserati'
          ? `Here's the honest breakdown. While building LaunchGremlin, we tackled ${title.toLowerCase()}.`
          : `Most local businesses are told they need weeks of dev work. But what converts is speed and a 1-tap WhatsApp link.`,
        on_screen_text: 'Mobile Speed + Conversion 📱'
      },
      {
        scene: 3,
        visual: 'Over-the-shoulder live product demo showing fast mobile interaction.',
        audio_spoken: `${content.slice(0, 150)}...`,
        on_screen_text: 'Simple. Fast. High-Impact. ✨'
      },
      {
        scene: 4,
        visual: 'Ending branding screen with clear CTA button animation.',
        audio_spoken: cta,
        on_screen_text: 'Link in Bio 🔗'
      }
    ],
    captions: {
      instagram: `${selectedHook}\n\n${content}\n\n💡 ${cta}\n\n#LaunchGremlin #SABusiness #DurbanBusiness #SouthAfricaEntrepreneurs #WebDesignSA`,
      tiktok: `${selectedHook} 🇿🇦 ${cta} #southafrica #smallbusinesssa #entrepreneur`,
      facebook: `${selectedHook}\n\n${content}\n\n${cta}`
    }
  };

  // 3. Carousel
  const carousel = {
    format: 'carousel',
    title: `5-Slide Carousel: ${title}`,
    slide_count: 5,
    slides: [
      {
        slide_number: 1,
        type: 'Hook / Cover',
        headline: selectedHook,
        visual_cue: 'Bold high-contrast headline on dark background with brand accent.'
      },
      {
        slide_number: 2,
        type: 'The Problem / Myth',
        headline: 'What Most People Get Wrong',
        body: 'Over-investing in complex code before verifying if customers can contact you effortlessly on mobile.',
        visual_cue: 'Side-by-side pain point checklist.'
      },
      {
        slide_number: 3,
        type: 'The Core Shift',
        headline: 'The 3 Essentials That Convert',
        body: '1. Fast mobile loading (< 0.5s)\n2. 1-click WhatsApp/Call button\n3. Clear, honest pricing and local proof.',
        visual_cue: 'Numbered icon badge layout.'
      },
      {
        slide_number: 4,
        type: 'Actionable Framework',
        headline: 'How To Implement Today',
        body: 'Audit your current link in bio or storefront. Remove 3 unnecessary clicks.',
        visual_cue: 'Flowchart diagram showing frictionless funnel.'
      },
      {
        slide_number: 5,
        type: 'CTA / Save for Later',
        headline: 'Save This Guide 📌',
        body: `Save for later and share with a founder friend.\n\n👉 ${cta}`,
        visual_cue: 'Brand badge + save/share icon animation cue.'
      }
    ]
  };

  // 4. Before & After
  const beforeAfter = {
    format: 'before_after',
    title: `Visual Comparison & Proof: ${title}`,
    before_state: {
      label: 'Traditional Bloated Setup',
      description: '6-week agency turnaround, R15,000+ setup cost, slow desktop-heavy layout.',
      badge: '❌ High Friction'
    },
    after_state: {
      label: 'LaunchGremlin Modern Standard',
      description: 'Instant turnaround, sub-second mobile loading, 1-tap WhatsApp booking, 99+ Core Web Vitals.',
      badge: '⚡ High Conversion'
    },
    visual_direction: 'Split screen mockup comparing a cluttered site with a lightning-fast LaunchGremlin storefront on an iPhone.',
    post_caption: `Notice the difference? High conversion comes from clarity, not clutter.\n\n${selectedHook}\n\n👉 ${cta}`
  };

  // 5. Caption Only
  const captionOnly = {
    format: 'caption_only',
    title: `High-Engagement Post: ${title}`,
    text: `${selectedHook}\n\nHere are 3 truths every South African business owner needs to remember:\n\n1. Your customers are 85%+ on mobile phones.\n2. Trust is built by clear pricing, real local reviews, and effortless contact.\n3. Simplicity always outperforms unnecessary animations and bloated code.\n\n💡 ${cta}\n\n#LaunchGremlin #SmallBusinessSA #SouthAfrica #DigitalStorefront`
  };

  return {
    intake_id: id,
    account,
    pillar,
    title,
    status: 'PENDING_REVIEW',
    suggested_post_time: 'Tomorrow, 10:00 SAST',
    created_at: new Date().toISOString(),
    candidate_hooks: candidateHooks,
    chosen_hook: selectedHook,
    cta,
    formats: {
      talking_clip: talkingClip,
      carousel,
      before_after: beforeAfter,
      caption_only: captionOnly
    }
  };
}

/**
 * 30/60/90 Strategic Calendar Phases & Cadence Config
 */
export const CALENDAR_PHASES = [
  {
    phase: 1,
    days: 'Days 1–30',
    title: 'Phase 1: Build the Organic Engine & Signal Gathering',
    goal: 'Establish cadence, build avatar feed, announce Event #1 & Competition, zero Meta paid spend (pure signal-gathering).',
    paidRule: 'No Meta spend yet — gathering pure organic resonance signals.',
    badgeColor: 'emerald',
    weeklyCadence: {
      cold_calls: '3–5 reels/week',
      vibe_coding_events: '2–3 teaser/promo posts',
      music_video_competition: '1–2 announcement posts',
      educational: '2 posts/week',
      maserati_narrative: '5–7 posts/week (Daily spine)'
    }
  },
  {
    phase: 2,
    days: 'Days 31–60',
    title: 'Phase 2: Validate, Launch Big Swings & Paid Amplification',
    goal: 'Run Event #1 in Umhlanga, open music video entries, and allocate ~R150–R200/day Meta spend behind organic winners.',
    paidRule: 'Allocate R150–200/day behind posts with >20 saves or >4.5% engagement rate.',
    badgeColor: 'amber',
    weeklyCadence: {
      cold_calls: '3–5 reels/week (double down on winners)',
      vibe_coding_events: 'Event #1 footage batch dump (4-way multiply)',
      music_video_competition: 'Creator submissions & BTS highlights',
      educational: '2 posts/week (surface cold-call objections)',
      maserati_narrative: '5–7 posts/week (Event #1 momentum proofs)'
    }
  },
  {
    phase: 3,
    days: 'Days 61–90',
    title: 'Phase 3: Systemise, Run Event #2 & Crown Competition Winner',
    goal: 'Systemised production, run Event #2 at 2nd venue, judge/announce NO SKIP music video winner, and scale paid spend.',
    paidRule: 'Scale budget only on proven creative with compounding saves/shares.',
    badgeColor: 'purple',
    weeklyCadence: {
      cold_calls: 'Fully systemised batch recording',
      vibe_coding_events: 'Run Event #2 & measure content yield',
      music_video_competition: 'Announce Winner & release official video',
      educational: 'Retire weak formats, amplify myth-busters',
      maserati_narrative: 'Daily founder milestone & momentum climax'
    }
  }
];

export const SAMPLE_30_60_90_SCHEDULE = [
  // Phase 1 (Days 1-30)
  {
    day: 1,
    phase: 1,
    pillar: 'educational',
    account: 'launchgremlin',
    title: 'The R15,000 Website Myth for SA Small Businesses',
    format: 'talking_clip',
    suggestedTime: '08:30 SAST',
    status: 'APPROVED',
    intakeId: 'LG-EDU-001',
    hook: '90% of SA small business websites make this exact mistake — here is the 5-minute fix.',
    isPaidBoost: false
  },
  {
    day: 2,
    phase: 1,
    pillar: 'maserati_narrative',
    account: 'needmoney4maserati',
    title: 'Road to Maserati #1: Automating the LaunchGremlin Engine',
    format: 'talking_clip',
    suggestedTime: '12:15 SAST',
    status: 'APPROVED',
    intakeId: 'MAS-NAR-001',
    proofPointRef: 'LG-EDU-001',
    hook: 'Here is why building the content engine in public brings me one step closer to the Maserati.',
    isPaidBoost: false
  },
  {
    day: 3,
    phase: 1,
    pillar: 'cold_calls',
    account: 'launchgremlin',
    title: 'Cold Calling 20 Durban Business Owners on WhatsApp',
    format: 'talking_clip',
    suggestedTime: '17:00 SAST',
    status: 'SCHEDULED',
    intakeId: 'LG-COLD-001',
    hook: 'We called 20 local business owners. Here is what they ACTUALLY said about their websites.',
    isPaidBoost: false
  },
  {
    day: 4,
    phase: 1,
    pillar: 'educational',
    account: 'launchgremlin',
    title: 'Why Static PDF Brochures are Losing You WhatsApp Inquiries',
    format: 'carousel',
    suggestedTime: '11:00 SAST',
    status: 'SCHEDULED',
    intakeId: 'LG-EDU-002',
    hook: 'Paper business cards and PDF brochures get lost in chat. Digital cards load in 0.3s.',
    isPaidBoost: false
  },
  {
    day: 5,
    phase: 1,
    pillar: 'maserati_narrative',
    account: 'needmoney4maserati',
    title: 'Why SA Agencies Charge R25k For What Takes 2 Hours',
    format: 'caption_only',
    suggestedTime: '18:30 SAST',
    status: 'DRAFTED',
    intakeId: 'MAS-NAR-002',
    proofPointRef: 'LG-COLD-001',
    hook: 'I used to think this took 3 weeks. We just proved it takes 24 hours.',
    isPaidBoost: false
  },
  {
    day: 7,
    phase: 1,
    pillar: 'music_video_competition',
    account: 'launchgremlin',
    title: 'Announcing the NO SKIP Durban Music Video Challenge',
    format: 'talking_clip',
    suggestedTime: '14:00 SAST',
    status: 'DRAFTED',
    intakeId: 'LG-COMP-001',
    hook: 'Calling all SA videographers: shoot the official visual for NO SKIP and win big.',
    isPaidBoost: false
  },
  {
    day: 10,
    phase: 1,
    pillar: 'vibe_coding_events',
    account: 'launchgremlin',
    title: 'Vibe-Coding Event #1 Announcement: Umhlanga Build Session',
    format: 'carousel',
    suggestedTime: '09:00 SAST',
    status: 'DRAFTED',
    intakeId: 'LG-EVT-001',
    hook: 'What happens when you put 10 non-technical founders in a room in Umhlanga for 3 hours?',
    isPaidBoost: false
  },
  // Phase 2 (Days 31-60)
  {
    day: 32,
    phase: 2,
    pillar: 'educational',
    account: 'launchgremlin',
    title: 'Top 3 Conversion Traps Caught in Cold Call Audits',
    format: 'talking_clip',
    suggestedTime: '10:00 SAST',
    status: 'PAID_WINNER',
    intakeId: 'LG-EDU-003',
    hook: 'Why paying R15,000 for a static website in 2026 is officially a trap.',
    isPaidBoost: true,
    paidSpend: 'R150/day',
    paidScore: '7.8% Engagement'
  },
  {
    day: 35,
    phase: 2,
    pillar: 'vibe_coding_events',
    account: 'launchgremlin',
    title: 'Event #1 Live Recap: 10 Founders Built 10 Apps',
    format: 'before_after',
    suggestedTime: '16:00 SAST',
    status: 'PAID_WINNER',
    intakeId: 'LG-EVT-002',
    hook: 'We put 10 non-technical founders in a room and built 10 live web apps in 3 hours.',
    isPaidBoost: true,
    paidSpend: 'R200/day',
    paidScore: '9.2% Engagement'
  },
  {
    day: 42,
    phase: 2,
    pillar: 'maserati_narrative',
    account: 'needmoney4maserati',
    title: 'Event #1 Yielded 8 Paid Retainers — Maserati Milestone #5',
    format: 'talking_clip',
    suggestedTime: '13:00 SAST',
    status: 'SCHEDULED',
    intakeId: 'MAS-NAR-003',
    proofPointRef: 'LG-EVT-002',
    hook: 'The biggest risk I took this month was hosting 10 founders for free. Here is the financial result.',
    isPaidBoost: false
  },
  {
    day: 48,
    phase: 2,
    pillar: 'music_video_competition',
    account: 'launchgremlin',
    title: '5 Videographer Submissions Received: Behind The Scenes',
    format: 'carousel',
    suggestedTime: '15:30 SAST',
    status: 'SCHEDULED',
    intakeId: 'LG-COMP-002',
    hook: 'We gave 5 Durban videographers the exact same audio track. Here are 5 completely different visions.',
    isPaidBoost: false
  },
  // Phase 3 (Days 61-90)
  {
    day: 65,
    phase: 3,
    pillar: 'vibe_coding_events',
    account: 'launchgremlin',
    title: 'Event #2 at Ballito: Scaling the Builder Community',
    format: 'talking_clip',
    suggestedTime: '11:00 SAST',
    status: 'SCHEDULED',
    intakeId: 'LG-EVT-003',
    hook: 'Ballito founders: here is what happened at Event #2.',
    isPaidBoost: false
  },
  {
    day: 75,
    phase: 3,
    pillar: 'music_video_competition',
    account: 'launchgremlin',
    title: 'Crowing the NO SKIP Music Video Winner 🏆',
    format: 'talking_clip',
    suggestedTime: '18:00 SAST',
    status: 'PAID_WINNER',
    intakeId: 'LG-COMP-003',
    hook: 'The official NO SKIP music video winner has been chosen by the Durban community.',
    isPaidBoost: true,
    paidSpend: 'R250/day',
    paidScore: '12.4% Engagement'
  },
  {
    day: 85,
    phase: 3,
    pillar: 'maserati_narrative',
    account: 'needmoney4maserati',
    title: 'Day 85: 90-Day Content Engine Review & Next Quarter Goal',
    format: 'talking_clip',
    suggestedTime: '12:00 SAST',
    status: 'SCHEDULED',
    intakeId: 'MAS-NAR-004',
    proofPointRef: 'LG-COMP-003',
    hook: '90 days ago we had zero automated content. Today we have a machine funding the Maserati.',
    isPaidBoost: false
  }
];

/**
 * Derives a @needmoney4maserati narrative package directly from an approved LaunchGremlin draft or intake item.
 */
export function deriveMaseratiPackage(sourceItem) {
  const proofId = sourceItem.intake_id || sourceItem.id || 'LG-EDU-001';
  const sourceTitle = sourceItem.title || 'LaunchGremlin Milestone';
  const sourceContent = sourceItem.content || sourceItem.chosen_hook || '';

  const newId = `MAS-NAR-${Date.now().toString().slice(-3)}`;
  const title = `Road to Maserati: ${sourceTitle}`;

  const candidateHooks = [
    {
      rank: 1,
      hook: `Here's how ${sourceTitle.toLowerCase()} is getting me one step closer to the Maserati.`,
      rationale: 'High curiosity and direct tie-in to the founder build-in-public milestone.',
      style: 'Momentum / High-Stakes'
    },
    {
      rank: 2,
      hook: `Most people said this was impossible in Durban. Proof point ${proofId} proved them wrong.`,
      rationale: 'Social proof and local defiance that hooks ambitious entrepreneurs.',
      style: 'Contrarian / Proof'
    },
    {
      rank: 3,
      hook: `The real numbers behind ${sourceTitle.toLowerCase()} (no sugarcoating).`,
      rationale: 'Radical transparency hook that builds deep community trust.',
      style: 'Financial BTS / Transparency'
    },
    {
      rank: 4,
      hook: `If you are building a tech business in South Africa right now, do not make the mistake I almost made.`,
      rationale: 'Urgent value warning for local founders.',
      style: 'Founder Cautionary Lesson'
    }
  ];

  const chosenHook = candidateHooks[0].hook;
  const cta = ENGINE_VOICES.needmoney4maserati.cta;

  const talkingClip = {
    format: 'talking_clip',
    title: `Reel/TikTok: ${title}`,
    hook: chosenHook,
    duration: '45-60s',
    scenes: [
      {
        scene: 1,
        visual: 'Founder looking straight to camera with raw, energetic delivery. High contrast text banner.',
        audio_spoken: chosenHook,
        on_screen_text: 'ROAD TO THE MASERATI 🏎️💨'
      },
      {
        scene: 2,
        visual: `B-Roll of LaunchGremlin dashboard, code editor, or client proof (${proofId}).`,
        audio_spoken: `Here is the raw truth. When we launched ${sourceTitle.toLowerCase()}, our goal was to prove that speed beats polish in South Africa.`,
        on_screen_text: `Proof Point: ${proofId} 📈`
      },
      {
        scene: 3,
        visual: 'Founder showing phone screen with live traction / WhatsApp inquiries / live tools.',
        audio_spoken: `We cut out 3 weeks of standard agency fluff. The result? Real clients, real traction, and one more milestone checked off.`,
        on_screen_text: 'Cadence > Overthinking ⚡'
      },
      {
        scene: 4,
        visual: 'Founder wrapping up with signature Maserati countdown badge.',
        audio_spoken: cta,
        on_screen_text: 'Follow the Journey 🏁'
      }
    ],
    captions: {
      instagram: `${chosenHook}\n\nDerived from LaunchGremlin proof point [${proofId}]: ${sourceContent.slice(0, 180)}...\n\nEvery day we build in public. Speed beats perfection.\n\n🏎️ ${cta}\n\n#needmoney4maserati #BuildInPublic #SouthAfricaEntrepreneurs #DurbanTech #FounderLife #LaunchGremlin`,
      tiktok: `${chosenHook} 🏎️ Proof that speed beats polish in SA. Follow for daily milestones! #buildinpublic #southafrica #maserati #entrepreneur`,
      facebook: `${chosenHook}\n\nBehind the scenes of building LaunchGremlin: ${sourceContent.slice(0, 200)}...\n\n${cta}`
    }
  };

  const carousel = {
    format: 'carousel',
    title: `5-Slide Carousel: ${title}`,
    slide_count: 5,
    slides: [
      {
        slide_number: 1,
        type: 'Cover',
        headline: chosenHook,
        visual_cue: 'Amber and dark grey high-contrast typography with founder monogram.'
      },
      {
        slide_number: 2,
        type: 'The Milestone',
        headline: `Proof Point: ${proofId}`,
        body: `What we tested: ${sourceTitle}.\n\nThe conventional way takes 4 weeks and R20,000. We delivered it in under 48 hours.`,
        visual_cue: 'Data card showing speed and cost comparison.'
      },
      {
        slide_number: 3,
        type: 'The Harsh Lesson',
        headline: 'What Broke Along the Way',
        body: 'Over-engineering features nobody asked for. We stripped 60% of unnecessary complexity to double mobile conversion.',
        visual_cue: 'Clean bulleted takeaway box.'
      },
      {
        slide_number: 4,
        type: 'The Framework',
        headline: 'How to Apply This in Your Business',
        body: '1. Ship the MVP in 24 hours.\n2. Talk to 10 real users immediately.\n3. Iterate based on clicks, not opinions.',
        visual_cue: '3-step action roadmap.'
      },
      {
        slide_number: 5,
        type: 'CTA',
        headline: 'Follow the Journey 🏎️',
        body: `${cta}\n\nSave this post if you are building in public too!`,
        visual_cue: 'Maserati badge animation cue.'
      }
    ]
  };

  const beforeAfter = {
    format: 'before_after',
    title: `Founder Contrast: ${title}`,
    before_state: {
      label: 'Before: Stuck in Perfectionism',
      description: 'Waiting for the perfect design, spending weeks drafting scopes without client feedback.',
      badge: '🐌 Slow & Costly'
    },
    after_state: {
      label: 'After: Ruthless Cadence',
      description: `Shipping proof points like ${proofId} daily, building in public, letting market demand guide the roadmap.`,
      badge: '🚀 Speed to Maserati'
    },
    visual_direction: 'Side by side founder workspace screenshot showing messy iterations turned into live product.',
    post_caption: `${chosenHook}\n\nProof point [${proofId}]: ${sourceTitle}.\n\n👉 ${cta}`
  };

  const captionOnly = {
    format: 'caption_only',
    title: `Founder Thought Post: ${title}`,
    text: `${chosenHook}\n\nDerived from LaunchGremlin milestone [${proofId}]:\n\n1. Stop waiting for permission or massive budgets.\n2. Build the smallest functional prototype and test it today.\n3. Document the journey — people support momentum, not perfection.\n\n🏎️ ${cta}\n\n#needmoney4maserati #BuildInPublic #LaunchGremlin`
  };

  return {
    intake_id: newId,
    account: 'needmoney4maserati',
    pillar: 'maserati_narrative',
    title,
    proofPointRef: proofId,
    status: 'PENDING_REVIEW',
    suggested_post_time: 'Tomorrow, 12:30 SAST',
    created_at: new Date().toISOString(),
    candidate_hooks: candidateHooks,
    chosen_hook: chosenHook,
    cta,
    formats: {
      talking_clip: talkingClip,
      carousel,
      before_after: beforeAfter,
      caption_only: captionOnly
    }
  };
}

/**
 * Generates ready-to-post markdown brief string matching the Python engine format.
 */
export function generateMarkdownBrief(draftPackage) {
  const { intake_id, account, pillar, title, chosen_hook, cta, formats } = draftPackage;
  const tc = formats?.talking_clip || {};
  const car = formats?.carousel || {};
  const ba = formats?.before_after || {};
  const co = formats?.caption_only || {};

  return `# READY TO POST BRIEF: ${intake_id}
**Account:** @${account}
**Pillar:** ${pillar}
**Title:** ${title}
**Chosen Hook:** "${chosen_hook}"
**Default CTA:** ${cta}
**Generated At:** ${new Date().toISOString()}

---

## 1. Short-Form Video (Reels / TikTok / Shorts)
**Estimated Duration:** ${tc.duration || '45-60s'}
**Hook:** "${tc.hook || chosen_hook}"

### Scene Breakdown:
${tc.scenes?.map(sc => `### Scene ${sc.scene}:
- **Visual Direction:** ${sc.visual}
- **Audio Spoken:** "${sc.audio_spoken}"
- **On-Screen Text:** \`${sc.on_screen_text}\``).join('\n\n') || 'N/A'}

### Captions:
#### Instagram Caption:
\`\`\`
${tc.captions?.instagram || ''}
\`\`\`

#### TikTok Caption:
\`\`\`
${tc.captions?.tiktok || ''}
\`\`\`

#### Facebook Caption:
\`\`\`
${tc.captions?.facebook || ''}
\`\`\`

---

## 2. 5-Slide Carousel Guide
**Total Slides:** ${car.slide_count || 5}

${car.slides?.map(sl => `### Slide ${sl.slide_number} (${sl.type})
- **Headline:** ${sl.headline}
${sl.body ? `- **Body Copy:**\n  ${sl.body}` : ''}
- **Visual Cue:** ${sl.visual_cue}`).join('\n\n') || 'N/A'}

---

## 3. Before & After Visual Case Proof
- **Before State (${ba.before_state?.badge || 'Old'}):** ${ba.before_state?.description || ''}
- **After State (${ba.after_state?.badge || 'New'}):** ${ba.after_state?.description || ''}
- **Visual Direction:** ${ba.visual_direction || ''}
- **Post Caption:**
\`\`\`
${ba.post_caption || ''}
\`\`\`

---

## 4. Standalone Micro-Blog Post
\`\`\`
${co.text || ''}
\`\`\`
`;
}

