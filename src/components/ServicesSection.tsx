import React, { useState } from 'react';
import { ArrowRight, Check, Layers, Sparkles, Clock, PackageCheck } from 'lucide-react';
import { SERVICES_LIST } from '../data/content';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeRow, setActiveRow] = useState<string | null>(null);

  return (
    <section id="services" className="py-28 md:py-36 bg-white text-[#081426] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-[#2457FF] font-semibold">
            Catalog of Capabilities
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#071A3D] leading-tight text-balance">
            Everything your brand needs to show up professionally.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600">
            Engineered with industrial precision in Somolu, Lagos. Hover over any service to preview finishing capabilities, or click to configure specifications.
          </p>
        </div>

        {/* Elegant Service Rows */}
        <div className="border-t border-[#071A3D]/10">
          {SERVICES_LIST.map((service) => {
            const isHovered = activeRow === service.id;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveRow(service.id)}
                onMouseLeave={() => setActiveRow(null)}
                onClick={() => onSelectService(service)}
                className={`group relative border-b border-[#071A3D]/10 transition-all duration-300 cursor-pointer overflow-hidden ${
                  isHovered
                    ? 'bg-gradient-to-r from-[#F5F9FF] via-[#EBF3FF] to-[#F5F9FF] py-9 px-6 sm:px-8 rounded-2xl shadow-md border-transparent my-2'
                    : 'py-7 sm:py-8 px-2 sm:px-4'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Number & Title */}
                  <div className="flex items-baseline gap-6 sm:gap-10">
                    <span
                      className={`font-mono transition-all duration-300 ${
                        isHovered
                          ? 'text-2xl sm:text-3xl font-bold text-[#2457FF] scale-110'
                          : 'text-lg sm:text-xl font-medium text-neutral-400'
                      }`}
                    >
                      {service.number}
                    </span>

                    <div>
                      <div className="flex items-center gap-3">
                        <h3
                          className={`text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-200 ${
                            isHovered ? 'text-[#071A3D]' : 'text-[#081426]'
                          }`}
                        >
                          {service.title}
                        </h3>

                        {/* Subtle category tag */}
                        <span
                          className={`hidden sm:inline-block text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full transition-opacity ${
                            isHovered ? 'bg-[#2457FF]/10 text-[#2457FF]' : 'opacity-0'
                          }`}
                        >
                          {service.category}
                        </span>
                      </div>

                      <p
                        className={`text-sm sm:text-base mt-1.5 transition-colors duration-200 max-w-2xl ${
                          isHovered ? 'text-[#081426]/90' : 'text-neutral-500'
                        }`}
                      >
                        {service.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Right: Technical preview and Arrow */}
                  <div className="flex items-center justify-between md:justify-end gap-6 pt-2 md:pt-0">
                    <div className="hidden lg:flex flex-col items-end text-right">
                      <span className="text-xs font-semibold text-[#071A3D]">
                        {service.featuredHighlight}
                      </span>
                      <span className="text-[11px] text-neutral-500 font-mono">
                        Turnaround: {service.turnaround}
                      </span>
                    </div>

                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isHovered
                          ? 'bg-[#2457FF] text-white translate-x-1 shadow-md shadow-[#2457FF]/25'
                          : 'bg-[#F5F9FF] text-neutral-400 group-hover:text-[#2457FF]'
                      }`}
                    >
                      <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>

                {/* Expanded Details on Hover */}
                {isHovered && (
                  <div className="mt-5 pt-4 border-t border-[#2457FF]/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-neutral-400 font-mono block uppercase text-[10px]">
                        Paper & Substrates
                      </span>
                      <span className="font-medium text-[#071A3D] mt-0.5 block">
                        {service.paperStocks.join(' · ')}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-400 font-mono block uppercase text-[10px]">
                        Tactile Finishes
                      </span>
                      <span className="font-medium text-[#071A3D] mt-0.5 block">
                        {service.finishes.join(' · ')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <span className="inline-flex items-center gap-1 text-[#2457FF] font-semibold text-xs">
                        <Sparkles className="w-3.5 h-3.5" />
                        Click to Configure Specs
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
