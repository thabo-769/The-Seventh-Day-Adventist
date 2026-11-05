import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { ChurchEvent } from '../types';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  CheckCircle2,
  X,
  Sparkles,
  Ticket,
} from 'lucide-react';

export const Events: React.FC = () => {
  const { events, registerForEvent } = useChurch();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [registeringEvent, setRegisteringEvent] = useState<ChurchEvent | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formGuests, setFormGuests] = useState('1');

  const categories = [
    'All',
    'Evangelism',
    'Youth',
    'Sabbath Special',
    'Prayer',
    'Baptism',
    'Outreach',
  ];

  const filteredEvents = events.filter((e) => {
    const matchesCat = selectedCategory === 'All' || e.category === selectedCategory;
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registeringEvent) return;

    registerForEvent(registeringEvent.id);
    setRegistrationSuccess(true);
    setTimeout(() => {
      setRegistrationSuccess(false);
      setRegisteringEvent(null);
      setFormName('');
      setFormEmail('');
      setFormGuests('1');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative bg-[#005482] text-white py-20 overflow-hidden">
        {/* Half Clear Background Image: clear photograph on right, deep blue gradient on left for text readability */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/src/assets/images/events_community_bg_1793890647197.jpg"
            alt="Church Events and Community"
            className="w-full h-full object-cover object-right opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002f4a] via-[#004870]/95 via-45% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002f4a]/50 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-white/80 block mb-3">
              Calendar of Activities
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white mb-6 leading-tight">
              Church Events & Programmes
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-light">
              Join us for uplifting evangelistic campaigns, camporees, community expos, and prayer convocations. Everyone is warmly invited to participate.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="bg-[#F5F7F9] border-b border-stone-200 py-6 sticky top-[69px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-lg border border-stone-200 w-full lg:w-auto overflow-x-auto">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    selectedCategory === c
                      ? 'bg-[#005482] text-white shadow-xs'
                      : 'text-stone-600 hover:text-[#005482] hover:bg-stone-50'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search events, venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-[#005482] text-stone-800 placeholder-stone-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs text-stone-500 mb-8 flex items-center justify-between">
            <span>Showing {filteredEvents.length} upcoming events</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-[#F5F7F9] rounded-2xl overflow-hidden border border-stone-200/80 hover:border-[#397CA0]/50 hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={evt.imageUrl}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#005482] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
                    {evt.category}
                  </div>
                  {evt.registrationRequired && (
                    <div className="absolute top-3 right-3 bg-[#080B10]/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
                      <Ticket className="w-3 h-3 text-[#397CA0]" />
                      <span>Registration</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#005482] mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{evt.date}</span>
                    </div>

                    <h3 className="text-xl font-bold font-serif text-stone-900 mb-3 leading-snug">
                      {evt.title}
                    </h3>

                    <div className="space-y-1.5 text-xs text-stone-500 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#397CA0] shrink-0" />
                        <span>{evt.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#397CA0] shrink-0" />
                        <span className="truncate">{evt.venue}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                      {evt.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                    <span className="text-[11px] text-stone-500 flex items-center gap-1 font-mono">
                      <Users className="w-3.5 h-3.5 text-[#397CA0]" />
                      <span>{evt.registrationCount || 0} registered</span>
                    </span>

                    <button
                      onClick={() => setRegisteringEvent(evt)}
                      className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg transition-colors shadow-xs"
                    >
                      {evt.registrationRequired ? 'Register Free' : 'Event Info'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16 bg-[#F5F7F9] rounded-xl border border-stone-200">
              <Calendar className="w-10 h-10 text-stone-400 mx-auto mb-3" />
              <h4 className="text-lg font-bold font-serif text-stone-800">No events found</h4>
              <p className="text-xs text-stone-500 mt-1">Try another search keyword or clear the category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Event Registration Modal */}
      {registeringEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            {/* Header */}
            <div className="bg-[#005482] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-white/80 font-bold">
                  Event Registration
                </span>
                <h3 className="text-lg font-bold font-serif text-white truncate max-w-md">
                  {registeringEvent.title}
                </h3>
              </div>
              <button
                onClick={() => setRegisteringEvent(null)}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="p-3.5 rounded-xl bg-[#F5F7F9] border border-stone-200/80 mb-5 text-xs text-stone-700 space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#005482]" />
                  <span className="font-semibold">{registeringEvent.date} · {registeringEvent.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#005482]" />
                  <span>{registeringEvent.venue}</span>
                </div>
              </div>

              {registrationSuccess ? (
                <div className="p-5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="font-bold text-sm">Registration Confirmed!</div>
                  <p className="text-xs text-emerald-700">
                    We look forward to welcoming you to {registeringEvent.title}. A confirmation has been recorded.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Number of Attendees</label>
                    <select
                      value={formGuests}
                      onChange={(e) => setFormGuests(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482] bg-white"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3">3 People</option>
                      <option value="4">4 People</option>
                      <option value="5+">5+ Family / Group</option>
                    </select>
                  </div>

                  <p className="text-[11px] text-stone-500 leading-tight">
                    All church events and spiritual seminars are provided completely free of charge to the public.
                  </p>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-sm transition-colors"
                    >
                      Confirm Free Attendance
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
