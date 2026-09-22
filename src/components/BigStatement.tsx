import React from 'react';
import { Sparkles } from 'lucide-react';

export const BigStatement: React.FC = () => {
  return (
    <section className="relative py-32 md:py-44 bg-white text-[#081426] overflow-hidden border-t border-neutral-100">
      {/* Subtle moving blue gradient shapes in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 -left-[10%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#2457FF]/10 via-[#6EDBFF]/15 to-transparent blur-[100px] animate-slow-blob-1" />
        <div className="absolute bottom-1/4 -right-[8%] w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#B8F3FF]/30 via-[#2457FF]/10 to-transparent blur-[90px] animate-slow-blob-2" />
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F9FF] border border-[#2457FF]/15 text-[#2457FF] text-xs font-mono tracking-widest uppercase mb-10">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Iceberg Standard</span>
        </div>

        {/* Massive Typography Statement */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#071A3D] leading-[1.08]">
            GOOD DESIGN GETS{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2457FF] to-[#6EDBFF]">
              ATTENTION.
            </span>
          </h2>

          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#071A3D] leading-[1.08]">
            GREAT BRANDING GETS{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#071A3D] via-[#2457FF] to-[#00A3FF]">
              REMEMBERED.
            </span>
          </h2>
        </div>

        <p className="mt-8 sm:mt-10 max-w-2xl mx-auto text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
          We engineer materials that linger in the hands of customers, from tactile cotton business cards that demand a second touch to packaging that signals timeless quality before the box is even opened.
        </p>
      </div>
    </section>
  );
};
