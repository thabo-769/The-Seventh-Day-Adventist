import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { CheckCircle2, Save, Church, MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useChurch();
  const [form, setForm] = useState({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold font-serif text-stone-900">Website & Church Settings</h2>
        <p className="text-xs text-stone-500">
          Update the global church identity, address, verified telephone numbers, service hours, and giving text.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>All church settings have been successfully updated and saved.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Identity */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#005482] flex items-center gap-2 border-b border-stone-100 pb-3">
            <Church className="w-4 h-4 text-[#005482]" />
            <span>Church Name & Branding</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Church Name</label>
              <input
                type="text"
                required
                value={form.churchName}
                onChange={(e) => setForm({ ...form, churchName: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Tagline</label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#005482] flex items-center gap-2 border-b border-stone-100 pb-3">
            <MapPin className="w-4 h-4 text-[#005482]" />
            <span>Contact & Location</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Physical Address</label>
            <input
              type="text"
              required
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Phone</label>
              <input
                type="text"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">WhatsApp</label>
              <input
                type="text"
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Official Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
              />
            </div>
          </div>
        </div>

        {/* Worship Times */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#005482] flex items-center gap-2 border-b border-stone-100 pb-3">
            <Clock className="w-4 h-4 text-[#005482]" />
            <span>Official Worship Hours</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Sabbath School Time</label>
              <input
                type="text"
                value={form.sabbathSchoolTime}
                onChange={(e) => setForm({ ...form, sabbathSchoolTime: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Divine Worship Time</label>
              <input
                type="text"
                value={form.divineWorshipTime}
                onChange={(e) => setForm({ ...form, divineWorshipTime: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Prayer Meeting Time</label>
              <input
                type="text"
                value={form.prayerMeetingTime}
                onChange={(e) => setForm({ ...form, prayerMeetingTime: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
              />
            </div>
          </div>
        </div>

        {/* Stewardship & Giving */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#005482] flex items-center gap-2 border-b border-stone-100 pb-3">
            <Heart className="w-4 h-4 text-[#005482]" />
            <span>Giving Instructions & Guidance</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Stewardship Description & Approved Instructions
            </label>
            <textarea
              rows={4}
              value={form.givingInstructions}
              onChange={(e) => setForm({ ...form, givingInstructions: e.target.value })}
              className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-sm flex items-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save All Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
