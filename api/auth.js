import {
  clearOwnerCookie,
  createOwnerCookie,
  hasAdminPassword,
  isOwnerRequest,
} from './auth-utils.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'GET') {
    return res.json({
      authenticated: isOwnerRequest(req),
      configured: hasAdminPassword(),
    });
  }

  if (req.method === 'POST') {
    if (!hasAdminPassword()) {
      return res.status(503).json({ error: 'Owner password is not configured' });
    }

    let body = req.body || {};
    if (typeof req.body === 'string') {
      try {
        body = JSON.parse(req.body || '{}');
      } catch {
        return res.status(400).json({ error: 'Invalid login request' });
      }
    }
    if (body.password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    res.setHeader('Set-Cookie', createOwnerCookie());
    return res.json({ authenticated: true });
  }

  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', clearOwnerCookie());
    return res.json({ authenticated: false });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
