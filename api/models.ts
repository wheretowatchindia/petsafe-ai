export default async function handler(req: any, res: any) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(200).json({ error: 'NO_API_KEY' });
  }

  try {
    const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`, {
      signal: AbortSignal.timeout(8000)
    });
    
    if (!listRes.ok) {
      const err = await listRes.text();
      return res.status(listRes.status).json({ error: err });
    }

    const data = await listRes.json();
    const modelNames = (data.models || []).map((m: any) => m.name);
    return res.status(200).json({ success: true, count: modelNames.length, models: modelNames });
  } catch (err: any) {
    return res.status(500).json({ error: err.message, stack: err.stack });
  }
}
