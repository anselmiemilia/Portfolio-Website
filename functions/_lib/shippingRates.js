/**
 * Versandkosten - Österreichische Post "Paketmarke"
 * Quelle: post.at/p/a/paketmarke (Stand: August 2026)
 *
 * Deckt ab: Österreich + alle EU-Länder
 * NICHT abgedeckt: Schweiz (kein EU-Zollgebiet) -> siehe unsupportedCountries unten
 *
 * Format-Logik der Post: "längste Seite + kürzeste Seite" des Pakets in Summe
 *   PM45 = Summe bis 45cm  -> deckt A4 UND A3 flach im dünnen Umschlag ab
 *   PM70 = Summe bis 70cm  -> Sicherheitsmarge, falls Verpackung dicker wird
 *
 * A4 (29,7 x 21cm): passt sicher in PM45
 * A3 (42 x 29,7cm): passt knapp in PM45 (43cm) - bei dickerer/steiferer
 *                   Verpackung (Rückwand-Karton etc.) ggf. PM70 nötig!
 *                   -> Vor Go-Live mit echter Verpackung nachmessen.
 */

// Alle unterstützten Länder mit Preisen in Euro
// tier: "AT" | "DE" | "EU_OTHER" - bestimmt welche Preisspalte gilt
export const COUNTRIES = {
  AT: { name: "Österreich",     tier: "AT",       PM45: 5.21,  PM70: 7.83  },
  DE: { name: "Deutschland",    tier: "DE",       PM45: 12.62, PM70: 18.90 },
  BE: { name: "Belgien",        tier: "EU_OTHER", PM45: 16.54, PM70: 22.87 },
  BG: { name: "Bulgarien",      tier: "EU_OTHER", PM45: 16.54, PM70: 22.87 },
  DK: { name: "Dänemark",       tier: "EU_OTHER", PM45: 16.54, PM70: 22.87 },
  EE: { name: "Estland",        tier: "EU_OTHER", PM45: 16.54, PM70: 22.87 },
  FI: { name: "Finnland",       tier: "EU_OTHER", PM45: 16.54, PM70: 22.87 },
  FR: { name: "Frankreich",     tier: "EU_OTHER", PM45: 16.54, PM70: 22.87 },
  GR: { name: "Griechenland",   tier: "EU_OTHER", PM45: 16.54, PM70: 22.87 },
  IE: { name: "Irland",         tier: "EU_OTHER", PM45: 16.54, PM70: 22.87 },
  IT: { name: "Italien",        tier: "EU_OTHER", PM45: 16.54, PM70: 22.87 },
  HR: { name: "Kroatien",       tier: "EU_OTHER", PM45: 16.54, PM70: 22.87 },
  LV: { name: "Lettland",       tier: "EU_OTHER", PM45: 16.54, PM70: 22.87 },
  LT: { name: "Litauen",        tier: "EU_OTHER", PM45: 16.54, PM70: 22.87 },
  LU: { name: "Luxemburg",      tier: "EU_OTHER", PM45: 16.54, PM70: 22.87 },
  MT: { name: "Malta",          tier: "EU_OTHER", PM45: 16.54, PM70: 22.87 },
  NL: { name: "Niederlande",    tier: "EU_OTHER", PM45: 16.54, PM70: 22.87 },
  PL: { name: "Polen",          tier: "EU_OTHER", PM45: 16.54, PM70: 22.87 },
  PT: { name: "Portugal",       tier: "EU_OTHER", PM45: 16.54, PM70: 22.87 },
  RO: { name: "Rumänien",       tier: "EU_OTHER", PM45: 16.54, PM70: 22.87 },
  SE: { name: "Schweden",       tier: "EU_OTHER", PM45: 16.54, PM70: 22.87 },
  SK: { name: "Slowakei",       tier: "EU_OTHER", PM45: 16.54, PM70: 22.87 },
  SI: { name: "Slowenien",      tier: "EU_OTHER", PM45: 16.54, PM70: 22.87 },
  ES: { name: "Spanien",        tier: "EU_OTHER", PM45: 16.54, PM70: 22.87 },
  CZ: { name: "Tschechien",     tier: "EU_OTHER", PM45: 16.54, PM70: 22.87 },
  HU: { name: "Ungarn",         tier: "EU_OTHER", PM45: 16.54, PM70: 22.87 },
  CY: { name: "Zypern",         tier: "EU_OTHER", PM45: 16.54, PM70: 22.87 },
};

// Länder, die NICHT über die Paketmarke versendbar sind
export const UNSUPPORTED_COUNTRIES = {
  CH: {
    name: "Schweiz",
    reason: "Kein EU-Zollgebiet - Paketmarke deckt nur AT + EU ab. Separate Lösung nötig (z.B. reguläres Paket International, dort vermutlich Filialabgabe statt Online-Druck).",
  },
};

// Welches Format (PM45/PM70) für welches Druckformat gilt
export const PRODUCT_FORMAT = {
  A4: "PM45",
  A3: "PM45", // knapp - bei Bedarf auf "PM70" umstellen, siehe Kommentar oben
};

/**
 * Ermittelt den Versandpreis für ein Druckformat und Zielland.
 * @param {"A4"|"A3"} productSize
 * @param {string} countryCode - ISO 3166-1 alpha-2, z.B. "AT", "DE", "FR"
 * @returns {number} Preis in Euro
 * @throws {Error} wenn das Land nicht unterstützt wird
 */
export function getShippingPrice(productSize, countryCode) {
  const code = countryCode.toUpperCase();

  if (UNSUPPORTED_COUNTRIES[code]) {
    throw new Error(
      `Versand nach ${UNSUPPORTED_COUNTRIES[code].name} nicht über Paketmarke möglich: ${UNSUPPORTED_COUNTRIES[code].reason}`
    );
  }

  const country = COUNTRIES[code];
  if (!country) {
    throw new Error(`Land "${countryCode}" wird aktuell nicht unterstützt.`);
  }

  const format = PRODUCT_FORMAT[productSize];
  if (!format) {
    throw new Error(`Unbekanntes Produktformat "${productSize}". Erlaubt: A4, A3.`);
  }

  return country[format];
}

/**
 * Gibt eine Liste aller versendbaren Länder zurück, z.B. für ein
 * Dropdown/Select-Element im Checkout.
 * @returns {Array<{code: string, name: string}>} alphabetisch sortiert
 */
export function getSelectableCountries() {
  return Object.entries(COUNTRIES)
    .map(([code, data]) => ({ code, name: data.name }))
    .sort((a, b) => a.name.localeCompare(b.name, "de"));
}

// --- Beispiel-Verwendung ---
// import { getShippingPrice, getSelectableCountries } from "./shippingRates.js";
//
// getShippingPrice("A4", "DE");  // -> 12.62
// getShippingPrice("A3", "FR");  // -> 16.54
// getShippingPrice("A4", "CH");  // -> wirft Error (nicht unterstützt)
//
// getSelectableCountries();
// // -> [{ code: "AT", name: "Österreich" }, { code: "BE", name: "Belgien" }, ...]
