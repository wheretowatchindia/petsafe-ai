import React from 'react';
import { usePet } from '../context/PetContext';
import { Camera, AlertCircle, ShieldAlert, Sparkles, Search, ArrowRight, CheckCircle2, AlertTriangle, XCircle, HeartPulse, Stethoscope, Phone } from 'lucide-react';
import { PET_SAFETY_DATABASE } from '../data/petSafetyDatabase';

interface HeroHomeProps {
  onScanClick: () => void;
  onSymptomsClick: () => void;
  onDatabaseClick: () => void;
  onPricingClick: () => void;
  onSelectItemForScan: (itemName: string) => void;
}

export const HeroHome: React.FC<HeroHomeProps> = ({
  onScanClick,
  onSymptomsClick,
  onDatabaseClick,
  onPricingClick,
  onSelectItemForScan
}) => {
  const { selectedSpecies, setSelectedSpecies } = usePet();

  // Pick top high-interest cards for home showcase
  const popularCards = [
    { id: 'chocolate', title: 'Chocolate', badge: 'Toxic', color: 'red', desc: 'Theobromine causes arrhythmias & seizures.' },
    { id: 'xylitol', title: 'Xylitol (Birch Sugar)', badge: 'Deadly', color: 'red', desc: 'Sudden lethal hypoglycemia in dogs within 30m.' },
    { id: 'lilies', title: 'Lilies (True Lilies)', badge: selectedSpecies === 'cat' ? '100% Fatal (Cats)' : 'Caution', color: 'red', desc: 'Pollen or petals cause acute kidney shutdown in cats.' },
    { id: 'grapes-raisins', title: 'Grapes & Raisins', badge: 'Toxic', color: 'red', desc: 'Tartaric acid triggers sudden acute kidney failure.' },
    { id: 'peanut-butter', title: 'Peanut Butter', badge: 'Safe (Check Xylitol)', color: 'emerald', desc: 'Safe treat, verify no birch sugar or artificial sweeteners.' },
    { id: 'blueberries', title: 'Blueberries', badge: 'Safe', color: 'emerald', desc: 'Antioxidant-rich, low calorie treat for dogs & cats.' }
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-emerald-50/70 via-teal-50/30 to-white rounded-3xl border border-emerald-100/60 shadow-xs px-4 sm:px-8 text-center">
        {/* Subtle decorative background blurbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10 space-y-6">
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>US Veterinary Toxicological Reference Standards (ASPCA & AVMA)</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Is It Safe for Your Pet?
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Check foods, plants, and household substances before your furry friend gets near them. Get immediate clarity for dogs and cats.
          </p>

          {/* Species Selector Bar */}
          <div className="inline-flex items-center p-1.5 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <button
              onClick={() => setSelectedSpecies('dog')}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-2 ${
                selectedSpecies === 'dog'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="text-lg">🐶</span>
              <span>Dog Mode</span>
            </button>
            <button
              onClick={() => setSelectedSpecies('cat')}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-2 ${
                selectedSpecies === 'cat'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="text-lg">🐱</span>
              <span>Cat Mode</span>
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={onScanClick}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-sm shadow-emerald-600/30 hover:shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Camera className="w-5 h-5" />
              <span>Scan Something</span>
            </button>

            <button
              onClick={onSymptomsClick}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-base shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <HeartPulse className="w-5 h-5 text-rose-500" />
              <span>Check Symptoms</span>
            </button>
          </div>

          {/* Disclaimer Pill */}
          <p className="text-[11px] text-slate-400 max-w-lg mx-auto pt-2">
            ⚠️ <strong>Medical Disclaimer:</strong> PetSafe AI is an educational tool and does not provide veterinary medical diagnosis. If ingestion has occurred, contact an emergency veterinarian or animal poison control immediately.
          </p>
        </div>
      </section>

      {/* Emergency Fast-Access Card */}
      <section className="bg-gradient-to-r from-red-500/10 via-rose-50 to-amber-50/50 border border-red-200 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-red-700 font-bold text-sm tracking-wide uppercase">
              <ShieldAlert className="w-5 h-5 text-red-600" />
              <span>Suspect Acute Poisoning or Emergency?</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Minutes Matter with Toxins like Lilies, Xylitol & Rat Bait
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Never wait for symptoms to appear or delay care while waiting for an AI response. If your pet consumed a known toxin, call animal poison control or your local emergency vet immediately.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href="tel:18884264435"
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm shadow-red-500/30 transition text-center"
            >
              <Phone className="w-4 h-4" />
              <span>ASPCA (888) 426-4435</span>
            </a>
            <a
              href="tel:18557647661"
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white hover:bg-red-50 text-red-700 border border-red-300 font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition text-center"
            >
              <Phone className="w-4 h-4 text-red-600" />
              <span>Pet Poison (855) 764-7661</span>
            </a>
          </div>
        </div>
      </section>

      {/* Popular Food & Plant Safety Cards */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Popular Safety Lookups ({selectedSpecies === 'dog' ? 'Dogs 🐶' : 'Cats 🐱'})
            </h2>
            <p className="text-sm text-slate-500">
              Click any card to inspect immediate veterinary safety guidelines and precautions.
            </p>
          </div>

          <button
            onClick={onDatabaseClick}
            className="text-emerald-700 hover:text-emerald-800 text-sm font-bold flex items-center gap-1 transition"
          >
            <span>Browse Full 80+ Toxin Index</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularCards.map((card) => {
            const isToxic = card.color === 'red';
            return (
              <div
                key={card.id}
                onClick={() => onSelectItemForScan(card.title)}
                className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-md bg-white ${
                  isToxic
                    ? 'border-red-100 hover:border-red-300'
                    : 'border-emerald-100 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-extrabold text-base text-slate-900">{card.title}</span>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      isToxic
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {card.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {card.desc}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>Veterinary Safety Profile</span>
                  <span className="text-emerald-600 group-hover:translate-x-1 transition">Inspect →</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How PetSafe AI Works */}
      <section className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/80 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            How PetSafe AI Protects Your Companion
          </h2>
          <p className="text-sm text-slate-600">
            Engineered with a provider-independent AI architecture and zero cloud key leakage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-lg">
              1
            </div>
            <h4 className="font-bold text-slate-900 text-base">Snap or Search Any Item</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload a photo of food packaging, indoor plants, or type any human snack or medication.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-black text-lg">
              2
            </div>
            <h4 className="font-bold text-slate-900 text-base">Species-Specific Toxin Match</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Compounds harmless to humans or dogs can be fatal to cats (e.g. Lilies & Tylenol). We calculate species-specific risks.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-black text-lg">
              3
            </div>
            <h4 className="font-bold text-slate-900 text-base">Actionable Veterinary Guidance</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Get immediate precautions, safe dose thresholds, symptoms to monitor, and exact next steps.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-lg">
        <div className="max-w-2xl space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>PetSafe AI Premium</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Keep All Your Pets Safe for Just $3.99/Month
          </h2>
          <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
            Unlock unlimited AI food & plant scans, multi-pet profiles with allergy tracking, vaccination reminders, and an ad-free experience.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onPricingClick}
              className="px-6 py-3 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-sm shadow-md transition cursor-pointer"
            >
              View Free vs Premium Plans
            </button>
            <span className="text-xs text-emerald-200 font-medium">
              Cancel anytime • Zero hidden contracts
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
