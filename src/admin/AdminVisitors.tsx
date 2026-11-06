import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { VisitorRegistration } from '../types';
import {
  Users,
  Search,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  Edit,
  X,
} from 'lucide-react';

export const AdminVisitors: React.FC = () => {
  const { visitors, updateVisitorStatus } = useChurch();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedVisitor, setSelectedVisitor] = useState<VisitorRegistration | null>(null);
  const [notesInput, setNotesInput] = useState('');
  const [statusInput, setStatusInput] = useState<VisitorRegistration['status']>('Pending');

  const filtered = visitors.filter((v) => {
    const matchesStatus = statusFilter === 'All' || v.status === statusFilter;
    const matchesSearch =
      v.fullName.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase()) ||
      v.phone.toLowerCase().includes(search.toLowerCase()) ||
      (v.message && v.message.toLowerCase().includes(search.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleOpenEdit = (v: VisitorRegistration) => {
    setSelectedVisitor(v);
    setNotesInput(v.notes || '');
    setStatusInput(v.status);
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVisitor) return;

    updateVisitorStatus(selectedVisitor.id, statusInput, notesInput);
    setSelectedVisitor(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-stone-900">Visitor Follow-Up Management</h2>
          <p className="text-xs text-stone-500">
            Track first-time guests, update welcoming deacon assignments, and log internal pastoral notes.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search visitor name, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-[#F5F7F9] border border-stone-200 rounded-lg focus:outline-none focus:border-[#005482]"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs border border-stone-200 rounded-lg px-2.5 py-1.5 bg-[#F5F7F9] focus:outline-none focus:border-[#005482]"
          >
            <option value="All">All Statuses ({visitors.length})</option>
            <option value="Pending">Pending</option>
            <option value="Contacted">Contacted</option>
            <option value="Welcomed">Welcomed</option>
            <option value="Followed Up">Followed Up</option>
          </select>
        </div>
      </div>

      {/* Visitors Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F7F9] text-stone-600 font-semibold uppercase tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Visitor / Family</th>
                <th className="py-3 px-4">Contact Info</th>
                <th className="py-3 px-4">Target Sabbath</th>
                <th className="py-3 px-4 text-center">Party Size</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Internal Notes</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filtered.map((v) => (
                <tr key={v.id} className="hover:bg-stone-50 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-stone-900">
                    <div className="font-bold text-sm">{v.fullName}</div>
                    <div className="text-[10px] text-stone-400">Registered: {v.createdAt}</div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-stone-800">
                      <Mail className="w-3 h-3 text-[#397CA0]" />
                      <span>{v.email}</span>
                    </div>
                    {v.phone && (
                      <div className="flex items-center gap-1.5 text-stone-500 mt-0.5">
                        <Phone className="w-3 h-3 text-stone-400" />
                        <span>{v.phone}</span>
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap font-mono text-stone-800">
                    {v.preferredVisitDate}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-stone-900">
                    {v.numberOfVisitors} {v.numberOfVisitors > 1 ? 'people' : 'person'}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        v.status === 'Welcomed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : v.status === 'Contacted'
                          ? 'bg-blue-100 text-blue-800'
                          : v.status === 'Followed Up'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs truncate text-stone-600">
                    {v.notes || <span className="text-stone-300 italic">No notes added</span>}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleOpenEdit(v)}
                      className="px-2.5 py-1 text-xs font-semibold text-[#005482] hover:bg-[#EAF3F8] rounded transition-colors"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Status Modal */}
      {selectedVisitor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="bg-[#005482] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-white/80 font-bold">
                  Visitor Hospitality Follow-Up
                </span>
                <h3 className="text-base font-bold font-serif text-white truncate">
                  {selectedVisitor.fullName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedVisitor(null)}
                className="p-1 text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStatus} className="p-6 space-y-4">
              {selectedVisitor.message && (
                <div className="p-3 bg-[#F5F7F9] rounded-lg border border-stone-200 text-xs text-stone-700">
                  <strong className="block text-stone-900 mb-0.5">Visitor’s Note:</strong>
                  “{selectedVisitor.message}”
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Follow-Up Status</label>
                <select
                  value={statusInput}
                  onChange={(e) => setStatusInput(e.target.value as any)}
                  className="w-full px-3.5 py-2 text-base border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482] bg-white font-medium"
                >
                  <option value="Pending">Pending (Not yet contacted)</option>
                  <option value="Contacted">Contacted (Welcome email / phone call completed)</option>
                  <option value="Welcomed">Welcomed (Attended Sabbath service)</option>
                  <option value="Followed Up">Followed Up (Post-visit pastoral contact)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Internal Pastoral Notes / Greeter Assigned
                </label>
                <textarea
                  rows={4}
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="e.g. Deacon Smith assigned to meet them at 10:45 AM; family interested in pathfinder club..."
                  className="w-full px-3.5 py-2 text-base border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedVisitor(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 bg-stone-100 rounded-lg hover:bg-stone-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-sm"
                >
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

