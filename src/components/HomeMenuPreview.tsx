import React from 'react';
import { Utensils, ArrowRight, Sparkles, BookOpen, Star } from 'lucide-react';
import { MenuItem } from '../types';

interface HomeMenuPreviewProps {
  onOpenFullMenu: () => void;
  onOpenOriginalMenu: () => void;
}

// 6 Curated Signature Highlights for clean, mobile-fast home landing page
const SIGNATURE_HIGHLIGHTS = [
  {
    name: 'Hyderabad Dum Biryani',
    category: 'Biryanis',
    price: 250,
    dietary: 'non-veg',
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    desc: 'Aged royal basmati sealed with tender chicken, Kashmiri saffron, mint & pure ghee in clay dum.'
  },
  {
    name: 'Rayala Seema Chicken Fry',
    category: "Chef's Specials",
    price: 270,
    dietary: 'non-veg',
    tag: 'Signature',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    desc: 'Fiery country chicken slow-roasted with crushed Rayalaseema red chillies and native spices.'
  },
  {
    name: 'Mutton Ghee Roast',
    category: "Chef's Specials",
    price: 390,
    dietary: 'non-veg',
    tag: 'Must Try',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    desc: 'Prime tender lamb morsels slow-braised in clarified desi cow ghee and royal whole spices.'
  },
  {
    name: 'Paneer Butter Masala',
    category: 'Curries & Gravies',
    price: 249,
    dietary: 'veg',
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
    desc: 'Fresh cottage cheese cubes bathing in rich tomato-cashew satin gravy with kasoori methi.'
  },
  {
    name: 'Butter Naan & Garlic Naan',
    category: 'Indian Breads',
    price: 55,
    dietary: 'veg',
    tag: 'Tandoor Hot',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
    desc: 'Soft leavened tandoor bread brushed lavishly with butter and freshly minced garlic herbs.'
  },
  {
    name: 'Coconut Kiss Mocktail',
    category: 'Beverages & Desserts',
    price: 160,
    dietary: 'veg',
    tag: 'Signature Drink',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    desc: 'Tender coconut water blended with pineapple nectar and fresh mint over crushed ice.'
  }
];

export const HomeMenuPreview: React.FC<HomeMenuPreviewProps> = ({ onOpenFullMenu, onOpenOriginalMenu }) => {
  return (
    <section id="menu-preview" className="py-12 sm:py-16 bg-[#FAF7F2] border-t border-[#E8DCB8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-400 bg-[#FAF3E0] text-gold-900 text-[11px] font-bold uppercase tracking-wider mb-2.5 shadow-xs">
              <Utensils className="w-3.5 h-3.5 text-gold-700" />
              <span>Signature Highlights</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-leela-heading leading-tight mb-2">
              Popular Dishes at <span className="text-gold-gradient italic font-serif">The Eden Park</span>
            </h2>

            <p className="text-leela-body text-xs sm:text-sm md:text-base max-w-xl font-normal leading-relaxed">
              Crafted in 100% separate Pure Veg and Non-Veg kitchens. Taste our most-loved highway specialties.
            </p>
          </div>

          {/* Desktop Call to Action */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenOriginalMenu}
              className="px-4 py-2.5 rounded-full border border-gold-400/80 bg-white hover:bg-[#FAF3E0] text-xs font-bold text-gold-800 transition-all flex items-center gap-2 shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-gold-600" />
              <span>10-Page Booklet Scans</span>
            </button>
            <button
              onClick={onOpenFullMenu}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-500 hover:to-gold-600 text-xs font-bold uppercase tracking-wider text-white transition-all shadow-md flex items-center gap-2"
            >
              <span>Explore Full Menu (45+ Dishes)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 6 Clean Cards Grid (Mobile friendly 1 col on mobile, 2 col sm, 3 col lg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {SIGNATURE_HIGHLIGHTS.map((dish, i) => (
            <div
              key={i}
              onClick={onOpenFullMenu}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E8DCB8] hover:border-gold-500 transition-all duration-300 cursor-pointer shadow-palace-card hover:shadow-palace-hover flex flex-col justify-between"
            >
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-[#241C16]">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                
                {/* Veg/Non-Veg & Tag Badges */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span
                    className={`w-4 h-4 rounded-xs flex items-center justify-center border-2 bg-white shadow-sm ${
                      dish.dietary === 'veg' ? 'border-emerald-600' : 'border-rose-600'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${dish.dietary === 'veg' ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/70 text-gold-300 backdrop-blur-sm border border-gold-400/40">
                    {dish.tag}
                  </span>
                </div>

                <div className="absolute bottom-2 left-2.5 text-xs text-white/90 font-mono font-bold bg-black/60 px-2 py-0.5 rounded">
                  {dish.category}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-serif font-bold text-base text-leela-heading group-hover:text-gold-700 transition-colors">
                      {dish.name}
                    </h3>
                    <span className="text-base font-mono font-bold text-gold-700 whitespace-nowrap">
                      ₹{dish.price}
                    </span>
                  </div>
                  <p className="text-xs text-leela-body line-clamp-2 leading-relaxed font-normal">
                    {dish.desc}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-[#F0E6D8] flex items-center justify-between text-xs text-gold-700 font-bold group-hover:text-gold-600">
                  <span>Order &amp; Customize</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Full Menu CTA Button */}
        <div className="flex flex-col sm:hidden gap-3">
          <button
            onClick={onOpenFullMenu}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-600 to-gold-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
          >
            <span>View All 45+ Dishes on Full Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenOriginalMenu}
            className="w-full py-3 rounded-xl border border-gold-400/70 bg-white text-xs font-bold text-gold-800 flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-gold-700" />
            <span>View 10-Page Printed Booklet</span>
          </button>
        </div>

      </div>
    </section>
  );
};
