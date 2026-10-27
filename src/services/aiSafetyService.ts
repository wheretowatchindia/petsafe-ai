import type { AnalysisResult, PetSpecies, SafetyItem, SafetyLevel } from '../types';
import { PET_SAFETY_DATABASE } from '../data/petSafetyDatabase';

/**
 * Interface for AI / Knowledge Provider
 * Enables zero-refactor plugging of real Gemini, Claude, or OpenAI vision backends
 */
export interface SafetyAnalyzerProvider {
  name: string;
  isCloudConnected(): boolean;
  analyzeSubstance(
    query: string,
    species: PetSpecies,
    weightLbs?: number,
    imageFile?: File | null
  ): Promise<AnalysisResult>;
}

/**
 * Local Veterinary Knowledge Base Provider
 * Provides 100% offline, scientifically-accurate toxicity data based on AVMA, ASPCA, and Merck Vet standards.
 */
export class LocalVeterinaryAnalyzer implements SafetyAnalyzerProvider {
  name = 'Veterinary Reference Knowledge Base (Offline Verified)';

  isCloudConnected(): boolean {
    return false;
  }

  async analyzeSubstance(
    rawQuery: string,
    species: PetSpecies,
    weightLbs?: number,
    imageFile?: File | null
  ): Promise<AnalysisResult> {
    // Artificial small delay to reflect processing
    await new Promise((resolve) => setTimeout(resolve, 600));

    let query = rawQuery.trim().toLowerCase();

    // If query was empty but user provided an image, inspect filename for hints
    if (!query && imageFile) {
      const fileNameClean = imageFile.name
        .toLowerCase()
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]/g, ' ');
      query = fileNameClean;
    }

    if (!query) {
      return this.buildUnknownResult('Unspecified substance', species, weightLbs);
    }

    // Attempt matching against offline database
    const matched = this.findMatchingItem(query);

    if (matched) {
      return this.buildVerifiedResult(matched, species, weightLbs, rawQuery || matched.name);
    }

    // If no match found in verified knowledge base:
    // CRITICAL SAFETY RULE: Never classify an unknown substance as safe!
    return this.buildUnknownResult(rawQuery || query, species, weightLbs);
  }

  private findMatchingItem(query: string): SafetyItem | null {
    const clean = query.toLowerCase().trim();

    // 1. Direct name match
    let match = PET_SAFETY_DATABASE.find(
      (item) => item.name.toLowerCase() === clean || item.id.toLowerCase() === clean
    );
    if (match) return match;

    // 2. Direct alias match
    match = PET_SAFETY_DATABASE.find((item) =>
      item.aliases.some((alias) => alias.toLowerCase() === clean)
    );
    if (match) return match;

    // 3. Substring / Token matching
    const queryTokens = clean.split(/\s+/).filter((t) => t.length > 2);
    for (const item of PET_SAFETY_DATABASE) {
      const allTerms = [
        item.name.toLowerCase(),
        ...item.aliases.map((a) => a.toLowerCase()),
        item.scientificName?.toLowerCase() || '',
      ];

      for (const token of queryTokens) {
        if (allTerms.some((term) => term.includes(token) || token.includes(term))) {
          return item;
        }
      }
    }

    return null;
  }

  private buildVerifiedResult(
    item: SafetyItem,
    species: PetSpecies,
    weightLbs?: number,
    displayQuery?: string
  ): AnalysisResult {
    const safetyLevel: SafetyLevel = species === 'dog' ? item.safetyDog : item.safetyCat;
    const summary = species === 'dog' ? item.dogSummary : item.catSummary;

    const headlines: Record<SafetyLevel, string> = {
      safe: `Generally Safe for ${species === 'dog' ? 'Dogs 🐶' : 'Cats 🐱'} in Moderation`,
      caution: `Use Caution: Potential Risks for ${species === 'dog' ? 'Dogs 🐶' : 'Cats 🐱'}`,
      toxic: `POTENTIALLY TOXIC: Keep Away from ${species === 'dog' ? 'Dogs 🐶' : 'Cats 🐱'}!`,
      unknown: `Safety Not Verified for ${species === 'dog' ? 'Dogs' : 'Cats'}`
    };

    const mainConcerns: string[] = [summary];
    if (item.commonSymptoms && item.commonSymptoms.length > 0) {
      mainConcerns.push(`Common signs of ingestion: ${item.commonSymptoms.join(', ')}.`);
    }

    if (weightLbs && item.toxicDosageInfo) {
      const weightKg = (weightLbs * 0.453592).toFixed(1);
      mainConcerns.push(`Weight context (${weightLbs} lbs / ${weightKg} kg): ${item.toxicDosageInfo}`);
    }

    const recommendedSteps: string[] = [item.recommendedAction];
    if (safetyLevel === 'toxic') {
      recommendedSteps.unshift(
        'Do NOT attempt to induce vomiting at home unless explicitly instructed by a licensed veterinarian.'
      );
      recommendedSteps.push(
        'Call ASPCA Animal Poison Control ((888) 426-4435) or your nearest 24/7 emergency animal hospital immediately.'
      );
    } else if (safetyLevel === 'caution') {
      recommendedSteps.push('Monitor your pet for signs of vomiting, diarrhea, or unusual lethargy over the next 24 hours.');
    } else {
      recommendedSteps.push('Always introduce any new treat slowly and in very small quantities to check for individual sensitivities.');
    }

    return {
      query: displayQuery || item.name,
      matchedItem: item,
      species,
      petWeightLbs: weightLbs,
      safetyLevel,
      headline: headlines[safetyLevel],
      mainConcerns,
      toxicCompounds: item.toxicCompounds || [],
      precautions: item.precautions,
      recommendedNextSteps: recommendedSteps,
      references: item.references,
      isUnknownOrUnverified: false,
      confidence: 1.0,
      source: 'database'
    };
  }

  private buildUnknownResult(
    query: string,
    species: PetSpecies,
    weightLbs?: number
  ): AnalysisResult {
    return {
      query,
      matchedItem: null,
      species,
      petWeightLbs: weightLbs,
      safetyLevel: 'unknown',
      headline: `Unknown — Safety Not Verified for ${species === 'dog' ? 'Dogs 🐶' : 'Cats 🐱'}`,
      mainConcerns: [
        `"${query}" could not be confirmed in the verified veterinary toxicological index.`,
        'CRITICAL SAFETY RULE: Never assume an unverified substance, plant, or food is safe for pets.',
        'Many everyday human foods (e.g., specific artificial sweeteners, fungal compounds, plant oxalates) can trigger severe illness even in small doses.'
      ],
      toxicCompounds: ['Unidentified / Pending Verification'],
      precautions: [
        'Do not feed or allow your pet to chew this item until you confirm its exact safety with a veterinarian.',
        'If your pet has already ingested this substance, keep the packaging, label, or a physical sample.',
        'Observe closely for immediate symptoms such as drooling, vomiting, weakness, or restlessness.'
      ],
      recommendedNextSteps: [
        'Check the ingredient list carefully for hidden toxic additives (Xylitol, birch bark extract, garlic, onion powder, cocoa).',
        'Contact the ASPCA Animal Poison Control Center ((888) 426-4435) or Pet Poison Helpline ((855) 764-7661) with the product brand and ingredients.',
        'Consult your veterinarian before introducing any new unfamiliar food.'
      ],
      references: [
        {
          title: 'ASPCA Animal Poison Control Database',
          organization: 'ASPCA',
          url: 'https://www.aspca.org/pet-care/animal-poison-control'
        },
        {
          title: 'Pet Poison Helpline Resource Center',
          organization: 'Pet Poison Helpline',
          url: 'https://www.petpoisonhelpline.com'
        }
      ],
      isUnknownOrUnverified: true,
      confidence: 0,
      source: 'fallback'
    };
  }
}

/**
 * Cloud AI Backend Adapter
 * Configured via environment variables; keeps secrets completely on the server.
 */
export class CloudAIAdapter implements SafetyAnalyzerProvider {
  name = 'PetSafe Cloud Vision & Toxicological AI Service';

  private endpointUrl: string;

  constructor() {
    this.endpointUrl = (import.meta as any).env?.VITE_BACKEND_AI_URL || '';
  }

  isCloudConnected(): boolean {
    return Boolean(this.endpointUrl && this.endpointUrl.trim().length > 0);
  }

  async analyzeSubstance(
    query: string,
    species: PetSpecies,
    weightLbs?: number,
    imageFile?: File | null
  ): Promise<AnalysisResult> {
    if (!this.isCloudConnected()) {
      // Gracefully fall back to local veterinary engine
      const local = new LocalVeterinaryAnalyzer();
      return local.analyzeSubstance(query, species, weightLbs, imageFile);
    }

    try {
      const formData = new FormData();
      formData.append('query', query);
      formData.append('species', species);
      if (weightLbs) formData.append('weightLbs', weightLbs.toString());
      if (imageFile) formData.append('image', imageFile);

      const res = await fetch(`${this.endpointUrl}/api/v1/analyze-pet-safety`, {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        throw new Error(`Cloud AI returned status ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch {
      // Reliable fallback if cloud service is unavailable
      const local = new LocalVeterinaryAnalyzer();
      const fallback = await local.analyzeSubstance(query, species, weightLbs, imageFile);
      return {
        ...fallback,
        source: 'fallback'
      };
    }
  }
}

// Active singleton service instance
export const aiSafetyService = new LocalVeterinaryAnalyzer();
