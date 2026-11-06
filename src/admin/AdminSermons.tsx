import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { Sermon } from '../types';
import {
  Plus,
  Trash2,
  Edit2,
  Star,
  Play,
  Volume2,
  Search,
  CheckCircle2,
  X,
} from 'lucide-react';

export const AdminSermons: React.FC = () => {
  const { sermons, addSermon, updateSermon, deleteSermon, currentUser } = useChurch();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSermon, setEditingSermon] = useState<Sermon | null>(null);

  const [form, setForm] = useState({
    title: '',
    speaker: '',
    speakerRole: 'Pastor',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    scripture: '',
    description: '',
    category: 'Latest Sermons' as Sermon['category'],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioUrl: '',
    thumbnailUrl: '/src/assets/images/hero_sda_worship_1793870390351.jpg',
    duration: '40 min',
    featured: false,
  });

  const filtered = sermons.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.speaker.toLowerCase().includes(search.toLowerCase()) ||
      s.scripture.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingSermon(null);
    setForm({
      title: '',
      speaker: 'Pastor Michael A. Vance',
      speakerRole: 'Senior Pastor',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      scripture: '',
      description: '',
      category: 'Latest Sermons',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      audioUrl: '',
      thumbnailUrl: '/src/assets/images/hero_sda_worship_1793870390351.jpg',
      duration: '38 min',
      featured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s: Sermon) => {
    setEditingSermon(s);
    setForm({
      title: s.title,
      speaker: s.speaker,
      speakerRole: s.speakerRole,
      date: s.date,
      scripture: s.scripture,
      description: s.description,
      category: s.category,
      videoUrl: s.videoUrl,
      audioUrl: s.audioUrl || '',
      thumbnailUrl: s.thumbnailUrl,
      duration: s.duration,
      featured: !!s.featured,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.speaker || !form.scripture) return;

    if (editingSermon) {
      updateSermon(editingSermon.id, form);
    } else {
      addSermon(form);
    }
    setIsModalOpen(false);
  };

  const toggleFeatured = (id: string, current: boolean) => {
    updateSermon(id, { featured: !current });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-stone-900">Sermon & Media Management</h2>
          <p className="text-xs text-stone-500">
            Publish Sabbath messages, update YouTube video embeds, audio files, and scripture tags.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Sermon</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by sermon title, speaker, scripture..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-[#F5F7F9] border border-stone-200 rounded-lg focus:outline-none focus:border-[#005482]"
          />
        </div>
        <div className="text-xs text-stone-500 font-mono">
          Total: {sermons.length} sermons
        </div>
      </div>

      {/* Sermons Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F7F9] text-stone-600 font-semibold uppercase tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Sermon Info</th>
                <th className="py-3 px-4">Speaker</th>
                <th className="py-3 px-4">Scripture</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-center">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-stone-50 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-stone-900 max-w-xs">
                    <div className="font-bold font-serif text-sm truncate">{s.title}</div>
                    <div className="text-[11px] text-stone-500 font-mono">{s.duration}</div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="font-semibold text-stone-900">{s.speaker}</div>
                    <div className="text-[10px] text-stone-400">{s.speakerRole}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#005482] whitespace-nowrap">
                    {s.scripture}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EAF3F8] text-[#005482]">
                      {s.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-stone-500">{s.date}</td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => toggleFeatured(s.id, !!s.featured)}
                      className={`p-1.5 rounded-md ${
                        s.featured ? 'text-amber-500 hover:bg-amber-50' : 'text-stone-300 hover:text-amber-500'
                      }`}
                      title="Toggle Featured on Homepage"
                    >
                      <Star className={`w-4 h-4 ${s.featured ? 'fill-amber-500' : ''}`} />
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(s)}
                        className="p-1.5 text-stone-500 hover:text-[#005482] hover:bg-stone-100 rounded"
                        title="Edit Sermon"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${s.title}"?`)) {
                            deleteSermon(s.id);
                          }
                        }}
                        className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded"
                        title="Delete Sermon"
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

      {/* Modal for Add / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-stone-200">
            <div className="bg-[#005482] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
              <h3 className="text-base font-bold font-serif text-white">
                {editingSermon ? 'Edit Sermon Details' : 'Publish New Sabbath Sermon'}
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
                <label className="block text-xs font-semibold text-stone-700 mb-1">Sermon Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. The Hope of His Coming"
                  className="w-full px-3.5 py-2 text-base border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Speaker *</label>
                  <input
                    type="text"
                    required
                    value={form.speaker}
                    onChange={(e) => setForm({ ...form, speaker: e.target.value })}
                    className="w-full px-3.5 py-2 text-base border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Speaker Role</label>
                  <input
                    type="text"
                    value={form.speakerRole}
                    onChange={(e) => setForm({ ...form, speakerRole: e.target.value })}
                    className="w-full px-3.5 py-2 text-base border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Scripture *</label>
                  <input
                    type="text"
                    required
                    value={form.scripture}
                    onChange={(e) => setForm({ ...form, scripture: e.target.value })}
                    placeholder="Titus 2:13"
                    className="w-full px-3.5 py-2 text-base border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full px-3.5 py-2 text-base border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482] bg-white"
                  >
                    <option value="Latest Sermons">Latest Sermons</option>
                    <option value="Bible Study">Bible Study</option>
                    <option value="Prophecy">Prophecy</option>
                    <option value="Christian Living">Christian Living</option>
                    <option value="Youth Messages">Youth Messages</option>
                    <option value="Special Worship Services">Special Worship Services</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    placeholder="42 min"
                    className="w-full px-3.5 py-2 text-base border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Video Embed URL (YouTube)</label>
                  <input
                    type="text"
                    value={form.videoUrl}
                    onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                    className="w-full px-3.5 py-2 text-base border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Audio MP3 URL</label>
                  <input
                    type="text"
                    value={form.audioUrl}
                    onChange={(e) => setForm({ ...form, audioUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 text-base border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Thumbnail Image Path / URL</label>
                <input
                  type="text"
                  value={form.thumbnailUrl}
                  onChange={(e) => setForm({ ...form, thumbnailUrl: e.target.value })}
                  className="w-full px-3.5 py-2 text-base border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Sermon Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-base border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="rounded text-[#005482] focus:ring-[#005482]"
                />
                <label htmlFor="featuredCheck" className="text-xs font-medium text-stone-700">
                  Feature this sermon as the hero media spotlight
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
                  {editingSermon ? 'Save Changes' : 'Publish Sermon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

