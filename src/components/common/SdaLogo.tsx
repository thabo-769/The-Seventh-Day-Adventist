import React from 'react';

interface SdaLogoProps {
  className?: string;
  size?: number;
  variant?: 'blue' | 'white' | 'dark';
  showText?: boolean;
  stacked?: boolean;
}

export const SdaLogo: React.FC<SdaLogoProps> = ({
  className = '',
  size = 44,
  variant = 'blue',
  showText = true,
  stacked = false,
}) => {
  const primaryColor = variant === 'white' ? '#FFFFFF' : variant === 'dark' ? '#080B10' : '#005482';
  const flameColor = variant === 'white' ? '#FFFFFF' : '#005482';
  const textColor = variant === 'white' ? 'text-white' : 'text-[#080B10]';
  const subtextColor = variant === 'white' ? 'text-white/80' : 'text-[#397CA0]';

  return (
    <div className={`inline-flex items-center ${stacked ? 'flex-col text-center' : 'flex-row gap-3'} ${className}`}>
      {/* Official Seventh-day Adventist Symbol SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200"
        aria-label="Seventh-day Adventist Church Emblem"
      >
        {/* Open Bible at the base */}
        <path
          d="M 14 96 C 36 94 56 100 60 106 C 64 100 84 94 106 96 C 104 88 86 84 60 88 C 34 84 16 88 14 96 Z"
          fill={primaryColor}
        />
        <path
          d="M 18 100 C 38 98 56 104 60 110 C 64 104 82 98 102 100 C 100 95 84 91 60 94 C 36 91 20 95 18 100 Z"
          fill={primaryColor}
          opacity="0.85"
        />

        {/* Central Cross */}
        <rect x="57" y="32" width="6" height="52" rx="1.5" fill={primaryColor} />
        <rect x="42" y="44" width="36" height="6" rx="1.5" fill={primaryColor} />

        {/* Left Flame sweeping upward and wrapping */}
        <path
          d="M 54 84 C 40 76 30 62 32 44 C 33 34 38 25 46 18 C 42 27 41 38 43 48 C 45 56 50 66 54 74 Z"
          fill={flameColor}
        />

        {/* Middle / Crown Flame */}
        <path
          d="M 60 12 C 63 20 66 28 66 38 C 66 48 64 56 60 64 C 58 56 56 46 56 36 C 56 26 58 18 60 12 Z"
          fill={flameColor}
          opacity="0.9"
        />

        {/* Right Flame sweeping upward and around */}
        <path
          d="M 66 84 C 80 76 90 62 88 44 C 87 34 82 25 74 18 C 78 27 79 38 77 48 C 75 56 70 66 66 74 Z"
          fill={flameColor}
        />
      </svg>

      {showText && (
        <div className={`leading-none ${stacked ? 'mt-2' : ''}`}>
          <div className={`text-[13px] md:text-[15px] font-bold tracking-wider uppercase font-sans ${textColor}`}>
            Seventh-day Adventist
          </div>
          <div className={`text-[10px] md:text-[11px] font-semibold tracking-[0.22em] uppercase mt-1 ${subtextColor}`}>
            Church
          </div>
        </div>
      )}
    </div>
  );
};
