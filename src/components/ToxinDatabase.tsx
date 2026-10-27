import React, { useState } from 'react';
import { usePet } from '../context/PetContext';
import { PET_SAFETY_DATABASE } from '../data/petSafetyDatabase';
import type { SafetyItem, SafetyLevel } from '../types';
import { Search, Filter, ShieldAlert, CheckCircle2, AlertTriangle, HelpCircle, ArrowRight } from 'lucide-react';

interface ToxinDatabaseProps {
  onSelectItem: (itemName: string) => void;
}

export const ToxinDatabase: React.FC<ToxinDatabaseProps> = ({ onSelectItem }) => {
  const { selectedSpecies, setSelectedSpecies } = usePet();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'food' | 'plant' | 'household' | 'medication'>('all');
  const [safetyFilter, setSafetyFilter] = useState<'all' | 'safe' | 'caution' | 'toxic'>('all');

  const filteredItems = PET_SAFETY_DATABASE.filter((item) => {
    // Search match
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      item.name.toLowerCase().includes(term) ||
      (item.scientificName && item.scientificName.toLowerCase().includes(term)) ||
      item.aliases.some((a) => a.toLowerCase().includes(term));

    // Category match
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;

    // Safety match
    const level: SafetyLevel = selectedSpecies === 'dog' ? item.safetyDog : item.safetyCat;
    const matchesSafety = safetyFilter === 'all' || level === safetyFilter;

    return matchesSearch && matchesCategory && matchesSafety;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Veterinary Toxin & Safety Index
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Search over 80+ scientifically verified foods, plants, and household substances for {selectedSpecies === 'dog' ? 'dogs 🐶' : 'cats 🐱'}.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search by food, plant, chemical, or generic name (e.g. Lilies, Grapes, Xylitol, Aloe)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          {/* Species Switch */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Species:</span>
            <div className="p-1 bg-slate-100 rounded-xl flex items-center text-xs font-bold">
              <button
                onClick={() => setSelectedSpecies('dog')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  selectedSpecies === 'dog' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                }`}
              >
                🐶 Dog
              </button>
              <button
                onClick={() => setSelectedSpecies('cat')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  selectedSpecies === 'cat' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                }`}
              >
                🐱 Cat
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold">
            {(['all', 'food', 'plant', 'household', 'medication'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl capitalize transition ${
                  categoryFilter === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Safety Filter */}
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            {(['all', 'safe', 'caution', 'toxic'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setSafetyFilter(level)}
                className={`px-3 py-1.5 rounded-xl capitalize transition ${
                  safetyFilter === level
                    ? level === 'toxic'
                      ? 'bg-red-600 text-white'
                      : level === 'caution'
                      ? 'bg-amber-500 text-white'
                      : level === 'safe'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-2">
        <span>Showing {filteredItems.length} verified substances</span>
        <span>Target: {selectedSpecies === 'dog' ? 'Canine' : 'Feline'} Safety</span>
      </div>

      {/* Grid of Substances */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => {
          const safetyLevel: SafetyLevel = selectedSpecies === 'dog' ? item.safetyDog : item.safetyCat;
          const isToxic = safetyLevel === 'toxic';
          const isCaution = safetyLevel === 'caution';
          const isSafe = safetyLevel === 'safe';

          return (
            <div
              key={item.id}
              onClick={() => onSelectItem(item.name)}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">{item.name}</h3>
                    {item.scientificName && (
                      <p className="text-[11px] text-slate-400 italic">{item.scientificName}</p>
                    )}
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${
                      isToxic
                        ? 'bg-rose-100 text-rose-800'
                        : isCaution
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {isToxic ? 'Toxic 🚨' : isCaution ? 'Caution ⚠️' : 'Safe ✅'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {selectedSpecies === 'dog' ? item.dogSummary : item.catSummary}
                </p>

                {item.toxicCompounds && item.toxicCompounds.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.toxicCompounds.map((tc, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                        {tc}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                <span className="capitalize text-slate-400 font-normal">Category: {item.category}</span>
                <span className="flex items-center gap-1 hover:translate-x-1 transition">
                  Full Details <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-lg">No Exact Match in Offline Index</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try searching a different synonym or use the AI Scanner to inspect food packaging labels or photo uploads. Remember: never classify an unknown substance as safe.
          </p>
        </div>
      )}
    </div>
  );
};
