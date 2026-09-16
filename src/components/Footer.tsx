import React from 'react';
import { BrandLogo } from './BrandLogo';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  ArrowUp
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#16120E] border-t border-[#3D3328] text-[#D8CFBF] text-sm relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gold-radial opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12 relative z-10">
        
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <BrandLogo size="md" />

            <p className="text-xs text-[#B8AB99] leading-relaxed font-normal">
              Chittoor's largest dining destination. Sprawling green lawns, AC indoor halls, 
              café, celebration party grounds, sports turf, and stays — set on the Bangalore–Tirupati Highway.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 rounded-full font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Dual Dedicated Kitchens
              </span>
            </div>
          </div>

          {/* Quick Dining Links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Explore Eden Park
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-gold-400 transition-colors">Home &amp; Ambiance</a>
              </li>
              <li>
                <a href="#experience" className="hover:text-gold-400 transition-colors">The Palace Experience</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-gold-400 transition-colors">Interactive Digital Menu</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-gold-400 transition-colors">Lawn Gazebos &amp; Video Reels</a>
              </li>
              <li>
                <a href="#turf" className="hover:text-gold-400 transition-colors">Box Cricket &amp; Football Turf 🏏</a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-gold-400 transition-colors">Highway AC Rooms 🏨</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-gold-400 transition-colors">Diner Reviews &amp; Stories</a>
              </li>
            </ul>
          </div>

          {/* Highway Contact & Location */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Visit &amp; Contact
            </h4>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
              <span className="leading-snug text-[#C8BDAE]">
                Bangalore–Tirupati Highway, Patnam, Chittoor, Andhra Pradesh 517131
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-gold-500 flex-shrink-0" />
              <span className="text-[#C8BDAE]">Daily: 11:00 AM – 11:30 PM</span>
            </div>
            <div className="flex items-center gap-2.5 pt-1">
              <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
              <div className="space-x-2">
                <a href="tel:+919603308999" className="text-white hover:text-gold-400 font-mono font-bold">
                  +91 96033 08999
                </a>
                <span>/</span>
                <a href="tel:+919603304999" className="text-white hover:text-gold-400 font-mono font-bold">
                  +91 96033 04999
                </a>
              </div>
            </div>
          </div>

          {/* Highway Hospitality & Contact */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Highway Hospitality
            </h4>
            <p className="text-xs text-[#B8AB99] leading-relaxed font-normal">
              Taking a highway breather or planning a family lunch? Stop by anytime — our expansive lawns, 
              gazebos, and AC dining are ready to welcome you.
            </p>

            <a
              href="tel:+919603308999"
              className="w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs text-white bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 shadow-gold-sm hover:shadow-gold-md transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 96033 08999</span>
            </a>

            <div className="pt-1 flex items-center justify-between">
              <a
                href="https://www.instagram.com/theedenparkresto"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs text-gold-400 hover:text-gold-300 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>@theedenparkresto</span>
              </a>

              <button
                onClick={scrollToTop}
                className="p-2 rounded-lg bg-[#241E18] border border-[#45382B] hover:border-gold-500 text-gold-400 transition-colors shadow-sm"
                title="Back to Top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* SEO Local Directory & Highway Searches */}
        <div className="pt-8 pb-8 border-t border-[#2B231B] text-[11px] text-[#9E9080] space-y-3">
          <div className="font-serif font-bold text-xs uppercase tracking-wider text-gold-400">
            Popular Searches &amp; Highway Landmarks in Chittoor
          </div>
          <p className="leading-relaxed">
            <strong className="text-[#C8BDAE]">Top Cuisines &amp; Dishes:</strong>{' '}
            <a href="#menu" className="hover:text-gold-400 transition-colors">Hyderabadi Dum Biryani in Chittoor</a> •{' '}
            <a href="#menu" className="hover:text-gold-400 transition-colors">Rayalaseema Chicken Fry</a> •{' '}
            <a href="#menu" className="hover:text-gold-400 transition-colors">Chicken Ulavacharu Biryani</a> •{' '}
            <a href="#menu" className="hover:text-gold-400 transition-colors">Mutton Ghee Roast</a> •{' '}
            <a href="#menu" className="hover:text-gold-400 transition-colors">Paneer Butter Masala</a> •{' '}
            <a href="#menu" className="hover:text-gold-400 transition-colors">Clay Tandoori Naans &amp; Kebabs</a> •{' '}
            <a href="#menu" className="hover:text-gold-400 transition-colors">Paya &amp; Mutton Marag Broth</a> •{' '}
            <a href="#menu" className="hover:text-gold-400 transition-colors">100% Separate Pure Veg Restaurant</a>
          </p>
          <p className="leading-relaxed">
            <strong className="text-[#C8BDAE]">Highway &amp; Pilgrimage Stopovers:</strong>{' '}
            <span>Best Restaurant on Bangalore–Tirupati Highway (NH 69/140)</span> •{' '}
            <span>Chittoor Bypass Dining Oasis</span> •{' '}
            <span>Kanipakam Temple Family Stopover</span> •{' '}
            <span>Tirumala Pilgrims Pure Veg Food Hub</span> •{' '}
            <span>Late Night Dining Chittoor (Open till 11:30 PM)</span> •{' '}
            <span>Safe Restrooms &amp; Parking for Highway Travelers</span>
          </p>
          <p className="leading-relaxed">
            <strong className="text-[#C8BDAE]">Sports &amp; Event Venues:</strong>{' '}
            <a href="#turf" className="hover:text-gold-400 transition-colors">Box Cricket Turf in Chittoor</a> •{' '}
            <a href="#turf" className="hover:text-gold-400 transition-colors">5v5 Football AstroTurf Arena</a> •{' '}
            <a href="#rooms" className="hover:text-gold-400 transition-colors">AC Deluxe Highway Stay Rooms</a> •{' '}
            <a href="#gallery" className="hover:text-gold-400 transition-colors">Celebration Party Lawns &amp; Gazebos Chittoor</a>
          </p>
        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-6 pb-4 border-t border-[#2B231B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7E6D]">
          <div>
            © {new Date().getFullYear()} The Eden Park Family Resto. Crafted with care in Chittoor, Andhra Pradesh.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gold-500 font-medium">
              Bangalore–Tirupati Highway Landmark
            </span>
            <span>•</span>
            <span>All Rights Reserved</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
