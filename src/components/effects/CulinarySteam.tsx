import React, { useRef, useEffect, useState } from 'react';
import { isReducedMotion } from '../../animations/gsap-config';

interface CulinarySteamProps {
  /** Size variant: 'subtle' for hero dish, 'medium' for wok storytelling, 'compact' for menu cards */
  variant?: 'subtle' | 'medium' | 'compact';
  /** Custom additional CSS classes */
  className?: string;
  /** Custom opacity multiplier (0.1 - 1.0) */
  intensity?: number;
}

export const CulinarySteam: React.FC<CulinarySteamProps> = ({
  variant = 'subtle',
  className = '',
  intensity = 0.45,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const reducedMotion = isReducedMotion();

  useEffect(() => {
    // Pause rendering when element is outside viewport to conserve GPU/CPU
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
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

  // Dimension presets based on variant
  const dimensions =
    variant === 'compact'
      ? { width: 120, height: 90, viewBox: '0 0 120 90' }
      : variant === 'medium'
      ? { width: 280, height: 200, viewBox: '0 0 280 200' }
      : { width: 220, height: 160, viewBox: '0 0 220 160' };

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ opacity: intensity }}
    >
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={dimensions.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Subtle warm Asian kitchen vapor gradients */}
          <linearGradient id="steamGradient1" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#FFF9EE" stopOpacity="0" />
            <stop offset="25%" stopColor="#FFF4E0" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#F4EBDD" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#E9D9C8" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="steamGradient2" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="30%" stopColor="#FFF6E8" stopOpacity="0.38" />
            <stop offset="75%" stopColor="#F4EBDD" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#E9D9C8" stopOpacity="0" />
          </linearGradient>

          <filter id="steamBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
        </defs>

        {/* Wisp 1: Left soft curling vapor */}
        <g className="animate-steam-1" filter="url(#steamBlur)">
          <path
            d="M 60 150 C 45 110, 75 80, 55 45 C 40 20, 60 10, 50 0"
            stroke="url(#steamGradient1)"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Wisp 2: Central soaring hot wok plume */}
        <g className="animate-steam-2" filter="url(#steamBlur)">
          <path
            d="M 110 155 C 125 120, 95 85, 115 50 C 130 25, 105 10, 118 0"
            stroke="url(#steamGradient2)"
            strokeWidth="22"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Wisp 3: Right delicate dispersing wisp */}
        <g className="animate-steam-3" filter="url(#steamBlur)">
          <path
            d="M 160 148 C 145 115, 175 75, 155 40 C 140 18, 165 5, 150 0"
            stroke="url(#steamGradient1)"
            strokeWidth="16"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
};
