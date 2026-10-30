import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Sparkles } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap, isReducedMotion } from '../../animations/gsap-config';

export const AmbianceHighlightSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isReducedMotion() || !gridRef.current) return;

      const heading = sectionRef.current?.querySelector('h2');
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
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 82%',
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const ambianceCards = [
    {
      title: 'Main Dining Hall',
      category: 'Atmosphere',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      description: 'Lacquered mahogany wood, glowing warm lanterns, and intimate ambient lighting for memorable family dinners.',
    },
    {
      title: 'Sizzling Wok Theatre',
      category: 'Culinary Craft',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      description: 'Watch master chefs toss smoking clay-pot creations over roaring flame wok burners.',
    },
    {
      title: 'Dessert & Sundae Bar',
      category: 'Sweet Finale',
      image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
      description: 'Artisanal Dutch cocoa sponges, hot fudge cascading over Rocky Road sundaes, and chilled mocktails.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-[#E8D8C5] border-b border-[#E2D3C0] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4EBDD] border border-[#E2D3C0] text-[#641F29] text-xs font-semibold tracking-[0.2em] uppercase mb-3.5 font-mono shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#B8322A]" />
              <span>Sakinaka Atmosphere</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#30201B] tracking-tight">
              An Elevated Haven on Andheri-Kurla Road
            </h2>
            <p className="mt-3.5 text-sm sm:text-base text-[#30201B]/80 font-normal leading-relaxed">
              Step away from the bustle of Sakinaka into an intimate Oriental dining room tailored for quiet couple dinners,
              lively corporate lunches, and grand weekend family celebrations.
            </p>
          </div>

          <div>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#FFF9F1] border border-[#E2D3C0] hover:border-[#641F29] text-[#30201B] hover:text-[#641F29] text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
            >
              <Eye className="w-4 h-4 text-[#B8322A]" />
              <span>Full Photo Gallery</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* Ambiance Cards */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {ambianceCards.map((card, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden bg-[#FFF9F1] border border-[#E2D3C0] hover:border-[#641F29]/50 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col"
            >
              <div className="relative h-64 sm:h-72 overflow-hidden bg-[#F4EBDD]">
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#641F29] border border-[#E2D3C0] shadow-sm font-mono">
                  {card.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#30201B] group-hover:text-[#641F29] transition-colors mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#30201B]/80 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
