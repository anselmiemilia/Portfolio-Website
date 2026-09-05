// Single source of truth for products sold via the cart/checkout. When a
// new product goes live on the site, add it here too (id must match the
// product page's filename without ".html").

export const CATALOG = {
  'abendrosa-in-marrakesch': {
    name: 'Abendrosa in Marrakesch',
    image: 'https://anselmi.at/assets/kunst/abendrosainmarrakesch/abendrosainmarrakesch.jpg',
    prices: { A4: 2000, A3: 2500 } // cents
  },
  'doce-sao-miguel': {
    name: 'Doce São Miguel',
    image: 'https://anselmi.at/assets/kunst/docesaomiguel/docesaomiguel.jpg',
    prices: { A4: 2000, A3: 2500 } // cents
  },
  'sommer-sonne-baedala': {
    name: 'Sommer, Sonne, Bädala',
    image: 'https://anselmi.at/assets/kunst/sommersonnebaedala/sommersonnebaedala.jpg',
    prices: { A4: 2000 } // cents — A4 only
  },
  'the-city-of-buses': {
    name: 'The City of Buses',
    image: 'https://anselmi.at/assets/kunst/thecityofbuses/thecityofbuses.jpg',
    prices: { A4: 2000, A3: 2500 }, // cents — pre-order, ships early/mid September
    // Edition of 10 is now fully spoken for: 9 completed/paid A3 orders
    // via Stripe (checked directly via the Stripe API) plus 1 sold outside
    // the site entirely. STOCK_KV's sold counter only reflects 2 of the 9
    // Stripe orders — the increment webhook evidently missed the rest —
    // so `reserved` covers everything KV doesn't know about (7 uncounted
    // site orders + the 1 outside sale) to make remaining come out to 0.
    // Drop/adjust this once the webhook gap is fixed and/or KV is
    // corrected directly.
    // A4: 2 sold outside the site entirely (Instagram DMs, to poppy.ben23
    // and elspeth) — not counted by STOCK_KV, so reserved covers them too.
    reserved: { A3: 8, A4: 2 }
  },
  'pink-new-york-city-print': {
    name: 'Pink New York City',
    image: 'https://anselmi.at/assets/kunst/pinknewyorkcity/pinknewyorkcity.jpg',
    prices: { A4: 2000, A3: 2500 }, // cents — pre-order
    // Larger edition than the other prints (default 20/10 from
    // EDITION_LIMITS below) — overrides it per size here. A3 raised from
    // 20 to 30 on 2026-09-05.
    editions: { A4: 30, A3: 30 },
    // 2 A3s sold outside the site entirely (physical presales, to Nele
    // Holstegge and Lottie Cook) — not counted by STOCK_KV, so `reserved`
    // covers them to keep remaining stock accurate.
    reserved: { A3: 2 }
  },
  // One-of-a-kind canvases ("Originale" section). Each has a single price
  // under the "Original" pseudo-size instead of A4/A3 — there's only ever
  // one of these, not a print edition.
  'first-district': {
    name: 'First District',
    image: 'https://anselmi.at/assets/kunst/originale/FirstDistrict/firstdistrict.jpg',
    prices: { Original: 40000 } // cents
  },
  'pink-new-york-city': {
    name: 'Pink New York City',
    image: 'https://anselmi.at/assets/kunst/originale/PinkNewYorkCity/pinknewyorkcity.jpg',
    prices: { Original: 30000 } // cents
  },
  'dinner-at-la-maison-rose': {
    name: 'Dinner at La Maison Rose?',
    image: 'https://anselmi.at/assets/kunst/originale/Paris/dinneratlamaisonrose.jpg',
    prices: { Original: 35000 } // cents
  },
  'in-barcelona': {
    name: 'In Barcelona',
    image: 'https://anselmi.at/assets/kunst/originale/Barcelona/inbarcelona.jpg',
    prices: { Original: 25000 } // cents
  },
  'smells-like-northern-italy': {
    name: 'Smells Like Northern Italy',
    image: 'https://anselmi.at/assets/kunst/originale/Como/smellslikenorthernitaly.jpg',
    prices: { Original: 25000 } // cents
  },
  'feldkircher-aussichten': {
    name: 'Feldkircher Aussichten',
    image: 'https://anselmi.at/assets/kunst/originale/Feldkirch/feldkircheraussichten.jpg',
    prices: { Original: 25000 } // cents
  },
  'lissabon': {
    name: 'Lissabon',
    image: 'https://anselmi.at/assets/kunst/originale/Lissabon/lissabon.jpg',
    prices: { Original: 25000 } // cents
  },
  'the-city-of-buses-original': {
    name: 'The City of Buses',
    image: 'https://anselmi.at/assets/kunst/originale/London/thecityofbusesoriginal.jpg',
    prices: { Original: 25000 } // cents
  }
};

// Default limited edition per size (not a shared pool across products) —
// matches the "Limitierte Auflage von X Stück" text shown on the product
// pages. A product can override this via its own `editions` field (see
// 'pink-new-york-city-print' above) when its edition size differs.
//
// Original is the pseudo-size for one-of-a-kind canvases (the "Originale"
// section): each is a single unique piece, so its edition is always 1.
export const EDITION_LIMITS = { A4: 20, A3: 10, Original: 1 };
