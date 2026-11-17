// Private inquiry list (anfragen.html). The password is the ADMIN_TOKEN secret
// of the Cloudflare Pages project; it is only kept in this tab (sessionStorage).
(function () {
  var API = 'https://atelier-anselmi.pages.dev/api/inquiries';
  var loginForm = document.getElementById('loginForm');
  var tokenInput = document.getElementById('token');
  var msg = document.getElementById('msg');
  var list = document.getElementById('list');
  var token = '';

  try { token = sessionStorage.getItem('anfragenToken') || ''; } catch (e) {}

  function say(text) { msg.textContent = text; msg.hidden = !text; }

  function call(method, body) {
    return fetch(API, {
      method: method,
      headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined
    });
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function fmt(iso) {
    var d = new Date(iso);
    return isNaN(d) ? iso : d.toLocaleString('de-AT', { dateStyle: 'medium', timeStyle: 'short' });
  }

  function card(q) {
    var c = el('article', 'anfrage-card' + (q.status === 'done' ? ' is-done' : ''));
    var top = el('div', 'anfrage-card-top');
    top.appendChild(el('strong', null, q.name));
    top.appendChild(el('span', null, fmt(q.createdAt)));
    c.appendChild(top);

    var mail = el('a', 'contact-email-inline', q.email);
    mail.href = 'mailto:' + q.email + '?subject=' + encodeURIComponent('Deine Bild-Anfrage bei Atelier Anselmi');
    c.appendChild(mail);

    var meta = el('p', 'anfrage-card-meta',
      'Zeitraum: ' + (q.deadline || '–') + '  ·  Budget: ' + (q.budget || '–'));
    c.appendChild(meta);
    c.appendChild(el('p', 'anfrage-card-msg', q.message));

    var actions = el('div', 'anfrage-card-actions');
    var done = el('button', 'anfrage-mini', q.status === 'done' ? 'Wieder offen' : 'Erledigt');
    done.type = 'button';
    done.addEventListener('click', function () {
      act(q.id, q.status === 'done' ? 'open' : 'done');
    });
    var del = el('button', 'anfrage-mini', 'Löschen');
    del.type = 'button';
    del.addEventListener('click', function () {
      if (confirm('Diese Anfrage endgültig löschen?')) act(q.id, 'delete');
    });
    actions.appendChild(done);
    actions.appendChild(del);
    c.appendChild(actions);
    return c;
  }

  function render(items) {
    list.textContent = '';
    if (!items.length) {
      list.appendChild(el('p', 'anfragen-msg', 'Noch keine Anfragen auf der Warteliste.'));
    } else {
      var open = items.filter(function (i) { return i.status !== 'done'; }).length;
      list.appendChild(el('p', 'anfragen-count', open + ' offen · ' + items.length + ' insgesamt'));
      items.forEach(function (q) { list.appendChild(card(q)); });
    }
    list.hidden = false;
  }

  function load() {
    say('Lade …');
    call('GET').then(function (res) {
      if (res.status === 401 || res.status === 503) {
        try { sessionStorage.removeItem('anfragenToken'); } catch (e) {}
        loginForm.hidden = false;
        say(res.status === 503
          ? 'Der Zugang ist noch nicht eingerichtet (Secret ADMIN_TOKEN fehlt bei Cloudflare).'
          : 'Falsches Passwort.');
        return null;
      }
      if (!res.ok) throw new Error('http ' + res.status);
      return res.json();
    }).then(function (data) {
      if (!data) return;
      loginForm.hidden = true;
      say('');
      render(data.inquiries || []);
    }).catch(function () { say('Das hat nicht geklappt. Bitte lade die Seite neu.'); });
  }

  function act(id, action) {
    call('POST', { id: id, action: action }).then(function (res) {
      if (!res.ok) throw new Error('http ' + res.status);
      load();
    }).catch(function () { say('Aktion fehlgeschlagen.'); });
  }

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    token = tokenInput.value;
    try { sessionStorage.setItem('anfragenToken', token); } catch (err) {}
    tokenInput.value = '';
    load();
  });

  if (token) { loginForm.hidden = true; load(); }
})();
