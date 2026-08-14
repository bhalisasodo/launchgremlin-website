/**
 * LaunchGremlin Unified Analytics & Telemetry Engine
 * 
 * Provides privacy-conscious tracking, custom conversion events,
 * Core Web Vitals telemetry, and multi-provider dispatching:
 * - Google Analytics 4 (window.gtag)
 * - Plausible Analytics (window.plausible)
 * - PostHog (window.posthog)
 * - Meta Pixel (window.fbq)
 * - Local In-Memory & Console (in development)
 */

export const ANALYTICS_CONFIG = {
  enabled: typeof window !== 'undefined',
  debug: false
};

/**
 * Track Page Views across SPA navigation
 */
export function trackPageView(pagePath, pageTitle) {
  if (!ANALYTICS_CONFIG.enabled) return;

  const url = pagePath || window.location.pathname + window.location.search;
  const title = pageTitle || document.title;

  if (ANALYTICS_CONFIG.debug) {
    console.log(`[Analytics] 📄 PageView: ${url} — "${title}"`);
  }

  // 1. Google Analytics 4
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_title: title,
      page_location: window.location.href,
      page_path: url,
    });
  }

  // 2. Plausible Analytics
  if (typeof window.plausible === 'function') {
    window.plausible('pageview', { u: url });
  }

  // 3. PostHog
  if (typeof window.posthog?.capture === 'function') {
    window.posthog.capture('$pageview', {
      $current_url: window.location.href,
      title: title
    });
  }

  // 4. Meta Pixel
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'PageView');
  }
}

/**
 * Track Custom Interaction & Conversion Events
 */
export function trackEvent(eventName, eventParams = {}) {
  if (!ANALYTICS_CONFIG.enabled) return;

  const payload = {
    ...eventParams,
    timestamp: new Date().toISOString(),
    path: window.location.pathname,
    viewport_width: window.innerWidth,
  };

  if (ANALYTICS_CONFIG.debug) {
    console.log(`[Analytics] ⚡ Event: "${eventName}"`, payload);
  }

  // 1. Google Analytics 4
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload);
  }

  // 2. Plausible Analytics
  if (typeof window.plausible === 'function') {
    window.plausible(eventName, { props: payload });
  }

  // 3. PostHog
  if (typeof window.posthog?.capture === 'function') {
    window.posthog.capture(eventName, payload);
  }

  // 4. Meta Pixel Lead / Custom Event
  if (typeof window.fbq === 'function') {
    if (eventName === 'lead_form_submitted' || eventName === 'booking_requested') {
      window.fbq('track', 'Lead', { content_name: eventParams.service || 'Strategy Call' });
    } else {
      window.fbq('trackCustom', eventName, payload);
    }
  }
}

/**
 * Track High-Value Conversion Actions
 */
export function trackConversion(conversionType, details = {}) {
  trackEvent('conversion', {
    conversion_type: conversionType,
    ...details
  });
}

/**
 * Setup Core Web Vitals and User Engagement Observers
 */
export function initPerformanceTelemetry() {
  if (typeof window === 'undefined' || typeof PerformanceObserver === 'undefined') return;

  try {
    // 1. Observe Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        trackEvent('core_web_vitals', {
          metric: 'LCP',
          value: Math.round(lastEntry.startTime),
          rating: lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs-improvement' : 'poor'
        });
      }
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // 2. Observe First Input Delay (FID)
    const fidObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const delay = entry.processingStart - entry.startTime;
        trackEvent('core_web_vitals', {
          metric: 'FID',
          value: Math.round(delay),
          rating: delay < 100 ? 'good' : delay < 300 ? 'needs-improvement' : 'poor'
        });
      }
    });
    fidObserver.observe({ type: 'first-input', buffered: true });

    // 3. Scroll Depth Tracking
    let depthTriggered = { 25: false, 50: false, 75: false, 90: false };
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const percentage = Math.round((scrollTop / scrollHeight) * 100);

      [25, 50, 75, 90].forEach(threshold => {
        if (percentage >= threshold && !depthTriggered[threshold]) {
          depthTriggered[threshold] = true;
          trackEvent('scroll_depth', { depth_percentage: threshold });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  } catch (err) {
    // Gracefully ignore browsers without PerformanceObserver support
  }
}
