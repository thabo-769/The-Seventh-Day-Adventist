import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { BibleStudyRequest } from '../types';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Clock,
  User,
  Mail,
  Phone,
  X,
} from 'lucide-react';

export const AdminBibleStudies: React.FC = () => {
  const { bibleStudies, updateBibleStudyStatus } = useChurch();
  const [search, setSearch] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<BibleStudyRequest | null>(null);
  const [teacherInput, setTeacherInput] = useState('');
  const [statusInput, setStatusInput] = useState<BibleStudyRequest['status']>('New');

  const filtered = bibleStudies.filter(
    (b) =>
      b.fullName.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase()) ||
      b.message.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenEdit = (b: BibleStudyRequest) => {
    setSelectedRequest(b);
    setTeacherInput(b.assignedTeacher || '');
    setStatusInput(b.status);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest) return;

    updateBibleStudyStatus(selectedRequest.id, statusInput, teacherInput);
    setSelectedRequest(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-stone-900">Bible Study Ministry Requests</h2>
          <p className="text-xs text-stone-500">
            Assign instructors, coordinate study materials, and guide seekers through Scripture.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search seeker name, email, or question..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-[#F5F7F9] border border-stone-200 rounded-lg focus:outline-none focus:border-[#005482]"
          />
        </div>
        <div className="text-xs text-stone-500 font-mono">
          Total: {bibleStudies.length} requests
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F7F9] text-stone-600 font-semibold uppercase tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Seeker</th>
                <th className="py-3 px-4">Study Method</th>
                <th className="py-3 px-4">Inquiry / Topic</th>
                <th className="py-3 px-4">Assigned Instructor</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-stone-50 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-stone-900">
                    <div className="font-bold text-sm">{b.fullName}</div>
                    <div className="text-[11px] text-stone-500">{b.email} · {b.phone || 'No phone'}</div>
                    <div className="text-[10px] text-stone-400 mt-0.5">{b.createdAt}</div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EAF3F8] text-[#005482]">
                      {b.preferredMethod}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs text-stone-600 truncate">
                    {b.message || <span className="text-stone-300 italic">No specific subject specified</span>}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap font-medium text-stone-900">
                    {b.assignedTeacher || <span className="text-stone-400 italic">Unassigned</span>}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        b.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : b.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : b.status === 'Assigned'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleOpenEdit(b)}
                      className="px-2.5 py-1 text-xs font-semibold text-[#005482] hover:bg-[#EAF3F8] rounded transition-colors"
                    >
                      Assign / Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="bg-[#005482] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-white/80 font-bold">
                  Bible Study Assignment
                </span>
                <h3 className="text-base font-bold font-serif text-white truncate">
                  {selectedRequest.fullName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
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
                  <option value="New">New Request</option>
                  <option value="Assigned">Assigned to Teacher</option>
                  <option value="In Progress">Studies In Progress</option>
                  <option value="Completed">Completed / Decision Made</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Assigned Pastor / Bible Worker
                </label>
                <input
                  type="text"
                  value={teacherInput}
                  onChange={(e) => setTeacherInput(e.target.value)}
                  placeholder="e.g. Pastor Michael Vance or Elder Hannah Wilson"
                  className="w-full px-3.5 py-2 text-base border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 bg-stone-100 rounded-lg hover:bg-stone-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-sm"
                >
                  Save Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

