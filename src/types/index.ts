export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  deliverables: string[];
  icon: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  tags: string[];
  link?: string;
  linkText: string;
  linkType: 'external' | 'consultation';
  accentColor: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  company: string;
  projectDelivered: string;
  rating: number;
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ConsultationFormData {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  projectDescription: string;
  preferredDate: string;
}

export interface BookingRecord extends ConsultationFormData {
  id: string;
  status: 'pending' | 'reviewed' | 'scheduled';
  createdAt: string;
  type: 'consultation';
}

export interface ContactRecord {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'replied';
  createdAt: string;
  type: 'general';
}

export type AnyInquiry = BookingRecord | ContactRecord;
