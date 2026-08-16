// SEO Metadata and Schema.org Generator for LaunchGremlin.com
import { INDUSTRIES_DATA } from './industryData.js';
import { BLOG_ARTICLES } from './blogData.js';
import { LONG_TAIL_PAGES } from './longTailData.js';

export const SITE_DOMAIN = 'https://launchgremlin.com';

export const BASE_SEO_DATA = {
  home: {
    path: '/',
    title: 'LaunchGremlin — Build, Grow, Scale | Websites, Content Strategy & AI Consulting',
    description: 'LaunchGremlin helps creators and ambitious businesses build high-performance websites, execute data-driven content strategies, and integrate enterprise AI automation.',
    keywords: 'website design, content strategy, AI consulting, web development, growth marketing, AI workflows, LLM integration, Lighthouse 100, creator growth, digital agency',
    canonical: `${SITE_DOMAIN}/`,
    ogType: 'website',
    ogImage: `${SITE_DOMAIN}/og-image.png`,
    ogImageAlt: 'LaunchGremlin - Build, Grow, Scale',
    breadcrumbs: [
      { name: 'Home', item: `${SITE_DOMAIN}/` }
    ],
    faqs: [
      {
        question: 'What services does LaunchGremlin offer?',
        answer: 'LaunchGremlin provides high-performance web development, data-driven content strategy, and custom enterprise AI consulting and workflow automation.'
      },
      {
        question: 'How fast can LaunchGremlin build a website?',
        answer: 'Most standard business websites are delivered within 7 to 10 business days. For urgent projects, we offer a 72-Hour MVP launch sprint.'
      },
      {
        question: 'Who is LaunchGremlin designed for?',
        answer: 'LaunchGremlin is built specifically for creators, independent consultants, founders, and high-growth modern businesses looking to scale their online presence.'
      },
      {
        question: 'What technologies does LaunchGremlin use?',
        answer: 'We build with React, Next.js, Vite, Tailwind CSS, Python LLM pipelines, and vector database architectures optimized for 100/100 Core Web Vitals performance.'
      }
    ]
  },
  blog: {
    path: '/blog',
    title: 'Content Hub & Knowledge Base | 100 Strategic Guides | LaunchGremlin',
    description: 'Explore 100 strategic articles on Web Design, AI Automation, Small Business, Startup Growth, Personal Branding, SEO, and Content Strategy.',
    keywords: 'SEO blog, content hub, web design guides, AI automation tutorials, startup growth articles, SEO strategy, creator tools',
    canonical: `${SITE_DOMAIN}/blog`,
    ogType: 'website',
    ogImage: `${SITE_DOMAIN}/og-image.png`,
    ogImageAlt: 'LaunchGremlin Content Hub',
    breadcrumbs: [
      { name: 'Home', item: `${SITE_DOMAIN}/` },
      { name: 'Content Hub', item: `${SITE_DOMAIN}/blog` }
    ]
  },
  websites: {
    path: '/websites',
    title: 'High-Performance Website Design & Engineering | LaunchGremlin',
    description: 'Custom, sub-second web applications built with Vite, React & Next.js for high conversion, search engine indexing, and 100/100 Core Web Vitals performance.',
    keywords: 'custom website design, React web development, Next.js agency, sub-second page loads, conversion optimization, responsive web apps, high converting landing page',
    canonical: `${SITE_DOMAIN}/websites`,
    ogType: 'service',
    ogImage: `${SITE_DOMAIN}/og-image.png`,
    ogImageAlt: 'LaunchGremlin Website Design & Digital Products',
    breadcrumbs: [
      { name: 'Home', item: `${SITE_DOMAIN}/` },
      { name: 'Websites & Digital Products', item: `${SITE_DOMAIN}/websites` }
    ],
    service: {
      name: 'High-Performance Web Design & Engineering',
      serviceType: 'Web Development',
      description: 'Custom-engineered, sub-second web applications built for extreme speed, flawless responsiveness, and maximum lead conversion.',
      offers: {
        '@type': 'Offer',
        price: '499.00',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock'
      }
    }
  },
  'business-cards': {
    path: '/business-cards',
    title: 'Free Digital Business Card Generator with QR Code & NFC | LaunchGremlin',
    description: 'Create and customize your free mobile-first digital business card with tap-to-call, instant QR code export, vCard contact saving, 3D card preview, and lead capture exchange in seconds.',
    keywords: 'digital business card generator, free digital business card, QR code business card, vCard export, mobile business card, electronic business card, NFC card builder, LaunchGremlin tool',
    canonical: `${SITE_DOMAIN}/business-cards`,
    ogType: 'website',
    ogImage: `${SITE_DOMAIN}/og-image.png`,
    ogImageAlt: 'LaunchGremlin Digital Business Card Generator',
    breadcrumbs: [
      { name: 'Home', item: `${SITE_DOMAIN}/` },
      { name: 'Digital Business Card Generator', item: `${SITE_DOMAIN}/business-cards` }
    ],
    softwareApplication: {
      name: 'LaunchGremlin Digital Business Card Generator',
      operatingSystem: 'All (Web, iOS, Android)',
      applicationCategory: 'BusinessApplication',
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD'
      },
      featureList: [
        'Interactive Mobile Digital Card View',
        '3D Flip Physical Card Preview',
        'Instant vCard (.vcf) Contact Download',
        'High-Resolution QR Code PNG Export',
        'NFC Card Programming Support',
        'Lead Exchange Contact Form',
        '6 Creator & Executive Theme Presets'
      ]
    },
    faqs: [
      {
        question: 'Is the Digital Business Card Generator completely free?',
        answer: 'Yes, 100% free with no login, credit card, or account required. You can generate custom cards, export scannable QR codes, and download vCards anytime.'
      },
      {
        question: 'Can I print physical business cards from this generator?',
        answer: 'Yes! The generator includes a ready-to-print 3.5" x 2" physical card template with front and back layouts, brand accent colors, and scannable QR code.'
      },
      {
        question: 'How do I program an NFC card with my LaunchGremlin digital card?',
        answer: 'Copy your generated share link and write it to any standard blank NTAG213/215/216 NFC card using the free NFC Tools app on iPhone or Android in 60 seconds.'
      },
      {
        question: 'Does the recipient need an app to open my digital card?',
        answer: 'No. The digital business card opens instantly in any mobile browser when scanned via QR code or tapped via NFC.'
      }
    ]
  },
  c: {
    path: '/c',
    title: 'Digital Business Card Viewer | LaunchGremlin',
    description: 'View interactive digital business cards, sync contact info directly with vCard 3.0, and exchange professional details seamlessly.',
    keywords: 'digital business card, electronic business card, NFC card viewer, vCard download, LaunchGremlin card',
    canonical: `${SITE_DOMAIN}/c`,
    ogType: 'profile',
    ogImage: `${SITE_DOMAIN}/og-image.png`,
    ogImageAlt: 'LaunchGremlin Digital Business Card Viewer',
    breadcrumbs: [
      { name: 'Home', item: `${SITE_DOMAIN}/` },
      { name: 'Digital Cards', item: `${SITE_DOMAIN}/business-cards` },
      { name: 'Card Viewer', item: `${SITE_DOMAIN}/c` }
    ]
  },
  'c/card': {
    path: '/c/card',
    title: 'Digital Business Card | LaunchGremlin',
    description: 'Interactive digital business card profile with instant 1-tap contact sync (.vcf) and lead exchange.',
    keywords: 'digital business card, vCard, NFC card profile',
    canonical: `${SITE_DOMAIN}/c/card`,
    ogType: 'profile',
    ogImage: `${SITE_DOMAIN}/og-image.png`,
    ogImageAlt: 'Digital Business Card'
  },
  'c/alex-morgan': {
    path: '/c/alex-morgan',
    title: 'Alex Morgan — Lead Product Designer | Digital Business Card',
    description: 'Connect with Alex Morgan (Vertex Studio). Designing intuitive digital products, brand identities, and high-conversion web experiences.',
    keywords: 'Alex Morgan, Product Designer, Vertex Studio, digital business card',
    canonical: `${SITE_DOMAIN}/c/alex-morgan`,
    ogType: 'profile',
    ogImage: `${SITE_DOMAIN}/og-image.png`,
    ogImageAlt: 'Alex Morgan Digital Business Card'
  },
  'c/elena-rostova': {
    path: '/c/elena-rostova',
    title: 'Elena Rostova — Executive Brand Strategist | Digital Business Card',
    description: 'Connect with Elena Rostova (Luxe Advisory Group). Advising luxury hospitality and premier lifestyle brands.',
    keywords: 'Elena Rostova, Brand Strategist, Luxe Advisory, digital business card',
    canonical: `${SITE_DOMAIN}/c/elena-rostova`,
    ogType: 'profile',
    ogImage: `${SITE_DOMAIN}/og-image.png`,
    ogImageAlt: 'Elena Rostova Digital Business Card'
  },
  'c/jordan-hayes': {
    path: '/c/jordan-hayes',
    title: 'Jordan Hayes — Tech Creator & AI Podcaster | Digital Business Card',
    description: 'Connect with Jordan Hayes (The Prompt Club). Making emerging AI tools and creator workflows practical.',
    keywords: 'Jordan Hayes, The Prompt Club, AI podcast, digital business card',
    canonical: `${SITE_DOMAIN}/c/jordan-hayes`,
    ogType: 'profile',
    ogImage: `${SITE_DOMAIN}/og-image.png`,
    ogImageAlt: 'Jordan Hayes Digital Business Card'
  },
  'c/marco-rossi': {
    path: '/c/marco-rossi',
    title: 'Marco Rossi — Founder & Master Roaster | Digital Business Card',
    description: 'Connect with Marco Rossi (Caffè Luminosa). Specialty micro-lot coffee roasted fresh in Brooklyn.',
    keywords: 'Marco Rossi, Caffè Luminosa, coffee roaster, digital business card',
    canonical: `${SITE_DOMAIN}/c/marco-rossi`,
    ogType: 'profile',
    ogImage: `${SITE_DOMAIN}/og-image.png`,
    ogImageAlt: 'Marco Rossi Digital Business Card'
  },
  'c/dr-maya-patel': {
    path: '/c/dr-maya-patel',
    title: 'Dr. Maya Patel, MD — Founder & Clinical Director | Digital Business Card',
    description: 'Connect with Dr. Maya Patel (Nova Longevity Institute). Personalized preventative medicine and metabolic health optimization.',
    keywords: 'Dr. Maya Patel, Nova Longevity Institute, preventative medicine, digital business card',
    canonical: `${SITE_DOMAIN}/c/dr-maya-patel`,
    ogType: 'profile',
    ogImage: `${SITE_DOMAIN}/og-image.png`,
    ogImageAlt: 'Dr. Maya Patel Digital Business Card'
  },
  'c/liam-vance': {
    path: '/c/liam-vance',
    title: 'Liam Vance — Principal Advisor & Broker | Digital Business Card',
    description: 'Connect with Liam Vance (Vance Capital Real Estate). Premier commercial acquisitions and trophy residential estates.',
    keywords: 'Liam Vance, Vance Capital Real Estate, commercial broker, digital business card',
    canonical: `${SITE_DOMAIN}/c/liam-vance`,
    ogType: 'profile',
    ogImage: `${SITE_DOMAIN}/og-image.png`,
    ogImageAlt: 'Liam Vance Digital Business Card'
  },
  proposal: {
    path: '/proposal',
    title: 'Interactive Project Scope & AI Proposal Generator | LaunchGremlin',
    description: 'Configure your custom web engineering, content strategy, and AI automation project scope. Calculate real-time pricing and timeline estimates, and export an executive technical proposal instantly.',
    keywords: 'project scope calculator, web development cost estimator, AI proposal generator, project pricing calculator, software quote generator, LaunchGremlin tool',
    canonical: `${SITE_DOMAIN}/proposal`,
    ogType: 'website',
    ogImage: `${SITE_DOMAIN}/og-image.png`,
    ogImageAlt: 'LaunchGremlin Interactive Project Scope & AI Proposal Generator',
    breadcrumbs: [
      { name: 'Home', item: `${SITE_DOMAIN}/` },
      { name: 'Scope & Quote Generator', item: `${SITE_DOMAIN}/proposal` }
    ],
    softwareApplication: {
      name: 'LaunchGremlin Project Scope & AI Proposal Generator',
      operatingSystem: 'All (Web, iOS, Android)',
      applicationCategory: 'BusinessApplication',
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD'
      },
      featureList: [
        'Multi-Pillar Scope Matrix (Web, Content, AI)',
        'Real-Time Currency Calculation (USD / ZAR)',
        'Emergency 72-Hour vs. Standard Sprints',
        'Executive Technical Strategy Brief Compilation',
        'Printable PDF / Markdown Export',
        '1-Click Quote Lock-In & Lead Dispatch'
      ]
    },
    faqs: [
      {
        question: 'How accurate is the LaunchGremlin project cost calculator?',
        answer: 'The calculator estimates are based on our fixed production sprint models (72-Hour MVP, 2-Week Launch, 4-Week Enterprise) and deliver exact baseline pricing for standard feature sets.'
      },
      {
        question: 'Can I export the generated proposal for my team or stakeholders?',
        answer: 'Yes. You can copy the full Markdown strategy brief or use the 1-click Print/PDF export tool with clean executive styling.'
      }
    ]
  },
  resources: {
    path: '/resources',
    title: 'Free Creator Studio, Notion OS & AI Prompt Vault | LaunchGremlin',
    description: 'Download free production-grade Notion operating systems, curated AI prompt chains with live variable injectors, and technical web architecture cheat sheets.',
    keywords: 'creator studio, free notion templates, AI prompt library, viral hook templates, client onboarding notion, Core Web Vitals cheat sheet, LaunchGremlin resources',
    canonical: `${SITE_DOMAIN}/resources`,
    ogType: 'website',
    ogImage: `${SITE_DOMAIN}/og-image.png`,
    ogImageAlt: 'LaunchGremlin Free Creator Studio & Resource Vault',
    breadcrumbs: [
      { name: 'Home', item: `${SITE_DOMAIN}/` },
      { name: 'Creator Studio & Vault', item: `${SITE_DOMAIN}/resources` }
    ],
    softwareApplication: {
      name: 'LaunchGremlin Creator Studio & Resource Vault',
      operatingSystem: 'All (Web, iOS, Android, Notion)',
      applicationCategory: 'ProductivityApplication',
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD'
      },
      featureList: [
        'Production Notion Operating Systems',
        'Interactive AI Prompt Vault with Variable Injector',
        '100/100 Core Web Vitals Optimization Checklist',
        '50 Viral Hook Frameworks Swipe File',
        '1-Click Direct Markdown & Raw Template Copying'
      ]
    },
    faqs: [
      {
        question: 'Are all templates and prompts in the LaunchGremlin Creator Studio really free?',
        answer: 'Yes. All Notion operating systems, AI prompt chains, and architecture cheat sheets are 100% free to duplicate and customize with zero paywalls.'
      },
      {
        question: 'How do I duplicate the Notion templates into my own workspace?',
        answer: 'Click "Preview & Use" or the external link on any template card, and click "Duplicate" in the top right corner of Notion.'
      }
    ]
  },
  'content-strategy': {
    path: '/content-strategy',
    title: 'Data-Driven Content Strategy & Audience Growth | LaunchGremlin',
    description: 'Dominate search results and convert viewers into clients with data-backed content strategies, multi-channel distribution funnels, and retention scripts.',
    keywords: 'content strategy, audience growth, creator marketing, multi-channel content distribution, SEO content, viral funnels, YouTube scripting, TikTok strategy',
    canonical: `${SITE_DOMAIN}/content-strategy`,
    ogType: 'service',
    ogImage: `${SITE_DOMAIN}/og-image.png`,
    ogImageAlt: 'LaunchGremlin Content Strategy & Audience Engine',
    breadcrumbs: [
      { name: 'Home', item: `${SITE_DOMAIN}/` },
      { name: 'Content Strategy & Audience', item: `${SITE_DOMAIN}/content-strategy` }
    ],
    service: {
      name: 'Content Strategy & Audience Growth Engine',
      serviceType: 'Content Marketing & Audience Growth',
      description: 'Data-driven content funnels, short-form video scripting, 30-day AI-optimized content calendars, and 5-platform repurposing.'
    }
  },
  'ai-consulting': {
    path: '/ai-consulting',
    title: 'Enterprise AI Consulting & Workflow Automation | LaunchGremlin',
    description: 'Automate business workflows and deploy custom AI agents, LLM pipelines, and vector search RAG systems designed to save hundreds of hours monthly.',
    keywords: 'AI consulting, custom AI agents, LLM integration, workflow automation, vector search RAG, business process automation, generative AI solutions',
    canonical: `${SITE_DOMAIN}/ai-consulting`,
    ogType: 'service',
    ogImage: `${SITE_DOMAIN}/og-image.png`,
    ogImageAlt: 'LaunchGremlin AI Consulting & Automation',
    breadcrumbs: [
      { name: 'Home', item: `${SITE_DOMAIN}/` },
      { name: 'AI Consulting & Workflows', item: `${SITE_DOMAIN}/ai-consulting` }
    ],
    service: {
      name: 'Enterprise AI Consulting & Custom Agents',
      serviceType: 'AI Engineering & Automation Consulting',
      description: 'Autonomous 24/7 AI agents, CRM and database workflow pipelines, and secure internal documentation vector search RAG systems.'
    }
  },
  about: {
    path: '/about',
    title: 'About LaunchGremlin | Internet-Native Builders, Mission & Operating Code',
    description: 'Learn how LaunchGremlin helps startups and creators scale through engineering excellence, rapid iteration, and modern AI-assisted product development.',
    canonical: `${SITE_DOMAIN}/about`,
    ogType: 'website',
    ogImage: `${SITE_DOMAIN}/og-image.png`,
    breadcrumbs: [
      { name: 'Home', item: `${SITE_DOMAIN}/` },
      { name: 'About LaunchGremlin', item: `${SITE_DOMAIN}/about` }
    ]
  },
  contact: {
    path: '/contact',
    title: 'Contact LaunchGremlin | Book a Free Strategy Call & Scope Builder',
    description: 'Ready to build, grow, and scale? Get in touch with the LaunchGremlin engineering team today or schedule a free 30-minute strategic consultation.',
    canonical: `${SITE_DOMAIN}/contact`,
    ogType: 'website',
    ogImage: `${SITE_DOMAIN}/og-image.png`,
    breadcrumbs: [
      { name: 'Home', item: `${SITE_DOMAIN}/` },
      { name: 'Contact & Scope Builder', item: `${SITE_DOMAIN}/contact` }
    ]
  },
  privacy: {
    path: '/privacy',
    title: 'Privacy Policy | Data Protection & NDA Security | LaunchGremlin',
    description: 'Read the LaunchGremlin Privacy Policy detailing data confidentiality, security standards, and non-disclosure commitments for clients.',
    canonical: `${SITE_DOMAIN}/privacy`,
    ogType: 'website',
    ogImage: `${SITE_DOMAIN}/og-image.png`,
    breadcrumbs: [
      { name: 'Home', item: `${SITE_DOMAIN}/` },
      { name: 'Privacy Policy', item: `${SITE_DOMAIN}/privacy` }
    ]
  },
  terms: {
    path: '/terms',
    title: 'Terms of Service | Client Service Agreements & Guarantees | LaunchGremlin',
    description: 'LaunchGremlin Terms of Service covering service level agreements, intellectual property rights, 72-Hour MVP sprints, and core guarantees.',
    canonical: `${SITE_DOMAIN}/terms`,
    ogType: 'website',
    ogImage: `${SITE_DOMAIN}/og-image.png`,
    breadcrumbs: [
      { name: 'Home', item: `${SITE_DOMAIN}/` },
      { name: 'Terms of Service', item: `${SITE_DOMAIN}/terms` }
    ]
  },
  cookies: {
    path: '/cookies',
    title: 'Cookie & Tracking Policy | Privacy Compliance | LaunchGremlin',
    description: 'Learn about LaunchGremlin cookie policies, privacy-first analytics, and session management.',
    canonical: `${SITE_DOMAIN}/cookies`,
    ogType: 'website',
    ogImage: `${SITE_DOMAIN}/og-image.png`,
    breadcrumbs: [
      { name: 'Home', item: `${SITE_DOMAIN}/` },
      { name: 'Cookie Policy', item: `${SITE_DOMAIN}/cookies` }
    ]
  }
};

export const SEO_DATA = { ...BASE_SEO_DATA };

// Merge 16 Primary Industry Pages into SEO_DATA
Object.keys(INDUSTRIES_DATA).forEach((key) => {
  const ind = INDUSTRIES_DATA[key];
  SEO_DATA[key] = {
    path: ind.path,
    title: ind.title,
    description: ind.description,
    keywords: ind.keywords,
    canonical: ind.canonical,
    ogType: 'service',
    ogImage: `${SITE_DOMAIN}/og-image.png`,
    ogImageAlt: ind.title,
    breadcrumbs: [
      { name: 'Home', item: `${SITE_DOMAIN}/` },
      { name: 'Websites', item: `${SITE_DOMAIN}/websites` },
      { name: ind.name, item: ind.canonical }
    ],
    service: {
      name: `High-Performance Website Design for ${ind.name}`,
      serviceType: 'Web Development',
      description: ind.heroSubheadline
    },
    faqs: ind.faqs
  };
});

// Merge 100 Blog Articles into SEO_DATA
BLOG_ARTICLES.forEach((article) => {
  const articleKey = `blog/${article.slug}`;
  SEO_DATA[articleKey] = {
    path: `/blog/${article.slug}`,
    title: `${article.title} | LaunchGremlin`,
    description: article.description,
    keywords: article.keywords,
    canonical: `${SITE_DOMAIN}/blog/${article.slug}`,
    ogType: 'article',
    ogImage: article.heroImage || `${SITE_DOMAIN}/og-image.png`,
    ogImageAlt: article.heroImageAlt || article.title,
    publishDate: article.publishDate,
    author: article.author,
    breadcrumbs: [
      { name: 'Home', item: `${SITE_DOMAIN}/` },
      { name: 'Content Hub', item: `${SITE_DOMAIN}/blog` },
      { name: article.title, item: `${SITE_DOMAIN}/blog/${article.slug}` }
    ],
    blogPosting: {
      headline: article.title,
      description: article.description,
      datePublished: article.publishDate,
      dateModified: '2026-08-05',
      authorName: article.author,
      image: article.heroImage
    },
    faqs: article.faqs
  };
});

// Merge 500 Long-Tail Buyer-Intent Pages into SEO_DATA
LONG_TAIL_PAGES.forEach((page) => {
  SEO_DATA[page.slug] = {
    path: page.path,
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    canonical: page.canonical,
    ogType: 'service',
    ogImage: `${SITE_DOMAIN}/og-image.png`,
    ogImageAlt: page.title,
    breadcrumbs: [
      { name: 'Home', item: `${SITE_DOMAIN}/` },
      { name: 'Websites', item: `${SITE_DOMAIN}/websites` },
      { name: page.label, item: page.canonical }
    ],
    service: {
      name: `High-Performance Web Design for ${page.label}`,
      serviceType: 'Web Development',
      description: page.heroSubheadline
    },
    faqs: page.faqs
  };
});

export function getSeoDataForPage(pageKey) {
  if (!pageKey) return SEO_DATA.home;
  if (SEO_DATA[pageKey]) return SEO_DATA[pageKey];

  if (typeof pageKey === 'string' && pageKey.startsWith('blog')) {
    const slug = pageKey.split('/').pop().toLowerCase();
    const articleKey = `blog/${slug}`;
    if (SEO_DATA[articleKey]) return SEO_DATA[articleKey];
  }

  // Alias for digital card viewer
  if (typeof pageKey === 'string' && (pageKey.startsWith('c/') || pageKey === 'c')) {
    return SEO_DATA['business-cards'];
  }

  return SEO_DATA.home;
}

export function generateSchemasForPage(pageKey) {
  const page = getSeoDataForPage(pageKey);

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_DOMAIN}/#organization`,
    name: 'LaunchGremlin',
    url: SITE_DOMAIN,
    logo: `${SITE_DOMAIN}/assets/logo-transparent.png`,
    image: `${SITE_DOMAIN}/og-image.png`,
    description: 'LaunchGremlin helps creators and ambitious businesses build high-performance websites, execute data-driven content strategies, and integrate enterprise AI automation.',
    founder: {
      '@type': 'Person',
      name: 'Bhalisa Sodo',
      jobTitle: 'Founder & Visionary Systems Architect',
      image: `${SITE_DOMAIN}/assets/founder.jpg`,
      sameAs: [
        `${SITE_DOMAIN}/about`
      ]
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support & Sales',
      email: 'bhalisasodo10@gmail.com',
      url: `${SITE_DOMAIN}/contact`,
      availableLanguage: ['English']
    },
    sameAs: [
      'https://www.instagram.com/launchgremlin/',
      'https://www.tiktok.com/@launchgremlin',
      'https://github.com/bhalisasodo'
    ],
    publishingPrinciples: `${SITE_DOMAIN}/privacy`
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_DOMAIN}/#website`,
    url: SITE_DOMAIN,
    name: 'LaunchGremlin',
    publisher: { '@id': `${SITE_DOMAIN}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_DOMAIN}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${page.canonical}#webpage`,
    url: page.canonical,
    name: page.title,
    description: page.description,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${SITE_DOMAIN}/#website` }
  };

  const schemas = [orgSchema, websiteSchema, webPageSchema];

  // SoftwareApplication Schema (for Business Cards Generator)
  if (page.softwareApplication) {
    const appSchema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: page.softwareApplication.name,
      operatingSystem: page.softwareApplication.operatingSystem,
      applicationCategory: page.softwareApplication.applicationCategory,
      offers: page.softwareApplication.offers,
      featureList: page.softwareApplication.featureList,
      publisher: { '@id': `${SITE_DOMAIN}/#organization` }
    };
    schemas.push(appSchema);
  }

  // Breadcrumbs Schema
  if (page.breadcrumbs && page.breadcrumbs.length > 0) {
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: page.breadcrumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.name,
        item: crumb.item
      }))
    };
    schemas.push(breadcrumbSchema);
  }

  // Service Schema
  if (page.service) {
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.service.name,
      serviceType: page.service.serviceType,
      description: page.service.description,
      provider: { '@id': `${SITE_DOMAIN}/#organization` },
      areaServed: 'Worldwide',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: page.service.name,
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: page.service.name
            }
          }
        ]
      }
    };
    if (page.service.offers) {
      serviceSchema.offers = page.service.offers;
    }
    schemas.push(serviceSchema);
  }

  // BlogPosting Schema
  if (page.blogPosting) {
    const blogPostingSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: page.blogPosting.headline,
      description: page.blogPosting.description,
      datePublished: page.blogPosting.datePublished,
      dateModified: page.blogPosting.dateModified || '2026-08-05',
      author: {
        '@type': 'Organization',
        name: 'LaunchGremlin AI Editorial Team',
        url: SITE_DOMAIN
      },
      publisher: {
        '@type': 'Organization',
        '@id': `${SITE_DOMAIN}/#organization`,
        name: 'LaunchGremlin',
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_DOMAIN}/assets/logo-transparent.png`
        }
      },
      image: page.blogPosting.image,
      mainEntityOfPage: page.canonical
    };
    schemas.push(blogPostingSchema);
  }

  // FAQ Schema
  if (page.faqs && page.faqs.length > 0) {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
    schemas.push(faqSchema);
  }

  return schemas;
}
