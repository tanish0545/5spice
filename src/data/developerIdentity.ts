/**
 * Reusable Developer Identity & Project Attribution Specification
 *
 * This module defines the personal developer identity data for Tanish Jangale.
 * It is completely decoupled from any specific client codebase or business logic,
 * allowing this identity specification and component to be reused across future projects
 * simply by updating the CURRENT_PROJECT_ATTRIBUTION config.
 */

export interface DeveloperProfile {
  fullName: string;
  designation: string;
  role: string;
  identity: string;
  primaryStatement: string;
  tagline: string;
  signatureFooter: string;
  summary: string;
  specializations: string[];
  disciplines: Array<{
    title: string;
    description: string;
    code: string;
  }>;
  engineeringPrinciples: Array<{
    title: string;
    description: string;
  }>;
}

export interface ProjectAttribution {
  projectName: string;
  projectType: string;
  attributionId: string;
  releaseYear: string;
  developerRole: string;
  responsibilities: string[];
  techStack: string[];
  architectureHighlights: string[];
  disclaimer: string;
}

/**
 * Universal Developer Identity Profile for Tanish Jangale
 */
export const DEVELOPER_PROFILE: DeveloperProfile = {
  fullName: 'Tanish Jangale',
  designation: 'Authorized Developer',
  role: 'Website Designer, Developer & Creator',
  identity: 'Independent Developer',
  primaryStatement: 'Designed & Developed by Tanish Jangale.',
  tagline: 'Designing digital experiences. Engineering ideas into reality.',
  signatureFooter: 'Crafted with precision by Tanish Jangale.',
  summary:
    'Independent digital craftsman specializing in the design, architecture, and high-performance engineering of custom web applications, responsive editorial experiences, and bespoke motion interfaces.',
  specializations: [
    'User Interface & Experience Design',
    'Modern React & TypeScript Architecture',
    'GSAP & ScrollTrigger Cinematic Choreography',
    'Responsive High-Density Layout Systems',
    'Web Performance & Accessibility Standards',
    'Single Page Application Infrastructure',
  ],
  disciplines: [
    {
      code: 'DES-01',
      title: 'Design Direction',
      description:
        'Crafting bespoke visual identities, editorial typography hierarchies, dark-mode color balance, and spatial harmony tailored to each brand.',
    },
    {
      code: 'ENG-02',
      title: 'Frontend Engineering',
      description:
        'Building maintainable, strictly typed component trees using modern React, TypeScript, and clean modular code standards.',
    },
    {
      code: 'MOT-03',
      title: 'Motion Choreography',
      description:
        'Composing narrative-driven scroll journeys, smooth momentum physics, micro-interactions, and hardware-accelerated animations.',
    },
    {
      code: 'OPT-04',
      title: 'Performance & Standards',
      description:
        'Ensuring sub-second initial paints, zero layout shifts, strict accessibility compliance (a11y), and responsive resilience across viewports.',
    },
  ],
  engineeringPrinciples: [
    {
      title: 'Precision in Execution',
      description:
        'Every pixel, transition timing, and responsive breakpoint is intentionally calibrated to deliver a frictionless experience.',
    },
    {
      title: 'Zero Redundant Bloat',
      description:
        'Clean dependency profiles, lean rendering lifecycles, and respectful resource consumption on both desktop and mobile devices.',
    },
    {
      title: 'Accessible by Default',
      description:
        'Adherence to WCAG standards, keyboard navigation accessibility, semantic HTML foundations, and reduced-motion user preferences.',
    },
    {
      title: 'Architecture Longevity',
      description:
        'Code organized into decoupled, maintainable abstractions that scale predictably as product requirements evolve.',
    },
  ],
};

/**
 * Project-Specific Attribution Config for 5 Spice Restaurant Website
 */
export const CURRENT_PROJECT_ATTRIBUTION: ProjectAttribution = {
  projectName: '5 Spice Restaurant Website',
  projectType: 'Independent Culinary Showcase Web Application',
  attributionId: 'TJ-5SPICE-2026',
  releaseYear: '2026',
  developerRole: 'Independent Website Developer & Creator',
  responsibilities: [
    'Website Design, Development and Implementation',
    'Editorial Culinary Direction & Responsive Layout System',
    'GSAP + ScrollTrigger Choreography & Floating Food Journey',
    'TypeScript Architecture & Component Reusability',
    'Lenis Smooth Scroll Synchronization & Accessibility Guards',
  ],
  techStack: [
    'React 18',
    'TypeScript',
    'Tailwind CSS',
    'GSAP 3 & ScrollTrigger',
    'Lenis Smooth Scroll',
    'Lucide Icons',
    'Vite Build System',
  ],
  architectureHighlights: [
    'Strict single-element floating food journey scroll lifecycle',
    'Custom magnetic button micro-interactions with proximity sensors',
    'Reduced-motion awareness across all animation timelines',
    'High-resolution photorealistic asset masking and rendering',
    'Fully typed data models with rupee-formatted menu structure',
  ],
  disclaimer:
    'This attribution reference documents independent design, engineering, and creative implementation by Tanish Jangale. It serves as a personal developer portfolio credit and attribution identifier, and does not represent an institutional security certificate or proof of business ownership.',
};

