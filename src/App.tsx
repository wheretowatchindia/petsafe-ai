import React, { useState } from 'react';
import { PetProvider } from './context/PetContext';
import { EmergencyBanner } from './components/EmergencyBanner';
import { Navbar } from './components/Navbar';
import { HeroHome } from './components/HeroHome';
import { FoodScanner } from './components/FoodScanner';
import { SymptomChecker } from './components/SymptomChecker';
import { ToxinDatabase } from './components/ToxinDatabase';
import { PetProfiles } from './components/PetProfiles';
import { CareReminders } from './components/CareReminders';
import { PricingSection } from './components/PricingSection';
import { AdBanner } from './components/AdBanner';
import { LegalModals } from './components/LegalModals';
import { Footer } from './components/Footer';

export function AppContent() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [prefilledScanItem, setPrefilledScanItem] = useState<string>('');
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'disclaimer' | 'contact' | null>(null);

  const handleSelectItemForScan = (itemName: string) => {
    setPrefilledScanItem(itemName);
    setCurrentTab('scanner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* 24/7 US Poison Emergency Helpline Banner */}
      <EmergencyBanner />

      {/* Main Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        onOpenPricing={() => setIsPricingModalOpen(true)}
      />

      {/* Main App Content Viewport */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentTab === 'home' && (
          <>
            <HeroHome
              onScanClick={() => handleTabChange('scanner')}
              onSymptomsClick={() => handleTabChange('symptoms')}
              onDatabaseClick={() => handleTabChange('database')}
              onPricingClick={() => handleTabChange('pricing')}
              onSelectItemForScan={handleSelectItemForScan}
            />
            <AdBanner onUpgradeClick={() => setIsPricingModalOpen(true)} />
          </>
        )}

        {currentTab === 'scanner' && (
          <>
            <FoodScanner
              initialSearchQuery={prefilledScanItem}
              onOpenPricing={() => setIsPricingModalOpen(true)}
            />
            <AdBanner onUpgradeClick={() => setIsPricingModalOpen(true)} />
          </>
        )}

        {currentTab === 'symptoms' && (
          <>
            <SymptomChecker />
            <AdBanner onUpgradeClick={() => setIsPricingModalOpen(true)} />
          </>
        )}

        {currentTab === 'database' && (
          <>
            <ToxinDatabase onSelectItem={handleSelectItemForScan} />
            <AdBanner onUpgradeClick={() => setIsPricingModalOpen(true)} />
          </>
        )}

        {currentTab === 'pets' && (
          <PetProfiles onOpenPricing={() => setIsPricingModalOpen(true)} />
        )}

        {currentTab === 'reminders' && (
          <CareReminders />
        )}

        {currentTab === 'pricing' && (
          <PricingSection />
        )}
      </main>

      {/* Pricing Upgrade Modal */}
      {isPricingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 relative overflow-hidden">
            <PricingSection
              isModal={true}
              onClose={() => setIsPricingModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Legal & Compliance Modals */}
      <LegalModals
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* US Pet Parent Footer */}
      <Footer onOpenLegal={(type) => setLegalModalType(type)} />
    </div>
  );
}

export default function App() {
  return (
    <PetProvider>
      <AppContent />
    </PetProvider>
  );
}
