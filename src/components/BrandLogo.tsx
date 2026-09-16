import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  light?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', showTagline = true, light = false }) => {
  const dimensions = {
    sm: { box: 'w-7 h-7 sm:w-8 sm:h-8', text: 'text-sm sm:text-base tracking-[0.12em]', sub: 'text-[7px] sm:text-[8px]' },
    md: { box: 'w-9 h-9 sm:w-11 sm:h-11', text: 'text-base sm:text-lg md:text-xl tracking-[0.16em]', sub: 'text-[8px] sm:text-[9.5px]' },
    lg: { box: 'w-14 h-14 sm:w-16 sm:h-16', text: 'text-xl sm:text-2xl md:text-3xl tracking-[0.18em]', sub: 'text-xs' },
  }[size];

  return (
    <div className="flex items-center gap-2 sm:gap-2.5 group select-none">
      {/* Official Phoenix Crest Emblem from image.png */}
      <div className={`relative ${dimensions.box} rounded-full overflow-hidden border border-gold-500/80 shadow-gold-sm bg-black group-hover:scale-105 group-hover:border-gold-400 transition-all duration-300 shrink-0`}>
        <img 
          src="/assets/images/logo.png" 
          alt="The Eden Park Resto Logo" 
          className="w-full h-full object-cover scale-[1.02]"
        />
      </div>

      {/* Brand Name Typography */}
      <div className="flex flex-col justify-center">
        <div className={`font-serif font-black drop-shadow-xs leading-none transition-colors ${light ? 'text-white' : 'text-gold-gradient'} ${dimensions.text}`}>
          THE EDEN PARK
        </div>
        {showTagline && (
          <div className={`tracking-[0.22em] font-sans uppercase font-bold mt-1 flex items-center gap-1.5 ${dimensions.sub} ${light ? 'text-amber-200/90' : 'text-leela-muted'}`}>
            <span>FAMILY RESTO</span>
            <span className="text-gold-500">•</span>
            <span>CHITTOOR</span>
          </div>
        )}
      </div>
    </div>
  );
};
