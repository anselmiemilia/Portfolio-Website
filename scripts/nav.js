document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('header nav');
  if (!toggle || !nav) return;

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
