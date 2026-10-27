export type PetSpecies = 'dog' | 'cat';

export type SafetyLevel = 
  | 'safe'         // Generally Safe ✅
  | 'caution'      // Use Caution ⚠️
  | 'toxic'        // Potentially Toxic 🚨
  | 'unknown';     // Unknown — Safety Not Verified ❓

export type TriageUrgency = 
  | 'emergency'    // Immediate Vet or Poison Control! 🚨
  | 'urgent'       // Contact Vet within 24 Hours ⚠️
  | 'monitor';     // Safe Home Monitoring & Care ℹ️

export interface SafetyItem {
  id: string;
  name: string;
  scientificName?: string;
  category: 'food' | 'plant' | 'household' | 'medication';
  aliases: string[];
  safetyDog: SafetyLevel;
  safetyCat: SafetyLevel;
  severity: 'none' | 'mild' | 'moderate' | 'severe' | 'fatal';
  toxicCompounds?: string[];
  dogSummary: string;
  catSummary: string;
  commonSymptoms?: string[];
  precautions: string[];
  recommendedAction: string;
  references: { title: string; url?: string; organization: string }[];
  safePreparationNotes?: string;
  toxicDosageInfo?: string;
  image?: string;
}

export interface AnalysisResult {
  query: string;
  matchedItem: SafetyItem | null;
  species: PetSpecies;
  petWeightLbs?: number;
  safetyLevel: SafetyLevel;
  headline: string;
  mainConcerns: string[];
  toxicCompounds: string[];
  precautions: string[];
  recommendedNextSteps: string[];
  references: { title: string; organization: string; url?: string }[];
  isUnknownOrUnverified: boolean;
  confidence: number;
  source: 'database' | 'ai_vision' | 'fallback';
}

export interface PetProfile {
  id: string;
  name: string;
  species: PetSpecies;
  breed?: string;
  ageYears: number;
  ageMonths: number;
  weightLbs: number;
  allergies: string[];
  avatarColor: string;
  photoUrl?: string;
  notes?: string;
  createdAt: string;
}

export interface SymptomItem {
  id: string;
  name: string;
  category: 'critical' | 'digestive' | 'respiratory' | 'skin' | 'neurological' | 'urinary' | 'behavior';
  isEmergencyRedFlag: boolean;
  description: string;
  dogSpecificNotes?: string;
  catSpecificNotes?: string;
  possibleCauses: string[];
  urgency: TriageUrgency;
}

export interface CareReminder {
  id: string;
  petId: string;
  title: string;
  category: 'vaccine' | 'vet_visit' | 'medication' | 'flea_tick' | 'grooming' | 'other';
  dueDate: string;
  time?: string;
  notes?: string;
  completed: boolean;
  prescribedByVet?: boolean;
}

export interface SubscriptionStatus {
  isPremium: boolean;
  plan: 'free' | 'premium';
  scansUsedToday: number;
  dailyScanLimit: number;
  expiresAt?: string;
}
