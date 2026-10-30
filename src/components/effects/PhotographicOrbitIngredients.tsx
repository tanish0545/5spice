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
  layer: 'foreground' | 'background';
}

const INGREDIENTS: IngredientDef[] = [
  {
    id: 'red-chilli',
    name: 'Sichuan Red Chilli',
    src: '/images/ingredients/red-chilli.png',
    targetAngleDeg: -38,
    sweepDeg: 210,
    targetRadiusDesktop: 255,
    targetRadiusMobile: 172,
    widthDesktop: 102,
    widthMobile: 66,
    finalRotation: 24,
    depthScale: 1.08,
    shadow: 'drop-shadow(0 20px 26px rgba(0,0,0,0.72))',
    layer: 'foreground',
  },
  {
    id: 'green-chilli',
    name: 'Fresh Green Chilli',
    src: '/images/ingredients/green-chilli.png',
    targetAngleDeg: 145,
    sweepDeg: 230,
    targetRadiusDesktop: 258,
    targetRadiusMobile: 174,
    widthDesktop: 96,
    widthMobile: 62,
    finalRotation: -18,
    depthScale: 0.96,
    shadow: 'drop-shadow(0 14px 18px rgba(0,0,0,0.52))',
    layer: 'background',
  },
  {
    id: 'garlic-clove',
    name: 'Peeled Garlic Clove',
    src: '/images/ingredients/garlic-clove.png',
    targetAngleDeg: -132,
    sweepDeg: 190,
    targetRadiusDesktop: 242,
    targetRadiusMobile: 162,
    widthDesktop: 80,
    widthMobile: 52,
    finalRotation: -22,
    depthScale: 0.94,
    shadow: 'drop-shadow(0 12px 16px rgba(0,0,0,0.48))',
    layer: 'background',
  },
  {
    id: 'ginger-slice',
    name: 'Sliced Ginger Root',
    src: '/images/ingredients/ginger-slice.png',
    targetAngleDeg: 48,
    sweepDeg: 220,
    targetRadiusDesktop: 248,
    targetRadiusMobile: 166,
    widthDesktop: 88,
    widthMobile: 58,
    finalRotation: 18,
    depthScale: 1.06,
    shadow: 'drop-shadow(0 18px 24px rgba(0,0,0,0.68))',
    layer: 'foreground',
  },
  {
    id: 'scallion-1',
    name: 'Spring Onion Curl',
    src: '/images/ingredients/scallion-1.png',
    targetAngleDeg: -82,
    sweepDeg: 240,
    targetRadiusDesktop: 252,
    targetRadiusMobile: 168,
    widthDesktop: 84,
    widthMobile: 55,
    finalRotation: 36,
    depthScale: 0.97,
    shadow: 'drop-shadow(0 12px 16px rgba(0,0,0,0.48))',
    layer: 'background',
  },
  {
    id: 'scallion-2',
    name: 'Bias-Cut Scallion Round',
    src: '/images/ingredients/scallion-2.png',
    targetAngleDeg: 98,
    sweepDeg: 200,
    targetRadiusDesktop: 246,
    targetRadiusMobile: 164,
    widthDesktop: 78,
    widthMobile: 52,
    finalRotation: -26,
    depthScale: 1.04,
    shadow: 'drop-shadow(0 16px 22px rgba(0,0,0,0.62))',
    layer: 'foreground',
  },
  {
    id: 'garlic-cluster',
    name: 'Garlic Cluster',
    src: '/images/ingredients/garlic-cluster.png',
    targetAngleDeg: 192,
    sweepDeg: 195,
    targetRadiusDesktop: 260,
    targetRadiusMobile: 174,
    widthDesktop: 86,
    widthMobile: 56,
    finalRotation: 12,
    depthScale: 0.92,
    shadow: 'drop-shadow(0 14px 18px rgba(0,0,0,0.48))',
    layer: 'background',
  },
  {
    id: 'scallion-3',
    name: 'Scallion Ribbon',
    src: '/images/ingredients/scallion-3.png',
    targetAngleDeg: 6,
    sweepDeg: 215,
    targetRadiusDesktop: 250,
    targetRadiusMobile: 168,
    widthDesktop: 76,
    widthMobile: 50,
    finalRotation: -12,
    depthScale: 1.06,
    shadow: 'drop-shadow(0 16px 22px rgba(0,0,0,0.60))',
    layer: 'foreground',
  },
];

export interface PhotographicOrbitProps {
  className?: string;
  layer?: 'all' | 'foreground' | 'background';
}

export const PhotographicOrbitIngredients = forwardRef<PhotographicOrbitHandle, PhotographicOrbitProps>(
  ({ className = '', layer = 'all' }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    const activeIngredients = layer === 'all'
      ? INGREDIENTS
      : INGREDIENTS.filter((item) => item.layer === layer);

    const getViewportTier = (): 'smallMobile' | 'mobile' | 'desktop' => {
      if (typeof window === 'undefined') return 'desktop';
      const w = window.innerWidth;
      if (w < 375) return 'smallMobile';
      if (w < 768) return 'mobile';
      return 'desktop';
    };

    const getRadius = (ing: IngredientDef, tier: 'smallMobile' | 'mobile' | 'desktop') => {
      if (tier === 'smallMobile') return Math.round(ing.targetRadiusMobile * 0.76);
      if (tier === 'mobile') return ing.targetRadiusMobile;
      return ing.targetRadiusDesktop;
    };

    const getScaleMultiplier = (tier: 'smallMobile' | 'mobile' | 'desktop') => {
      if (tier === 'smallMobile') return 0.78;
      return 1.0;
    };

    const setupStatic = () => {
      const tier = getViewportTier();
      const scaleMult = getScaleMultiplier(tier);
      activeIngredients.forEach((ing, i) => {
        const el = itemRefs.current[i];
        if (!el) return;
        const rad = (ing.targetAngleDeg * Math.PI) / 180;
        const r = getRadius(ing, tier);
        const x = Math.cos(rad) * r;
        const y = Math.sin(rad) * r;
        gsap.set(el, {
          x,
          y,
          rotation: ing.finalRotation,
          scale: ing.depthScale * scaleMult,
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

      const tier = getViewportTier();
      const scaleMult = getScaleMultiplier(tier);

      activeIngredients.forEach((ing, i) => {
        const el = itemRefs.current[i];
        if (!el) return;

        const targetRad = (ing.targetAngleDeg * Math.PI) / 180;
        const targetR = getRadius(ing, tier);
        const startRad = targetRad - (ing.sweepDeg * Math.PI) / 180;
        const startR = tier === 'smallMobile' ? 48 : tier === 'mobile' ? 60 : 85;

        // Initial emerging state
        const initialX = Math.cos(startRad) * startR;
        const initialY = Math.sin(startRad) * startR;

        gsap.set(el, {
          x: initialX,
          y: initialY,
          rotation: ing.finalRotation - 120,
          scale: 0.28 * scaleMult,
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
            const curScale = (0.28 + (ing.depthScale - 0.28) * p) * scaleMult;
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
              scale: ing.depthScale * scaleMult,
              opacity: 1,
            });

            // 3D Depth Layering: Selected foreground ingredients receive dynamic foreground floating movement
            if (ing.layer === 'foreground') {
              gsap.to(el, {
                x: finalX + (i % 2 === 0 ? 5 : -4),
                y: finalY + (i % 2 === 0 ? -6 : 5),
                rotation: ing.finalRotation + (i % 2 === 0 ? 3.5 : -3),
                scale: ing.depthScale * scaleMult * 1.03,
                duration: 3.4 + (i % 3) * 0.4,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
              });
            } else {
              // Background ingredients receive gentler, softer ambient drift deeper behind the plate
              gsap.to(el, {
                y: finalY + (i % 2 === 0 ? 2.5 : -2.5),
                rotation: ing.finalRotation + (i % 2 === 0 ? 1.5 : -1.5),
                duration: 4.2 + (i % 3) * 0.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
              });
            }
          },
        });
      });
    };

    const reset = () => {
      activeIngredients.forEach((_, i) => {
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
        {activeIngredients.map((ing, i) => (
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
