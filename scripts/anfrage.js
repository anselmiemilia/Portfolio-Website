// Commission inquiry form (homepage #kontakt). Posts to the public contact
// endpoint of the Atelier Admin dashboard, where the inquiry shows up on the
// "Anfragen" board. Nothing here touches the shop's checkout functions.
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('anfrageForm');
  if (!form) return;

  var ENDPOINT = 'https://atelier-admin.emilia-fcf.workers.dev/public/contact';
  var statusEl = document.getElementById('anfrageStatus');
  var btn = form.querySelector('button[type="submit"]');

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
