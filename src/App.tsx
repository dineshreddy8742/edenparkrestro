import React, { useState, useEffect } from "react";
import { StoreProvider, useStore } from "./context/StoreContext";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AutoScrollPhotoStrip } from "./components/AutoScrollPhotoStrip";
import { ExperienceShowcase } from "./components/ExperienceShowcase";
import { HomeMenuPreview } from "./components/HomeMenuPreview";
import { HomeTurfPreview } from "./components/HomeTurfPreview";
import { GallerySection } from "./components/GallerySection";
import { RoomBookingSection } from "./components/RoomBookingSection";
import { RecognitionSection } from "./components/RecognitionSection";
import { ReviewsSection } from "./components/ReviewsSection";
import { MenuPage } from "./pages/MenuPage";
import { TurfPage } from "./pages/TurfPage";
import { Footer } from "./components/Footer";
import { OriginalMenuModal } from "./components/OriginalMenuModal";

const AppContent: React.FC = () => {
  const { setIsMenuOriginalOpen } = useStore();
  const [currentPage, setCurrentPage] = useState<'home' | 'menu' | 'turf'>('home');

  const scrollToHash = (hash: string) => {
    if (!hash || hash === '#home' || hash === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('menu')) {
        setCurrentPage('menu');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.includes('turf')) {
        setCurrentPage('turf');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('home');
        scrollToHash(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (page: 'home' | 'menu' | 'turf', targetHash?: string) => {
    if (page === 'home') {
      const finalHash = targetHash || '#home';
      window.location.hash = finalHash;
      setCurrentPage('home');
      scrollToHash(finalHash);
    } else if (page === 'menu') {
      window.location.hash = '#menu';
      setCurrentPage('menu');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'turf') {
      window.location.hash = '#turf';
      setCurrentPage('turf');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-leela-bg text-leela-espresso flex flex-col font-sans selection:bg-gold-200 selection:text-leela-espresso">
      <Navbar onNavigate={navigateTo} currentPage={currentPage} />
      
      <main className="flex-1">
        {currentPage === 'menu' && (
          <MenuPage onBackToHome={() => navigateTo('home')} />
        )}

        {currentPage === 'turf' && (
          <TurfPage onBackToHome={() => navigateTo('home')} />
        )}

        {currentPage === 'home' && (
          <>
            <HeroSection />
            <AutoScrollPhotoStrip />
            <ExperienceShowcase />
            <HomeMenuPreview 
              onOpenFullMenu={() => navigateTo('menu')} 
              onOpenOriginalMenu={() => setIsMenuOriginalOpen(true)}
            />
            <HomeTurfPreview onOpenTurfPage={() => navigateTo('turf')} />
            <GallerySection />
            <RoomBookingSection />
            <RecognitionSection />
            <ReviewsSection />
          </>
        )}
      </main>

      <Footer />
      <OriginalMenuModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
};

export default App;
