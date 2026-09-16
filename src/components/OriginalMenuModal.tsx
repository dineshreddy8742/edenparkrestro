import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Maximize2, 
  Minimize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Smartphone,
  Monitor,
  Phone
} from 'lucide-react';

export const OriginalMenuModal: React.FC = () => {
  const { isMenuOriginalOpen, setIsMenuOriginalOpen } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [fitMode, setFitMode] = useState<'fitPage' | 'fitWidth'>('fitPage');
  
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const paginationScrollRef = useRef<HTMLDivElement>(null);

  const totalPages = 10;
  const pageCategories: Record<number, string> = {
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

  // Reset zoom & scroll position on page change
  useEffect(() => {
    setZoomLevel(1);
    if (imageContainerRef.current) {
      imageContainerRef.current.scrollTo({ top: 0, left: 0 });
    }

    // Auto-scroll active category button into view
    if (categoryScrollRef.current) {
      const activeBtn = categoryScrollRef.current.children[currentPage - 1] as HTMLElement;
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }

    // Auto-scroll pagination strip
    if (paginationScrollRef.current) {
      const activeBtn = paginationScrollRef.current.children[currentPage - 1] as HTMLElement;
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentPage]);

  // Keyboard navigation
  useEffect(() => {
    if (!isMenuOriginalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentPage((prev) => Math.max(1, prev - 1));
      } else if (e.key === 'Escape') {
        if (isFullScreen) {
          setIsFullScreen(false);
        } else {
          setIsMenuOriginalOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOriginalOpen, isFullScreen, totalPages, setIsMenuOriginalOpen]);

  if (!isMenuOriginalOpen) return null;

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (zoomLevel > 1) return; // Don't swipe pages while zoomed in
    const deltaX = touchStartX.current - touchEndX.current;
    if (deltaX > 50 && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (deltaX < -50 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(2.6, Math.round((prev + 0.3) * 10) / 10));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(1, Math.round((prev - 0.3) * 10) / 10));
  };

  const handleZoomReset = () => {
    setZoomLevel(1);
    if (imageContainerRef.current) {
      imageContainerRef.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  const toggleDoubleTapZoom = () => {
    setZoomLevel((prev) => (prev > 1 ? 1 : 1.8));
  };

  const toggleFitMode = () => {
    setFitMode((prev) => (prev === 'fitPage' ? 'fitWidth' : 'fitPage'));
    setZoomLevel(1);
  };

  const toggleFullScreenMode = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${
      isFullScreen 
        ? 'p-0 bg-black' 
        : 'p-0 sm:p-3 md:p-6 bg-black/90 backdrop-blur-md'
    } animate-in fade-in duration-200`}>
      
      {/* Modal Container: 100% full screen on mobile, expansive high-res frame on desktop */}
      <div 
        className={`relative w-full ${
          isFullScreen 
            ? 'h-screen w-screen max-w-none rounded-none' 
            : 'h-full sm:h-[96vh] sm:max-w-6xl sm:rounded-3xl border-0 sm:border border-[#E8DCB8]/40 shadow-2xl'
        } bg-[#110D09] flex flex-col overflow-hidden text-white`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* COMPACT LUXURY HEADER */}
        <div className="px-3 sm:px-5 py-2 sm:py-2.5 border-b border-white/10 bg-[#1A1410] flex items-center justify-between gap-2 flex-shrink-0">
          
          {/* Title & Page Info */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="p-1.5 rounded-lg bg-gold-500/20 text-gold-400 border border-gold-500/40 hidden xs:block">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-xs sm:text-sm md:text-base text-white truncate">
                  Original Gold Printed Menu
                </h3>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-gold-400 bg-gold-500/15 px-2 py-0.5 rounded border border-gold-500/30 whitespace-nowrap">
                  {currentPage} of {totalPages}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-amber-200/90 truncate font-semibold">
                Page {currentPage}: {pageCategories[currentPage]}
              </p>
            </div>
          </div>

          {/* Controls: Fit Mode, Zoom, Fullscreen, Close */}
          <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
            {/* View Mode Toggle: Fit Width (Read Mode) vs Fit Page (Overview) */}
            <button
              onClick={toggleFitMode}
              className={`px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-colors flex items-center gap-1 border ${
                fitMode === 'fitWidth'
                  ? 'bg-gold-600 text-white border-gold-400 shadow-xs'
                  : 'bg-white/10 hover:bg-white/20 text-white/90 border-white/10'
              }`}
              title={fitMode === 'fitWidth' ? "Switch to Fit Page (Overview)" : "Switch to Fit Width (Read Mode for Mobile)"}
            >
              {fitMode === 'fitWidth' ? (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-gold-200" />
                  <span className="hidden xs:inline">Fit Width</span>
                </>
              ) : (
                <>
                  <Monitor className="w-3.5 h-3.5 text-white/80" />
                  <span className="hidden xs:inline">Fit Page</span>
                </>
              )}
            </button>

            {/* Zoom Out */}
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              className="p-1 sm:p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white disabled:opacity-25 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Zoom Reset / Level Indicator */}
            <button
              onClick={handleZoomReset}
              className="px-1.5 sm:px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] sm:text-xs font-mono text-gold-300 transition-colors flex items-center gap-1"
              title="Reset Zoom (100%)"
            >
              <span>{Math.round(zoomLevel * 100)}%</span>
              {zoomLevel > 1 && <RotateCcw className="w-3 h-3 text-gold-400" />}
            </button>

            {/* Zoom In */}
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 2.6}
              className="p-1 sm:p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white disabled:opacity-25 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullScreenMode}
              className={`p-1 sm:p-1.5 rounded-lg transition-colors border ${
                isFullScreen 
                  ? 'bg-gold-600 text-white border-gold-400' 
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
              }`}
              title={isFullScreen ? "Exit Fullscreen" : "Full Page View (100% Screen)"}
            >
              {isFullScreen ? (
                <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              )}
            </button>

            {/* Highway Quick Call */}
            <a
              href="tel:+919603308999"
              className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gold-600/30 hover:bg-gold-600/50 text-gold-300 border border-gold-500/40 text-xs font-semibold"
              title="Call Restaurant"
            >
              <Phone className="w-3 h-3 text-gold-400" />
              <span>Call</span>
            </a>

            {/* Close Button */}
            <button
              onClick={() => setIsMenuOriginalOpen(false)}
              className="p-1 sm:p-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-white border border-red-500/40 transition-colors ml-0.5"
              title="Close Menu (Esc)"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* QUICK CATEGORY TABS JUMP STRIP (10 Pages) */}
        <div 
          ref={categoryScrollRef}
          className="px-2 py-1.5 bg-[#16120E] border-b border-white/10 flex items-center gap-1.5 overflow-x-auto scrollbar-none flex-shrink-0"
        >
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            const isSelected = currentPage === pageNum;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 flex-shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-gold-600 to-gold-700 text-white font-bold shadow-sm ring-1 ring-gold-400'
                    : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5'
                }`}
              >
                <span className="font-mono text-[10px] opacity-80">{pageNum}.</span>
                <span>{pageCategories[pageNum]}</span>
              </button>
            );
          })}
        </div>

        {/* MAIN FULL-PAGE VIEW CANVAS */}
        <div 
          ref={imageContainerRef}
          className={`relative flex-1 overflow-auto bg-[#070605] ${
            fitMode === 'fitWidth' 
              ? 'p-0 sm:p-2 block text-center' 
              : 'p-1 sm:p-3 flex items-center justify-center'
          } select-none`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onDoubleClick={toggleDoubleTapZoom}
        >
          {/* Menu Page Scan Image Container */}
          <div 
            className={`transition-transform duration-200 ease-out inline-block ${
              fitMode === 'fitWidth' ? 'w-full max-w-3xl my-1' : 'max-h-full'
            }`}
            style={{ 
              transform: `scale(${zoomLevel})`,
              transformOrigin: fitMode === 'fitWidth' ? 'top center' : 'center center'
            }}
          >
            <img
              src={`/assets/menu/page_${currentPage}.jpg`}
              alt={`The Eden Park Menu Page ${currentPage} - ${pageCategories[currentPage]}`}
              className={`${
                fitMode === 'fitWidth'
                  ? 'w-full h-auto mx-auto shadow-2xl rounded-none sm:rounded-xl border border-white/10'
                  : 'max-h-[calc(100vh-175px)] sm:max-h-[calc(100vh-185px)] w-auto object-contain mx-auto rounded-lg sm:rounded-xl shadow-2xl border border-white/10'
              }`}
              draggable={false}
            />
          </div>

          {/* Floating Left / Right Navigation Controls on Desktop & Tablet */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="fixed sm:absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/75 hover:bg-black/95 text-white disabled:opacity-0 pointer-events-auto border border-white/20 backdrop-blur-md shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            aria-label="Previous Menu Page"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 -ml-0.5" />
          </button>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="fixed sm:absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/75 hover:bg-black/95 text-white disabled:opacity-0 pointer-events-auto border border-white/20 backdrop-blur-md shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            aria-label="Next Menu Page"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 -mr-0.5" />
          </button>
        </div>

        {/* RESPONSIVE FOOTER NAVIGATION BAR */}
        <div className="px-2 sm:px-5 py-2 sm:py-2.5 bg-[#1A1410] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 flex-shrink-0">
          
          {/* Active Page Info Label for Mobile */}
          <div className="sm:hidden text-center w-full flex items-center justify-between px-2 text-[11px] text-amber-200/90 font-medium">
            <span className="font-mono text-gold-400 font-bold">Page {currentPage} of {totalPages}</span>
            <span className="truncate font-serif italic text-white/90">{pageCategories[currentPage]}</span>
            <span className="text-[10px] text-white/50">Swipe to flip</span>
          </div>

          {/* Navigation Controls Row */}
          <div className="w-full flex items-center justify-between gap-1.5 sm:gap-2">
            {/* Previous Page Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white disabled:opacity-20 flex items-center gap-1 transition-all active:scale-95 flex-shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Numbered Page Buttons Strip (1 to 10) */}
            <div 
              ref={paginationScrollRef}
              className="flex items-center gap-1 overflow-x-auto px-1 scrollbar-none max-w-full justify-center"
            >
              {Array.from({ length: totalPages }).map((_, i) => {
                const p = i + 1;
                const isCurrent = currentPage === p;
                return (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-mono font-bold transition-all flex-shrink-0 ${
                      isCurrent
                        ? 'bg-gradient-to-r from-gold-600 to-gold-700 text-white shadow-md scale-110 ring-1 ring-gold-300'
                        : 'bg-white/5 hover:bg-white/15 text-white/70 hover:text-white'
                    }`}
                    title={`Page ${p}: ${pageCategories[p]}`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            {/* Next Page Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white disabled:opacity-20 flex items-center gap-1 transition-all active:scale-95 flex-shrink-0"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
