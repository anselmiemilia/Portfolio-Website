(function () {
  var translations = {
    'nav.home': { de: 'Home', en: 'Home' },
    'nav.kunst': { de: 'Shop', en: 'Shop' },
    'nav.projekte': { de: 'Projekte', en: 'Projects' },
    'nav.about': { de: 'Über mich', en: 'About me' },
    'nav.kontakt': { de: 'Kontakt', en: 'Contact' },

    'footer.rights': { de: 'Alle Rechte vorbehalten.', en: 'All rights reserved.' },
    'footer.datenschutz': { de: 'Datenschutz', en: 'Privacy Policy' },
    'footer.impressum': { de: 'Impressum', en: 'Legal Notice' },
    'footer.agb': { de: 'AGB', en: 'Terms & Conditions' },

    'meta.title.kunst': { de: 'Kunst | Emilia Anselmi', en: 'Art | Emilia Anselmi' },
    'meta.desc.kunst': { de: 'Kunst – Emilia Anselmi', en: 'Art – Emilia Anselmi' },
    'meta.title.projekte': { de: 'Projekte | Emilia Anselmi', en: 'Projects | Emilia Anselmi' },
    'meta.desc.projekte': { de: 'Alle Projekte – Emilia Anselmi', en: 'All Projects – Emilia Anselmi' },
    'meta.title.about': { de: 'Über mich | Emilia Anselmi', en: 'About me | Emilia Anselmi' },
    'meta.desc.about': { de: 'Über Emilia Anselmi - Grafikdesignerin', en: 'About Emilia Anselmi - Graphic Designer' },
    'meta.title.datenschutz': { de: 'Datenschutz | Emilia Anselmi', en: 'Privacy Policy | Emilia Anselmi' },
    'meta.desc.datenschutz': { de: 'Datenschutzerklärung – Emilia Anselmi Portfolio', en: 'Privacy Policy – Emilia Anselmi Portfolio' },
    'meta.title.impressum': { de: 'Impressum | Emilia Anselmi', en: 'Legal Notice | Emilia Anselmi' },
    'meta.desc.impressum': { de: 'Impressum – Emilia Anselmi', en: 'Legal Notice – Emilia Anselmi' },
    'meta.title.agb': { de: 'AGB | Emilia Anselmi', en: 'Terms & Conditions | Emilia Anselmi' },
    'meta.desc.agb': { de: 'Allgemeine Geschäftsbedingungen – Emilia Anselmi', en: 'Terms & Conditions – Emilia Anselmi' },
    'meta.desc.home': { de: 'Portfolio von Emilia Anselmi - Grafikdesign Projekte', en: 'Portfolio of Emilia Anselmi - Graphic Design Projects' },

    'hero.subtitle': {
      de: 'Angehende Grafikdesignerin &amp; Künstlerin aus Vorarlberg',
      en: 'Aspiring graphic designer &amp; artist from Vorarlberg, Austria'
    },

    'home.prints.cta': { de: 'Kunst kaufen', en: 'Buy Art' },
    'home.prints.banner.title': { de: 'Erste Kollektion', en: 'First Collection' },
    'home.prints.banner.cta': { de: 'Shop Now', en: 'Shop Now' },
    'home.printsOriginale.title': { de: 'Prints & Originale', en: 'Prints & Originals' },
    'home.projekte.title': { de: 'Projekte', en: 'Projects' },
    'home.projekte.cta': { de: 'Zu den Projekten', en: 'See all projects' },
    'home.about.title': { de: 'Über mich', en: 'About me' },
    'home.about.p1': {
      de: 'Ich heiße Emilia und bin angehende Künstlerin und Grafik- & Informationsdesign-Studentin im vierten Semester an der <em>New Design University</em> in St. Pölten.',
      en: 'My name is Emilia and I’m an aspiring artist and Graphic &amp; Information Design student in my fourth semester at the <em>New Design University</em> in St. Pölten, Austria.'
    },
    'home.about.p2': {
      de: 'Kunst hat für mich – früher oft eher im Unterbewusstsein – schon immer eine wichtige Rolle gespielt. Als visueller Mensch ist Design für mich nicht einfach nur schön anzusehen.',
      en: 'Art has always played an important role for me – earlier often more subconsciously. As a visual person, design isn’t just something nice to look at to me.'
    },

    'kontakt.title': { de: 'Kontakt', en: 'Contact' },
    'kontakt.text': {
      de: 'Du hast Fragen, eine Anfrage zu einer Auftragsarbeit oder sonstiges was du mit mir teilen möchtest?',
      en: 'Do you have questions, an inquiry about commissioned work, or anything else you’d like to share with me?'
    },
    'kontakt.text2': {
      de: 'Kontaktiere mich gerne hier:',
      en: 'Feel free to get in touch here:'
    },

    'ui.mehrLesen': { de: 'Mehr lesen', en: 'Read more' },
    'ui.wenigerLesen': { de: 'Weniger lesen', en: 'Read less' },
    'ui.beschreibungFolgt': { de: 'Beschreibung folgt ...', en: 'Description coming soon ...' },
    'ui.zurueckProjekte': { de: 'Zurück zu Projekte', en: 'Back to Projects' },
    'ui.zurueckKunst': { de: 'Zurück zu Kunst', en: 'Back to Art' },

    'produkt.info.title': { de: 'Info', en: 'Info' },
    'produkt.info.folgt': { de: 'Info folgt ...', en: 'Info coming soon ...' },
    'produkt.abendrosa.info': {
      de: 'Inspiriert von einem abendlichen Spaziergang durch Marrakesch an einem warmen Februarabend, zeigt dieses Bild die Koutoubia-Moschee im pulsierenden Treiben der Stadt. Original gemalt mit Acryl und Ölpastell auf Leinwand, 30 × 40 cm, im Juli 2026.',
      en: 'Inspired by an evening walk through Marrakesh on a warm February evening, this piece captures the Koutoubia Mosque amid the city’s lively evening bustle. Original painted with acrylic and oil pastel on canvas, 30 × 40 cm, in July 2026.'
    },
    'produkt.details.papier.wert.filz': { de: '300 g/m² Filzmarkiertes Naturpapier', en: '300 gsm felt-marked natural paper' },
    'produkt.details.rand.wert.1cm': { de: '1 cm rundum', en: '1 cm all around' },
    'produkt.sommersonnebaedala.info': {
      de: 'Sommer, Sonne, Bädala entstand als Auftragsarbeit für das Juli/August-Cover der marie Straßenzeitung. Die Szenerie stellt den Bodensee und das sommerliche Treiben dar. Das Schöne am See in Vorarlberg ist, dass er allen Menschen freien Zugang zu einer Abkühlung schafft und einen Ort der Begegnung und des Verweilens darstellt.',
      en: 'Sommer, Sonne, Bädala was created as a commissioned piece for the July/August cover of the marie street newspaper. The scene shows Lake Constance and the bustle of summer life. What’s lovely about the lake in Vorarlberg is that it gives everyone free access to a place to cool off — a place to meet and to linger.'
    },
    'produkt.docesaomiguel.info': {
      de: 'Auf einer Reise nach Lissabon im August verlor ich mich in den Gassen von Alfama – dort entdeckte ich die Casa São Miguel, deren Fassade mich auf Anhieb verzauberte und zu diesem Bild inspirierte. Original gemalt mit Acryl und Ölpastell auf Leinwand, 50 × 60 cm, im August 2026.',
      en: 'On a trip to Lisbon in August, I wandered through the lanes of Alfama and came across Casa São Miguel – its façade captivated me instantly and became the inspiration for this piece. Original painted with acrylic and oil pastel on canvas, 50 × 60 cm, in August 2026.'
    },
    'produkt.thecityofbusesoriginal.info': {
      de: 'Original Kunstwerk von Emilia Anselmi, 2026, „The&nbsp;City&nbsp;of&nbsp;Buses“, London.',
      en: 'Original artwork by Emilia Anselmi, 2026, “The&nbsp;City&nbsp;of&nbsp;Buses”, London.'
    },
    'produkt.dinneratlamaisonrose.info': {
      de: 'Original Kunstwerk von Emilia Anselmi, 2026, „Dinner&nbsp;at&nbsp;La&nbsp;Maison&nbsp;Rose?“, Paris.',
      en: 'Original artwork by Emilia Anselmi, 2026, “Dinner&nbsp;at&nbsp;La&nbsp;Maison&nbsp;Rose?”, Paris.'
    },
    'produkt.inbarcelona.info': {
      de: 'Original Kunstwerk von Emilia Anselmi, 2026, „In&nbsp;Barcelona“, Barcelona.',
      en: 'Original artwork by Emilia Anselmi, 2026, “In&nbsp;Barcelona”, Barcelona.'
    },
    'produkt.smellslikenorthernitaly.info': {
      de: 'Original Kunstwerk von Emilia Anselmi, 2026, „Smells&nbsp;Like&nbsp;Northern&nbsp;Italy“, Como.',
      en: 'Original artwork by Emilia Anselmi, 2026, “Smells&nbsp;Like&nbsp;Northern&nbsp;Italy”, Como.'
    },
    'produkt.feldkircheraussichten.info': {
      de: 'Original Kunstwerk von Emilia Anselmi, 2026, „Feldkircher&nbsp;Aussichten“, Feldkirch.',
      en: 'Original artwork by Emilia Anselmi, 2026, “Feldkircher&nbsp;Aussichten”, Feldkirch.'
    },
    'produkt.lissabon.info': {
      de: 'Original Kunstwerk von Emilia Anselmi, 2026, „Lissabon“, Lissabon.',
      en: 'Original artwork by Emilia Anselmi, 2026, “Lissabon”, Lissabon.'
    },
    'produkt.cafecentral.info': {
      de: 'Original Kunstwerk von Emilia Anselmi, 2026, „Café&nbsp;Central“, Wien.',
      en: 'Original artwork by Emilia Anselmi, 2026, “Café&nbsp;Central”, Vienna.'
    },
    'produkt.original.technik.wert': {
      de: 'Acryl, Permanent Marker & Ölpastell auf Leinwand',
      en: 'Acrylic, permanent marker & oil pastel on canvas'
    },
    'produkt.original.material.wert': {
      de: 'Feine Baumwollleinwand (100 %) auf Keilrahmen, 45 mm Rahmenstärke',
      en: 'Fine cotton canvas (100%) on a stretcher frame, 45 mm depth'
    },
    'produkt.smellslikenorthernitaly.material': {
      de: 'Feine Baumwollleinwand (100 %) auf Keilrahmen, 17 mm Rahmenstärke',
      en: 'Fine cotton canvas (100%) on a stretcher frame, 17 mm depth'
    },
    'produkt.details.signatur': { de: 'Signatur', en: 'Signature' },
    'produkt.original.signatur.wert': { de: 'Handsigniert und datiert von der Künstlerin', en: 'Hand-signed and dated by the artist' },
    'produkt.details.zertifikat': { de: 'Zertifikat', en: 'Certificate' },
    'produkt.original.zertifikat.wert': { de: 'Inklusive Echtheitszertifikat', en: 'Certificate of authenticity included' },
    'produkt.details.versand': { de: 'Versand', en: 'Shipping' },
    'produkt.original.versandHinweis': {
      de: 'Dein Original wird mit größter Sorgfalt verpackt, damit es sicher und unversehrt bei dir ankommt.',
      en: 'Your original is packaged with the utmost care, so it arrives safely and undamaged.'
    },
    'produkt.details.title': { de: 'Details', en: 'Details' },
    'produkt.details.groesse': { de: 'Größe', en: 'Size' },
    'produkt.details.papier': { de: 'Papierdicke', en: 'Paper thickness' },
    'produkt.details.papier.wert': { de: '300 g/m² Naturpapier creme', en: '300 gsm natural cream paper' },
    'produkt.details.rand': { de: 'Rand', en: 'Border' },
    'produkt.details.rand.wert': { de: '15 mm rundum', en: '15 mm all around' },
    'produkt.details.auflage': { de: 'Auflage', en: 'Edition' },
    'produkt.details.material': { de: 'Material', en: 'Material' },
    'produkt.details.technik': { de: 'Technik', en: 'Technique' },
    'produkt.auflage.a4': { de: 'Limitierte Auflage von 20 Stück<br>(handsigniert &amp; nummeriert)', en: 'Limited edition of 20<br>(hand-signed &amp; numbered)' },
    'produkt.auflage.a3': { de: 'Limitierte Auflage von 10 Stück<br>(handsigniert &amp; nummeriert)', en: 'Limited edition of 10<br>(hand-signed &amp; numbered)' },
    'produkt.related.title': { de: 'Weitere Prints', en: 'More Prints' },
    'produkt.related.originale.title': { de: 'Weitere Originale', en: 'More Originals' },
    'produkt.preisFolgt': { de: 'Preis folgt', en: 'Price coming soon' },
    'produkt.abPreis20': { de: 'ab € 20,–', en: 'from € 20' },
    'produkt.kaufen': { de: 'Kaufen', en: 'Buy' },
    'produkt.inDenWarenkorb': { de: 'In den Warenkorb', en: 'Add to Cart' },
    'produkt.ausverkauft': { de: 'Ausverkauft', en: 'Sold out' },
    'produkt.verkauft': { de: 'Verkauft', en: 'Sold' },
    'produkt.baldVerfuegbar': { de: 'Bald verfügbar', en: 'Coming soon' },
    'produkt.verfuegbarAb': { de: 'Verfügbar ab Ende August', en: 'Available from late August' },
    'produkt.vorbestellen': { de: 'Vorbestellen', en: 'Pre-order' },
    'produkt.versandAbEndeAugust': { de: 'Versand ab Ende August', en: 'Shipping from late August' },
    'produkt.farbabweichung': { de: 'Farben können durch Druck und Bildschirmdarstellung leicht abweichen.', en: 'Colors may vary slightly due to printing and screen display.' },
    'cart.vorbestellHinweis': {
      de: 'Enthält eine Vorbestellung – die gesamte Bestellung wird gemeinsam zum Liefertermin der Vorbestellung (Ende August) verschickt.',
      en: 'Includes a pre-order – the whole order ships together on the pre-order’s delivery date (late August).'
    },

    'cart.oeffnen': { de: 'Warenkorb öffnen', en: 'Open cart' },
    'cart.schliessen': { de: 'Schließen', en: 'Close' },
    'cart.titel': { de: 'Warenkorb', en: 'Cart' },
    'cart.leer': { de: 'Dein Warenkorb ist leer.', en: 'Your cart is empty.' },
    'cart.entfernen': { de: 'Entfernen', en: 'Remove' },
    'cart.zwischensumme': { de: 'Zwischensumme', en: 'Subtotal' },
    'cart.versandhinweis': { de: 'zzgl. Versand', en: 'plus shipping' },
    'cart.versandland': { de: 'Versandland', en: 'Shipping country' },
    'cart.versandland.placeholder': { de: 'Bitte wählen …', en: 'Please select …' },
    'cart.versandland.at': { de: 'Österreich', en: 'Austria' },
    'cart.versandland.de': { de: 'Deutschland', en: 'Germany' },
    'cart.versandland.eu': { de: 'Übrige EU', en: 'Rest of EU' },
    'cart.versandland.fehlt': { de: 'Bitte wähle dein Versandland aus.', en: 'Please select your shipping country.' },
    'cart.zurKasse': { de: 'Zur Kasse', en: 'Checkout' },
    'cart.wirdGeladen': { de: 'Einen Moment …', en: 'One moment …' },
    'cart.fehler': {
      de: 'Der Checkout konnte nicht gestartet werden. Bitte versuche es erneut oder schreib mir eine E-Mail.',
      en: 'Checkout could not be started. Please try again or send me an email.'
    },

    'checkout.erfolg.titel': { de: 'Danke für deine Bestellung!', en: 'Thank you for your order!' },
    'checkout.erfolg.text': {
      de: 'Deine Zahlung wurde erfolgreich verarbeitet. Du erhältst in Kürze eine Bestätigung per E-Mail.',
      en: 'Your payment was processed successfully. You’ll receive a confirmation email shortly.'
    },
    'checkout.abgebrochen.titel': { de: 'Bestellung abgebrochen', en: 'Order cancelled' },
    'checkout.abgebrochen.text': {
      de: 'Der Bezahlvorgang wurde abgebrochen. Dein Warenkorb ist noch gefüllt, du kannst es jederzeit erneut versuchen.',
      en: 'The checkout was cancelled. Your cart is still filled, you can try again anytime.'
    },

    'about.p1': {
      de: 'Ich heiße Emilia und bin angehende Künstlerin und Grafik- & Informationsdesign-Studentin im vierten Semester an der\n                            <em>New Design University</em> in St. Pölten.',
      en: 'My name is Emilia and I’m an aspiring artist and Graphic &amp; Information Design student in my fourth semester at the\n                            <em>New Design University</em> in St. Pölten, Austria.'
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
      de: 'Emilia Anselmi<br>\n                E-Mail: <a href="mailto:atelier@anselmi.at">atelier@anselmi.at</a>',
      en: 'Emilia Anselmi<br>\n                Email: <a href="mailto:atelier@anselmi.at">atelier@anselmi.at</a>'
    },
    'datenschutz.h2.2': { de: '2. Zweck dieser Website', en: '2. Purpose of this Website' },
    'datenschutz.p2': {
      de: 'Diese Website dient als persönliches Portfolio zur Präsentation gestalterischer Arbeiten und bietet\n                zusätzlich ausgewählte Kunstdrucke (Prints) zum Kauf an. Informationen zu Widerrufsrecht und\n                Rücksendekosten findest du in der <a href="widerrufsrecht.html">Widerrufsbelehrung</a>. Es werden\n                keine Nutzerkonten angelegt und keine Kontaktformulare betrieben.',
      en: 'This website serves as a personal portfolio for presenting design work and additionally offers\n                a selection of art prints for sale. For information on the right of withdrawal and return costs,\n                see the <a href="widerrufsrecht.html">withdrawal policy</a>. No user accounts are created and no\n                contact forms are operated.'
    },
    'datenschutz.h2.3': { de: '3. Hosting', en: '3. Hosting' },
    'datenschutz.p3': {
      de: 'Diese Website wird über <strong>GitHub Pages</strong> (GitHub, Inc., 88 Colin P Kelly Jr Street,\n                San Francisco, CA 94107, USA) gehostet. Beim Aufruf der Website kann GitHub technische Daten\n                wie IP-Adresse, Browsertyp und Uhrzeit des Zugriffs in Server-Logfiles speichern.\n                Diese Verarbeitung erfolgt auf Basis von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse\n                am sicheren Betrieb der Website). Weitere Informationen findest du in der\n                <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">Datenschutzerklärung von GitHub</a>.\n                <br><br>\n                Der Bestellvorgang im Shop (z. B. Abfrage des Lagerstands, Start der Kaufabwicklung) läuft technisch\n                über <strong>Cloudflare Pages Functions</strong> (Cloudflare, Inc., 101 Townsend St, San Francisco,\n                CA 94107, USA). Dabei kann Cloudflare technische Daten wie IP-Adresse und Zeitpunkt der Anfrage\n                verarbeiten. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der sicheren\n                Abwicklung des Bestellvorgangs). Weitere Informationen findest du in der\n                <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener">Datenschutzerklärung von Cloudflare</a>.',
      en: 'This website is hosted via <strong>GitHub Pages</strong> (GitHub, Inc., 88 Colin P Kelly Jr Street,\n                San Francisco, CA 94107, USA). When you visit the website, GitHub may store technical data\n                such as IP address, browser type and time of access in server log files.\n                This processing is based on Art. 6 (1)(f) GDPR (legitimate interest\n                in the secure operation of the website). Further information can be found in\n                <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">GitHub’s Privacy Statement</a>.\n                <br><br>\n                The shop’s ordering process (e.g. checking stock levels, starting checkout) runs technically via\n                <strong>Cloudflare Pages Functions</strong> (Cloudflare, Inc., 101 Townsend St, San Francisco,\n                CA 94107, USA). Cloudflare may process technical data such as IP address and time of request in\n                doing so. Legal basis: Art. 6 (1)(f) GDPR (legitimate interest in securely processing orders).\n                Further information can be found in\n                <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener">Cloudflare’s Privacy Policy</a>.'
    },
    'datenschutz.h2.zahlung': { de: '4. Zahlungsabwicklung', en: '4. Payment Processing' },
    'datenschutz.p.zahlung': {
      de: 'Für den Kauf von Prints wird die Zahlung über <strong>Stripe</strong> (Stripe Payments Europe, Ltd.,\n                1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Irland) abgewickelt. Dabei werden deine\n                Zahlungs- und Lieferadressdaten (z. B. Name, Adresse, E-Mail, Zahlungsmittel) direkt an Stripe\n                übermittelt und dort verarbeitet – sie laufen nicht über meine eigenen Systeme. Rechtsgrundlage:\n                Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung). Weitere Informationen findest du in der\n                <a href="https://stripe.com/at/privacy" target="_blank" rel="noopener">Datenschutzerklärung von Stripe</a>.',
      en: 'To purchase prints, payment is processed via <strong>Stripe</strong> (Stripe Payments Europe, Ltd.,\n                1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Ireland). Your payment and shipping address\n                data (e.g. name, address, email, payment method) is transmitted directly to and processed by\n                Stripe – it does not pass through my own systems. Legal basis: Art. 6 (1)(b) GDPR (contract\n                performance). Further information can be found in\n                <a href="https://stripe.com/at/privacy" target="_blank" rel="noopener">Stripe’s Privacy Policy</a>.'
    },
    'datenschutz.h2.4': { de: '5. Cookies', en: '5. Cookies' },
    'datenschutz.p4': {
      de: 'Diese Website selbst setzt <strong>keine Cookies</strong>. Für den Warenkorb und die Sprachauswahl\n                wird ausschließlich lokaler Speicher (localStorage) in deinem Browser verwendet – diese Daten\n                verlassen dein Gerät nicht und dienen keinem Tracking. Erst auf der separaten, eigenständigen\n                Bezahlseite von Stripe (stripe.com) können im Rahmen der Zahlungsabwicklung Cookies gesetzt werden;\n                dies liegt außerhalb meines Einflussbereichs und ist in der\n                <a href="https://stripe.com/at/privacy" target="_blank" rel="noopener">Datenschutzerklärung von Stripe</a> beschrieben.',
      en: 'This website itself does not set <strong>any cookies</strong>. The shopping cart and language\n                selection use only local browser storage (localStorage) – this data never leaves your device and\n                is not used for tracking. Only on Stripe’s separate, independent checkout page (stripe.com) may\n                cookies be set as part of payment processing; this is outside my control and is described in\n                <a href="https://stripe.com/at/privacy" target="_blank" rel="noopener">Stripe’s Privacy Policy</a>.'
    },
    'datenschutz.h2.5': { de: '6. Kontakt per E-Mail', en: '6. Contact by Email' },
    'datenschutz.p5': {
      de: 'Wenn du mich per E-Mail kontaktierst, werden deine Angaben (z. B. Name, E-Mail-Adresse,\n                Nachrichteninhalt) ausschließlich zur Bearbeitung deiner Anfrage verwendet und nicht an Dritte\n                weitergegeben. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw.\n                Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).',
      en: 'If you contact me by email, your information (e.g. name, email address,\n                message content) will be used solely to process your inquiry and will not be shared with third\n                parties. Legal basis: Art. 6 (1)(b) GDPR (pre-contractual measures) or\n                Art. 6 (1)(f) GDPR (legitimate interest).'
    },
    'datenschutz.h2.6': { de: '7. Deine Rechte', en: '7. Your Rights' },
    'datenschutz.p6': {
      de: 'Du hast gemäß DSGVO das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der\n                Verarbeitung sowie Datenübertragbarkeit. Bei Fragen wende dich an:\n                <a href="mailto:atelier@anselmi.at">atelier@anselmi.at</a>.\n                Außerdem steht dir das Recht zu, Beschwerde bei der österreichischen Datenschutzbehörde\n                einzulegen (<a href="https://www.dsb.gv.at" target="_blank" rel="noopener">www.dsb.gv.at</a>).',
      en: 'Under the GDPR, you have the right to access, rectification, erasure, restriction of\n                processing and data portability. If you have any questions, please contact:\n                <a href="mailto:atelier@anselmi.at">atelier@anselmi.at</a>.\n                You also have the right to lodge a complaint with the Austrian Data Protection Authority\n                (<a href="https://www.dsb.gv.at" target="_blank" rel="noopener">www.dsb.gv.at</a>).'
    },
    'datenschutz.h2.7': { de: '8. Externe Links', en: '8. External Links' },
    'datenschutz.p7': {
      de: 'Diese Website kann Links zu externen Seiten (z. B. Instagram, TikTok) enthalten.\n                Für deren Inhalte und Datenschutzpraktiken bin ich nicht verantwortlich.',
      en: 'This website may contain links to external sites (e.g. Instagram, TikTok).\n                I am not responsible for their content or privacy practices.'
    },
    'datenschutz.stand': { de: 'Stand: August 2026', en: 'Last updated: August 2026' },

    'meta.title.widerruf': { de: 'Widerrufsrecht | Emilia Anselmi', en: 'Right of Withdrawal | Emilia Anselmi' },
    'meta.desc.widerruf': { de: 'Widerrufsrecht und Rücksendebedingungen – Emilia Anselmi', en: 'Right of withdrawal and return conditions – Emilia Anselmi' },
    'footer.widerruf': { de: 'Widerrufsrecht', en: 'Right of Withdrawal' },

    'widerruf.h1': { de: 'Widerrufsrecht', en: 'Right of Withdrawal' },

    'widerruf.h2.1': { de: '1. Widerrufsrecht', en: '1. Right of Withdrawal' },
    'widerruf.p1': {
      de: 'Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.\n                Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter\n                Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.\n                Um Ihr Widerrufsrecht auszuüben, müssen Sie mir (Emilia Anselmi,\n                E-Mail: <a href="mailto:atelier@anselmi.at">atelier@anselmi.at</a>) mittels einer eindeutigen\n                Erklärung (z. B. ein mit der Post versandter Brief oder E-Mail) über Ihren Entschluss, diesen\n                Vertrag zu widerrufen, informieren. Sie können dafür das unten stehende Muster-Widerrufsformular\n                verwenden, was jedoch nicht vorgeschrieben ist. Zur Wahrung der Widerrufsfrist reicht es aus,\n                dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist\n                absenden.',
      en: 'You have the right to withdraw from this contract within fourteen days without giving any reason.\n                The withdrawal period will expire fourteen days from the day on which you or a third party\n                other than the carrier and indicated by you acquire physical possession of the goods.\n                To exercise the right of withdrawal, you must inform me (Emilia Anselmi,\n                email: <a href="mailto:atelier@anselmi.at">atelier@anselmi.at</a>) of your decision to withdraw\n                from this contract by an unequivocal statement (e.g. a letter sent by post or email). You may\n                use the model withdrawal form below, although it is not obligatory. To meet the withdrawal\n                deadline, it is sufficient for you to send your communication concerning your exercise of the\n                right of withdrawal before the withdrawal period has expired.'
    },

    'widerruf.h2.2': { de: '2. Folgen des Widerrufs', en: '2. Effects of Withdrawal' },
    'widerruf.p2': {
      de: 'Wenn Sie diesen Vertrag widerrufen, habe ich Ihnen alle Zahlungen, die ich von Ihnen erhalten habe,\n                einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben,\n                dass Sie eine andere Art der Lieferung als die von mir angebotene, günstigste Standardlieferung\n                gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an\n                dem die Mitteilung über Ihren Widerruf dieses Vertrags bei mir eingegangen ist. Für diese\n                Rückzahlung verwende ich dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion\n                eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem\n                Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet. Ich kann die Rückzahlung\n                verweigern, bis ich die Waren wieder zurückerhalten habe oder bis Sie den Nachweis erbracht\n                haben, dass Sie die Waren zurückgesandt haben, je nachdem, welches der frühere Zeitpunkt ist.\n                Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag,\n                an dem Sie mich über den Widerruf dieses Vertrags unterrichten, an mich zurückzusenden oder zu\n                übergeben. Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von vierzehn Tagen\n                absenden. <strong>Sie tragen die unmittelbaren Kosten der Rücksendung der Waren.</strong> Sie\n                müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser Wertverlust auf einen\n                zur Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise der Waren nicht notwendigen\n                Umgang mit ihnen zurückzuführen ist.',
      en: 'If you withdraw from this contract, I shall reimburse to you all payments received from you,\n                including the costs of delivery (except for the supplementary costs resulting from your choice\n                of a type of delivery other than the least expensive type of standard delivery offered by me),\n                without undue delay and in any event not later than fourteen days from the day on which I am\n                informed about your decision to withdraw from this contract. I will carry out such reimbursement\n                using the same means of payment as you used for the initial transaction, unless you have\n                expressly agreed otherwise; in any event, you will not incur any fees as a result of such\n                reimbursement. I may withhold reimbursement until I have received the goods back or you have\n                supplied evidence of having sent back the goods, whichever is the earliest. You shall send back\n                the goods or hand them over to me without undue delay and in any event not later than fourteen\n                days from the day on which you communicate your withdrawal from this contract. The deadline is\n                met if you send back the goods before the period of fourteen days has expired.\n                <strong>You will have to bear the direct cost of returning the goods.</strong> You are only\n                liable for any diminished value of the goods resulting from handling other than what is\n                necessary to establish the nature, characteristics and functioning of the goods.'
    },

    'widerruf.h2.3': { de: '3. Muster-Widerrufsformular', en: '3. Model Withdrawal Form' },
    'widerruf.p3intro': {
      de: '(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)',
      en: '(If you want to withdraw from the contract, please fill out this form and send it back.)'
    },
    'widerruf.form': {
      de: 'An: Emilia Anselmi, <a href="mailto:atelier@anselmi.at">atelier@anselmi.at</a><br><br>\n                Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der\n                folgenden Waren (*):<br>\n                _______________________________________________<br><br>\n                Bestellt am (*) / erhalten am (*): _______________________________<br><br>\n                Name des/der Verbraucher(s): _______________________________<br><br>\n                Anschrift des/der Verbraucher(s): _______________________________<br><br>\n                Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier): ___________<br><br>\n                Datum: _______________________________<br><br>\n                (*) Unzutreffendes streichen.',
      en: 'To: Emilia Anselmi, <a href="mailto:atelier@anselmi.at">atelier@anselmi.at</a><br><br>\n                I/we (*) hereby give notice that I/we (*) withdraw from my/our (*) contract of sale of the\n                following goods (*):<br>\n                _______________________________________________<br><br>\n                Ordered on (*) / received on (*): _______________________________<br><br>\n                Name of consumer(s): _______________________________<br><br>\n                Address of consumer(s): _______________________________<br><br>\n                Signature of consumer(s) (only if this form is notified on paper): ___________<br><br>\n                Date: _______________________________<br><br>\n                (*) Delete as appropriate.'
    },

    'widerruf.h2.4': { de: '4. Ausnahmen vom Widerrufsrecht', en: '4. Exceptions to the Right of Withdrawal' },
    'widerruf.p4': {
      de: 'Da es sich bei den angebotenen Prints um standardisierte Reproduktionen und nicht um für Sie\n                individuell angefertigte Waren handelt, gilt das oben beschriebene Widerrufsrecht uneingeschränkt.',
      en: 'As the prints offered are standardised reproductions and not goods made to your individual\n                specifications, the right of withdrawal described above applies without restriction.'
    },

    'widerruf.stand': { de: 'Stand: August 2026', en: 'Last updated: August 2026' },

    'produkt.widerruf.hinweis': {
      de: '14 Tage Rückgaberecht – Käufer:in trägt die Rücksendekosten.',
      en: '14-day right of withdrawal – buyer covers return shipping.'
    },
    'produkt.preishinweis': {
      de: 'Alle Preise sind Endpreise (Privatverkauf, keine Umsatzsteuer ausgewiesen).',
      en: 'All prices are final prices (private sale, no VAT charged).'
    },

    'impressum.h1': { de: 'Impressum', en: 'Legal Notice' },
    'impressum.h2.angaben': { de: 'Angaben gemäß § 5 ECG', en: 'Information pursuant to § 5 ECG (Austrian E-Commerce Act)' },
    'impressum.p.angaben': {
      de: 'Emilia Anselmi<br>\n                Poststraße 2<br>\n                6850 Dornbirn<br>\n                Österreich<br><br>\n                E-Mail: <a href="mailto:atelier@anselmi.at">atelier@anselmi.at</a>',
      en: 'Emilia Anselmi<br>\n                Poststraße 2<br>\n                6850 Dornbirn<br>\n                Austria<br><br>\n                Email: <a href="mailto:atelier@anselmi.at">atelier@anselmi.at</a>'
    },
    'impressum.h2.status': { de: 'Unternehmerische Angaben', en: 'Business Status' },
    'impressum.p.status': {
      de: 'Der Verkauf der Kunstdrucke erfolgt als Privatperson, nicht im Rahmen eines Gewerbebetriebs.\n                Es besteht keine Gewerbeberechtigung, keine Firmenbuchnummer und keine\n                Umsatzsteuer-Identifikationsnummer. Alle angegebenen Preise sind Endpreise; es wird gemäß\n                der Kleinstunternehmer-Regelung keine Umsatzsteuer ausgewiesen.',
      en: 'The art prints are sold as a private individual, not as part of a registered business. There is\n                no trade licence, company register number or VAT identification number. All prices shown\n                are final prices; no VAT is charged under the small-business exemption.'
    },
    'impressum.h2.streitschlichtung': { de: 'Online-Streitbeilegung', en: 'Online Dispute Resolution' },
    'impressum.p.streitschlichtung': {
      de: 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die\n                unter <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a>\n                erreichbar ist. Zur Teilnahme an einem Streitbeilegungsverfahren vor einer\n                Verbraucherschlichtungsstelle bin ich nicht verpflichtet und derzeit auch nicht bereit.',
      en: 'The European Commission provides a platform for online dispute resolution (ODR), available at\n                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a>.\n                I am not obliged, and currently not willing, to take part in dispute resolution\n                proceedings before a consumer arbitration board.'
    },
    'impressum.h2.haftung': { de: 'Haftung für Inhalte', en: 'Liability for Content' },
    'impressum.p.haftung': {
      de: 'Trotz sorgfältiger inhaltlicher Kontrolle übernehme ich keine Haftung für die Inhalte externer\n                Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.',
      en: 'Despite careful content control, I assume no liability for the content of external links. The\n                operators of linked pages are solely responsible for their content.'
    },
    'impressum.stand': { de: 'Stand: August 2026', en: 'Last updated: August 2026' },

    'agb.h1': { de: 'Allgemeine Geschäftsbedingungen', en: 'Terms & Conditions' },
    'agb.h2.1': { de: '1. Geltungsbereich', en: '1. Scope' },
    'agb.p1': {
      de: 'Diese Geschäftsbedingungen gelten für alle Käufe von Kunstdrucken über anselmi.at zwischen\n                Emilia Anselmi (siehe <a href="impressum.html">Impressum</a>) und Verbraucher:innen.',
      en: 'These terms apply to all purchases of art prints via anselmi.at between Emilia Anselmi (see\n                <a href="impressum.html">Legal Notice</a>) and consumers.'
    },
    'agb.h2.2': { de: '2. Vertragsschluss', en: '2. Conclusion of Contract' },
    'agb.p2': {
      de: 'Die Darstellung der Produkte im Shop stellt kein bindendes Angebot dar, sondern eine\n                Aufforderung zur Bestellung. Der Kaufvertrag kommt zustande, sobald die Zahlung über den\n                Zahlungsdienstleister Stripe erfolgreich abgeschlossen wurde. Nach Zahlungsabschluss erhältst\n                du eine Bestätigung.',
      en: 'The display of products in the shop does not constitute a binding offer, but an invitation to\n                order. The purchase contract is concluded once payment via the payment provider Stripe has\n                been completed successfully. You will receive a confirmation after payment.'
    },
    'agb.h2.3': { de: '3. Preise und Zahlung', en: '3. Prices and Payment' },
    'agb.p3': {
      de: 'Alle angegebenen Preise sind Endpreise in Euro. Der Verkauf erfolgt als Privatperson, es wird\n                keine Umsatzsteuer ausgewiesen. Die Zahlung erfolgt ausschließlich über den\n                Zahlungsdienstleister Stripe (z. B. Kreditkarte, EPS) und ist bei Bestellung fällig.',
      en: 'All prices shown are final prices in euros. The sale is made as a private individual; no VAT is\n                charged. Payment is made exclusively via the payment provider Stripe (e.g. credit card, EPS)\n                and is due upon ordering.'
    },
    'agb.h2.4': { de: '4. Versand', en: '4. Shipping' },
    'agb.p4': {
      de: 'Der Versand erfolgt nach Österreich, Deutschland und in weitere EU-Länder. Die Auswahl der\n                verfügbaren Länder und die jeweiligen Versandkosten werden vor Zahlungsabschluss angezeigt.\n                Ein Versand in die Schweiz oder außerhalb der EU ist derzeit nicht möglich.',
      en: 'Shipping is available to Austria, Germany and other EU countries. The available countries and\n                the respective shipping costs are shown before payment is completed. Shipping to Switzerland\n                or outside the EU is currently not possible.'
    },
    'agb.h2.5': { de: '5. Gewährleistung', en: '5. Warranty' },
    'agb.p5': {
      de: 'Es gilt die gesetzliche Gewährleistung. Solltest du einen Mangel an einem gelieferten Print\n                feststellen, melde dich bitte per E-Mail unter\n                <a href="mailto:atelier@anselmi.at">atelier@anselmi.at</a>.',
      en: 'Statutory warranty applies. Should you notice a defect in a delivered print, please get in touch\n                by email at <a href="mailto:atelier@anselmi.at">atelier@anselmi.at</a>.'
    },
    'agb.h2.6': { de: '6. Widerrufsrecht', en: '6. Right of Withdrawal' },
    'agb.p6': {
      de: 'Als Verbraucher:in steht dir ein 14-tägiges Widerrufsrecht zu. Details dazu findest du in der\n                <a href="widerrufsrecht.html">Widerrufsbelehrung</a>.',
      en: 'As a consumer, you have a 14-day right of withdrawal. Details can be found in the\n                <a href="widerrufsrecht.html">withdrawal policy</a>.'
    },
    'agb.h2.7': { de: '7. Schlussbestimmungen', en: '7. Final Provisions' },
    'agb.p7': {
      de: 'Es gilt österreichisches Recht unter Ausschluss des UN-Kaufrechts. Zwingende\n                verbraucherschützende Bestimmungen deines Wohnsitzstaates bleiben davon unberührt.',
      en: 'Austrian law applies, excluding the UN Convention on Contracts for the International Sale of\n                Goods. Mandatory consumer-protection provisions of your country of residence remain\n                unaffected.'
    },
    'agb.stand': { de: 'Stand: August 2026', en: 'Last updated: August 2026' }
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
