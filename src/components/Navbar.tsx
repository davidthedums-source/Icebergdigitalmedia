import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, MessageSquare, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenQuote: (serviceCategory?: string) => void;
  onOpenPortal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote, onOpenPortal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Capabilities', href: '#what-we-do' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Live Press', href: '#live-workshop' },
    { label: 'Why Iceberg', href: '#why-us' },
    { label: 'Process', href: '#process' },
  ];


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-[#071A3D]/8 shadow-xs py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Zone 1: Single Brand Wordmark */}
        <a
          href="#"
          className="group flex items-baseline gap-1.5 text-xl sm:text-2xl font-black tracking-tight text-[#071A3D] transition-transform duration-200"
          aria-label="Iceberg Digital Media Home"
        >
          <span>ICEBERG</span>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#2457FF] group-hover:text-[#6EDBFF] transition-colors">
            Digital Media
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#2457FF] inline-block animate-pulse"></span>
        </a>

        {/* Zone 2: 4-6 Clean Text Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#081426]/75">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative py-1 hover:text-[#071A3D] transition-colors group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2457FF] transition-all duration-200 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenPortal}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#071A3D] hover:text-[#2457FF] bg-neutral-100 hover:bg-[#F5F9FF] border border-neutral-200 hover:border-[#2457FF]/30 rounded-lg transition-colors cursor-pointer"
            title={user ? (isAdmin ? 'Admin Dashboard' : 'Client Orders') : 'Sign In to Portal'}
          >
            {user ? (
              <>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="max-w-[85px] truncate">{user.displayName?.split(' ')[0] || 'Portal'}</span>
                {isAdmin && <ShieldCheck className="w-3 h-3 text-[#2457FF]" />}
              </>
            ) : (
              <>
                <User className="w-3.5 h-3.5 text-[#2457FF]" />
                <span>Portal</span>
              </>
            )}
          </button>

          <a
            href="https://wa.me/2348023456789?text=Hello%20Iceberg%20Digital%20Media,%20I%20would%20like%20to%20inquire%20about%20a%20print%20and%20branding%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#071A3D] hover:text-[#2457FF] transition-colors whitespace-nowrap"
            title="Chat directly with our Somolu production team on WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#2457FF]" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={() => onOpenQuote()}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#071A3D] via-[#2457FF] to-[#2457FF] rounded-lg shadow-sm hover:shadow-md hover:shadow-[#2457FF]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            <span>Get a Quote</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#071A3D] hover:bg-[#071A3D]/5 rounded-lg transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-[#071A3D]/10 px-6 py-5 shadow-lg">
          <nav className="flex flex-col gap-4 text-base font-medium text-[#081426]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 border-b border-neutral-100 hover:text-[#2457FF] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPortal();
                }}
                className="w-full py-2.5 text-xs font-semibold text-[#071A3D] bg-neutral-100 rounded-lg flex items-center justify-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-[#2457FF]" />
                <span>{user ? `Portal (${user.displayName?.split(' ')[0]})` : 'Client & Staff Portal'}</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full py-3 text-sm font-semibold text-white bg-[#2457FF] rounded-lg flex items-center justify-center gap-2"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/2348023456789?text=Hello%20Iceberg%20Digital%20Media,%20I%20would%20like%20to%20inquire%20about%20a%20print%20and%20branding%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 text-xs font-semibold text-[#071A3D] bg-[#F5F9FF] border border-[#2457FF]/20 rounded-lg flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#2457FF]" />
                <span>Chat on WhatsApp (+234 802 345 6789)</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
