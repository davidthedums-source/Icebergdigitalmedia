import React, { useState } from 'react';
import { PROCESS_STEPS } from '../data/content';
import { CheckCircle2, Clock, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

interface ProcessTimelineProps {
  onOpenQuote: () => void;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ onOpenQuote }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  return (
    <section id="process" className="py-28 md:py-36 bg-white text-[#081426] relative overflow-hidden border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#2457FF] font-semibold">
            Predictable Execution
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#071A3D] leading-tight">
            From brief to dispatch.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600">
            A frictionless, five-step production workflow designed to eliminate errors, guarantee color fidelity, and beat deadlines.
          </p>
        </div>

        {/* Horizontal Timeline Bar with Traveling Blue Gradient Line */}
        <div className="relative mb-12">
          {/* Base Track */}
          <div className="hidden md:block absolute top-7 left-10 right-10 h-1 bg-neutral-200 z-0" />

          {/* Active Gradient Line */}
          <div
            className="hidden md:block absolute top-7 left-10 h-1 bg-gradient-to-r from-[#071A3D] via-[#2457FF] to-[#6EDBFF] z-0 transition-all duration-500 ease-out"
            style={{
              width: `${(activeStepIndex / (PROCESS_STEPS.length - 1)) * 92}%`,
            }}
          />

          {/* Step Markers */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 relative z-10">
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = activeStepIndex === idx;
              const isPast = activeStepIndex > idx;

              return (
                <button
                  key={step.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-gradient-to-b from-[#F5F9FF] to-white border-2 border-[#2457FF] shadow-lg shadow-[#2457FF]/10 -translate-y-1'
                      : isPast
                      ? 'bg-white border border-[#2457FF]/30 shadow-xs'
                      : 'bg-neutral-50 border border-neutral-200/70 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#2457FF] text-white ring-4 ring-[#2457FF]/20'
                          : isPast
                          ? 'bg-[#071A3D] text-white'
                          : 'bg-neutral-200 text-neutral-600'
                      }`}
                    >
                      {step.step}
                    </div>

                    <span className="text-[11px] font-mono text-neutral-400">
                      Step {idx + 1}
                    </span>
                  </div>

                  <div>
                    <h3
                      className={`text-lg sm:text-xl font-bold tracking-tight transition-colors ${
                        isActive ? 'text-[#071A3D]' : 'text-neutral-700'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <span className="text-[11px] font-mono text-[#2457FF] block mt-1">
                      {step.timeframe}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Deliverables Showcase */}
        <div className="bg-gradient-to-br from-[#F5F9FF] via-white to-[#EBF3FF] rounded-3xl p-8 sm:p-12 border border-[#2457FF]/15 shadow-xl shadow-[#071A3D]/5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2457FF]/10 text-[#2457FF] text-xs font-mono font-semibold uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Phase {PROCESS_STEPS[activeStepIndex].step}: {PROCESS_STEPS[activeStepIndex].title}</span>
              </div>

              <h4 className="text-2xl sm:text-3xl font-black text-[#071A3D] tracking-tight">
                {PROCESS_STEPS[activeStepIndex].summary}
              </h4>

              <div className="mt-6 space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                  Verified Outputs & Sign-offs:
                </div>
                {PROCESS_STEPS[activeStepIndex].deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-[#2457FF] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-md min-w-[280px] lg:max-w-xs flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono uppercase text-neutral-400">
                  Target Duration
                </div>
                <div className="text-2xl font-black text-[#071A3D] mt-1 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#2457FF]" />
                  <span>{PROCESS_STEPS[activeStepIndex].timeframe}</span>
                </div>
                <p className="text-xs text-neutral-500 mt-2">
                  Live updates provided via WhatsApp or client dashboard.
                </p>
              </div>

              <button
                onClick={onOpenQuote}
                className="mt-6 w-full py-3 px-4 text-xs font-bold text-white bg-[#071A3D] hover:bg-[#2457FF] rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Initiate Step 01</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
