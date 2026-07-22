import React, { useState } from 'react';
import MaintenancePage from './components/MaintenancePage';
import StrategyCallModal from './components/StrategyCallModal';

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <MaintenancePage
        onOpenBookingModal={() => setIsBookingModalOpen(true)}
      />
      <StrategyCallModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}

