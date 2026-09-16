import React from 'react';
import { MenuItem } from '../types';
import { X, Flame, Clock, Utensils, ShieldCheck } from 'lucide-react';

interface Props {
  item: MenuItem | null;
  onClose: () => void;
}

export const DishDetailModal: React.FC<Props> = ({ item, onClose }) => {
  if (!item) return null;

  const spiceLabels = ['Mild & Aromatic', 'Medium Spiced', 'Fiery Rayalaseema', 'Extra Hot Country Style'];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg rounded-3xl overflow-hidden bg-white border border-[#E8DCB8] shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-leela-heading hover:text-black border border-[#E8DCB8] shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Banner */}
        <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-[#FAF7F2]">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span 
              className={`w-6 h-6 rounded-md flex items-center justify-center border-2 bg-white shadow-md ${
                item.dietary === 'veg' ? 'border-emerald-600' : 'border-rose-600'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${item.dietary === 'veg' ? 'bg-emerald-600' : 'bg-rose-600'}`} />
            </span>

            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md border border-[#E8DCB8] text-gold-900 shadow-sm">
              {item.category}
            </span>
          </div>

          {/* Bottom Title & Price */}
          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
            <div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white drop-shadow">
                {item.name}
              </h2>
              {item.subcategory && (
                <span className="text-xs text-amber-200 font-mono tracking-wider font-semibold">
                  {item.subcategory}
                </span>
              )}
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#FBE39D] drop-shadow">
              ₹{item.price}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-sm bg-white">
          {/* Detailed Culinary Description */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-leela-muted font-bold mb-2">
              Culinary Profile & Ingredients
            </h4>
            <p className="text-leela-body text-sm sm:text-base font-normal leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Key Attributes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DCB8]">
              <span className="text-[11px] text-leela-muted block mb-1 font-semibold">Dietary Class</span>
              <span className={`font-bold text-xs flex items-center gap-1.5 ${item.dietary === 'veg' ? 'text-emerald-700' : 'text-rose-700'}`}>
                <ShieldCheck className="w-4 h-4" />
                {item.dietary === 'veg' ? '100% Pure Veg' : 'Non-Vegetarian'}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DCB8]">
              <span className="text-[11px] text-leela-muted block mb-1 font-semibold">Spice Intensity</span>
              <span className="font-bold text-xs text-rose-700 flex items-center gap-1">
                <Flame className="w-4 h-4 fill-rose-600 text-rose-600" />
                {spiceLabels[item.spiceLevel] || 'Balanced'}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DCB8] col-span-2 sm:col-span-1">
              <span className="text-[11px] text-leela-muted block mb-1 font-semibold">Prep Time</span>
              <span className="font-bold text-xs text-gold-800 flex items-center gap-1.5 font-mono">
                <Clock className="w-4 h-4 text-gold-600" />
                {item.preparationTime || '15 mins'}
              </span>
            </div>
          </div>

          {/* Kitchen Guarantee Note */}
          <div className="p-4 rounded-2xl bg-[#FAF3E0] border border-gold-300 text-xs space-y-1.5 shadow-sm">
            <div className="flex items-center gap-2 text-gold-900 font-bold">
              <Utensils className="w-4 h-4 text-gold-700" />
              <span>Prepared Fresh at The Eden Park Restro Kitchens</span>
            </div>
            <p className="text-leela-body leading-relaxed text-xs">
              {item.dietary === 'veg' 
                ? 'Cooked exclusively in our segregated Pure Vegetarian kitchen using fresh daily produce, farm butter, and cold-pressed oils.'
                : 'Slow-simmered in our Non-Vegetarian kitchen using tender local meats and authentic Rayalaseema & Hyderabadi stone-ground spices.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#F0E6D8] bg-[#FAF7F2] flex items-center justify-between">
          <span className="text-xs text-leela-muted font-medium">
            Available daily: 11:00 AM – 11:30 PM
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-600 to-gold-700 text-white font-bold uppercase tracking-wider text-xs shadow-gold-sm hover:shadow-gold-md transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
