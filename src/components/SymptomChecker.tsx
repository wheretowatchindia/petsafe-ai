import React, { useState } from 'react';
import { usePet } from '../context/PetContext';
import { SYMPTOM_DATABASE } from '../data/symptomDatabase';
import type { SymptomItem, TriageUrgency } from '../types';
import { 
  HeartPulse, ShieldAlert, AlertTriangle, Info, CheckCircle2, 
  Phone, Printer, ChevronRight, Stethoscope, Clock, ShieldCheck
} from 'lucide-react';

export const SymptomChecker: React.FC = () => {
  const { selectedSpecies, activePet } = usePet();
  const [selectedSymptomIds, setSelectedSymptomIds] = useState<string[]>([]);
  const [symptomDuration, setSymptomDuration] = useState<'hours' | '1-2days' | 'chronic'>('hours');
  const [customNotes, setCustomNotes] = useState('');
  const [triageGenerated, setTriageGenerated] = useState(false);

  const toggleSymptom = (id: string) => {
    setSelectedSymptomIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const selectedSymptoms = SYMPTOM_DATABASE.filter((s) => selectedSymptomIds.includes(s.id));

  // Determine overall urgency
  const hasEmergencyFlag = selectedSymptoms.some((s) => s.isEmergencyRedFlag);
  const hasUrgentFlag = selectedSymptoms.some((s) => s.urgency === 'urgent');

  const overallUrgency: TriageUrgency = hasEmergencyFlag
    ? 'emergency'
    : hasUrgentFlag
    ? 'urgent'
    : 'monitor';

  const handlePrintSummary = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
          <HeartPulse className="w-3.5 h-3.5 text-rose-600" />
          <span>Veterinary Educational Triage & Symptom Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Pet Symptom Assistant
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Select what your {selectedSpecies === 'dog' ? 'dog 🐶' : 'cat 🐱'} is experiencing. We provide clinical educational urgency guidance to help you decide when to visit the clinic.
        </p>
      </div>

      {/* Critical Red Flag Callout if Selected */}
      {hasEmergencyFlag && (
        <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-3xl p-6 sm:p-8 shadow-lg border-2 border-red-500 animate-pulse-slow">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/60 text-xs font-black tracking-wider uppercase">
                <ShieldAlert className="w-4 h-4 text-white" />
                <span>CODE RED: IMMEDIATE EMERGENCY ACTION REQUIRED</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black">
                Potential Life-Threatening Red Flag Detected
              </h3>
              <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
                Symptoms like difficulty breathing, collapse, active seizures, acute poisoning, or inability to urinate (especially in male cats) require immediate veterinary medical attention. Do NOT delay seeking hands-on care.
              </p>
            </div>

            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <a
                href="tel:18884264435"
                className="px-5 py-3 rounded-2xl bg-white text-red-700 hover:bg-red-50 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm text-center"
              >
                <Phone className="w-4 h-4" />
                <span>ASPCA (888) 426-4435</span>
              </a>
              <span className="text-[11px] text-red-200 text-center font-medium">
                Available 24/7/365 across the USA
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Symptom Selection Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">
              Select Observed Symptoms ({selectedSpecies === 'dog' ? 'Dog' : 'Cat'})
            </h2>
            <p className="text-xs text-slate-500">
              Check all that apply. Red marked items represent critical veterinary emergencies.
            </p>
          </div>
          {selectedSymptomIds.length > 0 && (
            <button
              onClick={() => setSelectedSymptomIds([])}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600"
            >
              Clear All ({selectedSymptomIds.length})
            </button>
          )}
        </div>

        {/* Symptoms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SYMPTOM_DATABASE.map((symptom) => {
            const isSelected = selectedSymptomIds.includes(symptom.id);
            const isRedFlag = symptom.isEmergencyRedFlag;

            return (
              <div
                key={symptom.id}
                onClick={() => toggleSymptom(symptom.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                  isSelected
                    ? isRedFlag
                      ? 'border-red-500 bg-red-50/50 shadow-xs'
                      : 'border-emerald-500 bg-emerald-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {}} // controlled by parent div
                  className={`mt-1 h-4 w-4 rounded focus:ring-0 ${
                    isRedFlag ? 'text-red-600' : 'text-emerald-600'
                  }`}
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-sm font-bold text-slate-900">{symptom.name}</span>
                    {isRedFlag && (
                      <span className="text-[10px] font-extrabold bg-red-100 text-red-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        🚨 Emergency
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {symptom.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Duration & Context */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Onset / Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSymptomDuration('hours')}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition text-center ${
                  symptomDuration === 'hours'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Under 12 hrs
              </button>
              <button
                type="button"
                onClick={() => setSymptomDuration('1-2days')}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition text-center ${
                  symptomDuration === '1-2days'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                1 - 2 Days
              </button>
              <button
                type="button"
                onClick={() => setSymptomDuration('chronic')}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition text-center ${
                  symptomDuration === 'chronic'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                3+ Days / Chronic
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="custom-notes" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Additional Observations (Optional)
            </label>
            <input
              id="custom-notes"
              type="text"
              placeholder="e.g. Ate chicken bone yesterday, vomited twice, gums look pink..."
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Generate Triage Analysis Button */}
        <div className="pt-2">
          <button
            onClick={() => setTriageGenerated(true)}
            disabled={selectedSymptoms.length === 0}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md transition disabled:opacity-40 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Stethoscope className="w-4 h-4" />
            <span>Generate Veterinary Triage Guidance ({selectedSymptoms.length} Selected)</span>
          </button>
        </div>
      </div>

      {/* Triage Guidance Assessment Card */}
      {triageGenerated && selectedSymptoms.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-8 space-y-6">
          {/* Urgency Badge */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Triage Urgency Level
              </span>
              <div className="flex items-center gap-2 mt-1">
                {overallUrgency === 'emergency' && (
                  <span className="px-3.5 py-1.5 rounded-full bg-red-100 text-red-800 border border-red-200 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                    <span>EMERGENCY: Immediate Vet Visit Needed</span>
                  </span>
                )}
                {overallUrgency === 'urgent' && (
                  <span className="px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>URGENT: Contact Veterinarian Within 24 Hours</span>
                  </span>
                )}
                {overallUrgency === 'monitor' && (
                  <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>HOME MONITORING: Safe At-Home Observation</span>
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handlePrintSummary}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Summary for Vet</span>
            </button>
          </div>

          {/* Educational Insights for Selected Symptoms */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Educational Breakdown of Observed Symptoms
            </h3>
            <div className="space-y-3">
              {selectedSymptoms.map((symptom) => (
                <div key={symptom.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{symptom.name}</span>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase">
                      Category: {symptom.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {symptom.description}
                  </p>

                  {/* Species Specific Note */}
                  {selectedSpecies === 'dog' && symptom.dogSpecificNotes && (
                    <p className="text-xs text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                      <strong>🐶 Canine Specific:</strong> {symptom.dogSpecificNotes}
                    </p>
                  )}
                  {selectedSpecies === 'cat' && symptom.catSpecificNotes && (
                    <p className="text-xs text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                      <strong>🐱 Feline Specific:</strong> {symptom.catSpecificNotes}
                    </p>
                  )}

                  <div className="pt-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Possible Causes to Discuss with Vet:
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {symptom.possibleCauses.map((cause, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 text-[11px]">
                          {cause}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* At-Home Hydration & Safe Care Guide */}
          <div className="p-5 rounded-2xl bg-sky-50 border border-sky-100 space-y-3">
            <h4 className="font-bold text-sky-900 text-sm flex items-center gap-1.5">
              <Info className="w-4 h-4 text-sky-700" />
              <span>Safe Home Checks While Awaiting Vet Advice</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-sky-950">
              <div className="p-3 bg-white/70 rounded-xl border border-sky-200">
                <span className="font-bold block text-slate-900 mb-1">1. Gum Color & Capillary Refill:</span>
                Lift upper lip. Gums should be moist and bubblegum pink. If they are pale, white, brick-red, yellow, or tacky, notify the vet immediately.
              </div>
              <div className="p-3 bg-white/70 rounded-xl border border-sky-200">
                <span className="font-bold block text-slate-900 mb-1">2. Skin Turgor (Tent Test):</span>
                Gently lift skin over the shoulder blades and release. It should snap back instantly. Slow return indicates dehydration.
              </div>
            </div>
            <p className="text-[11px] text-sky-800">
              ⚠️ <strong>Critical Safety Rule:</strong> Never administer human pain medications (Tylenol, Advil, Aspirin) or induce vomiting with hydrogen peroxide without explicit veterinary instruction.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
