import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, isReducedMotion } from '../animations/gsap-config';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MapPin, Phone, Clock, ExternalLink, CheckCircle2, Send, Train } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/fiveSpiceData';
import { useMagneticButton } from '../hooks/useMagneticButton';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const submitBtnRef = useMagneticButton<HTMLButtonElement>(0.25);

  const [formData, setFormData] = useState(() => ({
    name: '',
    phone: '',
    guests: '4 Guests',
    date: new Date().toISOString().split('T')[0],
    time: '20:00',
    notes: '',
  }));

  useGSAP(
    () => {
      if (isReducedMotion() || !gridContainerRef.current) return;

      gsap.fromTo(
        [leftColRef.current, rightColRef.current],
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.1,
        }
      );
    },
    { scope: gridContainerRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F4EBDD] text-[#30201B] selection:bg-[#641F29] selection:text-[#FFF9F1]">
      <Header />

      {/* Header Banner */}
      <section className="pt-28 sm:pt-36 pb-10 sm:pb-12 px-4 sm:px-6 md:px-12 bg-[#F4EBDD] border-b border-[#E2D3C0] text-center">
        <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-3.5 py-1 rounded-full bg-[#E8D8C5] border border-[#E2D3C0] text-[10px] tracking-[0.2em] xs:tracking-[0.26em] uppercase text-[#641F29] font-semibold font-mono shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#B8322A] animate-pulse" />
            <span>Sakinaka, Andheri East • Mumbai</span>
          </div>

          <h1 className="font-serif text-2xl xs:text-3xl sm:text-5xl font-bold text-[#30201B] tracking-tight">
            Find Us &amp; Reserve a Table
          </h1>

          <p className="text-[#30201B]/80 text-xs sm:text-sm max-w-xl mx-auto font-normal leading-relaxed">
            Conveniently located at Shivai Industrial Estate along Andheri-Kurla Road, right by the Sakinaka Metro Station.
          </p>
        </div>
      </section>

      {/* Main Grid: Outlet Info + Reservation Inquiry Form */}
      <section ref={gridContainerRef} className="py-10 sm:py-16 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Verified Location & Contact Details */}
          <div ref={leftColRef} className="lg:col-span-5 space-y-6">
            <div className="bg-[#FFF9F1] border border-[#E2D3C0] rounded-2xl p-4 xs:p-6 sm:p-8 space-y-5 sm:space-y-6 shadow-sm">
              <div>
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#641F29] font-semibold block mb-2 font-mono">
                  Outlet Address
                </span>
                <h3 className="font-serif text-xl font-bold text-[#30201B] mb-2">
                  5 Spice Sakinaka
                </h3>
                <p className="text-xs text-[#30201B]/80 font-normal leading-relaxed">
                  {RESTAURANT_INFO.fullAddress}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-[#30201B]">
                  <Train className="w-4 h-4 text-[#B8322A] shrink-0" />
                  <span>{RESTAURANT_INFO.metroStation}</span>
                </div>
              </div>

              {/* Direct Maps Link */}
              <div className="pt-4 border-t border-[#E2D3C0]">
                <a
                  href={RESTAURANT_INFO.externalLinks.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] py-3 bg-[#F4EBDD] hover:bg-[#E8D8C5] text-[#30201B] hover:text-[#641F29] border border-[#E2D3C0] hover:border-[#641F29] rounded-lg text-xs tracking-wider uppercase font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <MapPin className="w-4 h-4 text-[#B8322A]" />
                  <span>Open in Google Maps Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Contact Numbers */}
              <div className="pt-4 border-t border-[#E2D3C0] space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#641F29] font-semibold block font-mono">
                  Direct Phone Numbers
                </span>
                <div className="flex flex-col gap-1.5 text-xs">
                  <a
                    href={`tel:${RESTAURANT_INFO.phone}`}
                    className="flex items-center gap-2 text-[#30201B] hover:text-[#641F29] font-mono font-medium transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#B8322A]" />
                    <span>{RESTAURANT_INFO.phone} (Main Desk)</span>
                  </a>
                  <a
                    href={`tel:${RESTAURANT_INFO.secondaryPhone}`}
                    className="flex items-center gap-2 text-[#30201B] hover:text-[#641F29] font-mono font-medium transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#B8322A]" />
                    <span>{RESTAURANT_INFO.secondaryPhone} (Mobile)</span>
                  </a>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="pt-4 border-t border-[#E2D3C0] space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#641F29] font-semibold block font-mono">
                  Operating Hours
                </span>
                <div className="flex items-start gap-2 text-xs text-[#30201B]/80">
                  <Clock className="w-4 h-4 text-[#B8322A] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[#30201B] font-semibold">Lunch: {RESTAURANT_INFO.timings.lunch}</span>
                    <span className="block text-[#30201B] font-semibold">Dinner: {RESTAURANT_INFO.timings.dinner}</span>
                    <span className="text-emerald-700 font-semibold text-[11px] block mt-1">● {RESTAURANT_INFO.timings.days}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Ordering */}
              <div className="pt-4 border-t border-[#E2D3C0] space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#641F29] font-semibold block font-mono">
                  Order Delivery Online
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href={RESTAURANT_INFO.externalLinks.zomato}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] p-2.5 rounded-lg bg-[#F4EBDD] hover:bg-[#E8D8C5] border border-[#E2D3C0] hover:border-[#641F29] text-center text-[#30201B] font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span className="text-[#e23744]">Zomato</span>
                    <ExternalLink className="w-3 h-3 text-[#30201B]/60" />
                  </a>
                  <a
                    href={RESTAURANT_INFO.externalLinks.swiggy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] p-2.5 rounded-lg bg-[#F4EBDD] hover:bg-[#E8D8C5] border border-[#E2D3C0] hover:border-[#641F29] text-center text-[#30201B] font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span className="text-[#fc8019]">Swiggy</span>
                    <ExternalLink className="w-3 h-3 text-[#30201B]/60" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Table Reservation Inquiry Form */}
          <div ref={rightColRef} className="lg:col-span-7 bg-[#FFF9F1] border border-[#E2D3C0] rounded-2xl p-4 xs:p-6 sm:p-8 md:p-10 shadow-sm">
            {!submitted ? (
              <div>
                <div className="mb-6 sm:mb-8">
                  <span className="text-[10px] uppercase tracking-[0.26em] text-[#641F29] font-semibold block mb-1 font-mono">
                    Dining Room Seating
                  </span>
                  <h2 className="font-serif text-xl xs:text-2xl sm:text-3xl font-bold text-[#30201B] tracking-tight">
                    Table Booking Inquiry
                  </h2>
                  <p className="text-xs text-[#30201B]/80 mt-1.5 sm:mt-2 font-normal leading-relaxed">
                    Planning a family gathering, birthday feast, or office lunch in Sakinaka? Send an inquiry directly to our desk. (Inquiry request only; confirmed upon availability).
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-[11px] text-[#30201B]/80 uppercase tracking-wider mb-1 font-mono">
                        Guest Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#F4EBDD] border border-[#E2D3C0] rounded-lg px-3.5 py-2.5 text-sm sm:text-xs text-[#30201B] focus:outline-none focus:border-[#641F29]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#30201B]/80 uppercase tracking-wider mb-1 font-mono">
                        Contact Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#F4EBDD] border border-[#E2D3C0] rounded-lg px-3.5 py-2.5 text-sm sm:text-xs text-[#30201B] focus:outline-none focus:border-[#641F29]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-[11px] text-[#30201B]/80 uppercase tracking-wider mb-1 font-mono">
                        Party Size
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full bg-[#F4EBDD] border border-[#E2D3C0] rounded-lg px-3.5 py-2.5 text-sm sm:text-xs text-[#30201B] focus:outline-none focus:border-[#641F29]"
                      >
                        <option value="2 Guests">2 Guests</option>
                        <option value="4 Guests">4 Guests</option>
                        <option value="6 Guests">6 Guests</option>
                        <option value="8 Guests">8 Guests</option>
                        <option value="10+ Guests">10+ Guests (Large Feast)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#30201B]/80 uppercase tracking-wider mb-1 font-mono">
                        Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-[#F4EBDD] border border-[#E2D3C0] rounded-lg px-3 py-2.5 text-sm sm:text-xs text-[#30201B] focus:outline-none focus:border-[#641F29]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#30201B]/80 uppercase tracking-wider mb-1 font-mono">
                        Time Slot
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-[#F4EBDD] border border-[#E2D3C0] rounded-lg px-3 py-2.5 text-sm sm:text-xs text-[#30201B] focus:outline-none focus:border-[#641F29]"
                      >
                        <option value="12:30">12:30 PM (Lunch)</option>
                        <option value="13:30">1:30 PM (Lunch)</option>
                        <option value="19:30">7:30 PM (Early Dinner)</option>
                        <option value="20:30">8:30 PM (Prime Dinner)</option>
                        <option value="21:30">9:30 PM (Late Dinner)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#30201B]/80 uppercase tracking-wider mb-1 font-mono">
                      Special Requests / Occasion
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Birthday celebration, Jain food requirements, high chair needed..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-[#F4EBDD] border border-[#E2D3C0] rounded-lg px-3.5 py-2.5 text-sm sm:text-xs text-[#30201B] focus:outline-none focus:border-[#641F29]"
                    />
                  </div>

                  <button
                    ref={submitBtnRef}
                    type="submit"
                    className="w-full min-h-[48px] mt-4 py-3.5 bg-[#B8322A] hover:bg-[#862D35] text-white font-semibold text-xs tracking-[0.2em] uppercase rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5 text-white" />
                    <span>Submit Table Inquiry</span>
                  </button>

                  <p className="text-[10px] text-[#30201B]/70 text-center font-mono pt-1">
                    This is an inquiry request. Our Sakinaka front desk coordinates directly by phone.
                  </p>
                </form>
              </div>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#641F29]/10 border border-[#641F29] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-[#641F29]" />
                </div>
                <h3 className="font-serif text-2xl text-[#30201B] font-bold">
                  Table Inquiry Received
                </h3>
                <p className="text-xs text-[#30201B]/80 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#30201B]">{formData.name}</strong>. Your inquiry for a table of <span className="text-[#641F29] font-semibold">{formData.guests}</span> on <span className="text-[#30201B] font-semibold">{formData.date}</span> at <span className="text-[#30201B] font-semibold">{formData.time}</span> has been logged.
                </p>
                <div className="bg-[#F4EBDD] border border-[#E2D3C0] rounded-lg p-3 text-xs text-[#30201B]/80 max-w-sm mx-auto">
                  For immediate assistance, call the Sakinaka desk directly at{' '}
                  <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-[#641F29] underline font-mono font-medium">
                    {RESTAURANT_INFO.phone}
                  </a>.
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-[#E8D8C5] hover:bg-[#E2D3C0] text-xs text-[#30201B] uppercase tracking-wider rounded-lg border border-[#E2D3C0] transition-colors font-medium"
                >
                  Send Another Inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
