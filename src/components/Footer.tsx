import React, { useState } from 'react';
import { usePet } from '../context/PetContext';
import { Shield, Heart, Trash2, Phone, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenLegal: (type: 'privacy' | 'terms' | 'disclaimer' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const { clearAllUserData } = usePet();
  const [dataClearedNotice, setDataClearedNotice] = useState(false);

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to delete all saved pet profiles, scan history, and reminders from your local device? This cannot be undone.')) {
      clearAllUserData();
      setDataClearedNotice(true);
      setTimeout(() => setDataClearedNotice(false), 3000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-black text-lg tracking-tight text-white">PetSafe AI</span>
              <span className="text-sm">🐶🐱</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              AI-assisted toxicological guidance and educational pet care for American dog and cat owners.
            </p>
            <p className="text-[11px] text-slate-500">
              Target Audience: United States 🇺🇸
            </p>
          </div>

          {/* Col 2: US Emergency Resources */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              24/7 US Poison Hotlines
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="tel:18884264435"
                  className="hover:text-white transition flex items-center gap-1.5 text-red-400 font-semibold"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>ASPCA: (888) 426-4435</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:18557647661"
                  className="hover:text-white transition flex items-center gap-1.5 text-amber-400 font-semibold"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Pet Poison: (855) 764-7661</span>
                </a>
              </li>
              <li>
                <span className="text-[11px] text-slate-500 block pt-1">
                  *A nominal consultation fee may apply for animal poison calls.
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Veterinary References */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Compliance & Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onOpenLegal('disclaimer')}
                  className="hover:text-white transition cursor-pointer text-left text-amber-300 font-medium"
                >
                  Veterinary Medical Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  Privacy Policy (CCPA/GDPR)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('contact')}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Privacy & Data Controls */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Privacy & Local Storage
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Your pet data remains private on your device. You can purge all stored profiles anytime.
            </p>
            <button
              onClick={handleClearData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-900/50 text-red-300 hover:text-red-200 border border-slate-700 transition cursor-pointer text-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear My Local Pet Data</span>
            </button>
            {dataClearedNotice && (
              <span className="block text-emerald-400 text-[11px] font-bold">
                ✓ All local data cleared!
              </span>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} PetSafe AI. Built for Dog & Cat Well-Being.</p>
          <p className="flex items-center gap-1">
            <span>Powered by veterinary toxicological reference data (ASPCA, AVMA, Merck)</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
