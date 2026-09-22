import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Layers, Box, CheckCircle, ShieldCheck } from 'lucide-react';
import { FLOATING_CARDS } from '../data/content';

interface HeroProps {
  onOpenQuote: (serviceCategory?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote }) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 28;
      const y = (e.clientY / innerHeight - 0.5) * 28;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[96vh] pt-32 pb-24 md:pt-40 md:pb-32 flex items-center justify-center overflow-hidden bg-[#F5F9FF]"
    >
      {/* 1. Large Animated Slow-Moving Blue & Cyan Gradient Blobs in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Deep navy to royal blue blob */}
        <div
          className="absolute -top-[15%] left-[10%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#2457FF]/20 via-[#6EDBFF]/25 to-transparent blur-[90px] animate-slow-blob-1"
        />
        {/* Soft cyan blob */}
        <div
          className="absolute top-[35%] -right-[10%] w-[650px] h-[650px] rounded-full bg-gradient-to-bl from-[#B8F3FF]/45 via-[#6EDBFF]/20 to-transparent blur-[110px] animate-slow-blob-2"
        />
        {/* Subtle ice blue bottom blob */}
        <div
          className="absolute -bottom-[20%] left-[25%] w-[600px] h-[600px] rounded-full bg-gradient-to-t from-[#2457FF]/15 via-[#B8F3FF]/30 to-transparent blur-[100px] animate-slow-blob-3"
        />

        {/* Subtle geometric lines & dots floating in the background */}
        <div className="absolute top-1/4 left-[8%] w-16 h-16 border border-[#2457FF]/15 rounded-lg rotate-12 animate-float-1" />
        <div className="absolute bottom-1/3 right-[12%] w-20 h-20 border border-[#6EDBFF]/25 rounded-full animate-float-2" />
        <div className="absolute top-1/3 right-[22%] w-3 h-3 bg-[#2457FF]/30 rounded-full animate-float-3" />
        <div className="absolute bottom-1/4 left-[18%] w-2 h-2 bg-[#6EDBFF]/50 rounded-full animate-float-1" />
      </div>

      {/* 2. Floating Visual System (Behind / Around Content) */}
      <div className="absolute inset-0 pointer-events-none hidden xl:block max-w-[1500px] mx-auto">
        {/* Card 1: Business Card - Top Left */}
        <div
          style={{
            transform: `translate(${mouseOffset.x * -0.9}px, ${mouseOffset.y * -0.9}px) rotate(-6deg)`,
            transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="absolute top-[16%] left-[2%] w-64 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl shadow-[#071A3D]/8 border border-white/90 animate-float-1"
        >
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <span className="text-[10px] font-mono tracking-widest text-[#2457FF] uppercase font-semibold">600GSM DUPLEX</span>
            <div className="w-2.5 h-2.5 rounded-full bg-[#2457FF] shadow-xs shadow-[#2457FF]/50"></div>
          </div>
          <div className="pt-4 space-y-1.5">
            <div className="text-xs font-bold text-[#071A3D] tracking-tight">ICEBERG EXECUTIVE</div>
            <div className="text-[10px] text-neutral-500">Letterpress Foil Stamped</div>
            <div className="pt-2 flex items-center gap-1.5">
              <span className="h-1 w-12 bg-gradient-to-r from-[#2457FF] to-[#6EDBFF] rounded-full"></span>
              <span className="text-[9px] text-[#2457FF] font-medium">Cobalt Bevel Edge</span>
            </div>
          </div>
        </div>

        {/* Card 2: Rigid Packaging - Top Right */}
        <div
          style={{
            transform: `translate(${mouseOffset.x * 1.1}px, ${mouseOffset.y * 1.1}px) rotate(7deg)`,
            transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="absolute top-[12%] right-[3%] w-72 bg-gradient-to-br from-[#071A3D] to-[#122B5C] rounded-2xl p-5 shadow-2xl shadow-[#071A3D]/25 border border-[#6EDBFF]/20 animate-float-2 text-white"
        >
          <div className="flex items-center justify-between text-xs text-[#6EDBFF]">
            <span className="flex items-center gap-1">
              <Box className="w-3.5 h-3.5 text-[#6EDBFF]" />
              <span className="font-mono text-[10px]">RIGID LUXURY BOX</span>
            </span>
            <span className="text-[9px] bg-[#2457FF]/40 border border-[#6EDBFF]/30 px-2 py-0.5 rounded-md">1200gsm</span>
          </div>
          <div className="mt-3 text-sm font-semibold tracking-wide text-white">
            Aura Botanics Luxury Unboxing
          </div>
          <p className="mt-1 text-[11px] text-[#B8F3FF]/80">
            Precision die-cut EVA foam & hot silver foil stamping
          </p>
          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-[#6EDBFF]">
            <span>Lagos Batch #084</span>
            <span className="font-mono">Magnetic Seal</span>
          </div>
        </div>

        {/* Card 3: Swiss Flyer / Editorial - Bottom Left */}
        <div
          style={{
            transform: `translate(${mouseOffset.x * -0.7}px, ${mouseOffset.y * -0.7}px) rotate(4deg)`,
            transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="absolute bottom-[16%] left-[4%] w-60 bg-white/92 backdrop-blur-md rounded-2xl p-4 shadow-xl shadow-[#071A3D]/8 border border-white/90 animate-float-3"
        >
          <div className="text-[9px] font-mono uppercase text-[#071A3D]/60 tracking-wider">Editorial Print</div>
          <div className="text-xs font-bold text-[#071A3D] mt-1">Swiss Typographic Brochure</div>
          <div className="mt-2 space-y-1">
            <div className="h-1.5 w-full bg-[#F5F9FF] rounded-xs border border-neutral-100"></div>
            <div className="h-1.5 w-4/5 bg-[#F5F9FF] rounded-xs border border-neutral-100"></div>
            <div className="h-1.5 w-3/5 bg-gradient-to-r from-[#2457FF]/30 to-[#6EDBFF]/30 rounded-xs"></div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[9px] text-[#2457FF] font-medium">
            <span>250gsm Silk Finish</span>
            <span>Offset 4-Color</span>
          </div>
        </div>

        {/* Card 4: Product Label - Bottom Right */}
        <div
          style={{
            transform: `translate(${mouseOffset.x * 0.9}px, ${mouseOffset.y * 0.9}px) rotate(-6deg)`,
            transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="absolute bottom-[14%] right-[5%] w-64 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl shadow-[#071A3D]/8 border border-white/80 animate-float-1"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#2457FF] to-[#6EDBFF] flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#071A3D]">BOPP Metallic Label</div>
              <div className="text-[10px] text-neutral-500">Waterproof & Oil-Resistant</div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[9px] font-mono text-[#071A3D]/70 bg-[#F5F9FF] p-2 rounded-lg border border-neutral-100">
            <span>HOLOGRAPHIC FOIL</span>
            <span className="text-[#2457FF] font-bold">100% BOND</span>
          </div>
        </div>

        {/* Card 5: Large Format Display - Middle Left */}
        <div
          style={{
            transform: `translate(${mouseOffset.x * -0.5}px, ${mouseOffset.y * -0.5}px) rotate(-3deg)`,
            transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="absolute top-[48%] left-[1%] w-56 bg-gradient-to-r from-white to-[#F5F9FF] backdrop-blur-md rounded-xl p-3 shadow-lg shadow-[#071A3D]/5 border border-white/80 animate-float-2"
        >
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-[#2457FF]" />
            <span className="text-[10px] font-mono font-bold text-[#071A3D]">1440DPI LARGE FORMAT</span>
          </div>
          <p className="text-[10px] text-neutral-600 mt-1">Non-glare stretch fabric display systems</p>
        </div>

        {/* Card 6: Shopping Bag - Middle Right */}
        <div
          style={{
            transform: `translate(${mouseOffset.x * 0.6}px, ${mouseOffset.y * 0.6}px) rotate(4deg)`,
            transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="absolute top-[46%] right-[2%] w-56 bg-white/95 rounded-xl p-3 shadow-lg shadow-[#071A3D]/5 border border-white/90 animate-float-3"
        >
          <div className="flex items-center justify-between text-[10px] font-bold text-[#071A3D]">
            <span>RETAIL TOTE BAG</span>
            <span className="text-[#2457FF]">250gsm Kraft</span>
          </div>
          <p className="text-[10px] text-neutral-500 mt-1">Grosgrain knotted handles & blind deboss</p>
        </div>
      </div>

      {/* 3. Main Center Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center">
        {/* Kicker Tag */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 border border-[#2457FF]/15 shadow-xs mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#2457FF]"></span>
          <span className="text-xs font-semibold text-[#071A3D] tracking-wide">
            PREMIUM PRINT & BRAND PRODUCTION · SOMOLU, LAGOS
          </span>
        </motion.div>

        {/* Main Headline: "WE MAKE BRANDS IMPOSSIBLE TO IGNORE." */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-black tracking-tight text-[#071A3D] leading-[1.04] text-balance"
        >
          WE MAKE{' '}
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2457FF] via-[#00A3FF] to-[#6EDBFF]">
              BRANDS
            </span>
          </span>{' '}
          IMPOSSIBLE TO{' '}
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#071A3D] via-[#2457FF] to-[#6EDBFF]">
              IGNORE.
            </span>
          </span>
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#081426]/80 leading-relaxed font-normal text-balance"
        >
          From premium printing and packaging to powerful brand visuals, Iceberg Digital Media helps businesses turn ideas into experiences people remember.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
        >
          <button
            onClick={() => onOpenQuote()}
            className="group w-full sm:w-auto relative inline-flex items-center justify-center gap-3 px-8 py-4 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-[#071A3D] via-[#2457FF] to-[#2457FF] rounded-xl shadow-lg shadow-[#2457FF]/25 hover:shadow-xl hover:shadow-[#2457FF]/35 hover:-translate-y-1 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
          </button>

          <a
            href="#portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 text-sm sm:text-base font-semibold text-[#071A3D] bg-white/80 hover:bg-white rounded-xl border border-[#071A3D]/10 hover:border-[#2457FF]/30 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            Explore Our Work
          </a>
        </motion.div>

        {/* Quiet Trust Bar Under Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-14 pt-8 border-t border-[#071A3D]/8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#081426]/70 font-medium"
        >
          <a href="#live-workshop" className="flex items-center gap-1.5 hover:text-[#2457FF] transition-colors group">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="underline decoration-emerald-400/40 underline-offset-4 group-hover:decoration-emerald-500">Live Press Floor Feeds</span>
          </a>
          <span className="hidden sm:inline text-neutral-300">·</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-[#2457FF]" />
            <span>Somolu Industrial Production Hub</span>
          </span>
          <span className="hidden sm:inline text-neutral-300">·</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2457FF]" />
            <span>Pantone Color Fidelity Guaranteed</span>
          </span>
          <span className="hidden sm:inline text-neutral-300">·</span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#2457FF]" />
            <span>48hr Express Dispatch Across Nigeria</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
};
