document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('header nav');
  if (!toggle || !nav) return;

  // Clone the language switch into the header itself, right next to the
  // burger button (see .lang-toggle-mobile in main.css, shown only below
  // the mobile breakpoint) — people often didn't notice DE/EN buried
  // inside the collapsed nav. cloneNode doesn't carry over event listeners
  // or i18n.js's initial "active" pass, so both are redone here.
  var header = document.querySelector('header');
  var langToggle = nav.querySelector('.lang-toggle');
  if (header && langToggle) {
    var mobileLangToggle = langToggle.cloneNode(true);
    mobileLangToggle.classList.add('lang-toggle-mobile');
    mobileLangToggle.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (window.i18n) window.i18n.setLang(btn.dataset.lang);
      });
    });
    header.insertBefore(mobileLangToggle, toggle);
    if (window.i18n) window.i18n.setLang(window.i18n.getLang());
  }

  function closeMenu() {
    nav.classList.remove('nav-open');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('nav-open');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function (e) {
    if (!nav.classList.contains('nav-open')) return;
    if (nav.contains(e.target) || toggle.contains(e.target)) return;
    closeMenu();
  });
});
