import React from 'react';
import { MenuItem } from '../types';
import { Flame, Clock, Sparkles, Eye } from 'lucide-react';

interface Props {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<Props> = ({ item, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(item)}
      className="group relative rounded-2xl overflow-hidden bg-white border border-[#E8DCB8] hover:border-gold-500 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5 shadow-palace-card hover:shadow-palace-hover"
    >
      {/* Food Image & Badges */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#FAF7F2]">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

        {/* Dietary Marker & Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap max-w-[80%]">
          {/* Veg / Non-Veg dot symbol */}
          <span 
            className={`w-5 h-5 rounded-sm flex items-center justify-center border-2 bg-white shadow-md ${
              item.dietary === 'veg' 
                ? 'border-emerald-600' 
                : 'border-rose-600'
            }`}
            title={item.dietary === 'veg' ? '100% Pure Vegetarian' : 'Non-Vegetarian'}
          >
            <span 
              className={`w-2 h-2 rounded-full ${
                item.dietary === 'veg' ? 'bg-emerald-600' : 'bg-rose-600'
              }`} 
            />
          </span>

          {item.isBestseller && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-gold-600 to-gold-700 text-white shadow-sm">
              Bestseller
            </span>
          )}

          {item.isChefSpecial && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-700 text-white flex items-center gap-1 shadow-sm">
              <Sparkles className="w-2.5 h-2.5" /> Chef Special
            </span>
          )}
        </div>

        {/* Spice Level Indicator */}
        {item.spiceLevel > 0 && (
          <div 
            className="absolute top-3 right-3 flex items-center gap-0.5 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full border border-red-300 shadow-sm"
            title={`Spice Level: ${item.spiceLevel}/3`}
          >
            {Array.from({ length: item.spiceLevel }).map((_, i) => (
              <Flame key={i} className="w-3 h-3 text-red-600 fill-red-600" />
            ))}
          </div>
        )}

        {/* Category tag watermark */}
        <div className="absolute bottom-2 left-3">
          <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-gold-900 bg-white/95 px-2 py-0.5 rounded-md shadow-sm border border-[#E8DCB8]">
            {item.category}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-serif font-bold text-lg text-leela-heading group-hover:text-gold-700 transition-colors leading-snug">
              {item.name}
            </h3>
            <span className="text-base sm:text-lg font-mono font-bold text-gold-700 whitespace-nowrap">
              ₹{item.price}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-leela-body font-normal leading-relaxed line-clamp-2 mb-4">
            {item.description}
          </p>
        </div>

        {/* Card Footer Details */}
        <div className="pt-3 border-t border-[#F0E6D8] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[11px] text-leela-muted">
            {item.preparationTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-gold-600" />
                {item.preparationTime}
              </span>
            )}
            {item.calories && (
              <>
                <span>·</span>
                <span className="font-mono">{item.calories} kcal</span>
              </>
            )}
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-bold text-gold-700 group-hover:text-gold-900 transition-colors">
            <span>View Dish</span>
            <Eye className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
