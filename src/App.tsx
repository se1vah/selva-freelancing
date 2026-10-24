/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { WhyChooseMe } from './components/WhyChooseMe';
import { Testimonials } from './components/Testimonials';
import { ConsultationBooking } from './components/ConsultationBooking';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InquiryManagerModal } from './components/InquiryManagerModal';
import { AnyInquiry, BookingRecord, ContactRecord } from './types';

export default function App() {
  const [inquiries, setInquiries] = useState<AnyInquiry[]>([]);
  const [isInquiryHubOpen, setIsInquiryHubOpen] = useState(false);
  const [selectedServicePreset, setSelectedServicePreset] = useState<string>('');

  // Fetch inquiries from backend or fallback to localStorage
  const loadInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setInquiries(json.data);
          return;
        }
      }
    } catch (e) {
      console.warn('API fetch error, reading local backup:', e);
    }

    // Local storage fallback
    try {
      const bookings: BookingRecord[] = JSON.parse(localStorage.getItem('selva_bookings') || '[]');
      const contacts: ContactRecord[] = JSON.parse(localStorage.getItem('selva_contacts') || '[]');
      const combined: AnyInquiry[] = [...bookings, ...contacts].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      if (combined.length > 0) {
        setInquiries(combined);
      }
    } catch (err) {
      console.warn('Error reading from storage:', err);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleBookingSuccess = (newBooking: BookingRecord) => {
    setInquiries((prev) => [newBooking, ...prev]);
  };

  const handleContactSuccess = (newContact: ContactRecord) => {
    setInquiries((prev) => [newContact, ...prev]);
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch (e) {
      console.warn('Status update network err:', e);
    }

    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: status as any } : item))
    );
  };

  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForConsultation = (serviceTitle: string) => {
    setSelectedServicePreset(serviceTitle);
    scrollToSection('#consultation');
  };

  const handleRequestDemo = () => {
    setSelectedServicePreset('Business Application Development');
    scrollToSection('#consultation');
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Sticky Top Bar Navbar */}
      <Navbar
        onOpenInquiryHub={() => setIsInquiryHubOpen(true)}
        inquiryCount={inquiries.length}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onScrollToProjects={() => scrollToSection('#projects')}
          onScrollToConsultation={() => scrollToSection('#consultation')}
        />

        {/* 2. About Me Section */}
        <About
          onScrollToConsultation={() => scrollToSection('#consultation')}
        />

        {/* 3. Services Section */}
        <Services
          onSelectServiceForConsultation={handleSelectServiceForConsultation}
        />

        {/* 4. Completed Projects Section */}
        <Projects
          onRequestDemo={handleRequestDemo}
        />

        {/* 5. Why Choose Me? Section */}
        <WhyChooseMe />

        {/* 6. Testimonials Section */}
        <Testimonials />

        {/* 7. Dedicated Consultation Booking Section */}
        <ConsultationBooking
          selectedServicePreset={selectedServicePreset}
          onBookingSuccess={handleBookingSuccess}
        />

        {/* 8. Contact Section */}
        <ContactSection
          onContactSuccess={handleContactSuccess}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenInquiryHub={() => setIsInquiryHubOpen(true)}
        inquiryCount={inquiries.length}
      />

      {/* Inquiry Management Modal */}
      <InquiryManagerModal
        isOpen={isInquiryHubOpen}
        onClose={() => setIsInquiryHubOpen(false)}
        inquiries={inquiries}
        onRefresh={loadInquiries}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
