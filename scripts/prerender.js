import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SEO_DATA, generateSchemasForPage } from '../src/utils/seoData.js';
import { INDUSTRIES_DATA } from '../src/utils/industryData.js';
import { BLOG_ARTICLES } from '../src/utils/blogData.js';
import { LONG_TAIL_PAGES } from '../src/utils/longTailData.js';

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

const pageKeys = Object.keys(SEO_DATA).filter(k => k !== 'admin');

console.log(`Starting SSG Pre-rendering & Topical Authority Hub for ${pageKeys.length} total routes...`);

// Pre-build comprehensive HTML link index for crawler discovery
const coreLinkList = [
  '<a href="/">Home</a>',
  '<a href="/websites">Websites & Products</a>',
  '<a href="/content-strategy">Content Strategy</a>',
  '<a href="/ai-consulting">AI Consulting</a>',
  '<a href="/blog">Blog Content Hub</a>',
  '<a href="/about">About</a>',
  '<a href="/contact">Contact</a>'
];

const industryLinkList = Object.keys(INDUSTRIES_DATA).map(
  k => `<a href="${INDUSTRIES_DATA[k].path}">${INDUSTRIES_DATA[k].name}</a>`
);

const blogLinkList = BLOG_ARTICLES.map(
  a => `<a href="/blog/${a.slug}">${a.title}</a>`
);

const longTailLinkList = LONG_TAIL_PAGES.map(
  p => `<a href="${p.path}">${p.label}</a>`
);

const masterSitemapNavHtml = `
  <nav aria-label="Topical Authority Directory" class="sr-only">
    <h2>Core Pillars</h2>
    <ul>${coreLinkList.map(l => `<li>${l}</li>`).join('')}</ul>

    <h2>Industry Solutions</h2>
    <ul>${industryLinkList.map(l => `<li>${l}</li>`).join('')}</ul>

    <h2>Knowledge Base Articles</h2>
    <ul>${blogLinkList.map(l => `<li>${l}</li>`).join('')}</ul>

    <h2>Specialized Buyer Solutions</h2>
    <ul>${longTailLinkList.map(l => `<li>${l}</li>`).join('')}</ul>
  </nav>
`;

pageKeys.forEach((key) => {
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
  const fallbackHtml = `
    <header className="sr-only">
      <h1>${page.title}</h1>
      <p>${page.description}</p>
    </header>
    <main id="main-content">
      <h2>Topical Information & Services</h2>
      ${masterSitemapNavHtml}
    </main>
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

console.log(`🎉 Production SSG Static Prerendering & Internal Link Graph Complete for ${pageKeys.length} total routes!`);
