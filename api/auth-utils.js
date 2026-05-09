import { createHmac, timingSafeEqual } from 'node:crypto';

export const AUTH_COOKIE = 'tdri_portfolio_owner';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function getSecret() {
  return process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD || '';
}

function sign(payload) {
  return createHmac('sha256', getSecret()).update(payload).digest('base64url');
}

function safeEqual(a, b) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function parseCookies(req) {
  const cookieHeader = req.headers.cookie || '';
  return Object.fromEntries(
    cookieHeader
      .split(';')
      .map((cookie) => cookie.trim())
      .filter(Boolean)
      .map((cookie) => {
        const index = cookie.indexOf('=');
        if (index === -1) return [cookie, ''];
        return [cookie.slice(0, index), decodeURIComponent(cookie.slice(index + 1))];
      })
  );
}

function cookieOptions(maxAge = MAX_AGE_SECONDS) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

export function hasAdminPassword() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function isOwnerRequest(req) {
  const secret = getSecret();
  if (!secret) return false;

  const token = parseCookies(req)[AUTH_COOKIE];
  if (!token || !token.includes('.')) return false;

  const [payload, signature] = token.split('.');
  if (!payload || !signature || !safeEqual(signature, sign(payload))) return false;

  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return session.role === 'owner' && Number(session.exp) > Date.now();
  } catch {
    return false;
  }
}

export function createOwnerCookie() {
  const payload = Buffer.from(
    JSON.stringify({
      role: 'owner',
      exp: Date.now() + MAX_AGE_SECONDS * 1000,
    })
  ).toString('base64url');

  return `${AUTH_COOKIE}=${encodeURIComponent(`${payload}.${sign(payload)}`)}; ${cookieOptions()}`;
}

export function clearOwnerCookie() {
  return `${AUTH_COOKIE}=; ${cookieOptions(0)}`;
}

export function requireOwner(req, res) {
  if (isOwnerRequest(req)) return true;
  res.status(401).json({ error: 'Owner login required' });
  return false;
}
