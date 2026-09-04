// Cloudflare Pages Function: GET /api/stock
//
// Public, read-only: how many of each product/size are still available.
// Used by the product pages to grey out sold-out sizes. This is a UX
// convenience only — the authoritative check happens again in
// create-checkout-session.js right before a Stripe session is created.
//
// The response is cached at the edge for CACHE_SECONDS via the Cache API,
// so a traffic spike costs at most one KV read per data center per minute
// instead of one per visitor. Stock being up to a minute stale here is
// fine: checkout re-checks the live value anyway.

import { CATALOG } from '../_lib/catalog.js';
import { loadSold, remainingFor } from '../_lib/stock.js';
import { corsHeaders } from '../_lib/cors.js';

const CACHE_SECONDS = 60;

export function onRequestOptions({ request }) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

async function buildStock(env) {
  const sold = env.STOCK_KV ? await loadSold(env.STOCK_KV) : null;
  const result = {};
  for (const id of Object.keys(CATALOG)) {
    result[id] = {};
    for (const size of Object.keys(CATALOG[id].prices)) {
      result[id][size] = sold ? remainingFor(sold, id, size) : null;
    }
  }
  return result;
}

function withCors(response, request) {
  const headers = new Headers(response.headers);
  const cors = corsHeaders(request);
  for (const name of Object.keys(cors)) headers.set(name, cors[name]);
  return new Response(response.body, { status: response.status, headers });
}

export async function onRequestGet({ request, env, waitUntil }) {
  // Cache key deliberately ignores query string and Origin: the payload is
  // identical for everyone, CORS headers are re-applied per request below.
  const cacheKey = new Request(new URL(request.url).origin + '/api/stock', { method: 'GET' });
  const cache = caches.default;

  let response = await cache.match(cacheKey);
  if (!response) {
    let stock;
    try {
      stock = await buildStock(env);
    } catch (e) {
      // KV unavailable (e.g. daily limit hit): don't cache the failure, the
      // page just won't show badges and checkout still enforces stock.
      return withCors(new Response(JSON.stringify({ error: 'stock unavailable' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
      }), request);
    }
    response = new Response(JSON.stringify(stock), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=30, s-maxage=' + CACHE_SECONDS
      }
    });
    waitUntil(cache.put(cacheKey, response.clone()));
  }
  return withCors(response, request);
}
