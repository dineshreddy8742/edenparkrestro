import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Sun, Moon, ArrowRight, ShieldCheck } from 'lucide-react';

interface HomeTurfPreviewProps {
  onOpenTurfPage: () => void;
}

export const HomeTurfPreview: React.FC<HomeTurfPreviewProps> = ({ onOpenTurfPage }) => {
  return (
    <section id="turf-preview" className="py-10 sm:py-16 bg-[#0a0f0d] text-gray-200 relative overflow-hidden border-t border-emerald-900/30">
      {/* Subtle Radial Glow */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Banner Card */}
        <div className="bg-[#121915] border border-emerald-500/30 rounded-3xl p-5 sm:p-10 shadow-2xl overflow-hidden relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Left Column: Details & Features */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="lg:col-span-7 space-y-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Trophy className="w-3.5 h-3.5" /> Chittoor Sports Landmark
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-300">
                  <Clock className="w-3.5 h-3.5 text-gray-400" /> Open Daily: 06:00 AM – 10:00 PM
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                The Eden Park <span className="text-emerald-400">Turf Arena</span>
              </h2>

              <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl">
                Chittoor's premier FIFA-grade 50mm AstroTurf on the Bangalore–Tirupati Highway. 
                Equipped with high-mast floodlights, complimentary cricket kits, and 2 state-of-the-art box pitches.
              </p>

              {/* Amenity Chips */}
              <div className="flex flex-wrap gap-2 pt-1 text-xs text-gray-300">
                <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/10">🏏 Free Bats &amp; Leather/Tennis Balls</span>
                <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/10">⚽ 5v5 Football Goals</span>
                <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/10">💡 High-Mast LED Floodlights</span>
                <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/10">🚗 Spacious Highway Parking</span>
              </div>

              {/* Day & Night Price Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="px-4 py-2 rounded-xl bg-amber-950/30 border border-amber-500/30">
                  <div className="text-[10px] text-amber-400 font-semibold uppercase flex items-center gap-1">
                    <Sun className="w-3 h-3" /> Day (6 AM - 6 PM)
                  </div>
                  <div className="text-lg font-black text-white">₹600 <span className="text-xs font-normal text-gray-400">/ hr</span></div>
                </div>

                <div className="px-4 py-2 rounded-xl bg-emerald-950/40 border border-emerald-500/40">
                  <div className="text-[10px] text-emerald-400 font-semibold uppercase flex items-center gap-1">
                    <Moon className="w-3 h-3" /> Night Floodlights (6 PM - 10 PM)
                  </div>
                  <div className="text-lg font-black text-emerald-400">₹700 <span className="text-xs font-normal text-gray-400">/ hr</span></div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Book Button & Visual Preview */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="lg:col-span-5 bg-[#0a0f0d] rounded-2xl p-5 sm:p-6 border border-white/10 space-y-4 text-center"
            >
              <div className="text-left space-y-2 border-b border-white/10 pb-4">
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">
                  Live Slot Booking Engine
                </span>
                <h3 className="text-lg font-bold text-white">
                  Instant Slot Check &amp; Confirmation Pass
                </h3>
                <p className="text-xs text-gray-400">
                  Pick your date, choose Court 1 or Court 2, and reserve your match slot in 30 seconds.
                </p>
              </div>

              <div className="space-y-2 text-left text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Court 1: Main Arena (Box Cricket / 5v5 Football)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Court 2: Box 2 (Box Cricket &amp; Practice Nets)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Pay at Turf on Arrival or Pay Online</span>
                </div>
              </div>

              <button
                onClick={onOpenTurfPage}
                className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/60 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Book Turf Slots Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-gray-400 flex items-center justify-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant WhatsApp Match Pass generated</span>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};
