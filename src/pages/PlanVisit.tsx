import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import {
  MapPin,
  Clock,
  Car,
  Heart,
  HelpCircle,
  CheckCircle2,
  Send,
  Users,
  Smile,
  ShieldCheck,
} from 'lucide-react';

export const PlanVisit: React.FC = () => {
  const { settings, submitVisitorRegistration } = useChurch();
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    numberOfVisitors: 1,
    preferredVisitDate: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.preferredVisitDate) return;

    submitVisitorRegistration(formData);
    setFormSubmitted(true);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      numberOfVisitors: 1,
      preferredVisitDate: '',
      message: '',
    });
  };

  const faqs = [
    {
      q: 'What should I wear to church on Sabbath?',
      a: 'You will see a range of styles—many people wear traditional Sabbath church attire (suits, dresses, modest collared shirts), but you are welcome in whatever clean, modest clothing you feel comfortable in.',
    },
    {
      q: 'Is there a program for children and infants?',
      a: 'Yes! From 9:30 AM to 10:45 AM, we have dedicated, age-graded Sabbath School classes for Cradle Roll (0-3), Kindergarten (4-6), Primary (7-9), Junior (10-12), and Teens, led by background-checked leaders.',
    },
    {
      q: 'What is the Sabbath fellowship lunch?',
      a: 'Every Sabbath after Divine Service, our hospitality committee hosts a wholesome vegetarian/plant-based fellowship luncheon in the Fellowship Hall. All guests and visitors are our honored meal guests—no need to bring anything!',
    },
    {
      q: 'Will I be singled out or asked to speak?',
      a: 'Never. You will receive a warm handshake, a worship bulletin, and can participate as much or as quietly as you wish. Our ushers are here only to assist with seating and answer any questions.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative bg-[#005482] text-white py-20 overflow-hidden">
        {/* Half Clear Background Image: clear photograph on right, deep blue gradient on left for text readability */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/src/assets/images/plan_visit_bg_1793890677755.jpg"
            alt="Seventh-day Adventist Church Building and Welcome Campus"
            className="w-full h-full object-cover object-right opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002f4a] via-[#004870]/95 via-45% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002f4a]/50 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-white/80 block mb-3">
              First-Time Guests
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white mb-6 leading-tight">
              We Would Love to Welcome You!
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-light">
              Visiting a new church can feel intimidating, but we promise a welcoming, Christ-centered atmosphere where you and your family can experience God’s love and peace.
            </p>
          </div>
        </div>
      </section>

      {/* Main split: Left expectations & logistics, Right registration form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-10">
              {/* What to Expect */}
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#005482] block mb-2">
                  A Typical Sabbath Morning
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#080B10] mb-6">
                  What to Expect During Your Visit
                </h2>

                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-[#F5F7F9] border border-stone-200/80 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#EAF3F8] text-[#005482] flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-stone-900">09:30 AM — Sabbath School</div>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                        Interactive Bible study in small classes for adults, young adults, youth, and children. You are welcome to sit in, listen, or join the discussion.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-[#F5F7F9] border border-stone-200/80 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#EAF3F8] text-[#005482] flex items-center justify-center shrink-0">
                      <Heart className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-stone-900">11:00 AM — Divine Worship Service</div>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                        Our main congregation service featuring reverent hymns, sacred choral music, pastoral prayer, Scripture reading, and an inspiring biblical message.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-[#F5F7F9] border border-stone-200/80 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#EAF3F8] text-[#005482] flex items-center justify-center shrink-0">
                      <Smile className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-stone-900">12:45 PM — Fellowship Luncheon</div>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                        Join us after church for a complimentary, delicious vegetarian meal and warm conversation in the fellowship hall.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location & Parking */}
              <div className="p-6 rounded-2xl bg-[#EAF3F8] border border-[#397CA0]/20 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#005482]">
                  <Car className="w-4 h-4 text-[#005482]" />
                  <span>Parking & Accessibility</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-700">
                  <div>
                    <strong className="text-stone-900 block mb-0.5">Designated Visitor Parking:</strong>
                    Directly adjacent to the main foyer entrance with clear signage for first-time guests.
                  </div>
                  <div>
                    <strong className="text-stone-900 block mb-0.5">Barrier-Free Access:</strong>
                    Wheelchair ramps, automatic double doors, hearing assistance headsets, and accessible restrooms.
                  </div>
                </div>
              </div>

              {/* Map Embed Container */}
              <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100">
                <div className="p-4 bg-white border-b border-stone-200 flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#005482]" />
                    <span>{settings.address}</span>
                  </span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#005482] font-semibold hover:underline"
                  >
                    Open in Maps →
                  </a>
                </div>
                <div className="h-64 w-full bg-stone-200 relative">
                  <iframe
                    title="Church Location Map"
                    src="https://maps.google.com/maps?q=12501%20Old%20Columbia%20Pike,%20Silver%20Spring,%20MD%2020904&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h3 className="text-xl font-bold font-serif text-[#080B10] mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#005482]" />
                  <span>Frequently Asked Questions</span>
                </h3>
                <div className="space-y-3">
                  {faqs.map((faq) => (
                    <div key={faq.q} className="p-4 rounded-xl border border-stone-200 bg-white">
                      <h4 className="text-xs sm:text-sm font-bold text-stone-900 mb-1">{faq.q}</h4>
                      <p className="text-xs text-stone-600 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Visitor Registration Form (5 cols) */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 bg-[#F5F7F9] p-8 rounded-2xl border border-stone-200 shadow-md">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#005482] block mb-2">
                  Plan Your Visit
                </span>
                <h3 className="text-2xl font-bold font-serif text-[#080B10] mb-2">
                  Let Us Know You’re Coming
                </h3>
                <p className="text-xs text-stone-600 mb-6 leading-relaxed">
                  Register in advance so our welcoming team can greet you personally, have a welcome packet ready, and save seats for your family.
                </p>

                {formSubmitted ? (
                  <div className="p-6 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h4 className="font-bold text-base">We Look Forward to Seeing You!</h4>
                    <p className="text-xs text-emerald-700 leading-relaxed">
                      Thank you for letting us know! A host deacon will be waiting for you in the foyer with a welcome gift and information packet.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="mt-2 text-xs font-semibold text-[#005482] underline"
                    >
                      Register another visit
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. David & Mary Miller"
                        className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="david@example.com"
                          className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">Number in Group</label>
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={formData.numberOfVisitors}
                          onChange={(e) => setFormData({ ...formData, numberOfVisitors: parseInt(e.target.value) || 1 })}
                          className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">Preferred Sabbath *</label>
                        <input
                          type="date"
                          required
                          value={formData.preferredVisitDate}
                          onChange={(e) => setFormData({ ...formData, preferredVisitDate: e.target.value })}
                          className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Any special requests or questions?
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Children ages, translation needs, dietary preferences..."
                        className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Sabbath Visit Plan</span>
                    </button>
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
