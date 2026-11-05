import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { Ministry } from '../types';
import { Mail, Clock, CheckCircle2, X, Send, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Ministries: React.FC = () => {
  const { ministries, submitContactMessage } = useChurch();
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);
  const [enquirySuccess, setEnquirySuccess] = useState<boolean>(false);
  const [enquiryForm, setEnquiryForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMinistry || !enquiryForm.fullName || !enquiryForm.email) return;

    submitContactMessage({
      fullName: enquiryForm.fullName,
      email: enquiryForm.email,
      phone: enquiryForm.phone,
      category: 'Volunteering',
      message: `[Ministry Enquiry: ${selectedMinistry.title}] ${enquiryForm.message}`,
    });

    setEnquirySuccess(true);
    setTimeout(() => {
      setEnquirySuccess(false);
      setSelectedMinistry(null);
      setEnquiryForm({ fullName: '', email: '', phone: '', message: '' });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative bg-[#005482] text-white py-20 overflow-hidden">
        {/* Half Clear Background Image: clear photograph on right, deep blue gradient on left for text readability */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/src/assets/images/adventist_youth_pathfinders_1793870391887.jpg"
            alt="Adventist Youth and Ministries"
            className="w-full h-full object-cover object-right opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002f4a] via-[#004870]/95 via-45% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002f4a]/50 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-white/80 block mb-3">
              Serving Christ & Community
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white mb-6 leading-tight">
              Church Ministries
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-light">
              Every member is equipped with unique gifts to serve. Explore our twelve active ministries designed to nurture spiritual maturity, support families, and minister to our surrounding community.
            </p>
          </div>
        </div>
      </section>

      {/* Grid of 12 Ministries */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministries.map((min, index) => (
              <div
                key={min.id}
                className="bg-[#F5F7F9] rounded-2xl overflow-hidden border border-stone-200/80 hover:border-[#397CA0]/50 hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={min.imageUrl}
                    alt={min.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#080B10]/80 backdrop-blur-xs text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                    {min.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-serif text-stone-900 mb-2 leading-snug">
                      {min.title}
                    </h3>

                    <div className="text-xs text-[#005482] font-semibold mb-3 flex items-center gap-1.5">
                      <span>Leader: {min.leader}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 line-clamp-3">
                      {min.description}
                    </p>

                    <div className="space-y-1.5 mb-6 text-xs text-stone-500">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#397CA0] shrink-0" />
                        <span className="truncate">{min.meetingSchedule}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedMinistry(min)}
                      className="px-4 py-2 text-xs font-semibold text-[#005482] bg-white border border-[#397CA0]/30 hover:bg-[#EAF3F8] rounded-lg transition-colors flex items-center gap-1"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setSelectedMinistry(min)}
                      className="text-xs font-medium text-stone-500 hover:text-[#005482] underline"
                    >
                      Join / Inquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ministry Detail & Participation Modal */}
      {selectedMinistry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-stone-200">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-bold text-[#005482]">
                  Ministry Profile
                </span>
                <span className="text-stone-300">·</span>
                <span className="text-xs text-stone-500">{selectedMinistry.category}</span>
              </div>
              <button
                onClick={() => setSelectedMinistry(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Hero detail */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 h-48 rounded-xl overflow-hidden shadow-sm">
                  <img
                    src={selectedMinistry.imageUrl}
                    alt={selectedMinistry.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:col-span-7 space-y-2">
                  <h3 className="text-2xl font-bold font-serif text-[#080B10]">
                    {selectedMinistry.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#005482]">
                    Director: {selectedMinistry.leader}
                  </div>
                  <div className="text-xs text-stone-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#397CA0]" />
                    <span>Meets: {selectedMinistry.meetingSchedule}</span>
                  </div>
                  <div className="text-xs text-stone-500 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#397CA0]" />
                    <span>{selectedMinistry.contactEmail}</span>
                  </div>
                </div>
              </div>

              {/* Mission Statement */}
              <div className="p-5 rounded-xl bg-[#EAF3F8] border border-[#397CA0]/20 space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-[#005482]">
                  Ministry Mission
                </div>
                <p className="text-sm text-stone-700 leading-relaxed font-serif italic">
                  “{selectedMinistry.mission}”
                </p>
              </div>

              {/* Activities */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-stone-800 mb-3">
                  Key Activities & Programs
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedMinistry.activities.map((act) => (
                    <div key={act} className="flex items-start gap-2.5 text-xs text-stone-700 bg-[#F5F7F9] p-3 rounded-lg border border-stone-200">
                      <CheckCircle2 className="w-4 h-4 text-[#005482] shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Participation Enquiry Form */}
              <div className="pt-6 border-t border-stone-200">
                <h4 className="text-base font-bold font-serif text-[#080B10] mb-2">
                  Get Involved or Ask a Question
                </h4>
                <p className="text-xs text-stone-500 mb-5">
                  Interested in joining this ministry or want to request support? Send a note directly to our ministry leadership.
                </p>

                {enquirySuccess ? (
                  <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs text-center font-medium">
                    Thank you! Your inquiry has been sent to the {selectedMinistry.title} leadership team. We will be in touch soon!
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={enquiryForm.fullName}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, fullName: e.target.value })}
                          className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                          placeholder="e.g. Rachel Thomas"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={enquiryForm.email}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                          className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                          placeholder="rachel@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Phone Number (Optional)</label>
                      <input
                        type="tel"
                        value={enquiryForm.phone}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">How would you like to participate?</label>
                      <textarea
                        rows={3}
                        required
                        value={enquiryForm.message}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                        placeholder="I would like to volunteer / receive more information..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-sm transition-colors flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Inquiry</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
