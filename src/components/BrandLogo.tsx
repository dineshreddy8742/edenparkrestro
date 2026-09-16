import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  light?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', showTagline = true, light = false }) => {
  const dimensions = {
    sm: { box: 'w-9 h-9', icon: 'w-7 h-7', text: 'text-base', sub: 'text-[9px]' },
    md: { box: 'w-12 h-12', icon: 'w-9 h-9', text: 'text-xl', sub: 'text-[10px]' },
    lg: { box: 'w-16 h-16', icon: 'w-12 h-12', text: 'text-2xl sm:text-3xl', sub: 'text-xs' },
  }[size];

  return (
    <div className="flex items-center gap-3 group">
      {/* Royal Crest Emblem */}
      <div className={`relative ${dimensions.box} rounded-full border border-gold-500/70 p-1 flex items-center justify-center bg-[#FAF6EE] shadow-gold-sm group-hover:scale-105 group-hover:border-gold-600 transition-all duration-300`}>
        <svg viewBox="0 0 120 120" className={`${dimensions.icon} drop-shadow-sm`}>
          <circle cx="60" cy="60" r="56" fill="#FAF6EE" stroke="#B89225" strokeWidth="2.5" />
          <circle cx="60" cy="60" r="51" fill="none" stroke="#D5B45F" strokeWidth="1" strokeDasharray="3 3" />
          
          {/* Laurel Leaves Wreath */}
          <path d="M22 62 C20 45 32 30 45 24 C40 34 38 48 42 60 C32 60 25 61 22 62 Z" fill="url(#crestGold)" opacity="0.9"/>
          <path d="M98 62 C100 45 88 30 75 24 C80 34 82 48 78 60 C88 60 95 61 98 62 Z" fill="url(#crestGold)" opacity="0.9"/>
          
          {/* Phoenix Royal Bird */}
          <path d="M60 20 C54 32 40 38 30 45 C42 48 52 45 55 55 C44 58 32 67 34 78 C45 73 55 64 59 70 C59 78 55 86 60 90 C65 86 61 78 61 70 C65 64 75 73 86 78 C88 67 76 58 65 55 C68 45 78 48 90 45 C80 38 66 32 60 20 Z" fill="url(#crestGold)"/>
          
          {/* Crown Peak */}
          <polygon points="60,14 56,22 64,22" fill="#B89225" />
          <circle cx="60" cy="12" r="2.5" fill="#B89225" />
          <circle cx="53" cy="15" r="1.8" fill="#B89225" />
          <circle cx="67" cy="15" r="1.8" fill="#B89225" />

          {/* Banner Emblem */}
          <path d="M38 96 L82 96 L78 103 L42 103 Z" fill="#F4EFE6" stroke="#B89225" strokeWidth="1" />
          <line x1="48" y1="99" x2="72" y2="99" stroke="#9E781A" strokeWidth="1.5" />
          
          <defs>
            <linearGradient id="crestGold" x1="20" y1="14" x2="100" y2="103" gradientUnits="userSpaceOnUse">
              <stop stopColor="#D5B45F" />
              <stop offset="0.3" stopColor="#B89225" />
              <stop offset="0.7" stopColor="#9E781A" />
              <stop offset="1" stopColor="#6E500B" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Name Typography */}
      <div>
        <div className={`font-serif tracking-[0.2em] font-extrabold text-gold-gradient drop-shadow-sm leading-tight ${dimensions.text}`}>
          THE EDEN PARK
        </div>
        {showTagline && (
          <div className={`tracking-[0.3em] font-sans uppercase font-semibold mt-0.5 flex items-center gap-1.5 ${dimensions.sub} ${light ? 'text-white/85' : 'text-leela-muted'}`}>
            <span>FAMILY RESTO</span>
            <span className="text-gold-500">•</span>
            <span>CHITTOOR</span>
          </div>
        )}
      </div>
    </div>
  );
};
