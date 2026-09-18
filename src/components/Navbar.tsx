import React, { useState, useEffect } from "react";
import { useStore } from "../context/StoreContext";
import { BrandLogo } from "./BrandLogo";
import { Phone, Menu as MenuIcon, X, ShieldCheck, MapPin, BookOpen } from "lucide-react";

interface NavbarProps {
  onNavigate?: (page: 'home' | 'menu' | 'turf', targetHash?: string) => void;
  currentPage?: 'home' | 'menu' | 'turf';
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage = 'home' }) => {
  const { setIsMenuOriginalOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home", page: "home" as const },
    { label: "Food Menu", href: "#menu", page: "menu" as const },
    { label: "About Us", href: "#experience", page: "home" as const },
    { label: "Gallery", href: "#gallery", page: "home" as const },
    { label: "Book Turf 🏏", href: "#turf", page: "turf" as const, highlight: "green" as const },
    { label: "Rooms 🏨", href: "#rooms", page: "home" as const, highlight: "amber" as const },
    { label: "Location", href: "#recognition", page: "home" as const },
    { label: "Reviews", href: "#reviews", page: "home" as const },
  ];

  const handleLinkClick = (link: typeof navLinks[0]) => {
    setMobileMenuOpen(false);

    if (link.page === 'menu') {
      window.location.hash = '#menu';
      onNavigate?.('menu');
      return;
    }

    if (link.page === 'turf') {
      window.location.hash = '#turf';
      onNavigate?.('turf');
      return;
    }

    // Home page or home section anchor
    if (currentPage !== 'home') {
      onNavigate?.('home', link.href);
    } else {
      window.location.hash = link.href;
      if (link.href === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.querySelector(link.href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  const getLinkClass = (link: typeof navLinks[0]) => {
    const isCurrent = (link.page === 'menu' && currentPage === 'menu') ||
                      (link.page === 'turf' && currentPage === 'turf') ||
                      (link.page === 'home' && currentPage === 'home' && link.href === '#home');

    if (link.highlight === "green") {
      return scrolled
        ? "text-green-700 hover:text-green-600 font-bold"
        : "text-green-400 hover:text-green-300 font-bold drop-shadow-sm";
    }
    if (link.highlight === "amber") {
      return scrolled
        ? "text-amber-700 hover:text-amber-600 font-bold"
        : "text-amber-400 hover:text-amber-300 font-bold drop-shadow-sm";
    }
    if (isCurrent) {
      return scrolled ? "text-gold-700 font-bold" : "text-gold-300 font-bold drop-shadow-sm";
    }
    return scrolled
      ? "text-leela-heading hover:text-gold-700"
      : "text-white/95 hover:text-gold-300 drop-shadow-sm";
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DCB8] py-1.5 sm:py-2 shadow-md" 
        : currentPage !== 'home'
          ? "bg-[#FAF7F2]/98 backdrop-blur-md border-b border-[#E8DCB8] py-2 sm:py-2.5 shadow-sm"
          : "bg-gradient-to-b from-black/85 via-black/45 to-transparent border-b border-white/10 py-2.5 sm:py-3.5"
    }`}>
      {/* Top micro-bar — only visible at the very top of the landing page */}
      {!scrolled && currentPage === 'home' && (
        <div className="hidden lg:block pb-1.5 mb-1.5 text-xs transition-colors border-b border-white/15 text-white/80">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 font-medium text-gold-300">
                <MapPin className="w-3.5 h-3.5" /> Bangalore-Tirupati Highway, Patnam, Chittoor
              </span>
              <span className="text-white/30">|</span>
              <span className="px-2 py-0.5 rounded-full border flex items-center gap-1 font-semibold text-[11px] text-emerald-300 bg-emerald-950/70 border-emerald-500/40">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Separate Pure Veg &amp; Non-Veg Kitchens
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white/90">Open Daily: 11:00 AM - 11:30 PM</span>
              <a href="tel:+919603308999" className="font-bold transition-colors flex items-center gap-1 text-gold-300 hover:text-white">
                <Phone className="w-3 h-3" /> +91 96033 08999
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a 
          href="#home" 
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick(navLinks[0]);
          }}
          className="block cursor-pointer"
        >
          <BrandLogo size={scrolled ? 'sm' : 'md'} light={!scrolled && currentPage === 'home'} />
        </a>

        {/* Desktop Nav */}
        <nav className={`hidden md:flex items-center ${scrolled ? 'gap-4 lg:gap-5' : 'gap-5'}`}>
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link);
              }}
              className={`${scrolled ? 'text-[13px] py-0.5' : 'text-sm py-1'} font-semibold tracking-wide transition-colors duration-200 relative group cursor-pointer ${getLinkClass(link)}`}
            >
              {link.label}
              {link.highlight === "green" && (
                <span className="absolute -top-1.5 -right-2 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              )}
              {link.highlight === "amber" && (
                <span className="absolute -top-1 -right-5 text-[8px] font-black bg-amber-500 text-white px-1 py-0.5 rounded-full leading-none">NEW</span>
              )}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button 
            onClick={() => setIsMenuOriginalOpen(true)}
            className={`hidden sm:flex items-center gap-1.5 font-bold rounded-full transition-all shadow-xs cursor-pointer ${
              scrolled ? "px-3 py-1.5 text-[11px]" : "px-3.5 py-2 text-xs"
            } ${
              scrolled || currentPage !== 'home' 
                ? "text-gold-800 bg-[#FAF3E0] border border-gold-400 hover:bg-[#F5E6BD]" 
                : "text-white bg-black/40 hover:bg-black/60 border border-white/30 backdrop-blur-sm"
            }`}
            title="View Printed Menu"
          >
            <BookOpen className="w-3.5 h-3.5 text-gold-400" /><span>Printed Menu</span>
          </button>
          <a 
            href="tel:+919603308999"
            className={`flex items-center gap-1.5 font-bold uppercase tracking-wider text-white bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 rounded-full shadow-gold-sm hover:shadow-gold-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer ${
              scrolled ? "px-3 py-1.5 text-[11px]" : "px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs"
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-white" /><span>Call Us</span>
          </a>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-1.5 sm:p-2 transition-colors cursor-pointer ${scrolled || currentPage !== 'home' ? "text-leela-heading hover:text-gold-700" : "text-white hover:text-gold-300"}`}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-t border-[#E8DCB8] px-6 py-5 mt-2 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link);
                }}
                className={`text-base font-semibold py-1.5 flex items-center justify-between cursor-pointer ${link.highlight === "green" ? "text-green-700 font-bold" : link.highlight === "amber" ? "text-amber-700 font-bold" : "text-leela-heading hover:text-gold-700"}`}
              >
                <span>{link.label}</span>
                {link.highlight === "amber" && <span className="text-[9px] font-black bg-amber-500 text-white px-1.5 py-0.5 rounded-full">NEW</span>}
              </a>
            ))}
          </div>
          <div className="pt-4 border-t border-[#E8DCB8] flex flex-col gap-3">
            <button 
              onClick={() => { setMobileMenuOpen(false); setIsMenuOriginalOpen(true); }}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold text-gold-800 bg-[#FAF3E0] border border-gold-400 rounded-xl hover:bg-[#F5E6BD] cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-gold-700" /><span>View Printed Menu Cards</span>
            </button>
            <a 
              href="tel:+919603308999"
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-widest text-white bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 rounded-xl shadow-gold-sm cursor-pointer"
            >
              <Phone className="w-4 h-4" /> Call +91 96033 08999
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
