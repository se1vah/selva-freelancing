import React from 'react';
import { Smartphone, Globe, Cpu, FileSpreadsheet, Server, Cloud, ArrowRight, Check } from 'lucide-react';
import { SERVICES } from '../data/portfolioData';
import { ServiceItem } from '../types';

interface ServicesProps {
  onSelectServiceForConsultation: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForConsultation }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return Smartphone;
      case 'Globe':
        return Globe;
      case 'Cpu':
        return Cpu;
      case 'FileSpreadsheet':
        return FileSpreadsheet;
      case 'Server':
        return Server;
      case 'Cloud':
        return Cloud;
      default:
        return Cpu;
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 relative border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
            02. Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Specialized Development & Automation Services
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            From consumer mobile applications to robust internal business infrastructure, each service is designed to solve real operational bottlenecks.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service: ServiceItem) => {
            const Icon = getIcon(service.icon);
            return (
              <div
                key={service.id}
                className="bg-white hover:bg-slate-50/50 border border-slate-200/90 hover:border-blue-300 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 group hover:-translate-y-1 shadow-sm hover:shadow-md"
              >
                <div>
                  {/* Top Bar with Icon and Category */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-slate-500 font-medium">
                      {service.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Deliverables */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      Included Capabilities:
                    </div>
                    {service.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Action Button to Pre-fill Consultation */}
                <button
                  onClick={() => onSelectServiceForConsultation(service.title)}
                  className="w-full mt-2 py-2.5 px-4 text-xs font-semibold text-slate-700 hover:text-white bg-slate-50 hover:bg-blue-600 border border-slate-200 hover:border-blue-600 rounded-lg flex items-center justify-center gap-2 transition-all duration-150 active:scale-95 cursor-pointer shadow-sm"
                >
                  <span>Inquire for {service.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
