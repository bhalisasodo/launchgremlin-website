import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StrategyCallModal from './components/StrategyCallModal';
import HomePage from './pages/HomePage';
import WebsitesPage from './pages/WebsitesPage';
import ContentStrategyPage from './pages/ContentStrategyPage';
import AIConsultingPage from './pages/AIConsultingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import SEO from './components/common/SEO';
import Breadcrumbs from './components/common/Breadcrumbs';
import IndustryLandingPage from './pages/IndustryLandingPage';
import BlogHubPage from './pages/BlogHubPage';
import BlogPostPage from './pages/BlogPostPage';
import LongTailPage from './pages/LongTailPage';
import StickyMobileCTA from './components/common/StickyMobileCTA';
import ExitIntentModal from './components/common/ExitIntentModal';

import { INDUSTRIES_DATA } from './utils/industryData';
import { BLOG_CLUSTERS, BLOG_ARTICLES } from './utils/blogData';
import { LONG_TAIL_PAGES } from './utils/longTailData';

const CORE_TABS = ['home', 'websites', 'content-strategy', 'ai-consulting', 'about', 'contact', 'blog', 'privacy', 'terms', 'cookies'];
const INDUSTRY_KEYS = Object.keys(INDUSTRIES_DATA);
const LONG_TAIL_SLUGS = LONG_TAIL_PAGES.map(p => p.slug);

const normalizeRoute = (rawPath) => {
  if (!rawPath) return 'home';
  const path = decodeURIComponent(rawPath).replace(/^\/+|\/+$/g, '');
  if (!path || path === 'home') return 'home';

  if (CORE_TABS.includes(path) || INDUSTRY_KEYS.includes(path) || LONG_TAIL_SLUGS.includes(path)) {
    return path;
  }

  if (path.startsWith('blog')) {
    const parts = path.split('/').filter(Boolean);
    if (parts.length === 1) return 'blog';

    const lastPart = parts[parts.length - 1].toLowerCase();

    // Check if last part matches an article slug
    const article = BLOG_ARTICLES.find(a => a.slug.toLowerCase() === lastPart);
    if (article) {
      return `blog/${article.slug}`;
    }

    // Check if category or tag path
    const catPart = (parts[1] === 'category' || parts[1] === 'tag') ? parts[2] : parts[1];
    if (catPart) {
      const cluster = BLOG_CLUSTERS.find(c =>
        c.id.toLowerCase() === catPart.toLowerCase() ||
        c.name.toLowerCase() === catPart.toLowerCase()
      );
      if (cluster) {
        return 'blog';
      }
    }

    return `blog/${parts[parts.length - 1]}`;
  }

  return 'home';
};

const getTabFromUrl = () => {
  if (typeof window === 'undefined') return 'home';

  const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '');
  if (pathname) {
    const tab = normalizeRoute(pathname);
    if (tab !== 'home' || pathname === '' || pathname === '/') return tab;
  }

  const params = new URLSearchParams(window.location.search);
  const tabParam = params.get('tab');
  if (tabParam) {
    return normalizeRoute(tabParam);
  }

  const hash = window.location.hash.replace(/^#\/?/, '');
  if (hash) {
    return normalizeRoute(hash);
  }

  return 'home';
};

export default function App() {
  const [activeTab, setActiveTab] = useState(getTabFromUrl);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      setActiveTab(getTabFromUrl());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectTab = (tab) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      const targetPath = tab === 'home' ? '/' : `/${tab}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ tab }, '', targetPath);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isIndustryPage = INDUSTRY_KEYS.includes(activeTab);
  const isBlogPostPage = activeTab.startsWith('blog/');
  const isLongTailPage = LONG_TAIL_SLUGS.includes(activeTab);
  const blogSlug = isBlogPostPage ? activeTab.replace(/^blog\//, '') : null;

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between selection:bg-emerald-400 selection:text-black relative">
      {/* Dynamic SEO Metadata Tag Injector */}
      <SEO pageKey={activeTab} />

      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenBooking={() => setIsBookingModalOpen(true)}
      />

      {/* Visual Breadcrumb Navigation */}
      <Breadcrumbs pageKey={activeTab} onSelectTab={handleSelectTab} />

      <main id="main-content" className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onSelectTab={handleSelectTab}
            onOpenBooking={() => setIsBookingModalOpen(true)}
          />
        )}

        {activeTab === 'websites' && (
          <WebsitesPage
            onSelectTab={handleSelectTab}
            onOpenBooking={() => setIsBookingModalOpen(true)}
          />
        )}

        {activeTab === 'content-strategy' && (
          <ContentStrategyPage
            onSelectTab={handleSelectTab}
            onOpenBooking={() => setIsBookingModalOpen(true)}
          />
        )}

        {activeTab === 'ai-consulting' && (
          <AIConsultingPage
            onSelectTab={handleSelectTab}
            onOpenBooking={() => setIsBookingModalOpen(true)}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage
            onOpenBooking={() => setIsBookingModalOpen(true)}
            onSelectTab={handleSelectTab}
          />
        )}

        {activeTab === 'contact' && (
          <ContactPage
            onOpenBooking={() => setIsBookingModalOpen(true)}
          />
        )}

        {activeTab === 'privacy' && (
          <PrivacyPolicyPage
            onSelectTab={handleSelectTab}
            onOpenBooking={() => setIsBookingModalOpen(true)}
          />
        )}

        {activeTab === 'terms' && (
          <TermsPage
            onSelectTab={handleSelectTab}
            onOpenBooking={() => setIsBookingModalOpen(true)}
          />
        )}

        {activeTab === 'cookies' && (
          <CookiePolicyPage
            onSelectTab={handleSelectTab}
            onOpenBooking={() => setIsBookingModalOpen(true)}
          />
        )}

        {activeTab === 'blog' && (
          <BlogHubPage
            onSelectTab={handleSelectTab}
            onOpenBooking={() => setIsBookingModalOpen(true)}
          />
        )}

        {isBlogPostPage && (
          <BlogPostPage
            slug={blogSlug}
            onSelectTab={handleSelectTab}
            onOpenBooking={() => setIsBookingModalOpen(true)}
          />
        )}

        {isLongTailPage && (
          <LongTailPage
            slug={activeTab}
            onOpenBooking={() => setIsBookingModalOpen(true)}
            onSelectTab={handleSelectTab}
          />
        )}

        {isIndustryPage && (
          <IndustryLandingPage
            industryKey={activeTab}
            onOpenBooking={() => setIsBookingModalOpen(true)}
            onSelectTab={handleSelectTab}
          />
        )}
      </main>

      <Footer
        onSelectTab={handleSelectTab}
        onOpenBooking={() => setIsBookingModalOpen(true)}
      />

      {/* Global CRO Conversion Components */}
      <StickyMobileCTA onOpenBooking={() => setIsBookingModalOpen(true)} />
      <ExitIntentModal onOpenBooking={() => setIsBookingModalOpen(true)} />

      <StrategyCallModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
}
