import React from 'react';
import { X, Check, ArrowRight, Sparkles, Layers, Box, Calendar, Clock } from 'lucide-react';
import { PortfolioProject } from '../types';

interface CaseStudyModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onRequestQuote: (category: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onRequestQuote,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden my-8">
        {/* Top Image Hero Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#071A3D]">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D] via-[#071A3D]/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Pill on Image */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-[#2457FF] text-white">
              {project.category}
            </span>
            <div className="text-xs font-mono text-[#6EDBFF] mt-2">
              Client: {project.client}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#2457FF] font-semibold">
              The Production Brief
            </h4>
            <p className="mt-2 text-sm sm:text-base text-neutral-700 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technical Specs Breakdown */}
          <div className="bg-[#F5F9FF] rounded-2xl p-5 border border-[#2457FF]/15 space-y-3 text-xs">
            <div className="text-xs font-mono uppercase tracking-wider text-[#071A3D] font-bold">
              Engineering & Material Specifications
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <span className="text-neutral-400 block font-mono text-[10px]">SUBSTRATE</span>
                <span className="font-semibold text-[#071A3D]">{project.specs.substrate}</span>
              </div>
              <div>
                <span className="text-neutral-400 block font-mono text-[10px]">PRODUCTION VOLUME</span>
                <span className="font-semibold text-[#071A3D]">{project.specs.units}</span>
              </div>
              <div>
                <span className="text-neutral-400 block font-mono text-[10px]">FINISHING TREATMENTS</span>
                <span className="font-semibold text-[#071A3D]">{project.specs.finishes.join(', ')}</span>
              </div>
              <div>
                <span className="text-neutral-400 block font-mono text-[10px]">DELIVERY WINDOW</span>
                <span className="font-semibold text-[#071A3D]">{project.specs.turnaround}</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-neutral-100">
            <span className="text-xs text-neutral-500 font-mono">
              Crafted at Iceberg Somolu press
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-1/2 sm:w-auto px-5 py-2.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 border border-neutral-200 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onRequestQuote(project.category);
                }}
                className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-[#2457FF] hover:bg-[#071A3D] rounded-xl transition-all shadow-md cursor-pointer"
              >
                <span>Request Similar Spec</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
