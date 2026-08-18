// Cloudflare Pages Function: POST /api/create-checkout-session
//
// Creates a Stripe Checkout Session for the items currently in the visitor's
// cart. Prices are never trusted from the client — every item is looked up
// against CATALOG, the single source of truth for what something costs.

import { CATALOG } from '../_lib/catalog.js';
import { COUNTRIES, PRODUCT_FORMAT, getSelectableCountries } from '../_lib/shippingRates.js';
import { getRemaining } from '../_lib/stock.js';
import { corsHeaders } from '../_lib/cors.js';

// Versandkosten kommen aus functions/_lib/shippingRates.js (Österreichische
// Post "Paketmarke", Details dort). Stripe Checkout kennt die vom Kunden
// gewählte Lieferadresse erst NACH dem Erstellen der Session, nicht davor –
// deshalb bekommt jede Bestellung hier drei Versandoptionen (AT / DE /
// übrige EU) zur Auswahl, statt dass der Preis automatisch anhand der
// eingegebenen Adresse berechnet wird.
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

// Ein Paket, das mehrere Größen enthält, braucht mindestens das größte
// benötigte Format – z.B. wird ein Warenkorb mit A3 nur dann auf PM70
// gehoben, wenn PRODUCT_FORMAT.A3 künftig auf "PM70" gestellt wird.
function requiredShippingFormat(items) {
  var needsPM70 = items.some(function (i) { return PRODUCT_FORMAT[i.size] === 'PM70'; });
  return needsPM70 ? 'PM70' : 'PM45';
}

function euroToCents(amount) {
  return Math.round(amount * 100);
}

function buildShippingOptions(format, lang) {
  var euOtherPrice = Object.values(COUNTRIES).filter(function (c) { return c.tier === 'EU_OTHER'; })[0][format];
  var tiers = [
    { key: 'AT', amount: COUNTRIES.AT[format] },
    { key: 'DE', amount: COUNTRIES.DE[format] },
    { key: 'EU_OTHER', amount: euOtherPrice }
  ];
  return tiers.map(function (tier) {
    return {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: { amount: euroToCents(tier.amount), currency: 'eur' },
        display_name: SHIPPING_OPTION_LABELS[tier.key][lang]
      }
    };
  });
}

export async function onRequestPost({ request, env }) {
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

  const lineItems = [];
  const metaItems = [];
  for (const raw of items) {
    const product = raw && CATALOG[raw.id];
    const unitAmount = product && product.prices[raw.size];
    if (!product || !unitAmount) {
      return jsonResponse({ error: 'Unbekannter Artikel im Warenkorb.' }, 400, request);
    }
    const qty = Math.min(Math.max(parseInt(raw.qty, 10) || 1, 1), MAX_QTY_PER_ITEM);

    if (env.STOCK_KV) {
      const remaining = await getRemaining(env.STOCK_KV, raw.id, raw.size);
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
  }

  const lang = body.lang === 'en' ? 'en' : 'de';
  const shippingFormat = requiredShippingFormat(items);

  const params = new URLSearchParams();
  appendParam(params, 'mode', 'payment');
  appendParam(params, 'success_url', SITE_ORIGIN + '/shop/erfolg.html?session_id={CHECKOUT_SESSION_ID}');
  appendParam(params, 'cancel_url', SITE_ORIGIN + '/shop/abgebrochen.html');
  appendParam(params, 'locale', lang);
  appendParam(params, 'line_items', lineItems);
  // 'paypal' und 'sepa_debit' sind absichtlich (noch) nicht dabei – müssen
  // in Stripe erst unter Settings -> Payment methods aktiviert werden,
  // sonst lehnt Stripe die ganze Session mit 500 ab. Sobald aktiviert:
  // hier wieder ergänzen.
  appendParam(params, 'payment_method_types', ['card', 'eps']);
  const allowedCountries = getSelectableCountries().map(function (c) { return c.code; });
  appendParam(params, 'shipping_address_collection', { allowed_countries: allowedCountries });
  appendParam(params, 'shipping_options', buildShippingOptions(shippingFormat, lang));
  // Read back by the Stripe webhook once payment completes, to know exactly
  // which product/size/qty to count against the edition limit.
  appendParam(params, 'metadata', { items: JSON.stringify(metaItems) });

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
