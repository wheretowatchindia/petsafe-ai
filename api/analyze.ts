export const config = {
  maxDuration: 30, // 30 seconds max duration for image analysis
};

interface AnalyzeRequest {
  imageBase64?: string;
  mimeType?: string;
  query?: string;
  species: 'dog' | 'cat';
  weightLbs?: number;
}

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim().length === 0) {
    return res.status(200).json({
      fallback: true,
      error: 'NO_API_KEY',
      message: 'GEMINI_API_KEY is not configured on the server. Falling back to local veterinary index.'
    });
  }

  try {
    const { imageBase64, mimeType = 'image/jpeg', query = '', species = 'dog', weightLbs }: AnalyzeRequest = req.body;

    if (!imageBase64 && !query) {
      return res.status(400).json({ error: 'Either image or query text is required.' });
    }

    const speciesLabel = species === 'dog' ? 'Canine (Dog)' : 'Feline (Cat)';
    const promptText = `
You are PetSafe AI, an expert veterinary toxicological assistant evaluating safety for companion animals (AVMA, ASPCA Animal Poison Control, Merck Veterinary Manual standards).

TARGET COMPANION SPECIES: ${speciesLabel}
${weightLbs ? `APPROXIMATE PET WEIGHT: ${weightLbs} lbs (${(weightLbs * 0.453592).toFixed(1)} kg)` : ''}
USER QUERY / LABEL: "${query}"

INSTRUCTIONS:
1. Examine the provided photo (or query text) carefully. If it is a food label, perform OCR to scan all ingredients for known toxins (e.g., Xylitol/birch bark extract, chocolate/theobromine, grapes/raisins, garlic/onion, macadamia nuts, high sodium, artificial preservatives like BHA/BHT/ethoxyquin, propylene glycol for cats, caffeine, raw yeast dough).
2. If it is a plant or flower, identify the exact species. Remember: True Lilies (Lilium and Hemerocallis) are 100% FATAL to cats even from pollen or vase water! Sago palm, oleander, and autumn crocus are deadly to both.
3. Calculate species-specific hazards:
   - Compounds harmless to humans or dogs may be lethal to cats (e.g. Lilies, Acetaminophen/Tylenol, permethrin, essential oils).
   - Compounds dangerous to dogs include Xylitol, grapes/raisins, macadamia nuts.
4. Categorize safety strictly into ONE of four categories:
   - "safe" (Generally Safe in moderation)
   - "caution" (Potential risks, digestive upset, high fat/sodium, or choking hazard)
   - "toxic" (Potentially Toxic / Hazardous / Fatal)
   - "unknown" (Safety Not Verified or Unidentified substance)
   CRITICAL SAFETY RULE: If the substance or plant in the photo cannot be identified with high confidence, DO NOT mark it as safe. Categorize as "unknown".
5. Return ONLY a valid JSON object matching this exact schema:
{
  "query": "Specific common name of identified substance",
  "species": "${species}",
  "safetyLevel": "safe" | "caution" | "toxic" | "unknown",
  "headline": "Clear 1-sentence safety verdict",
  "mainConcerns": ["Specific clinical concerns and reasons"],
  "toxicCompounds": ["Named chemical or plant toxins if any, or empty array"],
  "precautions": ["Actionable precautions for the owner"],
  "recommendedNextSteps": ["Exact immediate steps to take"],
  "references": [
    { "title": "Reference name", "organization": "ASPCA Animal Poison Control / AVMA / Merck" }
  ],
  "confidence": number between 0.1 and 1.0,
  "source": "ai_vision"
}
`;

    // Construct parts for Gemini API
    const contentsParts: any[] = [];

    // Add image if provided
    if (imageBase64) {
      // Clean base64 string if it contains data URI prefix
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');
      contentsParts.push({
        inline_data: {
          mime_type: mimeType,
          data: cleanBase64
        }
      });
    }

    contentsParts.push({
      text: promptText
    });

    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const geminiRes = await fetch(geminiEndpoint, {
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
          temperature: 0.2
        }
      })
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error('Gemini API Error:', errText);
      return res.status(200).json({
        fallback: true,
        error: 'API_ERROR',
        message: 'Gemini vision service temporarily unavailable. Falling back to local verified database.'
      });
    }

    const geminiData = await geminiRes.json();
    const rawContent = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawContent) {
      return res.status(200).json({
        fallback: true,
        error: 'EMPTY_RESPONSE',
        message: 'No response from AI model. Falling back.'
      });
    }

    const parsedResult = JSON.parse(rawContent);
    return res.status(200).json({
      ...parsedResult,
      source: 'ai_vision'
    });

  } catch (error: any) {
    console.error('Server error in analyze handler:', error);
    return res.status(200).json({
      fallback: true,
      error: 'SERVER_ERROR',
      message: error?.message || 'Server error occurred'
    });
  }
}
