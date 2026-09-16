import React from 'react';
import { Camera, Sparkles, MapPin } from 'lucide-react';

export const AutoScrollPhotoStrip: React.FC = () => {
  const photos = [
    {
      src: '/assets/images/hero-slide-4.jpg',
      tag: 'Highway Landmark',
      title: 'Grand Entrance & Illuminated Signboard at Night',
      caption: 'Bangalore–Tirupati NH 24/7'
    },
    {
      src: '/assets/images/hero-slide-1.png',
      tag: 'Palatial Grounds',
      title: 'Royal Water Fountains & Manicured Gardens',
      caption: 'Palatial Landscape'
    },
    {
      src: '/assets/images/hero-slide-2.png',
      tag: 'Gazebo Pavilions',
      title: 'Open Garden Gazebos & Courtyard Seating',
      caption: 'Al Fresco Dining'
    },
    {
      src: '/assets/images/hero-slide-5.jpg',
      tag: 'Night Ambiance',
      title: 'Enchanting Fairy Lights Across Celebration Lawns',
      caption: 'Evening Twilight Glow'
    },
    {
      src: '/assets/images/hero-slide-3.jpg',
      tag: 'Garden Lawns',
      title: 'Sprawling Celebration Lawns & Veranda Platforms',
      caption: 'Fresh Air & Greenery'
    },
    {
      src: '/assets/images/hero-slide-6.jpg',
      tag: 'Daylight Veranda',
      title: 'Traditional Open Courtyard & Architecture',
      caption: 'Sunlit Family Dining'
    },
    {
      src: '/assets/images/hero-slide-7.jpg',
      tag: 'Highway Oasis',
      title: 'Secure Parking, Stay Facilities & Highway Lawn',
      caption: '500+ Capacity Grounds'
    },
    {
      src: '/assets/images/hero-slide-8.jpg',
      tag: 'Lantern Dining',
      title: 'Warm Illuminated Outdoor Dinner Tables',
      caption: 'Chittoor Highway Restro'
    },
  ];

  // Duplicate list to create seamless infinite auto-scroll loop
  const seamlessPhotos = [...photos, ...photos];

  return (
    <div className="relative py-6 sm:py-8 bg-[#18130E] border-y border-[#E8DCB8]/30 overflow-hidden select-none">
      {/* Background Subtle Radial Warmth */}
      <div className="absolute inset-0 bg-radial-gradient from-gold-600/10 via-transparent to-transparent pointer-events-none" />

      {/* Ribbon Header Label */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-gold-500/20 text-gold-400 border border-gold-500/30">
            <Camera className="w-3.5 h-3.5" />
          </span>
          <span className="text-xs sm:text-sm font-serif font-bold tracking-wide text-white uppercase">
            Live Highway Estate Captures
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-amber-200/80 font-medium ml-2">
            <Sparkles className="w-3 h-3 text-gold-400" />
            Continuous Auto-Scroll Stream
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-gold-400/80 font-mono">
          <MapPin className="w-3 h-3" />
          <span>Bangalore–Tirupati Highway</span>
        </div>
      </div>

      {/* Infinite Auto-Scrolling Track */}
      <div className="relative w-full overflow-hidden">
        {/* Soft edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 z-10 bg-gradient-to-r from-[#18130E] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 z-10 bg-gradient-to-l from-[#18130E] to-transparent pointer-events-none" />

        <div className="animate-marquee-scroll flex gap-4 sm:gap-5 px-4">
          {seamlessPhotos.map((item, index) => (
            <div
              key={index}
              className="group relative w-64 sm:w-80 h-44 sm:h-52 rounded-2xl overflow-hidden bg-[#241C16] border border-white/10 hover:border-gold-400/80 flex-shrink-0 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02]"
            >
              {/* Photo Image */}
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-3.5 flex flex-col justify-between" />

              {/* Top Tag */}
              <div className="relative z-10">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-gold-300 border border-gold-400/40">
                  {item.tag}
                </span>
              </div>

              {/* Bottom Captions */}
              <div className="relative z-10">
                <h4 className="font-serif text-xs sm:text-sm font-bold text-white leading-tight mb-1 group-hover:text-amber-200 transition-colors line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-[10px] text-white/70 font-mono">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
