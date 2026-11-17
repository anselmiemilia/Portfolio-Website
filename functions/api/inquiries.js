// Cloudflare Pages Function: /api/inquiries  (password-protected)
//
// Backs the private page anfragen.html: lists the "Commission a painting"
// inquiries saved by contact.js, and lets Emilia mark them done or delete
// them. Protected by a Bearer token that must equal the ADMIN_TOKEN secret
// (Cloudflare Pages → Settings → Variables and Secrets). Without that secret
// the endpoint refuses everything.
//
//   GET                         → { inquiries: [ { id, createdAt, status, name, email, ... } ] }
//   POST { id, action: 'done' | 'open' | 'delete' }

import { corsHeaders } from '../_lib/cors.js';

const PREFIX = 'inquiry:';

export function onRequestOptions({ request }) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

function json(body, status, request) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: Object.assign({ 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }, corsHeaders(request))
  });
}

// Constant-time string comparison so the token can't be guessed byte by byte.
function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function authorized(request, env) {
  if (!env.ADMIN_TOKEN) return false;
  const header = request.headers.get('Authorization') || '';
  return safeEqual(header.replace(/^Bearer\s+/i, ''), env.ADMIN_TOKEN);
}

function guard(request, env) {
  if (!env.ADMIN_TOKEN) return json({ error: 'not_configured' }, 503, request);
  if (!env.STOCK_KV) return json({ error: 'no_storage' }, 500, request);
  if (!authorized(request, env)) return json({ error: 'unauthorized' }, 401, request);
  return null;
}

export async function onRequestGet({ request, env }) {
  const denied = guard(request, env);
  if (denied) return denied;

  const listed = await env.STOCK_KV.list({ prefix: PREFIX, limit: 500 });
  const rows = await Promise.all(listed.keys.map(async function (k) {
    const raw = await env.STOCK_KV.get(k.name);
    if (!raw) return null;
    try {
      return Object.assign({ id: k.name.slice(PREFIX.length) }, JSON.parse(raw));
    } catch (e) {
      return null;
    }
  }));
  const inquiries = rows.filter(Boolean).sort(function (a, b) {
    return String(b.createdAt).localeCompare(String(a.createdAt));
  });
  return json({ inquiries: inquiries }, 200, request);
}

export async function onRequestPost({ request, env }) {
  const denied = guard(request, env);
  if (denied) return denied;

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: 'invalid' }, 400, request);
  }
  const id = body && typeof body.id === 'string' ? body.id : '';
  const action = body && body.action;
  if (!id || (action !== 'done' && action !== 'open' && action !== 'delete')) {
    return json({ error: 'invalid' }, 400, request);
  }
  const key = PREFIX + id;

  if (action === 'delete') {
    await env.STOCK_KV.delete(key);
    return json({ ok: true }, 200, request);
  }

  // Keep the original auto-delete date when changing the status.
  const listed = await env.STOCK_KV.list({ prefix: key, limit: 1 });
  const meta = listed.keys.find(function (k) { return k.name === key; });
  const raw = await env.STOCK_KV.get(key);
  if (!raw) return json({ error: 'not_found' }, 404, request);
  const data = JSON.parse(raw);
  data.status = action === 'done' ? 'done' : 'waitlist';
  const opts = meta && meta.expiration ? { expiration: meta.expiration } : { expirationTtl: 31536000 };
  await env.STOCK_KV.put(key, JSON.stringify(data), opts);
  return json({ ok: true }, 200, request);
}
