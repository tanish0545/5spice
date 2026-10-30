import { useRef, useEffect, type RefObject } from 'react';
import { gsap, isReducedMotion } from '../animations/gsap-config';

/**
 * Magnetic button hook — on hover within a 70px proximity radius,
 * subtly pulls the button toward the cursor for a luxurious tactile feel.
 * Automatically disabled on touch devices and reduced-motion environments.
 *
 * @param strength - How much the element follows the cursor (0–1). Default: 0.28
 * @returns ref to attach to the button element
 */
export function useMagneticButton<T extends HTMLElement>(
  strength = 0.28
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Disable on touch devices and for reduced-motion users
    if ('ontouchstart' in window || isReducedMotion()) return;

    const PROXIMITY = 70; // px — detection radius beyond element boundary

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const threshold = rect.width / 2 + PROXIMITY;

      if (dist < threshold) {
        const factor = (1 - dist / threshold) * strength;
        gsap.to(el, {
          x: dx * factor,
          y: dy * factor,
          duration: 0.35,
          ease: 'power2.out',
        });
      } else {
        gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.4)' });
      }
    };

    const onMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.4)' });
    };

    window.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return ref;
}

