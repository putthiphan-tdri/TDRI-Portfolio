import { put, list } from '@vercel/blob';

const BLOB_PATHNAME = 'portfolio-data.json';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const { blobs } = await list({ prefix: BLOB_PATHNAME, limit: 1 });
      if (blobs.length === 0) {
        return res.status(404).json(null);
      }
      const response = await fetch(blobs[0].url);
      if (!response.ok) throw new Error('Failed to fetch blob');
      const portfolioData = await response.json();
      res.setHeader('Cache-Control', 'no-store');
      return res.json(portfolioData);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const body =
        typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      await put(BLOB_PATHNAME, body, {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
      });
      return res.json({ ok: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
