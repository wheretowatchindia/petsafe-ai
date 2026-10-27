import React, { createContext, useContext, useState, useEffect } from 'react';
import type { PetProfile, PetSpecies, CareReminder, SubscriptionStatus, AnalysisResult } from '../types';

interface PetContextType {
  pets: PetProfile[];
  activePetId: string | null;
  activePet: PetProfile | null;
  selectedSpecies: PetSpecies;
  setSelectedSpecies: (species: PetSpecies) => void;
  setActivePetId: (id: string | null) => void;
  addPet: (pet: Omit<PetProfile, 'id' | 'createdAt'>) => void;
  updatePet: (id: string, pet: Partial<PetProfile>) => void;
  deletePet: (id: string) => void;
  
  reminders: CareReminder[];
  addReminder: (reminder: Omit<CareReminder, 'id'>) => void;
  toggleReminder: (id: string) => void;
  deleteReminder: (id: string) => void;

  scanHistory: AnalysisResult[];
  addScanToHistory: (result: AnalysisResult) => void;
  clearScanHistory: () => void;

  subscription: SubscriptionStatus;
  upgradeToPremium: () => void;
  downgradeToFree: () => void;
  canPerformScan: boolean;
  incrementScanCount: () => void;

  clearAllUserData: () => void;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

const DEFAULT_PETS: PetProfile[] = [
  {
    id: 'pet-1',
    name: 'Bailey',
    species: 'dog',
    breed: 'Golden Retriever',
    ageYears: 3,
    ageMonths: 4,
    weightLbs: 65,
    allergies: ['Chicken protein'],
    avatarColor: 'from-amber-400 to-amber-600',
    notes: 'Sensitive stomach after eating high fat table scraps.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'pet-2',
    name: 'Luna',
    species: 'cat',
    breed: 'Domestic Shorthair',
    ageYears: 2,
    ageMonths: 1,
    weightLbs: 9,
    allergies: ['No known allergies'],
    avatarColor: 'from-purple-400 to-indigo-600',
    notes: 'Indoor cat. Curious about flowers and houseplants.',
    createdAt: new Date().toISOString()
  }
];

const DEFAULT_REMINDERS: CareReminder[] = [
  {
    id: 'rem-1',
    petId: 'pet-1',
    title: 'Rabies 3-Year Booster',
    category: 'vaccine',
    dueDate: '2026-11-15',
    notes: 'Administered at Metro Animal Clinic',
    completed: false,
    prescribedByVet: true
  },
  {
    id: 'rem-2',
    petId: 'pet-1',
    title: 'NexGard Monthly Flea & Tick Chewable',
    category: 'flea_tick',
    dueDate: '2026-11-01',
    notes: 'Give with evening meal',
    completed: false,
    prescribedByVet: true
  },
  {
    id: 'rem-3',
    petId: 'pet-2',
    title: 'FVRCP Feline Core Vaccine Annual',
    category: 'vaccine',
    dueDate: '2026-12-05',
    notes: 'Appointment scheduled with Dr. Davis',
    completed: false,
    prescribedByVet: true
  }
];

export const PetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load Pets from LocalStorage
  const [pets, setPets] = useState<PetProfile[]>(() => {
    try {
      const saved = localStorage.getItem('petsafe_pets');
      return saved ? JSON.parse(saved) : DEFAULT_PETS;
    } catch {
      return DEFAULT_PETS;
    }
  });

  const [activePetId, setActivePetId] = useState<string | null>(() => {
    return pets.length > 0 ? pets[0].id : null;
  });

  const [selectedSpecies, setSelectedSpecies] = useState<PetSpecies>(() => {
    return pets.length > 0 ? pets[0].species : 'dog';
  });

  // Load Reminders from LocalStorage
  const [reminders, setReminders] = useState<CareReminder[]>(() => {
    try {
      const saved = localStorage.getItem('petsafe_reminders');
      return saved ? JSON.parse(saved) : DEFAULT_REMINDERS;
    } catch {
      return DEFAULT_REMINDERS;
    }
  });

  // Load Scan History
  const [scanHistory, setScanHistory] = useState<AnalysisResult[]>(() => {
    try {
      const saved = localStorage.getItem('petsafe_scan_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Subscription state
  const [subscription, setSubscription] = useState<SubscriptionStatus>(() => {
    try {
      const saved = localStorage.getItem('petsafe_subscription');
      return saved ? JSON.parse(saved) : {
        isPremium: false,
        plan: 'free',
        scansUsedToday: 0,
        dailyScanLimit: 5
      };
    } catch {
      return {
        isPremium: false,
        plan: 'free',
        scansUsedToday: 0,
        dailyScanLimit: 5
      };
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('petsafe_pets', JSON.stringify(pets));
  }, [pets]);

  useEffect(() => {
    localStorage.setItem('petsafe_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('petsafe_scan_history', JSON.stringify(scanHistory));
  }, [scanHistory]);

  useEffect(() => {
    localStorage.setItem('petsafe_subscription', JSON.stringify(subscription));
  }, [subscription]);

  // Sync species when active pet changes
  useEffect(() => {
    if (activePetId) {
      const p = pets.find((item) => item.id === activePetId);
      if (p) setSelectedSpecies(p.species);
    }
  }, [activePetId, pets]);

  const activePet = pets.find((p) => p.id === activePetId) || null;

  const addPet = (petData: Omit<PetProfile, 'id' | 'createdAt'>) => {
    const newPet: PetProfile = {
      ...petData,
      id: `pet-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    const updated = [...pets, newPet];
    setPets(updated);
    setActivePetId(newPet.id);
    setSelectedSpecies(newPet.species);
  };

  const updatePet = (id: string, updates: Partial<PetProfile>) => {
    setPets((prev) =>
      prev.map((pet) => (pet.id === id ? { ...pet, ...updates } : pet))
    );
  };

  const deletePet = (id: string) => {
    setPets((prev) => prev.filter((p) => p.id !== id));
    if (activePetId === id) {
      const remaining = pets.filter((p) => p.id !== id);
      setActivePetId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const addReminder = (remData: Omit<CareReminder, 'id'>) => {
    const newRem: CareReminder = {
      ...remData,
      id: `rem-${Date.now()}`
    };
    setReminders((prev) => [newRem, ...prev]);
  };

  const toggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
  };

  const deleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  const addScanToHistory = (result: AnalysisResult) => {
    setScanHistory((prev) => [result, ...prev.slice(0, 19)]);
  };

  const clearScanHistory = () => {
    setScanHistory([]);
  };

  const upgradeToPremium = () => {
    setSubscription({
      isPremium: true,
      plan: 'premium',
      scansUsedToday: 0,
      dailyScanLimit: 999999,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    });
  };

  const downgradeToFree = () => {
    setSubscription({
      isPremium: false,
      plan: 'free',
      scansUsedToday: 0,
      dailyScanLimit: 5
    });
  };

  const canPerformScan = subscription.isPremium || subscription.scansUsedToday < subscription.dailyScanLimit;

  const incrementScanCount = () => {
    if (!subscription.isPremium) {
      setSubscription((prev) => ({
        ...prev,
        scansUsedToday: prev.scansUsedToday + 1
      }));
    }
  };

  const clearAllUserData = () => {
    localStorage.removeItem('petsafe_pets');
    localStorage.removeItem('petsafe_reminders');
    localStorage.removeItem('petsafe_scan_history');
    localStorage.removeItem('petsafe_subscription');
    setPets([]);
    setReminders([]);
    setScanHistory([]);
    setActivePetId(null);
    setSubscription({
      isPremium: false,
      plan: 'free',
      scansUsedToday: 0,
      dailyScanLimit: 5
    });
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        activePetId,
        activePet,
        selectedSpecies,
        setSelectedSpecies,
        setActivePetId,
        addPet,
        updatePet,
        deletePet,
        reminders,
        addReminder,
        toggleReminder,
        deleteReminder,
        scanHistory,
        addScanToHistory,
        clearScanHistory,
        subscription,
        upgradeToPremium,
        downgradeToFree,
        canPerformScan,
        incrementScanCount,
        clearAllUserData
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export const usePet = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error('usePet must be used within a PetProvider');
  }
  return context;
};
