import React from 'react';
import { MenuSection } from '../components/MenuSection';
import { ArrowLeft, BookOpen, Utensils, Phone, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface MenuPageProps {
  onBackToHome: () => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({ onBackToHome }) => {
  const { setIsMenuOriginalOpen } = useStore();

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-leela-heading pt-20 sm:pt-24 pb-16">
      
      {/* Top Header Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E8DCB8] shadow-sm">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF3E0] hover:bg-[#F5E6BD] text-gold-900 text-xs sm:text-sm font-bold border border-gold-300 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-gold-700" />
            <span>← Back to Eden Park Home</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMenuOriginalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-[#FAF3E0] text-xs font-bold text-gold-800 border border-gold-400 shadow-xs transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-gold-600" />
              <span>10-Page Printed Booklet</span>
            </button>
            <a
              href="tel:+919603308999"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gold-600 hover:bg-gold-700 text-white text-xs font-bold transition-all shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: +91 96033 08999</span>
            </a>
          </div>
        </div>
      </div>

      {/* Full Dedicated Interactive Digital Menu */}
      <MenuSection />
    </div>
  );
};
