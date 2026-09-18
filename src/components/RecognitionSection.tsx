import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  MapPin, 
  Phone, 
  Clock, 
  Navigation, 
  CheckCircle2
} from 'lucide-react';

export const RecognitionSection: React.FC = () => {

  return (
    <section id="recognition" className="py-14 sm:py-16 relative bg-[#FAF7F2] border-t border-[#E8DCB8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Banner Card */}
        <div className="rounded-3xl p-6 sm:p-10 bg-white border border-[#E8DCB8] shadow-palace-card relative overflow-hidden">
          {/* Background Radial Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Accolades Column (Lands from Left) */}
            <motion.div 
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="lg:col-span-7 space-y-4"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-400 bg-[#FAF3E0] text-gold-900 text-[11px] font-bold uppercase tracking-wider shadow-xs">
                <Trophy className="w-3.5 h-3.5 text-gold-700" />
                <span>Highway Dining Landmark</span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-leela-heading leading-tight mb-2">
                Chittoor's Favorite <span className="text-gold-gradient italic font-serif">Highway Family Restaurant</span>
              </h2>

              <p className="text-leela-body text-sm sm:text-base font-normal leading-relaxed">
                Conveniently located on the Bangalore–Tirupati National Highway, The Eden Park Resto
                is the trusted stop for families, pilgrims, and road-trippers looking for delicious food,
                clean facilities, and warm Andhra hospitality.
              </p>

              {/* Accolade Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DCB8]">
                  <div className="flex items-center gap-1 text-gold-600 mb-1">
                    <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
                    <span className="font-mono font-bold text-lg text-leela-heading">4.8 / 5.0</span>
                  </div>
                  <div className="text-xs text-leela-muted font-medium">Google Diner Rating</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DCB8]">
                  <div className="font-mono font-bold text-lg text-gold-700 mb-1">
                    25,000+
                  </div>
                  <div className="text-xs text-leela-muted font-medium">Patrons Welcomed</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DCB8] col-span-2 sm:col-span-1">
                  <div className="font-mono font-bold text-lg text-emerald-700 mb-1">
                    100% Dual
                  </div>
                  <div className="text-xs text-leela-muted font-medium">Dedicated Kitchens</div>
                </div>
              </div>

              {/* Key Distinctions checklist */}
              <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-leela-body">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0" />
                  <span>Officially certified separate pure veg & non-veg kitchen infrastructures</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0" />
                  <span>Wood-fired Jeera Samba clay pot biryani cooked over natural charcoal</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0" />
                  <span>Sprawling 24-hour illuminated parking with dedicated sports turf & stays</span>
                </div>
              </div>
            </motion.div>

            {/* Right Map & Direct Highway Guide Column (Lands from Right) */}
            <motion.div 
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="lg:col-span-5 bg-[#FAF7F2] border border-[#E8DCB8] rounded-3xl p-6 sm:p-7 space-y-6 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-[#E8DCB8] pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#FAF3E0] border border-gold-300 text-gold-700">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-leela-heading">Plan Your Visit</h3>
                    <span className="text-xs text-leela-muted">Chittoor, Andhra Pradesh</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Open Daily
                </span>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-leela-body">
                <div>
                  <span className="text-leela-muted font-bold block uppercase tracking-wider text-[10px] mb-1">
                    Official Landmark Address
                  </span>
                  <p className="font-semibold text-leela-heading leading-snug">
                    Bangalore–Tirupati Highway, Patnam, Chittoor, Andhra Pradesh 517131
                  </p>
                </div>

                <div className="flex items-center gap-2 text-leela-body font-medium">
                  <Clock className="w-4 h-4 text-gold-600 flex-shrink-0" />
                  <span>Operating Hours: 11:00 AM – 11:30 PM (Mon–Sun)</span>
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="text-leela-muted font-bold block uppercase tracking-wider text-[10px]">
                    Direct Restaurant Captains
                  </span>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <a
                      href="tel:+919603308999"
                      className="p-3 rounded-xl bg-white hover:bg-[#FAF3E0] border border-[#DFCDAB] hover:border-gold-500 text-gold-900 font-mono text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5 text-gold-600" /> +91 96033 08999
                    </a>
                    <a
                      href="tel:+919603304999"
                      className="p-3 rounded-xl bg-white hover:bg-[#FAF3E0] border border-[#DFCDAB] hover:border-gold-500 text-gold-900 font-mono text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5 text-gold-600" /> +91 96033 04999
                    </a>
                  </div>
                </div>
              </div>

              {/* Navigation Action */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://maps.google.com/?q=Eden+Park+Family+Resto+Chittoor"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-gold-600 to-gold-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-sm hover:shadow-gold-md transition-all cursor-pointer hover:scale-105"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Google Maps Directions</span>
                </a>

                <a
                  href="tel:+919603308999"
                  className="py-3.5 px-4 rounded-xl border border-gold-400 bg-white hover:bg-[#FAF3E0] text-gold-900 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-600" />
                  <span>Call Restro</span>
                </a>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};
