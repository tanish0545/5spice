import { createContext, useContext } from 'react';
import Lenis from 'lenis';
import {
  scrollTo,
  stopLenis,
  startLenis,
} from '../animations/smooth-scroll';

export interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: typeof scrollTo;
  stopLenis: typeof stopLenis;
  startLenis: typeof startLenis;
}

export const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo,
  stopLenis,
  startLenis,
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

