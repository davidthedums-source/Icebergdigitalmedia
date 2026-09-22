import React, { useState } from 'react';
import { ArrowUpRight, Filter, Sparkles, Layers, Box, CheckCircle } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data/content';
import { PortfolioProject } from '../types';

interface PortfolioProps {
  onSelectProject: (project: PortfolioProject) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Packaging', 'Stationery', 'Product Labels', 'Event Branding', 'Promotional'];

  const filteredProjects = activeFilter === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-28 md:py-36 bg-[#071A3D] text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-radial from-[#2457FF]/20 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[600px] h-[600px] bg-radial from-[#6EDBFF]/15 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#6EDBFF] font-semibold">
              Selected Archives
            </span>
            <h2 className="mt-3 text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-none">
              Made to be seen.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-xl">
              An editorial gallery of bespoke packaging, precision corporate identity suites, and large-format architectural installations crafted for visionary African businesses.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === cat
                    ? 'bg-[#2457FF] text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Artistic Grid with Asymmetric Spans */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => {
            // Asymmetric layout logic for dynamic editorial pacing
            const isLarge = idx === 0 || idx === 3;
            const colSpan = isLarge ? 'md:col-span-8' : 'md:col-span-4';
            const minHeight = isLarge ? 'min-h-[440px] sm:min-h-[500px]' : 'min-h-[380px] sm:min-h-[440px]';

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`group relative ${colSpan} ${minHeight} rounded-3xl overflow-hidden cursor-pointer border border-white/10 shadow-2xl transition-all duration-500 hover:border-[#6EDBFF]/50 flex flex-col justify-end p-6 sm:p-8`}
              >
                {/* Image Container with Zoom Effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle Base Dark Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D] via-[#071A3D]/50 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
                </div>

                {/* Top Corner Badge */}
                <div className="relative z-10 mb-auto flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[#B8F3FF]">
                    {project.category}
                  </span>

                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#2457FF] group-hover:rotate-45 group-hover:scale-110">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="text-xs font-mono text-[#6EDBFF] tracking-wider mb-1">
                    {project.client}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-neutral-300 line-clamp-2 max-w-xl">
                    {project.tagline}
                  </p>

                  {/* Specs Pill Summary (Visible on hover) */}
                  <div className="mt-4 pt-3 border-t border-white/15 flex flex-wrap items-center gap-3 text-[11px] text-neutral-300 font-mono">
                    <span>{project.specs.units}</span>
                    <span>·</span>
                    <span>{project.specs.finishes[0]}</span>
                    <span>·</span>
                    <span className="text-[#6EDBFF]">View Project Specs →</span>
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
