import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Award, HeartHandshake, ShieldCheck } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap, isReducedMotion } from '../../animations/gsap-config';

export const HeritageHighlightSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isReducedMotion() || !sectionRef.current) return;

      // Clip-path headline reveal — editorial curtain-lift
      if (h2Ref.current) {
        gsap.fromTo(
          h2Ref.current,
          { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: h2Ref.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Left content: opacity + y fade
      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current.querySelectorAll('p, .feature-pills, .cta-row'),
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leftRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // Right column fade
      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current,
          { opacity: 0, x: 28 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rightRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }

      // Image parallax — img moves upward at a slower rate than scroll
      if (imgRef.current && imgWrapRef.current) {
        gsap.fromTo(
          imgRef.current,
          { y: '0%' },
          {
            y: '-8%',
            ease: 'none',
            scrollTrigger: {
              trigger: imgWrapRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      // Stats counter animation
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.querySelectorAll('.stat-card'),
          { opacity: 0, y: 16, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 88%',
              once: true,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-[#641F29] text-[#FFF9F1] border-b border-[#3D2A24] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Editorial Text & Story */}
          <div ref={leftRef} className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#17110F]/60 border border-[#B77B4A]/30 text-[#E8D8C5] text-xs font-semibold tracking-[0.2em] uppercase font-mono shadow-sm">
              <Award className="w-3.5 h-3.5 text-[#B77B4A]" />
              <span>Two Decades of Mumbai Flavor</span>
            </div>

            <h2 ref={h2Ref} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFF9F1] tracking-tight leading-tight">
              A Mumbai Institution of Fierce Wok Heat &amp; Unabashed Generosity
            </h2>

            <p className="text-[#E8D8C5] text-sm sm:text-base font-normal leading-relaxed">
              When 5 Spice opened its doors, it set out to dismantle the notion that fine Oriental dining
              required timid spice or meager tasting portions. Founded on authentic Chinese culinary traditions
              infused with bold Mumbai spirit, we introduced the city to genuine wok hei—the fiery breath of seasoned woks.
            </p>

            <p className="text-[#E8D8C5]/90 text-xs sm:text-sm font-normal leading-relaxed">
              From our famous 1000ml steaming clay-pot rice bowls to the unforgettable crunch of hand-tossed
              Crispy Chilli Potatoes and towering Rocky Road sundae cauldrons, every dish is prepared fresh
              to order, crafted for families, colleagues, and food lovers to share together.
            </p>

            {/* Feature Pills */}
            <div className="feature-pills grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-[#FFF9F1] text-[#30201B] border border-[#E2D3C0] shadow-sm">
                <div className="flex items-center gap-2.5 text-[#641F29] mb-1 font-semibold text-sm font-serif">
                  <Flame className="w-4 h-4 text-[#B8322A]" />
                  <span>Authentic High-Temp Woks</span>
                </div>
                <p className="text-xs text-[#30201B]/80 leading-relaxed">
                  Blistering flame cooking locks in moisture, crunch, and authentic smokiness in every vegetable and cut of meat.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FFF9F1] text-[#30201B] border border-[#E2D3C0] shadow-sm">
                <div className="flex items-center gap-2.5 text-[#641F29] mb-1 font-semibold text-sm font-serif">
                  <HeartHandshake className="w-4 h-4 text-[#B8322A]" />
                  <span>Communal Feast Portions</span>
                </div>
                <p className="text-xs text-[#30201B]/80 leading-relaxed">
                  Every main course and starter is sized for sharing. No guest ever leaves a 5 Spice table unsatisfied.
                </p>
              </div>
            </div>

            <div className="cta-row pt-3 flex flex-wrap items-center gap-4">
              <Link
                to="/story"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#B8322A] hover:bg-[#862D35] text-white font-semibold text-xs tracking-wider uppercase rounded-lg shadow-sm transition-all"
              >
                <span>Read The 5 Spice Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="flex items-center gap-1.5 text-xs text-[#E8D8C5]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Halal Certified Meats</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Collage & Stats */}
          <div ref={rightRef} className="lg:col-span-5 space-y-5">
            <div ref={imgWrapRef} className="relative rounded-2xl overflow-hidden border border-[#3D2A24] shadow-2xl group">
              <img
                ref={imgRef}
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80"
                alt="5 Spice Dining Room Atmosphere"
                className="w-full h-80 sm:h-96 object-cover scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] text-[#B77B4A] tracking-[0.2em] uppercase font-bold block mb-1 font-mono">
                  Sakinaka, Andheri East
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-white font-bold">
                  Warm Ambient Dining Space
                </h3>
                <p className="text-xs text-gray-200 mt-1 font-light">
                  Dark timber accents, glowing lanterns, and aromatic wok theatre right off Andheri-Kurla Road.
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div ref={statsRef} className="grid grid-cols-3 gap-3 text-center">
              <div className="stat-card p-4 rounded-xl bg-[#FFF9F1] text-[#30201B] border border-[#E2D3C0] shadow-sm">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#641F29]">20+</div>
                <div className="text-[10px] uppercase tracking-wider text-[#30201B]/70 mt-1 font-semibold">Years Heritage</div>
              </div>
              <div className="stat-card p-4 rounded-xl bg-[#FFF9F1] text-[#30201B] border border-[#E2D3C0] shadow-sm">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#30201B]">100+</div>
                <div className="text-[10px] uppercase tracking-wider text-[#30201B]/70 mt-1 font-semibold">Cult Dishes</div>
              </div>
              <div className="stat-card p-4 rounded-xl bg-[#FFF9F1] text-[#30201B] border border-[#E2D3C0] shadow-sm">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#641F29]">1000ml</div>
                <div className="text-[10px] uppercase tracking-wider text-[#30201B]/70 mt-1 font-semibold">Pot Rice Bowls</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
