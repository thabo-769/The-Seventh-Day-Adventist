import React, { useRef, useState, useEffect } from 'react';
import { useChurch } from '../../context/ChurchContext';
import { X, Play, Pause, Volume2, RotateCcw, RotateCw, BookOpen, User } from 'lucide-react';

export const AudioPlayerModal: React.FC = () => {
  const { activeAudio, setActiveAudio } = useChurch();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    if (activeAudio) {
      setIsPlaying(true);
      setCurrentTime(0);
      if (audioRef.current) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    } else {
      setIsPlaying(false);
    }
  }, [activeAudio]);

  if (!activeAudio) return null;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const skipTime = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, Math.min(audioRef.current.currentTime + seconds, duration));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#080B10] text-white rounded-xl overflow-hidden shadow-2xl border border-white/10">
        <audio
          ref={audioRef}
          src={activeAudio.audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'}
          onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
          onLoadedMetadata={() => setDuration(audioRef.current?.duration || 2100)}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#005482]">
          <span className="text-xs uppercase tracking-widest font-semibold text-white/90">SDA Audio Pulpit</span>
          <button
            onClick={() => setActiveAudio(null)}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#005482]/20 border border-[#397CA0]/40 flex items-center justify-center">
            <Volume2 className="w-9 h-9 text-[#397CA0]" />
          </div>

          <h3 className="text-lg md:text-xl font-bold font-serif text-white mb-2 line-clamp-2">
            {activeAudio.title}
          </h3>

          <div className="flex items-center justify-center gap-2 text-xs text-white/70 mb-1">
            <User className="w-3.5 h-3.5 text-[#397CA0]" />
            <span>{activeAudio.speaker}</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-[#397CA0] mb-6">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{activeAudio.scripture}</span>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#005482]"
            />
            <div className="flex justify-between text-[11px] text-white/50 font-mono mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration || 2400)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => skipTime(-15)}
              className="p-2 text-white/70 hover:text-white transition-colors"
              title="Rewind 15s"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-[#005482] text-white flex items-center justify-center hover:bg-[#397CA0] transition-colors shadow-lg"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>

            <button
              onClick={() => skipTime(30)}
              className="p-2 text-white/70 hover:text-white transition-colors"
              title="Forward 30s"
            >
              <RotateCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
