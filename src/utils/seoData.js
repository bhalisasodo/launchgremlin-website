// SEO Metadata and Schema.org Generator for LaunchGremlin.com
import { INDUSTRIES_DATA } from './industryData.js';

export const SITE_DOMAIN = 'https://launchgremlin.com';

export const BASE_SEO_DATA = {
  home: {
    path: '/',
    title: 'LaunchGremlin — Build, Grow, Scale | Websites, Content Strategy & AI Consulting',
    description: 'LaunchGremlin helps creators and ambitious businesses build high-performance websites, execute data-driven content strategies, and integrate enterprise AI automation.',
    keywords: 'website design, content strategy, AI consulting, web development, growth marketing, AI workflows, LLM integration, Lighthouse 100',
    canonical: `${SITE_DOMAIN}/`,
    ogType: 'website',
    ogImage: `${SITE_DOMAIN}/assets/logo-transparent.png`,
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
      },
      {
        question: 'What technology stack does LaunchGremlin use?',
        answer: 'We build with modern frameworks including React 18, Next.js, Vite, Tailwind CSS, and edge deployment infrastructure for 100/100 Core Web Vitals performance.'
      }
    ]
  },
  websites: {
    path: '/websites',
    title: 'High-Performance Website Design & Engineering | LaunchGremlin',
    description: 'Custom, sub-second web applications built with Vite, React & Next.js for high conversion, search engine indexing, and 100/100 Core Web Vitals performance.',
    keywords: 'custom website design, React web development, Next.js agency, sub-second page loads, conversion optimization, responsive web apps',
    canonical: `${SITE_DOMAIN}/websites`,
    ogType: 'service',
    ogImage: `${SITE_DOMAIN}/assets/logo-transparent.png`,
    ogImageAlt: 'LaunchGremlin Website Design & Digital Products',
    breadcrumbs: [
      { name: 'Home', item: `${SITE_DOMAIN}/` },
      { name: 'Websites & Digital Products', item: `${SITE_DOMAIN}/websites` }
    ],
    service: {
      name: 'High-Performance Web Design & Engineering',
      serviceType: 'Web Development',
      description: 'Custom-engineered, sub-second web applications built for extreme speed, flawless responsiveness, and maximum lead conversion.'
    },
    faqs: [
      {
        question: 'What is included in the Website build service?',
        answer: 'Every website build includes custom responsive React/Next.js frontend development, sub-second page load latency, automated SEO markup, lead capture integration, and Lighthouse 100 score guarantee.'
      },
      {
        question: 'Do you provide post-launch support?',
        answer: 'Yes, all packages include post-launch support, performance monitoring, and content management training.'
      }
    ]
  },
  'content-strategy': {
    path: '/content-strategy',
    title: 'Data-Driven Content Strategy & Audience Growth | LaunchGremlin',
    description: 'Dominate search results and convert viewers into clients with data-backed content strategies, multi-channel distribution funnels, and retention scripts.',
    keywords: 'content strategy, audience growth, creator marketing, multi-channel content distribution, SEO content, viral funnels',
    canonical: `${SITE_DOMAIN}/content-strategy`,
    ogType: 'service',
    ogImage: `${SITE_DOMAIN}/assets/logo-transparent.png`,
    ogImageAlt: 'LaunchGremlin Content Strategy & Audience Engine',
    breadcrumbs: [
      { name: 'Home', item: `${SITE_DOMAIN}/` },
      { name: 'Content Strategy & Audience', item: `${SITE_DOMAIN}/content-strategy` }
    ],
    service: {
      name: 'Content Strategy & Audience Growth Engine',
      serviceType: 'Content Marketing & Audience Growth',
      description: 'Data-driven content funnels, short-form video scripting, 30-day AI-optimized content calendars, and 5-platform repurposing.'
    },
    faqs: [
      {
        question: 'Which social platforms do you support for content distribution?',
        answer: 'We support TikTok, Instagram Reels, YouTube Shorts, LinkedIn, and Beehiiv newsletter funnels.'
      },
      {
        question: 'How does the content strategy pipeline work?',
        answer: 'We craft high-converting hooks and retention scripts, build a 30-day content calendar, and deploy multi-channel automated publishing queues.'
      }
    ]
  },
  'ai-consulting': {
    path: '/ai-consulting',
    title: 'Enterprise AI Consulting & Workflow Automation | LaunchGremlin',
    description: 'Automate business workflows and deploy custom AI agents, LLM pipelines, and vector search RAG systems designed to save hundreds of hours monthly.',
    keywords: 'AI consulting, custom AI agents, LLM integration, workflow automation, vector search RAG, business process automation',
    canonical: `${SITE_DOMAIN}/ai-consulting`,
    ogType: 'service',
    ogImage: `${SITE_DOMAIN}/assets/logo-transparent.png`,
    ogImageAlt: 'LaunchGremlin AI Consulting & Automation',
    breadcrumbs: [
      { name: 'Home', item: `${SITE_DOMAIN}/` },
      { name: 'AI Consulting & Workflows', item: `${SITE_DOMAIN}/ai-consulting` }
    ],
    service: {
      name: 'Enterprise AI Consulting & Custom Agents',
      serviceType: 'AI Engineering & Automation Consulting',
      description: 'Autonomous 24/7 AI agents, CRM and database workflow pipelines, and secure internal documentation vector search RAG systems.'
    },
    faqs: [
      {
        question: 'What kind of AI agents can LaunchGremlin build?',
        answer: 'We build autonomous AI agents for 24/7 lead qualification, customer support, document research, automated email outreach, and custom LLM workflows.'
      },
      {
        question: 'Is internal company data secure with RAG integration?',
        answer: 'Yes, we implement enterprise vector databases with strict security controls, keeping your private business data fully isolated.'
      }
    ]
  },
  about: {
    path: '/about',
    title: 'About LaunchGremlin | Internet-Native Builders, Mission & Operating Code',
    description: 'Learn how LaunchGremlin helps startups and creators scale through engineering excellence, rapid iteration, and modern AI-assisted product development.',
    keywords: 'about LaunchGremlin, internet native agency, software studio, rapid iteration, builder culture',
    canonical: `${SITE_DOMAIN}/about`,
    ogType: 'website',
    ogImage: `${SITE_DOMAIN}/assets/logo-transparent.png`,
    ogImageAlt: 'About LaunchGremlin - Internet Native Builders',
    breadcrumbs: [
      { name: 'Home', item: `${SITE_DOMAIN}/` },
      { name: 'About LaunchGremlin', item: `${SITE_DOMAIN}/about` }
    ]
  },
  contact: {
    path: '/contact',
    title: 'Contact LaunchGremlin | Book a Free Strategy Call & Scope Builder',
    description: 'Ready to build, grow, and scale? Get in touch with the LaunchGremlin engineering team today or schedule a free 30-minute strategic consultation.',
    keywords: 'contact LaunchGremlin, book strategy call, web development inquiry, AI consulting quote',
    canonical: `${SITE_DOMAIN}/contact`,
    ogType: 'website',
    ogImage: `${SITE_DOMAIN}/assets/logo-transparent.png`,
    ogImageAlt: 'Contact LaunchGremlin',
    breadcrumbs: [
      { name: 'Home', item: `${SITE_DOMAIN}/` },
      { name: 'Contact & Scope Builder', item: `${SITE_DOMAIN}/contact` }
    ]
  },
  admin: {
    path: '/admin',
    title: 'Admin Dashboard | LaunchGremlin',
    description: 'LaunchGremlin Administrative Management Portal.',
    canonical: `${SITE_DOMAIN}/admin`,
    ogType: 'website',
    ogImage: `${SITE_DOMAIN}/assets/logo-transparent.png`,
    ogImageAlt: 'LaunchGremlin Admin Portal',
    noindex: true,
    breadcrumbs: [
      { name: 'Home', item: `${SITE_DOMAIN}/` },
      { name: 'Admin', item: `${SITE_DOMAIN}/admin` }
    ]
  }
};

// Merge Industry Pages into SEO_DATA dynamically
export const SEO_DATA = { ...BASE_SEO_DATA };

Object.keys(INDUSTRIES_DATA).forEach((key) => {
  const ind = INDUSTRIES_DATA[key];
  SEO_DATA[key] = {
    path: ind.path,
    title: ind.title,
    description: ind.description,
    keywords: ind.keywords,
    canonical: ind.canonical,
    ogType: 'service',
    ogImage: `${SITE_DOMAIN}/assets/logo-transparent.png`,
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

export function generateSchemasForPage(pageKey) {
  const page = SEO_DATA[pageKey] || SEO_DATA.home;

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_DOMAIN}/#organization`,
    name: 'LaunchGremlin',
    url: SITE_DOMAIN,
    logo: `${SITE_DOMAIN}/assets/logo-transparent.png`,
    image: `${SITE_DOMAIN}/assets/logo-transparent.png`,
    description: 'LaunchGremlin helps creators and ambitious businesses build high-performance websites, execute data-driven content strategies, and integrate enterprise AI automation.',
    sameAs: [
      'https://www.tiktok.com/@launchgremlin',
      'https://www.instagram.com/launchgremlin/'
    ]
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_DOMAIN}/#localbusiness`,
    name: 'LaunchGremlin',
    url: SITE_DOMAIN,
    logo: `${SITE_DOMAIN}/assets/logo-transparent.png`,
    image: `${SITE_DOMAIN}/assets/logo-transparent.png`,
    priceRange: '$$$',
    telephone: '+27 82 123 4567',
    email: 'dev@launchgremlin.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ZA'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00'
    }
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

  const schemas = [orgSchema, localBusinessSchema, websiteSchema, webPageSchema];

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
      termsOfService: `${SITE_DOMAIN}/terms`
    };
    schemas.push(serviceSchema);
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
