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

  function updateKaufenLink(size, price) {
    if (!kaufenBtn) return;
    var subject = 'Bestellung: ' + produktName + ' (' + size + ')';
    var body = 'Ich möchte gerne folgenden Print bestellen:\n\n' +
      produktName + ' – ' + size + ' – € ' + price + ',–\n\nName:\nAdresse:';
    kaufenBtn.href = 'mailto:emilia@anselmi.at?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }

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
      updateKaufenLink(btn.textContent, btn.dataset.price);
    });
  });

  var activeSizeBtn = document.querySelector('.produkt-groesse-btn.active');
  if (activeSizeBtn) {
    updateAuflage(activeSizeBtn.textContent);
    updateKaufenLink(activeSizeBtn.textContent, activeSizeBtn.dataset.price);
  }

});
