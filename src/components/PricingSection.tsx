import React, { useState } from 'react';
import { usePet } from '../context/PetContext';
import { Check, Sparkles, X, ShieldCheck, Zap, Heart, Star, ArrowRight } from 'lucide-react';

interface PricingProps {
  onClose?: () => void;
  isModal?: boolean;
}

export const PricingSection: React.FC<PricingProps> = ({ onClose, isModal = false }) => {
  const { subscription, upgradeToPremium, downgradeToFree } = usePet();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSimulatedUpgrade = () => {
    setIsProcessing(true);
    setSuccessMessage(null);
    setTimeout(() => {
      upgradeToPremium();
      setIsProcessing(false);
      setSuccessMessage('🎉 Premium features activated! Ads removed & unlimited scans enabled.');
    }, 800);
  };

  const handleSimulatedDowngrade = () => {
    downgradeToFree();
    setSuccessMessage('Switched to Free tier.');
  };

  return (
    <div className={`space-y-8 pb-12 ${isModal ? 'p-6 max-h-[90vh] overflow-y-auto' : 'max-w-5xl mx-auto'}`}>
      {/* Header */}
      <div className="text-center space-y-3">
        {isModal && onClose && (
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Simple, Transparent US Pricing</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Protect Your Pets with PetSafe AI
        </h2>
        <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
          Start with our free veterinary knowledge tier, or unlock unlimited AI scans, multi-pet profiles, and ad-free peace of mind.
        </p>

        {/* Success Alert */}
        {successMessage && (
          <div className="max-w-md mx-auto p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold animate-fade-in">
            {successMessage}
          </div>
        )}
      </div>

      {/* Pricing Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* FREE PLAN */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-xs">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Basic Protection</span>
              <h3 className="text-2xl font-black text-slate-900">Free Tier</h3>
              <p className="text-xs text-slate-500">
                Essential pet safety index and basic scans for conscientious pet owners.
              </p>
            </div>

            <div className="pt-2 flex items-baseline gap-1">
              <span className="text-4xl font-black text-slate-900">$0</span>
              <span className="text-xs text-slate-500 font-semibold">/forever</span>
            </div>

            <ul className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Basic food safety searches & index</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Up to 5 AI photo / substance scans per day</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Basic educational symptom guidance</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Emergency ASPCA & Poison Hotline access</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <X className="w-4 h-4 text-slate-300 flex-shrink-0" />
                <span>Includes non-intrusive sponsor ads</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <X className="w-4 h-4 text-slate-300 flex-shrink-0" />
                <span>Care & vaccine reminders (Premium)</span>
              </li>
            </ul>
          </div>

          <div className="pt-6">
            {!subscription.isPremium ? (
              <span className="w-full py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
                Current Active Plan
              </span>
            ) : (
              <button
                onClick={handleSimulatedDowngrade}
                className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs transition"
              >
                Switch Back to Free
              </button>
            )}
          </div>
        </div>

        {/* PREMIUM PLAN */}
        <div className="bg-gradient-to-b from-emerald-50/60 via-white to-teal-50/40 rounded-3xl border-2 border-emerald-500 p-6 sm:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden">
          {/* Badge */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
              Most Popular
            </span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Complete Pet Peace of Mind
              </span>
              <h3 className="text-2xl font-black text-slate-900">PetSafe Premium</h3>
              <p className="text-xs text-slate-600">
                Unlimited scans, multi-pet tracking, care reminders, and an ad-free experience.
              </p>
            </div>

            <div className="pt-2 flex items-baseline gap-1.5">
              <span className="text-4xl font-black text-emerald-800">$3.99</span>
              <span className="text-xs text-slate-600 font-semibold">/month</span>
              <span className="ml-2 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Cancel anytime
              </span>
            </div>

            <ul className="space-y-3 pt-4 border-t border-emerald-100 text-xs text-slate-800">
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><strong>Unlimited</strong> AI food & plant photo scans</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><strong>100% Ad-Free Experience</strong> (no sponsor banners)</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Multi-pet health profiles & allergy records</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Vaccination & flea/tick care reminders</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Enhanced triage guidance & printable vet summaries</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Species-specific dosage & body weight calculations</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 space-y-2">
            {subscription.isPremium ? (
              <span className="w-full py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm">
                <Check className="w-4 h-4" />
                <span>Premium Membership Active</span>
              </span>
            ) : (
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleSimulatedUpgrade}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-md shadow-emerald-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? (
                  <span>Activating...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Upgrade Now for $3.99/mo</span>
                  </>
                )}
              </button>
            )}

            <p className="text-[10px] text-slate-400 text-center">
              🔒 Stripe Payment Architecture Ready • No real charges processed without permission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
