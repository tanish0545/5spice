import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Utensils, Sparkles, ExternalLink, Award } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap, isReducedMotion } from '../../animations/gsap-config';
import { CulinarySteam } from '../effects/CulinarySteam';
import { RESTAURANT_INFO } from '../../data/fiveSpiceData';

interface SignatureDishesSectionProps {
  onReserveTable?: () => void;
}

export const SignatureDishesSection: React.FC<SignatureDishesSectionProps> = ({ onReserveTable }) => {
  const showcaseRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (isReducedMotion() || !showcaseRef.current) return;

      const header = showcaseRef.current.querySelector('.signatures-header');
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      const spreads = showcaseRef.current.querySelectorAll('.editorial-spread');
      spreads.forEach((spread) => {
        const img = spread.querySelector('.spread-image img');
        const text = spread.querySelector('.spread-content');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: spread,
            start: 'top 82%',
            once: true,
          },
        });

        if (img) {
          tl.fromTo(
            img,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.85, ease: 'power3.out' },
            0
          );

          // Subtle parallax on scroll
          gsap.fromTo(
            img,
            { y: '-4%' },
            {
              y: '4%',
              ease: 'none',
              scrollTrigger: {
                trigger: spread,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        }

        if (text) {
          tl.fromTo(
            text,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
            0.15
          );
        }
      });
    },
    { scope: showcaseRef }
  );

  return (
    <section
      ref={showcaseRef}
      id="signatures-grid"
      className="relative py-20 sm:py-28 bg-[#F4EBDD] border-b border-[#E2D3C0] overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="signatures-header text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8D8C5] border border-[#E2D3C0] text-[#641F29] text-xs font-semibold tracking-[0.2em] uppercase mb-3.5 font-mono shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#B8322A]" />
            <span>Editorial Gastronomy Showcase</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#30201B] font-bold tracking-tight">
            Cult Mumbai Signatures
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#30201B]/80 font-normal leading-relaxed">
            Every dish is prepared over ferocious high-flame woks and served in towering portions crafted for communal dining. Discover our most celebrated creations.
          </p>
        </div>

        {/* 
          =======================================================
          EDITORIAL SPREAD 1: Special Chicken Pot Rice (Large Left Image, Right Story)
          =======================================================
        */}
        <div className="editorial-spread mb-20 lg:mb-28 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Large Photography Column */}
          <div className="spread-image lg:col-span-7 relative group">
            <div className="relative h-80 sm:h-96 md:h-[440px] rounded-2xl overflow-hidden bg-[#E8D8C5] border border-[#E2D3C0] shadow-lg">
              {/* Subtle steam rising from clay pot */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-44 h-32 pointer-events-none">
                <CulinarySteam variant="medium" intensity={0.32} />
              </div>

              <img
                src="https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80"
                alt="5 Spice Special Chicken Pot Rice"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

              {/* Price & Portions Ribbon */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <span className="px-3 py-1 rounded-md bg-[#17110F]/85 backdrop-blur-md text-xs font-mono font-semibold border border-[#E2D3C0]/30">
                  Colossal 1000ml Clay-Pot
                </span>
                <span className="px-4 py-1.5 rounded-full bg-[#641F29] text-white font-mono font-bold text-base shadow-md">
                  ₹695
                </span>
              </div>
            </div>
          </div>

          {/* Right Editorial Story Column */}
          <div className="spread-content lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#641F29] font-semibold uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#B77B4A]" />
              <span>Signature Clay-Pot Sensation</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#30201B] leading-tight">
              5 Spice Special Chicken Pot Rice
            </h3>

            <p className="font-serif italic text-sm sm:text-base text-[#862D35]">
              Jasmine Rice, Shiitake Mushrooms &amp; Rich Wok Gravy
            </p>

            <p className="text-xs sm:text-sm text-[#30201B]/80 leading-relaxed font-normal">
              Steamed fragrant jasmine rice crowned with a luscious, bubbling brown sauce of sliced chicken, shiitake mushrooms, baby corn, pak choi, and bamboo shoots. Served in a signature 1000ml pot designed for communal sharing across the table.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs text-[#30201B]/80 font-medium">
              <span className="px-3 py-1 rounded-full bg-[#FFF9F1] border border-[#E2D3C0]">Serves 2–3 easily</span>
              <span className="px-3 py-1 rounded-full bg-[#FFF9F1] border border-[#E2D3C0]">Balanced Savoury Heat</span>
              <span className="px-3 py-1 rounded-full bg-[#FFF9F1] border border-[#E2D3C0]">800°F Wok Hei</span>
            </div>

            <div className="pt-3">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#B8322A] hover:bg-[#862D35] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-sm"
              >
                <span>View Rice Specialties</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 
          =======================================================
          EDITORIAL SPREAD 2: Coastal Chilli Prawns (Left Story, Right Large Image)
          =======================================================
        */}
        <div className="editorial-spread mb-20 lg:mb-28 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Editorial Story Column */}
          <div className="spread-content lg:col-span-5 order-2 lg:order-1 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#641F29] font-semibold uppercase tracking-wider">
              <Flame className="w-4 h-4 text-[#B8322A]" />
              <span>Coastal Seafood Mastery</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#302321] leading-tight">
              Sizzling Coastal Chilli Prawns
            </h3>

            <p className="font-serif italic text-sm sm:text-base text-[#862D35]">
              Crushed Sichuan Garlic &amp; Dark Soya Glaze
            </p>

            <p className="text-xs sm:text-sm text-[#302321]/80 leading-relaxed font-normal">
              Succulent ocean catch prawns tossed over smoking high heat with crushed red chillies, charred garlic slivers, sliced capsicum, and premium aged dark soya. Delivered sizzling to the table with irresistible aroma.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs text-[#302321]/80 font-medium">
              <span className="px-3 py-1 rounded-full bg-[#FFF9F1] border border-[#E2D3C0]">Fresh Coastal Prawns</span>
              <span className="px-3 py-1 rounded-full bg-[#FFF9F1] border border-[#E2D3C0]">Spice Level: 2/3</span>
              <span className="px-3 py-1 rounded-full bg-[#FFF9F1] border border-[#E2D3C0]">Chef Recommendation</span>
            </div>

            <div className="pt-3">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#B8322A] hover:bg-[#862D35] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-sm"
              >
                <span>View Seafood Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Large Photography Column */}
          <div className="spread-image lg:col-span-7 order-1 lg:order-2 relative group">
            <div className="relative h-80 sm:h-96 md:h-[440px] rounded-2xl overflow-hidden bg-[#E8D8C5] border border-[#E2D3C0] shadow-lg">
              {/* Subtle steam */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-44 h-32 pointer-events-none">
                <CulinarySteam variant="medium" intensity={0.3} />
              </div>

              <img
                src="https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=1200&q=80"
                alt="5 Spice Sizzling Chilli Prawns"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

              {/* Price Ribbon */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <span className="px-3 py-1 rounded-md bg-[#17110F]/85 backdrop-blur-md text-xs font-mono font-semibold border border-[#E2D3C0]/30">
                  Wok-Seared Ocean Prawns
                </span>
                <span className="px-4 py-1.5 rounded-full bg-[#641F29] text-white font-mono font-bold text-base shadow-md">
                  ₹545
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 
          =======================================================
          EDITORIAL SPREAD 3: Dual Culinary Features (Kung Pao Potato & Crab Meat Soup)
          =======================================================
        */}
        <div className="editorial-spread mb-20 lg:mb-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* Dual Item 1: Kung Pao Potato */}
            <div className="group bg-[#FFF9F1] border border-[#E2D3C0] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative h-64 sm:h-72 overflow-hidden bg-[#E8D8C5]">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-36 h-24 pointer-events-none">
                    <CulinarySteam variant="compact" intensity={0.25} />
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80"
                    alt="5 Spice Kung Pao Potato"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-[#FFF9F1]/95 px-3 py-1 rounded-full text-sm font-mono font-bold text-[#641F29] border border-[#E2D3C0] shadow-sm">
                    ₹425
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#641F29] font-semibold block mb-1">
                    Sichuan Peppercorns &amp; Peanuts
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#30201B] group-hover:text-[#641F29] transition-colors mb-1">
                    Kung Pao Potato
                  </h4>
                  <p className="font-serif italic text-xs text-[#862D35] mb-2.5">
                    Whole Dried Red Chillies &amp; Tangy Dark Soy
                  </p>
                  <p className="text-xs text-[#30201B]/80 leading-relaxed font-normal">
                    Crispy fried potato cubes tossed with crunchy roasted peanuts, roasted Sichuan red chillies, bell peppers, and savoury tangy dark soy reduction.
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-[#E2D3C0]/60 flex items-center justify-between text-xs text-[#641F29] font-bold">
                <span>Serves 2–3 Sharing</span>
                <Link to="/menu" className="inline-flex items-center gap-1 hover:underline">
                  <span>Explore in Menu</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Dual Item 2: Crab Meat Soup */}
            <div className="group bg-[#FFF9F1] border border-[#E2D3C0] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative h-64 sm:h-72 overflow-hidden bg-[#E8D8C5]">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-36 h-24 pointer-events-none">
                    <CulinarySteam variant="compact" intensity={0.25} />
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80"
                    alt="5 Spice Crab Meat Soup"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-[#FFF9F1]/95 px-3 py-1 rounded-full text-sm font-mono font-bold text-[#641F29] border border-[#E2D3C0] shadow-sm">
                    ₹365
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#641F29] font-semibold block mb-1">
                    Silky Starter Broth
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#302321] group-hover:text-[#641F29] transition-colors mb-1">
                    Crab Meat Soup
                  </h4>
                  <p className="font-serif italic text-xs text-[#862D35] mb-2.5">
                    Slow-Simmered Broth with Beaten Egg Ribbons
                  </p>
                  <p className="text-xs text-[#302321]/80 leading-relaxed font-normal">
                    Delicate shredded crab meat in an unctuous, piping-hot chicken broth infused with scallions, fresh ginger essence, and fine white pepper.
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-[#E2D3C0]/60 flex items-center justify-between text-xs text-[#641F29] font-bold">
                <span>Traditional Slow Simmer</span>
                <Link to="/menu" className="inline-flex items-center gap-1 hover:underline">
                  <span>Explore in Menu</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 
          =======================================================
          EDITORIAL SPREAD 4: Sweet Finale (Rocky Road & Death by Chocolate)
          =======================================================
        */}
        <div className="editorial-spread mb-16 rounded-2xl bg-[#641F29] text-white p-6 sm:p-10 lg:p-12 border border-[#3D2A24] shadow-2xl">
          <div className="max-w-3xl mb-8">
            <span className="text-[10px] uppercase font-mono tracking-[0.24em] text-[#B77B4A] font-semibold block mb-2">
              The Grand Finale
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FFF9F1] tracking-tight">
              Legendary Multi-Tiered Desserts
            </h3>
            <p className="text-xs sm:text-sm text-[#E8D8C5] mt-2 font-normal leading-relaxed">
              No meal at 5 Spice is complete without surrendering to our colossal dessert creations. Crafted for large tables to share and conquer together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Rocky Road Card */}
            <div className="bg-[#FFF9F1] text-[#30201B] rounded-xl overflow-hidden border border-[#E2D3C0] shadow-md flex flex-col justify-between">
              <div className="relative h-56 sm:h-64 overflow-hidden bg-[#E8D8C5]">
                <img
                  src="https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80"
                  alt="5 Spice Cult Rocky Road Dessert"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-[#641F29] text-white px-3 py-1 rounded-full text-xs font-mono font-bold shadow-md">
                  ₹395
                </div>
              </div>
              <div className="p-5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#641F29] font-semibold block mb-1">
                  Cult Legend
                </span>
                <h4 className="font-serif text-xl font-bold text-[#30201B] mb-1">Rocky Road</h4>
                <p className="text-xs text-[#30201B]/80 leading-relaxed">
                  Vanilla &amp; Belgian chocolate scoops drenched in molten fudge, roasted almonds, cashews, marshmallows, and walnut brownies in an XXL sharing bowl.
                </p>
              </div>
            </div>

            {/* Death by Chocolate Card */}
            <div className="bg-[#FFF9F1] text-[#30201B] rounded-xl overflow-hidden border border-[#E2D3C0] shadow-md flex flex-col justify-between">
              <div className="relative h-56 sm:h-64 overflow-hidden bg-[#E8D8C5]">
                <img
                  src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80"
                  alt="5 Spice Death by Chocolate Truffle Cake"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-[#641F29] text-white px-3 py-1 rounded-full text-xs font-mono font-bold shadow-md">
                  ₹345
                </div>
              </div>
              <div className="p-5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#641F29] font-semibold block mb-1">
                  Dutch Cocoa Decadence
                </span>
                <h4 className="font-serif text-xl font-bold text-[#302321] mb-1">Death by Chocolate</h4>
                <p className="text-xs text-[#30201B]/80 leading-relaxed">
                  Dense layers of dark Dutch cocoa sponge, velvety chocolate ganache, chocolate fudge drizzle, and crowned with bitter chocolate curls.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Action Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#E8D8C5] border border-[#E2D3C0] flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="text-center lg:text-left">
            <h3 className="font-serif text-xl sm:text-2xl text-[#30201B] font-bold mb-1">
              Explore Our Complete 100+ Dish Menu
            </h3>
            <p className="text-xs sm:text-sm text-[#30201B]/80 font-normal max-w-xl">
              Authentic Sichuan soups, Malaysian and Hakka noodles, sizzlers, coastal crab meat delicacies,
              and our world-famous Dutch chocolate desserts.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/menu"
              className="px-6 py-3 bg-[#B8322A] hover:bg-[#862D35] text-white font-semibold text-xs tracking-wider uppercase rounded-lg shadow-sm transition-all flex items-center gap-2"
            >
              <Utensils className="w-4 h-4 text-white" />
              <span>Full Digital Menu</span>
            </Link>

            {onReserveTable && (
              <button
                onClick={onReserveTable}
                className="px-6 py-3 bg-[#FFF9F1] border border-[#E2D3C0] text-[#30201B] hover:text-[#641F29] hover:border-[#641F29] font-semibold text-xs tracking-wider uppercase rounded-lg shadow-sm transition-all"
              >
                Reserve Sakinaka Table
              </button>
            )}

            <a
              href={RESTAURANT_INFO.externalLinks.zomato}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-[#FFF9F1] border border-[#E2D3C0] text-[#302321] text-xs font-semibold tracking-wider uppercase rounded-lg shadow-sm hover:border-[#641F29] transition-colors flex items-center gap-1.5"
            >
              <span className="text-[#e23744]">Zomato</span>
              <ExternalLink className="w-3 h-3 text-[#30201B]/60" />
            </a>

            <a
              href={RESTAURANT_INFO.externalLinks.swiggy}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-[#FFF9F1] border border-[#E2D3C0] text-[#302321] text-xs font-semibold tracking-wider uppercase rounded-lg shadow-sm hover:border-[#641F29] transition-colors flex items-center gap-1.5"
            >
              <span className="text-[#fc8019]">Swiggy</span>
              <ExternalLink className="w-3 h-3 text-[#302321]/60" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
