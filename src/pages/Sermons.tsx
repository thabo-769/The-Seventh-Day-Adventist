import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { Sermon } from '../types';
import {
  Play,
  Volume2,
  Calendar,
  User,
  BookOpen,
  Search,
  Filter,
  Sparkles,
} from 'lucide-react';

export const Sermons: React.FC = () => {
  const { sermons, setActiveVideo, setActiveAudio } = useChurch();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Latest Sermons',
    'Bible Study',
    'Prophecy',
    'Christian Living',
    'Youth Messages',
    'Special Worship Services',
  ];

  const featuredSermon = sermons.find((s) => s.featured) || sermons[0];

  const filteredSermons = sermons.filter((s) => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.scripture.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative bg-[#005482] text-white py-20 overflow-hidden">
        {/* Half Clear Background Image: clear photograph on right, deep blue gradient on left for text readability */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/src/assets/images/sermon_media_bg_1793890632843.jpg"
            alt="SDA Church Sermons and Media"
            className="w-full h-full object-cover object-right opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002f4a] via-[#004870]/95 via-45% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002f4a]/50 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-white/80 block mb-3">
              Media & Pulpit Ministry
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white mb-6 leading-tight">
              Be Inspired. Be Encouraged. Grow in Faith.
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-light">
              Explore our library of Christ-centered preaching, prophetic Bible studies, and spiritual discourses designed to anchor your soul in the blessed hope of Jesus Christ.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Sermon Hero Section */}
      {featuredSermon && (
        <section className="py-16 bg-[#F5F7F9] border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#005482] mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#005482]" />
              <span>Featured Message</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-md">
              {/* Media Preview */}
              <div className="lg:col-span-7 relative group aspect-video lg:aspect-auto">
                <img
                  src={featuredSermon.thumbnailUrl}
                  alt={featuredSermon.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <button
                    onClick={() => setActiveVideo(featuredSermon)}
                    className="w-20 h-20 rounded-full bg-[#005482] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-transform"
                    aria-label="Play featured sermon"
                  >
                    <Play className="w-8 h-8 ml-1" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 rounded text-xs font-mono text-white">
                  {featuredSermon.duration}
                </div>
              </div>

              {/* Text info */}
              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#005482] mb-2">
                    <span>{featuredSermon.category}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#080B10] mb-4 leading-snug">
                    {featuredSermon.title}
                  </h2>

                  <div className="space-y-2 text-xs text-stone-600 mb-6">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#397CA0]" />
                      <span className="font-semibold text-stone-800">{featuredSermon.speaker}</span>
                      <span className="text-stone-400">({featuredSermon.speakerRole})</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#005482] font-medium">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{featuredSermon.scripture}</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-500">
                      <Calendar className="w-3.5 h-3.5 text-[#397CA0]" />
                      <span>{featuredSermon.date}</span>
                    </div>
                  </div>

                  <p className="text-sm text-stone-600 leading-relaxed mb-6">
                    {featuredSermon.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-stone-100">
                  <button
                    onClick={() => setActiveVideo(featuredSermon)}
                    className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-sm flex items-center gap-2 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    <span>Watch Video</span>
                  </button>

                  {featuredSermon.audioUrl && (
                    <button
                      onClick={() => setActiveAudio(featuredSermon)}
                      className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#005482] bg-[#EAF3F8] hover:bg-[#d8e9f3] rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Listen to Audio</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter and Search Bar */}
      <section className="bg-white border-b border-stone-200 py-6 sticky top-[69px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F5F7F9] rounded-lg border border-stone-200 w-full lg:w-auto overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#005482] text-white shadow-xs'
                      : 'text-stone-600 hover:text-[#005482] hover:bg-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search title, speaker, scripture..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-[#F5F7F9] border border-stone-200 rounded-lg focus:outline-none focus:border-[#005482] text-stone-800 placeholder-stone-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sermon Catalog Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs text-stone-500 mb-8 flex items-center justify-between">
            <span>Showing {filteredSermons.length} sermons</span>
            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-[#005482] font-semibold hover:underline"
              >
                Clear category filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSermons.map((sermon) => (
              <div
                key={sermon.id}
                className="bg-[#F5F7F9] rounded-2xl overflow-hidden border border-stone-200/80 hover:border-[#397CA0]/40 hover:shadow-lg transition-all flex flex-col group"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img
                    src={sermon.thumbnailUrl}
                    alt={sermon.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                    <button
                      onClick={() => setActiveVideo(sermon)}
                      className="w-12 h-12 rounded-full bg-[#005482] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                      aria-label="Play video"
                    >
                      <Play className="w-5 h-5 ml-0.5" />
                    </button>
                  </div>
                  <div className="absolute top-3 left-3 bg-[#080B10]/80 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    {sermon.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                    {sermon.duration}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-2">
                      <Calendar className="w-3.5 h-3.5 text-[#397CA0]" />
                      <span>{sermon.date}</span>
                    </div>

                    <h3 className="text-lg font-bold font-serif text-stone-900 mb-2 leading-snug line-clamp-2">
                      {sermon.title}
                    </h3>

                    <div className="text-xs text-[#005482] font-semibold mb-1 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{sermon.scripture}</span>
                    </div>

                    <div className="text-xs text-stone-600 mb-3">
                      By <span className="font-semibold text-stone-800">{sermon.speaker}</span>
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4">
                      {sermon.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                    <button
                      onClick={() => setActiveVideo(sermon)}
                      className="text-xs font-semibold text-[#005482] hover:text-[#004266] flex items-center gap-1"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Watch</span>
                    </button>

                    {sermon.audioUrl && (
                      <button
                        onClick={() => setActiveAudio(sermon)}
                        className="text-xs font-medium text-stone-600 hover:text-[#005482] flex items-center gap-1"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-[#397CA0]" />
                        <span>Listen Audio</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredSermons.length === 0 && (
            <div className="text-center py-16 bg-[#F5F7F9] rounded-xl border border-stone-200">
              <Play className="w-10 h-10 text-stone-400 mx-auto mb-3" />
              <h4 className="text-lg font-bold font-serif text-stone-800">No sermons found</h4>
              <p className="text-xs text-stone-500 mt-1">Try another search keyword or clear your category filter.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
