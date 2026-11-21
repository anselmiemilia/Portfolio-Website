// Sorting for the Fine Art Prints grid on kunst.html:
//   "popular" – the newest print first, then by total units sold (data-rank)
//   "city"    – grouped by city, cities A–Z, most popular first inside a city
// data-rank is a snapshot of the sales numbers (fine art + classic prints,
// Nov 2026); update it in kunst.html when the ranking should change.
(function () {
  var grid = document.getElementById('fineart-grid');
  var sel = document.getElementById('fineartSort');
  if (!grid || !sel) return;

  var CITIES = {
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
    saomiguel: { de: 'São Miguel (Azoren)', en: 'São Miguel (Azores)' },
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

  function render() {
    Array.prototype.forEach.call(grid.querySelectorAll('.shop-city-heading'), function (h) { h.remove(); });
    var mode = sel.value;
    grid.classList.toggle('is-grouped', mode === 'city');
    try { localStorage.setItem('fineartSort', mode); } catch (e) {}

    if (mode === 'city') {
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
    if (saved === 'popular' || saved === 'city') sel.value = saved;
  } catch (e) {}

  sel.addEventListener('change', render);
  document.addEventListener('langchange', render);
  render();
})();
