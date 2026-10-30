import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Configure smooth default ease and timing for luxury feel
  gsap.defaults({
    ease: 'power3.out',
    duration: 1.1,
  });

  // Global ScrollTrigger defaults
  ScrollTrigger.config({
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
    ignoreMobileResize: true,
  });
}

/**
 * Checks whether user prefers reduced motion for accessibility compliance.
 */
export const isReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Checks if current viewport is a mobile screen (< 768px).
 */
export const isMobileViewport = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

/**
 * Safely refreshes all ScrollTriggers after route transitions or dynamic content loads.
 */
export const refreshScrollTriggers = (): void => {
  if (typeof window !== 'undefined') {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }
};

/**
 * Clean up all active ScrollTriggers (useful during route change unmounts).
 */
export const cleanScrollTriggers = (): void => {
  if (typeof window !== 'undefined') {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
};

export { gsap, ScrollTrigger };

