import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { ChurchEvent } from '../types';
import {
  Plus,
  Trash2,
  Edit2,
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  X,
  Ticket,
} from 'lucide-react';

export const AdminEvents: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useChurch();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ChurchEvent | null>(null);

  const [form, setForm] = useState({
    title: '',
    date: 'April 2026',
    time: '7:00 PM',
    venue: 'Main Sanctuary',
    category: 'Evangelism' as ChurchEvent['category'],
    description: '',
    imageUrl: '/src/assets/images/bible_study_scripture_1793870392769.jpg',
    registrationRequired: true,
  });

  const filtered = events.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.venue.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingEvent(null);
    setForm({
      title: '',
      date: 'April 2026',
      time: '7:00 PM',
      venue: 'Main Sanctuary',
      category: 'Evangelism',
      description: '',
      imageUrl: '/src/assets/images/bible_study_scripture_1793870392769.jpg',
      registrationRequired: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (e: ChurchEvent) => {
    setEditingEvent(e);
    setForm({
      title: e.title,
      date: e.date,
      time: e.time,
      venue: e.venue,
      category: e.category,
      description: e.description,
      imageUrl: e.imageUrl,
      registrationRequired: !!e.registrationRequired,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.venue) return;

    if (editingEvent) {
      updateEvent(editingEvent.id, form);
    } else {
      addEvent(form);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-stone-900">Events Management</h2>
          <p className="text-xs text-stone-500">
            Publish campaigns, seminars, prayer convocations, and manage attendee registrations.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Event</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by event title, venue, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-[#F5F7F9] border border-stone-200 rounded-lg focus:outline-none focus:border-[#005482]"
          />
        </div>
        <div className="text-xs text-stone-500 font-mono">
          Total: {events.length} events
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F7F9] text-stone-600 font-semibold uppercase tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Event Details</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Venue</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">Registrations</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filtered.map((evt) => (
                <tr key={evt.id} className="hover:bg-stone-50 transition-colors">
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-bold font-serif text-sm text-stone-900 truncate">{evt.title}</div>
                    <div className="text-[11px] text-stone-500 truncate">{evt.description}</div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="font-semibold text-stone-900">{evt.date}</div>
                    <div className="text-[10px] text-stone-500">{evt.time}</div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-stone-600">
                    {evt.venue}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EAF3F8] text-[#005482]">
                      {evt.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap font-mono font-bold text-stone-800">
                    {evt.registrationCount || 0} attendees
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(evt)}
                        className="p-1.5 text-stone-500 hover:text-[#005482] hover:bg-stone-100 rounded"
                        title="Edit Event"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${evt.title}"?`)) {
                            deleteEvent(evt.id);
                          }
                        }}
                        className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded"
                        title="Delete Event"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-stone-200">
            <div className="bg-[#005482] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
              <h3 className="text-base font-bold font-serif text-white">
                {editingEvent ? 'Edit Event Details' : 'Create New Church Event'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Annual Youth & Pathfinder Camporee"
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Date String *</label>
                  <input
                    type="text"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    placeholder="May 15 - 17, 2026"
                    className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Time</label>
                  <input
                    type="text"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    placeholder="7:00 PM"
                    className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Venue *</label>
                  <input
                    type="text"
                    required
                    value={form.venue}
                    onChange={(e) => setForm({ ...form, venue: e.target.value })}
                    placeholder="Main Sanctuary & Online"
                    className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482] bg-white"
                  >
                    <option value="Evangelism">Evangelism</option>
                    <option value="Youth">Youth</option>
                    <option value="Sabbath Special">Sabbath Special</option>
                    <option value="Prayer">Prayer</option>
                    <option value="Baptism">Baptism</option>
                    <option value="Outreach">Outreach</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Camp Meeting">Camp Meeting</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Banner Image Path</label>
                <input
                  type="text"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Event Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="regReq"
                  checked={form.registrationRequired}
                  onChange={(e) => setForm({ ...form, registrationRequired: e.target.checked })}
                  className="rounded text-[#005482] focus:ring-[#005482]"
                />
                <label htmlFor="regReq" className="text-xs font-medium text-stone-700">
                  Enable online visitor & member registration for this event
                </label>
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 bg-stone-100 rounded-lg hover:bg-stone-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-sm"
                >
                  {editingEvent ? 'Save Changes' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
