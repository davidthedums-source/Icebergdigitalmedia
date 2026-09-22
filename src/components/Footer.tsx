import React from 'react';
import { ArrowUp, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05132D] text-white border-t border-white/10 pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-5">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-baseline gap-2">
                <span>ICEBERG</span>
                <span className="w-2 h-2 rounded-full bg-[#2457FF]"></span>
              </div>
              <div className="text-sm font-semibold uppercase tracking-widest text-[#6EDBFF]">
                Digital Media
              </div>
            </div>

            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              Printing, branding and digital media solutions for businesses that want to stand out. Crafted with pride in Somolu, Lagos.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/2348023456789"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-emerald-600 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#6EDBFF] font-semibold">
              Navigation
            </div>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li>
                <a href="#services" className="hover:text-[#6EDBFF] transition-colors">
                  Services Catalog
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-[#6EDBFF] transition-colors">
                  Our Work & Archives
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[#6EDBFF] transition-colors">
                  About & Somolu Press
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#6EDBFF] transition-colors">
                  5-Step Production Flow
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Studio Location */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#6EDBFF] font-semibold">
              Somolu Production Hub
            </div>
            <div className="space-y-3 text-sm text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#6EDBFF] shrink-0 mt-1" />
                <span>Somolu, Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#6EDBFF] shrink-0" />
                <a href="tel:+2348023456789" className="hover:text-white transition-colors">
                  +234 802 345 6789
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#6EDBFF] shrink-0" />
                <a href="mailto:hello@icebergdigitalmedia.com" className="hover:text-white transition-colors">
                  hello@icebergdigitalmedia.com
                </a>
              </div>
              <div className="text-xs text-neutral-400 pt-1 font-mono">
                Production Hours: Mon – Fri 8:00 AM – 6:30 PM (WAT)
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <div>
            © {new Date().getFullYear()} Iceberg Digital Media Ltd. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer py-1"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
