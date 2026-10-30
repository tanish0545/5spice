import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  X,
  Phone,
  Calendar,
  MapPin,
  ExternalLink,
  Clock,
  Train,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap, isReducedMotion } from '../animations/gsap-config';
import { stopLenis, startLenis } from '../animations/smooth-scroll';
import { RESTAURANT_INFO } from '../data/fiveSpiceData';
import { useMagneticButton } from '../hooks/useMagneticButton';

const CURRENT_YEAR = new Date().getFullYear();

interface HeaderProps {
  onOpenReservation?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenReservation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navPanelOpen, setNavPanelOpen] = useState(false);
  const [orderDropdownOpen, setOrderDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const tableBtnRef = useMagneticButton<HTMLButtonElement>(0.2);

  // Scroll detection for sticky navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close panel on route changes
  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname);
    setNavPanelOpen(false);
    setOrderDropdownOpen(false);
  }

  // Prevent background scrolling when menu panel is open
  useEffect(() => {
    if (navPanelOpen) {
      stopLenis();
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
      return () => {
        document.body.style.overflow = originalOverflow;
        startLenis();
      };
    }
  }, [navPanelOpen]);

  // Handle ESC key to close navigation panel
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && navPanelOpen) {
        setNavPanelOpen(false);
        menuTriggerRef.current?.focus();
      }
    },
    [navPanelOpen]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Header entrance animation
  useGSAP(
    () => {
      if (!isReducedMotion()) {
        gsap.fromTo(
          headerRef.current,
          { y: -24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.05 }
        );
      }
    },
    { scope: headerRef }
  );

  // Panel entrance animation
  useGSAP(
    () => {
      if (navPanelOpen && panelRef.current && !isReducedMotion()) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.fromTo(
          panelRef.current,
          { opacity: 0, y: -16 },
          { opacity: 1, y: 0, duration: 0.35 }
        );
        tl.fromTo(
          panelRef.current.querySelectorAll('.nav-menu-item'),
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.05 },
          0.1
        );
        tl.fromTo(
          panelRef.current.querySelector('.nav-info-panel'),
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4 },
          0.2
        );
      }
    },
    { dependencies: [navPanelOpen] }
  );

  const handleNavClick = (sectionId: string) => {
    setNavPanelOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { label: 'Home', path: '/', isSection: false },
    { label: 'Digital Menu (₹)', path: '/menu', isSection: false },
    { label: 'Cult Signatures', path: 'signatures', isSection: true },
    { label: 'Our Story & Heritage', path: '/story', isSection: false },
    { label: 'Restaurant Ambiance', path: '/gallery', isSection: false },
    { label: 'Location & Hours', path: 'location', isSection: true },
    { label: 'Contact & Table Booking', path: '/contact', isSection: false },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#17110F]/95 backdrop-blur-md border-b border-[#3D2A24] py-3.5 shadow-lg'
            : 'bg-gradient-to-b from-[#17110F]/90 via-[#17110F]/40 to-transparent py-4 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* LEFT: 5 Spice Logo / Wordmark (Address temporarily hidden per request) */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#641F29] border border-[#B77B4A]/30 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-md">
              <span className="font-serif text-[#FFF9F1] font-bold text-lg tracking-tight">
                5S
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-display tracking-[0.22em] text-[#FFF9F1] text-lg sm:text-xl font-extrabold group-hover:text-[#B77B4A] transition-colors leading-tight">
                5 SPICE
              </span>
            </div>
          </Link>

          {/* RIGHT: Navigation Bar Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* 1. Order Delivery CTA (with verified Zomato / Swiggy targets) */}
            <div
              className="relative hidden sm:block"
              onMouseEnter={() => setOrderDropdownOpen(true)}
              onMouseLeave={() => setOrderDropdownOpen(false)}
            >
              <button
                onClick={() => setOrderDropdownOpen(!orderDropdownOpen)}
                className="px-3.5 py-2.5 rounded-lg border border-[#3D2A24] bg-[#30201B]/80 hover:bg-[#30201B] hover:border-[#B77B4A] text-[#FFF9F1] text-xs uppercase tracking-[0.14em] font-semibold transition-all flex items-center gap-1.5 shadow-sm"
                aria-haspopup="true"
                aria-expanded={orderDropdownOpen}
              >
                <span>Order Delivery</span>
                <ExternalLink className="w-3 h-3 text-[#B8322A]" />
              </button>

              {orderDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-52 bg-[#30201B] border border-[#3D2A24] rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#E8D8C5]/60 px-3 pt-1 pb-1.5 block border-b border-[#3D2A24]">
                    Verified Sakinaka Outlets
                  </span>
                  <a
                    href={RESTAURANT_INFO.externalLinks.zomato}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2 text-xs text-[#FFF9F1] hover:bg-[#17110F] rounded-lg transition-colors group mt-1"
                  >
                    <span className="font-bold text-[#e23744]">Zomato</span>
                    <span className="text-[10px] text-[#E8D8C5]/60 group-hover:text-[#FFF9F1] font-mono">
                      Order Now →
                    </span>
                  </a>
                  <a
                    href={RESTAURANT_INFO.externalLinks.swiggy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2 text-xs text-[#FFF9F1] hover:bg-[#17110F] rounded-lg transition-colors group mt-0.5"
                  >
                    <span className="font-bold text-[#fc8019]">Swiggy</span>
                    <span className="text-[10px] text-[#E8D8C5]/60 group-hover:text-[#FFF9F1] font-mono">
                      Order Now →
                    </span>
                  </a>
                </div>
              )}
            </div>

            {/* 2. Table Inquiry CTA */}
            <button
              ref={tableBtnRef}
              onClick={onOpenReservation}
              className="hidden md:flex px-4 py-2.5 bg-[#B8322A] hover:bg-[#862D35] text-white font-semibold text-xs uppercase tracking-[0.16em] rounded-lg shadow-sm hover:shadow transition-all items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-white" />
              <span>Table Inquiry</span>
            </button>

            {/* Quick Phone Call on Mobile/Small screens */}
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="p-2 sm:p-2.5 rounded-lg bg-[#30201B] border border-[#3D2A24] text-[#FFF9F1] hover:text-[#B77B4A] transition-colors md:hidden"
              title="Call Sakinaka Front Desk"
              aria-label="Call Front Desk"
            >
              <Phone className="w-4 h-4 text-[#B8322A]" />
            </a>

            {/* 3. Single Prominent "MENU =" Navigation Trigger */}
            <button
              ref={menuTriggerRef}
              onClick={() => setNavPanelOpen(true)}
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-[#3D2A24] bg-[#30201B]/80 hover:bg-[#30201B] hover:border-[#B77B4A] text-[#FFF9F1] text-xs uppercase tracking-[0.18em] font-bold flex items-center gap-2 transition-all shadow-sm group"
              aria-label="Open complete navigation menu"
              aria-expanded={navPanelOpen}
            >
              <span className="group-hover:text-[#B77B4A] transition-colors">MENU</span>
              <span className="text-sm font-mono font-extrabold text-[#B77B4A] tracking-tighter">
                =
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 
        =======================================================
        MENU = FULL-SCREEN NAVIGATION PANEL (Deep Burgundy Luxury Editorial)
        =======================================================
      */}
      {navPanelOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Restaurant navigation"
          className="fixed inset-0 z-50 bg-[#641F29] text-[#FFF9F1] flex flex-col justify-between overflow-y-auto"
        >
          {/* Top Bar inside Overlay */}
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12 py-5 sm:py-6 flex items-center justify-between border-b border-[#FFF9F1]/15">
            <Link
              to="/"
              onClick={() => setNavPanelOpen(false)}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#17110F] border border-[#B77B4A]/30 flex items-center justify-center shadow-md">
                <span className="font-serif text-[#FFF9F1] font-bold text-lg">5S</span>
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-display tracking-[0.22em] text-[#FFF9F1] text-lg font-extrabold leading-tight">
                  5 SPICE
                </span>
              </div>
            </Link>

            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={() => {
                setNavPanelOpen(false);
                menuTriggerRef.current?.focus();
              }}
              className="px-4 py-2 rounded-lg border border-[#B77B4A]/30 bg-[#17110F]/70 hover:bg-[#17110F] text-[#FFF9F1] hover:text-[#B77B4A] text-xs uppercase tracking-[0.16em] font-semibold flex items-center gap-2 transition-all shadow-md"
              aria-label="Close navigation menu"
            >
              <span>CLOSE</span>
              <X className="w-4 h-4 text-[#B77B4A]" />
            </button>
          </div>

          {/* Main Overlay Content: Editorial 2-Column Grid */}
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12 py-8 sm:py-12 flex-1 flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 w-full items-start">
              {/* Left Column: Large Editorial Navigation Links */}
              <div className="lg:col-span-7 space-y-2">
                <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.26em] uppercase text-[#B77B4A] font-semibold font-mono mb-4">
                  <Flame className="w-3.5 h-3.5 text-[#B77B4A]" />
                  <span>Explore 5 Spice Sakinaka</span>
                </div>

                <nav className="flex flex-col space-y-2 sm:space-y-3">
                  {navLinks.map((item, index) => {
                    const numberLabel = `0${index + 1}`;
                    if (item.isSection) {
                      return (
                        <button
                          key={item.label}
                          onClick={() => handleNavClick(item.path)}
                          className="nav-menu-item text-left group flex items-baseline gap-4 sm:gap-6 py-2 border-b border-[#FFF9F1]/10 hover:border-[#B77B4A] transition-all"
                        >
                          <span className="font-mono text-xs text-[#B77B4A]/80 group-hover:text-white transition-colors">
                            {numberLabel}
                          </span>
                          <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#FFF9F1] group-hover:text-[#B77B4A] group-hover:translate-x-2 transition-all tracking-tight">
                            {item.label}
                          </span>
                          <ArrowRight className="w-4 h-4 text-[#B77B4A] opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                        </button>
                      );
                    }
                    return (
                      <Link
                        key={item.label}
                        to={item.path}
                        onClick={() => setNavPanelOpen(false)}
                        className="nav-menu-item group flex items-baseline gap-4 sm:gap-6 py-2 border-b border-[#FFF9F1]/10 hover:border-[#B77B4A] transition-all"
                      >
                        <span className="font-mono text-xs text-[#B77B4A]/80 group-hover:text-white transition-colors">
                          {numberLabel}
                        </span>
                        <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#FFF9F1] group-hover:text-[#B77B4A] group-hover:translate-x-2 transition-all tracking-tight">
                          {item.label}
                        </span>
                        <ArrowRight className="w-4 h-4 text-[#B77B4A] opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Right Column: Editorial Restaurant Detail Card */}
              <div className="nav-info-panel lg:col-span-5 bg-[#30201B] border border-[#3D2A24] rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl text-[#FFF9F1]">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#B77B4A] font-semibold block mb-1 font-mono">
                    Outlet Information
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#FFF9F1] mb-2">
                    5 Spice Sakinaka
                  </h3>
                  <p className="text-xs text-[#E8D8C5]/80 font-normal leading-relaxed">
                    {RESTAURANT_INFO.fullAddress}
                  </p>
                  <div className="mt-2.5 flex items-center gap-2 text-xs text-[#E8D8C5] font-medium">
                    <Train className="w-4 h-4 text-[#B8322A] shrink-0" />
                    <span>{RESTAURANT_INFO.metroStation}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#3D2A24] space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B77B4A] font-semibold block font-mono">
                    Operating Hours
                  </span>
                  <div className="flex items-start gap-2 text-xs text-[#E8D8C5]/80">
                    <Clock className="w-4 h-4 text-[#B8322A] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[#FFF9F1] font-semibold">
                        Lunch: {RESTAURANT_INFO.timings.lunch}
                      </span>
                      <span className="block text-[#FFF9F1] font-semibold">
                        Dinner: {RESTAURANT_INFO.timings.dinner}
                      </span>
                      <span className="text-emerald-400 font-semibold text-[11px] block mt-0.5">
                        ● {RESTAURANT_INFO.timings.days}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#3D2A24] space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B77B4A] font-semibold block font-mono">
                    Direct Phone Numbers
                  </span>
                  <div className="flex flex-col gap-1 text-xs">
                    <a
                      href={`tel:${RESTAURANT_INFO.phone}`}
                      className="flex items-center gap-2 text-[#FFF9F1] hover:text-[#B77B4A] font-mono font-medium transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#B8322A]" />
                      <span>{RESTAURANT_INFO.phone} (Main Desk)</span>
                    </a>
                    <a
                      href={`tel:${RESTAURANT_INFO.secondaryPhone}`}
                      className="flex items-center gap-2 text-[#FFF9F1] hover:text-[#B77B4A] font-mono font-medium transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#B8322A]" />
                      <span>{RESTAURANT_INFO.secondaryPhone} (Mobile)</span>
                    </a>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#3D2A24] space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B77B4A] font-semibold block font-mono">
                    Order Delivery Online
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <a
                      href={RESTAURANT_INFO.externalLinks.zomato}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-[#17110F] hover:bg-[#17110F]/80 border border-[#3D2A24] hover:border-[#B77B4A] text-center text-[#FFF9F1] font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <span className="text-[#e23744]">Zomato</span>
                      <ExternalLink className="w-3 h-3 text-[#E8D8C5]/60" />
                    </a>
                    <a
                      href={RESTAURANT_INFO.externalLinks.swiggy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-[#17110F] hover:bg-[#17110F]/80 border border-[#3D2A24] hover:border-[#B77B4A] text-center text-[#FFF9F1] font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <span className="text-[#fc8019]">Swiggy</span>
                      <ExternalLink className="w-3 h-3 text-[#E8D8C5]/60" />
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setNavPanelOpen(false);
                      if (onOpenReservation) onOpenReservation();
                    }}
                    className="w-full py-3 bg-[#B8322A] hover:bg-[#862D35] text-white font-semibold text-xs tracking-[0.18em] uppercase rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-white" />
                    <span>Reserve a Table Inquiry</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar inside Overlay */}
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12 py-4 border-t border-[#FFF9F1]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E8D8C5]/70 gap-2">
            <span>© {CURRENT_YEAR} 5 Spice Sakinaka • All Rights Reserved</span>
            <div className="flex items-center gap-4">
              <a
                href={RESTAURANT_INFO.externalLinks.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B77B4A] flex items-center gap-1 text-[#E8D8C5]"
              >
                <MapPin className="w-3.5 h-3.5 text-[#B77B4A]" />
                <span>Google Maps Directions</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
