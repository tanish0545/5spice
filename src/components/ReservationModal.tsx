import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, Users, Clock, CheckCircle2, Sparkles, Phone } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap, isReducedMotion } from '../animations/gsap-config';
import { stopLenis, startLenis } from '../animations/smooth-scroll';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantName?: string;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  restaurantName = '5 Spice (Sakinaka Outlet)',
}) => {
  const modalBoxRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [refCode, setRefCode] = useState('');
  const [formData, setFormData] = useState(() => ({
    date: new Date().toISOString().split('T')[0],
    time: '20:00',
    guests: '4 Guests (Family Table)',
    seating: 'Main Dining Hall',
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  }));

  useEffect(() => {
    if (isOpen) {
      stopLenis();
      return () => {
        startLenis();
      };
    }
  }, [isOpen]);

  useGSAP(
    () => {
      if (isOpen && modalBoxRef.current && !isReducedMotion()) {
        gsap.fromTo(
          modalBoxRef.current,
          { opacity: 0, scale: 0.92, y: 16 },
          { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power3.out' }
        );
      }
    },
    { dependencies: [isOpen, step] }
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRefCode(`5SP-${Math.floor(100000 + Math.random() * 900000)}`);
    setStep('success');
  };

  const handleReset = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
      <div
        ref={modalBoxRef}
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-[#30201B] border border-[#3D2A24] rounded-2xl shadow-2xl p-4 xs:p-6 md:p-8 text-[#FFF9F1]"
      >
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-[#E8D8C5]/70 hover:text-[#FFF9F1] transition-colors p-2"
          aria-label="Close table reservation window"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="mb-5 sm:mb-6 text-center">
              <span className="text-[10px] tracking-[0.2em] text-[#B77B4A] uppercase font-semibold block mb-1 font-mono">
                Table Booking • Sakinaka Outlet
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#FFF9F1] font-bold tracking-tight">
                Table Reservation Inquiry
              </h3>
              <p className="text-xs text-[#E8D8C5]/75 mt-1">
                {restaurantName} • Lunch (12:00 PM – 3:30 PM) &amp; Dinner (7:00 PM – 11:30 PM)
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#E8D8C5] uppercase tracking-wider mb-1 flex items-center gap-1 font-medium font-mono">
                    <Calendar className="w-3 h-3 text-[#B8322A]" /> Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#17110F] border border-[#3D2A24] rounded-lg px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-[#FFF9F1] focus:outline-none focus:border-[#B77B4A]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#E8D8C5] uppercase tracking-wider mb-1 flex items-center gap-1 font-medium font-mono">
                    <Clock className="w-3 h-3 text-[#B8322A]" /> Preferred Time
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-[#17110F] border border-[#3D2A24] rounded-lg px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-[#FFF9F1] focus:outline-none focus:border-[#B77B4A]"
                  >
                    <optgroup label="Lunch Hours">
                      <option value="12:30">12:30 PM - Lunch Seating</option>
                      <option value="13:15">1:15 PM - Afternoon Lunch</option>
                      <option value="14:00">2:00 PM - Midday Dining</option>
                      <option value="14:45">2:45 PM - Late Lunch</option>
                    </optgroup>
                    <optgroup label="Dinner Hours">
                      <option value="19:15">7:15 PM - Early Dinner</option>
                      <option value="20:00">8:00 PM - Prime Family Dining</option>
                      <option value="20:45">8:45 PM - Peak Evening</option>
                      <option value="21:30">9:30 PM - Dinner Seating</option>
                      <option value="22:15">10:15 PM - Late Night Dining</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#E8D8C5] uppercase tracking-wider mb-1 flex items-center gap-1 font-medium font-mono">
                    <Users className="w-3 h-3 text-[#B8322A]" /> Guests
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-[#17110F] border border-[#3D2A24] rounded-lg px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-[#FFF9F1] focus:outline-none focus:border-[#B77B4A]"
                  >
                    <option value="2 Guests">2 Guests (Couple Table)</option>
                    <option value="4 Guests (Family Table)">4 Guests (Family Table)</option>
                    <option value="6 Guests (Large Table)">6 Guests (Large Table)</option>
                    <option value="8+ Guests (Celebration Party)">8+ Guests (Celebration Party)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-[#E8D8C5] uppercase tracking-wider mb-1 font-medium font-mono">
                    Preferred Area
                  </label>
                  <select
                    value={formData.seating}
                    onChange={(e) => setFormData({ ...formData, seating: e.target.value })}
                    className="w-full bg-[#17110F] border border-[#3D2A24] rounded-lg px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-[#FFF9F1] focus:outline-none focus:border-[#B77B4A]"
                  >
                    <option value="Main Dining Hall">Main Dining Hall</option>
                    <option value="Family Alcove">Family Alcove</option>
                    <option value="Private Banquet Section">Private Banquet Section</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#E8D8C5] uppercase tracking-wider mb-1 font-medium font-mono">
                  Guest Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#17110F] border border-[#3D2A24] rounded-lg px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-[#FFF9F1] focus:outline-none focus:border-[#B77B4A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-[#E8D8C5] uppercase tracking-wider mb-1 font-medium font-mono">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#17110F] border border-[#3D2A24] rounded-lg px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-[#FFF9F1] focus:outline-none focus:border-[#B77B4A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#E8D8C5] uppercase tracking-wider mb-1 font-medium font-mono">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#17110F] border border-[#3D2A24] rounded-lg px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-[#FFF9F1] focus:outline-none focus:border-[#B77B4A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#E8D8C5] uppercase tracking-wider mb-1 font-medium font-mono">
                  Celebration / Dietary Notes
                </label>
                <input
                  type="text"
                  placeholder="e.g. Birthday celebration, Jain preparation, high chair needed"
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full bg-[#17110F] border border-[#3D2A24] rounded-lg px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-[#FFF9F1] focus:outline-none focus:border-[#B77B4A]"
                />
              </div>

              <button
                type="submit"
                className="w-full min-h-[48px] mt-4 py-3.5 bg-[#B8322A] hover:bg-[#862D35] text-white font-semibold text-xs tracking-[0.16em] uppercase rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Submit Reservation Request</span>
              </button>

              <div className="text-center pt-1">
                <a
                  href="tel:+912228562186"
                  className="min-h-[44px] inline-flex items-center justify-center gap-1.5 text-[11px] text-[#E8D8C5]/70 hover:text-[#B77B4A] transition-colors font-mono py-1"
                >
                  <Phone className="w-3 h-3 text-[#B8322A]" />
                  Need immediate confirmation? Call +91 22 28562186
                </a>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#FFF9F1] font-bold">
              Reservation Request Received
            </h3>
            <p className="text-xs text-[#E8D8C5]/80 max-w-sm mx-auto leading-relaxed">
              Your request for <strong className="text-[#FFF9F1]">{formData.name}</strong> for{' '}
              <span className="text-[#B77B4A] font-semibold">{formData.guests}</span> on{' '}
              <span className="text-[#FFF9F1] font-semibold">{formData.date}</span> at{' '}
              <span className="text-[#FFF9F1] font-semibold">{formData.time}</span> has been logged for{' '}
              <strong className="text-[#FFF9F1]">{restaurantName}</strong>.
            </p>
            <div className="bg-[#17110F] border border-[#3D2A24] rounded-xl p-3.5 text-xs text-[#E8D8C5]/80">
              Reference code: <span className="text-[#B77B4A] font-mono font-bold tracking-widest">{refCode}</span>
              <p className="text-[11px] text-[#E8D8C5]/60 mt-1.5">
                Our Sakinaka host will confirm table availability via phone/SMS shortly before your seating time.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
              <a
                href="tel:+912228562186"
                className="min-h-[44px] px-5 py-2.5 bg-[#B8322A] text-white font-semibold text-xs tracking-wider uppercase rounded-lg hover:bg-[#862D35] transition-colors inline-flex items-center justify-center gap-2 shadow-sm font-mono"
              >
                <Phone className="w-3.5 h-3.5" /> Call Sakinaka Host
              </a>
              <button
                onClick={handleReset}
                className="min-h-[44px] px-5 py-2.5 bg-[#17110F] hover:bg-[#17110F]/80 text-[#FFF9F1] border border-[#3D2A24] text-xs tracking-wider uppercase rounded-lg transition-colors font-semibold"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
