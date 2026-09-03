import { EDITION_LIMITS, CATALOG } from './catalog.js';

// KV holds one key per product+size with the number sold so far. Counts
// are only incremented from the Stripe webhook, once a payment has actually
// completed — never at checkout-session creation — so abandoned checkouts
// don't wrongly count against the edition.
//
// Known limitation: this is a plain read-then-write, not an atomic
// increment. Two payments completing for the very last unit within
// moments of each other could in theory both succeed. Given the small
// scale here (editions of 10-20), that risk is accepted rather than
// building a fully atomic counter (e.g. a Durable Object).

function stockKey(id, size) {
  return 'sold:' + id + ':' + size;
}

export async function getSold(kv, id, size) {
  const raw = await kv.get(stockKey(id, size));
  return raw ? parseInt(raw, 10) || 0 : 0;
}

export async function getRemaining(kv, id, size) {
  const product = CATALOG[id];
  const limit = (product && product.editions && product.editions[size] !== undefined)
    ? product.editions[size]
    : EDITION_LIMITS[size];
  if (limit === undefined) return null;
  const reserved = (product && product.reserved && product.reserved[size]) || 0;
  const sold = await getSold(kv, id, size);
  return Math.max(limit - reserved - sold, 0);
}

export async function incrementSold(kv, id, size, qty) {
  const current = await getSold(kv, id, size);
  await kv.put(stockKey(id, size), String(current + qty));
}
