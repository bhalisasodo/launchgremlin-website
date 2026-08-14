import { useEffect } from 'react';
import { getSeoDataForPage, generateSchemasForPage, SITE_DOMAIN } from '../../utils/seoData';
import { trackPageView } from '../../utils/analytics';

export default function SEO({ pageKey = 'home' }) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const data = getSeoDataForPage(pageKey);

    // 1. Title
    document.title = data.title;

    // 2. Telemetry / Page View Tracking
    trackPageView(data.path || window.location.pathname, data.title);

    // Helper function to create or update meta tag
    const setMetaTag = (selector, attribute, attributeValue, contentValue) => {
      if (!contentValue) return;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    // Helper function to create or update link tag
    const setLinkTag = (rel, href) => {
      if (!href) return;
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 3. Standard Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', data.description);
    if (data.keywords) {
      setMetaTag('meta[name="keywords"]', 'name', 'keywords', data.keywords);
    }

    // Robots tag
    if (data.noindex) {
      setMetaTag('meta[name="robots"]', 'name', 'robots', 'noindex, nofollow');
    } else {
      setMetaTag('meta[name="robots"]', 'name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    }

    // 4. Canonical URL
    setLinkTag('canonical', data.canonical);

    // 5. Open Graph Metadata
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', data.title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', data.description);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', data.ogType || 'website');
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', data.canonical);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', data.ogImage || `${SITE_DOMAIN}/og-image.png`);
    setMetaTag('meta[property="og:image:width"]', 'property', 'og:image:width', '1200');
    setMetaTag('meta[property="og:image:height"]', 'property', 'og:image:height', '630');
    setMetaTag('meta[property="og:image:type"]', 'property', 'og:image:type', 'image/png');
    setMetaTag('meta[property="og:image:alt"]', 'property', 'og:image:alt', data.ogImageAlt || data.title);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'LaunchGremlin');
    setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', 'en_US');

    // 6. Twitter Card Metadata
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', data.title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', data.description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', data.ogImage || `${SITE_DOMAIN}/og-image.png`);
    setMetaTag('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', data.ogImageAlt || data.title);
    setMetaTag('meta[name="twitter:site"]', 'name', 'twitter:site', '@launchgremlin');

    // 7. Inject JSON-LD Schemas
    const schemas = generateSchemasForPage(pageKey);
    let scriptElement = document.querySelector('script#json-ld-schema');
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.setAttribute('id', 'json-ld-schema');
      scriptElement.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify(schemas, null, 2);

  }, [pageKey]);

  return null;
}
