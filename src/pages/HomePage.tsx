import React, { useState } from 'react';
import { Header } from '../components/Header';
import { HeroSection } from '../components/home/HeroSection';
import { FloatingFoodJourney } from '../components/home/FloatingFoodJourney';
import { SignatureDishesSection } from '../components/home/SignatureDishesSection';
import { HeritageHighlightSection } from '../components/home/HeritageHighlightSection';
import { FlavoursSection } from '../components/home/FlavoursSection';
import { AmbianceHighlightSection } from '../components/home/AmbianceHighlightSection';
import { SakinakaLocationSection } from '../components/home/SakinakaLocationSection';
import { Footer } from '../components/Footer';
import { ReservationModal } from '../components/ReservationModal';
import { scrollTo } from '../animations/smooth-scroll';

export const HomePage: React.FC = () => {
  const [reservationOpen, setReservationOpen] = useState(false);

  const handleExploreMenu = () => {
    const signaturesEl = document.getElementById('signatures');
    if (signaturesEl) {
      scrollTo(signaturesEl, { offset: -80 });
    }
  };

  return (
    <div className="min-h-screen bg-[#17110F] text-[#FFF9F1] overflow-x-hidden selection:bg-[#641F29] selection:text-[#FFF9F1]">
      {/* 5 Spice Navigation Header */}
      <Header onOpenReservation={() => setReservationOpen(true)} />

      {/* 1. Cinematic Homepage Hero with Crispy Chilli Potatoes Anchor */}
      <HeroSection
        onOpenReservation={() => setReservationOpen(true)}
        onExploreMenu={handleExploreMenu}
      />

      {/* 
        2. & 3. SCROLL-DRIVEN FLOATING FOOD JOURNEY:
        Phase B (3-Scene Pinned Wok Flight) + Phase C (Touchdown onto Volcanic Serving Plate)
      */}
      <FloatingFoodJourney onOpenReservation={() => setReservationOpen(true)} />

      {/* 4. Signature Specialties & Cult Mumbai Dishes */}
      <SignatureDishesSection onReserveTable={() => setReservationOpen(true)} />

      {/* 5. 20-Year Mumbai Heritage & Wok Hei Tradition */}
      <HeritageHighlightSection />

      {/* 6. Four Pillars of Asian Taste */}
      <FlavoursSection />

      {/* 7. Dark Luxury Sakinaka Dining Atmosphere */}
      <AmbianceHighlightSection />

      {/* 8. Sakinaka Location, Metro Directions & Operating Hours */}
      <SakinakaLocationSection onReserveTable={() => setReservationOpen(true)} />

      {/* 9. Editorial Luxury Footer */}
      <Footer />

      {/* Table Reservation Request Modal */}
      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
        restaurantName="5 Spice (Sakinaka Outlet)"
      />
    </div>
  );
};
