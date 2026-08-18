document.addEventListener('DOMContentLoaded', function () {

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

  sizeBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      sizeBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      if (priceEl) priceEl.textContent = '€ ' + btn.dataset.price + ',–';
      if (groesseEl) groesseEl.textContent = btn.dataset.cm;
      updateAuflage(btn.textContent);
      currentSize = btn.textContent;
      currentPrice = parseFloat(btn.dataset.price);
    });
  });

  var activeSizeBtn = document.querySelector('.produkt-groesse-btn.active');
  if (activeSizeBtn) {
    updateAuflage(activeSizeBtn.textContent);
    currentSize = activeSizeBtn.textContent;
    currentPrice = parseFloat(activeSizeBtn.dataset.price);
  }

  if (kaufenBtn) {
    kaufenBtn.addEventListener('click', function () {
      if (!window.cart || !currentSize) return;
      window.cart.add({
        id: produktId,
        name: produktName,
        size: currentSize,
        price: currentPrice,
        image: mainImg ? mainImg.src : '',
        qty: 1
      });
    });
  }

});
