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
import AdminDashboard from './components/AdminDashboard';

const VALID_TABS = ['home', 'websites', 'content-strategy', 'ai-consulting', 'about', 'contact', 'admin'];

const getTabFromUrl = () => {
  if (typeof window === 'undefined') return 'home';
  
  // 1. Check query parameter e.g. ?tab=about or ?tab=websites
  const params = new URLSearchParams(window.location.search);
  const tabParam = params.get('tab');
  if (tabParam && VALID_TABS.includes(tabParam)) {
    return tabParam;
  }

  // 2. Fallback check URL hash e.g. /#about or /#websites
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (hash && VALID_TABS.includes(hash)) {
    return hash;
  }

  return 'home';
};

export default function App() {
  const [activeTab, setActiveTab] = useState(getTabFromUrl);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Synchronize state with browser history (back/forward & refresh)
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
      const params = new URLSearchParams(window.location.search);
      params.set('tab', tab);
      const newSearch = params.toString() ? `?${params.toString()}` : '';
      const newUrl = `${window.location.pathname}${newSearch}`;
      window.history.pushState({ tab }, '', newUrl);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Live Website View (Default for all public visitors)
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between selection:bg-emerald-400 selection:text-black">
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenBooking={() => setIsBookingModalOpen(true)}
      />

      <main className="flex-1">
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
            onOpenBooking={() => setIsBookingModalOpen(true)}
          />
        )}

        {activeTab === 'ai-consulting' && (
          <AIConsultingPage
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

        {activeTab === 'admin' && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <AdminDashboard />
          </div>
        )}
      </main>

      <Footer
        onSelectTab={handleSelectTab}
        onOpenBooking={() => setIsBookingModalOpen(true)}
      />

      <StrategyCallModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
}
