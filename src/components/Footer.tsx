import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Sparkles, MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap, isReducedMotion } from '../animations/gsap-config';
import { RESTAURANT_INFO } from '../data/fiveSpiceData';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (isReducedMotion()) return;

      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 94%',
            once: true,
          },
        }
      );
    },
    { scope: footerRef }
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="bg-[#17110F] border-t border-[#3D2A24] text-[#E8D8C5]/80 text-xs pt-16 pb-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#3D2A24]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#641F29] border border-[#B77B4A]/30 flex items-center justify-center shadow-md">
                <span className="font-serif text-[#FFF9F1] font-bold text-sm tracking-tight">5S</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display tracking-[0.22em] text-[#FFF9F1] text-base font-bold">
                  5 SPICE
                </span>
                <span className="text-[10px] text-[#B77B4A] tracking-widest uppercase font-semibold font-mono">
                  Sakinaka, Andheri East
                </span>
              </div>
            </div>

            <p className="text-[#E8D8C5]/75 text-xs leading-relaxed max-w-sm">
              Mumbai's destination for generous Asian feasts, smoking hot woks, coastal seafood delicacies, and legendary multi-tiered desserts. Crafted with authentic passion since day one.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#FFF9F1] pt-1">
              <span className="flex items-center gap-1 text-[#B77B4A] font-semibold">
                <Sparkles className="w-3.5 h-3.5" /> Generous Mumbai Portions
              </span>
              <span className="text-[#3D2A24]">•</span>
              <span>₹1,800 for two</span>
              <span className="text-[#3D2A24]">•</span>
              <span>Sakinaka Metro Line 1</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFF9F1] font-mono">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/menu" className="hover:text-[#B77B4A] transition-colors">
                  Complete Menu (₹)
                </Link>
              </li>
              <li>
                <Link to="/story" className="hover:text-[#B77B4A] transition-colors">
                  Our Story &amp; Heritage
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#B77B4A] transition-colors">
                  Dining Ambiance
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#B77B4A] transition-colors">
                  Location &amp; Directions
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Signatures Column */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFF9F1] font-mono">
              Famous Signatures
            </h4>
            <ul className="space-y-2 text-[#E8D8C5]/75">
              <li>Crispy Chilli Potatoes (₹395)</li>
              <li>Kung Pao Potato (₹425)</li>
              <li>Chilli Prawns Wok (₹545)</li>
              <li>Special Chicken Pot Rice (₹695)</li>
              <li>Crab Meat Soup (₹365)</li>
              <li>Rocky Road Dessert (₹395)</li>
              <li>Death by Chocolate (₹345)</li>
            </ul>
          </div>

          {/* Contact & Hours Column */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFF9F1] font-mono">
              Sakinaka Outlet
            </h4>
            <ul className="space-y-2.5 text-[11px]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B77B4A] shrink-0 mt-0.5" />
                <span className="leading-snug text-[#E8D8C5]/75">
                  Ground Floor, Shivai Industrial Estate, Andheri-Kurla Road, Sakinaka, Andheri East, Mumbai 400072
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B77B4A] shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-[#B77B4A] text-[#FFF9F1] font-semibold transition-colors font-mono">
                  {RESTAURANT_INFO.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#B77B4A] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[#FFF9F1]">Lunch: 12:00 PM – 3:30 PM</span>
                  <span className="block text-[#FFF9F1]">Dinner: 7:00 PM – 11:30 PM</span>
                </div>
              </li>
              <li className="pt-1 flex items-center gap-3">
                <a
                  href={RESTAURANT_INFO.externalLinks.zomato}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#f87171] hover:underline"
                >
                  <span>Zomato</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-[#3D2A24]">|</span>
                <a
                  href={RESTAURANT_INFO.externalLinks.swiggy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#fb923c] hover:underline"
                >
                  <span>Swiggy</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 pb-2 text-[11px] text-[#E8D8C5]/60 space-y-2 leading-relaxed border-b border-[#3D2A24]">
          <p>
            <strong className="text-[#FFF9F1]">Notice &amp; Attribution:</strong> This is a custom-engineered digital presentation designed specifically for 5 Spice (Sakinaka Outlet, Mumbai). All menu items, pricing in Indian Rupees (₹), and outlet details are referenced from publicly verifiable listings (Zomato, Swiggy, Justdial). Production search indexing remains disabled (<code className="text-[#B77B4A]">noindex</code>) until formal restaurant authorization and publication approval.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#E8D8C5]/60">
          <div>
            © {CURRENT_YEAR} 5 Spice — Sakinaka, Andheri East, Mumbai. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[#E8D8C5]/50">GSAP 3 Scroll-Driven Architecture</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#B77B4A] hover:text-[#FFF9F1] font-semibold transition-colors p-1"
              aria-label="Scroll to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
