// Commission inquiry form (homepage #kontakt). Posts to the public contact
// endpoint of the Atelier Admin dashboard, where the inquiry shows up on the
// "Anfragen" board. Nothing here touches the shop's checkout functions.
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('anfrageForm');
  if (!form) return;

  var ENDPOINT = 'https://atelier-admin.emilia-fcf.workers.dev/public/contact';
  var statusEl = document.getElementById('anfrageStatus');
  var btn = form.querySelector('button[type="submit"]');
  var dialog = document.getElementById('anfrageDialog');
  var opener = document.getElementById('anfrageOpen');
  var root = document.documentElement;
  var canModal = !!(dialog && typeof dialog.showModal === 'function');

  function openDialog() {
    if (!canModal) {
      // Fallback for browsers without <dialog>: show the form inline.
      dialog.setAttribute('open', '');
      dialog.classList.add('is-inline');
      opener.hidden = true;
      form.elements.name.focus();
      return;
    }
    if (dialog.open) return;
    if (form.classList.contains('is-sent')) {
      form.classList.remove('is-sent');
      statusEl.hidden = true;
    }
    // Lock page scroll without the content jumping sideways.
    var gap = window.innerWidth - root.clientWidth;
    if (gap > 0) document.body.style.paddingRight = gap + 'px';
    root.classList.add('anfrage-offen');
    dialog.showModal();
    var main = dialog.querySelector('.anfrage-dialog-main');
    if (main) main.scrollTop = 0;
    form.elements.name.focus();
  }

  function closeDialog() {
    if (canModal && dialog.open) dialog.close();
  }

  if (dialog && opener) {
    opener.addEventListener('click', openDialog);
    dialog.querySelectorAll('[data-anfrage-close]').forEach(function (b) {
      b.addEventListener('click', closeDialog);
    });
    // Backdrop click closes; ignore drags that merely end outside the panel.
    var downOnBackdrop = false;
    dialog.addEventListener('mousedown', function (e) { downOnBackdrop = e.target === dialog; });
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog && downOnBackdrop) closeDialog();
      downOnBackdrop = false;
    });
    dialog.addEventListener('close', function () {
      root.classList.remove('anfrage-offen');
      document.body.style.paddingRight = '';
      opener.focus();
    });
    // Local preview only: index.html#anfrage-open opens the dialog on load.
    if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname) && location.hash === '#anfrage-open') openDialog();
  }

  function t(key, fallback) {
    if (window.i18n && window.i18n.t) {
      var v = window.i18n.t(key);
      if (v && v !== key) return v;
    }
    return fallback;
  }

  function show(key, fallback, isError) {
    statusEl.textContent = t(key, fallback);
    statusEl.setAttribute('data-i18n', key);
    statusEl.className = 'anfrage-status ' + (isError ? 'is-error' : 'is-ok');
    statusEl.hidden = false;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (btn.disabled) return;
    if (!form.checkValidity()) { form.reportValidity(); return; }

    var data = new FormData(form);
    var payload = {
      name: data.get('name'),
      email: data.get('email'),
      message: data.get('message'),
      timeframe: data.get('deadline'),
      budget: data.get('budget'),
      language: window.i18n && window.i18n.getLang && window.i18n.getLang() === 'en' ? 'en' : 'de',
      website: data.get('website'),
      consent: form.elements.consent.checked
    };

    btn.disabled = true;
    statusEl.hidden = true;

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (res) { return res.json().catch(function () { return {}; }).then(function (b) { return { ok: res.ok, status: res.status, body: b }; }); })
      .then(function (r) {
        if (r.ok) {
          form.reset();
          show('anfrage.ok', 'Danke dir! Deine Anfrage steht jetzt auf meiner Warteliste, ich melde mich bei dir.', false);
          form.classList.add('is-sent');
          statusEl.focus();
        } else if (r.status === 429) {
          show('anfrage.zuOft', 'Das waren gerade ein paar Anfragen auf einmal. Bitte versuch es später nochmal.', true);
        } else {
          show('anfrage.fehler', 'Das hat leider nicht geklappt. Schreib mir bitte direkt an atelier@anselmi.at.', true);
        }
      })
      .catch(function () {
        show('anfrage.fehler', 'Das hat leider nicht geklappt. Schreib mir bitte direkt an atelier@anselmi.at.', true);
      })
      .then(function () { btn.disabled = false; });
  });
});
