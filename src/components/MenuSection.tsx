import React, { useState, useMemo, useRef } from 'react';
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
  BookOpen, 
  Utensils, 
  ChevronRight, 
  ChevronLeft,
  Maximize2,
  CheckCircle2,
  SlidersHorizontal,
  X,
  Award
} from 'lucide-react';

export const MenuSection: React.FC = () => {
  const { menuItems, setIsMenuOriginalOpen } = useStore();

  // Mode switcher: Digital Dish Finder vs 10-Page Scanned Booklet
  const [activeMenuTab, setActiveMenuTab] = useState<'digital' | 'booklet'>('digital');
  const [bookletPage, setBookletPage] = useState(1);
  const totalBookletPages = 10;
  const bookletCategories: Record<number, string> = {
    1: 'Indian Breads',
    2: 'Curries & Gravies',
    3: "Chef's Specials",
    4: 'Rice & Chinese Noodles',
    5: 'South Indian Non-Veg',
    6: 'Biryanis Collection',
    7: 'Chinese Starters',
    8: 'Soups & Salads',
    9: 'Tandoori Starters',
    10: 'Beverages & Juices',
  };

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

      // Category tab
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

  // Count items per category for badges
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
    <section id="menu" className="py-14 sm:py-16 relative bg-[#FAF7F2] border-t border-[#E8DCB8]">
      {/* Subtle Royal Radial Glow */}
      <div className="absolute inset-0 bg-gold-radial opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-400 bg-[#FAF3E0] text-gold-900 text-[11px] font-bold uppercase tracking-wider mb-2.5 shadow-xs">
            <Utensils className="w-3.5 h-3.5 text-gold-700" />
            <span>Curated Culinary Collection</span>
          </div>

          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-leela-heading mb-2 leading-tight">
            What's Available at <span className="text-gold-gradient italic font-serif">The Eden Park Restro</span>
          </h2>

          <p className="text-leela-body text-sm sm:text-base font-normal leading-relaxed">
            Explore our complete spread of wood-fired biryanis, authentic Rayalaseema specialties, 
            tandoori kebabs, and pure vegetarian dishes prepared in our dedicated kitchens.
          </p>

          {/* Quick Trigger to view original 10-page printed menu booklet */}
          <div className="mt-6 inline-block">
            <button
              onClick={() => setIsMenuOriginalOpen(true)}
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-[#E8DCB8] hover:border-gold-500 text-leela-heading hover:text-gold-800 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
            >
              <span className="p-1.5 rounded-full bg-[#FAF3E0] text-gold-700 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                <BookOpen className="w-4 h-4" />
              </span>
              <span className="text-xs sm:text-sm font-bold tracking-wide">
                Flip Through Official 10-Page Gold Menu Booklet (Scans)
              </span>
              <span className="text-xs text-gold-700 group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Cuisine Types Overview Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 max-w-4xl mx-auto text-center">
          <div className="p-3.5 rounded-2xl bg-white border border-[#E8DCB8] shadow-sm">
            <span className="text-gold-700 text-xs font-mono font-bold block">100% SEPARATE</span>
            <span className="text-xs text-leela-body font-medium">Pure Veg & Non-Veg</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-[#E8DCB8] shadow-sm">
            <span className="text-gold-700 text-xs font-mono font-bold block">WOOD-FIRED</span>
            <span className="text-xs text-leela-body font-medium">Jeera Samba Biryani</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-[#E8DCB8] shadow-sm">
            <span className="text-gold-700 text-xs font-mono font-bold block">CLAY TANDOOR</span>
            <span className="text-xs text-leela-body font-medium">Smoked Kebabs & Naans</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-[#E8DCB8] shadow-sm">
            <span className="text-gold-700 text-xs font-mono font-bold block">RAYALASEEMA</span>
            <span className="text-xs text-leela-body font-medium">Stone-Ground Spices</span>
          </div>
        </div>

        {/* DUAL VIEW MODE SELECTOR: DIGITAL SEARCH vs PRINTED BOOKLET */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-[#E8DCB8] shadow-sm">
            <button
              onClick={() => setActiveMenuTab('digital')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeMenuTab === 'digital'
                  ? 'bg-gradient-to-r from-gold-600 to-gold-700 text-white shadow-sm'
                  : 'text-leela-body hover:text-leela-heading'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Digital Dish Finder</span>
            </button>
            <button
              onClick={() => setActiveMenuTab('booklet')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeMenuTab === 'booklet'
                  ? 'bg-gradient-to-r from-gold-600 to-gold-700 text-white shadow-sm'
                  : 'text-leela-body hover:text-leela-heading'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Original Gold Printed Booklet (10 Pages)</span>
            </button>
          </div>
        </div>

        {/* CONDITIONAL CONTENT: EITHER EMBEDDED BOOKLET OR DIGITAL SEARCH & GRID */}
        {activeMenuTab === 'booklet' ? (
          /* EMBEDDED LUXURY BOOKLET VIEWER */
          <div className="bg-[#14100C] p-3 sm:p-6 md:p-8 rounded-3xl border border-[#E8DCB8]/60 shadow-2xl text-white space-y-4 mb-8">
            
            {/* Booklet Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="p-1 rounded bg-gold-500/20 text-gold-400">
                    <BookOpen className="w-4 h-4" />
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                    Original Gold Printed Menu Booklet
                  </h3>
                  <span className="text-xs font-mono font-bold text-gold-400 bg-gold-500/20 px-2 py-0.5 rounded border border-gold-500/30">
                    Page {bookletPage} of {totalBookletPages}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-amber-200/90 mt-1 font-medium">
                  {bookletCategories[bookletPage]} — Scanned High-Resolution Physical Menu
                </p>
              </div>

              {/* Full Page Button */}
              <button
                onClick={() => setIsMenuOriginalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex-shrink-0"
              >
                <Maximize2 className="w-4 h-4" />
                <span>Open Immersive Full Page View</span>
              </button>
            </div>

            {/* Quick Category Jump Strip */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {Array.from({ length: totalBookletPages }).map((_, i) => {
                const p = i + 1;
                const isSelected = bookletPage === p;
                return (
                  <button
                    key={p}
                    onClick={() => setBookletPage(p)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 flex-shrink-0 ${
                      isSelected
                        ? 'bg-gradient-to-r from-gold-600 to-gold-700 text-white font-bold shadow-md ring-1 ring-gold-400'
                        : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5'
                    }`}
                  >
                    <span className="font-mono text-[10px] opacity-75">{p}.</span>
                    <span>{bookletCategories[p]}</span>
                  </button>
                );
              })}
            </div>

            {/* Booklet Canvas with Large High-Res Image */}
            <div className="relative bg-[#070605] rounded-2xl p-2 sm:p-4 flex items-center justify-center border border-white/10 overflow-hidden min-h-[420px] sm:min-h-[580px] group">
              <img
                src={`/assets/menu/page_${bookletPage}.jpg`}
                alt={`Eden Park Menu Page ${bookletPage} - ${bookletCategories[bookletPage]}`}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
                onClick={() => setIsMenuOriginalOpen(true)}
              />

              {/* Floating Prev / Next Navigation Arrows */}
              <button
                onClick={() => setBookletPage((prev) => Math.max(1, prev - 1))}
                disabled={bookletPage === 1}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-black/90 text-white disabled:opacity-0 border border-white/20 backdrop-blur-md shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 -ml-0.5" />
              </button>

              <button
                onClick={() => setBookletPage((prev) => Math.min(totalBookletPages, prev + 1))}
                disabled={bookletPage === totalBookletPages}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-black/90 text-white disabled:opacity-0 border border-white/20 backdrop-blur-md shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                aria-label="Next Page"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 -mr-0.5" />
              </button>

              {/* Click to expand hint overlay */}
              <div 
                onClick={() => setIsMenuOriginalOpen(true)}
                className="absolute bottom-3 right-3 bg-black/80 hover:bg-black/95 border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs text-gold-300 flex items-center gap-1.5 cursor-pointer shadow-lg transition-transform hover:scale-105"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Click for 100% Full Page Zoom</span>
                <span className="sm:hidden">Full Page</span>
              </div>
            </div>

            {/* Booklet Footer Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                onClick={() => setBookletPage((prev) => Math.max(1, prev - 1))}
                disabled={bookletPage === 1}
                className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 flex items-center justify-center gap-1 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Page</span>
              </button>

              {/* Numbered Page Buttons Strip */}
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none px-2 max-w-full justify-center">
                {Array.from({ length: totalBookletPages }).map((_, i) => {
                  const p = i + 1;
                  const isCurrent = bookletPage === p;
                  return (
                    <button
                      key={p}
                      onClick={() => setBookletPage(p)}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-mono font-bold transition-all flex-shrink-0 ${
                        isCurrent
                          ? 'bg-gradient-to-r from-gold-600 to-gold-700 text-white shadow-md scale-110 ring-1 ring-gold-300'
                          : 'bg-white/5 hover:bg-white/15 text-white/70 hover:text-white'
                      }`}
                      title={`Page ${p}: ${bookletCategories[p]}`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setBookletPage((prev) => Math.min(totalBookletPages, prev + 1))}
                disabled={bookletPage === totalBookletPages}
                className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 flex items-center justify-center gap-1 transition-all"
              >
                <span>Next Page</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* DIGITAL DISH FINDER & FILTER CONTROLS */
          <div className="space-y-6">
            <div className="bg-white p-5 sm:p-7 rounded-3xl border border-[#E8DCB8] space-y-5 shadow-palace-card">
              
              {/* Main Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-600" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by dish name or ingredient (e.g. Biryani, Mutton Ghee Roast, Paneer, Naan, Guntur, Fish, Falooda)..."
                  className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-[#FAF7F2] border border-[#DFCDAB] text-sm sm:text-base text-leela-espresso placeholder-leela-muted focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 shadow-inner transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-500 hover:text-black bg-gray-200 hover:bg-gray-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* User Filtering Row */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pt-1 border-t border-[#F0E6D8]">
                
                {/* Dietary Kitchen Selection */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-leela-muted mr-1">
                    Kitchen:
                  </span>
                  <button
                    onClick={() => setDietaryFilter('all')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      dietaryFilter === 'all'
                        ? 'bg-gradient-to-r from-gold-600 to-gold-700 text-white shadow-sm'
                        : 'bg-[#FAF7F2] border border-[#DFCDAB] text-leela-heading hover:bg-[#F5EFE6]'
                    }`}
                  >
                    All Kitchens
                  </button>
                  <button
                    onClick={() => setDietaryFilter('veg')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                      dietaryFilter === 'veg'
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Pure Veg
                  </button>
                  <button
                    onClick={() => setDietaryFilter('non-veg')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                      dietaryFilter === 'non-veg'
                        ? 'bg-rose-700 text-white shadow-sm'
                        : 'bg-rose-50 border border-rose-300 text-rose-800 hover:bg-rose-100'
                    }`}
                  >
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Non-Veg
              </button>
            </div>

            {/* Quick Filter Tags & Spice Preference */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setQuickTag(quickTag === 'specials' ? 'all' : 'specials')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  quickTag === 'specials'
                    ? 'bg-rose-800 text-white font-bold shadow-sm'
                    : 'bg-[#FAF7F2] border border-[#DFCDAB] text-leela-heading hover:border-gold-500'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                Chef's Specials
              </button>

              <button
                onClick={() => setQuickTag(quickTag === 'bestsellers' ? 'all' : 'bestsellers')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  quickTag === 'bestsellers'
                    ? 'bg-gradient-to-r from-gold-600 to-gold-700 text-white font-bold shadow-sm'
                    : 'bg-[#FAF7F2] border border-[#DFCDAB] text-leela-heading hover:border-gold-500'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-gold-600" />
                Bestsellers
              </button>

              <button
                onClick={() => setQuickTag(quickTag === 'budget' ? 'all' : 'budget')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  quickTag === 'budget'
                    ? 'bg-gradient-to-r from-gold-600 to-gold-700 text-white font-bold shadow-sm'
                    : 'bg-[#FAF7F2] border border-[#DFCDAB] text-leela-heading hover:border-gold-500'
                }`}
              >
                Under ₹200
              </button>

              <button
                onClick={() => setSpiceFilter(spiceFilter === 'spicy' ? 'all' : 'spicy')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  spiceFilter === 'spicy'
                    ? 'bg-red-700 text-white font-bold shadow-sm'
                    : 'bg-[#FAF7F2] border border-[#DFCDAB] text-leela-heading hover:border-red-300'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                Spicy Hot
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs text-leela-muted font-bold flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FAF7F2] border border-[#DFCDAB] rounded-xl px-3 py-2 text-xs text-leela-heading font-semibold focus:outline-none focus:border-gold-500 cursor-pointer shadow-sm"
              >
                <option value="recommended">Curated / Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="spice">Spiciness Level</option>
              </select>
            </div>

          </div>

          {/* Category Tabs with Item Count Badges */}
          <div className="pt-2 border-t border-[#F0E6D8]">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {MENU_CATEGORIES.map((cat) => {
                const count = categoryCounts[cat] || 0;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                      isSelected
                        ? 'bg-gradient-to-r from-gold-600 to-gold-700 text-white shadow-sm'
                        : 'bg-[#FAF7F2] text-leela-heading border border-[#DFCDAB] hover:border-gold-500 hover:bg-[#F5EFE6]'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      isSelected ? 'bg-white text-gold-800' : 'bg-[#EAE0D0] text-leela-body'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Results Counter & Active Filter Reset */}
        <div className="flex items-center justify-between text-xs text-leela-body mb-6 px-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span>
              Showing <strong className="text-gold-700 font-mono text-sm">{filteredAndSortedItems.length}</strong> items
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-gold-700 hover:text-gold-900 underline underline-offset-2 ml-2 font-bold"
              >
                Clear all filters
              </button>
            )}
          </div>

          <span className="hidden sm:flex items-center gap-1 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> All dishes made fresh to order
          </span>
        </div>

        {/* DISHES LIST / GRID */}
        {filteredAndSortedItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredAndSortedItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onSelect={(selected) => setSelectedDish(selected)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto my-12 border border-dashed border-gray-300 shadow-sm">
            <Utensils className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-leela-heading mb-2">No matching dishes found</h3>
            <p className="text-xs text-leela-muted mb-5 leading-relaxed">
              We couldn't find items matching your search or active filters. Try searching for "Biryani", "Paneer", "Chicken", or reset your filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-700 text-white text-xs font-bold rounded-xl uppercase tracking-wider shadow-gold-sm"
            >
              Reset All Filters
            </button>
          </div>
        )}
          </div>
        )}

      </div>

      {/* Dish Detail Spotlight Modal */}
      {selectedDish && (
        <DishDetailModal
          item={selectedDish}
          onClose={() => setSelectedDish(null)}
        />
      )}
    </section>
  );
};
