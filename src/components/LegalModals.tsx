import React from 'react';
import { X, ShieldAlert, CheckCircle2, Lock } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'disclaimer' | 'contact' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* PRIVACY POLICY */}
        {type === 'privacy' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="flex items-center gap-2 text-emerald-700 pb-2 border-b border-slate-100">
              <Lock className="w-5 h-5" />
              <h2 className="text-xl font-black text-slate-900">Privacy Policy (USA Standard)</h2>
            </div>
            <p><strong>Effective Date:</strong> October 2026</p>
            <p>
              At <strong>PetSafe AI</strong>, we deeply respect your personal privacy. We collect minimal information strictly necessary to provide safety assessments and care reminders for your companion animals.
            </p>
            <h4 className="font-bold text-slate-900 text-sm">1. Data Storage & Local Processing</h4>
            <p>
              All pet profiles, medical history notes, and vaccination reminders are stored directly in your browser’s local storage (client-side) by default. We do not sell your personal data or your pet’s health data to third-party data brokers.
            </p>
            <h4 className="font-bold text-slate-900 text-sm">2. Image Uploads & File Security</h4>
            <p>
              Uploaded photos of food labels and plants are processed strictly for toxic compound detection. Images are validated for safe MIME types and size (max 5MB) and are not retained for facial recognition or non-pet analytics.
            </p>
            <h4 className="font-bold text-slate-900 text-sm">3. Right to Data Deletion (CCPA / GDPR)</h4>
            <p>
              You have complete control over your data. You may click the "Clear All Local Pet Data" button in the footer at any time to instantly purge all stored pet profiles, scans, and care reminders.
            </p>
          </div>
        )}

        {/* TERMS OF SERVICE */}
        {type === 'terms' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="flex items-center gap-2 text-emerald-700 pb-2 border-b border-slate-100">
              <CheckCircle2 className="w-5 h-5" />
              <h2 className="text-xl font-black text-slate-900">Terms of Service</h2>
            </div>
            <p>
              Welcome to PetSafe AI. By accessing this application, you agree to these Terms of Service.
            </p>
            <h4 className="font-bold text-slate-900 text-sm">1. Educational Information Only</h4>
            <p>
              PetSafe AI provides toxicological and nutritional guidance for educational purposes only. It is NOT a substitute for professional veterinary advice, diagnosis, or clinical treatment.
            </p>
            <h4 className="font-bold text-slate-900 text-sm">2. Emergency Disclaimer</h4>
            <p>
              If your pet exhibits signs of acute poisoning, respiratory distress, collapse, or severe trauma, you must immediately contact a licensed veterinarian or a dedicated animal poison emergency service.
            </p>
            <h4 className="font-bold text-slate-900 text-sm">3. Subscriptions & Monetization</h4>
            <p>
              The premium subscription is billed at $3.99/month on a recurring basis. Subscribers receive an ad-free experience, unlimited scans, and multi-pet tracking. Subscriptions may be canceled at any time prior to the billing cycle renewal.
            </p>
          </div>
        )}

        {/* MEDICAL DISCLAIMER */}
        {type === 'disclaimer' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="flex items-center gap-2 text-red-600 pb-2 border-b border-slate-100">
              <ShieldAlert className="w-5 h-5" />
              <h2 className="text-xl font-black text-slate-900">Veterinary Medical Disclaimer</h2>
            </div>
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-800 font-bold text-xs">
              CRITICAL: PETSAFE AI DOES NOT PROVIDE VETERINARY MEDICAL DIAGNOSIS OR PRESCRIPTIONS.
            </div>
            <p>
              The information presented across PetSafe AI is compiled from established veterinary toxicology sources including the ASPCA Animal Poison Control Center, the American Veterinary Medical Association (AVMA), and the Merck Veterinary Manual.
            </p>
            <p>
              Each animal possesses unique metabolic characteristics, allergies, and pre-existing medical conditions. Never administer human medications (such as acetaminophen, ibuprofen, or aspirin) or induce vomiting without direct instruction from a licensed veterinarian.
            </p>
            <p>
              In the United States, immediately contact:
              <br />• <strong>ASPCA Animal Poison Control:</strong> (888) 426-4435
              <br />• <strong>Pet Poison Helpline:</strong> (855) 764-7661
            </p>
          </div>
        )}

        {/* CONTACT */}
        {type === 'contact' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-xl font-black text-slate-900 pb-2 border-b border-slate-100">Contact PetSafe AI Support</h2>
            <p>
              Have questions, feedback, or suggestions for expanding our toxicological database?
            </p>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <p><strong>Email:</strong> support@petsafeai.app</p>
              <p><strong>Audience:</strong> United States 🇺🇸 Pet Community</p>
              <p><strong>Partnership Inquiries:</strong> partners@petsafeai.app</p>
            </div>
            <p className="text-xs text-slate-500">
              Note: We cannot provide individualized medical triage via email. For urgent medical questions, contact your local emergency veterinarian.
            </p>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
