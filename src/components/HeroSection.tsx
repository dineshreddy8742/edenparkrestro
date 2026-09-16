import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  UtensilsCrossed, 
  BookOpen,
  ShieldCheck, 
  Sparkles, 
  Users, 
  Star,
  Compass,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setIsMenuOriginalOpen } = useStore();

  const slides = [
    {
      src: '/assets/images/hero-slide-1.png',
      title: 'Green Lawns & Resort Grounds',
      tag: 'Garden Grounds',
      desc: 'Spacious highway restaurant welcoming Bangalore–Tirupati commuters'
    },
    {
      src: '/assets/images/hero-slide-2.png',
      title: 'Open Dining Gazebos & Courtyard',
      tag: 'Garden Gazebos',
      desc: 'Open-air dining under evening skies with natural cross-breezes'
    },
    {
      src: '/assets/images/hero-slide-3.jpg',
      title: 'Authentic Green Lawn & Open Pavilions',
      tag: 'Garden Lawns',
      desc: 'Lush green lawns and private outdoor party platforms'
    },
    {
      src: '/assets/images/hero-slide-4.jpg',
      title: 'Eden Park Highway Entrance & Signboard',
      tag: 'Highway Landmark',
      desc: 'Illuminated 24/7 landmark on Bangalore–Tirupati National Highway'
    },
    {
      src: '/assets/images/hero-slide-5.jpg',
      title: 'Twilight Fairy Lights Celebration Arch',
      tag: 'Evening Glow',
      desc: 'Enchanting night lighting across dining platforms and event lawns'
    },
    {
      src: '/assets/images/hero-slide-6.jpg',
      title: 'Daylight Open Courtyard & Dining Veranda',
      tag: 'Daylight Veranda',
      desc: 'Spacious traditional veranda architecture with natural light'
    },
    {
      src: '/assets/images/hero-slide-7.jpg',
      title: 'Sprawling Highway Resort Estate & Parking',
      tag: 'Highway Oasis',
      desc: 'Secure 24/7 parking, coffee cafe, and overnight highway stays'
    },
    {
      src: '/assets/images/hero-slide-8.jpg',
      title: 'Outdoor Garden Lantern Dining',
      tag: 'Al Fresco Dining',
      desc: 'Comfortable family tables nestled in landscaped greenery'
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const SLIDE_INTERVAL = 4200; // 4.2 seconds per slide

  // Uninterrupted auto-scroll timer with live animated progress bar
  useEffect(() => {
    if (!isPlaying) return;

    const stepMs = 50;
    const increment = (stepMs / SLIDE_INTERVAL) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % slides.length);
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => clearInterval(timer);
  }, [isPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setProgress(0);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  return (
    <section 
      id="home" 
      className="relative h-screen min-h-[660px] w-full flex flex-col justify-between pt-28 sm:pt-32 pb-6 sm:pb-8 overflow-hidden"
    >
      {/* VIBRANT BACKGROUND IMAGES — CLEAR & CRISP, AUTO-SCROLLING */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#110E0B]">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div 
              key={index}
              className={`absolute inset-0 w-full h-full transition-all duration-1200 ease-in-out ${
                isActive ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'
              }`}
            >
              <img
                src={slide.src}
                alt={slide.title}
                className={`w-full h-full object-cover object-center filter brightness-[0.84] contrast-[1.08] transition-transform duration-[6500ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
          );
        })}

        {/* Clean, Rich Cinematic Contrast Vignette: No milky white wash */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/65 pointer-events-none" />

        {/* Top Edge Auto-Scroll Progress Line */}
        <div className="absolute top-0 left-0 right-0 h-1 z-30 bg-black/40">
          <div 
            className="h-full bg-gradient-to-r from-gold-500 to-amber-300 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Sleek Side Arrow Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/80 text-white/90 hover:text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl"
        aria-label="Previous background photo"
        title="Previous Photo"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 -ml-0.5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/80 text-white/90 hover:text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl"
        aria-label="Next background photo"
        title="Next Photo"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 -mr-0.5" />
      </button>

      {/* MAIN HERO CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center flex-1 py-4">
        
        {/* Compact Highway Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-400/50 bg-black/60 text-gold-300 text-[11px] font-bold uppercase tracking-wider mb-3 backdrop-blur-md shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>Bangalore–Tirupati Highway</span>
        </div>

        {/* Clean & Warm Heading */}
        <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight sm:leading-snug mb-3 drop-shadow-md">
          Authentic Flavours &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7E7C4] via-[#DFB864] to-[#F7E7C4] italic font-serif">
            Warm Ambiance
          </span>
        </h1>

        {/* Short & Clean Subtitle */}
        <p className="text-xs sm:text-sm md:text-base text-stone-200 max-w-xl font-medium leading-relaxed mb-6 drop-shadow-sm px-2">
          Wood-fired biryanis &amp; authentic dining — served in 100% separate Veg &amp; Non-Veg kitchens.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mb-4">
          <a
            href="#menu"
            className="w-full sm:w-auto px-7 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#EEDAA2] via-[#DFB864] to-[#C59B3F] hover:from-[#F7E7C4] hover:to-[#DFB864] shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <UtensilsCrossed className="w-4 h-4 text-black" />
            <span>Explore Food Menu</span>
          </a>

          <button
            onClick={() => setIsMenuOriginalOpen(true)}
            className="w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wide text-white bg-black/60 hover:bg-black/80 border border-gold-400/60 hover:border-gold-300 backdrop-blur-md shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-gold-400" />
            <span>View Printed Menu</span>
          </button>
        </div>

        {/* AUTO-SCROLL SLIDE INDICATOR & CONTROLS */}
        <div className="inline-flex items-center gap-2.5 bg-black/55 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-md mb-2 text-xs">
          
          {/* Pause / Play Toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 rounded-full text-gold-300 hover:text-white transition-colors"
            title={isPlaying ? "Pause Auto-Scroll" : "Play Auto-Scroll"}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-gold-400" />}
          </button>

          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gold-400">
            {slides[currentSlide].tag}:
          </span>

          <span className="text-[11px] text-white/95 font-semibold truncate max-w-[170px] sm:max-w-[260px]">
            {slides[currentSlide].title}
          </span>

          <span className="text-[10px] font-mono text-white/60">
            {currentSlide + 1}/{slides.length}
          </span>

          <span className="h-2.5 w-[1px] bg-white/20" />

          {/* 8 Numbered Dots with Progress Fill */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`relative h-2 rounded-full overflow-hidden transition-all duration-300 ${
                  i === currentSlide 
                    ? 'w-6 bg-white/30 ring-1 ring-gold-400' 
                    : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                title={`Slide ${i + 1}: ${slides[i].title}`}
                aria-label={`Slide ${i + 1}`}
              >
                {i === currentSlide && (
                  <div 
                    className="absolute inset-0 bg-gold-400 transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* COMPACT DISTINCTIONS RIBBON — SLEEK FROSTED GLASS AT BOTTOM OF HERO */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 w-full mt-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 bg-black/55 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-white/20 shadow-lg">
          <div className="text-center py-1 px-2 border-r border-white/10 last:border-r-0">
            <div className="text-gold-400 flex justify-center mb-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs sm:text-sm font-serif font-bold text-white leading-tight">Separate Kitchens</div>
            <div className="text-[10px] text-white/70">100% Pure Veg & Non-Veg</div>
          </div>

          <div className="text-center py-1 px-2 border-r border-white/10 last:border-r-0">
            <div className="text-gold-400 flex justify-center mb-0.5">
              <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
            </div>
            <div className="text-xs sm:text-sm font-serif font-bold text-white leading-tight">4.8 ★ Rated</div>
            <div className="text-[10px] text-white/70">Chittoor's Highest Rated</div>
          </div>

          <div className="text-center py-1 px-2 border-r border-white/10 last:border-r-0">
            <div className="text-gold-400 flex justify-center mb-0.5">
              <Users className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs sm:text-sm font-serif font-bold text-white leading-tight">500+ Seats</div>
            <div className="text-[10px] text-white/70">Garden, AC Hall & Terrace</div>
          </div>

          <div className="text-center py-1 px-2">
            <div className="text-gold-400 flex justify-center mb-0.5">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs sm:text-sm font-serif font-bold text-white leading-tight">Highway Oasis</div>
            <div className="text-[10px] text-white/70">Parking, Turf & Stays</div>
          </div>
        </div>
      </div>
    </section>
  );
};
