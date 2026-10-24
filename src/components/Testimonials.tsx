import React from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 lg:py-28 relative border-t border-slate-200 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
            05. Client Feedback
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Trusted by Business Owners & Founders
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Real feedback from organizations that rely on software engineered by Selva Freelancing.
          </p>
        </div>

        {/* Testimonials 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                {/* 5-star rating */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-[14.5px] text-slate-700 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Client Info: Clean unboxed metadata with separators */}
              <div className="pt-4 border-t border-slate-100">
                <div className="font-bold text-slate-900 text-sm">
                  {t.clientName}
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  <span>{t.clientRole}</span>
                  <span aria-hidden="true" className="mx-1.5 text-slate-300">·</span>
                  <span className="text-slate-800 font-medium">{t.company}</span>
                </div>
                <div className="text-[11px] font-mono text-blue-600 font-medium mt-2">
                  Delivered: {t.projectDelivered}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
