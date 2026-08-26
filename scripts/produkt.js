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
  var galleryMain = document.querySelector('.produkt-gallery-main');
  var thumbs = Array.prototype.slice.call(document.querySelectorAll('.produkt-thumb'));

  function activateThumb(thumb) {
    thumbs.forEach(function (t) { t.classList.remove('active'); });
    thumb.classList.add('active');
    mainImg.src = thumb.dataset.full;
    mainImg.alt = thumb.dataset.alt || mainImg.alt;
  }

  if (mainImg && thumbs.length > 1) {
    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () { activateThumb(thumb); });
    });

    // Swipe left/right on the main photo to step through the gallery —
    // mirrors the thumbnail strip, mainly for mobile where tapping the
    // (smaller) thumbnails is fiddlier than just swiping the photo itself.
    var galleryTouchStartX = null;
    galleryMain.addEventListener('touchstart', function (e) {
      galleryTouchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    galleryMain.addEventListener('touchend', function (e) {
      if (galleryTouchStartX === null) return;
      var dx = e.changedTouches[0].clientX - galleryTouchStartX;
      galleryTouchStartX = null;
      if (Math.abs(dx) < 50) return;
      var activeIndex = thumbs.findIndex(function (t) { return t.classList.contains('active'); });
      if (activeIndex === -1) activeIndex = 0;
      var nextIndex = ((activeIndex + (dx < 0 ? 1 : -1)) % thumbs.length + thumbs.length) % thumbs.length;
      activateThumb(thumbs[nextIndex]);
    }, { passive: true });
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
  } else if (sizeBtns.length === 0 && kaufenBtn && kaufenBtn.dataset.size) {
    // Size-less product (e.g. a one-of-a-kind original): no A4/A3 selector,
    // so size + price come straight off the buy button itself.
    currentSize = kaufenBtn.dataset.size;
    currentPrice = parseFloat(kaufenBtn.dataset.price);
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

    // Size-less product (e.g. a one-of-a-kind original): no A4/A3 buttons
    // to toggle, just the single Original pseudo-size deciding the button.
    if (sizeBtns.length === 0) {
      if (stockForProduct.Original === 0 && kaufenBtn) {
        kaufenBtn.disabled = true;
        kaufenBtn.textContent = t('produkt.ausverkauft', 'Ausverkauft');
      }
      return;
    }

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
