import React, { useState } from 'react';
import { PhoneCall, AlertTriangle, X, ShieldAlert } from 'lucide-react';

export const EmergencyBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-md relative z-40 border-b border-red-800">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2.5 text-center md:text-left">
            <span className="p-1.5 bg-white/20 rounded-full flex-shrink-0 animate-pulse">
              <ShieldAlert className="w-5 h-5 text-white" />
            </span>
            <div>
              <span className="font-bold tracking-wide uppercase text-xs bg-red-800/80 px-2 py-0.5 rounded mr-2">
                Emergency Hotline (USA)
              </span>
              <span className="font-medium">
                Immediate poisoning or collapse? Do not wait for AI response.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-center">
            <a
              href="tel:18884264435"
              className="inline-flex items-center gap-1.5 bg-white text-red-700 hover:bg-red-50 font-semibold px-3 py-1.5 rounded-full text-xs transition shadow-sm"
              title="Call ASPCA Animal Poison Control"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>ASPCA: (888) 426-4435</span>
            </a>

            <a
              href="tel:18557647661"
              className="inline-flex items-center gap-1.5 bg-red-900/60 hover:bg-red-900 text-white font-semibold px-3 py-1.5 rounded-full text-xs transition border border-white/20"
              title="Call Pet Poison Helpline"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Pet Poison: (855) 764-7661</span>
            </a>

            <button
              onClick={() => setDismissed(true)}
              className="p-1 text-red-200 hover:text-white rounded-full hover:bg-white/10 transition ml-1"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
