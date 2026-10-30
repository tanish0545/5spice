import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Sparkles, Waves, Leaf, ArrowRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap, isReducedMotion } from '../../animations/gsap-config';

interface FlavourPillar {
  title: string;
  cuisine: string;
  icon: React.ReactNode;
  description: string;
  image: string;
  dishes: string;
  tag: string;
}

const FLAVOUR_PILLARS: FlavourPillar[] = [
  {
    title: 'Sichuan Fire & Wok Hei',
    cuisine: 'Sichuan Discipline',
    icon: <Flame className="w-4 h-4 text-[#A83232]" />,
    description: 'Blistering 800°F iron woks, crushed Sichuan peppercorns, roasted red chillies, and deeply caramelized ginger-garlic glazes that awaken the palate.',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
    dishes: 'Crispy Chilli Potatoes • Schezwan Chicken • Kung Pao',
    tag: 'Fierce & Smoky',
  },
  {
    title: 'Comforting Cantonese Broths & Pots',
    cuisine: 'Cantonese Heritage',
    icon: <Sparkles className="w-4 h-4 text-[#B58A54]" />,
    description: 'Slow-simmered velvety broths, delicate egg ribbons, seasoned clay pots, and umami-rich shiitake reductions celebrating pure culinary balance.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
    dishes: 'Chicken Pot Rice • Crab Meat Soup • Burnt Garlic Rice',
    tag: 'Velvety & Comforting',
  },
  {
    title: 'Aromatic Thai & Herbal Curries',
    cuisine: 'Thai Specialties',
    icon: <Leaf className="w-4 h-4 text-emerald-600" />,
    description: 'Fragrant galangal, fresh crushed lemongrass, kaffir lime leaves, and silky coconut milk gravies simmered to aromatic perfection.',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80',
    dishes: 'Thai Green Curry • Malaysian Noodles • Tom Yum',
    tag: 'Herbal & Zesty',
  },
  {
    title: 'Fresh Coastal Seafood',
    cuisine: 'Coastal Catch',
    icon: <Waves className="w-4 h-4 text-blue-600" />,
    description: 'Plump ocean prawns, succulent shredded crab meat, and delicate seafood wok-tossed in robust black pepper, dark soya, or rich butter garlic.',
    image: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80',
    dishes: 'Chilli Prawns • Butter Garlic Prawns • Crab Broth',
    tag: 'Ocean Fresh',
  },
];

export const FlavoursSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isReducedMotion() || !gridRef.current) return;

      const heading = containerRef.current?.querySelector('h2');
      if (heading) {
        gsap.fromTo(
          heading,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      const cards = gridRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 82%',
            once: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative py-20 sm:py-28 bg-[#E8D8C5] border-b border-[#E2D3C0] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-18">
          <div className="inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-3.5 py-1.5 rounded-full bg-[#F4EBDD] border border-[#E2D3C0] text-[#641F29] text-[10px] xs:text-xs font-semibold tracking-[0.18em] xs:tracking-[0.2em] uppercase mb-3.5 font-mono shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#B8322A]" />
            <span>The Four Pillars of Asian Taste</span>
          </div>

          <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#30201B] font-bold tracking-tight">
            The Flavours of 5 Spice
          </h2>

          <p className="mt-3 sm:mt-3.5 text-xs sm:text-sm md:text-base text-[#30201B]/80 font-normal leading-relaxed">
            From the smoking heat of Sichuan woks to the gentle herbal fragrance of Thai lemongrass and coastal seafood, our Sakinaka kitchen honors four distinct Asian culinary traditions.
          </p>
        </div>

        {/* 4 Pillars Grid with Overlapping Compositions */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {FLAVOUR_PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="group bg-[#FFF9F1] border border-[#E2D3C0] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo with Overlay Badge */}
                <div className="relative h-52 xs:h-60 sm:h-72 overflow-hidden bg-[#F4EBDD]">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  <div className="absolute top-3 xs:top-4 left-3 xs:left-4">
                    <span className="px-2.5 xs:px-3 py-1 rounded-md bg-[#FFF9F1]/95 backdrop-blur-md border border-[#E2D3C0] text-[9px] xs:text-[10px] uppercase font-mono font-bold text-[#641F29] tracking-wider shadow-sm flex items-center gap-1.5">
                      {pillar.icon}
                      <span>{pillar.cuisine}</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 xs:bottom-4 left-3 xs:left-4 right-3 xs:right-4">
                    <span className="text-[10px] text-[#B77B4A] uppercase font-mono tracking-widest font-semibold block mb-0.5">
                      {pillar.tag}
                    </span>
                    <h3 className="font-serif text-lg xs:text-xl sm:text-2xl font-bold text-white tracking-wide">
                      {pillar.title}
                    </h3>
                  </div>
                </div>

                {/* Narrative & Dish Highlights */}
                <div className="p-4 xs:p-5 sm:p-6 space-y-2.5 sm:space-y-3">
                  <p className="text-xs sm:text-sm text-[#30201B]/80 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                  <div className="pt-2 border-t border-[#E2D3C0]/60">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#641F29] font-semibold block mb-1">
                      Featured In Our Menu:
                    </span>
                    <span className="text-xs text-[#30201B] font-medium font-serif italic">
                      {pillar.dishes}
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-4 xs:px-5 sm:px-6 pb-4 xs:pb-5 sm:pb-6 pt-1 sm:pt-2">
                <Link
                  to="/menu"
                  className="min-h-[44px] inline-flex items-center gap-1.5 text-xs text-[#641F29] group-hover:text-[#B8322A] font-bold tracking-wider uppercase transition-colors"
                >
                  <span>Explore {pillar.cuisine}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

