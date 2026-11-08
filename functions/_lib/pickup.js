// Abholung (Pickup) statt Versand – Termine beim Flohmarkt „Wild im West“.
//
// Wird im Warenkorb im selben Dropdown wie die Versandzonen angeboten
// (siehe scripts/cart.js). Bei Abholung gibt es keine Versandkosten und
// keine Lieferadresse; bezahlt wird vorab im Stripe Checkout.
//
// ZUM ANPASSEN: pro Termin Adresse + Uhrzeit. Solange `address` leer ist,
// lehnt der Server die Abholung ab (damit niemand ohne Ort/Zeit bestellt).
// `until` = Zeitpunkt, ab dem der Termin nicht mehr bestellbar
// ist (z.B. Vorabend), ISO-Format mit Zeitzone.

const ADDRESS = 'Heiligenstädter Lände 31 / Gunoldstraße 12+14, 1190 Wien';

export const PICKUP_OPTIONS = {
  PICKUP_1129: {
    date: { de: '29.11.2026', en: '29 Nov 2026' },
    time: { de: '12–18 Uhr', en: '12 noon – 6 pm' },
    address: ADDRESS,
    until: '2026-11-28T23:59:00+01:00'
  },
  PICKUP_1213: {
    date: { de: '13.12.2026', en: '13 Dec 2026' },
    time: { de: '16–22 Uhr', en: '4 – 10 pm' },
    address: ADDRESS,
    until: '2026-12-12T23:59:00+01:00'
  }
};

export const PICKUP_NAME = {
  de: 'Flohmarkt „Wild im West“',
  en: '“Wild im West” flea market'
};

export function isPickupZone(zone) {
  return Object.prototype.hasOwnProperty.call(PICKUP_OPTIONS, zone);
}

// null = bestellbar, sonst Fehlertext (de).
export function pickupUnavailableReason(zone) {
  var p = PICKUP_OPTIONS[zone];
  if (!p || !p.address) return 'Diese Abholung ist noch nicht verfügbar.';
  if (Date.now() > Date.parse(p.until)) return 'Für diesen Abholtermin kann nicht mehr bestellt werden.';
  return null;
}

// Mehrzeiliger Text für Stripe (Hinweis über dem Bezahlen-Button, Rechnung).
export function pickupText(zone, lang) {
  var p = PICKUP_OPTIONS[zone];
  var l = lang === 'en' ? 'en' : 'de';
  var head = l === 'en'
    ? 'Pickup at the ' + PICKUP_NAME.en + ', ' + p.date.en
    : 'Abholung beim ' + PICKUP_NAME.de + ', ' + p.date.de;
  return head + ' · ' + p.time[l] + ' · ' + p.address;
}
