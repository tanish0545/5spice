import { useRef, useImperativeHandle, forwardRef } from 'react';
import { gsap, isReducedMotion } from '../../animations/gsap-config';

export interface PhotographicOrbitHandle {
  startOrbit: () => void;
  reset: () => void;
}

interface IngredientDef {
  id: string;
  name: string;
  src: string;
  targetAngleDeg: number; // Final angle around the center (degrees)
  sweepDeg: number;       // How many degrees it sweeps through during orbit
  targetRadiusDesktop: number; // px from center
  targetRadiusMobile: number;
  widthDesktop: number;
  widthMobile: number;
  finalRotation: number;
  depthScale: number;     // for subtle 3D depth
  shadow: string;
}

const INGREDIENTS: IngredientDef[] = [
  {
    id: 'red-chilli',
    name: 'Sichuan Red Chilli',
    src: '/images/ingredients/red-chilli.png',
    targetAngleDeg: -38,
    sweepDeg: 210,
    targetRadiusDesktop: 228,
    targetRadiusMobile: 155,
    widthDesktop: 74,
    widthMobile: 52,
    finalRotation: 24,
    depthScale: 1.05,
    shadow: 'drop-shadow(0 14px 18px rgba(0,0,0,0.55))',
  },
  {
    id: 'green-chilli',
    name: 'Fresh Green Chilli',
    src: '/images/ingredients/green-chilli.png',
    targetAngleDeg: 145,
    sweepDeg: 230,
    targetRadiusDesktop: 232,
    targetRadiusMobile: 158,
    widthDesktop: 72,
    widthMobile: 50,
    finalRotation: -18,
    depthScale: 0.96,
    shadow: 'drop-shadow(0 12px 16px rgba(0,0,0,0.5))',
  },
  {
    id: 'garlic-clove',
    name: 'Peeled Garlic Clove',
    src: '/images/ingredients/garlic-clove.png',
    targetAngleDeg: -132,
    sweepDeg: 190,
    targetRadiusDesktop: 216,
    targetRadiusMobile: 146,
    widthDesktop: 52,
    widthMobile: 38,
    finalRotation: -22,
    depthScale: 1.02,
    shadow: 'drop-shadow(0 10px 14px rgba(0,0,0,0.45))',
  },
  {
    id: 'ginger-slice',
    name: 'Sliced Ginger Root',
    src: '/images/ingredients/ginger-slice.png',
    targetAngleDeg: 48,
    sweepDeg: 220,
    targetRadiusDesktop: 222,
    targetRadiusMobile: 150,
    widthDesktop: 62,
    widthMobile: 44,
    finalRotation: 18,
    depthScale: 0.98,
    shadow: 'drop-shadow(0 12px 16px rgba(0,0,0,0.5))',
  },
  {
    id: 'scallion-1',
    name: 'Spring Onion Curl',
    src: '/images/ingredients/scallion-1.png',
    targetAngleDeg: -82,
    sweepDeg: 240,
    targetRadiusDesktop: 226,
    targetRadiusMobile: 152,
    widthDesktop: 54,
    widthMobile: 38,
    finalRotation: 36,
    depthScale: 1.04,
    shadow: 'drop-shadow(0 10px 14px rgba(0,0,0,0.45))',
  },
  {
    id: 'scallion-2',
    name: 'Bias-Cut Scallion Round',
    src: '/images/ingredients/scallion-2.png',
    targetAngleDeg: 98,
    sweepDeg: 200,
    targetRadiusDesktop: 224,
    targetRadiusMobile: 150,
    widthDesktop: 50,
    widthMobile: 36,
    finalRotation: -26,
    depthScale: 0.95,
    shadow: 'drop-shadow(0 10px 14px rgba(0,0,0,0.45))',
  },
  {
    id: 'garlic-cluster',
    name: 'Garlic Cluster',
    src: '/images/ingredients/garlic-cluster.png',
    targetAngleDeg: 192,
    sweepDeg: 195,
    targetRadiusDesktop: 236,
    targetRadiusMobile: 158,
    widthDesktop: 58,
    widthMobile: 42,
    finalRotation: 12,
    depthScale: 0.92,
    shadow: 'drop-shadow(0 12px 16px rgba(0,0,0,0.48))',
  },
  {
    id: 'scallion-3',
    name: 'Scallion Ribbon',
    src: '/images/ingredients/scallion-3.png',
    targetAngleDeg: 6,
    sweepDeg: 215,
    targetRadiusDesktop: 230,
    targetRadiusMobile: 156,
    widthDesktop: 44,
    widthMobile: 32,
    finalRotation: -12,
    depthScale: 1.0,
    shadow: 'drop-shadow(0 8px 12px rgba(0,0,0,0.4))',
  },
];

export const PhotographicOrbitIngredients = forwardRef<PhotographicOrbitHandle, { className?: string }>(
  ({ className = '' }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    const getIsMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

    const setupStatic = () => {
      const isMobile = getIsMobile();
      INGREDIENTS.forEach((ing, i) => {
        const el = itemRefs.current[i];
        if (!el) return;
        const rad = (ing.targetAngleDeg * Math.PI) / 180;
        const r = isMobile ? ing.targetRadiusMobile : ing.targetRadiusDesktop;
        const x = Math.cos(rad) * r;
        const y = Math.sin(rad) * r;
        gsap.set(el, {
          x,
          y,
          rotation: ing.finalRotation,
          scale: ing.depthScale,
          opacity: 1,
          visibility: 'visible',
        });
      });
    };

    const startOrbit = () => {
      if (isReducedMotion()) {
        setupStatic();
        return;
      }

      const isMobile = getIsMobile();

      INGREDIENTS.forEach((ing, i) => {
        const el = itemRefs.current[i];
        if (!el) return;

        const targetRad = (ing.targetAngleDeg * Math.PI) / 180;
        const targetR = isMobile ? ing.targetRadiusMobile : ing.targetRadiusDesktop;
        const startRad = targetRad - (ing.sweepDeg * Math.PI) / 180;
        const startR = isMobile ? 60 : 85;

        // Initial emerging state
        const initialX = Math.cos(startRad) * startR;
        const initialY = Math.sin(startRad) * startR;

        gsap.set(el, {
          x: initialX,
          y: initialY,
          rotation: ing.finalRotation - 120,
          scale: 0.35,
          opacity: 0,
          visibility: 'visible',
        });

        // Proxy progress value to calculate smooth circular orbital curve
        const proxy = { p: 0 };
        const staggerDelay = i * 0.07; // staggered emergence

        gsap.to(proxy, {
          p: 1,
          duration: 2.1,
          delay: staggerDelay,
          ease: 'power2.out',
          onUpdate: () => {
            const p = proxy.p;
            // Interpolate angle and radius
            const curRad = startRad + (targetRad - startRad) * p;
            const curR = startR + (targetR - startR) * p;
            const curX = Math.cos(curRad) * curR;
            const curY = Math.sin(curRad) * curR;
            const curRot = (ing.finalRotation - 120) + 120 * p;
            const curScale = 0.35 + (ing.depthScale - 0.35) * p;
            const curOpacity = Math.min(1, p * 3.2);

            gsap.set(el, {
              x: curX,
              y: curY,
              rotation: curRot,
              scale: curScale,
              opacity: curOpacity,
            });
          },
          onComplete: () => {
            // Settle precisely at target
            const finalX = Math.cos(targetRad) * targetR;
            const finalY = Math.sin(targetRad) * targetR;
            gsap.set(el, {
              x: finalX,
              y: finalY,
              rotation: ing.finalRotation,
              scale: ing.depthScale,
              opacity: 1,
            });

            // Gentle continuous floating breathing oscillation
            gsap.to(el, {
              y: finalY + (i % 2 === 0 ? 5 : -5),
              rotation: ing.finalRotation + (i % 2 === 0 ? 3 : -3),
              duration: 3.2 + (i % 4) * 0.3,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            });
          },
        });
      });
    };

    const reset = () => {
      INGREDIENTS.forEach((_, i) => {
        const el = itemRefs.current[i];
        if (el) {
          gsap.killTweensOf(el);
          gsap.set(el, { opacity: 0, visibility: 'hidden' });
        }
      });
    };

    useImperativeHandle(ref, () => ({
      startOrbit,
      reset,
    }));

    return (
      <div
        ref={containerRef}
        className={`pointer-events-none select-none absolute inset-0 flex items-center justify-center ${className}`}
        aria-hidden="true"
      >
        {INGREDIENTS.map((ing, i) => (
          <div
            key={ing.id}
            ref={(node) => {
              itemRefs.current[i] = node;
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform opacity-0 invisible"
            style={{ filter: ing.shadow }}
          >
            <img
              src={ing.src}
              alt={ing.name}
              className="object-contain"
              style={{
                width: typeof window !== 'undefined' && window.innerWidth < 768 ? ing.widthMobile : ing.widthDesktop,
                height: 'auto',
              }}
              loading="eager"
            />
          </div>
        ))}
      </div>
    );
  }
);

PhotographicOrbitIngredients.displayName = 'PhotographicOrbitIngredients';
