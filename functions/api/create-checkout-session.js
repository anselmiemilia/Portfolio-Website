// Cloudflare Pages Function: POST /api/create-checkout-session
//
// Creates a Stripe Checkout Session for the items currently in the visitor's
// cart. Prices are never trusted from the client — every item is looked up
// against CATALOG, the single source of truth for what something costs.

import { CATALOG } from '../_lib/catalog.js';
import { COUNTRIES, PRODUCT_FORMAT, getSelectableCountries } from '../_lib/shippingRates.js';
import { loadSold, remainingFor } from '../_lib/stock.js';
import { corsHeaders } from '../_lib/cors.js';

// Versandkosten kommen aus functions/_lib/shippingRates.js (Österreichische
// Post "Paketmarke", Details dort). Stripe Checkout kennt die vom Kunden
// gewählte Lieferadresse erst NACH dem Erstellen der Session, nicht davor –
// deshalb wählt der Warenkorb VOR dem Checkout schon die Versandzone (AT /
// DE / übrige EU), und wir bauen daraus genau eine einzige Versandoption
// statt drei zur Auswahl. So kann nicht mehr aus Versehen die falsche
// (günstigere) Zone angeklickt werden. shipping_address_collection wird
// zusätzlich auf genau die Länder dieser Zone eingeschränkt, damit die in
// Stripe eingegebene Adresse gar nicht in eine andere Zone fallen kann.
const VALID_ZONES = ['AT', 'DE', 'EU_OTHER'];

const SHIPPING_OPTION_LABELS = {
  AT: { de: 'Österreich', en: 'Austria' },
  DE: { de: 'Deutschland', en: 'Germany' },
  EU_OTHER: { de: 'Übrige EU', en: 'Rest of EU' }
};

const SITE_ORIGIN = 'https://anselmi.at';
const MAX_QTY_PER_ITEM = 10;

export function onRequestOptions({ request }) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

function appendParam(params, key, value) {
  if (value === undefined || value === null) return;
  if (Array.isArray(value)) {
    value.forEach(function (v, i) { appendParam(params, key + '[' + i + ']', v); });
  } else if (typeof value === 'object') {
    Object.keys(value).forEach(function (k) { appendParam(params, key + '[' + k + ']', value[k]); });
  } else {
    params.append(key, String(value));
  }
}

function jsonResponse(body, status, request) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: Object.assign({ 'Content-Type': 'application/json' }, corsHeaders(request))
  });
}

// Ein Paket, das mehrere Größen/Formate enthält, braucht mindestens das
// größte benötigte Format. Ein Leinwand-Original wiegt/misst mehr als jeder
// Print, deshalb hebt es die ganze Bestellung auf die ORIGINAL-Tarifspalte,
// egal welche Prints sonst noch im Warenkorb liegen.
function requiredShippingFormat(items) {
  var needsOriginal = items.some(function (i) { return PRODUCT_FORMAT[i.size] === 'ORIGINAL'; });
  if (needsOriginal) return 'ORIGINAL';
  var needsPM70 = items.some(function (i) { return PRODUCT_FORMAT[i.size] === 'PM70'; });
  return needsPM70 ? 'PM70' : 'PM45';
}

function euroToCents(amount) {
  return Math.round(amount * 100);
}

// Only ever the ONE shipping option matching the zone chosen in the cart —
// never all three — so there's nothing to mis-click at Stripe's end.
function buildShippingOptions(format, lang, zone) {
  var amount = zone === 'EU_OTHER'
    ? Object.values(COUNTRIES).filter(function (c) { return c.tier === 'EU_OTHER'; })[0][format]
    : COUNTRIES[zone][format];
  return [{
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: { amount: euroToCents(amount), currency: 'eur' },
      display_name: SHIPPING_OPTION_LABELS[zone][lang]
    }
  }];
}

// Restricts Stripe's own address form to just the countries in the chosen
// zone, so the address actually entered can't end up in a different
// (cheaper) zone than the one already paid for.
function allowedCountriesForZone(zone) {
  var all = getSelectableCountries().map(function (c) { return c.code; });
  if (zone === 'AT' || zone === 'DE') return [zone];
  return all.filter(function (code) { return COUNTRIES[code].tier === 'EU_OTHER'; });
}

// Kill switch: flip to false to instantly stop all checkouts (e.g. while
// verifying which Stripe key — test or live — is actually configured).
const SHOP_ENABLED = true;

export async function onRequestPost({ request, env }) {
  if (!SHOP_ENABLED) {
    return jsonResponse({ error: 'Der Shop ist gerade vorübergehend nicht verfügbar.' }, 503, request);
  }

  if (!env.STRIPE_SECRET_KEY) {
    return jsonResponse({ error: 'Stripe ist nicht konfiguriert.' }, 500, request);
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return jsonResponse({ error: 'Ungültige Anfrage.' }, 400, request);
  }

  const items = Array.isArray(body.items) ? body.items : [];
  if (!items.length) {
    return jsonResponse({ error: 'Warenkorb ist leer.' }, 400, request);
  }

  const shippingZone = VALID_ZONES.includes(body.shippingZone) ? body.shippingZone : null;
  if (!shippingZone) {
    return jsonResponse({ error: 'Bitte wähle dein Versandland aus.' }, 400, request);
  }

  // One KV read for the whole cart. If KV is unavailable (e.g. the daily
  // free-tier read limit is exhausted) we deliberately fail OPEN: a checkout
  // that goes through without the stock check is far cheaper than a shop
  // that can't sell at all during a traffic spike. The webhook still counts
  // the sale once KV is back (Stripe retries failed webhook deliveries).
  let sold = null;
  if (env.STOCK_KV) {
    try {
      sold = await loadSold(env.STOCK_KV);
    } catch (e) {
      console.error('STOCK_KV read failed, skipping stock check:', e && e.message);
    }
  }

  const lineItems = [];
  const metaItems = [];
  const summaryParts = [];
  for (const raw of items) {
    const product = raw && CATALOG[raw.id];
    const unitAmount = product && product.prices[raw.size];
    if (!product || !unitAmount) {
      return jsonResponse({ error: 'Unbekannter Artikel im Warenkorb.' }, 400, request);
    }
    const qty = Math.min(Math.max(parseInt(raw.qty, 10) || 1, 1), MAX_QTY_PER_ITEM);

    if (sold) {
      const remaining = remainingFor(sold, raw.id, raw.size);
      if (remaining !== null && qty > remaining) {
        return jsonResponse({
          error: remaining === 0
            ? product.name + ' (' + raw.size + ') ist leider ausverkauft.'
            : 'Von ' + product.name + ' (' + raw.size + ') sind nur noch ' + remaining + ' Stück verfügbar.'
        }, 409, request);
      }
    }

    lineItems.push({
      quantity: qty,
      price_data: {
        currency: 'eur',
        unit_amount: unitAmount,
        product_data: {
          name: product.name + ' (' + raw.size + ')',
          images: [product.image]
        }
      }
    });
    metaItems.push({ id: raw.id, size: raw.size, qty: qty });
    summaryParts.push(product.name + ' (' + raw.size + ')' + (qty > 1 ? ' x' + qty : ''));
  }

  const lang = body.lang === 'en' ? 'en' : 'de';
  const shippingFormat = requiredShippingFormat(items);

  const params = new URLSearchParams();
  appendParam(params, 'mode', 'payment');
  appendParam(params, 'success_url', SITE_ORIGIN + '/shop/erfolg.html?session_id={CHECKOUT_SESSION_ID}');
  appendParam(params, 'cancel_url', SITE_ORIGIN + '/shop/abgebrochen.html');
  appendParam(params, 'locale', lang);
  appendParam(params, 'line_items', lineItems);
  // Shows up directly in the Stripe Payments list without having to open
  // the payment/session — otherwise there's no way to tell what was
  // ordered without clicking in.
  appendParam(params, 'payment_intent_data', { description: summaryParts.join(', ').slice(0, 500) });
  // 'paypal' und 'sepa_debit' sind absichtlich (noch) nicht dabei – müssen
  // in Stripe erst unter Settings -> Payment methods aktiviert werden,
  // sonst lehnt Stripe die ganze Session mit 500 ab. Sobald aktiviert:
  // hier wieder ergänzen.
  appendParam(params, 'payment_method_types', ['card', 'eps']);
  appendParam(params, 'shipping_address_collection', { allowed_countries: allowedCountriesForZone(shippingZone) });
  appendParam(params, 'shipping_options', buildShippingOptions(shippingFormat, lang, shippingZone));
  // Read back by the Stripe webhook once payment completes, to know exactly
  // which product/size/qty to count against the edition limit.
  appendParam(params, 'metadata', { items: JSON.stringify(metaItems) });
  // Stripe automatically generates and emails a PDF invoice for the order
  // once payment succeeds, on top of its own payment-receipt email.
  appendParam(params, 'invoice_creation', { enabled: 'true' });

  let stripeRes;
  try {
    stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + env.STRIPE_SECRET_KEY,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });
  } catch (e) {
    return jsonResponse({ error: 'Stripe konnte nicht erreicht werden.' }, 502, request);
  }

  const session = await stripeRes.json();
  if (!stripeRes.ok) {
    return jsonResponse({ error: session.error && session.error.message }, 500, request);
  }

  return jsonResponse({ url: session.url }, 200, request);
}
