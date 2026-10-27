import React, { useState } from 'react';
import { usePet } from '../context/PetContext';
import type { PetProfile, PetSpecies } from '../types';
import { PawPrint, Plus, Trash2, Edit3, Check, X, ShieldAlert, Sparkles, Scale, Heart } from 'lucide-react';

interface PetProfilesProps {
  onOpenPricing: () => void;
}

export const PetProfiles: React.FC<PetProfilesProps> = ({ onOpenPricing }) => {
  const { pets, activePetId, setActivePetId, addPet, updatePet, deletePet, subscription } = usePet();

  const [isAddingPet, setIsAddingPet] = useState(false);
  const [editingPetId, setEditingPetId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [species, setSpecies] = useState<PetSpecies>('dog');
  const [breed, setBreed] = useState('');
  const [ageYears, setAgeYears] = useState(2);
  const [ageMonths, setAgeMonths] = useState(0);
  const [weightLbs, setWeightLbs] = useState(25);
  const [allergiesText, setAllergiesText] = useState('');
  const [notes, setNotes] = useState('');

  const resetForm = () => {
    setName('');
    setSpecies('dog');
    setBreed('');
    setAgeYears(2);
    setAgeMonths(0);
    setWeightLbs(25);
    setAllergiesText('');
    setNotes('');
    setIsAddingPet(false);
    setEditingPetId(null);
  };

  const handleStartEdit = (pet: PetProfile) => {
    setEditingPetId(pet.id);
    setName(pet.name);
    setSpecies(pet.species);
    setBreed(pet.breed || '');
    setAgeYears(pet.ageYears);
    setAgeMonths(pet.ageMonths);
    setWeightLbs(pet.weightLbs);
    setAllergiesText(pet.allergies.join(', '));
    setNotes(pet.notes || '');
    setIsAddingPet(true);
  };

  const handleSavePet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const allergies = allergiesText
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);

    const avatarColors = [
      'from-amber-400 to-amber-600',
      'from-purple-400 to-indigo-600',
      'from-emerald-400 to-teal-600',
      'from-rose-400 to-pink-600',
      'from-sky-400 to-blue-600'
    ];
    const randomAvatar = avatarColors[Math.floor(Math.random() * avatarColors.length)];

    if (editingPetId) {
      updatePet(editingPetId, {
        name,
        species,
        breed,
        ageYears,
        ageMonths,
        weightLbs,
        allergies,
        notes
      });
    } else {
      addPet({
        name,
        species,
        breed,
        ageYears,
        ageMonths,
        weightLbs,
        allergies,
        avatarColor: randomAvatar,
        notes
      });
    }

    resetForm();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            My Pet Profiles ({pets.length})
          </h1>
          <p className="text-sm text-slate-600">
            Manage your dogs and cats to customize food toxicity calculations and dosage guidance.
          </p>
        </div>

        {!isAddingPet && (
          <button
            onClick={() => {
              resetForm();
              setIsAddingPet(true);
            }}
            className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Pet</span>
          </button>
        )}
      </div>

      {/* Add / Edit Form Modal or Card */}
      {isAddingPet && (
        <form
          onSubmit={handleSavePet}
          className="bg-white rounded-3xl border-2 border-emerald-400 p-6 sm:p-8 shadow-md space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="font-extrabold text-lg text-slate-900">
              {editingPetId ? 'Edit Pet Profile' : 'Add New Companion'}
            </h3>
            <button
              type="button"
              onClick={resetForm}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pet Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Pet Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Milo, Bella, Charlie..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            {/* Species */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Species *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSpecies('dog')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    species === 'dog'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  🐶 Dog
                </button>
                <button
                  type="button"
                  onClick={() => setSpecies('cat')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    species === 'cat'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  🐱 Cat
                </button>
              </div>
            </div>

            {/* Breed */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Breed (if known)
              </label>
              <input
                type="text"
                placeholder="e.g. Labrador Retriever, Siamese, Mix..."
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            {/* Approximate Weight */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Weight in Pounds (lbs) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="250"
                  required
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
                <span className="absolute right-3.5 top-2.5 text-xs font-bold text-slate-400">lbs</span>
              </div>
            </div>

            {/* Age */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Age
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={ageYears}
                    onChange={(e) => setAgeYears(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
                  />
                  <span className="absolute right-2.5 top-2.5 text-[10px] font-bold text-slate-400">Years</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="11"
                    value={ageMonths}
                    onChange={(e) => setAgeMonths(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
                  />
                  <span className="absolute right-2.5 top-2.5 text-[10px] font-bold text-slate-400">Months</span>
                </div>
              </div>
            </div>

            {/* Known Allergies */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Known Allergies & Sensitivities
              </label>
              <input
                type="text"
                placeholder="e.g. Chicken, Beef, Dairy, Grain (comma separated)"
                value={allergiesText}
                onChange={(e) => setAllergiesText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Special Care Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. History of pancreatitis, sensitive stomach, outdoor explorer..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
            >
              {editingPetId ? 'Update Pet' : 'Save Companion'}
            </button>
          </div>
        </form>
      )}

      {/* Pet Profiles List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pets.map((pet) => {
          const isActive = pet.id === activePetId;

          return (
            <div
              key={pet.id}
              className={`bg-white rounded-3xl border-2 p-6 shadow-sm transition-all duration-200 ${
                isActive ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/10' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${pet.avatarColor} text-white flex items-center justify-center font-black text-xl shadow-xs`}
                  >
                    {pet.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-xl text-slate-900">{pet.name}</h3>
                      <span className="text-base">{pet.species === 'dog' ? '🐶' : '🐱'}</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      {pet.breed || (pet.species === 'dog' ? 'Canine' : 'Feline')} • {pet.ageYears}y {pet.ageMonths}m
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleStartEdit(pet)}
                    className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
                    title="Edit profile"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deletePet(pet.id)}
                    className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
                    title="Delete profile"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Weight & Stats */}
              <div className="mt-5 grid grid-cols-2 gap-2 text-center">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Weight</span>
                  <span className="text-sm font-black text-slate-800">{pet.weightLbs} lbs</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Status</span>
                  <span className={`text-xs font-bold ${isActive ? 'text-emerald-700' : 'text-slate-500'}`}>
                    {isActive ? 'Active Companion' : 'Standby'}
                  </span>
                </div>
              </div>

              {/* Allergies */}
              {pet.allergies.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Known Allergies:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {pet.allergies.map((all, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-xs font-medium">
                        🛡️ {all}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {pet.notes && (
                <p className="mt-3 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl italic">
                  "{pet.notes}"
                </p>
              )}

              {/* Select Active Pet Button */}
              {!isActive && (
                <button
                  onClick={() => setActivePetId(pet.id)}
                  className="w-full mt-4 py-2 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 font-bold text-xs transition cursor-pointer"
                >
                  Set as Active Companion
                </button>
              )}
            </div>
          );
        })}
      </div>

      {pets.length === 0 && !isAddingPet && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <PawPrint className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-lg">No Pet Profiles Added Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Create profiles for your dogs and cats to keep their weights, allergies, and reminder schedules handy.
          </p>
          <button
            onClick={() => setIsAddingPet(true)}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
          >
            Create First Profile
          </button>
        </div>
      )}
    </div>
  );
};
