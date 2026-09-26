// Terms of Service page -- static legal content, no auth.js dependency,
// just site-i18n.js for language handling. Same one-key-per-section
// approach as privacy.js -- see its own comment for why.

const TERMS_I18N = {
  en: {
    'nav.login': 'Log in',
    'nav.privacy': 'Privacy Policy',
    'nav.terms': 'Terms of Service',
    'terms.pageTitle': 'Terms of Service',
    'terms.updated': 'Last updated: 26 September 2026',
    'terms.intro':
      '<p>These Terms of Service ("Terms") govern your use of the A-To-Do to-do list application (the "Service"), operated by [Legal entity name] ("we", "us"). By creating an account or otherwise using the Service, you agree to these Terms.</p>',
    'terms.s1':
      "<h2>1. The Service</h2><p>A-To-Do is a to-do list application with recurring tasks, overdue/failed-appointment tracking, work timers, and per-task notes. It's offered on a Free plan and a paid Pro plan.</p>",
    'terms.s2':
      '<h2>2. Plans and pricing</h2><ul><li><strong>Free:</strong> up to 10 one-off tasks, 5 recurring tasks, and 5 notes per task.</li><li><strong>Pro:</strong> unlimited tasks and notes, billed at &euro;2/month or &euro;20/year, whichever you choose at checkout.</li></ul><p>We may change these prices or limits going forward; if we do, we\'ll give existing subscribers reasonable advance notice before it applies to their next billing period.</p>',
    'terms.s3':
      "<h2>3. Accounts</h2><p>You need an account (email and password) to use the Service. You're responsible for keeping your password confidential and for anything that happens under your account. Let us know if you believe your account has been accessed without your permission.</p>",
    'terms.s4':
      "<h2>4. Subscriptions and billing</h2><ul><li>A Pro subscription is billed in advance, either monthly or yearly, and renews automatically until cancelled.</li><li>Payment is processed by our third-party payment processor (Stripe); we don't store your card details.</li><li>You can cancel anytime from Settings. Cancelling stops future renewal, but you keep Pro access until the end of the billing period you already paid for -- we don't provide partial refunds for the remaining time in a period.</li><li>If your subscription lapses (expires without renewing), any tasks or notes beyond the Free plan's limits are kept but frozen -- viewable, but not completable or editable -- until you resubscribe.</li></ul>",
    'terms.s5':
      '<h2>5. Your content</h2><p>You own the tasks, notes, and other content you create in the Service. We don\'t claim any ownership over it, and we only use it to provide the Service to you (see our <a href="privacy.html">Privacy Policy</a>).</p>',
    'terms.s6':
      "<h2>6. Acceptable use</h2><p>Please don't use the Service to store or transmit anything unlawful, to attempt to disrupt or gain unauthorized access to the Service, or to violate anyone else's rights.</p>",
    'terms.s7':
      '<h2>7. Deleting your account</h2><p>You can delete your account and all associated data at any time from Settings; this takes effect immediately and the data can\'t be restored. For 12 months afterwards we keep only your email address, password and whether you\'ve had a free trial or subscription: logging in again during that time reopens the account, empty, without a new free trial. If you have an active paid subscription, deleting immediately forfeits the remainder of your paid period with no refund; you can instead schedule deletion for when your subscription ends, keeping full access until then (this also cancels the subscription). Accounts that go unused for 12 consecutive months are also deleted automatically -- see our <a href="privacy.html">Privacy Policy</a> for details.</p>',
    'terms.s8':
      '<h2>8. Termination</h2><p>We may suspend or terminate your access to the Service if you violate these Terms. You may stop using the Service, and delete your account, at any time.</p>',
    'terms.s9':
      '<h2>9. Disclaimer of warranties</h2><p>The Service is provided "as is", without warranties of any kind, express or implied, to the maximum extent permitted by law. We don\'t guarantee the Service will be uninterrupted, error-free, or that your data will never be lost -- please keep your own backups (Settings lets you export your data at any time).</p>',
    'terms.s10':
      "<h2>10. Limitation of liability</h2><p>To the maximum extent permitted by law, we won't be liable for any indirect, incidental, or consequential damages arising from your use of the Service.</p>",
    'terms.s11':
      '<h2>11. Changes to these Terms</h2><p>We may update these Terms from time to time. We\'ll update the "Last updated" date above when we do. Continued use of the Service after a change means you accept the updated Terms.</p>',
    'terms.s12':
      '<h2>12. Governing law</h2><p>These Terms are governed by the laws of [Jurisdiction], without regard to its conflict-of-laws principles.</p>',
    'terms.s13':
      '<h2>13. Contact us</h2><p>Questions about these Terms? Contact us at <a href="mailto:support@a-to-do.example">support@a-to-do.example</a>.</p>',
  },
  hr: {
    'nav.login': 'Prijava',
    'nav.privacy': 'Pravila privatnosti',
    'nav.terms': 'Uvjeti korištenja',
    'terms.pageTitle': 'Uvjeti korištenja',
    'terms.updated': 'Zadnje ažurirano: 26. rujna 2026.',
    'terms.intro':
      '<p>Ovi Uvjeti korištenja ("Uvjeti") uređuju vaše korištenje aplikacije za popis obveza A-To-Do ("Usluga"), koju operativno vodi [Naziv pravnog subjekta] ("mi"). Otvaranjem računa ili korištenjem Usluge na drugi način, prihvaćate ove Uvjete.</p>',
    'terms.s1':
      '<h2>1. Usluga</h2><p>A-To-Do je aplikacija za popis obveza s ponavljajućim zadacima, praćenjem zakašnjelih/neuspjelih termina, mjeračima vremena rada i bilješkama po zadatku. Nudi se u besplatnom planu i plaćenom Pro planu.</p>',
    'terms.s2':
      '<h2>2. Planovi i cijene</h2><ul><li><strong>Besplatno:</strong> do 10 jednokratnih zadataka, 5 ponavljajućih zadataka i 5 bilješki po zadatku.</li><li><strong>Pro:</strong> neograničen broj zadataka i bilješki, naplata &euro;2/mjesečno ili &euro;20/godišnje, prema vašem odabiru pri plaćanju.</li></ul><p>Ove cijene ili ograničenja mogu se ubuduće promijeniti; ako se to dogodi, postojećim pretplatnicima dat ćemo razumnu obavijest unaprijed prije nego što se primijeni na njihovo sljedeće razdoblje naplate.</p>',
    'terms.s3':
      '<h2>3. Računi</h2><p>Za korištenje Usluge potreban vam je račun (e-mail i lozinka). Odgovorni ste za čuvanje tajnosti svoje lozinke i za sve što se dogodi putem vašeg računa. Obavijestite nas ako smatrate da je vašem računu pristupljeno bez vašeg dopuštenja.</p>',
    'terms.s4':
      '<h2>4. Pretplate i naplata</h2><ul><li>Pro pretplata naplaćuje se unaprijed, mjesečno ili godišnje, i automatski se obnavlja do otkazivanja.</li><li>Plaćanje obrađuje naš vanjski obrađivač plaćanja (Stripe); mi ne pohranjujemo podatke vaše kartice.</li><li>Pretplatu možete otkazati u bilo kojem trenutku putem Postavki. Otkazivanje zaustavlja buduću obnovu, ali Pro pristup zadržavate do kraja razdoblja naplate koje ste već platili -- ne vraćamo razmjerni dio novca za preostalo vrijeme razdoblja.</li><li>Ako vaša pretplata istekne (bez obnove), svi zadaci ili bilješke izvan ograničenja besplatnog plana ostaju sačuvani, ali zamrznuti -- vidljivi, no ne mogu se dovršiti niti urediti -- dok se ponovno ne pretplatite.</li></ul>',
    'terms.s5':
      '<h2>5. Vaš sadržaj</h2><p>Vlasnik zadataka, bilješki i drugog sadržaja koji stvarate u Usluzi ste vi. Ne polažemo nikakvo vlasništvo nad njime, te ga koristimo isključivo za pružanje Usluge vama (pogledajte naša <a href="privacy.html">Pravila privatnosti</a>).</p>',
    'terms.s6':
      '<h2>6. Prihvatljivo korištenje</h2><p>Molimo ne koristite Uslugu za pohranu ili prijenos nezakonitog sadržaja, za pokušaj narušavanja rada ili neovlaštenog pristupa Usluzi, ili za povredu prava drugih osoba.</p>',
    'terms.s7':
      '<h2>7. Brisanje vašeg računa</h2><p>Svoj račun i sve povezane podatke možete izbrisati u bilo kojem trenutku putem Postavki; to stupa na snagu odmah i podaci se ne mogu vratiti. Sljedećih 12 mjeseci čuvamo samo vašu e-mail adresu, lozinku i podatak jeste li imali besplatno probno razdoblje ili pretplatu: ponovna prijava u tom razdoblju ponovno otvara račun, prazan, bez novog besplatnog probnog razdoblja. Ako imate aktivnu plaćenu pretplatu, trenutačno brisanje znači gubitak preostalog plaćenog razdoblja bez povrata novca; umjesto toga možete zakazati brisanje za trenutak isteka pretplate, čime pristup zadržavate do tada (ovime se pretplata i otkazuje). Računi koji se ne koriste 12 mjeseci zaredom također se automatski brišu -- pogledajte naša <a href="privacy.html">Pravila privatnosti</a> za detalje.</p>',
    'terms.s8':
      '<h2>8. Prestanak</h2><p>Vaš pristup Usluzi možemo suspendirati ili prekinuti ako prekršite ove Uvjete. Korištenje Usluge, i brisanje svog računa, možete prekinuti u bilo kojem trenutku.</p>',
    'terms.s9':
      '<h2>9. Odricanje od jamstava</h2><p>Usluga se pruža "takva kakva je", bez jamstava bilo koje vrste, izričitih ili implicitnih, u najvećoj mjeri dopuštenoj zakonom. Ne garantiramo da će Usluga biti neprekidna, bez pogrešaka, ili da vaši podaci nikada neće biti izgubljeni -- molimo izradite vlastite sigurnosne kopije (Postavke vam u bilo kojem trenutku omogućuju izvoz podataka).</p>',
    'terms.s10':
      '<h2>10. Ograničenje odgovornosti</h2><p>U najvećoj mjeri dopuštenoj zakonom, nećemo biti odgovorni za bilo kakvu neizravnu, slučajnu ili posljedičnu štetu koja proizlazi iz vašeg korištenja Usluge.</p>',
    'terms.s11':
      '<h2>11. Izmjene ovih Uvjeta</h2><p>Ove Uvjete povremeno možemo ažurirati. Datum "Zadnje ažurirano" iznad ćemo ažurirati kada to učinimo. Nastavak korištenja Usluge nakon izmjene znači da prihvaćate ažurirane Uvjete.</p>',
    'terms.s12':
      '<h2>12. Mjerodavno pravo</h2><p>Ovi Uvjeti podliježu zakonima [Jurisdikcija], bez obzira na njihova pravila o sukobu zakona.</p>',
    'terms.s13':
      '<h2>13. Kontaktirajte nas</h2><p>Imate pitanja o ovim Uvjetima? Kontaktirajte nas na <a href="mailto:support@a-to-do.example">support@a-to-do.example</a>.</p>',
  },
};

initSitePage(TERMS_I18N);
