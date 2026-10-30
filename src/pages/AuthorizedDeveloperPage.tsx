import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Terminal,
  Shield,
  Layers,
  Cpu,
  Sparkles,
  Copy,
  Check,
  ArrowLeft,
  ExternalLink,
  Laptop,
  Compass,
} from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap, isReducedMotion } from '../animations/gsap-config';
import {
  DEVELOPER_PROFILE,
  CURRENT_PROJECT_ATTRIBUTION,
  type DeveloperProfile,
  type ProjectAttribution,
} from '../data/developerIdentity';

interface AuthorizedDeveloperPageProps {
  profile?: DeveloperProfile;
  attribution?: ProjectAttribution;
}

export const AuthorizedDeveloperPage: React.FC<AuthorizedDeveloperPageProps> = ({
  profile = DEVELOPER_PROFILE,
  attribution = CURRENT_PROJECT_ATTRIBUTION,
}) => {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const designationRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);
  const credentialsRef = useRef<HTMLDivElement>(null);
  const projectSignatureRef = useRef<HTMLDivElement>(null);
  const disciplinesRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  // SEO & Privacy: Set noindex, nofollow dynamically and manage document title
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `Authorized Developer — ${profile.fullName}`;

    // Add meta robots tag with noindex, nofollow
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    let createdMeta = false;

    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      robotsMeta.content = 'noindex, nofollow';
      document.head.appendChild(robotsMeta);
      createdMeta = true;
    } else {
      robotsMeta.content = 'noindex, nofollow';
    }

    // Scroll to top upon direct URL navigation
    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      document.title = originalTitle;
      if (createdMeta && robotsMeta?.parentNode) {
        robotsMeta.parentNode.removeChild(robotsMeta);
      } else if (robotsMeta) {
        robotsMeta.content = 'index, follow';
      }
    };
  }, [profile.fullName]);

  // GSAP Choreographed Entrance Animation
  useGSAP(
    () => {
      if (isReducedMotion() || !containerRef.current) return;

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.1,
      });

      // 1. Badge reveal
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: -12 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.05
        );
      }

      // 2. Main Name Heading entrance with letter-spacing settle
      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 22, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
          0.18
        );
      }

      // 3. Designation Tag
      if (designationRef.current) {
        tl.fromTo(
          designationRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.55 },
          0.38
        );
      }

      // 4. Description & Primary Statement
      if (descriptionRef.current) {
        tl.fromTo(
          descriptionRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.48
        );
      }

      if (signatureRef.current) {
        tl.fromTo(
          signatureRef.current,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.55 },
          0.58
        );
      }

      // 5. Staggered Sections
      const sections = [
        credentialsRef.current,
        projectSignatureRef.current,
        disciplinesRef.current,
        footerRef.current,
      ].filter(Boolean);

      if (sections.length > 0) {
        tl.fromTo(
          sections,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' },
          0.65
        );
      }
    },
    { scope: containerRef }
  );

  const handleCopyAttribution = async () => {
    try {
      await navigator.clipboard.writeText(attribution.attributionId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#0A0C10] text-[#E2E8F0] selection:bg-[#3B82F6] selection:text-white font-sans relative overflow-x-hidden antialiased"
    >
      {/* Subtle Dark Technical Background Texture & Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle grid mesh */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #94A3B8 1px, transparent 0)`,
            backgroundSize: '36px 36px',
          }}
        />
        {/* Deep ambient radial lighting */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[780px] h-[480px] rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.06)_0%,_rgba(99,102,241,0.04)_40%,_transparent_70%)] blur-3xl" />
        <div className="absolute top-[45%] -right-40 w-[540px] h-[540px] rounded-full bg-[radial-gradient(circle,_rgba(148,163,184,0.04)_0%,_transparent_65%)] blur-3xl" />
        <div className="absolute bottom-10 -left-40 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(30,41,59,0.25)_0%,_transparent_70%)] blur-3xl" />
      </div>

      {/* Top Technical Status Header Bar */}
      <header className="relative z-20 border-b border-[#1E2430] bg-[#0D1016]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Developer Monogram Seal */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#141822] border border-[#2B3445] flex items-center justify-center shadow-inner">
              <span className="font-mono text-xs font-bold text-[#38BDF8] tracking-wider">
                TJ
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-mono font-semibold tracking-wider uppercase text-[#E2E8F0]">
                {profile.fullName}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase">
                {profile.designation}
              </span>
            </div>
          </div>

          {/* Right Navigation / Return to Web Application */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#141822] border border-[#232B3B] text-[10px] font-mono text-[#38BDF8] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
              <span>Attribution Record</span>
            </span>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#141822] hover:bg-[#1C2333] border border-[#232B3B] hover:border-[#38BDF8]/50 text-xs font-mono text-[#CBD5E1] hover:text-[#FFFFFF] transition-all duration-200"
              title="Return to Website"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Return to Website</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16 sm:space-y-24">
        {/* 
          =======================================================
          HERO SECTION: DEVELOPER IDENTITY
          =======================================================
        */}
        <section ref={heroRef} className="space-y-6 text-center max-w-4xl mx-auto">
          {/* Eyebrow / Small Label */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121620] border border-[#232B3B] text-[11px] font-mono uppercase tracking-[0.24em] text-[#38BDF8] shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>DEVELOPER IDENTITY</span>
            <span className="text-[#334155]">•</span>
            <span className="text-[#94A3B8]">AUTHENTIC RECORD</span>
          </div>

          {/* Main Name Heading */}
          <h1
            ref={headingRef}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#F8FAFC] leading-[1.08] uppercase"
            style={{ letterSpacing: '0.04em' }}
          >
            {profile.fullName}
          </h1>

          {/* Designation */}
          <div
            ref={designationRef}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-md bg-[#161B26] border border-[#2A3446] text-xs sm:text-sm font-mono uppercase tracking-[0.22em] text-[#CBD5E1] font-semibold"
          >
            <Shield className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>{profile.designation}</span>
          </div>

          {/* Description / Tagline */}
          <p
            ref={descriptionRef}
            className="text-lg sm:text-xl md:text-2xl text-[#94A3B8] font-light max-w-2xl mx-auto leading-relaxed"
          >
            {profile.tagline}
          </p>

          {/* Signature Statement Banner */}
          <div
            ref={signatureRef}
            className="pt-2 flex items-center justify-center"
          >
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-[#11151F] border border-[#263143] text-sm sm:text-base font-medium text-[#F1F5F9] shadow-lg">
              <Sparkles className="w-4 h-4 text-[#38BDF8] shrink-0" />
              <span className="tracking-wide">
                &ldquo;{profile.primaryStatement}&rdquo;
              </span>
            </div>
          </div>
        </section>

        {/* 
          =======================================================
          CREDENTIALS SECTION: DEVELOPER PROFILE & CURRENT ATTRIBUTION
          =======================================================
        */}
        <section
          ref={credentialsRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left Column: Developer Credentials & Identity Specification */}
          <div className="lg:col-span-6 bg-[#0E121A] border border-[#1E2533] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#1E2533] pb-4">
              <div className="flex items-center gap-2.5">
                <Code2 className="w-4 h-4 text-[#38BDF8]" />
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#CBD5E1] font-semibold">
                  Credentials Profile
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">
                Spec v2.6
              </span>
            </div>

            {/* Structured Specifications Table */}
            <div className="space-y-4 text-xs font-mono">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between py-2 border-b border-[#181E29] gap-1">
                <span className="text-[#64748B] uppercase tracking-wider">Developer</span>
                <span className="text-[#F1F5F9] font-semibold text-sm">
                  {profile.fullName}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between py-2 border-b border-[#181E29] gap-1">
                <span className="text-[#64748B] uppercase tracking-wider">Designation</span>
                <span className="text-[#38BDF8] font-semibold">
                  {profile.designation}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between py-2 border-b border-[#181E29] gap-1">
                <span className="text-[#64748B] uppercase tracking-wider">Role</span>
                <span className="text-[#E2E8F0]">
                  {profile.role}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between py-2 border-b border-[#181E29] gap-1">
                <span className="text-[#64748B] uppercase tracking-wider">Identity</span>
                <span className="text-[#E2E8F0]">
                  {profile.identity}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between py-2 border-b border-[#181E29] gap-1">
                <span className="text-[#64748B] uppercase tracking-wider">Website Attribution</span>
                <span className="text-[#F1F5F9] font-semibold">
                  {attribution.projectName}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between py-2 border-b border-[#181E29] gap-1">
                <span className="text-[#64748B] uppercase tracking-wider">Responsibility</span>
                <span className="text-[#CBD5E1]">
                  Design, Development and Implementation
                </span>
              </div>
            </div>

            {/* Summary narrative */}
            <p className="text-xs text-[#94A3B8] leading-relaxed font-sans pt-1">
              {profile.summary}
            </p>

            {/* Specializations Tags */}
            <div className="pt-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] block mb-2.5">
                Technical Focus Areas
              </span>
              <div className="flex flex-wrap gap-2">
                {profile.specializations.map((spec) => (
                  <span
                    key={spec}
                    className="px-2.5 py-1 rounded-md bg-[#141924] border border-[#222B3A] text-[11px] font-mono text-[#CBD5E1]"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Project Signature & Unique Attribution ID */}
          <div
            ref={projectSignatureRef}
            className="lg:col-span-6 bg-[#0E121A] border border-[#1E2533] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-[#1E2533] pb-4">
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-[#38BDF8]" />
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#CBD5E1] font-semibold">
                  Project Signature
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#38BDF8] bg-[#141C29] border border-[#202E46] px-2 py-0.5 rounded">
                Verified Attribution
              </span>
            </div>

            {/* Distinct Project Attribution ID Card */}
            <div className="p-5 sm:p-6 rounded-xl bg-[#090C12] border border-[#222B3B] space-y-3 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,_rgba(56,189,248,0.12)_0%,_transparent_70%)] pointer-events-none" />

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#64748B]">
                  Attribution Reference Identifier
                </span>
                <span className="text-[10px] font-mono text-[#38BDF8] tracking-wider">
                  YEAR {attribution.releaseYear}
                </span>
              </div>

              {/* Large Code Badge with Copy Action */}
              <div className="flex items-center justify-between gap-3 bg-[#121622] border border-[#263246] rounded-lg p-3 sm:p-3.5">
                <code className="font-mono text-lg sm:text-xl md:text-2xl font-bold tracking-wider text-[#F8FAFC]">
                  {attribution.attributionId}
                </code>

                <button
                  onClick={handleCopyAttribution}
                  className="px-3 py-1.5 rounded bg-[#1A2233] hover:bg-[#232F46] border border-[#2E3C55] text-xs font-mono text-[#CBD5E1] hover:text-white transition-all duration-150 flex items-center gap-1.5 shrink-0"
                  title="Copy attribution reference identifier"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span>Copy ID</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-[#64748B] font-mono leading-relaxed">
                Unique digital identifier registered for the {attribution.projectName} design and implementation.
              </p>
            </div>

            {/* Scope of Implementation */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] block">
                Implemented Scope of Work
              </span>
              <ul className="space-y-2 text-xs text-[#CBD5E1]">
                {attribution.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#38BDF8] font-mono text-xs">›</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Pills */}
            <div className="pt-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] block mb-2">
                Core Production Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {attribution.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-[#131722] border border-[#1F2737] text-[10px] font-mono text-[#94A3B8]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Non-cryptographic Disclaimer Notice */}
            <div className="p-3.5 rounded-lg bg-[#090C12] border border-[#19202E] text-[11px] text-[#64748B] leading-relaxed">
              <span className="text-[#94A3B8] font-semibold block mb-0.5">
                Attribution Reference Notice:
              </span>
              {attribution.disclaimer}
            </div>
          </div>
        </section>

        {/* 
          =======================================================
          DISCIPLINES & ENGINEERING PRINCIPLES
          =======================================================
        */}
        <section ref={disciplinesRef} className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#38BDF8]">
              ARCHITECTURE &amp; EXECUTION
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight">
              Design &amp; Engineering Disciplines
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Standard development pillars applied across independent web creations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {profile.disciplines.map((item) => (
              <div
                key={item.code}
                className="bg-[#0E121A] border border-[#1E2533] hover:border-[#38BDF8]/40 rounded-xl p-6 space-y-3 transition-colors duration-200 shadow-md group"
              >
                <div className="flex items-center justify-between text-[#64748B] group-hover:text-[#38BDF8] transition-colors">
                  <span className="text-xs font-mono font-bold">{item.code}</span>
                  {item.code.startsWith('DES') && <Compass className="w-4 h-4" />}
                  {item.code.startsWith('ENG') && <Code2 className="w-4 h-4" />}
                  {item.code.startsWith('MOT') && <Layers className="w-4 h-4" />}
                  {item.code.startsWith('OPT') && <Cpu className="w-4 h-4" />}
                </div>
                <h3 className="font-semibold text-sm sm:text-base text-[#F1F5F9]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Return to Project CTA Row */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between p-6 rounded-2xl bg-[#0E121A] border border-[#1E2533] gap-4">
          <div className="flex items-center gap-3">
            <Laptop className="w-5 h-5 text-[#38BDF8]" />
            <div>
              <span className="text-xs font-mono text-[#CBD5E1] font-semibold block">
                {attribution.projectName}
              </span>
              <span className="text-[11px] text-[#64748B] font-mono">
                Attribution Reference: {attribution.attributionId}
              </span>
            </div>
          </div>

          <Link
            to="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#0A0C10] font-mono font-bold text-xs uppercase tracking-wider transition-colors duration-150 flex items-center justify-center gap-2 shadow-md"
          >
            <span>Return to Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>

      {/* 
        =======================================================
        FOOTER: CRAFTED WITH PRECISION
        =======================================================
      */}
      <footer
        ref={footerRef}
        className="relative z-20 border-t border-[#1E2430] bg-[#090B0E] py-8 text-center text-xs font-mono text-[#64748B]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <p className="text-[#CBD5E1] tracking-wide">
            &ldquo;{profile.signatureFooter}&rdquo;
          </p>
          <p className="text-[10px] text-[#475569]">
            © {attribution.releaseYear} {profile.fullName} • Independent Developer Portfolio Reference
          </p>
        </div>
      </footer>
    </div>
  );
};

