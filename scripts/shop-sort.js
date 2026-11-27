// Sorting for the Fine Art Prints grid on kunst.html:
//   "popular" – the newest print first, then by total units sold (data-rank)
//   "city"    – grouped by city, cities A–Z, most popular first inside a city
//   "city:<key>" – only the prints of one city (listed below the two sort modes)
// data-rank is a snapshot of the sales numbers (fine art + classic prints,
// Nov 2026); update it in kunst.html when the ranking should change.
(function () {
  var grid = document.getElementById('fineart-grid');
  var sel = document.getElementById('fineartSort');
  if (!grid || !sel) return;

  var CITIES = {
    amsterdam: { de: 'Amsterdam', en: 'Amsterdam' },
    barcelona: { de: 'Barcelona', en: 'Barcelona' },
    dornbirn: { de: 'Dornbirn', en: 'Dornbirn' },
    feldkirch: { de: 'Feldkirch', en: 'Feldkirch' },
    florenz: { de: 'Florenz', en: 'Florence' },
    kopenhagen: { de: 'Kopenhagen', en: 'Copenhagen' },
    lissabon: { de: 'Lissabon', en: 'Lisbon' },
    london: { de: 'London', en: 'London' },
    marrakesch: { de: 'Marrakesch', en: 'Marrakech' },
    newyork: { de: 'New York', en: 'New York' },
    paris: { de: 'Paris', en: 'Paris' },
    portofino: { de: 'Portofino', en: 'Portofino' },
    rom: { de: 'Rom', en: 'Rome' },
    venedig: { de: 'Venedig', en: 'Venice' },
    wien: { de: 'Wien', en: 'Vienna' }
  };

  var cards = Array.prototype.slice.call(grid.querySelectorAll('.shop-prints-card'));
  cards.forEach(function (c, i) { c._pos = i; });

  function lang() {
    return window.i18n && window.i18n.getLang ? window.i18n.getLang() : 'de';
  }
  function rank(c) { return parseInt(c.getAttribute('data-rank'), 10) || 0; }
  function isNew(c) { return !!c.querySelector('.new-badge'); }
  function byPopularity(a, b) {
    return (isNew(b) - isNew(a)) || (rank(b) - rank(a)) || (a._pos - b._pos);
  }
  function cityName(key) { return (CITIES[key] && CITIES[key][lang()]) || key; }

  var TXT = {
    de: { group: 'Nur eine Stadt zeigen' },
    en: { group: 'Show one city only' }
  };

  // The two sort modes are in the HTML; the cities are added here, A–Z in the
  // current language, and rebuilt when the language changes.
  function buildCityOptions() {
    var current = sel.value;
    var old = sel.querySelector('optgroup');
    if (old) old.remove();
    var keys = {};
    cards.forEach(function (c) { keys[c.getAttribute('data-city') || ''] = true; });
    var group = document.createElement('optgroup');
    group.label = TXT[lang()] ? TXT[lang()].group : TXT.de.group;
    Object.keys(keys)
      .sort(function (a, b) { return cityName(a).localeCompare(cityName(b), lang()); })
      .forEach(function (k) {
        var o = document.createElement('option');
        o.value = 'city:' + k;
        o.textContent = cityName(k);
        group.appendChild(o);
      });
    sel.appendChild(group);
    if (Array.prototype.some.call(sel.options, function (o) { return o.value === current; })) sel.value = current;
  }

  function clearHeadings() {
    Array.prototype.forEach.call(grid.querySelectorAll('.shop-city-heading'), function (h) { h.remove(); });
  }

  function render() {
    clearHeadings();
    var mode = sel.value;
    try { localStorage.setItem('fineartSort', mode); } catch (e) {}
    var one = mode.indexOf('city:') === 0 ? mode.slice(5) : null;

    grid.classList.toggle('is-grouped', mode === 'city' || !!one);
    cards.forEach(function (c) { c.hidden = !!one && c.getAttribute('data-city') !== one; });

    if (one) {
      var h1 = document.createElement('h3');
      h1.className = 'shop-city-heading';
      h1.textContent = cityName(one);
      grid.appendChild(h1);
      cards.filter(function (c) { return !c.hidden; }).sort(byPopularity).forEach(function (c) { grid.appendChild(c); });
    } else if (mode === 'city') {
      var groups = {};
      cards.forEach(function (c) {
        var k = c.getAttribute('data-city') || '';
        (groups[k] = groups[k] || []).push(c);
      });
      Object.keys(groups)
        .sort(function (a, b) { return cityName(a).localeCompare(cityName(b), lang()); })
        .forEach(function (k) {
          var h = document.createElement('h3');
          h.className = 'shop-city-heading';
          h.textContent = cityName(k);
          grid.appendChild(h);
          groups[k].sort(byPopularity).forEach(function (c) { grid.appendChild(c); });
        });
    } else {
      cards.slice().sort(byPopularity).forEach(function (c) { grid.appendChild(c); });
    }
  }

  try {
    var saved = localStorage.getItem('fineartSort');
    buildCityOptions();
    if (saved && Array.prototype.some.call(sel.options, function (o) { return o.value === saved; })) sel.value = saved;
  } catch (e) { buildCityOptions(); }

  sel.addEventListener('change', render);
  document.addEventListener('langchange', function () { buildCityOptions(); render(); });
  render();
})();
