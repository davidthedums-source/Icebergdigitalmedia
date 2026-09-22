import React, { useState } from 'react';
import { Camera, MapPin, Sparkles, Activity, ShieldCheck, Eye, ChevronRight } from 'lucide-react';
import { LIVE_PHOTOS } from '../data/content';
import { LivePhoto } from '../types';

interface LivePhotoStudioProps {
  onOpenQuote?: () => void;
}

export const LivePhotoStudio: React.FC<LivePhotoStudioProps> = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [modalPhoto, setModalPhoto] = useState<LivePhoto | null>(null);

  const activePhoto = LIVE_PHOTOS[selectedPhotoIndex];

  return (
    <section id="live-workshop" className="py-28 md:py-36 bg-[#081426] text-white relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-[#2457FF]/20 via-[#6EDBFF]/15 to-transparent blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[550px] h-[550px] bg-radial from-[#6EDBFF]/20 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header with Live Indicator */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#6EDBFF]/30 text-[#6EDBFF] text-xs font-mono tracking-widest uppercase mb-4 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <Camera className="w-3.5 h-3.5" />
              <span>LIVE DOCUMENTARY · SOMOLU PRESS FLOOR</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
              Inside our Lagos facility.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-2xl font-normal leading-relaxed">
              Real Heidelberg offset machinery, tactile hot foil stamping presses, and master technicians crafting international-grade brand collaterals every day in Somolu.
            </p>
          </div>

          {/* Live Workshop Facility Telemetry */}
          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md self-start lg:self-auto flex flex-col sm:flex-row items-start sm:items-center gap-6 text-xs font-mono">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
              <div>
                <span className="text-neutral-400 block text-[10px]">FACILITY STATUS</span>
                <span className="text-white font-bold">Active Press Run</span>
              </div>
            </div>
            <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
            <div>
              <span className="text-neutral-400 block text-[10px]">CURRENT PRODUCTION</span>
              <span className="text-[#6EDBFF] font-bold">Heidelberg CD 102 & Foil Suite</span>
            </div>
            <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
            <div>
              <span className="text-neutral-400 block text-[10px]">LOCATION</span>
              <span className="text-white font-bold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#2457FF]" />
                Somolu, Lagos
              </span>
            </div>
          </div>
        </div>

        {/* Featured Live Photo Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Large Live Photo Viewfinder */}
          <div className="lg:col-span-8 bg-neutral-900 rounded-3xl overflow-hidden border border-white/15 shadow-2xl relative flex flex-col justify-end min-h-[460px] sm:min-h-[540px] group">
            <img
              src={activePhoto.image}
              alt={activePhoto.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            {/* Viewfinder Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D] via-[#071A3D]/40 to-transparent opacity-90" />

            {/* Viewfinder Grid Overlay UI */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-white/90 z-10 pointer-events-none">
              <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10">
                <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-bold">LIVE SHOT</span>
                <span>·</span>
                <span>{activePhoto.station}</span>
              </div>

              <div className="hidden sm:flex items-center gap-3 px-3 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-neutral-300">
                <span>{activePhoto.location}</span>
              </div>
            </div>

            {/* Bottom Caption & Live Telemetry Details */}
            <div className="relative z-10 p-6 sm:p-10">
              <div className="text-xs font-mono text-[#6EDBFF] tracking-wider mb-2">
                {activePhoto.timestamp}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {activePhoto.title}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-neutral-200 max-w-2xl leading-relaxed">
                {activePhoto.description}
              </p>

              {/* Technical Live Press Telemetry Grid */}
              <div className="mt-6 pt-5 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <span className="text-neutral-400 block text-[10px]">EQUIPMENT SPEC</span>
                  <span className="text-white font-semibold">{activePhoto.specs.equipment}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px]">LEAD SPECIALIST</span>
                  <span className="text-[#B8F3FF] font-semibold">{activePhoto.specs.operator}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px]">VERIFIED TOLERANCE</span>
                  <span className="text-emerald-400 font-semibold">{activePhoto.specs.metric}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Live Photo Selector Strip */}
          <div className="lg:col-span-4 flex flex-col space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#6EDBFF] font-semibold pb-1">
              Select Production Station ({LIVE_PHOTOS.length} Feeds)
            </div>

            {LIVE_PHOTOS.map((photo, idx) => {
              const isSelected = selectedPhotoIndex === idx;

              return (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhotoIndex(idx)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 flex items-center gap-4 border ${
                    isSelected
                      ? 'bg-gradient-to-r from-white/15 to-white/5 border-[#2457FF] shadow-lg translate-x-1.5'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {/* Thumbnail Image */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 relative border border-white/20">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-[#2457FF]/40 flex items-center justify-center">
                        <Eye className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#6EDBFF] uppercase tracking-wide">
                        0{idx + 1} · {photo.station}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-white truncate mt-0.5">
                      {photo.title}
                    </h4>
                    <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                      {photo.specs.equipment}
                    </p>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-transform shrink-0 ${
                      isSelected ? 'text-[#6EDBFF] translate-x-0.5' : 'text-neutral-500'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
