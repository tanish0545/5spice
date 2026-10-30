import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Train, Navigation, Sparkles, ExternalLink, Calendar } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap, isReducedMotion } from '../../animations/gsap-config';
import { RESTAURANT_INFO } from '../../data/fiveSpiceData';
import { useMagneticButton } from '../../hooks/useMagneticButton';

interface SakinakaLocationSectionProps {
  onReserveTable?: () => void;
}

export const SakinakaLocationSection: React.FC<SakinakaLocationSectionProps> = ({ onReserveTable }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const reserveBtnRef = useMagneticButton<HTMLButtonElement>(0.25);

  useGSAP(
    () => {
      if (isReducedMotion() || !sectionRef.current) return;

      const heading = sectionRef.current.querySelector('h2');
      if (heading) {
        gsap.fromTo(
          heading,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      gsap.fromTo(
        [leftRef.current, rightRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="location"
      className="relative py-20 sm:py-28 bg-[#F4EBDD] border-b border-[#E2D3C0] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Outlet Details & Hours */}
          <div ref={leftRef} className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8D8C5] border border-[#E2D3C0] text-[#641F29] text-xs font-semibold tracking-[0.2em] uppercase mb-3.5 font-mono shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-[#B8322A]" />
                <span>Visit Us in Andheri East</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#302321] tracking-tight">
                5 Spice Sakinaka
              </h2>
              <p className="mt-3.5 text-sm sm:text-base text-[#302321]/80 font-normal leading-relaxed">
                Conveniently located on Andheri-Kurla Road, just a brief stroll from Sakinaka Metro Station,
                surrounded by major corporate centers and easily accessible from Powai and Marol.
              </p>
            </div>

            {/* Address Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#FFF9F1] border border-[#E2D3C0] space-y-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F4EBDD] border border-[#E2D3C0] flex items-center justify-center shrink-0 text-[#B8322A]">
                  <Navigation className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-[#302321] text-lg">Full Address</h3>
                  <p className="text-sm text-[#302321]/80 mt-1 leading-relaxed">
                    {RESTAURANT_INFO.fullAddress}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#302321]/70">
                    <span className="inline-flex items-center gap-1.5 text-[#641F29] font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-[#B8322A]" />
                      {RESTAURANT_INFO.landmark}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-blue-700 font-medium">
                      <Train className="w-3.5 h-3.5 text-blue-600" />
                      {RESTAURANT_INFO.metroStation}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E2D3C0] flex flex-wrap items-center gap-4">
                <a
                  href={RESTAURANT_INFO.externalLinks.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#B8322A] text-white font-semibold text-xs tracking-wider uppercase rounded-lg hover:bg-[#862D35] transition-colors shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 text-xs text-[#641F29] hover:text-[#B8322A] transition-colors font-bold"
                >
                  <span>Detailed Directions &amp; Transit Info</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Timings & Direct Phones Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-[#FFF9F1] border border-[#E2D3C0] shadow-sm">
                <div className="flex items-center gap-2 text-[#641F29] mb-2 font-semibold text-xs uppercase tracking-wider font-mono">
                  <Clock className="w-4 h-4 text-[#B8322A]" />
                  <span>Operating Hours</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#302321]/80">
                    <span>Lunch:</span>
                    <span className="font-semibold text-[#302321]">{RESTAURANT_INFO.timings.lunch}</span>
                  </div>
                  <div className="flex justify-between text-[#302321]/80">
                    <span>Dinner:</span>
                    <span className="font-semibold text-[#302321]">{RESTAURANT_INFO.timings.dinner}</span>
                  </div>
                  <div className="pt-1 text-[11px] text-emerald-700 font-semibold">
                    ● {RESTAURANT_INFO.timings.days}
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#FFF9F1] border border-[#E2D3C0] shadow-sm">
                <div className="flex items-center gap-2 text-[#641F29] mb-2 font-semibold text-xs uppercase tracking-wider font-mono">
                  <Phone className="w-4 h-4 text-[#B8322A]" />
                  <span>Direct Outlet Contact</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div>
                    <a
                      href={`tel:${RESTAURANT_INFO.phone}`}
                      className="text-[#302321] hover:text-[#641F29] font-bold text-sm transition-colors block font-mono"
                    >
                      {RESTAURANT_INFO.phone}
                    </a>
                  </div>
                  <div>
                    <a
                      href={`tel:${RESTAURANT_INFO.secondaryPhone}`}
                      className="text-[#302321]/70 hover:text-[#641F29] transition-colors block text-xs font-mono"
                    >
                      {RESTAURANT_INFO.secondaryPhone} (Mobile)
                    </a>
                  </div>
                  <div className="text-[11px] text-[#302321]/70 pt-1">
                    Call for instant table checks &amp; party inquiries
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Reservation & Online Ordering Actions */}
          <div ref={rightRef} className="lg:col-span-5 space-y-5">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FFF9F1] border border-[#E2D3C0] shadow-sm relative">
              <span className="text-[10px] tracking-[0.2em] text-[#641F29] uppercase font-bold block mb-1 font-mono">
                Plan Your Feast
              </span>
              <h3 className="font-serif text-2xl text-[#302321] font-bold mb-2">
                Reserve Your Sakinaka Table
              </h3>
              <p className="text-xs text-[#302321]/80 font-normal leading-relaxed mb-5">
                Weekend evenings and festival nights at 5 Spice Sakinaka fill up quickly. Secure your table in advance for comfortable family dining.
              </p>

              <div className="space-y-3">
                {onReserveTable && (
                  <button
                    ref={reserveBtnRef}
                    onClick={onReserveTable}
                    className="w-full py-3.5 bg-[#B8322A] hover:bg-[#862D35] text-white font-semibold text-xs tracking-[0.16em] uppercase rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-white" />
                    <span>Reserve a Table Online</span>
                  </button>
                )}

                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="w-full py-3.5 bg-[#F4EBDD] border border-[#E2D3C0] hover:border-[#641F29] text-[#302321] hover:text-[#641F29] font-semibold text-xs tracking-[0.16em] uppercase rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#B8322A]" />
                  <span>Call {RESTAURANT_INFO.phone}</span>
                </a>
              </div>

              {/* Online Ordering Links */}
              <div className="mt-6 pt-5 border-t border-[#E2D3C0]">
                <span className="text-[11px] uppercase tracking-wider text-[#302321]/70 block mb-3 text-center font-medium">
                  Prefer Home Delivery in Andheri East / Powai?
                </span>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={RESTAURANT_INFO.externalLinks.zomato}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-[#F4EBDD] hover:bg-[#E8D8C5] border border-[#E2D3C0] hover:border-[#641F29] text-center transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span className="text-xs font-bold text-[#e23744]">Zomato Delivery</span>
                    <ExternalLink className="w-3 h-3 text-[#302321]/60" />
                  </a>

                  <a
                    href={RESTAURANT_INFO.externalLinks.swiggy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-[#F4EBDD] hover:bg-[#E8D8C5] border border-[#E2D3C0] hover:border-[#641F29] text-center transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span className="text-xs font-bold text-[#fc8019]">Swiggy Delivery</span>
                    <ExternalLink className="w-3 h-3 text-[#302321]/60" />
                  </a>
                </div>
              </div>

              {/* Average Cost Notice */}
              <div className="mt-5 p-3 rounded-lg bg-[#F4EBDD] border border-[#E2D3C0] text-center">
                <span className="text-[11px] text-[#302321]/80">
                  Estimated dining cost:{' '}
                  <strong className="text-[#641F29] font-semibold">{RESTAURANT_INFO.costForTwo}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
