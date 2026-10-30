import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, isReducedMotion } from '../animations/gsap-config';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ReservationModal } from '../components/ReservationModal';
import { CulinarySteam } from '../components/effects/CulinarySteam';
import { Sparkles, Flame, Utensils, Heart, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/fiveSpiceData';

export const StoryPage: React.FC = () => {
  const [reservationOpen, setReservationOpen] = useState(false);
  const narrativeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isReducedMotion() || !narrativeRef.current) return;

      const blocks = narrativeRef.current.querySelectorAll('.story-block');
      blocks.forEach((block) => {
        const heading = block.querySelector('h2');
        const img = block.querySelector('img');

        gsap.fromTo(
          block,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 85%',
              once: true,
            },
          }
        );

        if (heading) {
          gsap.fromTo(
            heading,
            { clipPath: 'inset(0 100% 0 0)' },
            {
              clipPath: 'inset(0 0% 0 0)',
              duration: 0.95,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: heading,
                start: 'top 88%',
                once: true,
              },
            }
          );
        }

        if (img) {
          gsap.fromTo(
            img,
            { y: '-4%' },
            {
              y: '4%',
              ease: 'none',
              scrollTrigger: {
                trigger: block,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        }
      });
    },
    { scope: narrativeRef }
  );

  return (
    <div className="min-h-screen bg-[#F4EBDD] text-[#30201B] selection:bg-[#641F29] selection:text-[#FFF9F1]">
      <Header onOpenReservation={() => setReservationOpen(true)} />

      {/* Hero Banner */}
      <section className="pt-32 pb-14 px-4 sm:px-6 md:px-12 bg-[#F4EBDD] border-b border-[#E2D3C0]">
        <div className="max-w-4xl mx-auto text-center space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8D8C5] border border-[#E2D3C0] text-[10px] tracking-[0.24em] uppercase text-[#641F29] font-semibold font-mono shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#B8322A]" />
            <span>The 5 Spice Heritage • Estd. 2004</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#302321] tracking-tight">
            Generous Portions, Wok Mastery &amp; Cult Flavors
          </h1>

          <p className="text-[#30201B]/80 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            How a commitment to bold Sichuan flavours, sizzling woks, and unforgettable desserts made 5 Spice an enduring institution for Mumbai food lovers.
          </p>
        </div>
      </section>

      {/* Main Narrative Content */}
      <section ref={narrativeRef} className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 max-w-5xl mx-auto space-y-16">
        {/* Story Section 1: The Mumbai Feast */}
        <div className="story-block grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
          <div className="md:col-span-7 space-y-3.5">
            <div className="flex items-center gap-2 text-xs text-[#641F29] font-semibold uppercase tracking-wider font-mono">
              <Flame className="w-4 h-4 text-[#B8322A]" />
              <span>The Wok Hei Tradition</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#302321] tracking-tight">
              High-Flame Woks &amp; Authentic Indo-Chinese Soul
            </h2>

            <p className="text-[#30201B]/80 text-xs sm:text-sm font-normal leading-relaxed">
              At 5 Spice, dining has never been about dainty micro-portions. From the very beginning, our kitchen set out to celebrate the warmth of communal feasting. Every dish that leaves our pass is wok-seared over ferocious 800°F flames, imparting the distinct smoky <em className="text-[#641F29] font-medium">wok hei</em> aroma that defines exceptional Chinese cooking.
            </p>

            <p className="text-[#30201B]/80 text-xs sm:text-sm font-normal leading-relaxed">
              Whether it is the crunch of our signature Crispy Chilli Potatoes or the rich, velvety comfort of Crab Meat Soup, each recipe balances the five elemental tastes: sweet, sour, bitter, pungent, and salty.
            </p>
          </div>

          <div className="md:col-span-5 relative rounded-2xl overflow-hidden border border-[#E2D3C0] shadow-sm h-72 sm:h-80 bg-[#E8D8C5]">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-44 h-32 pointer-events-none">
              <CulinarySteam variant="medium" intensity={0.35} />
            </div>
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
              alt="Wok Cooking in Asian Kitchen"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* Story Section 2: Colossal Sharing Portions */}
        <div className="story-block grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
          <div className="md:col-span-5 order-2 md:order-1 relative rounded-2xl overflow-hidden border border-[#E2D3C0] shadow-sm h-72 sm:h-80 bg-[#E8D8C5]">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-40 h-28 pointer-events-none">
              <CulinarySteam variant="subtle" intensity={0.3} />
            </div>
            <img
              src="https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80"
              alt="Steaming Pot Rice at 5 Spice"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          <div className="md:col-span-7 order-1 md:order-2 space-y-3.5">
            <div className="flex items-center gap-2 text-xs text-[#641F29] font-semibold uppercase tracking-wider font-mono">
              <Utensils className="w-4 h-4 text-[#B8322A]" />
              <span>Generous Hospitality</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#302321] tracking-tight">
              The Legend of 1000ml Pot Rice &amp; Big Tables
            </h2>

            <p className="text-[#30201B]/80 text-xs sm:text-sm font-normal leading-relaxed">
              Ask any Mumbai foodie about 5 Spice, and they will immediately recount memories of towering platters. Our clay-pot style <strong className="text-[#302321]">Special Pot Rice</strong> and <strong className="text-[#302321]">Malaysian Noodles</strong> arrive in generous 1000ml bowls designed for groups of friends, colleagues, and large family gatherings.
            </p>

            <p className="text-[#30201B]/80 text-xs sm:text-sm font-normal leading-relaxed">
              Dining here is meant to be casual, unpretentious, lively, and thoroughly satisfying.
            </p>
          </div>
        </div>

        {/* Story Section 3: The Cult Desserts */}
        <div className="story-block grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
          <div className="md:col-span-7 space-y-3.5">
            <div className="flex items-center gap-2 text-xs text-[#641F29] font-semibold uppercase tracking-wider font-mono">
              <Heart className="w-4 h-4 text-[#B8322A]" />
              <span>The Sweet Conclusion</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#302321] tracking-tight">
              Rocky Road &amp; Death By Chocolate
            </h2>

            <p className="text-[#30201B]/80 text-xs sm:text-sm font-normal leading-relaxed">
              No meal at 5 Spice is complete without reserving space for dessert. Our colossal sundae creations have achieved legendary status. The cult-favourite <strong className="text-[#302321]">Rocky Road</strong> brings together layers of rich ice cream, warm molten chocolate fudge, marshmallows, roasted nuts, and walnut brownies in a bowl meant to be conquered together.
            </p>

            <p className="text-[#30201B]/80 text-xs sm:text-sm font-normal leading-relaxed">
              And for chocolate purists, the multi-tiered <strong className="text-[#302321]">Death by Chocolate</strong> remains the benchmark for Dutch cocoa indulgence across the city.
            </p>
          </div>

          <div className="md:col-span-5 relative rounded-2xl overflow-hidden border border-[#E2D3C0] shadow-sm h-72 sm:h-80 bg-[#E8D8C5]">
            <img
              src="https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80"
              alt="5 Spice Rocky Road Dessert"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* Sakinaka Outlet Details Box */}
        <div className="bg-[#FFF9F1] border border-[#E2D3C0] rounded-2xl p-6 sm:p-8 md:p-10 space-y-3.5 shadow-sm">
          <div className="flex items-center gap-2 text-xs text-[#641F29] font-semibold uppercase tracking-wider font-mono">
            <MapPin className="w-4 h-4 text-[#B8322A]" />
            <span>Our Sakinaka Establishment</span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-[#302321]">
            Shivai Industrial Estate, Andheri-Kurla Road
          </h3>

          <p className="text-xs sm:text-sm text-[#302321]/80 font-normal leading-relaxed">
            Conveniently located near the Sakinaka Metro Station, our outlet welcomes guests for lunch and dinner daily. Whether you are stepping out from the nearby commercial complexes for a team lunch or bringing the family for weekend dinner, we look forward to hosting you.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-[#302321]/70">
            <span>Timings: 12:00 PM – 3:30 PM &amp; 7:00 PM – 11:30 PM Daily</span>
            <span className="text-[#E2D3C0]">•</span>
            <span className="text-[#641F29] font-semibold">Reservations: {RESTAURANT_INFO.phone}</span>
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
