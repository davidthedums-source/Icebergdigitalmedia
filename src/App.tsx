import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhatWeDo } from './components/WhatWeDo';
import { TransitionWave } from './components/TransitionWave';
import { ServicesSection } from './components/ServicesSection';
import { Portfolio } from './components/Portfolio';
import { BigStatement } from './components/BigStatement';
import { LivePhotoStudio } from './components/LivePhotoStudio';
import { WhyIceberg } from './components/WhyIceberg';
import { ProcessTimeline } from './components/ProcessTimeline';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { ProjectQuoteModal } from './components/ProjectQuoteModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ClientPortalModal } from './components/ClientPortalModal';
import { ServiceItem, PortfolioProject } from './types';

export default function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [portalModalOpen, setPortalModalOpen] = useState(false);
  const [quoteCategory, setQuoteCategory] = useState<string>('Packaging');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const handleOpenQuote = (category?: string) => {
    if (category) {
      setQuoteCategory(category);
    }
    setQuoteModalOpen(true);
  };

  const handleSelectService = (service: ServiceItem) => {
    setQuoteCategory(service.title);
    setQuoteModalOpen(true);
  };

  const handleSelectProject = (project: PortfolioProject) => {
    setSelectedProject(project);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#F5F9FF] text-[#081426] flex flex-col selection:bg-[#2457FF]/20 selection:text-[#071A3D]">
        {/* Navigation */}
        <Navbar
          onOpenQuote={() => handleOpenQuote()}
          onOpenPortal={() => setPortalModalOpen(true)}
        />

        <main className="flex-1">
          {/* 1. Hero Section (White / Light Blue with slow-moving gradients & floating cards) */}
          <Hero onOpenQuote={handleOpenQuote} />

          {/* 2. What We Do (Light Blue canvas with 3 enormous interactive cards) */}
          <WhatWeDo onOpenQuote={handleOpenQuote} />

          {/* 3. Colorful Transition Wave (Deep Navy with animated cyan/blue gradient waves) */}
          <TransitionWave onOpenQuote={() => handleOpenQuote()} />

          {/* 4. Services Section (White with 8 elegant interactive expanding service rows) */}
          <ServicesSection onSelectService={handleSelectService} />

          {/* 5. Portfolio Section (Deep Navy editorial grid with high-fidelity imagery) */}
          <Portfolio onSelectProject={handleSelectProject} />

          {/* 6. Big Statement Section (White with massive typography & moving blue shapes) */}
          <BigStatement />

          {/* 7. Live Workshop Floor (Deep Navy technical feed with live press photography & telemetry) */}
          <LivePhotoStudio onOpenQuote={() => handleOpenQuote()} />

          {/* 8. Why Iceberg & Process Timeline (Gradient transition with interactive pillars & timeline) */}
          <WhyIceberg />
          <ProcessTimeline onOpenQuote={() => handleOpenQuote()} />

          {/* 9. CTA Section & Footer (Deep Navy climax & verified Lagos studio contacts) */}
          <CtaSection onOpenQuote={() => handleOpenQuote()} />
        </main>

        <Footer />

        {/* Interactive Modals */}
        <ProjectQuoteModal
          isOpen={quoteModalOpen}
          onClose={() => setQuoteModalOpen(false)}
          initialCategory={quoteCategory}
        />

        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onRequestQuote={(cat) => handleOpenQuote(cat)}
        />

        <ClientPortalModal
          isOpen={portalModalOpen}
          onClose={() => setPortalModalOpen(false)}
          onOpenNewQuote={() => handleOpenQuote()}
        />
      </div>
    </AuthProvider>
  );
}
