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
    keywords: 'website design, content strategy, AI consulting, web development, growth marketing, AI workflows, LLM integration, Lighthouse 100',
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
        answer: 'Most standard business websites are delivered within 7 to 10 business days. For urgent projects, we offer a 72-Hour MVP launch guarantee.'
      }
    ]
  },
  blog: {
    path: '/blog',
    title: 'Content Hub & Knowledge Base | 100 Strategic Guides | LaunchGremlin',
    description: 'Explore 100 strategic articles on Web Design, AI Automation, Small Business, Startup Growth, Personal Branding, SEO, and Content Strategy.',
    keywords: 'SEO blog, content hub, web design guides, AI automation tutorials, startup growth articles, SEO strategy',
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
    keywords: 'custom website design, React web development, Next.js agency, sub-second page loads, conversion optimization, responsive web apps',
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
      description: 'Custom-engineered, sub-second web applications built for extreme speed, flawless responsiveness, and maximum lead conversion.'
    }
  },
  'content-strategy': {
    path: '/content-strategy',
    title: 'Data-Driven Content Strategy & Audience Growth | LaunchGremlin',
    description: 'Dominate search results and convert viewers into clients with data-backed content strategies, multi-channel distribution funnels, and retention scripts.',
    keywords: 'content strategy, audience growth, creator marketing, multi-channel content distribution, SEO content, viral funnels',
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
    keywords: 'AI consulting, custom AI agents, LLM integration, workflow automation, vector search RAG, business process automation',
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
    sameAs: [
      'https://www.instagram.com/launchgremlin/',
      'https://www.tiktok.com/@launchgremlin'
    ],
    publishingPrinciples: `${SITE_DOMAIN}/privacy`
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_DOMAIN}/#website`,
    url: SITE_DOMAIN,
    name: 'LaunchGremlin',
    publisher: { '@id': `${SITE_DOMAIN}/#organization` }
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
      provider: { '@id': `${SITE_DOMAIN}/#organization` }
    };
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
