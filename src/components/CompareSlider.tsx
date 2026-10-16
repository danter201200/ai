import React, { useState, useRef, useCallback } from 'react';
import type { PhotoDetails } from '../data/ardabil-data.ts';

interface CompareSliderProps {
  photoA: PhotoDetails;
  photoB: PhotoDetails;
}

export const CompareSlider: React.FC<CompareSliderProps> = ({ photoA, photoB }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 shadow-2xl">
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/9] select-none cursor-ew-resize overflow-hidden"
        onMouseDown={(e) => {
          isDragging.current = true;
          handleMove(e.clientX);
        }}
        onMouseUp={() => {
          isDragging.current = false;
        }}
        onMouseLeave={() => {
          isDragging.current = false;
        }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* Photo B (Background / Right Side) */}
        <img
          src={photoB.image}
          alt={photoB.nameEn}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Photo A (Foreground / Left Side with clip-path) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={photoA.image}
            alt={photoA.nameEn}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Divider Bar */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-amber-400 cursor-ew-resize z-10 shadow-[0_0_12px_rgba(251,191,36,0.8)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-stone-950 border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-lg text-xs font-bold pointer-events-none">
            ⇄
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 z-10 bg-stone-950/85 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-stone-800 text-[10px] sm:text-xs font-medium text-stone-200 max-w-[42%] truncate">
          <span className="text-amber-400 font-semibold mr-1">View A:</span>
          <span>{photoA.nameEn.split(' ')[0]}</span>
        </div>
        <div className="absolute top-3 right-3 z-10 bg-stone-950/85 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-stone-800 text-[10px] sm:text-xs font-medium text-stone-200 max-w-[42%] truncate text-right">
          <span className="text-amber-400 font-semibold mr-1">View B:</span>
          <span>{photoB.nameEn.split(' ')[0]}</span>
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-stone-950/85 backdrop-blur-md px-3 py-1 rounded-full border border-stone-800/80 text-[10px] sm:text-[11px] text-stone-400 whitespace-nowrap">
          Drag slider or tap to compare
        </div>
      </div>
    </div>
  );
};
