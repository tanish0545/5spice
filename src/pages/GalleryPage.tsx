import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, isReducedMotion } from '../animations/gsap-config';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ReservationModal } from '../components/ReservationModal';
import { Sparkles, X, ZoomIn } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  tag: string;
  image: string;
  caption: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Wok Hei Discipline',
    tag: 'Kitchen & Craft',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    caption: 'High-heat flame wok searing at 800°F to produce authentic smoky wok hei.',
  },
  {
    id: 'g-2',
    title: 'Crispy Chilli Potatoes',
    tag: 'Signature Starters',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=1200&q=80',
    caption: 'The cult favorite: crispy hand-cut potatoes tossed in scallions and Sichuan chilli glaze.',
  },
  {
    id: 'g-3',
    title: 'Clay-Pot Style Pot Rice',
    tag: 'Signature Mains',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80',
    caption: 'Generous 1000ml pot rice layered with Asian greens, mushrooms, and savory sauce.',
  },
  {
    id: 'g-4',
    title: 'Sizzling Coastal Chilli Prawns',
    tag: 'Seafood',
    image: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=1200&q=80',
    caption: 'Fresh coastal prawns seared with crushed garlic, red chillies, and dark soya.',
  },
  {
    id: 'g-5',
    title: 'The Rocky Road Extravaganza',
    tag: 'Legendary Desserts',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=1200&q=80',
    caption: 'Towering sundae with fudge, roasted nuts, marshmallows, and walnut brownies.',
  },
  {
    id: 'g-6',
    title: 'Death by Chocolate Truffle Cake',
    tag: 'Legendary Desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80',
    caption: 'Multi-layer Dutch cocoa truffle cake slice crowned with dark chocolate curls.',
  },
  {
    id: 'g-7',
    title: 'Dim Sum & Steamed Delicacies',
    tag: 'Small Plates',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    caption: 'Handcrafted dumplings steamed in bamboo baskets with spicy dipping sauces.',
  },
  {
    id: 'g-8',
    title: 'Dining Room Ambiance',
    tag: 'Sakinaka Atmosphere',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    caption: 'Comfortable, relaxed seating designed for family gatherings and celebrations.',
  },
];

export const GalleryPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState('All');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);
  const [reservationOpen, setReservationOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const lightboxModalRef = useRef<HTMLDivElement>(null);

  const tags = ['All', 'Kitchen & Craft', 'Signature Starters', 'Signature Mains', 'Seafood', 'Legendary Desserts', 'Sakinaka Atmosphere'];

  const filteredItems = selectedTag === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.tag === selectedTag);

  useGSAP(
    () => {
      if (isReducedMotion() || !gridRef.current) return;

      const cards = gridRef.current.querySelectorAll('.gallery-card');
      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 0.45, stagger: 0.04, ease: 'power2.out' }
      );
    },
    { scope: gridRef, dependencies: [selectedTag] }
  );

  // Cinematic GSAP entrance for the photo lightbox modal
  useGSAP(
    () => {
      if (activePhoto && lightboxModalRef.current && !isReducedMotion()) {
        gsap.fromTo(
          lightboxModalRef.current,
          { opacity: 0, scale: 0.92, y: 16 },
          { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power3.out' }
        );
      }
    },
    { dependencies: [activePhoto] }
  );

  return (
    <div className="min-h-screen bg-[#F4EBDD] text-[#30201B] selection:bg-[#641F29] selection:text-[#FFF9F1]">
      <Header onOpenReservation={() => setReservationOpen(true)} />

      {/* Hero Banner */}
      <section className="pt-32 pb-12 px-4 sm:px-6 md:px-12 bg-[#F4EBDD] border-b border-[#E2D3C0] text-center">
        <div className="max-w-4xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8D8C5] border border-[#E2D3C0] text-[10px] tracking-[0.24em] uppercase text-[#641F29] font-semibold font-mono shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#B8322A]" />
            <span>Visual Gastronomy &amp; Atmosphere</span>
          </div>

          <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-[#30201B] tracking-tight">
            5 Spice Visual Gallery
          </h1>

          <p className="text-[#30201B]/80 text-xs sm:text-sm max-w-xl mx-auto font-normal leading-relaxed">
            Illustrative culinary photography capturing the sizzle of high-heat woks, our cult starters, colossal sharing bowls, and decadent sundaes.
          </p>

          {/* Filter Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTag(t)}
                className={`min-h-[36px] px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                  selectedTag === t
                    ? 'bg-[#641F29] text-white font-bold shadow-sm'
                    : 'bg-[#FFF9F1] text-[#30201B]/80 hover:text-[#30201B] border border-[#E2D3C0] shadow-sm'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-14 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="gallery-card group relative bg-[#FFF9F1] border border-[#E2D3C0] rounded-2xl overflow-hidden hover:border-[#641F29]/60 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            >
              <div className="relative h-72 overflow-hidden bg-[#E8D8C5]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-md bg-[#FFF9F1]/95 backdrop-blur-md border border-[#E2D3C0] text-[10px] uppercase tracking-wider text-[#641F29] font-semibold shadow-sm font-mono">
                    {item.tag}
                  </span>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="p-2 rounded-full bg-black/60 text-white backdrop-blur-sm inline-flex">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <h3 className="font-serif text-lg font-bold text-white tracking-wide mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-200 font-light leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full-Screen Photo Lightbox */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setActivePhoto(null)}
        >
          <div
            ref={lightboxModalRef}
            className="relative max-w-4xl w-full max-h-[92vh] overflow-y-auto bg-[#FFF9F1] rounded-2xl border border-[#E2D3C0] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors shadow-md"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative max-h-[65vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="max-h-[65vh] w-full object-contain"
              />
            </div>
            <div className="p-4 xs:p-6 bg-[#FFF9F1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#641F29] font-semibold">
                  {activePhoto.tag}
                </span>
                <h3 className="font-serif text-lg xs:text-xl font-bold text-[#30201B]">
                  {activePhoto.title}
                </h3>
                <p className="text-xs text-[#30201B]/70 mt-1">{activePhoto.caption}</p>
              </div>
              <button
                onClick={() => {
                  setActivePhoto(null);
                  setReservationOpen(true);
                }}
                className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 bg-[#B8322A] hover:bg-[#862D35] text-white text-xs uppercase tracking-wider font-semibold rounded-lg shrink-0 transition-colors flex items-center justify-center"
              >
                Book Table Experience
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer & Reservation */}
      <Footer />

      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
        restaurantName="5 Spice (Sakinaka Outlet)"
      />
    </div>
  );
};
