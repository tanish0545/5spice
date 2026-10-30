import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Utensils, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4EBDD] text-[#30201B] selection:bg-[#641F29] selection:text-[#FFF9F1] flex flex-col justify-between">
      <Header />
      <div className="pt-40 pb-24 px-6 text-center max-w-xl mx-auto space-y-6">
        <span className="font-mono text-5xl font-bold text-[#641F29] block">404</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#30201B]">
          Page Not Found
        </h1>
        <p className="text-[#30201B]/80 text-xs sm:text-sm font-normal leading-relaxed">
          The dish or page you are looking for is not on our Sakinaka menu. Please return to our home page or explore our digital menu.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 bg-[#B8322A] hover:bg-[#862D35] text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
            <span>Return to 5 Spice Home</span>
          </Link>
          <Link
            to="/menu"
            className="w-full sm:w-auto px-6 py-3 bg-[#FFF9F1] border border-[#E2D3C0] text-[#30201B] hover:text-[#641F29] hover:border-[#641F29] text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm font-medium"
          >
            <Utensils className="w-4 h-4 text-[#641F29]" />
            <span>View Full Menu (₹)</span>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};
