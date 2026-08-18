// Cloudflare Pages Function: POST /api/create-checkout-session
//
// Creates a Stripe Checkout Session for the items currently in the visitor's
// cart. Prices are never trusted from the client — every item is looked up
// against CATALOG below, which is the single source of truth for what
// something costs. When a new product goes live on the site, add it here
// too (id must match the product page's filename without ".html").

import { COUNTRIES, PRODUCT_FORMAT, getSelectableCountries } from '../_lib/shippingRates.js';

const CATALOG = {
  'abendrosa-in-marrakesch': {
    name: 'Abendrosa in Marrakesch',
    image: 'https://anselmi.at/assets/kunst/abendrosainmarrakesch.jpg',
    prices: { A4: 2000, A3: 2500 } // cents
  },
  'doce-sao-miguel': {
    name: 'Doce São Miguel',
    image: 'https://anselmi.at/assets/kunst/docesaomiguel.jpg',
    prices: { A4: 2000, A3: 2500 } // cents
  }
};

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

// The site itself stays on GitHub Pages (anselmi.at) — only this checkout
// endpoint runs on Cloudflare Pages, under its own *.pages.dev domain. That
// makes every call to this function cross-origin from the browser's point
// of view, so it needs explicit CORS headers naming exactly which origins
// are allowed to call it.
const ALLOWED_ORIGINS = ['https://anselmi.at', 'https://www.anselmi.at'];

function corsHeaders(request) {
  const origin = request.headers.get('Origin');
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin'
  };
}

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
  for (const raw of items) {
    const product = raw && CATALOG[raw.id];
    const unitAmount = product && product.prices[raw.size];
    if (!product || !unitAmount) {
      return jsonResponse({ error: 'Unbekannter Artikel im Warenkorb.' }, 400, request);
    }
    const qty = Math.min(Math.max(parseInt(raw.qty, 10) || 1, 1), MAX_QTY_PER_ITEM);
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
  }

  const lang = body.lang === 'en' ? 'en' : 'de';
  const shippingFormat = requiredShippingFormat(items);

  const params = new URLSearchParams();
  appendParam(params, 'mode', 'payment');
  appendParam(params, 'success_url', SITE_ORIGIN + '/shop/erfolg.html?session_id={CHECKOUT_SESSION_ID}');
  appendParam(params, 'cancel_url', SITE_ORIGIN + '/shop/abgebrochen.html');
  appendParam(params, 'locale', lang);
  appendParam(params, 'line_items', lineItems);
  appendParam(params, 'payment_method_types', ['card', 'paypal', 'sepa_debit', 'eps']);
  const allowedCountries = getSelectableCountries().map(function (c) { return c.code; });
  appendParam(params, 'shipping_address_collection', { allowed_countries: allowedCountries });
  appendParam(params, 'shipping_options', buildShippingOptions(shippingFormat, lang));

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
