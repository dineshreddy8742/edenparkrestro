import React from 'react';
import { ShieldCheck, Trees, Sparkles, Award, BedDouble } from 'lucide-react';

export const ExperienceShowcase: React.FC = () => {

  const features = [
    {
      title: 'Dual Kitchen Guarantee',
      desc: '100% separate pure vegetarian and non-vegetarian kitchens under distinct roofs with independent cutlery, cookware, and chefs.',
      icon: ShieldCheck,
      image: '/assets/images/ambiance-4.jpg',
      badge: 'Uncompromising Purity'
    },
    {
      title: 'Open Garden Gazebos',
      desc: 'Dine under illuminated twilight skies with cool breezes, manicured green lawns, and wooden platform pavilions.',
      icon: Trees,
      image: '/assets/images/ambiance-8.jpg',
      badge: 'Sunset Dining'
    },
    {
      title: 'Opulent AC Royal Dining',
      desc: 'Floor-to-ceiling glass architecture with climate-controlled luxury seating for formal dinners, families, and executive gatherings.',
      icon: Sparkles,
      image: '/assets/images/ambiance-10.jpg',
      badge: 'Palatial Comfort'
    },
    {
      title: 'Highway Travellers Oasis',
      desc: 'Spacious 24/7 parking, clean rest facilities, café for fresh filter coffee, and stays for highway commuters on Bangalore–Tirupati road.',
      icon: BedDouble,
      image: '/assets/images/ambiance-3.jpg',
      badge: 'Premier Stopover'
    },
  ];

  return (
    <section id="experience" className="py-14 sm:py-16 relative bg-[#FAF5EC] overflow-hidden border-b border-[#E8DCB8]">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Heading — Refined, Not Too Big */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-400 bg-[#FAF3E0] text-gold-900 text-[11px] font-bold uppercase tracking-wider mb-2.5 shadow-xs">
            <Award className="w-3.5 h-3.5 text-gold-700" />
            <span>The Leela-Inspired Hospitality</span>
          </div>

          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-leela-heading mb-2 leading-tight">
            A Destination, <span className="text-gold-gradient italic font-serif">Not Just a Meal</span>
          </h2>

          <p className="text-leela-body text-xs sm:text-sm font-normal leading-relaxed max-w-lg mx-auto">
            Spanning expansive highway grounds, The Eden Park Resto redefines dining in Andhra Pradesh.
            Every corner is designed for regal comfort, family bonding, and unforgettable celebrations.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
          {features.map((feat, index) => {
            const IconComponent = feat.icon;
            return (
              <div 
                key={index}
                className="group relative rounded-2xl overflow-hidden bg-white border border-[#E8DCB8] hover:border-gold-500 transition-all duration-500 flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                {/* Visual Image */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#FAF7F2]">
                  <img
                    src={feat.image}
                    alt={feat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                  
                  <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md border border-gold-300 text-gold-950 shadow-sm">
                    {feat.badge}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#FAF3E0] border border-gold-300 flex items-center justify-center text-gold-700 mb-3 group-hover:bg-gold-500 group-hover:text-white transition-colors duration-300 shadow-xs">
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-leela-heading mb-1.5 group-hover:text-gold-700 transition-colors">
                      {feat.title}
                    </h3>

                    <p className="text-leela-body text-xs sm:text-sm font-normal leading-relaxed mb-4">
                      {feat.desc}
                    </p>
                  </div>

                  <a
                    href="#menu"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-700 hover:text-gold-900 transition-colors group-hover:translate-x-1 duration-300"
                  >
                    <span>Explore Available Delicacies →</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
