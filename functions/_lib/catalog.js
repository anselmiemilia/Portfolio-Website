// Single source of truth for products sold via the cart/checkout. When a
// new product goes live on the site, add it here too (id must match the
// product page's filename without ".html").

export const CATALOG = {
  'abendrosa-in-marrakesch': {
    name: 'Abendrosa in Marrakesch',
    image: 'https://anselmi.at/assets/kunst/abendrosainmarrakesch/abendrosainmarrakesch.jpg',
    prices: { A4: 2000, A3: 2500 }, // cents
    // 1 A3 sold via a manually created Stripe invoice — that doesn't fire
    // checkout.session.completed with item metadata, so STOCK_KV never
    // counts it. reserved covers it to keep remaining stock accurate.
    reserved: { A3: 1 }
  },
  'doce-sao-miguel': {
    name: 'Doce São Miguel',
    image: 'https://anselmi.at/assets/kunst/docesaomiguel/docesaomiguel.jpg',
    prices: { A4: 2000, A3: 2500 } // cents
  },
  'sommer-sonne-baedala': {
    name: 'Sommer, Sonne, Bädala',
    image: 'https://anselmi.at/assets/kunst/sommersonnebaedala/sommersonnebaedala.jpg',
    prices: { A4: 2000 }, // cents — A4 only
    // 1 A4 sold outside the site via PayPal — not counted by STOCK_KV, so
    // reserved covers it to keep remaining stock accurate.
    reserved: { A4: 1 }
  },
  'the-city-of-buses': {
    name: 'The City of Buses',
    image: 'https://anselmi.at/assets/kunst/thecityofbuses/thecityofbuses.jpg',
    prices: { A4: 2000, A3: 2500 }, // cents
    // TEMP DIAGNOSTIC (2026-09-12): remainingFor() clamps at 0 via
    // Math.max(), so repeatedly seeing "remaining: 0" while lowering
    // `reserved` never actually proved what STOCK_KV's real A3 sold count
    // is — it could have been sitting far below the true value in a way
    // the clamp hid completely. This inflates the edition hugely and
    // zeroes reserved so remaining reads out the true raw KV count
    // unclamped. Drop this override once that's read and reserved is set
    // correctly for real (see the A4 note below for the actual edition).
    editions: { A3: 1000 },
    // A4: 2 sold outside the site entirely (1 Instagram DM, to elspeth,
    // plus 1 via Vinted) — not counted by STOCK_KV, so reserved covers
    // them too. The poppy.ben23 DM sale turned out not to have happened
    // after all, so it's been dropped from this count.
    reserved: { A3: 0, A4: 2 }
  },
  'pink-new-york-city-print': {
    name: 'Pink New York City',
    image: 'https://anselmi.at/assets/kunst/pinknewyorkcity/pinknewyorkcity.jpg',
    prices: { A4: 2000, A3: 2500 }, // cents — pre-order
    // Larger edition than the other prints (default 20/10 from
    // EDITION_LIMITS below) — overrides it per size here. A3 raised from
    // 20 to 30 on 2026-09-05, then to 40 on 2026-09-07.
    editions: { A4: 30, A3: 40 },
    // 4 A3s sold outside the site entirely (physical presales to Nele
    // Holstegge and Lottie Cook, 1 via a manually created Stripe invoice,
    // plus 1 given to a friend) — not counted by STOCK_KV, so `reserved`
    // covers them to keep remaining stock accurate.
    reserved: { A3: 4 }
  },
  // One-of-a-kind canvases ("Originale" section). Each has a single price
  // under the "Original" pseudo-size instead of A4/A3 — there's only ever
  // one of these, not a print edition.
  //
  // A sold original is removed from CATALOG entirely rather than tracked
  // via `reserved` — there's only ever one unit, so once it's gone it's
  // gone for good (no future restock to reserve against, unlike a print
  // edition). Its product page hardcodes the disabled "Verkauft" button
  // and the overview badge is static, same pattern as Café Central.
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
  'lissabon': {
    name: 'Lissabon',
    image: 'https://anselmi.at/assets/kunst/originale/Lissabon/lissabon.jpg',
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
