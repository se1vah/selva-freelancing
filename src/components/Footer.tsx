import React from 'react';
import { Phone, Instagram, Globe, ArrowUp, Terminal } from 'lucide-react';
import { CONTACT_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenInquiryHub: () => void;
  inquiryCount: number;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiryHub, inquiryCount }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'About Selva', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Completed Projects', href: '#projects' },
    { name: 'Why Choose Me', href: '#why-choose' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Book Consultation', href: '#consultation' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-50 pt-16 pb-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-200">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
                <span className="font-mono text-sm font-black">S</span>
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">
                {CONTACT_INFO.brandName}
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              Freelance software development brand specializing in mobile applications, responsive web systems, custom software, and practical business automation.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={CONTACT_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-pink-600 hover:border-pink-200 shadow-xs transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={CONTACT_INFO.phoneLink}
                aria-label="Phone"
                className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-200 shadow-xs transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>

              <a
                href={CONTACT_INFO.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:border-indigo-200 shadow-xs transition-colors"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Navigation
            </div>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact & Deployable Info */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Contact & Inquiries
            </div>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-mono">Phone:</span>
                <a href={CONTACT_INFO.phoneLink} className="hover:text-blue-600 font-mono font-semibold text-slate-800">
                  {CONTACT_INFO.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-mono">Instagram:</span>
                <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 font-mono font-medium text-slate-800">
                  {CONTACT_INFO.instagramHandle}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-mono">Website:</span>
                <a href={CONTACT_INFO.website} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 font-mono font-medium text-slate-800 truncate">
                  {CONTACT_INFO.website}
                </a>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenInquiryHub}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 hover:text-slate-900 shadow-xs transition-colors cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5 text-blue-600" />
                <span>Client Inquiries Inbox</span>
                {inquiryCount > 0 && (
                  <span className="text-[10px] font-mono font-bold text-blue-600">
                    ({inquiryCount})
                  </span>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {CONTACT_INFO.brandName}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Built with React, TypeScript & Tailwind CSS</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer font-medium"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
