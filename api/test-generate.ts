export const config = {
  maxDuration: 30
};

export default async function handler(req: any, res: any) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(200).json({ error: 'NO_KEY' });

  const testBase64Png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

  const t0 = Date.now();
  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: 'image/png',
                  data: testBase64Png
                }
              },
              {
                text: 'Identify this image for a dog safety check. Respond strictly with JSON: {"query":"Red Pixel","safetyLevel":"safe","headline":"Non-toxic pixel","confidence":1}'
              }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          thinkingConfig: {
            thinkingBudget: 0
          }
        }
      })
    });

    const elapsed = Date.now() - t0;
    const status = response.status;
    const body = await response.text();
    return res.status(200).json({ elapsedMs: elapsed, status, body: body.slice(0, 300) });
  } catch (err: any) {
    return res.status(500).json({ elapsedMs: Date.now() - t0, error: err.message });
  }
}
