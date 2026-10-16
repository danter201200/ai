import React, { useState, useEffect } from 'react';
import { 
  X, ZoomIn, ZoomOut, RotateCcw, Download, Copy, Check, 
  ChevronLeft, ChevronRight, Sliders, MapPin, Compass, Camera, Sparkles
} from 'lucide-react';
import type { PhotoDetails } from '../data/ardabil-data.ts';
import { PHOTO_FILTERS, formatElevation } from '../utils/ardabil-logic.ts';

interface PhotoLightboxProps {
  photos: PhotoDetails[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onSelectIndex,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeFilterId, setActiveFilterId] = useState('original');
  const [copied, setCopied] = useState(false);
  const [showExif, setShowExif] = useState(true);

  const currentPhoto = photos[currentIndex];

  useEffect(() => {
    // Reset zoom & filter on photo change
    setZoomLevel(1);
  }, [currentIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, photos.length]);

  if (!isOpen || !currentPhoto) return null;

  const handleNext = () => {
    onSelectIndex((currentIndex + 1) % photos.length);
  };

  const handlePrev = () => {
    onSelectIndex((currentIndex - 1 + photos.length) % photos.length);
  };

  const activeFilter = PHOTO_FILTERS.find((f) => f.id === activeFilterId) || PHOTO_FILTERS[0];

  const handleCopyDetails = async () => {
    const text = `${currentPhoto.nameEn} (${currentPhoto.nameFa})\nCoordinates: ${currentPhoto.coordinates.lat}° N, ${currentPhoto.coordinates.lng}° E\nElevation: ${formatElevation(currentPhoto.elevationMeters)}\n${currentPhoto.shortDescription}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentPhoto.image;
    link.download = `Ardabil_${currentPhoto.id}_highres.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col bg-stone-950/95 backdrop-blur-xl animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo viewer for ${currentPhoto.nameEn}`}
    >
      {/* Top Bar */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-stone-800/80 bg-stone-950/80 z-20">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold text-stone-100 flex items-center gap-2">
              <span>{currentPhoto.nameEn}</span>
              <span className="text-xs text-amber-400 font-persian font-normal">{currentPhoto.nameFa}</span>
            </h2>
            <span className="text-xs text-stone-400">
              Photo {currentIndex + 1} of {photos.length} • {currentPhoto.cameraExif.timeOfDay}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Zoom controls */}
          <div className="flex items-center bg-stone-900 border border-stone-800 rounded-lg p-0.5">
            <button
              onClick={() => setZoomLevel((z) => Math.max(1, z - 0.5))}
              disabled={zoomLevel <= 1}
              className="p-1.5 text-stone-400 hover:text-stone-100 disabled:opacity-40 rounded cursor-pointer"
              aria-label="Zoom out"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2 text-xs font-mono text-stone-300 min-w-[3rem] text-center">
              {zoomLevel}x
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.5))}
              disabled={zoomLevel >= 2.5}
              className="p-1.5 text-stone-400 hover:text-stone-100 disabled:opacity-40 rounded cursor-pointer"
              aria-label="Zoom in"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            {zoomLevel > 1 && (
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 text-amber-400 hover:text-amber-300 rounded cursor-pointer border-l border-stone-800"
                aria-label="Reset zoom"
                title="Reset zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Toggle EXIF / info */}
          <button
            onClick={() => setShowExif(!showExif)}
            className={`p-2 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
              showExif 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
            }`}
            aria-label="Toggle camera details"
            title="Toggle camera and geographic telemetry"
          >
            <Camera className="w-4 h-4" />
          </button>

          {/* Copy info */}
          <button
            onClick={handleCopyDetails}
            className="p-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white rounded-lg cursor-pointer transition-colors"
            aria-label="Copy photo details and coordinates"
            title="Copy details"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          {/* Direct Download */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-medium text-xs rounded-lg cursor-pointer transition-all shadow-sm shadow-amber-500/20"
            aria-label="Download high resolution photo"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>

          {/* Close modal */}
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg cursor-pointer ml-1"
            aria-label="Close photo viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main View Area */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden p-2 sm:p-6 select-none">
        {/* Prev / Next buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-stone-950/70 border border-stone-800 text-stone-300 hover:text-white hover:bg-stone-900/90 hover:scale-110 cursor-pointer transition-all backdrop-blur-md"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-stone-950/70 border border-stone-800 text-stone-300 hover:text-white hover:bg-stone-900/90 hover:scale-110 cursor-pointer transition-all backdrop-blur-md"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Photographic Canvas Image */}
        <div 
          className="w-full h-full flex items-center justify-center overflow-auto cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'pinch-zoom' }}
        >
          <div
            className="transition-transform duration-200 ease-out origin-center max-w-full max-h-full flex items-center justify-center"
            style={{
              transform: `scale(${zoomLevel})`,
            }}
          >
            <img
              src={currentPhoto.image}
              alt={currentPhoto.nameEn}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] w-auto max-w-[92vw] object-contain rounded-lg shadow-2xl shadow-black/80 transition-all duration-300"
              style={{
                filter: activeFilter.cssFilter,
              }}
            />
          </div>
        </div>

        {/* Telemetry & EXIF overlay (collapsible) */}
        {showExif && (
          <aside className="absolute bottom-16 sm:bottom-20 left-4 right-4 sm:right-auto sm:w-84 bg-stone-950/90 border border-stone-800/80 rounded-xl p-3.5 backdrop-blur-md z-20 shadow-xl text-xs space-y-2.5 pointer-events-auto animate-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between pb-1.5 border-b border-stone-800">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold tracking-wide uppercase text-[10px]">
                <Sparkles className="w-3 h-3" />
                <span>Telemetry & EXIF Data</span>
              </div>
              <span className="text-[10px] text-stone-400 font-mono">ARD-AZ-IR</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-stone-300">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-stone-400">Coordinates</div>
                  <div className="font-mono text-[11px] text-stone-200">
                    {currentPhoto.coordinates.lat}°N, {currentPhoto.coordinates.lng}°E
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-1.5">
                <Compass className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-stone-400">Altitude</div>
                  <div className="font-mono text-[11px] text-stone-200">
                    {formatElevation(currentPhoto.elevationMeters)}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-1 border-t border-stone-900 grid grid-cols-3 gap-1 text-[11px] font-mono text-stone-300">
              <div className="bg-stone-900/60 p-1.5 rounded border border-stone-800/50">
                <span className="text-[9px] block text-stone-400">LENS</span>
                {currentPhoto.cameraExif.focalLength}
              </div>
              <div className="bg-stone-900/60 p-1.5 rounded border border-stone-800/50">
                <span className="text-[9px] block text-stone-400">APERTURE</span>
                {currentPhoto.cameraExif.aperture}
              </div>
              <div className="bg-stone-900/60 p-1.5 rounded border border-stone-800/50">
                <span className="text-[9px] block text-stone-400">SHUTTER</span>
                {currentPhoto.cameraExif.shutterSpeed}
              </div>
            </div>

            <div className="text-[11px] text-stone-400 flex items-center justify-between pt-0.5">
              <span>Lighting: {currentPhoto.cameraExif.lighting}</span>
              <span className="text-amber-400/90 font-mono">ISO {currentPhoto.cameraExif.iso}</span>
            </div>
          </aside>
        )}
      </div>

      {/* Bottom Filter & Presets Toolbar */}
      <footer className="border-t border-stone-800/80 bg-stone-950/90 px-4 py-2.5 z-20 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-full">
          <span className="text-xs text-stone-400 flex items-center gap-1 mr-1 shrink-0">
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Color Grade:</span>
          </span>
          {PHOTO_FILTERS.map((filter) => {
            const isSelected = activeFilterId === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilterId(filter.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-all shrink-0 ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                    : 'bg-stone-900/80 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800/60'
                }`}
                title={filter.description}
                aria-pressed={isSelected}
              >
                {filter.name}
              </button>
            );
          })}
        </div>

        {/* Thumbnail Selector Strip */}
        <div className="hidden md:flex items-center gap-2">
          {photos.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => onSelectIndex(idx)}
              className={`w-12 h-8 rounded overflow-hidden border transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'border-amber-400 ring-2 ring-amber-400/30 scale-105'
                  : 'border-stone-800 opacity-60 hover:opacity-100'
              }`}
              aria-label={`Jump to photo ${p.nameEn}`}
            >
              <img
                src={p.image}
                alt=""
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
};
