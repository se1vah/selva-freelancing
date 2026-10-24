import React from 'react';
import { Sliders, Code2, Layout, MessageSquare, Layers, TrendingUp } from 'lucide-react';
import { WHY_CHOOSE_ITEMS } from '../data/portfolioData';

export const WhyChooseMe: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sliders':
        return Sliders;
      case 'Code2':
        return Code2;
      case 'Layout':
        return Layout;
      case 'MessageSquareCheck':
      case 'MessageSquare':
        return MessageSquare;
      case 'Layers':
        return Layers;
      case 'TrendingUp':
        return TrendingUp;
      default:
        return Code2;
    }
  };

  return (
    <section id="why-choose" className="py-20 lg:py-28 relative border-t border-slate-800/80 bg-slate-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
            04. Why Choose Me?
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Direct Engineering Built Around Your Objectives
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Hiring an independent senior developer means high-velocity execution, zero bureaucratic friction, and direct accountability for every deliverable.
          </p>
        </div>

        {/* 6 Value Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {WHY_CHOOSE_ITEMS.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <div
                key={item.id}
                className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800/90 hover:border-slate-700 rounded-2xl p-6 sm:p-7 transition-all duration-200 shadow-md shadow-black/20"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800/40 flex items-center justify-center text-blue-400 mb-5">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
