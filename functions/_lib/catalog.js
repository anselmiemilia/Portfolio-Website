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
    // 8 of the 10 A3s are already spoken for outside the site (physical
    // presales); 1 has sold through the site itself (counted in KV), so
    // only 1 is actually left to sell here — this keeps the site's stock
    // count and "Ausverkauft" state accurate without needing a manual KV
    // edit once that last one sells.
    reserved: { A3: 8 }
  },
  // One-of-a-kind canvases ("Originale" section). Each has a single price
  // under the "Original" pseudo-size instead of A4/A3 — there's only ever
  // one of these, not a print edition.
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

// Each product has its own limited edition per size (not a shared pool
// across products) — matches the "Limitierte Auflage von X Stück" text
// shown on the product pages.
//
// Original is the pseudo-size for one-of-a-kind canvases (the "Originale"
// section): each is a single unique piece, so its edition is always 1.
export const EDITION_LIMITS = { A4: 20, A3: 10, Original: 1 };
