import React from 'react';
import { X, MapPin, Compass, Calendar, CheckCircle2, Maximize2, Download } from 'lucide-react';
import type { PhotoDetails } from '../data/ardabil-data.ts';
import { formatElevation } from '../utils/ardabil-logic.ts';

interface LandmarkDetailModalProps {
  photo: PhotoDetails | null;
  onClose: () => void;
  onOpenLightbox: () => void;
}

export const LandmarkDetailModal: React.FC<LandmarkDetailModalProps> = ({
  photo,
  onClose,
  onOpenLightbox,
}) => {
  if (!photo) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = photo.image;
    link.download = `Ardabil_${photo.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-landmark-title"
    >
      <div className="relative w-full max-w-3xl bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        {/* Modal Header & Image Preview */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-stone-950 shrink-0">
          <img
            src={photo.image}
            alt={photo.nameEn}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/30 to-black/40" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-stone-950/70 border border-stone-700 text-stone-300 hover:text-white cursor-pointer backdrop-blur-md transition-all hover:scale-105"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Expand to Lightbox button */}
          <button
            onClick={() => {
              onClose();
              onOpenLightbox();
            }}
            className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-950/70 border border-stone-700 text-stone-200 hover:text-white cursor-pointer backdrop-blur-md text-xs font-medium transition-all hover:bg-stone-900/90"
            aria-label="Open high resolution viewer"
          >
            <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Full Resolution</span>
          </button>

          {/* Bottom Title on Image */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
              {photo.category.toUpperCase()}
            </span>
            <h2 id="modal-landmark-title" className="text-xl sm:text-2xl font-bold text-white">
              {photo.nameEn}
            </h2>
            <p className="text-sm text-amber-300/90 font-persian font-medium mt-0.5">
              {photo.nameFa}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-stone-300">
          {/* Key Quick Facts */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-stone-950/60 p-3 rounded-xl border border-stone-800 flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
              <div>
                <span className="block text-[10px] text-stone-400">COORDINATES</span>
                <span className="font-mono text-stone-200">{photo.coordinates.lat}°N, {photo.coordinates.lng}°E</span>
              </div>
            </div>

            <div className="bg-stone-950/60 p-3 rounded-xl border border-stone-800 flex items-center gap-2.5">
              <Compass className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className="block text-[10px] text-stone-400">ELEVATION</span>
                <span className="font-mono text-stone-200">{formatElevation(photo.elevationMeters)}</span>
              </div>
            </div>

            <div className="bg-stone-950/60 p-3 rounded-xl border border-stone-800 flex items-center gap-2.5 col-span-2 sm:col-span-1">
              <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="block text-[10px] text-stone-400">BEST SEASON</span>
                <span className="text-stone-200">{photo.bestTime}</span>
              </div>
            </div>
          </div>

          {/* Narrative History */}
          <div>
            <h3 className="text-sm font-semibold text-stone-100 uppercase tracking-wider mb-2">
              Historical & Architectural Overview
            </h3>
            <p className="text-sm leading-relaxed text-stone-300">
              {photo.fullHistory}
            </p>
          </div>

          {/* Key Highlights */}
          <div>
            <h3 className="text-sm font-semibold text-stone-100 uppercase tracking-wider mb-2.5">
              Notable Highlights
            </h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {photo.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 bg-stone-950/40 p-2.5 rounded-lg border border-stone-800/60">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-stone-300 font-medium">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-medium cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Wallpaper</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenLightbox();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold cursor-pointer transition-colors shadow-md shadow-amber-500/20"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Open in Studio Viewer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
