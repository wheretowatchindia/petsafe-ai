export const config = {
  maxDuration: 15,
};

interface AnalyzeRequest {
  imageBase64?: string;
  mimeType?: string;
  query?: string;
  species: 'dog' | 'cat';
  weightLbs?: number;
}

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/jpg'];
const MAX_BASE64_LENGTH = 7 * 1024 * 1024; // ~5MB raw image in base64

export default async function handler(req: any, res: any) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { imageBase64, mimeType = 'image/jpeg', query = '', species = 'dog', weightLbs }: AnalyzeRequest = req.body || {};
  const validatedSpecies = species === 'cat' ? 'cat' : 'dog';
  const speciesLabel = validatedSpecies === 'dog' ? 'Canine (Dog 🐶)' : 'Feline (Cat 🐱)';

  // 1. Check API Key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim().length === 0) {
    if (imageBase64) {
      return res.status(200).json({
        fallback: false,
        source: 'fallback',
        query: query || 'Uploaded Image',
        species: validatedSpecies,
        safetyLevel: 'unknown',
        headline: 'AI Vision Offline — Safety Not Verified',
        mainConcerns: [
          'The AI Vision service is not configured with an active API key on the server.',
          'CRITICAL SAFETY RULE: Never assume an unverified food, plant, or substance is safe for pets.'
        ],
        toxicCompounds: ['Unverified Substance'],
        precautions: [
          'Do not feed this item to your pet until its ingredients are verified.',
          'Consult a licensed veterinarian before introducing unfamiliar food.'
        ],
        recommendedNextSteps: [
          'Type the specific ingredient or brand name in the search box to check our verified database.',
          'Call ASPCA Animal Poison Control at (888) 426-4435 if ingestion has already occurred.'
        ],
        references: [
          { title: 'ASPCA Animal Poison Control Database', organization: 'ASPCA' }
        ],
        confidence: 0,
        isUnknownOrUnverified: true
      });
    }

    return res.status(200).json({
      fallback: true,
      error: 'NO_API_KEY',
      message: 'GEMINI_API_KEY is not configured on the server. Falling back to verified local veterinary database.'
    });
  }

  try {
    // 2. Input Validation
    if (!imageBase64 && (!query || query.trim().length === 0)) {
      return res.status(400).json({ error: 'Either a valid image or query text is required.' });
    }

    // 3. Image Validation
    if (imageBase64) {
      if (typeof imageBase64 !== 'string') {
        return res.status(400).json({ error: 'Invalid image format provided.' });
      }

      if (imageBase64.length > MAX_BASE64_LENGTH) {
        return res.status(413).json({ error: 'Image file size exceeds the 5MB limit. Please upload a smaller image.' });
      }

      const normalizedMime = mimeType.toLowerCase();
      if (!ALLOWED_MIME_TYPES.includes(normalizedMime)) {
        return res.status(400).json({ 
          error: `Unsupported image format (${mimeType}). Supported formats: JPEG, PNG, WEBP, HEIC.` 
        });
      }
    }

    // 4. Construct Clinical Prompt adhering strictly to ASPCA & AVMA toxicology standards
    const promptText = `
You are PetSafe AI, an expert veterinary toxicological assistant evaluating safety for companion animals based on ASPCA Animal Poison Control, AVMA, and Merck Veterinary Manual standards.

TARGET COMPANION SPECIES: ${speciesLabel}
${weightLbs && weightLbs > 0 ? `APPROXIMATE PET WEIGHT: ${weightLbs} lbs (${(weightLbs * 0.453592).toFixed(1)} kg)` : ''}
${query.trim() ? `USER NOTE / SEARCH HINT: "${query.slice(0, 200)}"` : ''}

CRITICAL INSTRUCTIONS:
1. EXAMINE THE PHOTO CAREFULLY:
   - Identify the exact product, brand, plant species, or food item shown in the image (e.g. "Amul Dark Chocolate", "Peace Lily", "Green Grapes", "Purina Pro Plan Kibble").
   - Perform OCR on any visible text, nutritional labels, or ingredient lists. Search specifically for hidden toxins (e.g. Xylitol/birch sugar, cocoa/theobromine, grapes/raisins, garlic/onion, macadamia nuts, high sodium, caffeine).
   - If the photo is a plant or flower, identify the botanical species. True Lilies (Lilium/Hemerocallis) are 100% FATAL to cats. Sago palms, oleanders, and azaleas are deadly.
2. SPECIES DIFFERENTIALS:
   - Lilies, Acetaminophen/Tylenol, permethrin, and citrus/tea tree essential oils are lethal to cats.
   - Grapes/raisins, Xylitol, macadamia nuts, and chocolate cause severe organ damage or death in dogs.
3. UNCERTAINTY & UNIDENTIFIED RULE:
   - NEVER invent or guess safety. If the photo is blurry, unidentifiable, or shows an unknown substance, classify strictly as "unknown" ("Unknown — Safety Not Verified") and advise consulting a veterinarian.
4. EMERGENCY PROTOCOL:
   - If potentially toxic, include: ASPCA Animal Poison Control: (888) 426-4435, Pet Poison Helpline: (855) 764-7661.
   - Explicitly state: "Do NOT attempt to induce vomiting at home unless directed by a licensed veterinarian."
5. CLASSIFICATION CATEGORIES (MUST BE EXACTLY ONE OF):
   - "safe" (Generally Safe in moderation)
   - "caution" (Potential risks, digestive sensitivity, high fat, choking hazard)
   - "toxic" (Potentially Toxic / Hazardous / Fatal)
   - "unknown" (Safety Not Verified / Unidentified)

Return ONLY a valid JSON object matching this schema with NO markdown wrapping:
{
  "query": "Exact identified product or plant name (e.g. Amul 55% Cocoa Dark Chocolate Bar)",
  "species": "${validatedSpecies}",
  "safetyLevel": "safe" | "caution" | "toxic" | "unknown",
  "headline": "Clear concise 1-sentence safety verdict",
  "mainConcerns": ["Specific clinical findings and reasons"],
  "toxicCompounds": ["Named chemical or plant toxins if any, or empty array"],
  "precautions": ["Important precautions for the owner"],
  "recommendedNextSteps": ["Exact immediate steps to take"],
  "references": [
    { "title": "Reference name", "organization": "ASPCA Animal Poison Control / AVMA / Merck" }
  ],
  "confidence": number between 0.1 and 1.0,
  "source": "ai_vision"
}
`;

    // 5. Construct Gemini Vision Request
    const contentsParts: any[] = [];

    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');
      contentsParts.push({
        inlineData: {
          mimeType: mimeType === 'image/jpg' ? 'image/jpeg' : mimeType,
          data: cleanBase64
        }
      });
    }

    contentsParts.push({
      text: promptText
    });

    // Fast, robust candidate execution: gemini-3.5-flash-lite is the fastest active vision model
    const candidateModels = ['gemini-3.5-flash-lite', 'gemini-3.1-flash-lite', 'gemini-3.7-flash', 'gemini-3.8-flash'];
    let geminiRes: Response | null = null;
    let modelUsed = candidateModels[0];

    for (const model of candidateModels) {
      modelUsed = model;
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          signal: AbortSignal.timeout(12000),
          body: JSON.stringify({
            contents: [
              {
                parts: contentsParts
              }
            ],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.1
            }
          })
        });

        if (response.ok) {
          geminiRes = response;
          break;
        }

        // If model is 404 (unavailable) or 503 (high demand) or 500, try next candidate model!
        if (response.status === 404 || response.status === 503 || response.status === 500) {
          console.warn(`Model ${model} returned status ${response.status}, failing over to next candidate...`);
          continue;
        } else {
          geminiRes = response;
          break;
        }
      } catch (err: any) {
        console.error(`Attempt with ${model} timed out or failed:`, err?.message);
        continue;
      }
    }

    if (!geminiRes || !geminiRes.ok) {
      const errText = geminiRes ? await geminiRes.text() : 'Upstream timeout or connection error';
      console.error('Gemini Vision API Error:', modelUsed, errText);

      // If an image was uploaded, do NOT fake match offline text database!
      if (imageBase64) {
        return res.status(200).json({
          fallback: false,
          source: 'fallback',
          query: query || 'Uploaded Image',
          species: validatedSpecies,
          safetyLevel: 'unknown',
          headline: 'Visual Analysis Inconclusive — Safety Not Verified',
          mainConcerns: [
            'Our Google Gemini Vision service was unable to conclusively analyze this photograph.',
            'CRITICAL SAFETY RULE: Never assume an unverified food, plant, or substance is safe for pets.'
          ],
          toxicCompounds: ['Unverified Substance'],
          precautions: [
            'Do not feed or allow your pet to chew this item until you check the packaging or consult a veterinarian.',
            'If your pet has already consumed this item, retain the packaging and contact an emergency vet.'
          ],
          recommendedNextSteps: [
            'Try uploading a closer, clearer photograph with good lighting.',
            'Or search for the specific ingredient or brand name in the search box.',
            'Call ASPCA Animal Poison Control: (888) 426-4435 or Pet Poison Helpline: (855) 764-7661.'
          ],
          references: [
            { title: 'ASPCA Animal Poison Control Database', organization: 'ASPCA' }
          ],
          confidence: 0,
          isUnknownOrUnverified: true
        });
      }

      return res.status(200).json({
        fallback: true,
        error: 'API_ERROR',
        status: geminiRes?.status || 504,
        modelAttempted: modelUsed,
        geminiError: errText,
        message: 'Google Gemini service took longer than expected. Seamlessly fell back to verified offline database.'
      });
    }

    const geminiData = await geminiRes.json();
    const rawContent = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawContent) {
      if (imageBase64) {
        return res.status(200).json({
          fallback: false,
          source: 'fallback',
          query: query || 'Uploaded Image',
          species: validatedSpecies,
          safetyLevel: 'unknown',
          headline: 'Empty AI Response — Safety Not Verified',
          mainConcerns: ['No response was generated by the AI vision model for this image.'],
          toxicCompounds: ['Unverified Substance'],
          precautions: ['Do not feed this item to your pet until verified.'],
          recommendedNextSteps: ['Try uploading a clearer photograph or consulting a veterinarian.'],
          references: [{ title: 'ASPCA Animal Poison Control', organization: 'ASPCA' }],
          confidence: 0,
          isUnknownOrUnverified: true
        });
      }

      return res.status(200).json({
        fallback: true,
        error: 'EMPTY_RESPONSE',
        message: 'No response generated by AI model. Fell back to verified offline database.'
      });
    }

    const parsedResult = JSON.parse(rawContent);

    // Validate structure
    const validLevels = ['safe', 'caution', 'toxic', 'unknown'];
    const safetyLevel = validLevels.includes(parsedResult.safetyLevel) ? parsedResult.safetyLevel : 'unknown';

    return res.status(200).json({
      query: parsedResult.query || query || 'Scanned Item',
      species: validatedSpecies,
      safetyLevel,
      headline: parsedResult.headline || 'Veterinary safety analysis completed.',
      mainConcerns: Array.isArray(parsedResult.mainConcerns) ? parsedResult.mainConcerns : [],
      toxicCompounds: Array.isArray(parsedResult.toxicCompounds) ? parsedResult.toxicCompounds : [],
      precautions: Array.isArray(parsedResult.precautions) ? parsedResult.precautions : [],
      recommendedNextSteps: Array.isArray(parsedResult.recommendedNextSteps) ? parsedResult.recommendedNextSteps : [],
      references: Array.isArray(parsedResult.references) && parsedResult.references.length > 0 
        ? parsedResult.references 
        : [{ title: 'ASPCA Animal Poison Control Database', organization: 'ASPCA' }],
      confidence: typeof parsedResult.confidence === 'number' ? parsedResult.confidence : 0.9,
      source: 'ai_vision',
      modelUsed
    });

  } catch (error: any) {
    console.error('Error in analyze handler:', error);
    if (req.body?.imageBase64) {
      return res.status(200).json({
        fallback: false,
        source: 'fallback',
        query: req.body?.query || 'Uploaded Image',
        species: req.body?.species === 'cat' ? 'cat' : 'dog',
        safetyLevel: 'unknown',
        headline: 'Server Error — Safety Not Verified',
        mainConcerns: ['An unexpected server error occurred during visual analysis.'],
        toxicCompounds: ['Unverified Substance'],
        precautions: ['Do not feed this item to your pet until verified.'],
        recommendedNextSteps: ['Please try again or consult a licensed veterinarian.'],
        references: [{ title: 'ASPCA Animal Poison Control', organization: 'ASPCA' }],
        confidence: 0,
        isUnknownOrUnverified: true
      });
    }

    return res.status(200).json({
      fallback: true,
      error: 'SERVER_ERROR',
      message: error?.message || 'Server error occurred during vision analysis.'
    });
  }
}
