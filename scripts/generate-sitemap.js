import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INDUSTRIES_DATA } from '../src/utils/industryData.js';
import { BLOG_ARTICLES } from '../src/utils/blogData.js';
import { LONG_TAIL_PAGES } from '../src/utils/longTailData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_DOMAIN = 'https://launchgremlin.com';

const coreRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/websites', priority: '0.9', changefreq: 'weekly' },
  { path: '/business-cards', priority: '0.9', changefreq: 'weekly' },
  { path: '/content-strategy', priority: '0.9', changefreq: 'weekly' },
  { path: '/ai-consulting', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.9', changefreq: 'daily' },
  { path: '/privacy', priority: '0.5', changefreq: 'yearly' },
  { path: '/terms', priority: '0.5', changefreq: 'yearly' },
  { path: '/cookies', priority: '0.5', changefreq: 'yearly' }
];

const industryRoutes = Object.keys(INDUSTRIES_DATA).map(key => ({
  path: INDUSTRIES_DATA[key].path,
  priority: '0.85',
  changefreq: 'weekly'
}));

const blogArticleRoutes = BLOG_ARTICLES.map(a => ({
  path: `/blog/${a.slug}`,
  priority: '0.80',
  changefreq: 'weekly'
}));

const longTailRoutes = LONG_TAIL_PAGES.map(p => ({
  path: p.path,
  priority: '0.80',
  changefreq: 'weekly'
}));

const allRoutes = [...coreRoutes, ...industryRoutes, ...blogArticleRoutes, ...longTailRoutes];

const today = new Date().toISOString().split('T')[0];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allRoutes.map(r => `  <url>
    <loc>${SITE_DOMAIN}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

// Write to public/sitemap.xml
const publicPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(publicPath, sitemapXml, 'utf8');
console.log(`✅ Generated public/sitemap.xml with ${allRoutes.length} routes`);

// If dist exists, write to dist/sitemap.xml as well
const distDir = path.join(__dirname, '../dist');
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
  console.log(`✅ Generated dist/sitemap.xml with ${allRoutes.length} routes`);
}
