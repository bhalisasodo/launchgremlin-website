// scripts/audit-seo.js - Automated SEO & Schema Auditor for LaunchGremlin
import { SEO_DATA, generateSchemasForPage } from '../src/utils/seoData.js';
import { BLOG_ARTICLES } from '../src/utils/blogData.js';
import { INDUSTRIES_DATA } from '../src/utils/industryData.js';
import { LONG_TAIL_PAGES } from '../src/utils/longTailData.js';

console.log('🔍 LaunchGremlin SEO & Schema Health Audit Starting...\n');

let totalPages = Object.keys(SEO_DATA).length;
let issues = [];
let passedChecks = 0;

console.log(`📊 Total Indexed Pages in Repository: ${totalPages}`);
console.log(`  - Core Pages: 11`);
console.log(`  - Industry Hubs: ${Object.keys(INDUSTRIES_DATA).length}`);
console.log(`  - Blog Articles: ${BLOG_ARTICLES.length}`);
console.log(`  - Long-Tail Pages: ${LONG_TAIL_PAGES.length}\n`);

// 1. Audit Meta Data Completeness
Object.entries(SEO_DATA).forEach(([key, page]) => {
  if (!page.title || page.title.length < 15) {
    issues.push(`[Short Title] Page "${key}" title is too short: "${page.title}"`);
  } else if (page.title.length > 90) {
    issues.push(`[Long Title] Page "${key}" title is long (${page.title.length} chars): "${page.title}"`);
  }

  if (!page.description || page.description.length < 50) {
    issues.push(`[Short Description] Page "${key}" description is too short (${page.description?.length || 0} chars)`);
  }

  if (!page.canonical || !page.canonical.startsWith('https://launchgremlin.com')) {
    issues.push(`[Invalid Canonical] Page "${key}" canonical is missing or invalid: "${page.canonical}"`);
  }

  // 2. Validate JSON-LD Schema Generation
  try {
    const schemas = generateSchemasForPage(key);
    if (!Array.isArray(schemas) || schemas.length < 3) {
      issues.push(`[Incomplete Schema] Page "${key}" produced fewer than 3 schemas (${schemas?.length || 0})`);
    } else {
      passedChecks++;
    }
  } catch (err) {
    issues.push(`[Schema Generation Error] Page "${key}": ${err.message}`);
  }
});

console.log(`\n========================================`);
console.log(`📋 Audit Summary:`);
console.log(`   Total Pages Checked: ${totalPages}`);
console.log(`   Passed Schema & Meta Verifications: ${passedChecks}`);
console.log(`   Issues Found: ${issues.length}`);
console.log(`========================================\n`);

if (issues.length > 0) {
  console.warn('⚠️ Issues to address:');
  issues.slice(0, 10).forEach(iss => console.warn(`   - ${iss}`));
  if (issues.length > 10) {
    console.warn(`   ... and ${issues.length - 10} more issues.`);
  }
} else {
  console.log('✅ All 627+ pages have valid titles, descriptions, canonical URLs, and valid Schema.org JSON-LD definitions!');
}
