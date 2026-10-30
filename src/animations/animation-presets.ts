import { gsap, isReducedMotion } from './gsap-config';

export interface BaseAnimationOptions {
  trigger?: gsap.DOMTarget;
  start?: string;
  end?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  scrub?: boolean | number;
  once?: boolean;
}

/**
 * Fade up animation preset
 */
export const fadeUpPreset = (
  target: gsap.DOMTarget,
  options: BaseAnimationOptions = {}
): gsap.core.Tween | null => {
  if (!target) return null;
  if (isReducedMotion()) {
    return gsap.to(target, { opacity: 1, y: 0, duration: 0.1 });
  }

  const {
    trigger = target,
    start = 'top 85%',
    delay = 0,
    duration = 1.1,
    once = true,
  } = options;

  gsap.set(target, { opacity: 0, y: 35 });

  return gsap.to(target, {
    opacity: 1,
    y: 0,
    duration,
    delay,
    ease: 'power3.out',
    scrollTrigger: {
      trigger,
      start,
      once,
      toggleActions: once ? 'play none none none' : 'play reverse play reverse',
    },
  });
};

/**
 * Fade from left animation preset
 */
export const fadeFromLeftPreset = (
  target: gsap.DOMTarget,
  options: BaseAnimationOptions = {}
): gsap.core.Tween | null => {
  if (!target) return null;
  if (isReducedMotion()) {
    return gsap.to(target, { opacity: 1, x: 0, duration: 0.1 });
  }

  const {
    trigger = target,
    start = 'top 85%',
    delay = 0,
    duration = 1.1,
    once = true,
  } = options;

  gsap.set(target, { opacity: 0, x: -40 });

  return gsap.to(target, {
    opacity: 1,
    x: 0,
    duration,
    delay,
    ease: 'power3.out',
    scrollTrigger: {
      trigger,
      start,
      once,
      toggleActions: once ? 'play none none none' : 'play reverse play reverse',
    },
  });
};

/**
 * Fade from right animation preset
 */
export const fadeFromRightPreset = (
  target: gsap.DOMTarget,
  options: BaseAnimationOptions = {}
): gsap.core.Tween | null => {
  if (!target) return null;
  if (isReducedMotion()) {
    return gsap.to(target, { opacity: 1, x: 0, duration: 0.1 });
  }

  const {
    trigger = target,
    start = 'top 85%',
    delay = 0,
    duration = 1.1,
    once = true,
  } = options;

  gsap.set(target, { opacity: 0, x: 40 });

  return gsap.to(target, {
    opacity: 1,
    x: 0,
    duration,
    delay,
    ease: 'power3.out',
    scrollTrigger: {
      trigger,
      start,
      once,
      toggleActions: once ? 'play none none none' : 'play reverse play reverse',
    },
  });
};

/**
 * Staggered children reveal
 */
export const staggerChildrenPreset = (
  container: gsap.DOMTarget,
  childSelector: string,
  options: BaseAnimationOptions = {}
): gsap.core.Tween | null => {
  if (!container) return null;
  if (isReducedMotion()) {
    return gsap.to(`${container} ${childSelector}`, { opacity: 1, y: 0, duration: 0.1 });
  }

  const {
    start = 'top 82%',
    delay = 0.1,
    duration = 0.95,
    stagger = 0.14,
    once = true,
  } = options;

  const elements = typeof container === 'string' 
    ? `${container} ${childSelector}` 
    : (container as HTMLElement).querySelectorAll(childSelector);

  if (!elements || (elements instanceof NodeList && elements.length === 0)) return null;

  gsap.set(elements, { opacity: 0, y: 30 });

  return gsap.to(elements, {
    opacity: 1,
    y: 0,
    duration,
    delay,
    stagger,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: container,
      start,
      once,
      toggleActions: once ? 'play none none none' : 'play reverse play reverse',
    },
  });
};

/**
 * Subtle scale reveal
 */
export const subtleScalePreset = (
  target: gsap.DOMTarget,
  options: BaseAnimationOptions = {}
): gsap.core.Tween | null => {
  if (!target) return null;
  if (isReducedMotion()) {
    return gsap.to(target, { opacity: 1, scale: 1, duration: 0.1 });
  }

  const {
    trigger = target,
    start = 'top 85%',
    delay = 0,
    duration = 1.2,
    once = true,
  } = options;

  gsap.set(target, { opacity: 0, scale: 0.94 });

  return gsap.to(target, {
    opacity: 1,
    scale: 1,
    duration,
    delay,
    ease: 'power3.out',
    scrollTrigger: {
      trigger,
      start,
      once,
    },
  });
};

/**
 * Premium editorial image reveal with clip-path & subtle scale down
 */
export const imageRevealPreset = (
  container: HTMLElement | null,
  imageEl?: HTMLElement | null,
  options: BaseAnimationOptions = {}
): gsap.core.Timeline | null => {
  if (!container) return null;
  if (isReducedMotion()) {
    gsap.set(container, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' });
    if (imageEl) gsap.set(imageEl, { scale: 1, opacity: 1 });
    return null;
  }

  const {
    start = 'top 80%',
    delay = 0,
    duration = 1.3,
    once = true,
  } = options;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start,
      once,
    },
    delay,
  });

  // Reveal clip path from bottom to top
  tl.fromTo(
    container,
    { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', opacity: 0.7 },
    {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      opacity: 1,
      duration,
      ease: 'power4.inOut',
    }
  );

  if (imageEl) {
    tl.fromTo(
      imageEl,
      { scale: 1.15 },
      { scale: 1.0, duration: duration * 1.2, ease: 'power3.out' },
      0
    );
  }

  return tl;
};

/**
 * Editorial text line reveal (wraps text lines in an overflow-hidden mask)
 */
export const textLineRevealPreset = (
  lines: gsap.DOMTarget,
  options: BaseAnimationOptions = {}
): gsap.core.Tween | null => {
  if (!lines) return null;
  if (isReducedMotion()) {
    return gsap.to(lines, { y: '0%', opacity: 1, duration: 0.1 });
  }

  const {
    trigger = lines,
    start = 'top 85%',
    delay = 0.1,
    duration = 1.1,
    stagger = 0.1,
    once = true,
  } = options;

  gsap.set(lines, { y: '105%', opacity: 0 });

  return gsap.to(lines, {
    y: '0%',
    opacity: 1,
    duration,
    delay,
    stagger,
    ease: 'power4.out',
    scrollTrigger: {
      trigger,
      start,
      once,
    },
  });
};

/**
 * Fine champagne gold divider animation (scales horizontal line from left to right)
 */
export const goldDividerPreset = (
  divider: gsap.DOMTarget,
  options: BaseAnimationOptions = {}
): gsap.core.Tween | null => {
  if (!divider) return null;
  if (isReducedMotion()) {
    return gsap.to(divider, { scaleX: 1, opacity: 1, duration: 0.1 });
  }

  const {
    trigger = divider,
    start = 'top 85%',
    delay = 0.1,
    duration = 1.0,
    once = true,
  } = options;

  gsap.set(divider, { scaleX: 0, transformOrigin: 'left center', opacity: 0.4 });

  return gsap.to(divider, {
    scaleX: 1,
    opacity: 1,
    duration,
    delay,
    ease: 'power3.inOut',
    scrollTrigger: {
      trigger,
      start,
      once,
    },
  });
};

