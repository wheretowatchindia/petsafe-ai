import React from 'react';
import { usePet } from '../context/PetContext';
import { Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

interface AdBannerProps {
  onUpgradeClick: () => void;
  position?: 'top' | 'middle' | 'sidebar';
}

export const AdBanner: React.FC<AdBannerProps> = ({ onUpgradeClick, position = 'middle' }) => {
  const { subscription } = usePet();

  // If user is Premium, do NOT show ads!
  if (subscription.isPremium) return null;

  return (
    <div className="my-6 w-full max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-slate-100 via-sky-50 to-emerald-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-xs">
        {/* Ad Indicator Badge */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/60 text-[11px] font-medium text-slate-400">
          <span className="uppercase tracking-wider">Sponsored Partner Advertisement</span>
          <button
            onClick={onUpgradeClick}
            className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 transition"
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            Remove ads with Premium ($3.99/mo)
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-sm">
              🐾
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
                Chewy Pet Pharmacy — 20% Off First Medication Order
              </h4>
              <p className="text-xs text-slate-600 mt-0.5 line-clamp-1 sm:line-clamp-none">
                Prescription flea, tick, heartworm preventatives and vet-approved diets delivered to your doorstep.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-end">
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer transition shadow-xs">
              <span>View Offers</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
