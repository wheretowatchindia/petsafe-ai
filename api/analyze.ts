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

  // 1. Check API Key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim().length === 0) {
    return res.status(200).json({
      fallback: true,
      error: 'NO_API_KEY',
      message: 'GEMINI_API_KEY is not configured on the server. Falling back to verified local veterinary database.'
    });
  }

  try {
    const { imageBase64, mimeType = 'image/jpeg', query = '', species = 'dog', weightLbs }: AnalyzeRequest = req.body || {};

    // 2. Input Validation
    if (!imageBase64 && (!query || query.trim().length === 0)) {
      return res.status(400).json({ error: 'Either a valid image or query text is required.' });
    }

    const validatedSpecies = species === 'cat' ? 'cat' : 'dog';
    const speciesLabel = validatedSpecies === 'dog' ? 'Canine (Dog 🐶)' : 'Feline (Cat 🐱)';

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
USER QUERY / SUBSTANCE HINT: "${query.slice(0, 200)}"

CRITICAL INSTRUCTIONS:
1. EXAMINE THE PHOTO CAREFULLY:
   - If it is a food label or kibble bag, perform OCR on all visible ingredients. Search specifically for hidden toxins (e.g. Xylitol/birch sugar/wood sugar, cocoa/theobromine, grapes/raisins, garlic/onion powder, macadamia nuts, high sodium, BHA/BHT/ethoxyquin, propylene glycol for cats, caffeine, raw yeast dough).
   - If it is a plant or flower, identify the species accurately. True Lilies (Lilium and Hemerocallis) are 100% FATAL to cats even from microscopic pollen or vase water! Sago palm, oleander, and autumn crocus are deadly to both.
2. SPECIES DIFFERENTIALS:
   - Never apply dog tolerances to cats! (e.g., Lilies, Acetaminophen/Tylenol, permethrin, essential oils like tea tree/citrus are lethal to cats).
   - Grapes/raisins and Xylitol cause sudden fatal organ failure in dogs.
3. UNCERTAINTY & UNIDENTIFIED RULE:
   - NEVER invent or guess safety. If the photo is blurry, incomplete, cannot be definitively identified, or contains unidentified substances, classify strictly as "unknown" ("Unknown — Safety Not Verified") and advise consulting a veterinarian.
4. EMERGENCY PROTOCOL:
   - If a potentially toxic substance is identified, include emergency hotline guidance (ASPCA Animal Poison Control: (888) 426-4435, Pet Poison Helpline: (855) 764-7661).
   - Explicitly state: "Do NOT attempt to induce vomiting at home unless directed by a licensed veterinarian."
5. CLASSIFICATION CATEGORIES (MUST BE EXACTLY ONE OF):
   - "safe" (Generally Safe in moderation)
   - "caution" (Potential risks, digestive sensitivity, high fat, choking hazard)
   - "toxic" (Potentially Toxic / Hazardous / Fatal)
   - "unknown" (Safety Not Verified / Unidentified)

Return ONLY a valid JSON object matching this schema with NO markdown wrapping or preamble:
{
  "query": "Specific common name of identified substance",
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
        inline_data: {
          mime_type: mimeType === 'image/jpg' ? 'image/jpeg' : mimeType,
          data: cleanBase64
        }
      });
    }

    contentsParts.push({
      text: promptText
    });

    // Fast, single-call execution using Google's recommended models
    const candidateModels = ['gemini-3.8-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
    let geminiRes: Response | null = null;
    let modelUsed = candidateModels[0];

    for (const model of candidateModels) {
      modelUsed = model;
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: contentsParts
            }
          ],
          generationConfig: {
            response_mime_type: 'application/json',
            temperature: 0.1
          }
        })
      });

      if (response.ok) {
        geminiRes = response;
        break;
      }

      // If 404 on this model, immediately try next candidate in loop without stalling
      if (response.status === 404) {
        continue;
      } else {
        // If 400 or quota error, stop
        geminiRes = response;
        break;
      }
    }

    if (!geminiRes || !geminiRes.ok) {
      const errText = geminiRes ? await geminiRes.text() : 'No response from AI endpoints';
      console.error('Gemini Vision API Error:', modelUsed, errText);
      return res.status(200).json({
        fallback: true,
        error: 'API_ERROR',
        status: geminiRes?.status,
        modelAttempted: modelUsed,
        geminiError: errText,
        message: `Google Gemini Vision (${modelUsed}) error: ${errText}`
      });
    }

    const geminiData = await geminiRes.json();
    const rawContent = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawContent) {
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
    return res.status(200).json({
      fallback: true,
      error: 'SERVER_ERROR',
      message: error?.message || 'Server error occurred during vision analysis.'
    });
  }
}
