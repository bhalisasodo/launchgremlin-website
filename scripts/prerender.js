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

const pageKeys = Object.keys(SEO_DATA).filter(k => k !== 'admin');

console.log(`Starting SSG Pre-rendering for ${pageKeys.length} total routes...`);

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
    <header class="sr-only">
      <nav aria-label="Fallback Navigation">
        <a href="/">Home</a>
        <a href="/websites">Websites</a>
        <a href="/content-strategy">Content Strategy</a>
        <a href="/ai-consulting">AI Consulting</a>
        <a href="/blog">Blog Content Hub</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>
    <main id="main-content">
      <h1>${page.title}</h1>
      <p>${page.description}</p>
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

console.log(`🎉 Production SSG Static Prerendering Complete for ${pageKeys.length} total routes!`);
