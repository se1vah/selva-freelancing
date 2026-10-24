import React, { useState } from 'react';
import { Check, ShoppingBag, Smartphone, FileText, Printer, BarChart3, Package, ArrowUpRight, ShieldCheck, Zap, Layers } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';

interface ProjectsProps {
  onRequestDemo: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onRequestDemo }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'mobile' | 'business'>('all');

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'mobile') return p.id === 'grace-fresh-market';
    if (activeFilter === 'business') return p.id === 'business-billing-inventory';
    return true;
  });

  return (
    <section id="projects" className="py-20 lg:py-28 relative border-t border-slate-200 bg-slate-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
              03. Completed Projects
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Case Studies & Deployed Systems
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Explore real-world software solutions delivered to clients, from consumer mobile commerce to mission-critical business automation.
            </p>
          </div>

          {/* Interactive Filter Control */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl shadow-xs self-start md:self-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setActiveFilter('mobile')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'mobile'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mobile Apps
            </button>
            <button
              onClick={() => setActiveFilter('business')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'business'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Business Software
            </button>
          </div>
        </div>

        {/* Project Cards */}
        <div className="space-y-16">
          {filteredProjects.map((project, index) => {
            const isGraceFresh = project.id === 'grace-fresh-market';

            return (
              <div
                key={project.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Left Column: Project Overview & Specs */}
                  <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    
                    {/* Category Label */}
                    <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-600 mb-2">
                      <span>{project.category}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-emerald-600">Deployed Production Software</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
                      {project.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Features to highlight */}
                    <div className="space-y-2.5 mb-8">
                      <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Features Delivered:
                      </div>
                      {project.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technology tags: unboxed metadata */}
                    <div className="pt-4 border-t border-slate-100 mb-8">
                      <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Technical Stack:
                      </div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600 font-mono">
                        {project.tags.map((tag, tIdx) => (
                          <React.Fragment key={tIdx}>
                            <span>{tag}</span>
                            {tIdx < project.tags.length - 1 && (
                              <span aria-hidden="true" className="text-slate-300">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Action Link / Button */}
                    <div className="flex flex-wrap items-center gap-4">
                      {isGraceFresh ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm shadow-emerald-600/20 transition-all duration-150 flex items-center gap-2 active:scale-95"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M3.609 1.814L13.792 12 3.61 22.186a1.597 1.597 0 0 1-.36-.974V2.788c0-.368.134-.716.36-.974zm11.365 11.365l2.25 2.25-11.45 6.467 9.2-8.717zm0-2.358l-9.2-8.717 11.45 6.467-2.25 2.25zm1.536 1.179l3.528-1.99a1.603 1.603 0 0 0 0-2.82l-3.528-1.99-1.536 1.536 1.536 5.264z"/>
                          </svg>
                          <span>View on Google Play</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      ) : (
                        <button
                          onClick={onRequestDemo}
                          className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-600/20 transition-all duration-150 flex items-center gap-2 active:scale-95 cursor-pointer"
                        >
                          <span>Request a Demo</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      )}

                      <span className="text-xs text-slate-500">
                        {isGraceFresh ? 'Published on Google Play Store' : 'Inquire for live walkthrough'}
                      </span>
                    </div>

                  </div>

                  {/* Right Column: Clean Light Architecture & Feature Visuals */}
                  <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    {isGraceFresh ? (
                      /* Clean Mobile App System Card for Grace Fresh Market */
                      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm relative overflow-hidden">
                        
                        {/* Device Header */}
                        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600">
                              <ShoppingBag className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-slate-900">Grace Fresh Market</div>
                              <div className="text-[11px] text-emerald-700 font-mono font-medium">Mobile Grocery Delivery System</div>
                            </div>
                          </div>
                          <span className="text-[11px] font-mono text-slate-500">Android Production</span>
                        </div>

                        {/* Core Application Modules */}
                        <div className="mt-5 space-y-3.5">
                          
                          <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                              <Package className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-900">
                                Fresh Produce & Grocery Catalog
                              </div>
                              <div className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                                Categorized browsing for fresh produce, vegetables, fruits, and daily essential household items.
                              </div>
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                              <Zap className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-900">
                                Online Ordering & Cart Management
                              </div>
                              <div className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                                Real-time cart updates, quantity controls, and seamless online order checkout.
                              </div>
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                              <ShieldCheck className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-900">
                                Verified Google Play Distribution
                              </div>
                              <div className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                                Deployed natively for Android devices with Google Play service integrity and push alerts.
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* Footer Status */}
                        <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                          <span>Package: com.gracefresh.market</span>
                          <span className="text-emerald-600 font-semibold">Live on Google Play</span>
                        </div>

                      </div>
                    ) : (
                      /* Clean Business Software System Card for Billing & Inventory */
                      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm relative overflow-hidden">
                        
                        {/* Frame Header */}
                        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-slate-900">Billing & Inventory System</div>
                              <div className="text-[11px] text-indigo-700 font-mono font-medium">Business Operations Engine</div>
                            </div>
                          </div>
                          <span className="text-[11px] font-mono text-slate-500">Workflow Software</span>
                        </div>

                        {/* Core Business Capabilities */}
                        <div className="mt-5 space-y-3.5">
                          
                          <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                              <Package className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-900">
                                Inventory & Stock Tracking
                              </div>
                              <div className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                                Real-time inventory synchronization, SKU categorization, and automated low-stock warnings.
                              </div>
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                              <Printer className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-900">
                                Automated Invoice Generation
                              </div>
                              <div className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                                Instant invoice creation, tax compliance calculations, and direct thermal receipt printing.
                              </div>
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                              <BarChart3 className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-900">
                                Simplified Daily Operations
                              </div>
                              <div className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                                Accelerates daily billing counter checkout and prevents manual bookkeeping errors.
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* Footer Status */}
                        <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                          <span>Custom Business Software</span>
                          <span className="text-blue-600 font-semibold">Demo Available on Request</span>
                        </div>

                      </div>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
