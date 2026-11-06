import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { PrayerRequest } from '../types';
import { Heart, Search, CheckCircle2, Lock, ShieldCheck, X } from 'lucide-react';

export const AdminPrayers: React.FC = () => {
  const { prayers, updatePrayerStatus } = useChurch();
  const [search, setSearch] = useState('');
  const [selectedPrayer, setSelectedPrayer] = useState<PrayerRequest | null>(null);
  const [statusInput, setStatusInput] = useState<PrayerRequest['status']>('Received');
  const [notesInput, setNotesInput] = useState('');

  const filtered = prayers.filter(
    (p) =>
      p.fullName.toLowerCase().includes(search.toLowerCase()) ||
      p.requestText.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenEdit = (p: PrayerRequest) => {
    setSelectedPrayer(p);
    setStatusInput(p.status);
    setNotesInput(p.notes || '');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPrayer) return;

    updatePrayerStatus(selectedPrayer.id, statusInput, notesInput);
    setSelectedPrayer(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-serif text-stone-900">Prayer Ministry & Petitions</h2>
        <p className="text-xs text-stone-500">
          Review church prayer petitions, manage intercessory prayer sessions, and record praise reports.
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl border border-stone-200 flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search petitions, requester name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-[#F5F7F9] border border-stone-200 rounded-lg focus:outline-none focus:border-[#005482]"
          />
        </div>
        <div className="text-xs text-stone-500 font-mono">
          Total: {prayers.length} petitions
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
                  <span>{p.fullName}</span>
                </span>
                {p.isConfidential && (
                  <span className="flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-semibold">
                    <Lock className="w-3 h-3" />
                    <span>Confidential Pastoral</span>
                  </span>
                )}
              </div>

              <p className="text-xs text-stone-700 leading-relaxed font-serif italic mb-4">
                “{p.requestText}”
              </p>

              {p.notes && (
                <div className="p-2.5 bg-[#F5F7F9] rounded-lg text-[11px] text-stone-600 mb-3 border border-stone-200">
                  <strong className="text-stone-800">Pastoral Note:</strong> {p.notes}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-stone-400 font-mono">{p.createdAt}</span>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    p.status === 'Praise Report'
                      ? 'bg-emerald-100 text-emerald-800'
                      : p.status === 'Prayed For'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {p.status}
                </span>
                <button
                  onClick={() => handleOpenEdit(p)}
                  className="px-2 py-1 text-xs text-[#005482] font-semibold hover:bg-[#EAF3F8] rounded transition-colors"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPrayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="bg-[#005482] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="text-base font-bold font-serif text-white">
                Update Prayer Petition
              </h3>
              <button
                onClick={() => setSelectedPrayer(null)}
                className="p-1 text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Status</label>
                <select
                  value={statusInput}
                  onChange={(e) => setStatusInput(e.target.value as any)}
                  className="w-full px-3.5 py-2 text-base border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482] bg-white font-medium"
                >
                  <option value="Received">Received (Pending prayer meeting)</option>
                  <option value="Prayed For">Prayed For in Intercessory Session</option>
                  <option value="Praise Report">Praise Report / Answered Prayer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Internal Notes</label>
                <textarea
                  rows={3}
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="e.g. Uplifted at Wednesday prayer meeting; Elder Vance phoned family..."
                  className="w-full px-3.5 py-2 text-base border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedPrayer(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 bg-stone-100 rounded-lg hover:bg-stone-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

