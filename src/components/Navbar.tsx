import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, Terminal } from 'lucide-react';
import { CONTACT_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenInquiryHub: () => void;
  inquiryCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiryHub, inquiryCount }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Why Us', href: '#why-choose' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToConsultation = () => {
    setMobileMenuOpen(false);
    const el = document.querySelector('#consultation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single clean element) */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <span className="font-mono text-sm font-black">S</span>
            </div>
            <span className="font-semibold tracking-tight text-slate-100">
              Selva <span className="text-blue-400 font-light">Freelancing</span>
            </span>
          </a>

          {/* Zone 2: Navigation Links (Clean text with subtle underline) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-blue-400 transition-colors duration-150 whitespace-nowrap shrink-0 py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Quick access to Inquiry manager for developer */}
            <button
              onClick={onOpenInquiryHub}
              title="View Client Bookings & Inquiries"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors whitespace-nowrap"
            >
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>Inquiry Hub</span>
              {inquiryCount > 0 && (
                <span className="ml-1 text-[11px] font-mono font-medium text-blue-300">
                  {inquiryCount}
                </span>
              )}
            </button>

            <button
              onClick={scrollToConsultation}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm shadow-blue-600/30 transition-all duration-150 active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenInquiryHub}
              title="Inquiry Hub"
              className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg text-xs"
            >
              <Terminal className="w-4 h-4 text-blue-400" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0F19]/98 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-base font-medium text-slate-200 hover:text-blue-400 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2.5">
            <button
              onClick={scrollToConsultation}
              className="w-full py-2.5 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center justify-center gap-2 shadow-sm shadow-blue-600/30 transition-colors"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={CONTACT_INFO.phoneLink}
              className="w-full py-2 px-4 text-xs text-center font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-lg"
            >
              Direct Call: {CONTACT_INFO.phoneFormatted}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
