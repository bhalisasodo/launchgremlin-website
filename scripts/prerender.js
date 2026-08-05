import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SEO_DATA, generateSchemasForPage } from '../src/utils/seoData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('Error: dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const rawTemplate = fs.readFileSync(templatePath, 'utf8');
const cleanTemplate = rawTemplate
  .replace(/<script id="json-ld-schema".*?<\/script>\s*/gs, '')
  .replace(/<div id="root">.*?<\/div>/s, '<div id="root"></div>');

import { BLOG_ARTICLES } from '../src/utils/blogData.js';

// Pre-render core pages, legal pages, industry pages, all 100 blog articles, and long-tail pages
const coreKeys = ['home', 'websites', 'content-strategy', 'ai-consulting', 'about', 'contact', 'blog', 'privacy', 'terms', 'cookies'];
const industryKeys = ['websites-for-gyms', 'websites-for-restaurants', 'websites-for-hair-salons', 'websites-for-barbers', 'websites-for-cafes', 'websites-for-coaches', 'websites-for-personal-trainers', 'websites-for-creators', 'websites-for-influencers', 'websites-for-photographers', 'websites-for-dentists', 'websites-for-lawyers', 'websites-for-realtors', 'websites-for-accountants', 'websites-for-construction-companies', 'websites-for-cleaning-companies'];
const blogKeys = BLOG_ARTICLES.map(a => `blog/${a.slug}`);
const featuredLongTailKeys = ['best-website-for-a-gym', 'website-for-yoga-studio', 'website-for-coffee-shop', 'restaurant-website-examples', 'creator-website-examples', 'website-for-makeup-artist', 'website-for-podcast', 'website-for-dj', 'website-for-musician', 'website-for-startup', 'affordable-business-website'];

const prerenderKeys = [...coreKeys, ...industryKeys, ...blogKeys, ...featuredLongTailKeys];

console.log(`Starting SSG Pre-rendering for ${prerenderKeys.length} primary static routes...`);

prerenderKeys.forEach((key) => {
  const page = SEO_DATA[key];
  if (!page) return;

  let html = cleanTemplate;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/s, `<title>${page.title}</title>`);

  // Replace Description
  html = html.replace(
    /<meta name="description"\s+content=".*?"\s*\/?>/s,
    `<meta name="description" content="${page.description}" />`
  );

  // Replace Keywords if available
  if (page.keywords) {
    html = html.replace(
      /<meta name="keywords"\s+content=".*?"\s*\/?>/s,
      `<meta name="keywords" content="${page.keywords}" />`
    );
  }

  // Replace Canonical Link
  html = html.replace(
    /<link rel="canonical"\s+href=".*?"\s*\/?>/s,
    `<link rel="canonical" href="${page.canonical}" />`
  );

  // Replace OpenGraph Title, Description, URL
  html = html.replace(
    /<meta property="og:title"\s+content=".*?"\s*\/?>/s,
    `<meta property="og:title" content="${page.title}" />`
  );
  html = html.replace(
    /<meta property="og:description"\s+content=".*?"\s*\/?>/s,
    `<meta property="og:description" content="${page.description}" />`
  );
  html = html.replace(
    /<meta property="og:url"\s+content=".*?"\s*\/?>/s,
    `<meta property="og:url" content="${page.canonical}" />`
  );

  // Inject JSON-LD Schema
  const schemas = generateSchemasForPage(key);
  const schemaScript = `\n  <script id="json-ld-schema" type="application/ld+json">\n${JSON.stringify(schemas, null, 2)}\n  </script>\n</head>`;
  html = html.replace('</head>', schemaScript);

  // Pre-render static HTML fallback content into <div id="root">
  const blogLinksHtml = BLOG_ARTICLES.map(a => `<a href="/blog/${a.slug}">${a.title}</a>`).join('\n        ');
  const industryLinksHtml = industryKeys.map(k => `<a href="/${k}">${k}</a>`).join('\n        ');
  const longTailLinksHtml = featuredLongTailKeys.map(k => `<a href="/${k}">${k}</a>`).join('\n        ');
  const fallbackHtml = `
    <div class="sr-only">
      <header>
        <h1>${page.title}</h1>
        <p>${page.description}</p>
      </header>
      <main id="main-content">
        <h2>LaunchGremlin High-Performance Web Engineering</h2>
        <nav aria-label="Core Navigation">
          <a href="/">Home</a>
          <a href="/websites">Websites</a>
          <a href="/content-strategy">Content Strategy</a>
          <a href="/ai-consulting">AI Consulting</a>
          <a href="/blog">Blog Content Hub</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/cookies">Cookie Policy</a>
          ${blogLinksHtml}
          ${industryLinksHtml}
          ${longTailLinksHtml}
        </nav>
      </main>
    </div>
  `;
  html = html.replace('<div id="root"></div>', `<div id="root">${fallbackHtml}</div>`);

  // Target directory
  if (key === 'home') {
    fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf8');
  } else {
    const pageFolder = path.join(distDir, key);
    if (!fs.existsSync(pageFolder)) {
      fs.mkdirSync(pageFolder, { recursive: true });
    }
    fs.writeFileSync(path.join(pageFolder, 'index.html'), html, 'utf8');
  }
});

console.log(`🎉 Production SSG Static Prerendering Complete for ${prerenderKeys.length} primary static routes!`);
