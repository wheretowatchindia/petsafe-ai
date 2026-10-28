export default async function handler(req: any, res: any) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(200).json({ error: 'NO_KEY' });

  const model = 'gemini-2.5-flash';
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: "Respond with JSON: {\"status\": \"ok\", \"name\": \"Dark Chocolate\", \"safe\": false}" }]
          }
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.1
        }
      })
    });

    const status = response.status;
    const text = await response.text();
    return res.status(200).json({ status, text });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
