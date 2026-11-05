import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { GalleryItem } from '../types';
import { Plus, Trash2, Image, Calendar, X } from 'lucide-react';

export const AdminGallery: React.FC = () => {
  const { gallery, addGalleryItem, deleteGalleryItem } = useChurch();
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'Church Services' as GalleryItem['category'],
    imageUrl: '/src/assets/images/welcome_congregation_1793870391204.jpg',
    date: 'March 2026',
    description: '',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.imageUrl) return;

    addGalleryItem(form);
    setIsAddOpen(false);
    setForm({
      title: '',
      category: 'Church Services',
      imageUrl: '/src/assets/images/welcome_congregation_1793870391204.jpg',
      date: 'March 2026',
      description: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-stone-900">Photo & Media Gallery</h2>
          <p className="text-xs text-stone-500">
            Upload photographs from worship services, baptisms, pathfinder camporees, and outreach.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-xs flex flex-col justify-between group"
          >
            <div className="relative aspect-video overflow-hidden bg-black">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 bg-[#080B10]/80 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                {item.category}
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold font-serif text-stone-900 mb-1">{item.title}</h3>
                <div className="text-[11px] text-stone-500 font-mono mb-2">{item.date}</div>
                {item.description && <p className="text-xs text-stone-600 line-clamp-2">{item.description}</p>}
              </div>

              <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-end">
                <button
                  onClick={() => deleteGalleryItem(item.id)}
                  className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                  title="Delete Photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="bg-[#005482] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="text-base font-bold font-serif text-white">Add Photo to Gallery</h3>
              <button onClick={() => setIsAddOpen(false)} className="p-1 text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Sabbath Morning Praise Team"
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482] bg-white"
                  >
                    <option value="Church Services">Church Services</option>
                    <option value="Baptisms">Baptisms</option>
                    <option value="Worship & Praise">Worship & Praise</option>
                    <option value="Youth Activities">Youth Activities</option>
                    <option value="Mission & Outreach">Mission & Outreach</option>
                    <option value="Conferences">Conferences</option>
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

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Image URL or Asset Path *</label>
                <input
                  type="text"
                  required
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Caption / Description</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 bg-stone-100 rounded-lg hover:bg-stone-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-sm"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
