import React from 'react';
import { Smartphone, Globe, Cpu, Cloud, CheckCircle, Shield, Award, Terminal, Code } from 'lucide-react';
import { CONTACT_INFO } from '../data/portfolioData';

interface AboutProps {
  onScrollToConsultation: () => void;
}

export const About: React.FC<AboutProps> = ({ onScrollToConsultation }) => {
  const coreCompetencies = [
    {
      title: 'Mobile and Web Application Development',
      description: 'End-to-end engineering of responsive websites, client dashboards, and production Android apps published on Google Play.',
      icon: Smartphone,
    },
    {
      title: 'Business Process Automation',
      description: 'Replacing manual bookkeeping, spreadsheet overhead, and invoice chaos with streamlined, reliable automated systems.',
      icon: Cpu,
    },
    {
      title: 'Custom Software Solutions',
      description: 'Tailored business tools designed precisely around your operational nuances rather than forcing awkward off-the-shelf software.',
      icon: Code,
    },
    {
      title: 'Scalable Cloud-Based Systems',
      description: 'Configuring reliable hosting, automated database backups, secure authentication, and cloud infrastructure that grows with your business.',
      icon: Cloud,
    },
    {
      title: 'Focus on Quality, Usability & Client Satisfaction',
      description: 'Intuitive user experiences, readable codebases, clear milestone updates, and post-launch technical support.',
      icon: CheckCircle,
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 relative border-t border-slate-200 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
            01. About Me
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Engineering Digital Products That Deliver Tangible Value
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            I am a dedicated freelance software developer driven by the satisfaction of turning complex business friction into intuitive, dependable software.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
              
              {/* Profile Image & Avatar Container */}
              <div className="relative mb-6">
                <div className="w-full aspect-square max-w-[280px] mx-auto rounded-xl bg-gradient-to-tr from-slate-50 via-blue-50/30 to-indigo-50/40 border border-slate-200 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group">
                  
                  {/* Subtle technical background grid */}
                  <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

                  {/* Stylized Developer Avatar */}
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 mb-4 border-2 border-white">
                    <span className="font-mono text-3xl font-black tracking-tight">S</span>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                      {CONTACT_INFO.founderName}
                    </h3>
                    <p className="text-xs text-blue-600 font-semibold mt-0.5">
                      Freelance Software Developer
                    </p>
                    <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-slate-500 font-mono">
                      <span>Available for Projects</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span>India & Worldwide</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio summary */}
              <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <p>
                  As an independent developer, I work directly with founders, retail store owners, and growing enterprises. You won't be dealing with sales executives or junior sub-contractors—every line of your mobile application or web system is architected and built by me.
                </p>
                <p>
                  My philosophy is simple: software should save you time, eliminate operational errors, and generate measurable revenue for your organization.
                </p>
              </div>

              {/* Quick Contact Link */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  Direct Inquiries:
                </div>
                <a
                  href={CONTACT_INFO.phoneLink}
                  className="text-xs font-mono font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {CONTACT_INFO.phoneFormatted}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Key Focus Areas */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Core Specializations
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                From mobile store checkouts on Google Play to automated back-office invoicing systems, here are the core technical domains I specialize in:
              </p>

              <div className="space-y-4">
                {coreCompetencies.map((comp, idx) => {
                  const Icon = comp.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200/90 hover:border-blue-200 shadow-sm transition-all duration-200"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                            {comp.title}
                          </h4>
                          <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {comp.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quality & Commitment Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50/50 to-white border border-blue-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Have a specific technical requirement?
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Let's explore the right architecture for your budget and timeline.
                </p>
              </div>
              <button
                onClick={onScrollToConsultation}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer"
              >
                Schedule Free Discussion
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
