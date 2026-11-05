import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { ContactMessage } from '../types';
import { Mail, Search, CheckCircle2, Phone, X, Reply } from 'lucide-react';

export const AdminMessages: React.FC = () => {
  const { messages, updateMessageStatus } = useChurch();
  const [search, setSearch] = useState('');
  const [activeMessage, setActiveMessage] = useState<ContactMessage | null>(null);

  const filtered = messages.filter(
    (m) =>
      m.fullName.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpen = (m: ContactMessage) => {
    setActiveMessage(m);
    if (m.status === 'Unread') {
      updateMessageStatus(m.id, 'Read');
    }
  };

  const markReplied = (id: string) => {
    updateMessageStatus(id, 'Replied');
    if (activeMessage) {
      setActiveMessage({ ...activeMessage, status: 'Replied' });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-serif text-stone-900">Contact & Ministry Enquiries</h2>
        <p className="text-xs text-stone-500">
          Messages received via the website contact form and ministry participation channels.
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl border border-stone-200 flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search sender, message, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-[#F5F7F9] border border-stone-200 rounded-lg focus:outline-none focus:border-[#005482]"
          />
        </div>
        <div className="text-xs text-stone-500 font-mono">
          Total: {messages.length} messages
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F7F9] text-stone-600 font-semibold uppercase tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Sender</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Message Snippet</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-stone-50 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-stone-900">
                    <div className="font-bold">{m.fullName}</div>
                    <div className="text-[11px] text-stone-500">{m.email}</div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EAF3F8] text-[#005482]">
                      {m.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs truncate text-stone-600">
                    {m.message}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap font-mono text-stone-400">
                    {m.createdAt}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        m.status === 'Replied'
                          ? 'bg-emerald-100 text-emerald-800'
                          : m.status === 'Read'
                          ? 'bg-stone-100 text-stone-700'
                          : 'bg-blue-100 text-blue-800 font-extrabold'
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleOpen(m)}
                      className="px-2.5 py-1 text-xs font-semibold text-[#005482] hover:bg-[#EAF3F8] rounded transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {activeMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="bg-[#005482] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-white/80 font-bold">
                  {activeMessage.category}
                </span>
                <h3 className="text-base font-bold font-serif text-white truncate">
                  From: {activeMessage.fullName}
                </h3>
              </div>
              <button
                onClick={() => setActiveMessage(null)}
                className="p-1 text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="text-xs text-stone-500 space-y-1 border-b border-stone-100 pb-3">
                <div>Email: <strong className="text-stone-800">{activeMessage.email}</strong></div>
                {activeMessage.phone && <div>Phone: <strong className="text-stone-800">{activeMessage.phone}</strong></div>}
                <div>Received: <strong className="text-stone-800 font-mono">{activeMessage.createdAt}</strong></div>
              </div>

              <div>
                <div className="text-xs font-bold text-stone-700 uppercase mb-1">Message Body:</div>
                <div className="p-4 bg-[#F5F7F9] rounded-xl text-stone-800 text-xs leading-relaxed whitespace-pre-wrap border border-stone-200">
                  {activeMessage.message}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href={`mailto:${activeMessage.email}?subject=Reply from The Seventh-day Adventist Church`}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Send Email Reply</span>
                </a>

                {activeMessage.status !== 'Replied' && (
                  <button
                    onClick={() => markReplied(activeMessage.id)}
                    className="px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors border border-emerald-300"
                  >
                    Mark as Replied
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
