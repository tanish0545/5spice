import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { RotateCcw, Sparkles } from 'lucide-react';
import { gsap, isReducedMotion } from '../../animations/gsap-config';
import { RealisticFoodSteam } from '../effects/RealisticFoodSteam';

interface CoastalChilliPrawnsAssemblyProps {
  className?: string;
}

export const CoastalChilliPrawnsAssembly: React.FC<CoastalChilliPrawnsAssemblyProps> = ({
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLImageElement>(null);
  const prawnTopRef = useRef<HTMLImageElement>(null);
  const prawnBottomRef = useRef<HTMLImageElement>(null);
  const limeTopRef = useRef<HTMLImageElement>(null);
  const limeLeftRef = useRef<HTMLImageElement>(null);
  const limeBottomRef = useRef<HTMLImageElement>(null);
  const limeRightRef = useRef<HTMLImageElement>(null);
  const herbsRef = useRef<HTMLImageElement>(null);
  const steamRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [isAssembled, setIsAssembled] = useState(false);

  useGSAP(
    () => {
      if (isReducedMotion()) {
        gsap.set(
          [
            prawnTopRef.current,
            prawnBottomRef.current,
            limeTopRef.current,
            limeLeftRef.current,
            limeBottomRef.current,
            limeRightRef.current,
            herbsRef.current,
            steamRef.current,
          ],
          { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0 }
        );
        setIsAssembled(true);
        return;
      }

      // Initial state: Only pristine empty ceramic plate is visible
      gsap.set(prawnTopRef.current, {
        y: -360,
        x: -25,
        rotation: -22,
        scale: 1.16,
        opacity: 0,
      });

      gsap.set(prawnBottomRef.current, {
        y: -400,
        x: 35,
        rotation: 26,
        scale: 1.18,
        opacity: 0,
      });

      gsap.set(limeTopRef.current, {
        y: -80,
        x: -40,
        rotation: -18,
        scale: 0.5,
        opacity: 0,
      });

      gsap.set(limeLeftRef.current, {
        y: 20,
        x: -90,
        rotation: 24,
        scale: 0.5,
        opacity: 0,
      });

      gsap.set(limeBottomRef.current, {
        y: 90,
        x: 20,
        rotation: -14,
        scale: 0.5,
        opacity: 0,
      });

      gsap.set(limeRightRef.current, {
        y: -30,
        x: 80,
        rotation: 18,
        scale: 0.5,
        opacity: 0,
      });

      gsap.set(herbsRef.current, {
        y: -120,
        x: 20,
        rotation: 16,
        scale: 0.7,
        opacity: 0,
      });

      if (steamRef.current) gsap.set(steamRef.current, { opacity: 0 });
      if (sheenRef.current) gsap.set(sheenRef.current, { opacity: 0 });

      // Master Assembly Timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          once: true,
        },
        defaults: { ease: 'power2.out' },
        onComplete: () => setIsAssembled(true),
      });

      timelineRef.current = tl;

      // 1. First Prawn Descends (Gravity + Impact)
      tl.to(
        prawnTopRef.current,
        {
          opacity: 1,
          duration: 0.25,
        },
        0.3
      );
      tl.to(
        prawnTopRef.current,
        {
          y: 0,
          x: 0,
          rotation: 0,
          scale: 1,
          duration: 0.75,
          ease: 'power3.in',
        },
        0.3
      );
      // Subtle impact cushion
      tl.to(
        prawnTopRef.current,
        {
          y: -6,
          scale: 1.02,
          duration: 0.16,
          ease: 'power1.out',
        },
        1.05
      );
      tl.to(
        prawnTopRef.current,
        {
          y: 0,
          scale: 1,
          duration: 0.25,
          ease: 'bounce.out',
        },
        1.21
      );

      // 2. Second Prawn Descends (Staggered Natural Drop)
      tl.to(
        prawnBottomRef.current,
        {
          opacity: 1,
          duration: 0.25,
        },
        0.75
      );
      tl.to(
        prawnBottomRef.current,
        {
          y: 0,
          x: 0,
          rotation: 0,
          scale: 1,
          duration: 0.78,
          ease: 'power3.in',
        },
        0.75
      );
      // Settle into place
      tl.to(
        prawnBottomRef.current,
        {
          y: -4,
          scale: 1.02,
          duration: 0.15,
          ease: 'power1.out',
        },
        1.53
      );
      tl.to(
        prawnBottomRef.current,
        {
          y: 0,
          scale: 1,
          duration: 0.22,
          ease: 'bounce.out',
        },
        1.68
      );

      // 3. Lime Slices Land into 4 Quadrants
      const limes = [
        limeTopRef.current,
        limeLeftRef.current,
        limeBottomRef.current,
        limeRightRef.current,
      ];
      tl.to(
        limes,
        {
          opacity: 1,
          y: 0,
          x: 0,
          rotation: 0,
          scale: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: 'back.out(1.8)',
        },
        1.75
      );

      // 4. Fresh Herbs (Mint / Coriander) Aerodynamic Flutter Down
      tl.to(
        herbsRef.current,
        {
          opacity: 1,
          duration: 0.25,
        },
        2.1
      );
      tl.to(
        herbsRef.current,
        {
          y: 0,
          x: 0,
          rotation: 0,
          scale: 1,
          duration: 0.65,
          ease: 'power2.out',
        },
        2.1
      );

      // 5. Plated Sizzle Glaze Sheen & Hot Convective Steam
      if (sheenRef.current) {
        tl.fromTo(
          sheenRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 0.65, scale: 1, duration: 0.7, ease: 'power2.out' },
          2.5
        );
        tl.to(sheenRef.current, { opacity: 0.2, duration: 1.2 }, 3.2);
      }

      if (steamRef.current) {
        tl.to(
          steamRef.current,
          {
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
          },
          2.6
        );
      }
    },
    { scope: containerRef }
  );

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (timelineRef.current) {
      timelineRef.current.restart();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[480px] md:max-w-[520px] aspect-square flex items-center justify-center select-none ${className}`}
      style={{ perspective: '1100px' }}
    >
      {/* Warm Ambient Softbox Backlight */}
      <div
        className="absolute inset-0 pointer-events-none rounded-full bg-[radial-gradient(circle_at_50%_48%,_rgba(184,50,42,0.24)_0%,_rgba(183,123,74,0.12)_38%,_transparent_72%)] blur-2xl"
        aria-hidden="true"
      />

      {/* Layer 0: Pristine Matte Dark Ceramic Tableware Plate */}
      <img
        ref={plateRef}
        src="/images/prawns/empty_plate_1024.webp"
        alt="Empty Dark Ceramic Restaurant Plate"
        className="absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_24px_48px_rgba(0,0,0,0.65)] will-change-transform z-10"
        loading="lazy"
      />

      {/* Layer 1: Top Sizzling Tiger Prawn */}
      <img
        ref={prawnTopRef}
        src="/images/prawns/prawn_top.webp"
        alt="Wok-Seared Tiger Prawn Head & Tail"
        className="absolute object-contain pointer-events-none z-20 will-change-transform filter drop-shadow-[0_12px_18px_rgba(0,0,0,0.55)]"
        style={{
          left: '26.38%',
          top: '7.83%',
          width: '52.57%',
          height: 'auto',
        }}
        loading="lazy"
      />

      {/* Layer 2: Bottom Curled Coastal Prawn */}
      <img
        ref={prawnBottomRef}
        src="/images/prawns/prawn_bottom.webp"
        alt="Crispy Curled Chili Garlic Prawn"
        className="absolute object-contain pointer-events-none z-20 will-change-transform filter drop-shadow-[0_14px_22px_rgba(0,0,0,0.6)]"
        style={{
          left: '32.96%',
          top: '44.74%',
          width: '39.41%',
          height: 'auto',
        }}
        loading="lazy"
      />

      {/* Layer 3A: Top Lime Wedge */}
      <img
        ref={limeTopRef}
        src="/images/prawns/lime_slice_top.webp"
        alt="Fresh Cut Lime Slice"
        className="absolute object-contain pointer-events-none z-30 will-change-transform filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.45)]"
        style={{
          left: '31.97%',
          top: '11.05%',
          width: '23.88%',
          height: 'auto',
        }}
        loading="lazy"
      />

      {/* Layer 3B: Left Lime Wedge */}
      <img
        ref={limeLeftRef}
        src="/images/prawns/lime_slice_left.webp"
        alt="Fresh Cut Lime Slice"
        className="absolute object-contain pointer-events-none z-30 will-change-transform filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.45)]"
        style={{
          left: '16.38%',
          top: '43.36%',
          width: '29.74%',
          height: 'auto',
        }}
        loading="lazy"
      />

      {/* Layer 3C: Bottom Lime Wedge */}
      <img
        ref={limeBottomRef}
        src="/images/prawns/lime_slice_bottom.webp"
        alt="Fresh Cut Lime Slice"
        className="absolute object-contain pointer-events-none z-30 will-change-transform filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.45)]"
        style={{
          left: '29.54%',
          top: '59.14%',
          width: '25.53%',
          height: 'auto',
        }}
        loading="lazy"
      />

      {/* Layer 3D: Right Lime Wedge */}
      <img
        ref={limeRightRef}
        src="/images/prawns/lime_slice_right.webp"
        alt="Fresh Cut Lime Slice"
        className="absolute object-contain pointer-events-none z-30 will-change-transform filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.45)]"
        style={{
          left: '59.14%',
          top: '44.67%',
          width: '18.62%',
          height: 'auto',
        }}
        loading="lazy"
      />

      {/* Layer 4: Fresh Green Herbs (Coriander / Mint) */}
      <img
        ref={herbsRef}
        src="/images/prawns/garnish_herbs.webp"
        alt="Fresh Plated Herbs Garnish"
        className="absolute object-contain pointer-events-none z-30 will-change-transform filter drop-shadow-[0_10px_16px_rgba(0,0,0,0.5)]"
        style={{
          left: '66.32%',
          top: '34.08%',
          width: '25.07%',
          height: 'auto',
        }}
        loading="lazy"
      />

      {/* Layer 5: Sizzling Glaze Catchlight Flash */}
      <div
        ref={sheenRef}
        className="absolute inset-8 rounded-full pointer-events-none z-40 bg-[radial-gradient(circle_at_50%_45%,_rgba(255,245,230,0.35)_0%,_rgba(184,50,42,0.15)_40%,_transparent_70%)] mix-blend-screen"
        aria-hidden="true"
      />

      {/* Layer 6: Realistic Culinary Steam Rising from Fresh Hot Wok Seafood */}
      <div
        ref={steamRef}
        className="absolute -top-10 sm:-top-16 left-1/2 -translate-x-1/2 w-48 sm:w-56 h-36 sm:h-44 pointer-events-none z-50"
      >
        <RealisticFoodSteam intensity={0.5} />
      </div>

      {/* Interactive Plating Assembly Badge / Replay Action */}
      <div className="absolute bottom-2 right-2 z-50">
        <button
          onClick={handleReplay}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#17110F]/90 hover:bg-[#17110F] border border-[#B77B4A]/40 text-[10px] text-[#E8D8C5] hover:text-[#FFF9F1] font-mono uppercase tracking-wider backdrop-blur-md shadow-lg transition-all group active:scale-95"
          title="Replay Plating Assembly Animation"
        >
          {isAssembled ? (
            <>
              <RotateCcw className="w-3 h-3 text-[#B8322A] group-hover:-rotate-90 transition-transform" />
              <span>Replay Plating</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3 h-3 text-[#B77B4A] animate-spin" />
              <span>Plating in progress</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

