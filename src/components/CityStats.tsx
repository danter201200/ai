import React from 'react';
import { Mountain, Award, Droplets, MapPin, Wind, Sparkles } from 'lucide-react';

export const CityStats: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 my-8">
      <div className="bg-stone-900/60 border border-stone-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-amber-500/40 transition-colors group">
        <div className="flex items-center justify-between text-stone-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">City Altitude</span>
          <Mountain className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
        </div>
        <div>
          <div className="text-2xl font-bold font-mono text-stone-100">1,351 m</div>
          <div className="text-xs text-stone-400">4,432 ft above sea level</div>
        </div>
      </div>

      <div className="bg-stone-900/60 border border-stone-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-amber-500/40 transition-colors group">
        <div className="flex items-center justify-between text-stone-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">Mount Sabalan</span>
          <Sparkles className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
        </div>
        <div>
          <div className="text-2xl font-bold font-mono text-cyan-200">4,811 m</div>
          <div className="text-xs text-stone-400">3rd Highest Peak in Iran</div>
        </div>
      </div>

      <div className="bg-stone-900/60 border border-stone-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-amber-500/40 transition-colors group">
        <div className="flex items-center justify-between text-stone-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">UNESCO Status</span>
          <Award className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
        </div>
        <div>
          <div className="text-2xl font-bold font-mono text-amber-300">2010</div>
          <div className="text-xs text-stone-400">Sheikh Safi Inscription</div>
        </div>
      </div>

      <div className="bg-stone-900/60 border border-stone-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-amber-500/40 transition-colors group">
        <div className="flex items-center justify-between text-stone-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">Coordinates</span>
          <MapPin className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
        </div>
        <div>
          <div className="text-xl font-bold font-mono text-stone-100">38.25° N</div>
          <div className="text-xs text-stone-400">48.29° E (NW Iran)</div>
        </div>
      </div>
    </div>
  );
};
