import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, isReducedMotion } from './gsap-config';

export interface PinnedStoryStep {
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  image: string;
  metric: string;
}

export interface UsePinnedSectionOptions {
  stepsCount: number;
  scrollDistanceMultiplier?: number;
}

/**
 * Hook for a cinematic pinned storytelling section.
 * Smoothly synchronizes visual changes with user scroll on desktop,
 * and falls back to a clean, non-pinned layout on mobile and reduced motion.
 */
export function usePinnedSection(options: UsePinnedSectionOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const { stepsCount, scrollDistanceMultiplier = 1.0 } = options;

  useGSAP(
    () => {
      const container = containerRef.current;
      const pinWrapper = pinWrapperRef.current;
      if (!container || !pinWrapper) return;

      // On mobile or reduced motion, skip pinning
      const isMobile = window.innerWidth < 1024;
      if (isMobile || isReducedMotion()) {
        return;
      }

      // Calculate scroll duration proportional to steps
      const scrollDistance = Math.max(1200, (stepsCount - 1) * 700 * scrollDistanceMultiplier);

      const panels = pinWrapper.querySelectorAll<HTMLElement>('.story-panel');
      const indicators = pinWrapper.querySelectorAll<HTMLElement>('.story-indicator');
      const textContents = pinWrapper.querySelectorAll<HTMLElement>('.story-text-content');

      if (panels.length <= 1) return;

      // Create master scrub timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: pinWrapper,
          scrub: 1.0,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate transitions between steps
      panels.forEach((panel, i) => {
        if (i === 0) return; // First panel is already active

        const prevPanel = panels[i - 1];
        const stepPosition = i;

        // Fade & transition panel
        tl.to(
          prevPanel,
          {
            opacity: 0,
            scale: 0.96,
            duration: 0.8,
            ease: 'power2.inOut',
          },
          stepPosition
        );

        tl.fromTo(
          panel,
          {
            opacity: 0,
            scale: 1.06,
          },
          {
            opacity: 1,
            scale: 1.0,
            duration: 0.8,
            ease: 'power2.out',
          },
          stepPosition
        );

        // Transition text
        if (textContents[i - 1] && textContents[i]) {
          tl.to(
            textContents[i - 1],
            { opacity: 0, y: -20, duration: 0.5 },
            stepPosition
          );
          tl.fromTo(
            textContents[i],
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.6 },
            stepPosition + 0.2
          );
        }

        // Active indicator dot
        if (indicators[i]) {
          tl.to(
            indicators[i - 1],
            { width: '8px', backgroundColor: 'rgba(48,35,33,0.2)', duration: 0.4 },
            stepPosition
          );
          tl.to(
            indicators[i],
            { width: '28px', backgroundColor: '#722B32', duration: 0.4 },
            stepPosition
          );
        }
      });

      // Refresh measurements after all assets are loaded
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);

      return () => clearTimeout(timer);
    },
    { scope: containerRef, dependencies: [stepsCount, scrollDistanceMultiplier] }
  );

  return { containerRef, pinWrapperRef };
}

