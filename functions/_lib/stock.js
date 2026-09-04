import { EDITION_LIMITS, CATALOG } from './catalog.js';

// All sold counters live in ONE KV key ("sold") holding a JSON object of
// the form { "<productId>:<size>": <number sold so far> }.
//
// Why one key instead of one per product+size: the Workers free plan allows
// 100,000 KV reads per day, and /api/stock used to cost ~15 reads per call
// (one per product+size). A viral TikTok in September 2026 pushed that to
// the daily limit within hours. With a single key, a full stock lookup is
// exactly one read, whatever the catalog size.
//
// Counts are only incremented from the Stripe webhook, once a payment has
// actually completed — never at checkout-session creation — so abandoned
// checkouts don't wrongly count against the edition.
//
// Known limitation: incrementSold is a plain read-then-write, not an atomic
// increment. Two payments completing for the very last unit within moments
// of each other could in theory both succeed. Given the small scale here
// (editions of 10-30), that risk is accepted rather than building a fully
// atomic counter (e.g. a Durable Object).

export const SOLD_KEY = 'sold';

function soldKey(id, size) {
  return id + ':' + size;
}

// One KV read for the whole catalog. Throws if KV itself fails (e.g. the
// daily free-tier limit is exhausted) — callers decide how to degrade.
export async function loadSold(kv) {
  const raw = await kv.get(SOLD_KEY);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (e) {
    return {};
  }
}

// Pure: remaining units for a product+size given an already-loaded sold map.
export function remainingFor(sold, id, size) {
  const product = CATALOG[id];
  const limit = (product && product.editions && product.editions[size] !== undefined)
    ? product.editions[size]
    : EDITION_LIMITS[size];
  if (limit === undefined) return null;
  const reserved = (product && product.reserved && product.reserved[size]) || 0;
  const soldCount = parseInt(sold[soldKey(id, size)], 10) || 0;
  return Math.max(limit - reserved - soldCount, 0);
}

export async function getRemaining(kv, id, size) {
  return remainingFor(await loadSold(kv), id, size);
}

export async function incrementSold(kv, id, size, qty) {
  const sold = await loadSold(kv);
  const key = soldKey(id, size);
  sold[key] = (parseInt(sold[key], 10) || 0) + qty;
  await kv.put(SOLD_KEY, JSON.stringify(sold));
}
