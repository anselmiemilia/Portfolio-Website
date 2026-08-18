// Cloudflare Pages Function: GET /api/stock
//
// Public, read-only: how many of each product/size are still available.
// Used by the product pages to grey out sold-out sizes. This is a UX
// convenience only — the authoritative check happens again in
// create-checkout-session.js right before a Stripe session is created.

import { CATALOG } from '../_lib/catalog.js';
import { getRemaining } from '../_lib/stock.js';
import { corsHeaders } from '../_lib/cors.js';

export function onRequestOptions({ request }) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function onRequestGet({ request, env }) {
  const result = {};
  for (const id of Object.keys(CATALOG)) {
    result[id] = {};
    for (const size of Object.keys(CATALOG[id].prices)) {
      result[id][size] = env.STOCK_KV ? await getRemaining(env.STOCK_KV, id, size) : null;
    }
  }
  return new Response(JSON.stringify(result), {
    headers: Object.assign({ 'Content-Type': 'application/json' }, corsHeaders(request))
  });
}
