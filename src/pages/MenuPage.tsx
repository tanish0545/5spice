import React, { useState, useMemo, useRef } from 'react';
import { Search, Flame, Sparkles, ExternalLink, Filter, X, Calendar, Utensils } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap, isReducedMotion } from '../animations/gsap-config';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ReservationModal } from '../components/ReservationModal';
import { CulinarySteam } from '../components/effects/CulinarySteam';
import { MENU_ITEMS, MENU_CATEGORIES, RESTAURANT_INFO, type MenuItem } from '../data/fiveSpiceData';

/** Applies GSAP 3D perspective tilt on a card element based on mouse position */
const applyCardTilt = (card: HTMLElement, e: React.MouseEvent<HTMLElement>) => {
  if (isReducedMotion() || 'ontouchstart' in window) return;
  const rect = card.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = (e.clientX - cx) / (rect.width / 2);
  const dy = (e.clientY - cy) / (rect.height / 2);
  const MAX_TILT = 7;
  gsap.to(card, {
    rotateY: dx * MAX_TILT,
    rotateX: -dy * MAX_TILT,
    transformPerspective: 900,
    duration: 0.25,
    ease: 'power2.out',
  });
};

const resetCardTilt = (card: HTMLElement) => {
  gsap.to(card, {
    rotateX: 0,
    rotateY: 0,
    duration: 0.55,
    ease: 'elastic.out(1, 0.45)',
  });
};

export const MenuPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [reservationOpen, setReservationOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const dishModalRef = useRef<HTMLDivElement>(null);

  // Cinematic GSAP entrance for the dish modal
  useGSAP(
    () => {
      if (selectedDish && dishModalRef.current && !isReducedMotion()) {
        gsap.fromTo(
          dishModalRef.current,
          { opacity: 0, scale: 0.92, y: 16 },
          { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power3.out' }
        );
      }
    },
    { dependencies: [selectedDish] }
  );

  // Filtered menu calculation
  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDiet =
        dietaryFilter === 'all'
          ? true
          : dietaryFilter === 'veg'
          ? item.isVeg
          : !item.isVeg;

      return matchesCategory && matchesSearch && matchesDiet;
    });
  }, [selectedCategory, searchQuery, dietaryFilter]);

  // Cinematic staggered card reveal when changing category or diet filters
  useGSAP(
    () => {
      if (isReducedMotion() || !gridRef.current) return;

      const cards = gridRef.current.querySelectorAll('.menu-dish-card');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.035, ease: 'power2.out' }
        );
      }
    },
    { scope: gridRef, dependencies: [selectedCategory, dietaryFilter] }
  );

  return (
    <div className="min-h-screen bg-[#F4EBDD] text-[#30201B] selection:bg-[#641F29] selection:text-[#FFF9F1]">
      <Header onOpenReservation={() => setReservationOpen(true)} />

      {/* Menu Hero Banner */}
      <section className="pt-32 pb-10 px-4 sm:px-6 md:px-12 bg-[#F4EBDD] border-b border-[#E2D3C0]">
        <div className="max-w-7xl mx-auto text-center space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8D8C5] border border-[#E2D3C0] text-[10px] tracking-[0.24em] uppercase text-[#641F29] font-semibold font-mono shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#B8322A]" />
            <span>Sakinaka Outlet • Complete Digital Menu</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#30201B] tracking-tight">
            5 Spice Culinary Menu
          </h1>

          <p className="text-[#30201B]/80 text-xs sm:text-sm max-w-xl mx-auto font-normal leading-relaxed">
            All prices formatted in Indian Rupees (₹). Famous for authentic high-heat wok cooking and generous Mumbai sharing portions.
          </p>

          <div className="pt-1 flex items-center justify-center gap-4 text-xs text-[#30201B]/70">
            <span>Order delivery to your door:</span>
            <a
              href={RESTAURANT_INFO.externalLinks.zomato}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e23744] hover:underline font-bold flex items-center gap-1"
            >
              <span>Zomato</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-[#E2D3C0]">•</span>
            <a
              href={RESTAURANT_INFO.externalLinks.swiggy}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#fc8019] hover:underline font-bold flex items-center gap-1"
            >
              <span>Swiggy</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* Search & Category Filter Controls */}
      <section className="sticky top-[68px] z-30 bg-[#F4EBDD]/95 backdrop-blur-md border-b border-[#E2D3C0] py-3.5 px-4 sm:px-6 md:px-12 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#30201B]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes (e.g. Pot Rice, Chilli Potato)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FFF9F1] border border-[#E2D3C0] rounded-full pl-10 pr-4 py-2 text-xs text-[#30201B] placeholder-[#30201B]/50 focus:outline-none focus:border-[#641F29] shadow-sm"
            />
          </div>

          {/* Dietary Filter (All, Veg, Non-Veg) */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#30201B]/70 hidden sm:inline flex items-center gap-1 font-medium font-mono text-[11px]">
              <Filter className="w-3 h-3 text-[#B8322A]" /> Diet:
            </span>
            <div className="flex items-center bg-[#FFF9F1] border border-[#E2D3C0] rounded-full p-1 shadow-sm">
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors ${
                  dietaryFilter === 'all'
                    ? 'bg-[#641F29] text-white font-semibold'
                    : 'text-[#30201B]/70 hover:text-[#30201B]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setDietaryFilter('veg')}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors flex items-center gap-1.5 ${
                  dietaryFilter === 'veg'
                    ? 'bg-emerald-700 text-white font-semibold'
                    : 'text-[#30201B]/70 hover:text-[#30201B]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Veg</span>
              </button>
              <button
                onClick={() => setDietaryFilter('non-veg')}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors flex items-center gap-1.5 ${
                  dietaryFilter === 'non-veg'
                    ? 'bg-rose-700 text-white font-semibold'
                    : 'text-[#30201B]/70 hover:text-[#30201B]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span>Non-Veg</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Horizontal Scroll Pills */}
        <div className="max-w-7xl mx-auto mt-3 overflow-x-auto pb-1 flex items-center gap-2 no-scrollbar">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap uppercase tracking-wider font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#641F29] text-white font-bold shadow-sm'
                  : 'bg-[#FFF9F1] text-[#30201B]/80 hover:text-[#30201B] border border-[#E2D3C0] shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Menu Dishes Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        {filteredDishes.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <p className="text-[#30201B]/70 text-base">
              No dishes found matching <span className="text-[#30201B] font-semibold">"{searchQuery}"</span>.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setDietaryFilter('all');
              }}
              className="px-6 py-2 bg-[#B8322A] text-white text-xs uppercase tracking-wider font-semibold rounded-lg shadow-sm hover:bg-[#862D35] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedDish(item)}
                onMouseMove={(e) => applyCardTilt(e.currentTarget, e)}
                onMouseLeave={(e) => resetCardTilt(e.currentTarget)}
                className="menu-dish-card group bg-[#FFF9F1] border border-[#E2D3C0] rounded-2xl overflow-hidden hover:border-[#641F29]/60 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md cursor-pointer"
                style={{ willChange: 'transform' }}
              >
                <div>
                  {/* Dish Photo */}
                  <div className="relative h-52 overflow-hidden bg-[#E8D8C5]">
                    {/* Subtle hot steam for bestsellers & wok dishes */}
                    {(item.bestseller || item.category === 'Soups' || item.category === 'Rice & Pot Rice') && (
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-28 h-20 pointer-events-none">
                        <CulinarySteam variant="compact" intensity={0.28} />
                      </div>
                    )}

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Top Badges (Veg/Non-Veg & Bestseller) */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span
                        className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center bg-white shadow-sm ${
                          item.isVeg ? 'border-emerald-600' : 'border-rose-600'
                        }`}
                        title={item.isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                          }`}
                        />
                      </span>

                      {item.bestseller && (
                        <span className="bg-[#641F29] text-white font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shadow-sm font-mono">
                          Bestseller
                        </span>
                      )}
                    </div>

                    {/* Price Badge in INR (₹) */}
                    <div className="absolute bottom-3 right-3 bg-[#FFF9F1]/95 backdrop-blur-md px-3 py-1 rounded-full text-sm font-mono font-bold text-[#641F29] border border-[#E2D3C0] shadow-sm">
                      {item.formattedPrice}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#641F29] font-mono block mb-1 font-semibold">
                      {item.category}
                    </span>

                    <h3 className="font-serif text-lg font-bold text-[#30201B] group-hover:text-[#641F29] transition-colors mb-1">
                      {item.name}
                    </h3>

                    {item.subtitle && (
                      <h4 className="font-serif italic text-xs text-[#862D35] mb-2 font-medium">
                        {item.subtitle}
                      </h4>
                    )}

                    <p className="text-xs text-[#30201B]/80 font-normal leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Portion & Spice Indicator */}
                    <div className="flex items-center justify-between text-[11px] text-[#30201B]/70 pt-3 border-t border-[#E2D3C0]">
                      {item.portion ? (
                        <span className="text-[#30201B] font-medium">{item.portion}</span>
                      ) : (
                        <span>Authentic Wok Prepared</span>
                      )}

                      {item.spiceLevel !== undefined && item.spiceLevel > 0 && (
                        <div className="flex items-center gap-1 text-[#B8322A]" title={`Spice Level: ${item.spiceLevel}/3`}>
                          {Array.from({ length: item.spiceLevel }).map((_, idx) => (
                            <Flame key={idx} className="w-3 h-3 fill-current text-[#B8322A]" />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Dish Detail Modal */}
      {selectedDish && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedDish(null)}
        >
          <div
            ref={dishModalRef}
            className="relative max-w-2xl w-full bg-[#FFF9F1] border border-[#E2D3C0] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedDish(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              aria-label="Close dish preview"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative h-64 sm:h-72 overflow-hidden bg-[#E8D8C5]">
              <img
                src={selectedDish.image}
                alt={selectedDish.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#B77B4A] font-semibold block mb-0.5">
                    {selectedDish.category}
                  </span>
                  <h3 className="font-serif text-2xl font-bold">{selectedDish.name}</h3>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-[#641F29] text-white font-mono font-bold text-lg shadow-md">
                  {selectedDish.formattedPrice}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              {selectedDish.subtitle && (
                <p className="font-serif italic text-sm text-[#862D35] font-medium">
                  {selectedDish.subtitle}
                </p>
              )}

              <p className="text-xs sm:text-sm text-[#30201B]/85 leading-relaxed">
                {selectedDish.description}
              </p>

              <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#E2D3C0] text-xs">
                <div className="flex items-center gap-2 text-[#30201B]">
                  <Utensils className="w-4 h-4 text-[#B8322A]" />
                  <span>{selectedDish.portion || 'Generous sharing portion'}</span>
                </div>
                <div className="flex items-center gap-2 text-[#30201B]">
                  <Flame className="w-4 h-4 text-[#B8322A]" />
                  <span>Spice Level: {selectedDish.spiceLevel ? `${selectedDish.spiceLevel}/3` : 'Mild / Classic'}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedDish(null);
                    setReservationOpen(true);
                  }}
                  className="flex-1 py-3 px-5 bg-[#B8322A] hover:bg-[#862D35] text-white font-semibold text-xs tracking-wider uppercase rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Reserve Table to Enjoy</span>
                </button>

                <a
                  href={RESTAURANT_INFO.externalLinks.zomato}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 bg-[#FFF9F1] hover:bg-[#E8D8C5] border border-[#E2D3C0] text-[#30201B] font-semibold text-xs tracking-wider uppercase rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span className="text-[#e23744]">Order Zomato</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#30201B]/60" />
                </a>

                <a
                  href={RESTAURANT_INFO.externalLinks.swiggy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 bg-[#FFF9F1] hover:bg-[#E8D8C5] border border-[#E2D3C0] text-[#302321] font-semibold text-xs tracking-wider uppercase rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span className="text-[#fc8019]">Order Swiggy</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#30201B]/60" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reservation Inquiry Banner */}
      <section className="py-14 px-4 sm:px-6 md:px-12 bg-[#E8D8C5] border-t border-[#E2D3C0] text-center">
        <div className="max-w-3xl mx-auto space-y-3.5">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#30201B]">
            Dining in Sakinaka? Inquire for a Table
          </h2>
          <p className="text-xs sm:text-sm text-[#30201B]/80">
            Planning a family feast or celebration? Let our front-desk team prepare seating for your party.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setReservationOpen(true)}
              className="px-8 py-3 bg-[#B8322A] hover:bg-[#862D35] text-white font-semibold text-xs tracking-wider uppercase rounded-lg shadow-sm transition-colors"
            >
              Book Table Inquiry
            </button>
          </div>
        </div>
      </section>

      <Footer />

      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
        restaurantName="5 Spice (Sakinaka Outlet)"
      />
    </div>
  );
};
