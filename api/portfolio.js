import { put, list, del, head } from '@vercel/blob';

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
      // head() returns a signed downloadUrl that works for private stores
      const meta = await head(blobs[0].url);
      const response = await fetch(meta.downloadUrl);
      if (!response.ok) throw new Error(`Blob fetch failed: ${response.status}`);
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
      // Remove previous blob before writing so we don't accumulate versions
      const { blobs: existing } = await list({ prefix: BLOB_PATHNAME, limit: 1 });
      if (existing.length > 0) {
        await del(existing.map((b) => b.url));
      }
      await put(BLOB_PATHNAME, body, {
        access: 'private',
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
