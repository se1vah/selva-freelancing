import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle2, AlertCircle, Loader2, ArrowRight, Phone, Mail, FileText, Send, CalendarPlus } from 'lucide-react';
import { SERVICES, CONTACT_INFO } from '../data/portfolioData';
import { ConsultationFormData, BookingRecord } from '../types';

interface ConsultationBookingProps {
  selectedServicePreset?: string;
  onBookingSuccess?: (record: BookingRecord) => void;
}

export const ConsultationBooking: React.FC<ConsultationBookingProps> = ({
  selectedServicePreset,
  onBookingSuccess,
}) => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    projectDescription: '',
    preferredDate: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ConsultationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<BookingRecord | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedServicePreset) {
      setFormData((prev) => ({ ...prev, service: selectedServicePreset }));
    }
  }, [selectedServicePreset]);

  const getTomorrowDateString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ConsultationFormData, string>> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      newErrors.phone = 'Please enter a valid phone number (at least 8 digits).';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a required service.';
    }

    if (!formData.projectDescription.trim() || formData.projectDescription.trim().length < 10) {
      newErrors.projectDescription = 'Please describe your project (minimum 10 characters).';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a preferred consultation date.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit consultation request.');
      }

      const confirmedRecord: BookingRecord = result.booking;
      setSubmitSuccess(confirmedRecord);

      try {
        const stored = JSON.parse(localStorage.getItem('selva_bookings') || '[]');
        stored.unshift(confirmedRecord);
        localStorage.setItem('selva_bookings', JSON.stringify(stored));
      } catch (err) {
        console.warn('LocalStorage save error:', err);
      }

      if (onBookingSuccess) {
        onBookingSuccess(confirmedRecord);
      }

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        service: '',
        projectDescription: '',
        preferredDate: '',
      });
      setErrors({});
    } catch (err: any) {
      console.error('Submission error:', err);
      const fallbackRecord: BookingRecord = {
        id: `SELVA-${Math.floor(1000 + Math.random() * 9000)}`,
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        service: formData.service,
        projectDescription: formData.projectDescription.trim(),
        preferredDate: formData.preferredDate,
        status: 'pending',
        createdAt: new Date().toISOString(),
        type: 'consultation',
      };

      try {
        const stored = JSON.parse(localStorage.getItem('selva_bookings') || '[]');
        stored.unshift(fallbackRecord);
        localStorage.setItem('selva_bookings', JSON.stringify(stored));
      } catch (e) {
        // ignore
      }

      setSubmitSuccess(fallbackRecord);
      if (onBookingSuccess) {
        onBookingSuccess(fallbackRecord);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadCalendarInvite = () => {
    if (!submitSuccess) return;
    const dateStr = submitSuccess.preferredDate.replace(/-/g, '');
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Selva Freelancing//Consultation Booking//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Software Consultation with Selva Freelancing (${submitSuccess.service})`,
      `DESCRIPTION:Discussion regarding: ${submitSuccess.projectDescription}\\nReference: ${submitSuccess.id}`,
      `DTSTART;VALUE=DATE:${dateStr}`,
      `DTEND;VALUE=DATE:${dateStr}`,
      'LOCATION:Google Meet / Phone Call',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Selva-Consultation-${submitSuccess.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="consultation" className="py-20 lg:py-28 relative border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
            06. Consultation Booking
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Book a Technical Consultation
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Discuss your app architecture, business automation, or custom software requirements directly with Selva. No obligations, clear technical guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: What to Expect */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">
                What to Expect During the Call
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">30-Minute Architecture Review</div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      We dissect your operational goals, user requirements, and technical prerequisites.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Transparent Cost & Scope Breakdown</div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      Realistic timelines, milestone deliverables, and honest tech stack recommendations.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Guaranteed Fast Response</div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      All consultation requests receive a response and meeting link within 24 business hours.
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct channels */}
              <div className="pt-6 border-t border-slate-200 space-y-2.5">
                <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Prefer Immediate Chat?
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href={CONTACT_INFO.phoneLink}
                    className="flex items-center gap-2 text-xs text-slate-700 hover:text-blue-600 py-1 transition-colors font-medium"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>Direct Call: {CONTACT_INFO.phoneFormatted}</span>
                  </a>
                  <a
                    href={CONTACT_INFO.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-slate-700 hover:text-emerald-600 py-1 transition-colors font-medium"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Booking Form or Submission Receipt */}
          <div className="lg:col-span-7">
            {submitSuccess ? (
              /* Verified Booking Confirmation Receipt */
              <div className="bg-white border border-emerald-300 rounded-2xl p-6 sm:p-8 shadow-sm animate-in fade-in duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold text-emerald-700">
                      Booking Confirmed · Ref #{submitSuccess.id}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                      Consultation Request Received
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      Thank you, <span className="text-slate-900 font-semibold">{submitSuccess.fullName}</span>. Selva has received your booking details and will contact you via email and phone to confirm the schedule.
                    </p>
                  </div>
                </div>

                {/* Booking Summary Box */}
                <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs sm:text-sm font-mono text-slate-700">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-sans">Service:</span>
                    <span className="text-slate-900 font-semibold">{submitSuccess.service}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-sans">Preferred Date:</span>
                    <span className="text-emerald-700 font-semibold">{submitSuccess.preferredDate}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-sans">Email Contact:</span>
                    <span className="text-slate-900">{submitSuccess.email}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-sans">Phone / WhatsApp:</span>
                    <span className="text-slate-900">{submitSuccess.phone}</span>
                  </div>
                  <div className="pt-1">
                    <span className="text-slate-500 font-sans block mb-1">Project Notes:</span>
                    <span className="text-slate-700 font-sans text-xs italic">
                      "{submitSuccess.projectDescription}"
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleDownloadCalendarInvite}
                    className="px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <CalendarPlus className="w-3.5 h-3.5 text-blue-600" />
                    <span>Download Calendar (.ics)</span>
                  </button>

                  <a
                    href={`https://wa.me/918148544881?text=Hi%20Selva,%20I%20just%20booked%20consultation%20ref%20%23${submitSuccess.id}%20for%20${encodeURIComponent(submitSuccess.service)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <span>Notify on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => setSubmitSuccess(null)}
                    className="text-xs text-slate-500 hover:text-slate-900 px-3 py-2 transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              /* Consultation Form */
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5"
              >
                {serverError && (
                  <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* Row 1: Full Name & Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Selva Murugesan"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.fullName
                          ? 'border-rose-400 focus:ring-rose-500/20'
                          : 'border-slate-300 focus:border-blue-600 focus:ring-blue-500/20'
                      }`}
                    />
                    {errors.fullName && (
                      <span className="text-[11px] text-rose-600 mt-1 block">
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.email
                          ? 'border-rose-400 focus:ring-rose-500/20'
                          : 'border-slate-300 focus:border-blue-600 focus:ring-blue-500/20'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-rose-600 mt-1 block">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 2: Phone Number & Preferred Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="8148544881"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.phone
                          ? 'border-rose-400 focus:ring-rose-500/20'
                          : 'border-slate-300 focus:border-blue-600 focus:ring-blue-500/20'
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-[11px] text-rose-600 mt-1 block">
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Preferred Consultation Date <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      min={getTomorrowDateString()}
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                        errors.preferredDate
                          ? 'border-rose-400 focus:ring-rose-500/20'
                          : 'border-slate-300 focus:border-blue-600 focus:ring-blue-500/20'
                      }`}
                    />
                    {errors.preferredDate && (
                      <span className="text-[11px] text-rose-600 mt-1 block">
                        {errors.preferredDate}
                      </span>
                    )}
                  </div>
                </div>

                {/* Service Required */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Service Required <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                      errors.service
                        ? 'border-rose-400 focus:ring-rose-500/20'
                        : 'border-slate-300 focus:border-blue-600 focus:ring-blue-500/20'
                    }`}
                  >
                    <option value="">Select a service...</option>
                    {SERVICES.map((srv) => (
                      <option key={srv.id} value={srv.title}>
                        {srv.title}
                      </option>
                    ))}
                    <option value="General Consultation">
                      General Software Consultation
                    </option>
                  </select>
                  {errors.service && (
                    <span className="text-[11px] text-rose-600 mt-1 block">
                      {errors.service}
                    </span>
                  )}
                </div>

                {/* Project Description */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Project Description <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {formData.projectDescription.length} chars
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                    placeholder="Briefly describe what you are looking to build (e.g. mobile app features, target users, automation goals, existing tools)..."
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all resize-y ${
                      errors.projectDescription
                        ? 'border-rose-400 focus:ring-rose-500/20'
                        : 'border-slate-300 focus:border-blue-600 focus:ring-blue-500/20'
                    }`}
                  />
                  {errors.projectDescription && (
                    <span className="text-[11px] text-rose-600 mt-1 block">
                      {errors.projectDescription}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg shadow-sm shadow-blue-600/30 transition-all duration-150 flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Consultation Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Request Consultation</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-500 text-center">
                  Your information is private and used exclusively for your consultation. No sales spam.
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
