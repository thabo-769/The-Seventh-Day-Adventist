import React from 'react';
import { useChurch } from '../../context/ChurchContext';
import { X, Calendar } from 'lucide-react';

export const LightboxModal: React.FC = () => {
  const { activeImage, setActiveImage } = useChurch();

  if (!activeImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setActiveImage(null)}
    >
      <div
        className="relative max-w-5xl max-h-[90vh] flex flex-col bg-[#080B10] rounded-xl overflow-hidden shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveImage(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white/90 hover:text-white hover:bg-black/90 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
          <img
            src={activeImage.imageUrl}
            alt={activeImage.title}
            className="max-h-[70vh] w-auto object-contain"
          />
        </div>

        {/* Caption */}
        <div className="p-6 bg-[#080B10] border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-[#397CA0] font-medium mb-1">
            <span>{activeImage.category}</span>
            <span className="text-white/30">·</span>
            <span className="flex items-center gap-1 text-white/60">
              <Calendar className="w-3.5 h-3.5" />
              {activeImage.date}
            </span>
          </div>
          <h4 className="text-lg md:text-xl font-bold font-serif text-white mb-2">
            {activeImage.title}
          </h4>
          {activeImage.description && (
            <p className="text-sm text-white/70 max-w-2xl">{activeImage.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};
