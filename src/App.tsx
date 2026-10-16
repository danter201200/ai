import React, { useState, useMemo } from 'react';
import { 
  Camera, MapPin, Maximize2, Download, Search, Filter, 
  Sparkles, Compass, Eye, SlidersHorizontal, ArrowUpRight,
  Info, Share2, Layers
} from 'lucide-react';
import { ARDABIL_PHOTOS } from './data/ardabil-data.ts';
import { filterLandmarks } from './utils/ardabil-logic.ts';
import { PhotoLightbox } from './components/PhotoLightbox.tsx';
import { LandmarkDetailModal } from './components/LandmarkDetailModal.tsx';
import { CompareSlider } from './components/CompareSlider.tsx';
import { CityStats } from './components/CityStats.tsx';
import { CityCulture } from './components/CityCulture.tsx';
import { AmbianceAudio } from './components/AmbianceAudio.tsx';
import type { PhotoDetails } from './data/ardabil-data.ts';

export default function App() {
  const [heroPhotoIndex, setHeroPhotoIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Landmark detail modal state
  const [activeModalPhoto, setActiveModalPhoto] = useState<PhotoDetails | null>(null);

  const heroPhoto = ARDABIL_PHOTOS[heroPhotoIndex];

  // Filtered photos
  const filteredPhotos = useMemo(() => {
    return filterLandmarks(ARDABIL_PHOTOS, searchQuery, selectedCategory) as PhotoDetails[];
  }, [searchQuery, selectedCategory]);

  const openLightboxForIndex = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handleHeroDownload = () => {
    const link = document.createElement('a');
    link.href = heroPhoto.image;
    link.download = `Ardabil_${heroPhoto.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-amber-500 selection:text-stone-950 font-sans">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 bg-stone-950/85 backdrop-blur-md border-b border-stone-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-base sm:text-lg text-white">ARDABIL</span>
                <span className="text-amber-400 font-persian text-sm font-normal">اردبیل</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-stone-900 text-stone-400 border border-stone-800">
                  38.25°N, 48.29°E
                </span>
              </div>
              <p className="text-[11px] text-stone-400 hidden sm:block">
                City of Safavids, Mount Sabalan & Historic Blue Domes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Ambiance Audio Toggle */}
            <AmbianceAudio />

            {/* Quick action to gallery */}
            <a
              href="#photo-gallery"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Explore Gallery</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full">
        {/* HERO SECTION */}
        <section className="relative rounded-3xl overflow-hidden border border-stone-800 bg-stone-900/40 shadow-2xl">
          {/* Main Hero Image */}
          <div className="relative min-h-[480px] sm:min-h-[420px] md:aspect-[21/9] w-full overflow-hidden bg-stone-950 flex flex-col justify-between p-4 sm:p-6">
            <img
              src={heroPhoto.image}
              alt={heroPhoto.nameEn}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out transform scale-100 hover:scale-[1.02]"
            />
            {/* Artistic gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/30 to-transparent hidden sm:block" />

            {/* View Switching Pills inside Hero */}
            <div className="relative flex flex-wrap items-center justify-between gap-2 z-10">
              <div className="flex items-center gap-1.5 bg-stone-950/80 backdrop-blur-md p-1 rounded-xl border border-stone-800/80 overflow-x-auto max-w-full">
                {ARDABIL_PHOTOS.map((photo, index) => (
                  <button
                    key={photo.id}
                    onClick={() => setHeroPhotoIndex(index)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all whitespace-nowrap ${
                      heroPhotoIndex === index
                        ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                        : 'text-stone-300 hover:text-white hover:bg-stone-900/80'
                    }`}
                    aria-label={`Show ${photo.nameEn}`}
                  >
                    {photo.nameEn.split(' ')[0]} {photo.nameEn.split(' ')[1] || ''}
                  </button>
                ))}
              </div>

              {/* Top Right Live Tag */}
              <div className="hidden sm:flex items-center gap-2 bg-stone-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-800/80 text-xs font-mono text-stone-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Ardabil, Iran</span>
                <span className="text-stone-500">|</span>
                <span className="text-amber-400">1,351m Alt</span>
              </div>
            </div>

            {/* Hero Text Content */}
            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 pt-12 sm:pt-0">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2.5 backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Featured Photography • {heroPhoto.category.toUpperCase()}</span>
                </div>
                <h1 className="text-xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  {heroPhoto.nameEn}
                </h1>
                <p className="text-sm sm:text-base text-amber-300/90 font-persian font-medium mt-1">
                  {heroPhoto.nameFa}
                </p>
                <p className="text-xs sm:text-sm text-stone-300 line-clamp-2 mt-2 leading-relaxed max-w-xl">
                  {heroPhoto.shortDescription}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 shrink-0 pt-2 sm:pt-0">
                <button
                  onClick={() => openLightboxForIndex(heroPhotoIndex)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs sm:text-sm font-bold cursor-pointer transition-all shadow-lg shadow-amber-500/20 hover:scale-105"
                  aria-label="Inspect high resolution photo in studio viewer"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Studio Viewer</span>
                </button>

                <button
                  onClick={() => setActiveModalPhoto(heroPhoto)}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs sm:text-sm font-semibold cursor-pointer transition-all backdrop-blur-md"
                  aria-label="View history and landmark details"
                >
                  <Info className="w-4 h-4 text-amber-400" />
                  <span className="inline">History</span>
                </button>

                <button
                  onClick={handleHeroDownload}
                  className="p-2.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-stone-700 text-stone-200 hover:text-white cursor-pointer transition-all backdrop-blur-md"
                  aria-label="Download high resolution wallpaper"
                  title="Download wallpaper"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CITY GEOGRAPHY & HERITAGE STATS */}
        <CityStats />

        {/* COMPARISON SLIDER SECTION */}
        <section className="my-14" aria-labelledby="compare-section-title">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <span className="text-amber-400 font-mono text-xs uppercase tracking-widest block mb-1">
                Interactive Comparison
              </span>
              <h2 id="compare-section-title" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Dual Perspectives of Ardabil
              </h2>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm max-w-md">
              Drag the center slider to compare Mount Sabalan’s snow-dusted volcanic panorama with the Safavid turquoise domes of Sheikh Safi al-Din.
            </p>
          </div>

          <CompareSlider photoA={ARDABIL_PHOTOS[0]} photoB={ARDABIL_PHOTOS[1]} />
        </section>

        {/* PHOTO GALLERY EXPLORER */}
        <section id="photo-gallery" className="my-14 scroll-mt-20" aria-labelledby="gallery-section-title">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-amber-400 font-mono text-xs uppercase tracking-widest block mb-1">
                Visual Archive
              </span>
              <h2 id="gallery-section-title" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                High-Resolution City Gallery
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm mt-1">
                Click on any photo to inspect architectural details, adjust color grading, or download in high resolution.
              </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search landmarks, tiles, lake..."
                  className="w-full pl-9 pr-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
                  aria-label="Search photos and landmarks"
                />
              </div>

              {/* Category pills */}
              <div className="flex items-center gap-1.5 bg-stone-900/80 p-1 rounded-xl border border-stone-800 w-full sm:w-auto overflow-x-auto">
                {[
                  { id: 'all', label: 'All Photos' },
                  { id: 'heritage', label: 'UNESCO Heritage' },
                  { id: 'nature', label: 'Mount & Lakes' },
                  { id: 'architecture', label: 'Bridges & Masonry' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors whitespace-nowrap ${
                      selectedCategory === cat.id
                        ? 'bg-amber-500 text-stone-950 font-semibold'
                        : 'text-stone-400 hover:text-white hover:bg-stone-800'
                    }`}
                    aria-pressed={selectedCategory === cat.id}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Photos Grid */}
          {filteredPhotos.length === 0 ? (
            <div className="text-center py-16 bg-stone-900/30 rounded-3xl border border-stone-800/60 p-8">
              <Search className="w-8 h-8 text-stone-600 mx-auto mb-3" />
              <p className="text-stone-300 font-medium text-sm">No photos match your search.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-3 text-xs text-amber-400 hover:underline cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {filteredPhotos.map((photo, index) => {
                const originalIndex = ARDABIL_PHOTOS.findIndex((p) => p.id === photo.id);
                return (
                  <article
                    key={photo.id}
                    className="group bg-stone-900/50 border border-stone-800/80 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-amber-500/5"
                  >
                    {/* Image Thumbnail Container */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-950 cursor-pointer"
                      onClick={() => openLightboxForIndex(originalIndex)}
                    >
                      <img
                        src={photo.image}
                        alt={photo.nameEn}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider bg-stone-950/80 text-amber-400 border border-stone-800 backdrop-blur-md">
                          {photo.category}
                        </span>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-stone-950/80 text-stone-300 border border-stone-800 backdrop-blur-md">
                          <MapPin className="w-3 h-3 text-rose-400" />
                          <span>{photo.elevationMeters}m</span>
                        </div>
                      </div>

                      {/* Hover Overlay Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                        <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-stone-950 text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          <Eye className="w-4 h-4" />
                          <span>View Fullscreen</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Description */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                            {photo.nameEn}
                          </h3>
                        </div>
                        <p className="text-xs text-amber-400/90 font-persian font-medium mb-2.5">
                          {photo.nameFa}
                        </p>
                        <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed mb-4">
                          {photo.shortDescription}
                        </p>

                        {/* EXIF Mini Badges */}
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-stone-400 mb-4">
                          <span className="bg-stone-950/80 px-2 py-0.5 rounded border border-stone-800">
                            {photo.cameraExif.focalLength}
                          </span>
                          <span className="bg-stone-950/80 px-2 py-0.5 rounded border border-stone-800">
                            {photo.cameraExif.aperture}
                          </span>
                          <span className="bg-stone-950/80 px-2 py-0.5 rounded border border-stone-800">
                            ISO {photo.cameraExif.iso}
                          </span>
                          <span className="bg-stone-950/80 px-2 py-0.5 rounded border border-stone-800 text-amber-400">
                            {photo.cameraExif.timeOfDay}
                          </span>
                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
                        <button
                          onClick={() => setActiveModalPhoto(photo)}
                          className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white font-medium cursor-pointer transition-colors"
                          aria-label={`Read history about ${photo.nameEn}`}
                        >
                          <Info className="w-3.5 h-3.5 text-amber-400" />
                          <span>History & Architecture</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = photo.image;
                              link.download = `Ardabil_${photo.id}.jpg`;
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }}
                            className="p-1.5 rounded-lg bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-white cursor-pointer transition-colors"
                            aria-label={`Download photo of ${photo.nameEn}`}
                            title="Download"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => openLightboxForIndex(originalIndex)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold cursor-pointer transition-colors"
                            aria-label={`Open photo viewer for ${photo.nameEn}`}
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                            <span>Inspect</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* CULTURAL HERITAGE CARDS */}
        <CityCulture />

        {/* GEOGRAPHY & TRAVEL SUMMARY */}
        <section className="my-14 bg-gradient-to-br from-stone-900/60 to-stone-950/80 border border-stone-800 rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Geographic Profile & Travel Highlights</h3>
              <p className="text-xs text-stone-400">Essential visitor coordinates and regional landscape facts</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-xs text-stone-300 mt-6">
            <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800/80">
              <span className="text-amber-400 font-semibold block text-sm mb-1">Alpine Plateau Climate</span>
              <p className="leading-relaxed text-stone-400">
                Ardabil enjoys crisp, cool summers and scenic snowfalls in winter. Average summer highs hover around 25°C (77°F), making it one of Iran’s favorite summer refuges from hot plains.
              </p>
            </div>

            <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800/80">
              <span className="text-cyan-400 font-semibold block text-sm mb-1">Caspian & Heyran Pass</span>
              <p className="leading-relaxed text-stone-400">
                Located just 70 km east of Ardabil through the breathtaking Heyran defile (Gardaneye Heyran), where lush Caspian temperate rainforests meet the high Azerbaijani plateau.
              </p>
            </div>

            <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800/80">
              <span className="text-emerald-400 font-semibold block text-sm mb-1">Hot Springs & Sarein</span>
              <p className="leading-relaxed text-stone-400">
                Directly fueled by Mount Sabalan’s geothermal reservoir, Sarein sits only 25 km west of Ardabil with over 10 world-class natural mineral thermal pools.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800/80 bg-stone-950 py-8 text-stone-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-300">Ardabil Visual Heritage</span>
            <span>•</span>
            <span className="font-persian text-amber-400/80">اردبیل، مهد صفویه و دیار سبلان سرفراز</span>
          </div>
          <div className="text-center sm:text-right">
            <span>Coordinates: 38.2514° N, 48.2973° E • Elevation: 1,351 m</span>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal */}
      <PhotoLightbox
        photos={ARDABIL_PHOTOS}
        currentIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onSelectIndex={(index) => setLightboxIndex(index)}
      />

      {/* Landmark History & Architecture Modal */}
      <LandmarkDetailModal
        photo={activeModalPhoto}
        onClose={() => setActiveModalPhoto(null)}
        onOpenLightbox={() => {
          if (activeModalPhoto) {
            const idx = ARDABIL_PHOTOS.findIndex((p) => p.id === activeModalPhoto.id);
            if (idx !== -1) {
              setLightboxIndex(idx);
              setIsLightboxOpen(true);
            }
          }
        }}
      />
    </div>
  );
}
