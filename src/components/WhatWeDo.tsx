import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Printer, Sparkles, Monitor, Layers, Box, Check } from 'lucide-react';

interface WhatWeDoProps {
  onOpenQuote: (serviceCategory?: string) => void;
}

export const WhatWeDo: React.FC<WhatWeDoProps> = ({ onOpenQuote }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const pillars = [
    {
      id: 'print',
      title: 'PRINT',
      tagline: 'Tactile Physical Precision',
      description: 'Business cards, flyers, brochures, banners and large-format printing.',
      items: [
        'Ultra-thick cotton duplex cards (up to 700gsm)',
        'Spot UV, hot-stamped gold & holographic foil',
        'Large format architectural wraps & tension fabric',
        'Precision die-cut brochures and lookbooks',
      ],
      icon: Printer,
      gradientBg: 'from-[#071A3D] via-[#102B66] to-[#2457FF]',
      borderGlow: 'hover:border-[#6EDBFF]/50',
      badge: 'Offset & Digital',
      quoteCategory: 'print',
      mockupDetails: {
        specs: ['Heidelberg XL 75', 'Pantone Plus Series', 'ISO 12647-2 Certified'],
        highlight: 'Sub-millimeter bleed & trimming alignment',
      },
    },
    {
      id: 'brand',
      title: 'BRAND',
      tagline: 'Enduring Identity Systems',
      description: 'Corporate identity, packaging, signage and branded materials.',
      items: [
        'Luxury rigid magnetic boxes & folding cartons',
        'Waterproof BOPP beverage & cosmetic labels',
        'Architectural signage, 3D acrylic & brass totems',
        'Executive gift sets and bespoke packaging mailers',
      ],
      icon: Box,
      gradientBg: 'from-[#102B66] via-[#2457FF] to-[#6EDBFF]',
      borderGlow: 'hover:border-[#B8F3FF]/60',
      badge: 'Structural Packaging',
      quoteCategory: 'brand',
      mockupDetails: {
        specs: ['Custom CAD Dielines', 'Kurz Foil Stamping', 'Zero-Rattle Foam Trays'],
        highlight: 'Tactile unboxing engineered to be photographed',
      },
    },
    {
      id: 'digital',
      title: 'DIGITAL',
      tagline: 'Pixel-Perfect Content',
      description: 'Social media graphics, promotional designs and digital content.',
      items: [
        'High-converting product campaign visuals',
        'Investor pitch decks & corporate presentation decks',
        '3D photorealistic packaging render sets',
        'Print-ready vector prepress artwork conversion',
      ],
      icon: Monitor,
      gradientBg: 'from-[#071A3D] via-[#1A3675] to-[#7928CA]',
      borderGlow: 'hover:border-[#6EDBFF]/50',
      badge: 'Campaign & 3D',
      quoteCategory: 'digital',
      mockupDetails: {
        specs: ['High-DPI Vector Masters', '3D Blender Renders', 'Cross-Platform Exports'],
        highlight: 'Seamless harmony between physical print and screen',
      },
    },
  ];

  return (
    <section id="what-we-do" className="relative py-28 md:py-36 bg-[#F5F9FF] border-t border-[#071A3D]/5 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-gradient-to-r from-[#2457FF]/8 via-[#6EDBFF]/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#2457FF] font-semibold">
            Capabilities & Disciplines
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#071A3D] leading-none">
            PRINT. BRAND. IMPRESS.
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-[#081426]/75 font-normal leading-relaxed text-balance">
            Everything you need to make your business look as good as the work you do.
          </p>
        </div>

        {/* 3 Enormous Interactive Cards */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isHovered = hoveredCard === idx;

            return (
              <div
                key={pillar.id}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative rounded-3xl p-8 sm:p-10 transition-all duration-500 flex flex-col justify-between overflow-hidden cursor-pointer ${
                  isHovered
                    ? 'scale-[1.02] shadow-2xl shadow-[#071A3D]/20 text-white'
                    : 'bg-white shadow-xl shadow-[#071A3D]/5 text-[#081426] border border-[#071A3D]/6'
                }`}
                onClick={() => onOpenQuote(pillar.quoteCategory)}
              >
                {/* Dynamic Gradient Layer */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${pillar.gradientBg} transition-opacity duration-500 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Subtle Decorative Mesh in Card */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

                {/* Card Top Zone */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-mono uppercase px-3 py-1 rounded-full transition-colors duration-300 ${
                        isHovered
                          ? 'bg-white/15 text-[#B8F3FF] border border-white/20'
                          : 'bg-[#F5F9FF] text-[#2457FF] border border-[#2457FF]/15'
                      }`}
                    >
                      {pillar.badge}
                    </span>

                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isHovered
                          ? 'bg-white/20 text-white shadow-md'
                          : 'bg-[#F5F9FF] text-[#071A3D]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className={`mt-8 text-3xl sm:text-4xl font-black tracking-tight transition-colors duration-300 ${
                      isHovered ? 'text-white' : 'text-[#071A3D]'
                    }`}
                  >
                    {pillar.title}
                  </h3>
                  <div
                    className={`text-xs font-semibold uppercase tracking-wider mt-1 transition-colors duration-300 ${
                      isHovered ? 'text-[#B8F3FF]' : 'text-[#2457FF]'
                    }`}
                  >
                    {pillar.tagline}
                  </div>

                  <p
                    className={`mt-4 text-sm sm:text-base leading-relaxed transition-colors duration-300 ${
                      isHovered ? 'text-white/90' : 'text-[#081426]/75'
                    }`}
                  >
                    {pillar.description}
                  </p>

                  {/* Feature Checkpoints */}
                  <div className="mt-8 space-y-2.5 pt-6 border-t border-current/10">
                    {pillar.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 transition-colors ${
                            isHovered ? 'text-[#6EDBFF]' : 'text-[#2457FF]'
                          }`}
                        />
                        <span className={isHovered ? 'text-white/90' : 'text-[#081426]/80'}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom: Animated Action & Specifications */}
                <div className="relative z-10 mt-10 pt-6 border-t border-current/10 flex items-center justify-between">
                  <div>
                    <span
                      className={`text-[11px] font-mono block transition-colors ${
                        isHovered ? 'text-[#B8F3FF]' : 'text-neutral-500'
                      }`}
                    >
                      {pillar.mockupDetails.highlight}
                    </span>
                    <span
                      className={`text-xs font-bold transition-colors ${
                        isHovered ? 'text-white' : 'text-[#071A3D]'
                      }`}
                    >
                      Configure & Request Sample
                    </span>
                  </div>

                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isHovered
                        ? 'bg-white text-[#071A3D] translate-x-1 rotate-45 shadow-lg'
                        : 'bg-[#F5F9FF] text-[#2457FF]'
                    }`}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
