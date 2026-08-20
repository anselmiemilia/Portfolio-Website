document.addEventListener('DOMContentLoaded', function () {

  var STOCK_ENDPOINT = 'https://atelier-anselmi.pages.dev/api/stock';

  function t(key, fallback) {
    if (window.i18n && window.i18n.t) {
      var val = window.i18n.t(key);
      if (val) return val;
    }
    return fallback;
  }

  // Gallery thumbnails
  var mainImg = document.querySelector('.produkt-gallery-main img');
  var thumbs = document.querySelectorAll('.produkt-thumb');
  if (mainImg && thumbs.length > 1) {
    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        thumbs.forEach(function (t) { t.classList.remove('active'); });
        thumb.classList.add('active');
        mainImg.src = thumb.dataset.full;
        mainImg.alt = thumb.dataset.alt || mainImg.alt;
      });
    });
  }

  // Size selector: updates price + Größe/Auflage detail rows
  var sizeBtns = document.querySelectorAll('.produkt-groesse-btn');
  var priceEl = document.querySelector('.produkt-preis');
  var groesseEl = document.querySelector('[data-detail="groesse"]');
  var auflageEl = document.querySelector('[data-detail="auflage"]');
  var kaufenBtn = document.querySelector('.produkt-kaufen-btn');
  var produktName = document.querySelector('.produkt-info h1') ? document.querySelector('.produkt-info h1').textContent : '';
  var produktId = location.pathname.split('/').pop().replace('.html', '');

  var currentSize = '';
  var currentPrice = 0;

  function updateAuflage(size) {
    if (!auflageEl || !window.i18n) return;
    var key = size === 'A3' ? 'produkt.auflage.a3' : 'produkt.auflage.a4';
    auflageEl.setAttribute('data-i18n-html', key);
    auflageEl.innerHTML = window.i18n.t(key);
  }

  function selectSize(btn) {
    sizeBtns.forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    if (priceEl) priceEl.textContent = '€ ' + btn.dataset.price + ',–';
    if (groesseEl) groesseEl.textContent = btn.dataset.cm;
    updateAuflage(btn.dataset.size);
    currentSize = btn.dataset.size;
    currentPrice = parseFloat(btn.dataset.price);
  }

  sizeBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.disabled) return;
      selectSize(btn);
    });
  });

  var activeSizeBtn = document.querySelector('.produkt-groesse-btn.active');
  if (activeSizeBtn) {
    updateAuflage(activeSizeBtn.dataset.size);
    currentSize = activeSizeBtn.dataset.size;
    currentPrice = parseFloat(activeSizeBtn.dataset.price);
  }

  if (kaufenBtn && !window.SHOP_ENABLED) {
    kaufenBtn.disabled = true;
    kaufenBtn.textContent = t('produkt.baldVerfuegbar', 'Bald verfügbar');
  } else if (kaufenBtn) {
    kaufenBtn.addEventListener('click', function () {
      if (!window.cart || !currentSize || kaufenBtn.disabled) return;
      window.cart.add({
        id: produktId,
        name: produktName,
        size: currentSize,
        price: currentPrice,
        image: mainImg ? mainImg.src : '',
        qty: 1,
        preorder: kaufenBtn.dataset.preorder === 'true'
      });
    });
  }

  // Sold-out handling: this is a UX convenience only — the authoritative
  // check happens again server-side right before a Stripe session is
  // created, so a stale/failed fetch here can't oversell anything.
  function applyStock(stockForProduct) {
    if (!stockForProduct) return;
    var firstAvailableBtn = null;

    sizeBtns.forEach(function (btn) {
      var remaining = stockForProduct[btn.dataset.size];
      if (remaining === 0) {
        btn.disabled = true;
        btn.classList.add('produkt-groesse-btn--ausverkauft');
        btn.textContent = btn.dataset.size + ' – ' + t('produkt.ausverkauft', 'Ausverkauft');
      } else if (!firstAvailableBtn) {
        firstAvailableBtn = btn;
      }
    });

    var activeBtn = document.querySelector('.produkt-groesse-btn.active');
    if (activeBtn && activeBtn.disabled && firstAvailableBtn) {
      selectSize(firstAvailableBtn);
    }

    if (!firstAvailableBtn && kaufenBtn) {
      kaufenBtn.disabled = true;
      kaufenBtn.textContent = t('produkt.ausverkauft', 'Ausverkauft');
    }
  }

  if (produktId && window.SHOP_ENABLED) {
    fetch(STOCK_ENDPOINT)
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (stock) { if (stock) applyStock(stock[produktId]); })
      .catch(function () { /* stock badge just won't show; checkout still enforces it */ });
  }

  // Collapsible sections (e.g. "Info"): collapsed by default, toggled on click.
  document.querySelectorAll('.produkt-section-toggle').forEach(function (toggle) {
    var body = toggle.nextElementSibling;
    if (!body) return;
    function setOpen(open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) body.removeAttribute('hidden'); else body.setAttribute('hidden', '');
    }
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    toggle.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle.click();
      }
    });
  });

});
