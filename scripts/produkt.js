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

  // Size selector: updates price + Größe detail row
  var sizeBtns = document.querySelectorAll('.produkt-groesse-btn');
  var priceEl = document.querySelector('.produkt-preis');
  var groesseEl = document.querySelector('[data-detail="groesse"]');

  sizeBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      sizeBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      if (priceEl) priceEl.textContent = '€ ' + btn.dataset.price + ',–';
      if (groesseEl) groesseEl.textContent = btn.dataset.cm;
    });
  });

});
