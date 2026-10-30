import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Calendar, MapPin, Clock, Flame } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, isReducedMotion } from '../../animations/gsap-config';
import { RESTAURANT_INFO } from '../../data/fiveSpiceData';
import { CulinarySteam } from '../effects/CulinarySteam';
import {
  PhotographicOrbitIngredients,
  type PhotographicOrbitHandle,
} from '../effects/PhotographicOrbitIngredients';
import { useMagneticButton } from '../../hooks/useMagneticButton';

/**
 * Supported entrance animation modes for the hero featured dish.
 * - 'cinematic-swipe': Option 1 (Default active) - Bowl rushes from left with momentum and settles.
 * - 'hands-serving': Option 2 (Documented future architecture for multi-frame serving hands asset).
 */
export type HeroEntranceMode = 'cinematic-swipe' | 'hands-serving';

interface HeroSectionProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
  entranceMode?: HeroEntranceMode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenReservation,
  onExploreMenu,
  entranceMode = 'cinematic-swipe',
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const infoBarRef = useRef<HTMLDivElement>(null);
  const foodAnchorRef = useRef<HTMLDivElement>(null);
  const bowlImageRef = useRef<HTMLImageElement>(null);
  const steamWrapRef = useRef<HTMLDivElement>(null);
  const garnishWrapRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<PhotographicOrbitHandle>(null);

  // Magnetic button refs for primary CTAs
  const exploreBtnRef = useMagneticButton<HTMLButtonElement>(0.3);
  const bookBtnRef = useMagneticButton<HTMLButtonElement>(0.22);

  useGSAP(
    () => {
      const bowl = bowlImageRef.current;
      const steam = steamWrapRef.current;

      // 1. Accessibility: Immediate static placement if reduced motion is requested
      if (isReducedMotion()) {
        gsap.set(
          [
            badgeRef.current,
            headlineRef.current,
            subtextRef.current,
            ctaRef.current?.children,
            infoBarRef.current,
            foodAnchorRef.current,
          ],
          { opacity: 1, y: 0, scale: 1 }
        );
        if (bowl) {
          gsap.set(bowl, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            filter: 'none',
          });
        }
        if (steam) gsap.set(steam, { opacity: 1 });
        orbitRef.current?.startOrbit();
        return;
      }

      // Master Hero Timeline
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.05,
      });

      // 2. Eyebrow badge reveal
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.05
        );
      }

      // 3. Editorial headline entrance
      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          0.12
        );
      }

      // 4. Tagline & supporting narrative
      if (subtextRef.current) {
        tl.fromTo(
          subtextRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.65 },
          0.30
        );
      }

      // 5. Action buttons entrance
      const ctaButtons = ctaRef.current?.children;
      if (ctaButtons && ctaButtons.length > 0) {
        tl.fromTo(
          ctaButtons,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
          0.45
        );
      }

      // 6. Outlet information bar
      if (infoBarRef.current) {
        tl.fromTo(
          infoBarRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.55 },
          0.60
        );
      }

      // 7. CINEMATIC HERO FOOD ENTRANCE (OPTION 1 — SWIPE FROM LEFT)
      if (bowl && entranceMode === 'cinematic-swipe') {
        const isMobile = window.innerWidth < 768;
        // Offscreen start position to the left of the viewport
        const startX = isMobile
          ? -window.innerWidth * 1.1
          : -(window.innerWidth * 0.65 + 320);

        // Phase A: Initial offscreen state
        gsap.set(bowl, {
          x: startX,
          y: isMobile ? 18 : 28,
          rotation: -16,
          scale: 0.90,
          opacity: 0,
          filter: 'blur(8px)',
          transformOrigin: 'center center',
        });

        // Phase B: High-velocity rush across from left
        tl.to(
          bowl,
          {
            opacity: 1,
            duration: 0.35,
            ease: 'power2.out',
          },
          0.35
        );

        tl.to(
          bowl,
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1.0,
            filter: 'blur(0px)',
            duration: 0.95,
            ease: 'power4.out',
            onComplete: () => {
              gsap.set(bowl, { clearProps: 'filter' });
            },
          },
          0.35
        );

        // Phase C: Smooth 360-degree rotation upon landing, triggering ingredient orbit
        tl.to(
          bowl,
          {
            rotation: 360,
            duration: 2.2,
            ease: 'power2.out',
            onStart: () => {
              // Trigger controlled orbit of genuine photographic ingredients
              orbitRef.current?.startOrbit();
            },
            onComplete: () => {
              // Settle stationary in resting state
              gsap.set(bowl, { rotation: 0 });
            },
          },
          1.30
        );
      } else if (entranceMode === 'hands-serving') {
        if (bowl) {
          gsap.set(bowl, { opacity: 1, scale: 1, x: 0, y: 0 });
        }
      }

      // 8. Reveal Culinary Steam after bowl touches down
      if (steam) {
        tl.fromTo(
          steam,
          { opacity: 0 },
          { opacity: 1, duration: 1.2, ease: 'power2.out' },
          1.5
        );
      }

      // 9. Subtle parallax: bowl lifts gently as the user starts to scroll away from hero
      if (bowl && foodAnchorRef.current) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
          onUpdate: (self) => {
            if (!bowl) return;
            gsap.set(bowl, { y: self.progress * -40 });
          },
        });
      }
    },
    { scope: heroRef, dependencies: [entranceMode] }
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-[85vh] lg:min-h-[88vh] lg:h-[90vh] lg:max-h-[880px] flex items-center justify-center pt-28 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 bg-[#17110F] border-b border-[#3D2A24] overflow-hidden"
    >
      {/* Subtle photographic dining depth & warm practical backlight */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(184,50,42,0.12)_0%,_rgba(183,123,74,0.06)_40%,_transparent_70%)] blur-2xl" />
        <div className="absolute -bottom-20 -left-20 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,_rgba(100,31,41,0.15)_0%,_transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(23,17,15,0.7)_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Balanced Two-Column Desktop Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
          {/* LEFT COLUMN: Eyebrow, Editorial Headline, Narrative, CTAs & Info (7 cols) */}
          <div
            ref={leftColRef}
            className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            {/* Restaurant Location Eyebrow */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#30201B] border border-[#3D2A24] text-[10px] tracking-[0.24em] uppercase text-[#B77B4A] font-semibold mb-4 font-mono shadow-sm"
            >
              <Flame className="w-3.5 h-3.5 text-[#B8322A]" />
              <span>Sakinaka, Andheri East • Mumbai</span>
              <span className="hidden sm:inline text-[#3D2A24]">•</span>
              <span className="hidden sm:inline text-[#E8D8C5]/70">Estd. 2004</span>
            </div>

            {/* Main Editorial Headline */}
            <h1
              ref={headlineRef}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-bold tracking-tight text-[#FFF9F1] leading-[1.12] mb-3.5 max-w-2xl"
            >
              Where Sichuan Wok Flame{' '}
              <span className="text-[#B8322A]">Meets Generous Flavors</span>
            </h1>

            {/* Tagline & Supporting Narrative */}
            <div ref={subtextRef} className="space-y-2.5 mb-7 max-w-xl">
              <p className="font-serif italic text-base sm:text-lg text-[#E8D8C5] font-normal">
                Two decades of bold flavors, unforgettable gatherings, and a love affair with Chinese, Sichuan and Asian cuisine.
              </p>
              <p className="text-xs sm:text-sm text-[#E8D8C5]/75 font-normal leading-relaxed">
                Since 2004, 5 Spice has defined Mumbai's love affair with hearty Indo-Chinese gastronomy, signature clay-pot creations, and legendary sharing plates. Wok-fired fresh daily at our Sakinaka destination.
              </p>
            </div>

            {/* Action CTAs */}
            <div
              ref={ctaRef}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-3.5 w-full sm:w-auto mb-7"
            >
              {/* Primary CTA: Explore Signatures */}
              <button
                ref={exploreBtnRef}
                onClick={onExploreMenu}
                className="px-6 py-3.5 bg-[#B8322A] hover:bg-[#862D35] text-white font-semibold text-xs tracking-[0.16em] uppercase rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                <Utensils className="w-3.5 h-3.5 text-white transition-transform group-hover:scale-110" />
                <span>Explore Signatures</span>
              </button>

              {/* Secondary CTA: Book a Table */}
              <button
                ref={bookBtnRef}
                onClick={onOpenReservation}
                className="px-6 py-3.5 bg-[#30201B] hover:bg-[#17110F] border border-[#3D2A24] hover:border-[#B77B4A] text-[#FFF9F1] font-semibold text-xs tracking-[0.16em] uppercase rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5 text-[#B8322A]" />
                <span>Book a Table</span>
              </button>

              {/* Tertiary: Full Menu */}
              <Link
                to="/menu"
                className="text-xs text-[#B77B4A] hover:text-[#FFF9F1] uppercase tracking-[0.16em] font-bold py-2.5 px-3 transition-colors inline-flex items-center gap-1.5"
              >
                <span>Full Menu (₹)</span>
                <span>→</span>
              </Link>
            </div>

            {/* Restaurant Information Row */}
            <div
              ref={infoBarRef}
              className="pt-4 border-t border-[#3D2A24] w-full flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs text-[#E8D8C5]/75 font-medium"
            >
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#B8322A]" />
                <span>12:00 PM – 3:30 PM • 7:00 PM – 11:30 PM</span>
              </div>
              <span className="text-[#3D2A24] hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#B8322A]" />
                <span>Shivai Estate, Sakinaka</span>
              </div>
              <span className="text-[#3D2A24] hidden sm:inline">•</span>
              <div className="text-[#FFF9F1] font-semibold font-mono flex items-center gap-1">
                <span className="text-[#B77B4A] font-bold">₹</span>
                <span>{RESTAURANT_INFO.costForTwo.split(' ')[0]} for two</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Exactly One Prominent, Centered Crispy Chilli Potatoes Bowl (5 cols) */}
          <div className="lg:col-span-5 flex items-center justify-center w-full pt-2 lg:pt-0">
            <div
              ref={foodAnchorRef}
              id="hero-food-anchor"
              className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] lg:max-w-[480px] xl:max-w-[500px] aspect-square flex items-center justify-center select-none"
            >
              {/* Warm directional light pool beneath the bowl */}
              <div className="absolute inset-4 rounded-full bg-[radial-gradient(circle,_rgba(184,50,42,0.2)_0%,_rgba(183,123,74,0.1)_45%,_transparent_72%)] blur-lg pointer-events-none" />

              {/* Natural culinary steam rising above hot crispy potatoes */}
              <div
                ref={steamWrapRef}
                className="absolute -top-16 sm:-top-24 left-1/2 -translate-x-1/2 w-48 sm:w-56 h-36 sm:h-44 pointer-events-none z-0"
              >
                <CulinarySteam variant="subtle" intensity={0.4} />
              </div>

              {/* Context-aware genuine photographic orbiting ingredients */}
              <div ref={garnishWrapRef} className="absolute inset-0 z-20 pointer-events-none">
                <PhotographicOrbitIngredients ref={orbitRef} />
              </div>

              {/* Photorealistic uncropped bowl with ZERO white background or baked shadow */}
              <img
                ref={bowlImageRef}
                id="hero-bowl-image"
                src="/images/crispy-chilli-potato-cutout.png"
                alt="5 Spice Authentic Crispy Chilli Potatoes Coupe Bowl"
                className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_24px_48px_rgba(0,0,0,0.55)] will-change-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
