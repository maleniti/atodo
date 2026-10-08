// Privacy Policy page -- static legal content, no auth.js dependency, just
// site-i18n.js for language handling. Each section is one data-i18n-html
// key (heading + body together, see privacy.html) rather than one key per
// sentence -- much easier to keep a translation aligned section-by-section
// than to juggle dozens of tiny fragment keys for a document this size.

const PRIVACY_I18N = {
  en: {
    'nav.login': 'Log in',
    'nav.faq': 'FAQ',
    'nav.support': 'Contact support',
    'nav.privacy': 'Privacy Policy',
    'nav.terms': 'Terms of Service',
    'privacy.pageTitle': 'Privacy Policy',
    'privacy.updated': 'Last updated: 8 October 2026',
    'privacy.intro':
      '<p>This Privacy Policy explains what information A-To-Do ("we", "us") collects when you use the A-To-Do to-do list application (the "Service"), and what we do -- and don\'t do -- with it.</p>' +
      '<p>The controller of your personal data is <strong>Male Niti, zajednički obrt za usluge programiranja, vl. Nikola Novak i Mateja Šafarić Novak, Slakovec, Slakovec 80</strong>, 40305 Nedelišće, Croatia (short name: Male Niti, vl. Nikola Novak i Mateja Šafarić Novak), OIB 79072017892. You can reach us about your data at <a href="mailto:support@maleniti.com">support@maleniti.com</a> or through our <a href="support.html?topic=account">support form</a> (see section 9).</p>',
    'privacy.s1':
      "<h2>1. Information we collect</h2><ul><li><strong>Account information:</strong> the email address and password you register with. Your password is never stored in plain text.</li><li><strong>Content you create:</strong> the tasks, notes, and settings you enter into the Service.</li><li><strong>Payment information:</strong> if you subscribe to a paid plan, payment is handled entirely by our payment processor (Stripe). We never see or store your card details ourselves.</li><li><strong>Payment receipts:</strong> for every payment, the fiscalized receipt we're required by law to issue (see section 4).</li><li><strong>Support messages:</strong> what you send us through the <a href=\"support.html\">support form</a> -- your name, email address and message, the account it was sent from if you were logged in, and, to help us look into problems, the app version, the page you came from, your language and your browser.</li></ul>",
    'privacy.s2':
      "<h2>2. No analytics, no tracking</h2><p>We do not run any analytics, advertising, or tracking of any kind on the Service. We don't use tracking cookies, and we don't share or sell your information to third parties for advertising or any other purpose.</p>",
    'privacy.s3':
      "<h2>3. How your data is used</h2><p>Your account information and content are used solely to provide the Service to you -- to show you your tasks, remember your settings, and manage your subscription, if you have one.</p><p>We may also look at your data -- for example, the tasks and notes in your account -- to reproduce and fix a bug or other technical issue you report, or that we otherwise discover. We only do this as needed to investigate and resolve the specific issue, not to analyze your content for any other purpose.</p><p>Support messages are used only to answer them and to look into what they report.</p>",
    'privacy.s4':
      "<h2>4. Data retention and deletion</h2><p>You can export a copy of your data or delete your account at any time from Settings.</p><p><strong>When you delete your account,</strong> every task, note, and setting in it is deleted immediately and can't be restored. For 12 months afterwards we keep only three things: your email address, your password (hashed, never readable), and whether the account has had a free trial or a paid subscription. We keep them so that your email address stays yours -- no one else can register with it or switch their account to it -- and so that deleting and re-creating an account doesn't grant another free trial. If you log in again during those 12 months, the account is reopened, empty, without a new free trial. After 12 months these details are deleted as well.</p><p><strong>Automatic deletion:</strong> if you don't log in for 12 consecutive months, your account is deleted in the same way. There is no way to recover its data after this happens -- we recommend downloading a copy of your data before an extended absence if you'd like to keep it. If you have an active paid subscription, you can instead schedule your account for deletion when that subscription ends, rather than losing access to it immediately -- see Settings.</p><p><strong>Records we're required by law to keep:</strong> for every payment we issue a fiscalized receipt, as Croatian law requires. It records the receipt number, the date and time, what was paid for, the amount, the payment method, and the email address it was sent to. Croatian accounting law requires us to keep receipts, unchanged, for 11 years from the end of the year they were issued in -- even if you delete your account. After that they're deleted.</p><p><strong>Support messages</strong> are kept as long as we need them to handle your request and any follow-up to it, and a complaint with our answer to it as long as the law requires. Deleting your account detaches your messages from it.</p>",
    'privacy.s5':
      "<h2>5. Data sharing</h2><p>We don't sell or share your personal information with third parties, except:</p><ul><li>Our payment processor (Stripe), solely to process a subscription payment you initiate. Stripe keeps its own records of the payments it processes, as the law requires of it, under its own privacy policy.</li><li>The Croatian Tax Administration, which receives each receipt for fiscalization: our business details, the receipt number, date, and amount -- nothing about you.</li><li>Where required to comply with a legal obligation.</li></ul>",
    'privacy.s6':
      '<h2>6. Your rights</h2><p>You can, at any time and without contacting us:</p><ul><li>Download a copy of all data associated with your account, from Settings.</li><li>Correct your account information (nickname, email-related settings) from Settings.</li><li>Delete your account and all its data, from Settings (see section 4 for what is kept afterwards, and for how long).</li></ul><p>If you have any other request regarding your personal data, contact us using the details below.</p>',
    'privacy.s7':
      "<h2>7. Children's privacy</h2><p>The Service is not directed at, and we do not knowingly collect information from, anyone under the age of 16.</p>",
    'privacy.s8':
      '<h2>8. Changes to this policy</h2><p>We may update this Privacy Policy from time to time. We\'ll update the "Last updated" date above when we do. Continued use of the Service after a change means you accept the updated policy.</p>',
    'privacy.s9':
      '<h2>9. Contact us</h2><p>Questions about this policy or your data? Write to us at <a href="mailto:support@maleniti.com">support@maleniti.com</a> or through our <a href="support.html?topic=account">support form</a>.</p>' +
      '<p>If you believe we process your data unlawfully, you also have the right to lodge a complaint with the Croatian data protection authority, the Agencija za zaštitu osobnih podataka (<a href="https://azop.hr" rel="noopener">azop.hr</a>).</p>',
  },
  hr: {
    'nav.login': 'Prijava',
    'nav.faq': 'Česta pitanja',
    'nav.support': 'Kontakt podrške',
    'nav.privacy': 'Pravila privatnosti',
    'nav.terms': 'Uvjeti korištenja',
    'privacy.pageTitle': 'Pravila privatnosti',
    'privacy.updated': 'Zadnje ažurirano: 8. listopada 2026.',
    'privacy.intro':
      '<p>Ova Pravila privatnosti objašnjavaju koje podatke A-To-Do ("mi") prikuplja kada koristite aplikaciju za popis obveza A-To-Do ("Usluga"), te što s njima radimo -- a što ne.</p>' +
      '<p>Voditelj obrade vaših osobnih podataka je <strong>Male Niti, zajednički obrt za usluge programiranja, vl. Nikola Novak i Mateja Šafarić Novak, Slakovec, Slakovec 80</strong>, 40305 Nedelišće, Hrvatska (skraćeni naziv: Male Niti, vl. Nikola Novak i Mateja Šafarić Novak), OIB 79072017892. U vezi sa svojim podacima možete nam se obratiti na <a href="mailto:support@maleniti.com">support@maleniti.com</a> ili putem našeg <a href="support.html?topic=account">obrasca za podršku</a> (vidi točku 9.).</p>',
    'privacy.s1':
      "<h2>1. Podaci koje prikupljamo</h2><ul><li><strong>Podaci o računu:</strong> e-mail adresa i lozinka s kojima se registrirate. Vaša lozinka nikada se ne pohranjuje u čitljivom obliku.</li><li><strong>Sadržaj koji stvarate:</strong> zadaci, bilješke i postavke koje unosite u Uslugu.</li><li><strong>Podaci o plaćanju:</strong> ako se pretplatite na plaćeni plan, plaćanje u potpunosti obrađuje naš obrađivač plaćanja (Stripe). Mi nikada ne vidimo niti pohranjujemo podatke vaše kartice.</li><li><strong>Računi za plaćanja:</strong> za svako plaćanje, fiskalizirani račun koji smo po zakonu dužni izdati (vidi odjeljak 4.).</li><li><strong>Poruke podršci:</strong> ono što nam pošaljete putem <a href=\"support.html\">obrasca za podršku</a> -- vaše ime, e-mail adresa i poruka, račun s kojeg je poslana ako ste bili prijavljeni te, kako bismo lakše istražili probleme, verzija aplikacije, stranica s koje ste došli, vaš jezik i preglednik.</li></ul>",
    'privacy.s2':
      '<h2>2. Bez analitike, bez praćenja</h2><p>Ne provodimo nikakvu analitiku, oglašavanje ili praćenje na Usluzi. Ne koristimo kolačiće za praćenje, te ne dijelimo niti prodajemo vaše podatke trećim stranama u svrhu oglašavanja ili bilo koju drugu svrhu.</p>',
    'privacy.s3':
      '<h2>3. Kako se vaši podaci koriste</h2><p>Podaci o vašem računu i sadržaj koriste se isključivo za pružanje Usluge vama -- za prikaz vaših zadataka, pamćenje vaših postavki i upravljanje vašom pretplatom, ako je imate.</p><p>Također možemo pogledati vaše podatke -- primjerice, zadatke i bilješke na vašem računu -- radi reprodukcije i otklanjanja greške ili drugog tehničkog problema koji prijavite, ili koji sami otkrijemo. To radimo samo u mjeri potrebnoj za istraživanje i rješavanje konkretnog problema, a ne radi analize vašeg sadržaja u bilo koju drugu svrhu.</p><p>Poruke podršci upotrebljavamo samo kako bismo na njih odgovorili i istražili ono što prijavljuju.</p>',
    'privacy.s4':
      "<h2>4. Čuvanje i brisanje podataka</h2><p>Kopiju svojih podataka možete preuzeti, ili izbrisati svoj račun, u bilo kojem trenutku putem Postavki.</p><p><strong>Kada izbrišete svoj račun,</strong> svaki zadatak, bilješka i postavka na njemu odmah se briše i ne može se vratiti. Sljedećih 12 mjeseci čuvamo samo tri stvari: vašu e-mail adresu, vašu lozinku (u obliku sažetka, nikada čitljivu) i podatak je li račun imao besplatno probno razdoblje ili plaćenu pretplatu. Čuvamo ih kako bi vaša e-mail adresa ostala vaša -- nitko se drugi s njom ne može registrirati niti na nju prebaciti svoj račun -- i kako brisanje i ponovno otvaranje računa ne bi donijelo novo besplatno probno razdoblje. Ako se u tih 12 mjeseci ponovno prijavite, račun se ponovno otvara, prazan, bez novog besplatnog probnog razdoblja. Nakon 12 mjeseci brišu se i ti podaci.</p><p><strong>Automatsko brisanje:</strong> ako se ne prijavite 12 mjeseci zaredom, vaš se račun briše na isti način. Nakon toga njegove podatke nije moguće vratiti -- preporučujemo da preuzmete kopiju svojih podataka prije duljeg izbivanja ako ih želite sačuvati. Ako imate aktivnu plaćenu pretplatu, umjesto toga možete zakazati brisanje računa za trenutak isteka te pretplate, kako ne biste odmah izgubili pristup -- pogledajte Postavke.</p><p><strong>Zapisi koje smo po zakonu dužni čuvati:</strong> za svako plaćanje izdajemo fiskalizirani račun, kako to nalaže hrvatski zakon. Na njemu su broj računa, datum i vrijeme, što je plaćeno, iznos, način plaćanja i e-mail adresa na koju je poslan. Hrvatski propisi o računovodstvu nalažu da račune čuvamo, nepromijenjene, 11 godina od kraja godine u kojoj su izdani -- i nakon brisanja vašeg računa. Nakon toga se brišu.</p><p><strong>Poruke podršci</strong> čuvamo dok su nam potrebne za rješavanje vašeg zahtjeva i daljnju komunikaciju o njemu, a prigovor i naš odgovor na njega onoliko dugo koliko propisi nalažu. Brisanjem računa poruke se od njega odvajaju.</p>",
    'privacy.s5':
      "<h2>5. Dijeljenje podataka</h2><p>Ne prodajemo niti dijelimo vaše osobne podatke s trećim stranama, osim:</p><ul><li>Našeg obrađivača plaćanja (Stripe), isključivo radi obrade plaćanja pretplate koje sami pokrenete. Stripe čuva vlastite zapise o plaćanjima koja obrađuje, kako to od njega zahtijeva zakon, u skladu sa svojim pravilima privatnosti.</li><li>Porezne uprave Republike Hrvatske, koja radi fiskalizacije prima svaki račun: podatke o našem poslovanju, broj računa, datum i iznos -- ništa o vama.</li><li>Kada je to potrebno radi usklađenosti sa zakonskom obvezom.</li></ul>",
    'privacy.s6':
      '<h2>6. Vaša prava</h2><p>U bilo kojem trenutku, bez potrebe da nas kontaktirate, možete:</p><ul><li>Preuzeti kopiju svih podataka vezanih uz vaš račun, putem Postavki.</li><li>Ispraviti podatke svog računa (nadimak, postavke vezane uz e-mail) putem Postavki.</li><li>Izbrisati svoj račun i sve njegove podatke, putem Postavki (vidi odjeljak 4. o tome što se nakon toga čuva i koliko dugo).</li></ul><p>Ako imate bilo kakav drugi zahtjev vezan uz vaše osobne podatke, kontaktirajte nas putem podataka navedenih ispod.</p>',
    'privacy.s7':
      '<h2>7. Privatnost djece</h2><p>Usluga nije namijenjena, i mi svjesno ne prikupljamo podatke, od osoba mlađih od 16 godina.</p>',
    'privacy.s8':
      '<h2>8. Izmjene ovih pravila</h2><p>Ova Pravila privatnosti povremeno možemo ažurirati. Datum "Zadnje ažurirano" iznad ćemo ažurirati kada to učinimo. Nastavak korištenja Usluge nakon izmjene znači da prihvaćate ažurirana pravila.</p>',
    'privacy.s9':
      '<h2>9. Kontaktirajte nas</h2><p>Imate pitanja o ovim pravilima ili svojim podacima? Pišite nam na <a href="mailto:support@maleniti.com">support@maleniti.com</a> ili putem našeg <a href="support.html?topic=account">obrasca za podršku</a>.</p>' +
      '<p>Smatrate li da vaše podatke obrađujemo nezakonito, imate pravo podnijeti pritužbu Agenciji za zaštitu osobnih podataka (<a href="https://azop.hr" rel="noopener">azop.hr</a>).</p>',
  },
};

initSitePage(PRIVACY_I18N);
