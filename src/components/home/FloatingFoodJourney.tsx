import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Flame,
  Calendar,
  ExternalLink,
  Check,
  Utensils,
} from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, isReducedMotion } from '../../animations/gsap-config';
import { RESTAURANT_INFO } from '../../data/fiveSpiceData';
import { CulinarySteam } from '../effects/CulinarySteam';

interface FloatingFoodJourneyProps {
  onOpenReservation?: () => void;
}

export const FloatingFoodJourney: React.FC<FloatingFoodJourneyProps> = ({
  onOpenReservation,
}) => {
  const journeyWrapperRef = useRef<HTMLDivElement>(null);
  const floatingPotatoRef = useRef<HTMLDivElement>(null);
  const storyPinRef = useRef<HTMLDivElement>(null);
  const landingTargetRef = useRef<HTMLDivElement>(null);
  const dockedFoodRef = useRef<HTMLImageElement>(null);
  const landingAuraRef = useRef<HTMLDivElement>(null);
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);
  const landingCardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Accessibility: Respect reduced motion
      if (isReducedMotion()) {
        if (floatingPotatoRef.current) {
          gsap.set(floatingPotatoRef.current, { display: 'none' });
        }
        if (dockedFoodRef.current) {
          gsap.set(dockedFoodRef.current, { opacity: 1, visibility: 'visible' });
        }
        return;
      }

      const floatingPotato = floatingPotatoRef.current;
      const dockedFood = dockedFoodRef.current;
      const landingTarget = landingTargetRef.current;
      const landingAura = landingAuraRef.current;
      const storyPin = storyPinRef.current;
      const journeyWrapper = journeyWrapperRef.current;
      const heroBowlImage = document.getElementById('hero-bowl-image');

      if (!floatingPotato || !dockedFood || !landingTarget || !storyPin || !journeyWrapper) {
        return;
      }

      // Initial state: Only hero image is visible. Floating and docked images are hidden.
      gsap.set(dockedFood, { opacity: 0, visibility: 'hidden' });
      gsap.set(floatingPotato, { opacity: 0, visibility: 'hidden' });

      // Proportionate dimensions of the floating asset matching hero
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const baseSize = isMobile ? 260 : isTablet ? 360 : 470;

      // Coordinate calculation helper
      const getCoordinates = () => {
        const heroAnchor = document.getElementById('hero-food-anchor');
        const targetEl = landingTargetRef.current;
        const wWidth = window.innerWidth;
        const wHeight = window.innerHeight;

        // Default fallback Hero position
        let heroX = wWidth * (isMobile ? 0.5 : 0.74) - baseSize / 2;
        let heroY = wHeight * (isMobile ? 0.60 : 0.48) - baseSize / 2;
        let heroScale = 1.0;

        if (heroAnchor) {
          const rect = heroAnchor.getBoundingClientRect();
          heroX = rect.left + rect.width / 2 - baseSize / 2;
          heroY = rect.top + rect.height / 2 - baseSize / 2;
          heroScale = rect.width / baseSize;
        }

        // Landing target position
        let landingX = wWidth * 0.5 - baseSize / 2;
        let landingY = wHeight * 0.5 - baseSize / 2;
        let landingScale = heroScale;

        if (targetEl) {
          const tRect = targetEl.getBoundingClientRect();
          landingX = tRect.left + tRect.width / 2 - baseSize / 2;
          landingY = wHeight * 0.5 - baseSize / 2;
          landingScale = (tRect.width * 0.98) / baseSize;
        }

        return {
          hero: { x: heroX, y: heroY, scale: heroScale },
          landing: { x: landingX, y: landingY, scale: landingScale },
          wWidth,
          wHeight,
        };
      };

      let coords = getCoordinates();

      // Position floating element at exact hero location
      gsap.set(floatingPotato, {
        x: coords.hero.x,
        y: coords.hero.y,
        scale: coords.hero.scale,
        rotation: 0,
        opacity: 0,
        visibility: 'hidden',
        transformOrigin: 'center center',
      });

      // Recalculate measurements on resize and ScrollTrigger refresh
      ScrollTrigger.addEventListener('refreshInit', () => {
        coords = getCoordinates();
      });

      // Pinned Story Section distance
      const pinDistance = isMobile ? 1000 : 1600;

      ScrollTrigger.create({
        trigger: storyPin,
        start: 'top top',
        end: `+=${pinDistance}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      // Master Scroll-Driven Flight Timeline with STRICT MUTUALLY EXCLUSIVE HANDOFF
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: journeyWrapper,
          start: 'top 85%',
          endTrigger: landingTarget,
          end: 'center center',
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;

            // Strict mutually exclusive visibility: Exactly ONE bowl visible at every point
            if (p <= 0.005) {
              // PHASE A: Hero at rest
              if (heroBowlImage) gsap.set(heroBowlImage, { opacity: 1, visibility: 'visible' });
              gsap.set(floatingPotato, { opacity: 0, visibility: 'hidden' });
              gsap.set(dockedFood, { opacity: 0, visibility: 'hidden' });
            } else if (p >= 0.99) {
              // PHASE D: Landed at destination plate
              if (heroBowlImage) gsap.set(heroBowlImage, { opacity: 0, visibility: 'hidden' });
              gsap.set(floatingPotato, { opacity: 0, visibility: 'hidden' });
              gsap.set(dockedFood, { opacity: 1, visibility: 'visible' });
            } else {
              // PHASE B & C: In-flight through storytelling scenes (100% opaque, ZERO duplicate)
              if (heroBowlImage) gsap.set(heroBowlImage, { opacity: 0, visibility: 'hidden' });
              gsap.set(floatingPotato, { opacity: 1, visibility: 'visible' });
              gsap.set(dockedFood, { opacity: 0, visibility: 'hidden' });
            }
          },
        },
      });

      // 0 -> 18: Gentle Liftoff & Glide into Storytelling Stage
      masterTl.to(
        floatingPotato,
        {
          x: () => coords.wWidth * (isMobile ? 0.5 : 0.62) - baseSize / 2,
          y: () => coords.wHeight * (isMobile ? 0.40 : 0.38) - baseSize / 2,
          scale: () => coords.hero.scale * (isMobile ? 1.01 : 1.02),
          rotation: isMobile ? 1 : 1.5,
          duration: 18,
          ease: 'power1.inOut',
        },
        0
      );

      // Phase B: PINNED STORY SCENE 1 (t = 18 to 36)
      masterTl.to(
        floatingPotato,
        {
          x: () => coords.wWidth * (isMobile ? 0.5 : 0.28) - baseSize / 2,
          y: () => coords.wHeight * (isMobile ? 0.46 : 0.48) - baseSize / 2,
          scale: () => coords.hero.scale * (isMobile ? 1.02 : 1.04),
          rotation: -2,
          duration: 18,
          ease: 'power1.inOut',
        },
        18
      );

      if (scene1Ref.current) {
        masterTl.fromTo(
          scene1Ref.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 9, ease: 'power2.out' },
          18
        );
        masterTl.to(
          scene1Ref.current,
          { opacity: 0, y: -15, duration: 6, ease: 'power2.in' },
          30
        );
      }

      // PINNED STORY SCENE 2 (t = 36 to 54)
      masterTl.to(
        floatingPotato,
        {
          x: () => coords.wWidth * (isMobile ? 0.5 : 0.70) - baseSize / 2,
          y: () => coords.wHeight * (isMobile ? 0.48 : 0.50) - baseSize / 2,
          scale: () => coords.hero.scale * (isMobile ? 1.03 : 1.05),
          rotation: 2,
          duration: 18,
          ease: 'power1.inOut',
        },
        36
      );

      if (scene2Ref.current) {
        masterTl.fromTo(
          scene2Ref.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 9, ease: 'power2.out' },
          36
        );
        masterTl.to(
          scene2Ref.current,
          { opacity: 0, y: -15, duration: 6, ease: 'power2.in' },
          48
        );
      }

      // PINNED STORY SCENE 3 (t = 54 to 72)
      masterTl.to(
        floatingPotato,
        {
          x: () => coords.wWidth * (isMobile ? 0.5 : 0.36) - baseSize / 2,
          y: () => coords.wHeight * (isMobile ? 0.44 : 0.44) - baseSize / 2,
          scale: () => coords.hero.scale * (isMobile ? 1.02 : 1.03),
          rotation: -1,
          duration: 18,
          ease: 'power1.inOut',
        },
        54
      );

      if (scene3Ref.current) {
        masterTl.fromTo(
          scene3Ref.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 9, ease: 'power2.out' },
          54
        );
        masterTl.to(
          scene3Ref.current,
          { opacity: 0, y: -15, duration: 6, ease: 'power2.in' },
          66
        );
      }

      // Phase C: THE LANDING (t = 72 to 100)
      masterTl.to(
        floatingPotato,
        {
          x: () => coords.landing.x,
          y: () => coords.landing.y,
          scale: () => coords.landing.scale,
          rotation: 0,
          duration: 28,
          ease: 'power2.out',
        },
        72
      );

      // Subtle Warm Shockwave Impact
      if (landingAura) {
        masterTl.fromTo(
          landingAura,
          { scale: 0.85, opacity: 0 },
          {
            scale: 1.25,
            opacity: 0.6,
            duration: 1.5,
            ease: 'power2.out',
          },
          98.5
        );
        masterTl.to(
          landingAura,
          { opacity: 0, duration: 0.8 },
          99.5
        );
      }

      // Landing Card Highlight
      if (landingCardRef.current) {
        masterTl.fromTo(
          landingCardRef.current,
          { opacity: 0.7, y: 15 },
          { opacity: 1, y: 0, duration: 20, ease: 'power2.out' },
          80
        );
      }
    },
    { scope: journeyWrapperRef }
  );

  return (
    <div ref={journeyWrapperRef} className="relative">
      {/* 
        =======================================================
        THE SINGLE FLOATING SIGNATURE DISH (Crispy Chilli Potatoes PNG)
        =======================================================
      */}
      <div
        ref={floatingPotatoRef}
        id="floating-food-item"
        className="fixed top-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[470px] lg:h-[470px] pointer-events-none z-30 select-none will-change-transform"
        style={{ transformOrigin: 'center center', opacity: 0, visibility: 'hidden' }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src="/images/crispy-chilli-potato-cutout.png"
            alt="5 Spice Crispy Chilli Potatoes Cutout"
            className="w-full h-full object-contain filter drop-shadow-[0_18px_32px_rgba(48,35,33,0.18)]"
          />
        </div>
      </div>

      {/* 
        =======================================================
        PHASE B: DEDICATED PINNED STORYTELLING SECTION (Deep Burgundy Theme #641F29)
        =======================================================
      */}
      <section
        id="storytelling-journey"
        ref={storyPinRef}
        className="w-full h-screen bg-[#641F29] text-[#FFF9F1] flex flex-col justify-between relative overflow-hidden px-4 sm:px-6 md:px-12 border-b border-[#3D2A24]"
      >
        {/* Deliberate Section Header */}
        <div className="max-w-4xl mx-auto text-center pt-6 xs:pt-8 sm:pt-10 pb-2 relative z-20">
          <div className="inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3.5 py-1 rounded-full bg-[#17110F]/60 border border-[#B77B4A]/30 text-[9px] xs:text-[10px] tracking-[0.18em] xs:tracking-[0.24em] uppercase text-[#E8D8C5] font-semibold font-mono mb-2 shadow-sm">
            <Flame className="w-3.5 h-3.5 text-[#B8322A]" />
            <span>The Alchemy of Wok Craft • Sakinaka Discipline</span>
          </div>
          <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-[#FFF9F1] tracking-tight uppercase">
            From 800°F Fire to Table Service
          </h2>
          <p className="text-xs sm:text-sm text-[#E8D8C5] max-w-lg mx-auto font-normal mt-1 leading-relaxed">
            Every dish carries the heat, flavour, and character of the wok.
          </p>
        </div>

        {/* Controlled Ambient Wok Flame Glow & Culinary Steam Vapor */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="w-[540px] h-[540px] rounded-full bg-[radial-gradient(circle,_rgba(184,50,42,0.26)_0%,_rgba(100,31,41,0.12)_55%,_transparent_75%)] animate-pulse" />
          <CulinarySteam variant="medium" intensity={0.35} className="w-88 h-72 absolute" />
        </div>

        {/* Narrative Scenes (Synchronized with Flight Path) */}
        <div className="relative w-full max-w-5xl mx-auto flex-1 flex items-center justify-center z-10 pointer-events-none">
          {/* SCENE 01: The 800°F Wok Discipline */}
          <div
            ref={scene1Ref}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-6 w-[calc(100vw-32px)] max-w-sm sm:max-w-md bg-[#FFF9F1] text-[#30201B] border border-[#E2D3C0] rounded-2xl p-4 xs:p-6 sm:p-8 shadow-2xl opacity-0"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4EBDD] border border-[#E2D3C0] text-[10px] uppercase tracking-wider text-[#641F29] mb-2.5 font-semibold font-mono">
              <Sparkles className="w-2.5 h-2.5 text-[#B8322A]" />
              <span>Act I • High-Heat Wok Blanch</span>
            </div>
            <h3 className="font-serif text-lg xs:text-xl sm:text-2xl font-bold text-[#30201B] tracking-tight mb-1">
              Double-Wok Crisped Potatoes
            </h3>
            <p className="font-serif italic text-xs sm:text-sm text-[#862D35] mb-2.5">
              Hand-Cut Shredded Potato Fingers
            </p>
            <p className="text-xs text-[#30201B]/80 font-normal leading-relaxed mb-3">
              Hand-cut fresh daily, flash-blanched and wok-seared over smoking 800°F heat until an ultra-crisp golden crust develops, locking in a soft, steaming interior.
            </p>
            <div className="flex items-center gap-3 pt-2.5 border-t border-[#E2D3C0] text-xs text-[#30201B]/70">
              <span className="text-[#641F29] font-mono font-bold">01/03</span>
              <span>Smoking Wok Hei • 800°F Flame</span>
            </div>
          </div>

          {/* SCENE 02: The Five Spice & Chilli Glaze */}
          <div
            ref={scene2Ref}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-6 w-[calc(100vw-32px)] max-w-sm sm:max-w-md bg-[#FFF9F1] text-[#30201B] border border-[#E2D3C0] rounded-2xl p-4 xs:p-6 sm:p-8 shadow-2xl opacity-0"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4EBDD] border border-[#E2D3C0] text-[10px] uppercase tracking-wider text-[#641F29] mb-2.5 font-semibold font-mono">
              <Sparkles className="w-2.5 h-2.5 text-[#B8322A]" />
              <span>Act II • Signature Chilli Glaze</span>
            </div>
            <h3 className="font-serif text-lg xs:text-xl sm:text-2xl font-bold text-[#30201B] tracking-tight mb-1">
              Sichuan Heat &amp; Sweet Soya
            </h3>
            <p className="font-serif italic text-xs sm:text-sm text-[#862D35] mb-2.5">
              Star Anise, Cloves, Ginger &amp; Scallions
            </p>
            <p className="text-xs text-[#30201B]/80 font-normal leading-relaxed mb-3">
              Tossed in our signature dark soy reduction infused with crushed red chillies, five-spice aromatics, pungent garlic slivers, and showered with fresh spring onions.
            </p>
            <div className="flex items-center gap-3 pt-2.5 border-t border-[#E2D3C0] text-xs text-[#30201B]/70">
              <span className="text-[#641F29] font-mono font-bold">02/03</span>
              <span>Sichuan Peppercorns • Toasted Sesame</span>
            </div>
          </div>

          {/* SCENE 03: Plated for Sharing */}
          <div
            ref={scene3Ref}
            className="absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-6 w-[calc(100vw-32px)] max-w-sm sm:max-w-md bg-[#FFF9F1] text-[#30201B] border border-[#E2D3C0] rounded-2xl p-4 xs:p-6 sm:p-8 shadow-2xl opacity-0"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4EBDD] border border-[#E2D3C0] text-[10px] uppercase tracking-wider text-[#641F29] mb-2.5 font-semibold font-mono">
              <Sparkles className="w-2.5 h-2.5 text-[#B8322A]" />
              <span>Act III • Plated for Sharing</span>
            </div>
            <h3 className="font-serif text-lg xs:text-xl sm:text-2xl font-bold text-[#30201B] tracking-tight mb-1">
              Piled High for Sharing
            </h3>
            <p className="font-serif italic text-xs sm:text-sm text-[#862D35] mb-2.5">
              Mumbai's Most Ordered Chinese Starter
            </p>
            <p className="text-xs text-[#30201B]/80 font-normal leading-relaxed mb-3">
              Delivered sizzling hot to your table with our trademark generous portions. Perfectly paired with Crab Meat Soup or 5 Spice Special Pot Rice.
            </p>
            <div className="flex items-center gap-3 pt-2.5 border-t border-[#E2D3C0] text-xs text-[#30201B]/70">
              <span className="text-[#641F29] font-mono font-bold">03/03</span>
              <span>Destination: The Table Service Plate ↓</span>
            </div>
          </div>
        </div>

        {/* Scroll Progress Prompter */}
        <div className="text-center pb-5 relative z-20 flex items-center justify-center gap-2 text-xs text-[#E8D8C5] font-mono">
          <span className="w-2 h-2 rounded-full bg-[#B8322A] animate-pulse" />
          <span>Scroll down to land the dish onto the serving plate</span>
          <span className="text-[#B8322A]">↓</span>
        </div>
      </section>

      {/* 
        =======================================================
        PHASE C: FEATURED SIGNATURE LANDING SHOWCASE (Warm Ivory Theme #F4EBDD)
        =======================================================
      */}
      <section
        id="signatures"
        className="py-20 sm:py-24 px-4 sm:px-6 md:px-12 bg-[#F4EBDD] border-b border-[#E2D3C0] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8D8C5] border border-[#E2D3C0] text-[10px] tracking-[0.24em] uppercase text-[#641F29] mb-3 font-semibold font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#B8322A]" />
              <span>Signature Highlight Touchdown</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#30201B] tracking-tight leading-tight">
              Crispy Chilli Potatoes (₹395)
            </h2>
            <p className="text-xs sm:text-sm text-[#30201B]/80 mt-2.5 font-normal max-w-xl mx-auto leading-relaxed">
              The legendary starter that built our cult reputation across Mumbai. Wok-seared fresh to order at 5 Spice Sakinaka.
            </p>
          </div>

          {/* Landing Stage: Plate Pedestal + Dish Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: The Precise Landing Plate Target */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div
                id="food-landing-target"
                ref={landingTargetRef}
                className="relative w-full max-w-[270px] xs:max-w-[320px] sm:max-w-[380px] md:max-w-[440px] lg:max-w-[480px] xl:max-w-[500px] aspect-square flex items-center justify-center select-none"
              >
                {/* Refined Ceramic Plate Base */}
                <div className="absolute inset-0 rounded-full bg-[#E8D8C5]/80 border-2 border-[#E2D3C0] shadow-md flex items-center justify-center p-4">
                  <div className="w-full h-full rounded-full border border-[#E2D3C0] bg-[#F4EBDD] flex items-center justify-center" />
                </div>

                {/* Soft Warm Shockwave Touchdown Ring */}
                <div
                  ref={landingAuraRef}
                  className="absolute inset-0 rounded-full border-2 border-[#B8322A] opacity-0 pointer-events-none scale-90"
                />

                {/* Steam rising from freshly plated hot dish */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-10 w-44 h-32 pointer-events-none">
                  <CulinarySteam variant="subtle" intensity={0.3} />
                </div>

                {/* Docked Dish Cutout Image - Reveals only upon touchdown */}
                <img
                  ref={dockedFoodRef}
                  id="destination-bowl-image"
                  src="/images/crispy-chilli-potato-cutout.png"
                  alt="Plated Crispy Chilli Potatoes at 5 Spice Sakinaka"
                  className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_20px_36px_rgba(48,32,27,0.18)] transition-transform duration-500 hover:scale-105"
                  style={{ opacity: 0, visibility: 'hidden' }}
                />

                {/* Plate Badge */}
                <div className="absolute -bottom-3 z-20 px-3.5 py-1 rounded-full bg-[#FFF9F1] border border-[#E2D3C0] text-[9px] sm:text-[10px] uppercase tracking-wider text-[#30201B] flex items-center gap-1.5 shadow-sm font-semibold font-mono">
                  <Check className="w-3 h-3 text-[#B8322A]" />
                  <span>Sakinaka Specialty • Plated Fresh</span>
                </div>
              </div>
            </div>

            {/* Right: Plated Gastronomy Notes & Real Delivery / Reserve Actions */}
            <div
              ref={landingCardRef}
              className="lg:col-span-6 bg-[#FFF9F1] border border-[#E2D3C0] rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm space-y-5"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm border-2 border-emerald-600 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-[#641F29] font-semibold font-mono">
                      5 Spice Most Ordered Dish
                    </span>
                  </div>
                  <span className="font-mono text-xl sm:text-2xl text-[#641F29] font-bold">
                    ₹395
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#30201B] tracking-tight mb-1">
                  Crispy Chilli Potatoes
                </h3>

                <p className="font-serif italic text-sm sm:text-base text-[#862D35] mb-3">
                  Wok-Tossed with Scallions, Dried Red Chillies &amp; Honey Soy Glaze
                </p>

                <p className="text-xs sm:text-sm text-[#30201B]/80 font-normal leading-relaxed">
                  Generously portioned golden shredded potatoes, crisped twice in smoking woks, glazed in spicy Sichuan garlic sauce, tossed with toasted sesame seeds and fresh scallion curls. An indispensable tradition of every visit to 5 Spice Sakinaka.
                </p>
              </div>

              {/* Culinary Details */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#E2D3C0] text-xs">
                <div className="flex items-center gap-1.5 text-[#30201B]">
                  <Flame className="w-3.5 h-3.5 text-[#B8322A]" />
                  <span>Spice: Medium-Hot (2/3)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#30201B]">
                  <Utensils className="w-3.5 h-3.5 text-[#B8322A]" />
                  <span>Portion: Serves 2–3</span>
                </div>
              </div>

              {/* Real Ordering & Inquiry Actions */}
              <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
                <Link
                  to="/menu"
                  className="w-full sm:w-auto sm:flex-1 min-h-[44px] py-3 px-5 bg-[#B8322A] hover:bg-[#862D35] text-white font-semibold text-xs tracking-[0.16em] uppercase rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
                >
                  <Utensils className="w-3.5 h-3.5 text-white" />
                  <span>Full Digital Menu (₹)</span>
                </Link>

                <button
                  onClick={onOpenReservation}
                  className="w-full sm:w-auto min-h-[44px] py-3 px-5 bg-[#FFF9F1] hover:bg-[#E8D8C5] text-[#30201B] font-semibold text-xs tracking-[0.16em] uppercase rounded-lg border border-[#E2D3C0] hover:border-[#641F29] transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#B8322A]" />
                  <span>Table Inquiry</span>
                </button>

                <div className="w-full sm:w-auto grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-3">
                  <a
                    href={RESTAURANT_INFO.externalLinks.zomato}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] py-2.5 px-3.5 bg-[#FFF9F1] hover:bg-[#E8D8C5] border border-[#E2D3C0] hover:border-[#641F29] text-[#30201B] rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span className="text-[#e23744]">Zomato</span>
                    <ExternalLink className="w-3 h-3 text-[#30201B]/60" />
                  </a>

                  <a
                    href={RESTAURANT_INFO.externalLinks.swiggy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] py-2.5 px-3.5 bg-[#FFF9F1] hover:bg-[#E8D8C5] border border-[#E2D3C0] hover:border-[#641F29] text-[#302321] rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span className="text-[#fc8019]">Swiggy</span>
                    <ExternalLink className="w-3 h-3 text-[#30201B]/60" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
