import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Send,
  CheckCircle2,
  Share2,
  Heart,
  Globe,
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { settings, submitContactMessage, submitPrayerRequest } = useChurch();
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    category: 'General enquiry' as 'General enquiry' | 'Prayer request' | 'Bible study' | 'Church programmes' | 'Volunteering' | 'Other',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) return;

    if (formData.category === 'Prayer request') {
      submitPrayerRequest({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        isConfidential: false,
        requestText: formData.message,
      });
    }

    submitContactMessage(formData);
    setFormSubmitted(true);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      category: 'General enquiry',
      message: '',
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative bg-[#005482] text-white py-20 overflow-hidden">
        {/* Half Clear Background Image: clear photograph on right, deep blue gradient on left for text readability */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/src/assets/images/church_welcome_bg_1793890691225.jpg"
            alt="Contact Our Church Fellowship"
            className="w-full h-full object-cover object-right opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002f4a] via-[#004870]/95 via-45% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002f4a]/50 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-white/80 block mb-3">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white mb-6 leading-tight">
              Contact Our Church
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-light">
              We would love to hear from you. Whether you have a prayer request, questions regarding Bible prophecy, or would like to visit us, our pastoral team is here to assist.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Contact Info & Map (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#005482] block mb-2">
                  Official Channels
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#080B10] mb-6">
                  Church Office
                </h2>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#F5F7F9] border border-stone-200 flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-[#005482] shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <div className="font-bold text-stone-900 mb-0.5">Physical Address</div>
                      <div className="text-stone-600 leading-relaxed">{settings.address}</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F5F7F9] border border-stone-200 flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-[#005482] shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <div className="font-bold text-stone-900 mb-0.5">Telephone</div>
                      <div className="text-stone-600">{settings.phone}</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F5F7F9] border border-stone-200 flex items-start gap-3.5">
                    <MessageSquare className="w-5 h-5 text-[#005482] shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <div className="font-bold text-stone-900 mb-0.5">WhatsApp Pastoral Hotline</div>
                      <div className="text-stone-600">{settings.whatsapp}</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F5F7F9] border border-stone-200 flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-[#005482] shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <div className="font-bold text-stone-900 mb-0.5">Official Email</div>
                      <div className="text-stone-600">{settings.email}</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#EAF3F8] border border-[#397CA0]/30 flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-[#005482] shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <div className="font-bold text-[#005482] mb-0.5">Sabbath Service Schedule</div>
                      <div className="text-stone-700">
                        Sabbath School: {settings.sabbathSchoolTime}<br />
                        Divine Worship: {settings.divineWorshipTime}<br />
                        Midweek Prayer: {settings.prayerMeetingTime}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map View */}
              <div className="rounded-xl overflow-hidden border border-stone-200 h-56 bg-stone-200">
                <iframe
                  title="Church Location Map"
                  src="https://maps.google.com/maps?q=12501%20Old%20Columbia%20Pike,%20Silver%20Spring,%20MD%2020904&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-[#F5F7F9] p-8 sm:p-10 rounded-2xl border border-stone-200 shadow-md">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#005482] block mb-2">
                  Send a Message
                </span>
                <h3 className="text-2xl font-bold font-serif text-[#080B10] mb-2">
                  How Can We Serve You?
                </h3>
                <p className="text-xs text-stone-600 mb-6 leading-relaxed">
                  Please complete the form below. If you submit a prayer request, our prayer ministry team will uplift your petition during our Wednesday evening and Sabbath morning intercessory prayers.
                </p>

                {formSubmitted ? (
                  <div className="p-8 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h4 className="font-bold text-lg">Your Message Has Been Sent</h4>
                    <p className="text-xs text-emerald-700 leading-relaxed max-w-md mx-auto">
                      Thank you for contacting The Seventh-day Adventist Church. Our pastoral secretariat will review your submission and respond promptly.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="mt-4 px-4 py-2 text-xs font-semibold text-[#005482] bg-white border border-stone-200 rounded-lg hover:bg-stone-50"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Elizabeth Taylor"
                          className="w-full px-3.5 py-2 text-base bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="elizabeth@example.com"
                          className="w-full px-3.5 py-2 text-base bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">Phone Number (Optional)</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-3.5 py-2 text-base bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">Enquiry Category</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                          className="w-full px-3.5 py-2 text-base bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                        >
                          <option value="General enquiry">General enquiry</option>
                          <option value="Prayer request">Prayer request</option>
                          <option value="Bible study">Bible study request</option>
                          <option value="Church programmes">Church programmes & schedule</option>
                          <option value="Volunteering">Volunteering & Community Service</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Message or Prayer Petition *</label>
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please write your questions, remarks, or specific prayer items here..."
                        className="w-full px-3.5 py-2 text-base bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-8 py-3 text-base font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message to Church</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
