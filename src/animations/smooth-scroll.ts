import Lenis from 'lenis';
import { gsap, ScrollTrigger, isReducedMotion } from './gsap-config';
import 'lenis/dist/lenis.css';

let lenisInstance: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;
let isStopped = false;

/**
 * Initializes the centralized Lenis smooth scroll controller.
 * Binds seamlessly to GSAP's ticker to avoid competing requestAnimationFrame loops.
 */
export function initSmoothScroll(): Lenis | null {
  if (typeof window === 'undefined') return null;

  // Respect user preference for reduced motion
  if (isReducedMotion()) {
    if (lenisInstance) {
      destroySmoothScroll();
    }
    return null;
  }

  // If instance already exists and is active, return it
  if (lenisInstance) {
    return lenisInstance;
  }

  try {
    lenisInstance = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.25,
      infinite: false,
      autoRaf: false, // We drive raf via GSAP ticker
    });

    // 1. Sync Lenis scroll events to GSAP ScrollTrigger
    lenisInstance.on('scroll', () => {
      ScrollTrigger.update();
    });

    // 2. Drive Lenis through GSAP ticker for a single unified animation loop
    tickerCallback = (time: number) => {
      if (lenisInstance && !isStopped) {
        lenisInstance.raf(time * 1000);
      }
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // 3. Make sure ScrollTrigger knows about Lenis scroll position
    ScrollTrigger.refresh();

    return lenisInstance;
  } catch (err) {
    console.warn('Failed to initialize Lenis smooth scroll:', err);
    return null;
  }
}

/**
 * Retrieves the active Lenis instance.
 */
export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Temporarily pause smooth scroll (e.g. when mobile nav drawer or reservation modal is open).
 */
export function stopLenis(): void {
  isStopped = true;
  if (lenisInstance) {
    lenisInstance.stop();
  }
}

/**
 * Resume smooth scroll (e.g. after closing modal or drawer).
 */
export function startLenis(): void {
  isStopped = false;
  if (lenisInstance) {
    lenisInstance.start();
  }
}

/**
 * Smoothly scrolls to a target element or position with an optional offset.
 */
export function scrollTo(
  target: string | HTMLElement | number,
  options?: {
    offset?: number;
    duration?: number;
    immediate?: boolean;
    onComplete?: () => void;
  }
): void {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: options?.offset ?? 0,
      duration: options?.duration ?? 1.1,
      immediate: options?.immediate ?? false,
      onComplete: options?.onComplete,
    });
  } else {
    // Fallback for native scrolling
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: options?.immediate ? 'auto' : 'smooth' });
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY + (options?.offset ?? 0);
        window.scrollTo({ top, behavior: options?.immediate ? 'auto' : 'smooth' });
      }
    }
    options?.onComplete?.();
  }
}

/**
 * Cleans up Lenis instance and unbinds from GSAP ticker.
 */
export function destroySmoothScroll(): void {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
  isStopped = false;
}

