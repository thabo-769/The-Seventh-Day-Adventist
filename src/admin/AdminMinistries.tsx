import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { Ministry } from '../types';
import { Edit2, Clock, Mail, CheckCircle2, X } from 'lucide-react';

export const AdminMinistries: React.FC = () => {
  const { ministries, updateMinistry } = useChurch();
  const [editingMinistry, setEditingMinistry] = useState<Ministry | null>(null);
  const [form, setForm] = useState({
    title: '',
    leader: '',
    description: '',
    mission: '',
    meetingSchedule: '',
    contactEmail: '',
  });

  const handleOpenEdit = (m: Ministry) => {
    setEditingMinistry(m);
    setForm({
      title: m.title,
      leader: m.leader,
      description: m.description,
      mission: m.mission,
      meetingSchedule: m.meetingSchedule,
      contactEmail: m.contactEmail,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMinistry) return;

    updateMinistry(editingMinistry.id, form);
    setEditingMinistry(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-serif text-stone-900">Ministry Leadership & Information</h2>
        <p className="text-xs text-stone-500">
          Manage church department leaders, meeting times, mission statements, and contact emails.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ministries.map((min) => (
          <div
            key={min.id}
            className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#005482] bg-[#EAF3F8] px-2 py-0.5 rounded">
                  {min.category}
                </span>
                <button
                  onClick={() => handleOpenEdit(min)}
                  className="p-1.5 text-stone-400 hover:text-[#005482] hover:bg-stone-100 rounded"
                  title="Edit Ministry"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <h3 className="text-base font-bold font-serif text-stone-900 mb-1">
                {min.title}
              </h3>

              <div className="text-xs text-stone-500 font-medium mb-3">
                Director: <strong className="text-stone-800">{min.leader}</strong>
              </div>

              <p className="text-xs text-stone-600 line-clamp-3 mb-4 leading-relaxed">
                {min.description}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-500 space-y-1">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#397CA0]" />
                <span className="truncate">{min.meetingSchedule}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-[#397CA0]" />
                <span className="truncate">{min.contactEmail}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingMinistry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="bg-[#005482] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="text-base font-bold font-serif text-white">
                Edit {editingMinistry.title}
              </h3>
              <button
                onClick={() => setEditingMinistry(null)}
                className="p-1 text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Ministry Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-base border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Department Leader</label>
                  <input
                    type="text"
                    required
                    value={form.leader}
                    onChange={(e) => setForm({ ...form, leader: e.target.value })}
                    className="w-full px-3.5 py-2 text-base border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Contact Email</label>
                  <input
                    type="email"
                    required
                    value={form.contactEmail}
                    onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                    className="w-full px-3.5 py-2 text-base border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Meeting Schedule</label>
                <input
                  type="text"
                  value={form.meetingSchedule}
                  onChange={(e) => setForm({ ...form, meetingSchedule: e.target.value })}
                  className="w-full px-3.5 py-2 text-base border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-base border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Mission Statement</label>
                <textarea
                  rows={2}
                  value={form.mission}
                  onChange={(e) => setForm({ ...form, mission: e.target.value })}
                  className="w-full px-3.5 py-2 text-base border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingMinistry(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 bg-stone-100 rounded-lg hover:bg-stone-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-sm"
                >
                  Save Ministry Info
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

