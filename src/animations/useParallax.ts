import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, isReducedMotion, isMobileViewport } from './gsap-config';

export interface UseParallaxOptions {
  speed?: number; // e.g. -30 for upward float, 30 for downward
  targetSelector?: string; // specific element to shift within container
  start?: string;
  end?: string;
}

/**
 * Custom hook for smooth parallax scrolling on desktop.
 * Gracefully disables on mobile and reduced-motion environments.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: UseParallaxOptions = {}
) {
  const containerRef = useRef<T>(null);
  const {
    speed = -40,
    targetSelector,
    start = 'top bottom',
    end = 'bottom top',
  } = options;

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      // Disable parallax on mobile or if reduced motion is requested
      if (isReducedMotion() || isMobileViewport()) {
        return;
      }

      const target = targetSelector
        ? el.querySelector<HTMLElement>(targetSelector)
        : el;

      if (!target) return;

      gsap.fromTo(
        target,
        { y: -speed / 2 },
        {
          y: speed / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [speed] }
  );

  return containerRef;
}

