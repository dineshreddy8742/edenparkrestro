import React from 'react';
import { TurfBookingSection } from '../components/TurfBookingSection';
import { ArrowLeft, Clock, Sun, Moon, Info, ShieldCheck, Phone } from 'lucide-react';

interface TurfPageProps {
  onBackToHome: () => void;
}

export const TurfPage: React.FC<TurfPageProps> = ({ onBackToHome }) => {
  return (
    <div className="min-h-screen bg-[#0a0f0d] text-gray-200 pt-20 sm:pt-24 pb-16">
      
      {/* Top Header Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#121915] border border-emerald-900/40 shadow-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-bold border border-white/10 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-400" />
              <span>← Back to Home</span>
            </button>
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-white/10">
              <div className="w-7 h-7 rounded-full overflow-hidden border border-gold-400 bg-black shrink-0 shadow-xs">
                <img src="/assets/images/logo.png" alt="The Eden Park" className="w-full h-full object-cover" />
              </div>
              <span className="font-serif font-black text-xs sm:text-sm text-gold-400 tracking-wider">THE EDEN PARK</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="hidden sm:inline text-gray-400">Need help booking?</span>
            <a
              href="tel:+919603308999"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 font-bold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Turf: +91 96033 08999</span>
            </a>
          </div>
        </div>
      </div>

      {/* Crystal Clear Slot Logic Explanation Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#121915] via-[#16231d] to-[#121915] border border-emerald-500/30 shadow-xl">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shrink-0 mt-0.5">
              <Info className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                How Turf Time Slots &amp; Pricing Work
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs text-gray-300">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-1.5 font-bold text-amber-400 mb-1">
                    <Sun className="w-3.5 h-3.5" /> Day Slots (6 AM – 6 PM)
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    ₹600 / hour. Natural daylight play across Court 1 &amp; Court 2. Free cricket kit included.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-1.5 font-bold text-teal-400 mb-1">
                    <Moon className="w-3.5 h-3.5" /> Night Floodlights (6 PM – 10 PM)
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    ₹700 / hour. Powerful high-mast LED floodlights for evening and night tournaments.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-400 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Simple 3-Step Booking
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    Pick a green available slot → Enter your name &amp; phone → Pay at Turf (Cash/UPI) or Pay Online!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Turf Booking Engine */}
      <TurfBookingSection />
    </div>
  );
};
