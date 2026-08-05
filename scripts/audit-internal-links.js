import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory does not exist. Run vite build and prerender first.');
  process.exit(1);
}

// Function to recursively discover all index.html files in dist/
function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      // Ignore assets and legacy
      if (file !== 'assets' && file !== 'legacy_and_assets') {
        getAllHtmlFiles(filePath, fileList);
      }
    } else if (file === 'index.html') {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getAllHtmlFiles(distDir);
console.log(`\n==================================================`);
console.log(`🔍 STARTING INTERNAL LINKING & TOPICAL AUDIT`);
console.log(`==================================================`);
console.log(`Auditing ${htmlFiles.length} static pre-rendered HTML files in dist/...\n`);

const urlToLinksMap = new Map();
const inlinkCountMap = new Map();

// Initialize inlink counts for all pages to 0
htmlFiles.forEach(file => {
  let relativeRoute = path.relative(distDir, path.dirname(file)).replace(/\\/g, '/');
  if (relativeRoute === '' || relativeRoute === '.') {
    relativeRoute = '/';
  } else {
    relativeRoute = `/${relativeRoute}`;
  }
  urlToLinksMap.set(relativeRoute, new Set());
  inlinkCountMap.set(relativeRoute, 0);
});

let totalLinksFound = 0;
let minLinks = Infinity;
let maxLinks = 0;
let pagesBelow3Links = [];

htmlFiles.forEach(file => {
  let pageRoute = path.relative(distDir, path.dirname(file)).replace(/\\/g, '/');
  if (pageRoute === '' || pageRoute === '.') {
    pageRoute = '/';
  } else {
    pageRoute = `/${pageRoute}`;
  }

  const content = fs.readFileSync(file, 'utf8');

  // Extract all href attributes matching internal domain paths
  const hrefMatches = content.matchAll(/href=["'](\/[^"']*?)["']/g);
  const internalLinks = new Set();

  for (const match of hrefMatches) {
    let href = match[1].split('?')[0].split('#')[0];
    if (href === '') href = '/';
    if (href !== pageRoute) {
      internalLinks.add(href);
    }
  }

  urlToLinksMap.set(pageRoute, internalLinks);
  const count = internalLinks.size;
  totalLinksFound += count;
  if (count < minLinks) minLinks = count;
  if (count > maxLinks) maxLinks = count;

  if (count < 3) {
    pagesBelow3Links.push({ pageRoute, count });
  }

  // Increment inlink count for target pages
  internalLinks.forEach(target => {
    if (inlinkCountMap.has(target)) {
      inlinkCountMap.set(target, inlinkCountMap.get(target) + 1);
    }
  });
});

// Identify Orphan Pages (0 inlinks except home page)
const orphanPages = [];
inlinkCountMap.forEach((inlinks, route) => {
  if (route !== '/' && inlinks === 0) {
    orphanPages.push(route);
  }
});

// Crawl Depth Calculation using BFS from '/'
const crawlDepthMap = new Map();
const queue = [{ route: '/', depth: 0 }];
crawlDepthMap.set('/', 0);

while (queue.length > 0) {
  const { route, depth } = queue.shift();
  const outgoingLinks = urlToLinksMap.get(route) || new Set();

  outgoingLinks.forEach(target => {
    if (!crawlDepthMap.has(target) && inlinkCountMap.has(target)) {
      crawlDepthMap.set(target, depth + 1);
      queue.push({ route: target, depth: depth + 1 });
    }
  });
}

let maxCrawlDepth = 0;
let unreachedPages = [];

inlinkCountMap.forEach((_, route) => {
  if (crawlDepthMap.has(route)) {
    const depth = crawlDepthMap.get(route);
    if (depth > maxCrawlDepth) maxCrawlDepth = depth;
  } else {
    unreachedPages.push(route);
  }
});

// Print Audit Results Summary
console.log(`--------------------------------------------------`);
console.log(`📊 INTERNAL LINKING AUDIT SUMMARY`);
console.log(`--------------------------------------------------`);
console.log(`✅ Total Pre-rendered HTML Pages Audited: ${htmlFiles.length}`);
console.log(`✅ Total Internal Cross-Links Discovered: ${totalLinksFound}`);
console.log(`✅ Average Outbound Links Per Page: ${(totalLinksFound / htmlFiles.length).toFixed(1)}`);
console.log(`✅ Link Range Per Page: ${minLinks} to ${maxLinks} outbound links`);
console.log(`✅ Maximum Crawl Depth from Home ('/'): ${maxCrawlDepth} clicks`);
console.log(`--------------------------------------------------`);

if (orphanPages.length === 0) {
  console.log(`🎉 ZERO ORPHAN PAGES DISCOVERED! Every page has inbound links.`);
} else {
  console.warn(`⚠️ Warning: ${orphanPages.length} orphan pages found:`, orphanPages);
}

if (unreachedPages.length === 0) {
  console.log(`🎉 100% CRAWL ACCESSIBILITY! All ${htmlFiles.length} pages are reachable from '/'.`);
} else {
  console.warn(`⚠️ Warning: ${unreachedPages.length} unreached pages found:`, unreachedPages);
}

if (pagesBelow3Links.length === 0) {
  console.log(`🎉 ALL PAGES MEET 3-8+ INTERNAL LINKS REQUIREMENT!`);
} else {
  console.warn(`⚠️ Pages below 3 links:`, pagesBelow3Links);
}

console.log(`==================================================\n`);
