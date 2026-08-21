import { BLOG_ARTICLES, BLOG_CLUSTERS, getArticleBySlug } from '../../../src/utils/blogData.js';
import { SITE_DOMAIN } from '../../../src/utils/seoData.js';

/**
 * Authoritative Content Hub Adapter for LaunchGremlin MCP Server
 * Guarantees published-only data access.
 */

/**
 * Searches published articles in the Content Hub
 * @param {object} params
 * @param {string} params.query - Search keywords
 * @param {number} [params.limit=10] - Number of results to return
 * @param {string} [params.cursor] - Offset cursor for pagination
 * @returns {{ results: Array<{ id: string, title: string, summary: string, url: string, published_at: string }>, next_cursor: string | null }}
 */
export function searchPublishedContent({ query, limit = 10, cursor = null }) {
  const normalizedQuery = (query || '').toLowerCase().trim();
  const clampedLimit = Math.min(Math.max(1, parseInt(limit, 10) || 10), 50);
  const offset = cursor ? parseInt(Buffer.from(cursor, 'base64').toString('utf8'), 10) || 0 : 0;

  // Filter ONLY published articles from the authoritative registry
  const matched = BLOG_ARTICLES.filter((article) => {
    // Hard check: must have a publishDate (cannot be draft or unpublished)
    if (!article.publishDate) return false;

    if (!normalizedQuery) return true;

    const inTitle = (article.title || '').toLowerCase().includes(normalizedQuery);
    const inDesc = (article.description || '').toLowerCase().includes(normalizedQuery);
    const inKeywords = (article.keywords || '').toLowerCase().includes(normalizedQuery);
    const inCluster = (article.clusterId || '').toLowerCase().includes(normalizedQuery);
    const inCategory = (article.category || '').toLowerCase().includes(normalizedQuery);

    return inTitle || inDesc || inKeywords || inCluster || inCategory;
  });

  const paged = matched.slice(offset, offset + clampedLimit);
  const nextOffset = offset + clampedLimit < matched.length ? offset + clampedLimit : null;
  const nextCursor = nextOffset !== null ? Buffer.from(String(nextOffset)).toString('base64') : null;

  const results = paged.map((article) => ({
    id: article.slug,
    title: article.title,
    summary: article.description,
    url: `${SITE_DOMAIN}/blog/${article.slug}`,
    published_at: new Date(article.publishDate).toISOString(),
  }));

  return {
    results,
    next_cursor: nextCursor,
  };
}

/**
 * Returns all published topic clusters
 */
export function getPublishedClusters() {
  return BLOG_CLUSTERS;
}

/**
 * Retrieves a single published article by slug
 * @param {string} slug
 */
export function getPublishedArticle(slug) {
  const article = getArticleBySlug(slug);
  if (!article || !article.publishDate) return null;
  return article;
}
