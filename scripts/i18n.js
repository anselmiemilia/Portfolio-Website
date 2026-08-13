(function () {
  var translations = {
    'nav.home': { de: 'Home', en: 'Home' },
    'nav.kunst': { de: 'Kunst', en: 'Art' },
    'nav.projekte': { de: 'Projekte', en: 'Projects' },
    'nav.about': { de: 'Über mich', en: 'About me' },
    'nav.kontakt': { de: 'Kontakt', en: 'Contact' },

    'footer.rights': { de: 'Alle Rechte vorbehalten.', en: 'All rights reserved.' },
    'footer.datenschutz': { de: 'Datenschutz', en: 'Privacy Policy' },

    'meta.title.kunst': { de: 'Kunst | Emilia Anselmi', en: 'Art | Emilia Anselmi' },
    'meta.desc.kunst': { de: 'Kunst – Emilia Anselmi', en: 'Art – Emilia Anselmi' },
    'meta.title.projekte': { de: 'Projekte | Emilia Anselmi', en: 'Projects | Emilia Anselmi' },
    'meta.desc.projekte': { de: 'Alle Projekte – Emilia Anselmi', en: 'All Projects – Emilia Anselmi' },
    'meta.title.about': { de: 'Über mich | Emilia Anselmi', en: 'About me | Emilia Anselmi' },
    'meta.desc.about': { de: 'Über Emilia Anselmi - Grafikdesignerin', en: 'About Emilia Anselmi - Graphic Designer' },
    'meta.title.datenschutz': { de: 'Datenschutz | Emilia Anselmi', en: 'Privacy Policy | Emilia Anselmi' },
    'meta.desc.datenschutz': { de: 'Datenschutzerklärung – Emilia Anselmi Portfolio', en: 'Privacy Policy – Emilia Anselmi Portfolio' },
    'meta.desc.home': { de: 'Portfolio von Emilia Anselmi - Grafikdesign Projekte', en: 'Portfolio of Emilia Anselmi - Graphic Design Projects' },

    'hero.subtitle': {
      de: 'Angehende Grafikdesignerin &amp; Künstlerin aus Vorarlberg,<br>studiere Grafik- &amp; Informationsdesign – zur Zeit in Wien.',
      en: 'Aspiring graphic designer &amp; artist from Vorarlberg, Austria,<br>studying Graphic &amp; Information Design – currently based in Vienna.'
    },

    'home.prints.cta': { de: 'Zu Kunst', en: 'To Art' },
    'home.projekte.title': { de: 'Projekte', en: 'Projects' },
    'home.projekte.cta': { de: 'Zu den Projekten', en: 'See all projects' },
    'home.about.title': { de: 'Über mich', en: 'About me' },
    'home.about.p1': {
      de: 'Ich heiße Emilia und bin Grafik- & Informationsdesign-Studentin im vierten Semester an der <em>New Design University</em> in St. Pölten.',
      en: 'My name is Emilia and I’m a Graphic &amp; Information Design student in my fourth semester at the <em>New Design University</em> in St. Pölten, Austria.'
    },
    'home.about.p2': {
      de: 'Kunst hat für mich – früher oft eher im Unterbewusstsein – schon immer eine wichtige Rolle gespielt. Als visueller Mensch ist Design für mich nicht einfach nur schön anzusehen.',
      en: 'Art has always played an important role for me – earlier often more subconsciously. As a visual person, design isn’t just something nice to look at to me.'
    },

    'kontakt.title': { de: 'Kontakt', en: 'Contact' },
    'kontakt.text': {
      de: 'Interesse an einer Zusammenarbeit?<br>Schreib mir gerne! :)',
      en: 'Interested in working together?<br>Feel free to write to me! :)'
    },

    'cookie.text': {
      de: 'Diese Website verwendet keine Tracking-Cookies. Technisch notwendige Cookies können durch den Hosting-Anbieter (GitHub Pages) gesetzt werden. <a href="datenschutz.html">Mehr erfahren</a>',
      en: 'This website does not use tracking cookies. Technically necessary cookies may be set by the hosting provider (GitHub Pages). <a href="datenschutz.html">Learn more</a>'
    },
    'cookie.accept': { de: 'Verstanden', en: 'Got it' },

    'ui.mehrLesen': { de: 'Mehr lesen', en: 'Read more' },
    'ui.wenigerLesen': { de: 'Weniger lesen', en: 'Read less' },
    'ui.beschreibungFolgt': { de: 'Beschreibung folgt ...', en: 'Description coming soon ...' },
    'ui.zurueckProjekte': { de: 'Zurück zu Projekte', en: 'Back to Projects' },
    'ui.zurueckKunst': { de: 'Zurück zu Kunst', en: 'Back to Art' },

    'about.p1': {
      de: 'Ich heiße Emilia und bin Grafik- & Informationsdesign-Studentin im vierten Semester an der\n                            <em>New Design University</em> in St. Pölten.',
      en: 'My name is Emilia and I’m a Graphic &amp; Information Design student in my fourth semester at the\n                            <em>New Design University</em> in St. Pölten, Austria.'
    },
    'about.p2': {
      de: 'Kunst hat für mich – früher oft eher im Unterbewusstsein – schon immer eine wichtige Rolle\n                            gespielt. Als visueller Mensch ist Design für mich nicht einfach nur schön anzusehen. Es hilft\n                            zu verstehen, dient als visuelle Stütze und wirkt gleichzeitig als starkes, eigenständiges Element.',
      en: 'Art has always played an important role for me – earlier often more subconsciously. As a\n                            visual person, design isn’t just something nice to look at to me. It helps understanding,\n                            serves as a visual aid, and at the same time acts as a strong, independent element.'
    },
    'about.p3': {
      de: 'Meine Passion ist es, über meine Kunst und mein Grafikdesign Gefühle zu vermitteln. Meine\n                            Arbeiten sollen sich stilistisch absetzen – und vor allem verstanden und gefühlt werden.',
      en: 'My passion is conveying emotions through my art and graphic design. My work should stand\n                            out stylistically – and above all be understood and felt.'
    },
    'about.p4': {
      de: 'Auch die Illustration begleitet mich seit einigen Jahren, wobei meine wahre Leidenschaft dafür\n                            auf Reisen entstand. Das bewusste Innehalten, das genaue Beobachten eines Ortes und das\n                            Illustrieren direkt vor Ort wecken in mir eine aktive Bewunderung und Wertschätzung für Natur\n                            und Architektur.',
      en: 'Illustration has also accompanied me for several years, with my true passion for it emerging\n                            while traveling. Consciously pausing, closely observing a place and illustrating right there\n                            awaken an active admiration and appreciation for nature and architecture in me.'
    },
    'about.p5': {
      de: 'Du bist an einer Zusammenarbeit oder einer Auftragsarbeit interessiert? :)',
      en: 'Interested in a collaboration or commissioned work? :)'
    },
    'about.contact1': { de: 'Melde dich sehr gerne hier bei mir:', en: 'Feel free to reach out to me here:' },
    'about.contact2': { de: 'Bleib hier up to date:', en: 'Stay up to date here:' },

    'datenschutz.h1': { de: 'Datenschutzerklärung', en: 'Privacy Policy' },
    'datenschutz.h2.1': { de: '1. Verantwortliche Person', en: '1. Data Controller' },
    'datenschutz.p1': {
      de: 'Emilia Anselmi<br>\n                E-Mail: <a href="mailto:emilia@anselmi.at">emilia@anselmi.at</a>',
      en: 'Emilia Anselmi<br>\n                Email: <a href="mailto:emilia@anselmi.at">emilia@anselmi.at</a>'
    },
    'datenschutz.h2.2': { de: '2. Zweck dieser Website', en: '2. Purpose of this Website' },
    'datenschutz.p2': {
      de: 'Diese Website dient ausschließlich als persönliches Portfolio zur Präsentation gestalterischer Arbeiten.\n                Es werden keine Waren oder Dienstleistungen verkauft, keine Nutzerkonten angelegt und keine\n                Kontaktformulare betrieben.',
      en: 'This website serves exclusively as a personal portfolio for presenting design work.\n                No goods or services are sold, no user accounts are created, and no\n                contact forms are operated.'
    },
    'datenschutz.h2.3': { de: '3. Hosting', en: '3. Hosting' },
    'datenschutz.p3': {
      de: 'Diese Website wird über <strong>GitHub Pages</strong> (GitHub Inc., 88 Colin P Kelly Jr St,\n                San Francisco, CA 94107, USA) gehostet. Beim Aufruf der Website kann GitHub technische Daten\n                wie IP-Adresse, Browsertyp und Uhrzeit des Zugriffs in Server-Logfiles speichern.\n                Diese Verarbeitung erfolgt auf Basis von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse\n                am sicheren Betrieb der Website). Weitere Informationen findest du in der\n                <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">Datenschutzerklärung von GitHub</a>.',
      en: 'This website is hosted via <strong>GitHub Pages</strong> (GitHub Inc., 88 Colin P Kelly Jr St,\n                San Francisco, CA 94107, USA). When you visit the website, GitHub may store technical data\n                such as IP address, browser type and time of access in server log files.\n                This processing is based on Art. 6 (1)(f) GDPR (legitimate interest\n                in the secure operation of the website). Further information can be found in\n                <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">GitHub’s Privacy Statement</a>.'
    },
    'datenschutz.h2.4': { de: '4. Cookies', en: '4. Cookies' },
    'datenschutz.p4': {
      de: 'Diese Website setzt <strong>keine eigenen Cookies</strong>. Es werden keine Tracking-,\n                Analyse- oder Werbe-Cookies verwendet. GitHub Pages kann technisch notwendige Cookies setzen –\n                diese dienen ausschließlich dem Betrieb der Seite und enthalten keine personenbezogenen Daten.',
      en: 'This website does not set <strong>any cookies of its own</strong>. No tracking,\n                analytics or advertising cookies are used. GitHub Pages may set technically necessary cookies –\n                these serve solely to operate the site and do not contain any personal data.'
    },
    'datenschutz.h2.5': { de: '5. Kontakt per E-Mail', en: '5. Contact by Email' },
    'datenschutz.p5': {
      de: 'Wenn du mich per E-Mail kontaktierst, werden deine Angaben (z. B. Name, E-Mail-Adresse,\n                Nachrichteninhalt) ausschließlich zur Bearbeitung deiner Anfrage verwendet und nicht an Dritte\n                weitergegeben. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw.\n                Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).',
      en: 'If you contact me by email, your information (e.g. name, email address,\n                message content) will be used solely to process your inquiry and will not be shared with third\n                parties. Legal basis: Art. 6 (1)(b) GDPR (pre-contractual measures) or\n                Art. 6 (1)(f) GDPR (legitimate interest).'
    },
    'datenschutz.h2.6': { de: '6. Deine Rechte', en: '6. Your Rights' },
    'datenschutz.p6': {
      de: 'Du hast gemäß DSGVO das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der\n                Verarbeitung sowie Datenübertragbarkeit. Bei Fragen wende dich an:\n                <a href="mailto:emilia@anselmi.at">emilia@anselmi.at</a>.\n                Außerdem steht dir das Recht zu, Beschwerde bei der österreichischen Datenschutzbehörde\n                einzulegen (<a href="https://www.dsb.gv.at" target="_blank" rel="noopener">www.dsb.gv.at</a>).',
      en: 'Under the GDPR, you have the right to access, rectification, erasure, restriction of\n                processing and data portability. If you have any questions, please contact:\n                <a href="mailto:emilia@anselmi.at">emilia@anselmi.at</a>.\n                You also have the right to lodge a complaint with the Austrian Data Protection Authority\n                (<a href="https://www.dsb.gv.at" target="_blank" rel="noopener">www.dsb.gv.at</a>).'
    },
    'datenschutz.h2.7': { de: '7. Externe Links', en: '7. External Links' },
    'datenschutz.p7': {
      de: 'Diese Website kann Links zu externen Seiten (z. B. Instagram, Behance) enthalten.\n                Für deren Inhalte und Datenschutzpraktiken bin ich nicht verantwortlich.',
      en: 'This website may contain links to external sites (e.g. Instagram, Behance).\n                I am not responsible for their content or privacy practices.'
    },
    'datenschutz.stand': { de: 'Stand: April 2026', en: 'Last updated: April 2026' }
  };

  function getLang() {
    return localStorage.getItem('lang') === 'en' ? 'en' : 'de';
  }

  function t(key) {
    var entry = translations[key];
    if (!entry) return null;
    return entry[getLang()];
  }

  function apply() {
    var lang = getLang();
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var entry = translations[el.getAttribute('data-i18n')];
      if (!entry) return;
      if (el.tagName === 'META') {
        el.setAttribute('content', entry[lang]);
      } else {
        el.textContent = entry[lang];
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var entry = translations[el.getAttribute('data-i18n-html')];
      if (!entry) return;
      el.innerHTML = entry[lang];
    });

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  function setLang(lang) {
    localStorage.setItem('lang', lang === 'en' ? 'en' : 'de');
    apply();
  }

  window.i18n = { t: t, getLang: getLang, setLang: setLang };

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(btn.dataset.lang);
      });
    });
    apply();
  });
})();
