import React, { useState } from 'react';
import { WHY_ICEBERG_REASONS } from '../data/content';
import { ShieldCheck, Sparkles, Check, Clock, ChevronRight } from 'lucide-react';

export const WhyIceberg: React.FC = () => {
  const [activeReason, setActiveReason] = useState<number>(0);

  return (
    <section id="why-us" className="py-28 md:py-36 bg-gradient-to-b from-[#F5F9FF] via-[#EAF2FF] to-[#F5F9FF] text-[#081426] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#2457FF] font-semibold">
            The Somolu Craft Advantage
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#071A3D] leading-tight">
            Built around your business.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600">
            We are not a generic corner copy center. We are an industrial-grade brand manufacturing partner with dedicated prepress engineers and localized production lines.
          </p>
        </div>

        {/* 4 Interactive Pillars with Large Typography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Interactive Selector with Large Numbers */}
          <div className="lg:col-span-6 space-y-4">
            {WHY_ICEBERG_REASONS.map((reason, idx) => {
              const isActive = activeReason === idx;

              return (
                <div
                  key={reason.num}
                  onClick={() => setActiveReason(idx)}
                  className={`p-6 sm:p-8 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? 'bg-white shadow-xl shadow-[#2457FF]/10 border-[#2457FF]/30 translate-x-2'
                      : 'bg-white/60 hover:bg-white border-neutral-200/70'
                  }`}
                >
                  <div className="flex items-start gap-6">
                    <span
                      className={`text-3xl sm:text-4xl font-black font-mono transition-colors ${
                        isActive ? 'text-[#2457FF]' : 'text-neutral-300'
                      }`}
                    >
                      {reason.num}
                    </span>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl sm:text-3xl font-black text-[#071A3D] tracking-tight">
                          {reason.title}
                        </h3>
                        <ChevronRight
                          className={`w-5 h-5 transition-transform ${
                            isActive ? 'text-[#2457FF] rotate-90 sm:rotate-0 translate-x-1' : 'text-neutral-300'
                          }`}
                        />
                      </div>
                      <p className="mt-2 text-sm sm:text-base text-neutral-600">
                        {reason.shortDesc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Active Deep Dive Panel */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-[#071A3D]/5 border border-[#2457FF]/15 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#2457FF]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
                <span className="text-xs font-mono uppercase tracking-widest text-[#2457FF] font-semibold">
                  Pillar {WHY_ICEBERG_REASONS[activeReason].num} in Detail
                </span>
                <span className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-[#F5F9FF] text-[#071A3D] border border-neutral-200">
                  Somolu Facility Protocol
                </span>
              </div>

              <h4 className="text-3xl sm:text-4xl font-black text-[#071A3D] mt-6 tracking-tight">
                {WHY_ICEBERG_REASONS[activeReason].title}
              </h4>

              <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
                {WHY_ICEBERG_REASONS[activeReason].detail}
              </p>

              <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-[#F5F9FF] to-[#EAF2FF] border border-[#2457FF]/20">
                <div className="text-[11px] font-mono uppercase text-[#2457FF] tracking-wider font-semibold">
                  Verified Production Metric
                </div>
                <div className="text-xl sm:text-2xl font-bold text-[#071A3D] mt-1">
                  {WHY_ICEBERG_REASONS[activeReason].metrics}
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-10 pt-6 border-t border-neutral-100 flex items-center gap-4 text-xs text-neutral-500 font-medium">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Dedicated Quality Assurance Stage at Every Run</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
