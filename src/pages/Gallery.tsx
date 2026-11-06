import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { Calendar, Eye, Sparkles } from 'lucide-react';

export const Gallery: React.FC = () => {
  const { gallery, setActiveImage } = useChurch();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Church Services',
    'Baptisms',
    'Worship & Praise',
    'Youth Activities',
    'Mission & Outreach',
    'Conferences',
  ];

  const filteredItems = gallery.filter((item) => {
    return selectedCategory === 'All' || item.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative bg-[#005482] text-white py-20 overflow-hidden">
        {/* Half Clear Background Image: clear photograph on right, deep blue gradient on left for text readability */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/src/assets/images/welcome_congregation_1793870391204.jpg"
            alt="Church Photo & Media Gallery"
            className="w-full h-full object-cover object-right opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002f4a] via-[#004870]/95 via-45% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002f4a]/50 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-white/80 block mb-3">
              Moments of Worship & Fellowship
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white mb-6 leading-tight">
              Church Photo & Media Gallery
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-light">
              Glimpses into the life, worship, baptisms, pathfinder camps, and community service of The Seventh-day Adventist Church.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-[#F5F7F9] border-b border-stone-200 py-6 sticky top-[64px] sm:top-[76px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-lg border border-stone-200 w-full sm:w-auto overflow-x-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  selectedCategory === c
                    ? 'bg-[#005482] text-white shadow-xs'
                    : 'text-stone-600 hover:text-[#005482] hover:bg-stone-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Masonry Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveImage(item)}
                className="break-inside-avoid relative rounded-2xl overflow-hidden bg-[#080B10] group cursor-pointer border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#397CA0] mb-1">
                    {item.category}
                  </div>
                  <h3 className="text-base font-bold font-serif text-white mb-1 leading-snug">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-white/70 pt-2 border-t border-white/20">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1 text-white font-medium">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Full</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16 bg-[#F5F7F9] rounded-xl border border-stone-200">
              <Sparkles className="w-10 h-10 text-stone-400 mx-auto mb-3" />
              <h4 className="text-lg font-bold font-serif text-stone-800">No photos in this category</h4>
              <p className="text-xs text-stone-500 mt-1">Please select another category to view images.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
