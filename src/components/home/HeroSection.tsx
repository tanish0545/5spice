import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Calendar, MapPin, Clock, Flame } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, isReducedMotion } from '../../animations/gsap-config';
import { RESTAURANT_INFO } from '../../data/fiveSpiceData';
import { RealisticFoodSteam } from '../effects/RealisticFoodSteam';
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
  const plateAssemblyRef = useRef<HTMLDivElement>(null);
  const bowlImageRef = useRef<HTMLImageElement>(null);
  const rimSheenRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const steamWrapRef = useRef<HTMLDivElement>(null);
  const bgOrbitRef = useRef<PhotographicOrbitHandle>(null);
  const fgOrbitRef = useRef<PhotographicOrbitHandle>(null);

  // Magnetic button refs for primary CTAs
  const exploreBtnRef = useMagneticButton<HTMLButtonElement>(0.3);
  const bookBtnRef = useMagneticButton<HTMLButtonElement>(0.22);

  useGSAP(
    () => {
      const bowl = bowlImageRef.current;
      const plateAssembly = plateAssemblyRef.current;
      const steam = steamWrapRef.current;
      const shadow = shadowRef.current;
      const spotlight = spotlightRef.current;
      const rimSheen = rimSheenRef.current;

      const isMobile = window.innerWidth < 768;
      const targetRotateX = isMobile ? 4.5 : 10.5;
      const targetRotateY = isMobile ? -1 : -3;
      const targetTranslateZ = isMobile ? 8 : 20;

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
        if (plateAssembly) {
          gsap.set(plateAssembly, {
            rotateX: targetRotateX,
            rotateY: targetRotateY,
            translateZ: targetTranslateZ,
            opacity: 1,
            y: 0,
          });
        }
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
        if (shadow) gsap.set(shadow, { opacity: 1, scale: 1, y: 0 });
        if (spotlight) gsap.set(spotlight, { opacity: 1, scale: 1 });
        if (rimSheen) gsap.set(rimSheen, { opacity: 0.7 });
        if (steam) gsap.set(steam, { opacity: 1 });
        bgOrbitRef.current?.startOrbit();
        fgOrbitRef.current?.startOrbit();
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

        if (plateAssembly) {
          gsap.set(plateAssembly, {
            rotateX: 0,
            rotateY: 0,
            translateZ: 0,
            transformOrigin: 'center center',
          });
        }

        if (shadow) gsap.set(shadow, { opacity: 0, scale: 0.65, y: 12 });
        if (spotlight) gsap.set(spotlight, { opacity: 0, scale: 0.75 });
        if (rimSheen) gsap.set(rimSheen, { opacity: 0 });
        if (steam) gsap.set(steam, { opacity: 0 });

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

        if (shadow) {
          tl.to(
            shadow,
            {
              opacity: 0.85,
              scale: 0.94,
              y: 0,
              duration: 0.85,
              ease: 'power3.out',
            },
            0.45
          );
        }

        // Phase C: Smooth 360-degree rotation upon landing, triggering ingredient orbit
        tl.to(
          bowl,
          {
            rotation: 360,
            duration: 2.2,
            ease: 'power2.out',
            onStart: () => {
              // Trigger controlled orbit of genuine photographic ingredients in 3D layers
              bgOrbitRef.current?.startOrbit();
              fgOrbitRef.current?.startOrbit();
            },
            onComplete: () => {
              // Settle stationary in resting state - zero continuous spin
              gsap.set(bowl, { rotation: 0 });
            },
          },
          1.30
        );

        // Spotlight blooms softly behind the bowl
        if (spotlight) {
          tl.to(
            spotlight,
            {
              opacity: 1,
              scale: 1,
              duration: 1.8,
              ease: 'power2.out',
            },
            1.30
          );
        }

        // Shadow reaches full contact depth
        if (shadow) {
          tl.to(
            shadow,
            {
              opacity: 1,
              scale: 1,
              duration: 1.4,
              ease: 'power2.out',
            },
            1.40
          );
        }

        // Phase D: Transition into realistic 3D perspective plate presentation
        if (plateAssembly) {
          tl.to(
            plateAssembly,
            {
              rotateX: targetRotateX,
              rotateY: targetRotateY,
              translateZ: targetTranslateZ,
              duration: 1.3,
              ease: 'power3.out',
            },
            3.30
          );
        }

        // Ceramic rim sheen catches natural studio light reflection
        if (rimSheen) {
          tl.to(
            rimSheen,
            {
              opacity: 0.70,
              duration: 1.2,
              ease: 'power2.out',
            },
            3.40
          );
        }

        // Reveal ultra-soft culinary steam rising above hot crispy potatoes
        if (steam) {
          tl.to(
            steam,
            {
              opacity: 1,
              duration: 1.4,
              ease: 'power2.out',
            },
            3.40
          );
        }

        // Phase E: Subtle, realistic floating breathing oscillation
        tl.add(() => {
          if (plateAssembly) {
            gsap.to(plateAssembly, {
              y: -4,
              duration: 3.6,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            });
          }
          if (shadow) {
            gsap.to(shadow, {
              scale: 0.96,
              opacity: 0.88,
              duration: 3.6,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            });
          }
        }, 4.70);
      } else if (entranceMode === 'hands-serving') {
        if (bowl) gsap.set(bowl, { opacity: 1, scale: 1, x: 0, y: 0 });
        if (plateAssembly) {
          gsap.set(plateAssembly, {
            rotateX: targetRotateX,
            rotateY: targetRotateY,
            translateZ: targetTranslateZ,
          });
        }
        if (shadow) gsap.set(shadow, { opacity: 1, scale: 1, y: 0 });
        if (spotlight) gsap.set(spotlight, { opacity: 1, scale: 1 });
        if (rimSheen) gsap.set(rimSheen, { opacity: 0.7 });
        if (steam) gsap.set(steam, { opacity: 1 });
        bgOrbitRef.current?.startOrbit();
        fgOrbitRef.current?.startOrbit();
      }

      // Parallax: bowl lifts gently and atmosphere fades gracefully as user scrolls
      if (plateAssembly && foodAnchorRef.current) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
          onUpdate: (self) => {
            const p = self.progress;
            if (plateAssembly) gsap.set(plateAssembly, { y: p * -25 });
            if (shadow) gsap.set(shadow, { opacity: Math.max(0, 1 - p * 2.2) });
            if (spotlight) gsap.set(spotlight, { opacity: Math.max(0, 1 - p * 1.8) });
          },
        });
      }
    },
    { scope: heroRef, dependencies: [entranceMode] }
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] lg:min-h-[92vh] flex items-center justify-center pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-12 bg-[#17110F] border-b border-[#3D2A24] overflow-hidden"
    >
      {/* Subtle photographic dining depth & warm practical backlight */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(184,50,42,0.12)_0%,_rgba(183,123,74,0.06)_40%,_transparent_70%)] blur-2xl" />
        <div className="absolute -bottom-20 -left-20 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,_rgba(100,31,41,0.15)_0%,_transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(23,17,15,0.7)_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Balanced Two-Column Desktop Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 xl:gap-14 items-center">
          {/* LEFT COLUMN: Eyebrow, Editorial Headline, Narrative, CTAs & Info (7 cols) */}
          <div
            ref={leftColRef}
            className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            {/* Restaurant Location Eyebrow */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3.5 py-1 rounded-full bg-[#30201B] border border-[#3D2A24] text-[9px] xs:text-[10px] tracking-[0.18em] xs:tracking-[0.24em] uppercase text-[#B77B4A] font-semibold mb-3.5 sm:mb-4 font-mono shadow-sm"
            >
              <Flame className="w-3.5 h-3.5 text-[#B8322A]" />
              <span>Sakinaka, Andheri East • Mumbai</span>
              <span className="hidden sm:inline text-[#3D2A24]">•</span>
              <span className="hidden sm:inline text-[#E8D8C5]/70">Estd. 2004</span>
            </div>

            {/* Main Editorial Headline */}
            <h1
              ref={headlineRef}
              className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-bold tracking-tight text-[#FFF9F1] leading-[1.14] xs:leading-[1.12] mb-3 sm:mb-3.5 max-w-2xl"
            >
              Where Sichuan Wok Flame{' '}
              <span className="text-[#B8322A]">Meets Generous Flavors</span>
            </h1>

            {/* Tagline & Supporting Narrative */}
            <div ref={subtextRef} className="space-y-2 sm:space-y-2.5 mb-6 sm:mb-7 max-w-xl">
              <p className="font-serif italic text-sm sm:text-base md:text-lg text-[#E8D8C5] font-normal">
                Two decades of bold flavors, unforgettable gatherings, and a love affair with Chinese, Sichuan and Asian cuisine.
              </p>
              <p className="text-xs sm:text-sm text-[#E8D8C5]/75 font-normal leading-relaxed">
                Since 2004, 5 Spice has defined Mumbai's love affair with hearty Indo-Chinese gastronomy, signature clay-pot creations, and legendary sharing plates. Wok-fired fresh daily at our Sakinaka destination.
              </p>
            </div>

            {/* Action CTAs */}
            <div
              ref={ctaRef}
              className="flex flex-col xs:flex-row flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 w-full sm:w-auto mb-6 sm:mb-7"
            >
              {/* Primary CTA: Explore Signatures */}
              <button
                ref={exploreBtnRef}
                onClick={onExploreMenu}
                className="w-full xs:w-auto min-h-[44px] px-5 sm:px-6 py-3.5 bg-[#B8322A] hover:bg-[#862D35] text-white font-semibold text-xs tracking-[0.16em] uppercase rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                <Utensils className="w-3.5 h-3.5 text-white transition-transform group-hover:scale-110" />
                <span>Explore Signatures</span>
              </button>

              {/* Secondary CTA: Book a Table */}
              <button
                ref={bookBtnRef}
                onClick={onOpenReservation}
                className="w-full xs:w-auto min-h-[44px] px-5 sm:px-6 py-3.5 bg-[#30201B] hover:bg-[#17110F] border border-[#3D2A24] hover:border-[#B77B4A] text-[#FFF9F1] font-semibold text-xs tracking-[0.16em] uppercase rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5 text-[#B8322A]" />
                <span>Book a Table</span>
              </button>

              {/* Tertiary: Full Menu */}
              <Link
                to="/menu"
                className="min-h-[44px] text-xs text-[#B77B4A] hover:text-[#FFF9F1] uppercase tracking-[0.16em] font-bold py-2.5 px-3 transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <span>Full Menu (₹)</span>
                <span>→</span>
              </Link>
            </div>

            {/* Restaurant Information Row */}
            <div
              ref={infoBarRef}
              className="pt-3.5 sm:pt-4 border-t border-[#3D2A24] w-full flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-4 text-[11px] sm:text-xs text-[#E8D8C5]/75 font-medium"
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
          <div className="lg:col-span-5 flex items-center justify-center w-full pt-4 lg:pt-0">
            <div
              ref={foodAnchorRef}
              id="hero-food-anchor"
              className="relative w-full max-w-[260px] xs:max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[440px] xl:max-w-[465px] aspect-square flex items-center justify-center select-none my-2 sm:my-3"
              style={{ perspective: '1200px' }}
            >
              {/* Layer 1: Warm Diffused Spotlight & Backlight Pool */}
              <div
                ref={spotlightRef}
                className="absolute inset-0 pointer-events-none z-[1] flex items-center justify-center"
                aria-hidden="true"
              >
                {/* Wide warm ambient atmosphere */}
                <div className="absolute w-[125%] h-[125%] rounded-full bg-[radial-gradient(circle_at_50%_48%,_rgba(184,50,42,0.22)_0%,_rgba(183,123,74,0.12)_36%,_rgba(48,32,27,0.04)_60%,_transparent_75%)] blur-2xl" />
                {/* Focused warm keylight directly behind the bowl */}
                <div className="absolute w-[85%] h-[85%] rounded-full bg-[radial-gradient(circle_at_50%_46%,_rgba(255,200,150,0.15)_0%,_rgba(184,50,42,0.16)_42%,_transparent_72%)] blur-xl" />
              </div>

              {/* Layer 2: Realistic Floating Soft Shadow Beneath Plate */}
              <div
                ref={shadowRef}
                className="absolute inset-0 pointer-events-none z-[3]"
                aria-hidden="true"
              >
                {/* Ambient Floor Penumbra (wide, warm, soft) */}
                <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[88%] h-[32%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_rgba(15,8,6,0.65)_0%,_rgba(23,17,15,0.35)_45%,_transparent_72%)] blur-xl" />
                {/* Deep Contact Umbra (dense, sharp, directly under bowl base) */}
                <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[66%] h-[20%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.82)_0%,_rgba(15,8,6,0.55)_50%,_transparent_75%)] blur-md" />
              </div>

              {/* Layer 3: Background Orbiting Ingredients (Behind the Bowl) */}
              <div className="absolute inset-0 z-[5] pointer-events-none">
                <PhotographicOrbitIngredients ref={bgOrbitRef} layer="background" />
              </div>

              {/* Layer 4: 3D Plate Assembly with Ceramic Rim Sheen and Generous Breathing Space */}
              <div
                ref={plateAssemblyRef}
                className="relative z-[10] w-full h-full flex items-center justify-center will-change-transform p-2 sm:p-2.5"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Single uncropped food bowl photograph with exact ID for seamless FloatingFoodJourney handoff */}
                <img
                  ref={bowlImageRef}
                  id="hero-bowl-image"
                  src="/images/crispy-chilli-potato-cutout.png"
                  alt="5 Spice Authentic Crispy Chilli Potatoes Coupe Bowl"
                  className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_20px_36px_rgba(0,0,0,0.5)] will-change-transform select-none"
                />

                {/* Subtle Ceramic Rim Specular Highlight & Natural Glaze Reflection */}
                <div
                  ref={rimSheenRef}
                  className="pointer-events-none absolute inset-0 z-20 rounded-full mix-blend-screen opacity-70 will-change-transform"
                  style={{
                    background:
                      'conic-gradient(from 215deg at 50% 50%, transparent 0deg, rgba(255,245,235,0.22) 36deg, rgba(255,255,255,0.36) 52deg, rgba(255,235,215,0.18) 72deg, transparent 110deg, transparent 270deg, rgba(183,123,74,0.16) 310deg, transparent 350deg)',
                    maskImage:
                      'radial-gradient(circle at 50% 50%, transparent 72%, black 82%, black 93%, transparent 98%)',
                    WebkitMaskImage:
                      'radial-gradient(circle at 50% 50%, transparent 72%, black 82%, black 93%, transparent 98%)',
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* Layer 5: Ultra-Soft Realistic Culinary Steam Rising Above Food */}
              <div
                ref={steamWrapRef}
                className="absolute -top-12 sm:-top-16 left-1/2 -translate-x-1/2 w-48 sm:w-56 h-36 sm:h-44 pointer-events-none z-[20]"
              >
                <RealisticFoodSteam intensity={0.55} />
              </div>

              {/* Layer 6: Foreground Orbiting Ingredients (In Front of the Bowl) */}
              <div className="absolute inset-0 z-[25] pointer-events-none">
                <PhotographicOrbitIngredients ref={fgOrbitRef} layer="foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
