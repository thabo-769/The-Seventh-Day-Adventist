import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { WorshipProgram } from '../types';
import { Edit2, Clock, MapPin, Plus, CheckCircle2, X } from 'lucide-react';

export const AdminProgrammes: React.FC = () => {
  const { programmes, updateProgramme, addProgramme } = useChurch();
  const [editingProg, setEditingProg] = useState<WorshipProgram | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [form, setForm] = useState({
    name: '',
    day: 'Every Saturday',
    time: '09:30 AM',
    description: '',
    location: 'Main Sanctuary',
    active: true,
  });

  const handleOpenEdit = (p: WorshipProgram) => {
    setEditingProg(p);
    setForm({
      name: p.name,
      day: p.day,
      time: p.time,
      description: p.description,
      location: p.location,
      active: p.active,
    });
  };

  const handleOpenAdd = () => {
    setEditingProg(null);
    setForm({
      name: '',
      day: 'Every Saturday',
      time: '11:00 AM',
      description: '',
      location: 'Main Sanctuary',
      active: true,
    });
    setIsAddOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.time) return;

    if (editingProg) {
      updateProgramme(editingProg.id, form);
      setEditingProg(null);
    } else {
      addProgramme(form);
      setIsAddOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-stone-900">Worship Schedules & Programmes</h2>
          <p className="text-xs text-stone-500">
            Configure Saturday Sabbath School, Divine Worship, AY, and Midweek prayer gathering times.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Programme</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programmes.map((p) => (
          <div
            key={p.id}
            className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#005482] bg-[#EAF3F8] px-2 py-0.5 rounded">
                  {p.day}
                </span>
                <button
                  onClick={() => handleOpenEdit(p)}
                  className="p-1.5 text-stone-400 hover:text-[#005482] hover:bg-stone-100 rounded"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <h3 className="text-base font-bold font-serif text-stone-900 mb-1">
                {p.name}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-stone-500 font-mono mb-3">
                <Clock className="w-3.5 h-3.5 text-[#397CA0]" />
                <span>{p.time}</span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                {p.description}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs text-stone-500">
              <MapPin className="w-3.5 h-3.5 text-[#397CA0]" />
              <span className="truncate">{p.location}</span>
            </div>
          </div>
        ))}
      </div>

      {(editingProg || isAddOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="bg-[#005482] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="text-base font-bold font-serif text-white">
                {editingProg ? 'Edit Programme Schedule' : 'Create New Programme'}
              </h3>
              <button
                onClick={() => { setEditingProg(null); setIsAddOpen(false); }}
                className="p-1 text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Programme Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Day</label>
                  <input
                    type="text"
                    required
                    value={form.day}
                    onChange={(e) => setForm({ ...form, day: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Time Range</label>
                  <input
                    type="text"
                    required
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Location</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setEditingProg(null); setIsAddOpen(false); }}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 bg-stone-100 rounded-lg hover:bg-stone-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-sm"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
