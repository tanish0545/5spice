import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, isReducedMotion } from '../../animations/gsap-config';

interface CulinaryGarnishProps {
  className?: string;
}

export const CulinaryGarnish: React.FC<CulinaryGarnishProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chilliRef = useRef<SVGSVGElement>(null);
  const scallionRef = useRef<SVGSVGElement>(null);
  const sesame1Ref = useRef<SVGSVGElement>(null);
  const sesame2Ref = useRef<SVGSVGElement>(null);
  const garlicRef = useRef<SVGSVGElement>(null);
  const gingerRef = useRef<SVGSVGElement>(null);
  const corianderRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (isReducedMotion()) return;

      // Subtle, restrained floating oscillation for authentic culinary depth
      if (chilliRef.current) {
        gsap.to(chilliRef.current, {
          y: -8,
          rotation: 6,
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (scallionRef.current) {
        gsap.to(scallionRef.current, {
          y: -10,
          rotation: -8,
          duration: 4.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.8,
        });
      }

      if (sesame1Ref.current) {
        gsap.to(sesame1Ref.current, {
          y: -5,
          rotation: 12,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.2,
        });
      }

      if (sesame2Ref.current) {
        gsap.to(sesame2Ref.current, {
          y: -6,
          rotation: -10,
          duration: 3.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.4,
        });
      }

      if (garlicRef.current) {
        gsap.to(garlicRef.current, {
          y: -7,
          rotation: 8,
          duration: 4.1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.6,
        });
      }

      if (gingerRef.current) {
        gsap.to(gingerRef.current, {
          y: -9,
          rotation: -12,
          duration: 4.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.0,
        });
      }

      if (corianderRef.current) {
        gsap.to(corianderRef.current, {
          y: -8,
          rotation: 5,
          duration: 3.9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.2,
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none select-none absolute inset-0 ${className}`}
      aria-hidden="true"
    >
      {/* 1. Fresh Sliced Sichuan Red Chilli Ring (Top-Right of Bowl) */}
      <svg
        ref={chilliRef}
        className="absolute -top-3 sm:-top-5 right-6 sm:right-10 w-9 sm:w-11 h-9 sm:h-11 drop-shadow-[0_4px_8px_rgba(48,35,33,0.18)]"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Exterior dark red chilli skin */}
        <ellipse cx="22" cy="22" rx="19" ry="14" transform="rotate(-25 22 22)" fill="#8A252A" />
        {/* Vibrant chilli flesh */}
        <ellipse cx="22" cy="22" rx="17" ry="12" transform="rotate(-25 22 22)" fill="#C23838" />
        {/* Inner hollow cavity */}
        <ellipse cx="21" cy="21.5" rx="10" ry="6.5" transform="rotate(-25 21 21.5)" fill="#6B1D21" />
        {/* Chilli seed */}
        <ellipse cx="25" cy="19" rx="2.5" ry="1.8" transform="rotate(10 25 19)" fill="#F5E4B3" />
      </svg>

      {/* 2. Crisp Bias-Cut Spring Onion / Scallion Ring (Bottom-Left of Bowl) */}
      <svg
        ref={scallionRef}
        className="absolute -bottom-2 sm:-bottom-4 left-8 sm:left-14 w-8 sm:w-10 h-8 sm:h-10 drop-shadow-[0_4px_8px_rgba(48,35,33,0.16)]"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dark jade scallion outer ring */}
        <ellipse cx="20" cy="20" rx="18" ry="10" transform="rotate(35 20 20)" fill="#2E6B38" />
        {/* Bright green inner flesh */}
        <ellipse cx="20" cy="20" rx="15" ry="7.5" transform="rotate(35 20 20)" fill="#5DB366" />
        {/* Tender white-green core */}
        <ellipse cx="20" cy="20" rx="9" ry="4.5" transform="rotate(35 20 20)" fill="#D4ECD5" />
        {/* Hollow center */}
        <ellipse cx="20" cy="20" rx="5" ry="2.5" transform="rotate(35 20 20)" fill="#1E4725" />
      </svg>

      {/* 3. Golden Toasted Sesame Seed Flecks */}
      <svg
        ref={sesame1Ref}
        className="absolute top-1/4 -left-3 sm:-left-5 w-4 h-4 drop-shadow-[0_2px_4px_rgba(48,35,33,0.12)]"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 2 C10.5 4, 11 9, 8 13 C5 9, 5.5 4, 8 2 Z"
          fill="#D6AA6C"
          stroke="#9E763E"
          strokeWidth="0.8"
        />
      </svg>

      <svg
        ref={sesame2Ref}
        className="absolute bottom-1/4 -right-2 sm:-right-4 w-3.5 h-3.5 drop-shadow-[0_2px_4px_rgba(48,35,33,0.12)]"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 2 C10.5 4, 11 9, 8 13 C5 9, 5.5 4, 8 2 Z"
          fill="#C49B5E"
          stroke="#8A6530"
          strokeWidth="0.8"
          transform="rotate(40 8 8)"
        />
      </svg>

      {/* 4. Sliced Garlic Sliver (Top-Left) */}
      <svg
        ref={garlicRef}
        className="absolute top-8 left-6 sm:left-10 w-7 sm:w-8 h-7 sm:h-8 drop-shadow-[0_4px_8px_rgba(48,35,33,0.14)]"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 4 C10 12, 8 20, 12 26 C16 30, 22 28, 25 24 C28 19, 23 11, 16 4 Z"
          fill="#FDF8EB"
          stroke="#E2D4BA"
          strokeWidth="1"
        />
        <path
          d="M15 10 C12 16, 12 22, 15 25"
          stroke="#EFE0C7"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </svg>

      {/* 5. Ginger Julienne Matchstick (Bottom-Right) */}
      <svg
        ref={gingerRef}
        className="absolute -bottom-1 sm:-bottom-3 right-10 sm:right-16 w-8 sm:w-10 h-4 sm:h-5 drop-shadow-[0_3px_6px_rgba(48,35,33,0.14)]"
        viewBox="0 0 36 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="2"
          y="3"
          width="32"
          height="7"
          rx="3.5"
          transform="rotate(-15 18 7)"
          fill="#E5B96E"
          stroke="#BD9043"
          strokeWidth="0.9"
        />
      </svg>

      {/* 6. Fresh Coriander / Cilantro Leaf Sprig (Top-Center) */}
      <svg
        ref={corianderRef}
        className="absolute -top-6 sm:-top-8 left-1/3 w-8 sm:w-9 h-8 sm:h-9 drop-shadow-[0_4px_8px_rgba(48,35,33,0.16)]"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Stem */}
        <path
          d="M18 32 C18 24, 19 16, 18 8"
          stroke="#2D5A27"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Leaf lobes */}
        <path
          d="M18 10 C13 7, 9 11, 13 16 C16 19, 18 14, 18 10 Z"
          fill="#3E8B35"
        />
        <path
          d="M18 10 C23 7, 27 11, 23 16 C20 19, 18 14, 18 10 Z"
          fill="#4CA641"
        />
        <path
          d="M18 8 C15 3, 21 3, 18 8 Z"
          fill="#5CBF4F"
        />
      </svg>
    </div>
  );
};
