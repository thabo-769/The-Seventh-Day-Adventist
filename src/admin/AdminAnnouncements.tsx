import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { Announcement } from '../types';
import { Plus, Trash2, Edit2, Bell, CheckCircle2, X } from 'lucide-react';

export const AdminAnnouncements: React.FC = () => {
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement } = useChurch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnn, setEditingAnn] = useState<Announcement | null>(null);

  const [form, setForm] = useState({
    title: '',
    content: '',
    date: 'March 2026',
    priority: 'normal' as Announcement['priority'],
    active: true,
  });

  const handleOpenAdd = () => {
    setEditingAnn(null);
    setForm({
      title: '',
      content: '',
      date: 'March 2026',
      priority: 'normal',
      active: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (a: Announcement) => {
    setEditingAnn(a);
    setForm({
      title: a.title,
      content: a.content,
      date: a.date,
      priority: a.priority,
      active: a.active,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) return;

    if (editingAnn) {
      updateAnnouncement(editingAnn.id, form);
    } else {
      addAnnouncement(form);
    }
    setIsModalOpen(false);
  };

  const toggleActive = (a: Announcement) => {
    updateAnnouncement(a.id, { active: !a.active });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-stone-900">Bulletin Announcements</h2>
          <p className="text-xs text-stone-500">
            Publish urgent alerts, Sabbath notices, and fellowship announcements across the website.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Announcement</span>
        </button>
      </div>

      <div className="space-y-3">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className={`p-5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              ann.active ? 'bg-white border-stone-200 shadow-xs' : 'bg-stone-50 border-stone-200 opacity-60'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    ann.priority === 'urgent'
                      ? 'bg-rose-100 text-rose-800'
                      : ann.priority === 'high'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-[#EAF3F8] text-[#005482]'
                  }`}
                >
                  {ann.priority} priority
                </span>
                <span className="text-xs text-stone-400 font-mono">{ann.date}</span>
                {!ann.active && (
                  <span className="text-[10px] bg-stone-200 text-stone-600 px-1.5 py-0.5 rounded">
                    Inactive
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold font-serif text-stone-900">{ann.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed max-w-2xl">{ann.content}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <button
                onClick={() => toggleActive(ann)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                  ann.active
                    ? 'border-stone-200 text-stone-600 hover:bg-stone-100'
                    : 'border-[#005482] text-[#005482] bg-[#EAF3F8]'
                }`}
              >
                {ann.active ? 'Hide' : 'Activate'}
              </button>
              <button
                onClick={() => handleOpenEdit(ann)}
                className="p-1.5 text-stone-500 hover:text-[#005482] hover:bg-stone-100 rounded"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => deleteAnnouncement(ann.id)}
                className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="bg-[#005482] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="text-base font-bold font-serif text-white">
                {editingAnn ? 'Edit Announcement' : 'Publish Announcement'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Headline *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Fellowship Lunch Following Divine Service"
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Announcement Body *</label>
                <textarea
                  rows={3}
                  required
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Priority</label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value as any })}
                    className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482] bg-white"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Date Tag</label>
                  <input
                    type="text"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 bg-stone-100 rounded-lg hover:bg-stone-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-sm"
                >
                  Save Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
