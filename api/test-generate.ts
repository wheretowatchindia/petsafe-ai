export default async function handler(req: any, res: any) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(200).json({ error: 'NO_KEY' });

  const candidates = [
    'gemini-flash-latest',
    'gemini-flash-lite-latest',
    'gemini-2.5-flash-lite',
    'gemini-3.5-flash',
    'gemini-3.5-flash-lite',
    'gemini-3.7-flash',
    'gemini-3.8-flash'
  ];

  const results: any[] = [];

  for (const model of candidates) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(4000),
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: "Respond with JSON: {\"status\":\"ok\",\"model\":\"" + model + "\"}" }]
            }
          ],
          generationConfig: {
            responseMimeType: 'application/json'
          }
        })
      });

      const text = await response.text();
      results.push({ model, status: response.status, ok: response.ok, body: text.slice(0, 150) });
      if (response.ok) {
        // Found working one!
        break;
      }
    } catch (err: any) {
      results.push({ model, error: err.message });
    }
  }

  return res.status(200).json({ results });
}
