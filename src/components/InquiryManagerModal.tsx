import React, { useState } from 'react';
import { X, Calendar, Phone, Mail, User, Download, RefreshCw, Terminal } from 'lucide-react';
import { BookingRecord, ContactRecord, AnyInquiry } from '../types';

interface InquiryManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiries: AnyInquiry[];
  onRefresh: () => void;
  onUpdateStatus?: (id: string, status: string) => void;
}

export const InquiryManagerModal: React.FC<InquiryManagerModalProps> = ({
  isOpen,
  onClose,
  inquiries,
  onRefresh,
  onUpdateStatus,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'consultation' | 'general'>('all');

  if (!isOpen) return null;

  const filtered = inquiries.filter((item) => {
    if (filterType === 'consultation') return item.type === 'consultation';
    if (filterType === 'general') return item.type === 'general';
    return true;
  });

  const exportCSV = () => {
    const headers = ['ID', 'Type', 'Full Name', 'Email', 'Phone', 'Service / Subject', 'Details', 'Date / Created', 'Status'];
    const rows = filtered.map((item) => {
      const isBooking = item.type === 'consultation';
      const booking = item as BookingRecord;
      const contact = item as ContactRecord;

      return [
        item.id,
        item.type,
        `"${item.fullName.replace(/"/g, '""')}"`,
        `"${item.email}"`,
        `"${item.phone || ''}"`,
        `"${isBooking ? booking.service : 'General Message'}"`,
        `"${(isBooking ? booking.projectDescription : contact.message).replace(/"/g, '""')}"`,
        `"${isBooking ? booking.preferredDate : item.createdAt}"`,
        item.status,
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `selva_inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>Inquiry Management Hub</span>
                <span className="text-xs font-mono font-semibold text-blue-600">
                  ({inquiries.length} total)
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Live backend submissions & consultation bookings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              title="Refresh Records"
              className="p-2 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={exportCSV}
              title="Export as CSV"
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Strip */}
        <div className="px-6 py-3 bg-slate-100/60 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium mr-1">Filter:</span>
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                filterType === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
              }`}
            >
              All ({inquiries.length})
            </button>
            <button
              onClick={() => setFilterType('consultation')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                filterType === 'consultation'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
              }`}
            >
              Consultations ({inquiries.filter((i) => i.type === 'consultation').length})
            </button>
            <button
              onClick={() => setFilterType('general')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                filterType === 'general'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
              }`}
            >
              Contact Messages ({inquiries.filter((i) => i.type === 'general').length})
            </button>
          </div>

          <div className="text-slate-500 font-mono text-[11px]">
            Connected to `/api/consultations` & `/api/contact`
          </div>
        </div>

        {/* Inquiries Content List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-white">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              No inquiries found in this view.
            </div>
          ) : (
            filtered.map((item) => {
              const isBooking = item.type === 'consultation';
              const booking = item as BookingRecord;
              const contact = item as ContactRecord;

              return (
                <div
                  key={item.id}
                  className="bg-slate-50/80 border border-slate-200 hover:border-slate-300 rounded-xl p-4 sm:p-5 transition-all text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 text-sm">
                        #{item.id}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded font-mono text-[11px] font-semibold ${
                          isBooking
                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                            : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                        }`}
                      >
                        {isBooking ? 'Consultation Request' : 'Direct Message'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-500">
                      <span className="font-mono text-[11px]">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                      <span
                        className={`capitalize font-mono px-2 py-0.5 rounded text-[10px] font-semibold ${
                          item.status === 'scheduled' || item.status === 'replied'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>

                  {/* Client Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3 font-mono text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="font-sans font-semibold text-slate-900">{item.fullName}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <a href={`mailto:${item.email}`} className="hover:text-blue-600 transition-colors truncate">
                        {item.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {item.phone ? (
                        <a href={`tel:${item.phone}`} className="hover:text-blue-600 transition-colors">
                          {item.phone}
                        </a>
                      ) : (
                        <span className="text-slate-400">Not provided</span>
                      )}
                    </div>
                  </div>

                  {/* Booking details or message */}
                  <div className="bg-white rounded-lg p-3 border border-slate-200 text-slate-700 space-y-1.5 shadow-xs">
                    {isBooking && (
                      <div className="flex items-center gap-2 text-blue-700 font-semibold mb-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Requested Date: {booking.preferredDate}</span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span>Service: {booking.service}</span>
                      </div>
                    )}
                    <p className="text-slate-700 font-sans leading-relaxed">
                      {isBooking ? booking.projectDescription : contact.message}
                    </p>
                  </div>

                  {/* Actions bar */}
                  <div className="mt-3 flex items-center justify-between text-[11px] pt-1">
                    <div className="flex items-center gap-2 font-medium">
                      <a
                        href={`https://wa.me/${item.phone?.replace(/\D/g, '') || ''}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 hover:text-emerald-800 underline"
                      >
                        Open in WhatsApp
                      </a>
                      <span className="text-slate-300">|</span>
                      <a
                        href={`mailto:${item.email}?subject=Regarding your consultation request #${item.id}`}
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        Reply via Email
                      </a>
                    </div>

                    {onUpdateStatus && (
                      <select
                        value={item.status}
                        onChange={(e) => onUpdateStatus(item.id, e.target.value)}
                        className="bg-white border border-slate-300 text-[11px] rounded px-2 py-1 text-slate-700 focus:outline-none focus:border-blue-600"
                      >
                        <option value="pending">Mark as Pending</option>
                        <option value="reviewed">Mark as Reviewed</option>
                        <option value="scheduled">Mark as Scheduled</option>
                        <option value="replied">Mark as Replied</option>
                      </select>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Selva Freelancing Management System</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
