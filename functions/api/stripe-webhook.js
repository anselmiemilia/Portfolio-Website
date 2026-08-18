// Cloudflare Pages Function: POST /api/stripe-webhook
//
// Stripe calls this once a Checkout Session actually completes payment.
// That's the only moment we count a sale against the edition limit —
// never at checkout-session creation, since a lot of started checkouts
// are abandoned and never pay.

import { incrementSold } from '../_lib/stock.js';

const TOLERANCE_SECONDS = 300; // reject events with a stale/replayed timestamp

function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

async function verifyStripeSignature(payload, header, secret) {
  const parts = {};
  header.split(',').forEach(function (part) {
    const idx = part.indexOf('=');
    if (idx === -1) return;
    parts[part.slice(0, idx)] = part.slice(idx + 1);
  });
  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) return false;

  const age = Math.abs(Date.now() / 1000 - parseInt(timestamp, 10));
  if (age > TOLERANCE_SECONDS) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
  );
  const signedPayload = timestamp + '.' + payload;
  return crypto.subtle.verify('HMAC', key, hexToBytes(signature), encoder.encode(signedPayload));
}

export async function onRequestPost({ request, env }) {
  if (!env.STRIPE_WEBHOOK_SECRET) {
    return new Response('Webhook not configured', { status: 500 });
  }

  const signatureHeader = request.headers.get('Stripe-Signature');
  const payload = await request.text();

  if (!signatureHeader) {
    return new Response('Missing signature', { status: 400 });
  }

  let valid;
  try {
    valid = await verifyStripeSignature(payload, signatureHeader, env.STRIPE_WEBHOOK_SECRET);
  } catch (e) {
    valid = false;
  }
  if (!valid) {
    return new Response('Invalid signature', { status: 400 });
  }

  let event;
  try {
    event = JSON.parse(payload);
  } catch (e) {
    return new Response('Invalid JSON', { status: 400 });
  }

  if (event.type === 'checkout.session.completed' && env.STOCK_KV) {
    const session = event.data && event.data.object;
    const itemsRaw = session && session.metadata && session.metadata.items;
    if (itemsRaw) {
      let items = [];
      try { items = JSON.parse(itemsRaw); } catch (e) { items = []; }
      for (const item of items) {
        if (item && item.id && item.size && item.qty) {
          await incrementSold(env.STOCK_KV, item.id, item.size, item.qty);
        }
      }
    }
  }

  return new Response('ok', { status: 200 });
}
