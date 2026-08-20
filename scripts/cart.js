(function () {
  // Kill switch: flip to false to instantly hide the cart icon/drawer
  // everywhere and show "Bald verfügbar" instead of a working buy button
  // (matching functions/api/create-checkout-session.js's own kill switch).
  window.SHOP_ENABLED = true;

  var STORAGE_KEY = 'ea_cart';
  // The site is served from GitHub Pages (anselmi.at); only this one
  // endpoint runs on Cloudflare Pages, since GitHub Pages can't run server
  // code. That makes this a cross-origin request — see the matching CORS
  // headers in functions/api/create-checkout-session.js.
  var CHECKOUT_ENDPOINT = 'https://atelier-anselmi.pages.dev/api/create-checkout-session';

  function readCart() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function itemKey(item) {
    return item.id + '::' + item.size;
  }

  function formatPrice(n) {
    return Number.isInteger(n) ? ('€ ' + n + ',–') : ('€ ' + n.toFixed(2).replace('.', ','));
  }

  function count(items) {
    return (items || readCart()).reduce(function (sum, i) { return sum + i.qty; }, 0);
  }

  function total(items) {
    return (items || readCart()).reduce(function (sum, i) { return sum + i.qty * i.price; }, 0);
  }

  function writeCart(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    renderBadge(items);
    renderDrawer(items);
    document.dispatchEvent(new CustomEvent('cartchange', { detail: { items: items } }));
  }

  function add(item) {
    var items = readCart();
    var key = itemKey(item);
    var existing = items.filter(function (i) { return itemKey(i) === key; })[0];
    if (existing) {
      existing.qty += item.qty || 1;
    } else {
      items.push({
        id: item.id,
        name: item.name,
        size: item.size,
        price: item.price,
        image: item.image,
        qty: item.qty || 1,
        preorder: !!item.preorder
      });
    }
    writeCart(items);
    open();
  }

  function updateQty(key, delta) {
    var items = readCart();
    var item = items.filter(function (i) { return itemKey(i) === key; })[0];
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      items = items.filter(function (i) { return itemKey(i) !== key; });
    }
    writeCart(items);
  }

  function removeItem(key) {
    writeCart(readCart().filter(function (i) { return itemKey(i) !== key; }));
  }

  function clear() {
    writeCart([]);
  }

  // ---------- DOM ----------

  var toggleEl, badgeEl, drawerEl, overlayEl, itemsEl, totalEl, checkoutBtn, emptyEl, errorEl;

  function t(key, fallback) {
    if (window.i18n && window.i18n.t) {
      var val = window.i18n.t(key);
      if (val) return val;
    }
    return fallback;
  }

  function buildToggle() {
    var header = document.querySelector('header');
    if (!header) return;
    toggleEl = document.createElement('button');
    toggleEl.type = 'button';
    toggleEl.className = 'cart-toggle';
    toggleEl.setAttribute('aria-label', t('cart.oeffnen', 'Warenkorb öffnen'));
    toggleEl.innerHTML =
      '<svg viewBox="0 0 24 24" class="cart-icon" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">' +
        '<path d="M6.5 8h11l-1.1 11.2a1.8 1.8 0 0 1-1.8 1.6H9.4a1.8 1.8 0 0 1-1.8-1.6L6.5 8z" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<path d="M9 8V6a3 3 0 0 1 6 0v2" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>' +
      '<span class="cart-count">0</span>';
    toggleEl.addEventListener('click', toggle);
    header.appendChild(toggleEl);
    badgeEl = toggleEl.querySelector('.cart-count');
  }

  function buildDrawer() {
    overlayEl = document.createElement('div');
    overlayEl.className = 'cart-overlay';
    overlayEl.addEventListener('click', close);

    drawerEl = document.createElement('aside');
    drawerEl.className = 'cart-drawer';
    drawerEl.setAttribute('aria-hidden', 'true');
    drawerEl.inert = true;
    drawerEl.innerHTML =
      '<div class="cart-drawer-header">' +
        '<h2></h2>' +
        '<button type="button" class="cart-close">&times;</button>' +
      '</div>' +
      '<div class="cart-items"></div>' +
      '<p class="cart-empty"></p>' +
      '<div class="cart-footer">' +
        '<div class="cart-total-row"><span class="cart-total-label"></span><span class="cart-total-value">€ 0,–</span></div>' +
        '<p class="cart-shipping-note"></p>' +
        '<p class="cart-preorder-note"></p>' +
        '<button type="button" class="cart-checkout-btn produkt-kaufen-btn"></button>' +
        '<p class="cart-error"></p>' +
      '</div>';

    document.body.appendChild(overlayEl);
    document.body.appendChild(drawerEl);

    itemsEl = drawerEl.querySelector('.cart-items');
    emptyEl = drawerEl.querySelector('.cart-empty');
    totalEl = drawerEl.querySelector('.cart-total-value');
    checkoutBtn = drawerEl.querySelector('.cart-checkout-btn');
    errorEl = drawerEl.querySelector('.cart-error');

    drawerEl.querySelector('.cart-close').addEventListener('click', close);
    checkoutBtn.addEventListener('click', checkout);

    updateTexts();
  }

  function updateTexts() {
    if (toggleEl) toggleEl.setAttribute('aria-label', t('cart.oeffnen', 'Warenkorb öffnen'));
    if (!drawerEl) return;
    drawerEl.querySelector('.cart-drawer-header h2').textContent = t('cart.titel', 'Warenkorb');
    drawerEl.querySelector('.cart-close').setAttribute('aria-label', t('cart.schliessen', 'Schließen'));
    emptyEl.textContent = t('cart.leer', 'Dein Warenkorb ist leer.');
    drawerEl.querySelector('.cart-total-label').textContent = t('cart.zwischensumme', 'Zwischensumme');
    drawerEl.querySelector('.cart-shipping-note').textContent = t('cart.versandhinweis', 'zzgl. Versand');
    if (!checkoutBtn.disabled) {
      checkoutBtn.textContent = t('cart.zurKasse', 'Zur Kasse');
    }
    renderDrawer();
  }

  function renderBadge(items) {
    if (!badgeEl) return;
    var c = count(items);
    badgeEl.textContent = c;
    badgeEl.classList.toggle('visible', c > 0);
  }

  function renderDrawer(items) {
    if (!itemsEl) return;
    items = items || readCart();
    itemsEl.innerHTML = '';
    emptyEl.style.display = items.length ? 'none' : 'block';
    checkoutBtn.style.display = items.length ? '' : 'none';
    drawerEl.querySelector('.cart-total-row').style.display = items.length ? '' : 'none';
    drawerEl.querySelector('.cart-shipping-note').style.display = items.length ? '' : 'none';

    var preorderNoteEl = drawerEl.querySelector('.cart-preorder-note');
    var hasPreorder = items.some(function (i) { return i.preorder; });
    var hasInStock = items.some(function (i) { return !i.preorder; });
    if (hasPreorder && hasInStock) {
      preorderNoteEl.textContent = t('cart.vorbestellHinweis', 'Enthält eine Vorbestellung – die gesamte Bestellung wird gemeinsam zum Liefertermin der Vorbestellung (Ende August) verschickt.');
      preorderNoteEl.style.display = 'block';
    } else {
      preorderNoteEl.style.display = 'none';
    }

    items.forEach(function (item) {
      var key = itemKey(item);
      var row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML =
        '<img src="' + item.image + '" alt="" class="cart-item-img">' +
        '<div class="cart-item-info">' +
          '<p class="cart-item-name">' + item.name + '</p>' +
          '<p class="cart-item-size">' + item.size + '</p>' +
          '<div class="cart-item-qty">' +
            '<button type="button" class="cart-qty-btn" data-action="dec" aria-label="-">&minus;</button>' +
            '<span>' + item.qty + '</span>' +
            '<button type="button" class="cart-qty-btn" data-action="inc" aria-label="+">+</button>' +
          '</div>' +
        '</div>' +
        '<div class="cart-item-right">' +
          '<p class="cart-item-price">' + formatPrice(item.price * item.qty) + '</p>' +
          '<button type="button" class="cart-item-remove" aria-label="' + t('cart.entfernen', 'Entfernen') + '">&times;</button>' +
        '</div>';

      row.querySelector('[data-action="dec"]').addEventListener('click', function () { updateQty(key, -1); });
      row.querySelector('[data-action="inc"]').addEventListener('click', function () { updateQty(key, 1); });
      row.querySelector('.cart-item-remove').addEventListener('click', function () { removeItem(key); });

      itemsEl.appendChild(row);
    });

    totalEl.textContent = formatPrice(total(items));
  }

  function open() {
    if (!drawerEl) return;
    drawerEl.classList.add('open');
    overlayEl.classList.add('open');
    drawerEl.setAttribute('aria-hidden', 'false');
    drawerEl.inert = false;
  }

  function close() {
    if (!drawerEl) return;
    drawerEl.classList.remove('open');
    overlayEl.classList.remove('open');
    drawerEl.setAttribute('aria-hidden', 'true');
    drawerEl.inert = true;
  }

  function toggle() {
    if (drawerEl && drawerEl.classList.contains('open')) close(); else open();
  }

  function checkout() {
    var items = readCart();
    if (!items.length) return;
    errorEl.textContent = '';
    checkoutBtn.disabled = true;
    var originalText = checkoutBtn.textContent;
    checkoutBtn.textContent = t('cart.wirdGeladen', 'Einen Moment …');

    fetch(CHECKOUT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: items.map(function (i) { return { id: i.id, size: i.size, qty: i.qty }; }),
        lang: window.i18n ? window.i18n.getLang() : 'de'
      })
    })
      .then(function (res) {
        if (!res.ok) throw new Error('checkout-failed');
        return res.json();
      })
      .then(function (data) {
        if (!data.url) throw new Error('checkout-failed');
        window.location.href = data.url;
      })
      .catch(function () {
        errorEl.textContent = t('cart.fehler', 'Der Checkout konnte nicht gestartet werden. Bitte versuche es erneut oder schreib mir eine E-Mail.');
        checkoutBtn.disabled = false;
        checkoutBtn.textContent = originalText;
      });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });

  document.addEventListener('langchange', function () {
    updateTexts();
    if (!window.SHOP_ENABLED) updateComingSoonLabels();
  });

  // While the shop is disabled, any grid that actually lists real products
  // (has links in it — the empty "Shop Originals" placeholder doesn't) gets
  // swapped for the same "coming soon" placeholder used elsewhere on the site.
  function updateComingSoonLabels() {
    var label = t('produkt.baldVerfuegbar', 'Bald verfügbar');
    document.querySelectorAll('[data-shop-placeholder]').forEach(function (el) {
      el.textContent = label;
    });
  }

  function hideProductGrids() {
    document.querySelectorAll('.shop-prints-grid').forEach(function (grid) {
      if (!grid.querySelector('a')) return;
      var placeholder = document.createElement('div');
      placeholder.className = 'coming-soon';
      placeholder.setAttribute('data-shop-placeholder', '');
      grid.replaceWith(placeholder);
    });
    // "Shop Now" / "Kunst kaufen" CTAs on the homepage banner — same idea,
    // shouldn't invite a purchase that isn't possible yet.
    document.querySelectorAll('[data-i18n="home.prints.banner.cta"], [data-i18n="home.prints.cta"]').forEach(function (el) {
      el.removeAttribute('data-i18n');
      el.setAttribute('data-shop-placeholder', '');
    });
    updateComingSoonLabels();
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!window.SHOP_ENABLED) {
      hideProductGrids();
      return;
    }
    buildToggle();
    buildDrawer();
    renderBadge();
    renderDrawer();
  });

  window.cart = {
    add: add,
    updateQty: updateQty,
    remove: removeItem,
    clear: clear,
    open: open,
    close: close,
    count: count,
    total: total
  };
})();
