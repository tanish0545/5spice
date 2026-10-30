import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import {
  fadeUpPreset,
  fadeFromLeftPreset,
  fadeFromRightPreset,
  staggerChildrenPreset,
  subtleScalePreset,
  imageRevealPreset,
  textLineRevealPreset,
  goldDividerPreset,
  type BaseAnimationOptions,
} from './animation-presets';

export type RevealType =
  | 'fadeUp'
  | 'fadeFromLeft'
  | 'fadeFromRight'
  | 'stagger'
  | 'scale'
  | 'image'
  | 'textLine'
  | 'divider';

export interface UseRevealOptions extends BaseAnimationOptions {
  type?: RevealType;
  childSelector?: string;
  imageSelector?: string;
}

/**
 * Custom hook for smooth scroll-triggered reveals with GSAP & ScrollTrigger.
 * Uses useGSAP for automatic cleanup and scoped context.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {}
) {
  const containerRef = useRef<T>(null);
  const {
    type = 'fadeUp',
    childSelector = '.reveal-item',
    imageSelector = 'img',
    ...animOptions
  } = options;

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      switch (type) {
        case 'fadeUp':
          fadeUpPreset(el, animOptions);
          break;
        case 'fadeFromLeft':
          fadeFromLeftPreset(el, animOptions);
          break;
        case 'fadeFromRight':
          fadeFromRightPreset(el, animOptions);
          break;
        case 'stagger':
          staggerChildrenPreset(el, childSelector, animOptions);
          break;
        case 'scale':
          subtleScalePreset(el, animOptions);
          break;
        case 'image': {
          const imgEl = el.querySelector<HTMLElement>(imageSelector);
          imageRevealPreset(el, imgEl, animOptions);
          break;
        }
        case 'textLine': {
          const lines = el.querySelectorAll<HTMLElement>(childSelector || '.line');
          textLineRevealPreset(lines.length > 0 ? lines : el, animOptions);
          break;
        }
        case 'divider':
          goldDividerPreset(el, animOptions);
          break;
      }
    },
    { scope: containerRef, dependencies: [type] }
  );

  return containerRef;
}
