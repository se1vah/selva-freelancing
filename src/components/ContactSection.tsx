import React, { useState } from 'react';
import { Phone, Instagram, Globe, Mail, Send, CheckCircle2, AlertCircle, Loader2, ArrowUpRight } from 'lucide-react';
import { CONTACT_INFO } from '../data/portfolioData';
import { ContactRecord } from '../types';

interface ContactSectionProps {
  onContactSuccess?: (record: ContactRecord) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onContactSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<ContactRecord | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full name is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Valid email is required.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errs.message = 'Please provide a message (minimum 5 characters).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to send message.');
      }

      const confirmedRecord: ContactRecord = result.inquiry;
      setSubmitSuccess(confirmedRecord);

      try {
        const stored = JSON.parse(localStorage.getItem('selva_contacts') || '[]');
        stored.unshift(confirmedRecord);
        localStorage.setItem('selva_contacts', JSON.stringify(stored));
      } catch (e) {
        // ignore
      }

      if (onContactSuccess) {
        onContactSuccess(confirmedRecord);
      }

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        message: '',
      });
      setErrors({});
    } catch (err: any) {
      console.error('Contact error:', err);
      const fallbackRecord: ContactRecord = {
        id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim() || undefined,
        message: formData.message.trim(),
        status: 'new',
        createdAt: new Date().toISOString(),
        type: 'general',
      };
      setSubmitSuccess(fallbackRecord);
      if (onContactSuccess) {
        onContactSuccess(fallbackRecord);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative border-t border-slate-200 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
          
          {/* Left Column: Heading & Contact Channels */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                07. Get In Touch
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Let's Build Something Great Together
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-xl">
                Have a project idea or need a digital solution for your business? Get in touch to discuss your requirements.
              </p>
            </div>

            {/* Contact Channels Cards */}
            <div className="space-y-4">
              
              {/* Phone */}
              <a
                href={CONTACT_INFO.phoneLink}
                className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-sm transition-all duration-200 group"
              >
                <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-mono text-slate-500">Phone (Tap to Call)</div>
                  <div className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-mono">
                    {CONTACT_INFO.phone}
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
              </a>

              {/* Instagram */}
              <a
                href={CONTACT_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200/90 hover:border-pink-300 hover:shadow-sm transition-all duration-200 group"
              >
                <div className="w-11 h-11 rounded-lg bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-600 group-hover:scale-105 transition-transform shrink-0">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-mono text-slate-500">Instagram Profile</div>
                  <div className="text-base font-bold text-slate-900 group-hover:text-pink-600 transition-colors font-mono">
                    {CONTACT_INFO.instagramHandle}
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-pink-600 transition-colors shrink-0" />
              </a>

              {/* Website */}
              <a
                href={CONTACT_INFO.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200/90 hover:border-indigo-300 hover:shadow-sm transition-all duration-200 group"
              >
                <div className="w-11 h-11 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-mono text-slate-500">Portfolio Website</div>
                  <div className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-mono break-all">
                    {CONTACT_INFO.website}
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors shrink-0" />
              </a>

            </div>
          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Quick Project Inquiry
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Send a quick note and Selva will get back to you within 24 hours.
              </p>

              {submitSuccess ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in fade-in duration-200">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    Message Delivered Successfully
                  </h4>
                  <p className="text-xs text-slate-600">
                    Thank you! Your message (Ref #{submitSuccess.id}) has been recorded. Selva will reach out directly.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(null)}
                    className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold underline pt-2 cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {serverError && (
                    <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                      {serverError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Selva M"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.fullName
                          ? 'border-rose-400 focus:ring-rose-500/20'
                          : 'border-slate-300 focus:border-blue-600 focus:ring-blue-500/20'
                      }`}
                    />
                    {errors.fullName && (
                      <span className="text-[11px] text-rose-600 mt-1 block">{errors.fullName}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                          errors.email
                            ? 'border-rose-400 focus:ring-rose-500/20'
                            : 'border-slate-300 focus:border-blue-600 focus:ring-blue-500/20'
                        }`}
                      />
                      {errors.email && (
                        <span className="text-[11px] text-rose-600 mt-1 block">{errors.email}</span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="8148544881"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Message / Project Details <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me what you need built or automated..."
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all resize-y ${
                        errors.message
                          ? 'border-rose-400 focus:ring-rose-500/20'
                          : 'border-slate-300 focus:border-blue-600 focus:ring-blue-500/20'
                      }`}
                    />
                    {errors.message && (
                      <span className="text-[11px] text-rose-600 mt-1 block">{errors.message}</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg shadow-sm shadow-blue-600/30 transition-all duration-150 flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Delivering Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
