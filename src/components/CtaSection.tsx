import React from 'react';
import { ArrowRight, MessageSquare, Sparkles, ShieldCheck, MapPin } from 'lucide-react';

interface CtaSectionProps {
  onOpenQuote: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenQuote }) => {
  return (
    <section className="relative py-32 md:py-48 bg-[#071A3D] text-white overflow-hidden">
      {/* Dynamic Animated Gradient Aura (Climax Lighting) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Central Royal Blue Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] bg-gradient-to-r from-[#2457FF]/40 via-[#6EDBFF]/25 to-[#2457FF]/30 blur-[130px] animate-slow-blob-1" />

        {/* Ambient Corner Blooms */}
        <div className="absolute -top-20 -left-20 w-[450px] h-[450px] bg-[#6EDBFF]/20 rounded-full blur-[100px] animate-slow-blob-2" />
        <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] bg-[#2457FF]/30 rounded-full blur-[110px] animate-slow-blob-3" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#6EDBFF]/30 text-[#6EDBFF] text-xs font-mono tracking-widest uppercase mb-10 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Lagos Studio & Industrial Press</span>
        </div>

        {/* Headline: "READY TO MAKE YOUR BRAND STAND OUT?" */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-black tracking-tight leading-[1.05] text-white text-balance">
          READY TO MAKE YOUR BRAND{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#B8F3FF] to-[#6EDBFF]">
            STAND OUT?
          </span>
        </h2>

        {/* Supporting Copy */}
        <p className="mt-6 sm:mt-8 max-w-2xl mx-auto text-base sm:text-xl text-[#B8F3FF]/90 font-normal leading-relaxed text-balance">
          Tell us what you're working on and let's create something worth remembering.
        </p>

        {/* Interactive Action */}
        <div className="mt-12 flex items-center justify-center">
          <a
            href="https://wa.me/2348023456789?text=Hello%20Iceberg%20Digital%20Media,%20I'm%20ready%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 text-base font-bold text-[#071A3D] bg-gradient-to-r from-white via-[#F5F9FF] to-[#B8F3FF] rounded-xl shadow-xl shadow-[#6EDBFF]/20 hover:shadow-2xl hover:shadow-[#6EDBFF]/35 hover:-translate-y-1 active:translate-y-0 transition-all duration-200"
          >
            <MessageSquare className="w-5 h-5 text-[#2457FF]" />
            <span>Chat on WhatsApp</span>
            <ArrowRight className="w-4 h-4 text-[#071A3D] transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Trust Markers */}
        <div className="mt-16 pt-10 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 text-xs text-[#B8F3FF]/80 font-mono">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#6EDBFF]" />
            <span>Prepress File Verification Included</span>
          </span>
          <span className="text-white/20">/</span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#6EDBFF]" />
            <span>Somolu, Lagos Industrial Production Facility</span>
          </span>
          <span className="text-white/20">/</span>
          <span>Fast Nationwide Shipping</span>
        </div>
      </div>
    </section>
  );
};
