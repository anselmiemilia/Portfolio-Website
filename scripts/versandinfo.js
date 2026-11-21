// Christmas shipping notice: a slim bar at the bottom of every page and a
// per-country line in the cart drawer. Always shown in English AND German,
// one below the other, regardless of the language switch.
//
// To change dates or wording, edit CONFIG below — nothing else needs touching.
// Every cut-off is "end of that day, Vienna time" (+01:00 in December).
// A country drops out of the bar once its date has passed; the whole bar
// disappears after HIDE_AFTER.
(function () {
  var CONFIG = {
    hideAfter: '2026-12-24T00:00:00+01:00',
    storageKey: 'ea_xmas_ship_v1',
    zones: {
      AT:       { until: '2026-12-13T23:59:59+01:00', en: 'Austria',     de: 'Österreich',  enDay: '13 Dec', deDay: '13.12.' },
      DE:       { until: '2026-12-06T23:59:59+01:00', en: 'Germany',     de: 'Deutschland', enDay: '6 Dec',  deDay: '6.12.' },
      EU_OTHER: { until: '2026-12-02T23:59:59+01:00', en: 'rest of EU',  de: 'übrige EU',   enDay: '2 Dec',  deDay: '2.12.' }
    },
    // Bar order: latest deadline first.
    barOrder: ['AT', 'DE', 'EU_OTHER']
  };

  function ms(iso) { return Date.parse(iso); }
  function over() { return Date.now() >= ms(CONFIG.hideAfter); }
  function open(z) { return Date.now() <= ms(CONFIG.zones[z].until); }

  // ---- Bar text -----------------------------------------------------------
  function barLines() {
    var zones = CONFIG.barOrder.filter(open);
    if (!zones.length || over()) return null;
    // Non-breaking spaces inside each entry, so "rest of EU 6 Dec" always
    // moves to the next line as a whole instead of being split.
    function glue(s) { return s.replace(/ /g, ' '); }
    // Each language is two lines: a headline, and below it all countries in
    // one line ("Austria 13 Dec · Germany 11 Dec · rest of EU 6 Dec").
    function split(headline, key, dayKey) {
      var entries = zones.map(function (z) { return glue(CONFIG.zones[z][key] + ' ' + CONFIG.zones[z][dayKey]); });
      return { a: headline, b: entries.join(' · ') };
    }
    return {
      en: split('Order for Christmas by:', 'en', 'enDay'),
      de: split('Bestellschluss für Weihnachten:', 'de', 'deDay'),
      note: {
        en: 'No guarantee – the earlier, the better.',
        de: 'Ohne Gewähr – je früher, desto besser.'
      }
    };
  }

  // ---- Cart text (zone values as used by cart.js) --------------------------
  function cartNote(zone) {
    if (over()) return null;
    if (zone === 'GB') {
      return {
        en: 'UK: delivery before Christmas cannot be guaranteed (customs).',
        de: 'UK: Ankunft vor Weihnachten nicht garantiert (Zoll).'
      };
    }
    var z = CONFIG.zones[zone];
    if (!z) return null; // no zone chosen yet, or pickup
    if (open(zone)) {
      return {
        en: 'Order by ' + z.enDay + ' – should arrive before Christmas.',
        de: 'Bestellung bis ' + z.deDay + ' – kommt voraussichtlich vor Weihnachten an.'
      };
    }
    return {
      en: 'The Christmas order deadline for this country has passed – arrival before Christmas cannot be guaranteed.',
      de: 'Der Bestellschluss für Weihnachten ist für dieses Land vorbei – Ankunft vor Weihnachten nicht mehr garantiert.'
    };
  }

  window.AtelierXmas = { cartNote: cartNote };

  // ---- Styles ---------------------------------------------------------------
  var css =
    '.xmas-bar{position:fixed;left:0;right:0;bottom:0;z-index:90;' +
      'display:flex;align-items:center;justify-content:center;gap:.75rem;' +
      'padding:.6rem 2.6rem calc(.6rem + env(safe-area-inset-bottom)) 1rem;' +
      // Cream yellow of the Wild im West star (#fff9dc), burgundy text.
      'background:#fff9dc;color:var(--burgunder,#651122);border-top:1px solid rgba(101,17,34,.25);' +
      'font-family:var(--font-body,monospace);font-size:.72rem;line-height:1.45;text-align:center}' +
    '.xmas-bar p+p{margin-top:.2rem;opacity:.85}' +
    '.xmas-bar p span{display:block}' +
    '.xmas-bar p span+span{font-weight:700}' +
    '.xmas-bar p.xmas-bar-note{margin-top:.5rem;font-size:.9em;opacity:.8}' +
    '.xmas-bar p.xmas-bar-note span+span{font-weight:400;font-size:inherit}' +
    '.xmas-bar-close{position:absolute;top:50%;right:.6rem;transform:translateY(-50%);' +
      'background:none;border:0;color:inherit;font-size:1.3rem;line-height:1;padding:.4rem .6rem;cursor:pointer}' +
    '.xmas-bar-close:hover{color:var(--rosa,#d69ba5)}' +
    '.cart-xmas-note{font-size:.72rem;margin:-.5rem 0 1.25rem;white-space:pre-line}' +
    '@media (max-width:768px){.xmas-bar{font-size:.66rem;padding-left:.75rem}}' +
    // Phones: keep all countries of a language on one line.
    '@media (max-width:480px){.xmas-bar{padding-right:2rem}.xmas-bar p span+span{font-size:.58rem}}';

  function addStyle() {
    var s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  // ---- Bar ------------------------------------------------------------------
  function dismissed() {
    try { return localStorage.getItem(CONFIG.storageKey) === '1'; } catch (e) { return false; }
  }

  function buildBar() {
    var lines = barLines();
    if (!lines || dismissed()) return;
    var bar = document.createElement('div');
    bar.className = 'xmas-bar';
    bar.setAttribute('role', 'note');
    var text = document.createElement('div');
    var en = document.createElement('p');
    var de = document.createElement('p');
    en.lang = 'en';
    de.lang = 'de';
    [[en, lines.en], [de, lines.de]].forEach(function (pair) {
      var a = document.createElement('span');
      var b = document.createElement('span');
      a.textContent = pair[1].a;
      b.textContent = pair[1].b;
      pair[0].appendChild(a);
      pair[0].appendChild(b);
    });
    var note = document.createElement('p');
    note.className = 'xmas-bar-note';
    ['en', 'de'].forEach(function (l) {
      var s = document.createElement('span');
      s.lang = l;
      s.textContent = lines.note[l];
      note.appendChild(s);
    });
    text.appendChild(en);
    text.appendChild(de);
    text.appendChild(note);
    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'xmas-bar-close';
    close.setAttribute('aria-label', 'Close / Schließen');
    close.innerHTML = '&times;';
    close.addEventListener('click', function () {
      bar.remove();
      try { localStorage.setItem(CONFIG.storageKey, '1'); } catch (e) { /* private mode: just hide for now */ }
    });
    bar.appendChild(text);
    bar.appendChild(close);
    document.body.appendChild(bar);
  }

  addStyle();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildBar);
  else buildBar();
})();
