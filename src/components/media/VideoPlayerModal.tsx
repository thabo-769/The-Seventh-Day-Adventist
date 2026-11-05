import React from 'react';
import { useChurch } from '../../context/ChurchContext';
import { X, Calendar, User, BookOpen } from 'lucide-react';

export const VideoPlayerModal: React.FC = () => {
  const { activeVideo, setActiveVideo } = useChurch();

  if (!activeVideo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#080B10] text-white rounded-xl overflow-hidden shadow-2xl border border-white/10">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#005482]">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-white/90">SDA Media Centre</span>
            <span className="text-white/40">·</span>
            <span className="text-xs text-white/80">{activeVideo.category}</span>
          </div>
          <button
            onClick={() => setActiveVideo(null)}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close video player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={activeVideo.videoUrl}
            title={activeVideo.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Video Info */}
        <div className="p-6 bg-[#080B10]">
          <h3 className="text-xl md:text-2xl font-bold font-serif text-white mb-3">
            {activeVideo.title}
          </h3>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-white/70 mb-4">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#397CA0]" />
              <strong className="text-white/90">{activeVideo.speaker}</strong> ({activeVideo.speakerRole})
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#397CA0]" />
              {activeVideo.date}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#397CA0]" />
              {activeVideo.scripture}
            </span>
          </div>

          <p className="text-sm text-white/80 leading-relaxed max-w-3xl">
            {activeVideo.description}
          </p>
        </div>
      </div>
    </div>
  );
};
