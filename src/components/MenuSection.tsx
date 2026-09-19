import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { MenuItem } from '../types';
import { MENU_CATEGORIES } from '../data/menuData';
import { MenuItemCard } from './MenuItemCard';
import { DishDetailModal } from './DishDetailModal';
import { 
  Search, 
  Sparkles, 
  Flame, 
  Leaf, 
  Utensils, 
  SlidersHorizontal,
  X,
  Award,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

export const MenuSection: React.FC = () => {
  const { menuItems } = useStore();

  // User filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [spiceFilter, setSpiceFilter] = useState<'all' | 'mild' | 'spicy'>('all');
  const [quickTag, setQuickTag] = useState<'all' | 'specials' | 'bestsellers' | 'budget'>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'spice'>('recommended');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  // Dynamic filter & search logic
  const filteredAndSortedItems = useMemo(() => {
    let result = menuItems.filter((item) => {
      // Search bar filter (matches name, description, category, subcategory)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        const matchesSub = item.subcategory ? item.subcategory.toLowerCase().includes(q) : false;
        if (!matchesName && !matchesDesc && !matchesCat && !matchesSub) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Dietary filter
      if (dietaryFilter !== 'all' && item.dietary !== dietaryFilter) {
        return false;
      }

      // Spice filter
      if (spiceFilter === 'mild' && item.spiceLevel > 1) {
        return false;
      }
      if (spiceFilter === 'spicy' && item.spiceLevel < 2) {
        return false;
      }

      // Quick tags
      if (quickTag === 'specials' && !item.isChefSpecial) {
        return false;
      }
      if (quickTag === 'bestsellers' && !item.isBestseller) {
        return false;
      }
      if (quickTag === 'budget' && item.price > 200) {
        return false;
      }

      return true;
    });

    // Sorting
    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'spice') {
      result = [...result].sort((a, b) => b.spiceLevel - a.spiceLevel);
    }

    return result;
  }, [menuItems, searchQuery, selectedCategory, dietaryFilter, spiceFilter, quickTag, sortBy]);

  // Count items per category for dropdown badges
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: menuItems.length };
    MENU_CATEGORIES.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = menuItems.filter((it) => it.category === cat).length;
      }
    });
    return counts;
  }, [menuItems]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setDietaryFilter('all');
    setSpiceFilter('all');
    setQuickTag('all');
    setSortBy('recommended');
  };

  const hasActiveFilters = 
    searchQuery.trim() !== '' || 
    selectedCategory !== 'All' || 
    dietaryFilter !== 'all' || 
    spiceFilter !== 'all' || 
    quickTag !== 'all' || 
    sortBy !== 'recommended';

  return (
    <section id="menu" className="py-8 sm:py-12 relative bg-[#FAF7F2] border-t border-[#E8DCB8]">
      {/* Subtle Royal Radial Glow */}
      <div className="absolute inset-0 bg-gold-radial opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
        
        {/* STREAMLINED SINGLE FILTER BAR */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white p-4 sm:p-6 rounded-3xl border border-[#E8DCB8] shadow-palace-card space-y-4"
        >
          {/* Main Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-600 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by dish name or ingredient (e.g. Biryani, Mutton Ghee Roast, Paneer, Naan, Guntur, Fish, Falooda)..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-[#FAF7F2] border border-[#DFCDAB] text-sm sm:text-base text-leela-espresso placeholder-leela-muted focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-400/20 shadow-inner transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-500 hover:text-black bg-gray-200 hover:bg-gray-300 transition-colors"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Unified Controls Grid / Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#F0E6D8]">
            
            {/* Category Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-leela-muted whitespace-nowrap">
                Category:
              </span>
              <div className="relative inline-block">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-[#FAF7F2] border border-[#DFCDAB] rounded-xl pl-3.5 pr-8 py-2 text-xs sm:text-sm font-bold text-leela-heading focus:outline-none focus:border-gold-500 cursor-pointer shadow-sm hover:border-gold-400 transition-all"
                >
                  {MENU_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat} ({categoryCounts[cat] || 0})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gold-700 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Kitchen Filter Dropdown / Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-leela-muted whitespace-nowrap">
                Kitchen:
              </span>
              <div className="relative inline-block">
                <select
                  value={dietaryFilter}
                  onChange={(e) => setDietaryFilter(e.target.value as any)}
                  className="appearance-none bg-[#FAF7F2] border border-[#DFCDAB] rounded-xl pl-3.5 pr-8 py-2 text-xs sm:text-sm font-bold text-leela-heading focus:outline-none focus:border-gold-500 cursor-pointer shadow-sm hover:border-gold-400 transition-all"
                >
                  <option value="all">All Kitchens</option>
                  <option value="veg">🟢 Pure Veg</option>
                  <option value="non-veg">🔴 Non-Veg</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gold-700 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Quick Filter Chips */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setQuickTag(quickTag === 'specials' ? 'all' : 'specials')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  quickTag === 'specials'
                    ? 'bg-rose-800 text-white font-bold shadow-sm'
                    : 'bg-[#FAF7F2] border border-[#DFCDAB] text-leela-heading hover:border-gold-500'
                }`}
              >
                <Sparkles className="w-3 h-3 text-gold-600" />
                <span>Chef's Specials</span>
              </button>

              <button
                onClick={() => setQuickTag(quickTag === 'bestsellers' ? 'all' : 'bestsellers')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  quickTag === 'bestsellers'
                    ? 'bg-gradient-to-r from-gold-600 to-gold-700 text-white font-bold shadow-sm'
                    : 'bg-[#FAF7F2] border border-[#DFCDAB] text-leela-heading hover:border-gold-500'
                }`}
              >
                <Award className="w-3 h-3 text-gold-600" />
                <span>Bestsellers</span>
              </button>

              <button
                onClick={() => setQuickTag(quickTag === 'budget' ? 'all' : 'budget')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  quickTag === 'budget'
                    ? 'bg-gradient-to-r from-gold-600 to-gold-700 text-white font-bold shadow-sm'
                    : 'bg-[#FAF7F2] border border-[#DFCDAB] text-leela-heading hover:border-gold-500'
                }`}
              >
                <span>Under ₹200</span>
              </button>

              <button
                onClick={() => setSpiceFilter(spiceFilter === 'spicy' ? 'all' : 'spicy')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  spiceFilter === 'spicy'
                    ? 'bg-red-700 text-white font-bold shadow-sm'
                    : 'bg-[#FAF7F2] border border-[#DFCDAB] text-leela-heading hover:border-red-300'
                }`}
              >
                <Flame className="w-3 h-3 text-red-600 fill-red-600" />
                <span>Spicy Hot</span>
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs text-leela-muted font-bold flex items-center gap-1 whitespace-nowrap">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Sort:
              </span>
              <div className="relative inline-block">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-[#FAF7F2] border border-[#DFCDAB] rounded-xl pl-3.5 pr-8 py-2 text-xs sm:text-sm text-leela-heading font-semibold focus:outline-none focus:border-gold-500 cursor-pointer shadow-sm hover:border-gold-400 transition-all"
                >
                  <option value="recommended">Curated / Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="spice">Spiciness Level</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gold-700 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

          </div>
        </motion.div>

        {/* Results Counter & Active Filter Reset */}
        <div className="flex items-center justify-between text-xs text-leela-body px-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span>
              Showing <strong className="text-gold-700 font-mono text-sm">{filteredAndSortedItems.length}</strong> items
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-gold-700 hover:text-gold-900 underline underline-offset-2 ml-2 font-bold cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>

          <span className="hidden sm:flex items-center gap-1 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 100% Prepared Fresh to Order
          </span>
        </div>

        {/* DISHES LIST / GRID WITH LANDING-FROM-SIDES SCROLL ANIMATION */}
        {filteredAndSortedItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 overflow-hidden">
            {filteredAndSortedItems.map((item, index) => {
              // Alternate landing direction: left (-60px) or right (+60px)
              const isEvenCol = (index % 2 === 0);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "100px" }}
                  transition={{ 
                    duration: 0.22, 
                    ease: "easeOut" 
                  }}
                >
                  <MenuItemCard
                    item={item}
                    onSelect={(selected) => setSelectedDish(selected)}
                  />
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto my-12 border border-dashed border-gray-300 shadow-sm"
          >
            <Utensils className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-leela-heading mb-2">No matching dishes found</h3>
            <p className="text-xs text-leela-muted mb-5 leading-relaxed">
              We couldn't find items matching your search or active filters. Try searching for "Biryani", "Paneer", "Chicken", or reset your filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-700 text-white text-xs font-bold rounded-xl uppercase tracking-wider shadow-gold-sm cursor-pointer hover:opacity-95"
            >
              Reset All Filters
            </button>
          </motion.div>
        )}

      </div>

      {/* Dish Detail Spotlight Modal */}
      <AnimatePresence>
        {selectedDish && (
          <DishDetailModal
            item={selectedDish}
            onClose={() => setSelectedDish(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
