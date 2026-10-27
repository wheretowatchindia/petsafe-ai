import React, { useState } from 'react';
import { usePet } from '../context/PetContext';
import { Shield, Sparkles, PawPrint, Menu, X, ChevronDown, Bell, HeartHandshake } from 'lucide-react';
import type { PetSpecies } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenPricing: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, onOpenPricing }) => {
  const { pets, activePetId, setActivePetId, selectedSpecies, setSelectedSpecies, subscription, reminders } = usePet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [petDropdownOpen, setPetDropdownOpen] = useState(false);

  const activePet = pets.find((p) => p.id === activePetId);
  const pendingRemindersCount = reminders.filter((r) => !r.completed).length;

  const handleSpeciesChange = (species: PetSpecies) => {
    setSelectedSpecies(species);
    // If active pet doesn't match this species, switch to first pet of this species or null
    if (activePet && activePet.species !== species) {
      const match = pets.find((p) => p.species === species);
      setActivePetId(match ? match.id : null);
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'scanner', label: 'Food & Plant Scanner' },
    { id: 'symptoms', label: 'Symptom Checker' },
    { id: 'database', label: 'Toxin Index' },
    { id: 'pets', label: 'My Pets' },
    { id: 'reminders', label: 'Care Reminders', badge: pendingRemindersCount > 0 ? pendingRemindersCount : undefined }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20">
              <Shield className="w-6 h-6 text-white stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">PetSafe</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  AI
                </span>
                <span className="text-base">🐶🐱</span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
                US Veterinary Safety Assistant
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setCurrentTab(link.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Species Selector & Active Pet Pill */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Species Switch */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-semibold">
              <button
                onClick={() => handleSpeciesChange('dog')}
                className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition ${
                  selectedSpecies === 'dog'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>🐶 Dog</span>
              </button>
              <button
                onClick={() => handleSpeciesChange('cat')}
                className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition ${
                  selectedSpecies === 'cat'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>🐱 Cat</span>
              </button>
            </div>

            {/* Active Pet Dropdown */}
            {pets.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setPetDropdownOpen(!petDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition"
                >
                  <div className={`w-5 h-5 rounded-full bg-gradient-to-tr ${activePet?.avatarColor || 'from-emerald-400 to-teal-500'} flex items-center justify-center text-white text-[10px] font-bold`}>
                    {activePet ? activePet.name.charAt(0) : 'P'}
                  </div>
                  <span className="max-w-[80px] truncate">{activePet ? activePet.name : 'Select Pet'}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {petDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50">
                    <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Switch Active Pet
                    </div>
                    {pets.map((pet) => (
                      <button
                        key={pet.id}
                        onClick={() => {
                          setActivePetId(pet.id);
                          setSelectedSpecies(pet.species);
                          setPetDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 ${
                          pet.id === activePetId ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'text-slate-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{pet.species === 'dog' ? '🐶' : '🐱'}</span>
                          <span>{pet.name}</span>
                        </span>
                        <span className="text-[10px] text-slate-400">{pet.breed || pet.species}</span>
                      </button>
                    ))}
                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setPetDropdownOpen(false);
                          setCurrentTab('pets');
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-emerald-700 font-medium hover:bg-slate-50 flex items-center gap-1.5"
                      >
                        <span>Manage Pet Profiles →</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Premium CTA */}
            {subscription.isPremium ? (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Premium Member</span>
              </span>
            ) : (
              <button
                onClick={onOpenPricing}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>$3.99/mo Premium</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {!subscription.isPremium && (
              <button
                onClick={onOpenPricing}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold"
              >
                $3.99
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          {/* Mobile Species Switch */}
          <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => handleSpeciesChange('dog')}
              className={`py-2 text-center text-xs font-bold rounded-lg ${
                selectedSpecies === 'dog' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              🐶 Dog Mode
            </button>
            <button
              onClick={() => handleSpeciesChange('cat')}
              className={`py-2 text-center text-xs font-bold rounded-lg ${
                selectedSpecies === 'cat' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              🐱 Cat Mode
            </button>
          </div>

          {/* Mobile Nav Links */}
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                  currentTab === link.id
                    ? 'bg-emerald-50 text-emerald-800 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Pricing link on mobile */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPricing();
            }}
            className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{subscription.isPremium ? 'Manage Subscription' : 'Upgrade to Premium ($3.99/mo)'}</span>
          </button>
        </div>
      )}
    </header>
  );
};
