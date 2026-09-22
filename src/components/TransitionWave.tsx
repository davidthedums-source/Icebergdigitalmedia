import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface TransitionWaveProps {
  onOpenQuote: () => void;
}

export const TransitionWave: React.FC<TransitionWaveProps> = ({ onOpenQuote }) => {
  return (
    <section className="relative py-28 md:py-36 bg-[#071A3D] text-white overflow-hidden">
      {/* Animated slow-moving cyan/blue gradient waves across background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Continuous moving gradient wave 1 */}
        <div className="absolute -inset-[50%] opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2457FF]/60 via-[#6EDBFF]/20 to-transparent animate-slow-blob-1" />

        {/* Continuous moving gradient wave 2 */}
        <div className="absolute -inset-[40%] opacity-35 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#6EDBFF]/50 via-[#00A3FF]/20 to-transparent animate-slow-blob-2" />

        {/* Subtle SVG Wave lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-15"
          preserveAspectRatio="none"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100 300 C 300 150, 600 450, 1000 220 C 1200 120, 1400 350, 1600 280"
            stroke="url(#gradient-line-1)"
            strokeWidth="2.5"
            strokeDasharray="6 6"
          />
          <path
            d="M-100 400 C 250 220, 700 500, 1100 300 C 1300 200, 1500 400, 1600 350"
            stroke="url(#gradient-line-2)"
            strokeWidth="1.5"
          />
          <defs>
            <linearGradient id="gradient-line-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2457FF" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#6EDBFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#B8F3FF" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="gradient-line-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6EDBFF" stopOpacity="0.1" />
              <stop offset="70%" stopColor="#2457FF" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#6EDBFF]/20 text-[#6EDBFF] text-xs font-mono tracking-wider mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PRODUCTION PHILOSOPHY</span>
        </div>

        {/* Large White Typography */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] text-white text-balance">
          YOUR BRAND HAS A STORY.{' '}
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#B8F3FF] to-[#6EDBFF]">
            MAKE IT VISIBLE.
          </span>
        </h2>

        <p className="mt-6 sm:mt-8 max-w-2xl mx-auto text-base sm:text-lg text-white/75 font-normal leading-relaxed text-balance">
          In a world crowded with fleeting digital noise, substantial tactile branding anchors your business in physical memory. We craft print that commands respect.
        </p>

        {/* Small Elegant Button: "Let's Build It →" */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={onOpenQuote}
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#071A3D] bg-gradient-to-r from-white via-[#F5F9FF] to-[#B8F3FF] hover:to-[#6EDBFF] rounded-xl shadow-lg shadow-[#6EDBFF]/20 hover:shadow-xl hover:shadow-[#6EDBFF]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            <span>Let's Build It</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
