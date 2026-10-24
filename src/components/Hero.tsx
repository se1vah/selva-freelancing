import React, { useState } from 'react';
import { ArrowRight, Smartphone, Globe, Cpu, Layers, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { STATS } from '../data/portfolioData';

interface HeroProps {
  onScrollToProjects: () => void;
  onScrollToConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToProjects, onScrollToConsultation }) => {
  const [activeTab, setActiveTab] = useState<'mobile' | 'web' | 'automation'>('mobile');

  const architectures = {
    mobile: {
      title: 'Mobile Application Architecture',
      subtitle: 'Native Android & cross-platform digital solutions',
      steps: [
        {
          label: 'Client User Flow & UX',
          detail: 'Intuitive navigation, catalog browsing, and mobile checkout design',
          icon: Smartphone,
        },
        {
          label: 'Production Android Core',
          detail: 'Offline-ready caching, responsive components, and data security',
          icon: Zap,
        },
        {
          label: 'Google Play Deployment',
          detail: 'Store compliance, release management, and continuous updates',
          icon: ShieldCheck,
        },
      ],
      tag: 'Production Mobile Engineering',
    },
    web: {
      title: 'Modern Web Engineering',
      subtitle: 'High-performance websites and bespoke client portals',
      steps: [
        {
          label: 'Responsive Web UI',
          detail: 'Fluid interfaces optimized for mobile, tablet, and desktop screens',
          icon: Globe,
        },
        {
          label: 'Secure API & Data Layer',
          detail: 'Scalable backend endpoints, transactional data, and clean routing',
          icon: Layers,
        },
        {
          label: 'Cloud Infrastructure',
          detail: 'Zero-downtime deployment, fast loading speeds, and SEO readiness',
          icon: Zap,
        },
      ],
      tag: 'Full-Stack Web Systems',
    },
    automation: {
      title: 'Business Automation & Billing',
      subtitle: 'Software that eliminates administrative bottlenecks',
      steps: [
        {
          label: 'Inventory & Stock Control',
          detail: 'Real-time stock deduction, low-inventory alerts, and item catalogs',
          icon: Cpu,
        },
        {
          label: 'Automated Invoice Generation',
          detail: 'Instant digital and thermal receipts with automated tax calculation',
          icon: Zap,
        },
        {
          label: 'Operational Visibility',
          detail: 'Daily sales registers, activity audit logs, and simplified workflows',
          icon: ShieldCheck,
        },
      ],
      tag: 'Operational Automation',
    },
  };

  const current = architectures[activeTab];

  return (
    <section className="relative pt-32 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-stretch">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Domain Kicker */}
            <div className="flex items-center gap-2 text-xs font-medium text-blue-400 mb-4 tracking-wide uppercase">
              <span>Freelance Software Engineer</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Mobile & Web Development</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Business Systems</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-white tracking-tight leading-[1.12] mb-6">
              Building Digital Solutions That Grow Your Business
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
              I'm Selva, a freelance developer specializing in mobile applications, websites, custom software, and business automation solutions. I help businesses turn their ideas into reliable digital products.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={onScrollToProjects}
                className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md shadow-blue-600/30 transition-all duration-150 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onScrollToConsultation}
                className="px-6 py-3 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-all duration-150 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Book a Consultation</span>
              </button>
            </div>

            {/* Trust markers */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Production Android apps on Google Play</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Automated business workflows & invoicing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Direct developer collaboration</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Digital Solutions Architecture Hub */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden flex flex-col h-full min-h-[380px]">
              
              {/* Header with interactive tabs */}
              <div className="bg-slate-950/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="text-xs font-semibold text-slate-300">
                  Solutions Architecture
                </div>

                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setActiveTab('mobile')}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                      activeTab === 'mobile'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Mobile
                  </button>
                  <button
                    onClick={() => setActiveTab('web')}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                      activeTab === 'web'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Web
                  </button>
                  <button
                    onClick={() => setActiveTab('automation')}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                      activeTab === 'automation'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Automation
                  </button>
                </div>
              </div>

              {/* Dynamic Architecture Flow Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-[#080D1A]">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {current.title}
                    </h3>
                    <span className="text-[11px] font-mono text-blue-400 font-medium">
                      {current.tag}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mb-5">
                    {current.subtitle}
                  </p>

                  <div className="space-y-3">
                    {current.steps.map((step, idx) => {
                      const Icon = step.icon;
                      return (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3.5 transition-all"
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-800/40 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-white">
                              {step.label}
                            </div>
                            <div className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                              {step.detail}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Engineered by Selva Freelancing</span>
                  <span className="text-emerald-400 font-medium">Production-Ready</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Full-Width Key Pillars Strip below the hero split */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">
                {stat.value}
              </span>
              <span className="text-sm font-semibold text-slate-200 mt-1">
                {stat.label}
              </span>
              <span className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                {stat.description}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
