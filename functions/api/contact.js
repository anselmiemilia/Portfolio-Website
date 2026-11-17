// Cloudflare Pages Function: POST /api/contact
//
// "Commission a painting" form on the homepage. Validates the submission and
// forwards it as an email to the studio inbox via Resend
// (https://resend.com). The visitor's address is set as Reply-To, so
// answering the email goes straight back to them.
//
// Environment (Cloudflare Pages → Settings → Variables and Secrets):
//   RESEND_API_KEY  (secret, required)
//   CONTACT_TO      (optional, default atelier@anselmi.at)
//   CONTACT_FROM    (optional, default "Atelier Anselmi <anfrage@anselmi.at>";
//                    the domain must be verified in Resend)
//
// Every inquiry is also saved to the waitlist in STOCK_KV under the key
// "inquiry:<ISO time>-<random>" (JSON, auto-deleted after 365 days). Look at
// them in the Cloudflare dashboard: Workers & Pages → KV → the STOCK_KV
// namespace → key prefix "inquiry:". The form works with the waitlist alone;
// the email is the second copy. It only fails if BOTH saving and mailing fail.
// The email subject always starts with "[Commission Inquiry]" and carries an
// "X-Atelier-Form: commission" header, so a mail rule can file them in a folder.
// Abuse protection: a honeypot field plus at most MAX_PER_HOUR submissions
// per IP (counted in STOCK_KV under its own key prefix; fails open if KV
// is unavailable).

import { corsHeaders } from '../_lib/cors.js';

const MAX_PER_HOUR = 5;
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;

export function onRequestOptions({ request }) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

function json(body, status, request) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: Object.assign({ 'Content-Type': 'application/json' }, corsHeaders(request))
  });
}

// One line only: strips newlines so a field can never inject mail headers.
function oneLine(v, max) {
  return String(v == null ? '' : v).replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);
}

async function overRateLimit(env, request) {
  if (!env.STOCK_KV) return false;
  try {
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const key = 'contact-rl:' + ip + ':' + Math.floor(Date.now() / 3600000);
    const n = parseInt((await env.STOCK_KV.get(key)) || '0', 10);
    if (n >= MAX_PER_HOUR) return true;
    await env.STOCK_KV.put(key, String(n + 1), { expirationTtl: 7200 });
  } catch (e) {
    console.error('contact rate limit skipped:', e && e.message);
  }
  return false;
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: 'invalid' }, 400, request);
  }
  if (!body || typeof body !== 'object') return json({ error: 'invalid' }, 400, request);

  // Honeypot: real visitors never see or fill this field. Pretend success.
  if (body.website) return json({ ok: true }, 200, request);

  const name = oneLine(body.name, 100);
  const email = oneLine(body.email, 200);
  const message = String(body.message == null ? '' : body.message).trim().slice(0, 4000);
  const deadline = oneLine(body.deadline, 120);
  const budget = oneLine(body.budget, 120);

  if (!name || !EMAIL_RE.test(email) || message.length < 10 || body.consent !== true) {
    return json({ error: 'invalid' }, 400, request);
  }

  if (await overRateLimit(env, request)) {
    return json({ error: 'rate_limited' }, 429, request);
  }

  const text = [
    'Neue Anfrage für ein Auftragsbild (Warteliste)',
    '',
    'Name: ' + name,
    'E-Mail: ' + email,
    'Zeitraum / Deadline: ' + (deadline || '–'),
    'Budget: ' + (budget || '–'),
    '',
    'Nachricht:',
    message
  ].join('\n');

  // 1) Waitlist copy in KV.
  let saved = false;
  if (env.STOCK_KV) {
    try {
      const id = new Date().toISOString() + '-' + Math.random().toString(36).slice(2, 8);
      await env.STOCK_KV.put('inquiry:' + id, JSON.stringify({
        createdAt: new Date().toISOString(),
        status: 'waitlist',
        name: name,
        email: email,
        deadline: deadline,
        budget: budget,
        message: message
      }), { expirationTtl: 31536000 });
      saved = true;
    } catch (e) {
      console.error('waitlist save failed:', e && e.message);
    }
  }

  // 2) Email copy via Resend.
  let mailed = false;
  if (env.RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + env.RESEND_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: env.CONTACT_FROM || 'Atelier Anselmi <anfrage@anselmi.at>',
          to: [env.CONTACT_TO || 'atelier@anselmi.at'],
          reply_to: email,
          subject: '[Commission Inquiry] ' + name,
          headers: { 'X-Atelier-Form': 'commission' },
          text: text
        })
      });
      mailed = res.ok;
      if (!res.ok) console.error('Resend error', res.status, await res.text().catch(function () { return ''; }));
    } catch (e) {
      console.error('Resend request failed:', e && e.message);
    }
  }

  if (!saved && !mailed) {
    return json({ error: 'send_failed' }, 502, request);
  }
  return json({ ok: true }, 200, request);
}
