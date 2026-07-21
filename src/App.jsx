import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MaintenancePage from './components/MaintenancePage';
import StrategyCallModal from './components/StrategyCallModal';
import HomePage from './pages/HomePage';
import WebsitesPage from './pages/WebsitesPage';
import ContentStrategyPage from './pages/ContentStrategyPage';
import AIConsultingPage from './pages/AIConsultingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard, { AdminLogin } from './components/AdminDashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMaintenance, setIsMaintenance] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Check URL query parameters for direct preview or admin mode
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('preview') === 'true') {
        setIsMaintenance(false);
      }
      if (params.get('tab')) {
        setActiveTab(params.get('tab') || 'home');
      }
    }
  }, []);

  // Handle page tab changes and scroll to top
  const handleSelectTab = (tab) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Phase 5 Maintenance Mode View
  if (isMaintenance) {
    return (
      <>
        <MaintenancePage
          onOpenBookingModal={() => setIsBookingModalOpen(true)}
          onPreviewSite={() => setIsMaintenance(false)}
        />
        <StrategyCallModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
        />
      </>
    );
  }

  // Phase 6 Full Pivoted Website View
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between selection:bg-emerald-400 selection:text-black">
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenBooking={() => setIsBookingModalOpen(true)}
        isMaintenance={isMaintenance}
        onToggleMaintenance={() => setIsMaintenance(!isMaintenance)}
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
