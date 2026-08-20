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
    prices: { A4: 2000, A3: 2500 } // cents — pre-order, ships end of August
  }
};

// Each product has its own limited edition per size (not a shared pool
// across products) — matches the "Limitierte Auflage von X Stück" text
// shown on the product pages.
export const EDITION_LIMITS = { A4: 20, A3: 10 };
