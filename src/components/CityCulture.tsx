import React from 'react';
import { Flower2, Waves, Flame, Sparkles } from 'lucide-react';
import { CITY_CULTURE_CARDS } from '../data/ardabil-data.ts';

export const CityCulture: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flower2':
        return <Flower2 className="w-5 h-5 text-amber-400" />;
      case 'Waves':
        return <Waves className="w-5 h-5 text-cyan-400" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-orange-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-300" />;
    }
  };

  return (
    <section className="my-14" aria-labelledby="culture-section-title">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
        <div>
          <span className="text-amber-400 font-mono text-xs uppercase tracking-widest block mb-1">
            Heritage & Treasures
          </span>
          <h2 id="culture-section-title" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Culture & Traditions of Ardabil
          </h2>
        </div>
        <p className="text-stone-400 text-xs sm:text-sm max-w-md">
          From ancient Safavid silk looms to the nectar of alpine clover beneath Mount Sabalan.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CITY_CULTURE_CARDS.map((card, idx) => (
          <div
            key={idx}
            className="bg-stone-900/50 border border-stone-800/80 rounded-2xl p-5 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="w-10 h-10 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              {getIcon(card.icon)}
            </div>
            <h3 className="text-base font-semibold text-stone-100 group-hover:text-amber-300 transition-colors">
              {card.title}
            </h3>
            <span className="text-xs text-amber-400/90 font-persian font-medium block mt-0.5 mb-2.5">
              {card.titleFa}
            </span>
            <p className="text-xs text-stone-400 leading-relaxed">
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
