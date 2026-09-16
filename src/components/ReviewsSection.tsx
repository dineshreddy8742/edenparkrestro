import React, { useState, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { Star, MessageSquareQuote, Plus, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { AddReviewModal } from './AddReviewModal';

export const ReviewsSection: React.FC = () => {
  const { reviews, setIsAddReviewOpen } = useStore();
  const [filterType, setFilterType] = useState<string>('All');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredReviews = reviews.filter((r) => {
    if (filterType === 'All') return true;
    return r.diningType === filterType;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="reviews" className="py-14 sm:py-16 relative bg-[#FAF5EC] border-t border-[#E8DCB8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-400 bg-[#FAF3E0] text-gold-900 text-[11px] font-bold uppercase tracking-wider mb-2.5 shadow-xs">
              <MessageSquareQuote className="w-3.5 h-3.5 text-gold-700" />
              <span>Patron Experiences</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-leela-heading leading-tight mb-1.5">
              Words from <span className="text-gold-gradient italic font-serif">Our Diners</span>
            </h2>

            <p className="text-leela-body text-sm sm:text-base font-normal leading-relaxed mt-2 max-w-xl">
              From highway commuters to grand family celebrations, read stories from patrons who made Eden Park their dining home.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Scroll Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full border border-[#DFCDAB] bg-white text-leela-heading hover:border-gold-500 hover:text-gold-700 hover:bg-[#FAF3E0] shadow-sm flex items-center justify-center transition-all active:scale-95"
                aria-label="Previous Reviews"
                title="Scroll Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full border border-[#DFCDAB] bg-white text-leela-heading hover:border-gold-500 hover:text-gold-700 hover:bg-[#FAF3E0] shadow-sm flex items-center justify-center transition-all active:scale-95"
                aria-label="Next Reviews"
                title="Scroll Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => setIsAddReviewOpen(true)}
              className="px-5 py-2.5 rounded-full font-bold uppercase tracking-wider text-xs text-white bg-gradient-to-r from-gold-600 to-gold-700 shadow-gold-sm hover:shadow-gold-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-white" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {['All', 'Highway Stopover', 'Family Dinner', 'Celebration / Party', 'Weekend Outing'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilterType(cat);
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                }
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                filterType === cat
                  ? 'bg-gradient-to-r from-gold-600 to-gold-700 text-white shadow-sm'
                  : 'bg-white text-leela-heading border border-[#DFCDAB] hover:border-gold-500 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Horizontal Scroll Reviews Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-1 px-1 scroll-smooth snap-x snap-mandatory cursor-grab active:cursor-grabbing no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="w-[300px] sm:w-[360px] md:w-[400px] shrink-0 snap-start bg-white p-6 sm:p-7 rounded-3xl border border-[#E8DCB8] hover:border-gold-500 transition-all duration-300 flex flex-col justify-between shadow-palace-card hover:shadow-palace-hover relative group"
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-[#E8DCB8]/40 group-hover:text-gold-400/30 transition-colors pointer-events-none" />

              <div>
                {/* Rating Stars - Clean (No Verified Diner Badge) */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>

                {/* Comment Text */}
                <p className="text-leela-heading text-sm sm:text-base font-normal leading-relaxed mb-6 italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Reviewer Details Footer */}
              <div className="pt-4 border-t border-[#F0E6D8] flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-leela-heading text-base">
                    {rev.userName}
                  </h4>
                  <div className="text-xs text-leela-muted flex items-center gap-1 mt-0.5 font-medium">
                    <span>{rev.userLocation}</span>
                    <span>•</span>
                    <span className="text-gold-700">{rev.diningType}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-leela-muted block font-medium">{rev.date}</span>
                  {rev.favoriteDish && (
                    <span className="text-[10px] font-mono font-bold text-gold-900 bg-[#FAF3E0] border border-gold-300 px-2 py-0.5 rounded-md mt-1 inline-block shadow-sm">
                      ★ {rev.favoriteDish}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Hint & Count */}
        <div className="flex items-center justify-between text-xs text-leela-muted mt-2 px-1">
          <span className="font-medium">
            Showing {filteredReviews.length} {filteredReviews.length === 1 ? 'review' : 'reviews'}
          </span>
          <span className="hidden sm:inline-block italic text-gold-800">
            ← Scroll or use arrows to view more →
          </span>
        </div>
      </div>

      <AddReviewModal />
    </section>
  );
};
