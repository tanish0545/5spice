import React, { useEffect, useRef } from 'react';
import { gsap, isReducedMotion } from '../../animations/gsap-config';

/**
 * Luxury subtle cursor micro-interaction for desktop.
 * - Displays a refined inner dot and a trailing aura ring.
 * - Reacts to clickable elements (links, buttons, interactive cards) with smooth scale.
 * - Automatically completely disabled on touch devices and for reduced-motion users.
 */
export const LuxuryCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for touch / pointer coarse / reduced motion
    if (
      typeof window === 'undefined' ||
      'ontouchstart' in window ||
      window.matchMedia('(pointer: coarse)').matches ||
      isReducedMotion()
    ) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Fast setters for 60fps / 120fps smooth performance
    const setDotX = gsap.quickSetter(dot, 'x', 'px');
    const setDotY = gsap.quickSetter(dot, 'y', 'px');
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.22, ease: 'power2.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.22, ease: 'power2.out' });

    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        isVisible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
      }

      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
    };

    const onMouseEnterInteractive = () => {
      gsap.to(ring, {
        scale: 1.6,
        borderColor: '#B8322A',
        backgroundColor: 'rgba(184, 50, 42, 0.08)',
        duration: 0.25,
      });
      gsap.to(dot, {
        scale: 0.5,
        backgroundColor: '#B8322A',
        duration: 0.2,
      });
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: '#B77B4A',
        backgroundColor: 'transparent',
        duration: 0.3,
      });
      gsap.to(dot, {
        scale: 1,
        backgroundColor: '#B77B4A',
        duration: 0.2,
      });
    };

    const onMouseLeaveDoc = () => {
      isVisible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
    };

    // Attach listeners
    window.addEventListener('mousemove', onMouseMove);
    document.documentElement.addEventListener('mouseleave', onMouseLeaveDoc);

    // Interactive target detection via delegated event
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          'a, button, [role="button"], input, select, textarea, .cursor-pointer, .gallery-card, .menu-dish-card'
        )
      ) {
        onMouseEnterInteractive();
      } else {
        onMouseLeaveInteractive();
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseleave', onMouseLeaveDoc);
      window.removeEventListener('mouseover', handleMouseOver);
      gsap.killTweensOf([dot, ring]);
    };
  }, []);

  return (
    <div className="hidden md:block pointer-events-none select-none fixed inset-0 z-[9999]" aria-hidden="true">
      {/* Outer subtle following ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-[#B77B4A]/60 opacity-0 transition-opacity will-change-transform"
      />
      {/* Inner precise dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-[#B77B4A] opacity-0 transition-opacity will-change-transform shadow-[0_0_8px_rgba(183,123,74,0.6)]"
      />
    </div>
  );
};

