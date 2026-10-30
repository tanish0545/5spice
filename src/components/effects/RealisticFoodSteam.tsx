import React, { useRef, useEffect, useState } from 'react';
import { isReducedMotion } from '../../animations/gsap-config';

interface RealisticFoodSteamProps {
  className?: string;
  intensity?: number;
}

/**
 * RealisticFoodSteam
 * 
 * Ultra-soft, photorealistic culinary vapor rising from freshly plated hot wok food.
 * Uses feathered multi-phase organic wisps with thermal diffusion gradients.
 * Strictly avoids cartoon outlines, heavy smoke, or synthetic opacity.
 */
export const RealisticFoodSteam: React.FC<RealisticFoodSteamProps> = ({
  className = '',
  intensity = 0.5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const reducedMotion = isReducedMotion();

  useEffect(() => {
    // Conserve resources when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsVisible(entry.isIntersecting));
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (reducedMotion || !isVisible) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none select-none overflow-visible ${className}`}
      aria-hidden="true"
      style={{ opacity: intensity }}
    >
      <svg
        viewBox="0 0 260 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Natural soft warm kitchen vapor gradients */}
          <linearGradient id="warmSteamGrad1" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#FFFBF2" stopOpacity="0" />
            <stop offset="20%" stopColor="#FFFBF2" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#F5ECE0" stopOpacity="0.25" />
            <stop offset="85%" stopColor="#EAE0D2" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#E0D4C3" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="warmSteamGrad2" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="25%" stopColor="#FFFDF7" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#F8EFE4" stopOpacity="0.2" />
            <stop offset="90%" stopColor="#EFE4D6" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#E2D4C2" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="steamCoreGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#FFF9EB" stopOpacity="0" />
            <stop offset="35%" stopColor="#FFF4DE" stopOpacity="0.3" />
            <stop offset="75%" stopColor="#F4EBDD" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#EAE0D2" stopOpacity="0" />
          </linearGradient>

          {/* Deep Gaussian diffusion filter to ensure zero hard vector edges */}
          <filter id="ultraSoftSteamBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6.5" />
          </filter>

          <filter id="coreSteamBlur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="9.0" />
          </filter>
        </defs>

        {/* Layer 0: Core warm thermal vapor puff hovering just over the hot potatoes */}
        <g filter="url(#coreSteamBlur)" className="animate-steam-3">
          <ellipse
            cx="130"
            cy="175"
            rx="52"
            ry="24"
            fill="url(#steamCoreGrad)"
          />
        </g>

        {/* Wisp 1: Delicate left curling plume */}
        <g className="animate-steam-1" filter="url(#ultraSoftSteamBlur)">
          <path
            d="M 112 185 C 92 145, 128 115, 104 70 C 88 40, 114 20, 102 5"
            stroke="url(#warmSteamGrad1)"
            strokeWidth="24"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Wisp 2: Central primary rising convection column */}
        <g className="animate-steam-2" filter="url(#ultraSoftSteamBlur)">
          <path
            d="M 132 190 C 148 150, 118 108, 138 65 C 152 35, 126 15, 135 2"
            stroke="url(#warmSteamGrad2)"
            strokeWidth="28"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Wisp 3: Soft right dispersing drift */}
        <g className="animate-steam-3" filter="url(#ultraSoftSteamBlur)">
          <path
            d="M 152 180 C 136 142, 168 95, 148 55 C 132 28, 156 10, 144 4"
            stroke="url(#warmSteamGrad1)"
            strokeWidth="22"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
};

