// Release countdown for a not-yet-available product ("Im Pinken Wien").
//
// Any element with data-launch-at="<ISO date with offset>" takes part:
//   data-launch-before   → visible only until the release, hidden after
//   data-launch-after    → hidden until the release, visible after
//   .launch-countdown    → its [data-u="d|h|m|s"] children get the time left
// The element also gets the class "is-live" once the release has passed.
//
// This is presentation only (a visitor can change their own clock) — the
// authoritative gate is `availableFrom` in functions/_lib/catalog.js, which
// create-checkout-session.js enforces server-side.
(function () {
  var els = Array.prototype.slice.call(document.querySelectorAll('[data-launch-at]'));
  if (!els.length) return;

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function render(el, left) {
    var s = Math.floor(left / 1000);
    var parts = {
      d: Math.floor(s / 86400),
      h: Math.floor((s % 86400) / 3600),
      m: Math.floor((s % 3600) / 60),
      s: s % 60
    };
    Object.keys(parts).forEach(function (k) {
      var node = el.querySelector('[data-u="' + k + '"]');
      if (node) node.textContent = pad(parts[k]);
    });
  }

  function tick() {
    var now = Date.now();
    var pending = false;
    els.forEach(function (el) {
      var at = Date.parse(el.getAttribute('data-launch-at'));
      if (isNaN(at)) return;
      var left = at - now;
      var live = left <= 0;
      el.classList.toggle('is-live', live);
      if (el.hasAttribute('data-launch-before')) el.hidden = live;
      if (el.hasAttribute('data-launch-after')) el.hidden = !live;
      if (!live) {
        pending = true;
        el.querySelectorAll('.launch-countdown').forEach(function (c) { render(c, left); });
        if (el.classList.contains('launch-countdown')) render(el, left);
      }
    });
    if (pending) setTimeout(tick, 1000);
  }

  tick();
})();
