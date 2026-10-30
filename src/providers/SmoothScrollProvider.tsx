import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  initSmoothScroll,
  destroySmoothScroll,
  getLenis,
  stopLenis,
  startLenis,
  scrollTo,
} from '../animations/smooth-scroll';
import { refreshScrollTriggers } from '../animations/gsap-config';
import { SmoothScrollContext } from '../hooks/useSmoothScroll';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const { pathname } = useLocation();

  // 1. Initialize Lenis once on mount
  useEffect(() => {
    initSmoothScroll();

    // Intercept in-page hash anchor clicks for smooth Lenis scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const destination = document.querySelector(href);
        if (destination) {
          e.preventDefault();
          scrollTo(destination as HTMLElement, { offset: -80 });
          // Update URL hash without jumping
          window.history.pushState(null, '', href);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick, { passive: false });

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      destroySmoothScroll();
    };
  }, []);

  // 2. On route change, scroll to top immediately & refresh ScrollTrigger
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    const timer = setTimeout(() => {
      refreshScrollTriggers();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <SmoothScrollContext.Provider
      value={{
        lenis: getLenis(),
        scrollTo,
        stopLenis,
        startLenis,
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
};
