// Support page -- A-To-Do's contact form: billing, account trouble, bugs,
// suggestions, complaints. POST /atodo/v1/support (auth.js's apiFetch,
// which sends the stored session token if there is one, so a logged-in
// visitor's message is filed under their account -- and their name and
// email are filled in). Works logged out too: someone who can't log in
// needs it most. ?topic=<kind> preselects the topic (the FAQ links here
// that way). Depends on config.js, version.js (the client's version, sent
// along to help diagnose bugs), auth.js and site-i18n.js.

const SUPPORT_I18N = {
  en: {
    'nav.login': 'Log in',
    'nav.faq': 'FAQ',
    'nav.support': 'Contact support',
    'nav.privacy': 'Privacy Policy',
    'nav.terms': 'Terms of Service',
    'support.title': 'Contact support',
    'support.intro': 'Questions about billing, trouble with your account, a bug, an idea, a complaint? Write to us here. Many answers are already in the <a href="faq.html">FAQ</a>.',
    'support.name': 'Name',
    'support.email': 'Email',
    'support.accountNote': 'Sent from your account ({email}), so we can look into it right away.',
    'support.kind': 'What is it about?',
    'support.kindChoose': 'choose one…',
    'support.kindBilling': 'Billing & payments',
    'support.kindAccount': 'Account, login & data',
    'support.kindBug': "Something isn't working (bug)",
    'support.kindFeature': 'Feature suggestion',
    'support.kindComplaint': 'Complaint',
    'support.kindOther': 'Something else',
    'support.msg': 'Message',
    'support.hint.billing': 'Tell us what happened and when - e.g. a payment you don\'t recognise, a charge you didn\'t expect, or a refund you\'d like.',
    'support.hint.account': "If you can't log in, use the email address of the account - we'll reply to the address you enter above.",
    'support.hint.bug': 'What did you do, what did you expect, and what happened instead? Which device and browser? Screenshots help - we\'ll ask for them by email.',
    'support.hint.feature': 'What would you like A-To-Do to do, and what would it help you with?',
    'support.hint.complaint': 'Describe what you are complaining about. We confirm every complaint and answer it in writing within 15 days.',
    'support.hint.other': '',
    'support.consent': 'I agree that A-To-Do may use the details in this form to reply to my message. Details in the <a href="privacy.html">Privacy Policy</a>.',
    'support.replyTime': "We'll reply by email as soon as we can.",
    'support.send': 'Send',
    'support.sending': 'Sending…',
    'support.sent': "Thanks - your message has been sent. We'll reply by email.",
    'support.failed': "Your message couldn't be sent. Please try again in a moment.",
    'support.invalidEmail': 'Please enter a valid email address.',
  },
  hr: {
    'nav.login': 'Prijava',
    'nav.faq': 'Česta pitanja',
    'nav.support': 'Kontakt podrške',
    'nav.privacy': 'Pravila privatnosti',
    'nav.terms': 'Uvjeti korištenja',
    'support.title': 'Kontaktirajte podršku',
    'support.intro': 'Pitanja o naplati, problemi s računom, greška, ideja, prigovor? Pišite nam ovdje. Mnogi su odgovori već u <a href="faq.html">čestim pitanjima</a>.',
    'support.name': 'Ime',
    'support.email': 'E-mail',
    'support.accountNote': 'Šalje se s vašeg računa ({email}), pa to odmah možemo provjeriti.',
    'support.kind': 'O čemu se radi?',
    'support.kindChoose': 'odaberite…',
    'support.kindBilling': 'Naplata i plaćanja',
    'support.kindAccount': 'Račun, prijava i podaci',
    'support.kindBug': 'Nešto ne radi (greška)',
    'support.kindFeature': 'Prijedlog nove mogućnosti',
    'support.kindComplaint': 'Prigovor',
    'support.kindOther': 'Nešto drugo',
    'support.msg': 'Poruka',
    'support.hint.billing': 'Opišite što se i kada dogodilo - npr. plaćanje koje ne prepoznajete, neočekivana naplata ili povrat novca koji želite.',
    'support.hint.account': 'Ako se ne možete prijaviti, upišite e-mail adresu računa - odgovorit ćemo na adresu koju upišete gore.',
    'support.hint.bug': 'Što ste napravili, što ste očekivali i što se dogodilo umjesto toga? Koji uređaj i preglednik? Snimke zaslona pomažu - zatražit ćemo ih e-mailom.',
    'support.hint.feature': 'Što biste voljeli da A-To-Do radi i u čemu bi vam to pomoglo?',
    'support.hint.complaint': 'Opišite na što se prigovor odnosi. Svaki prigovor potvrđujemo i na njega pisano odgovaramo u roku od 15 dana.',
    'support.hint.other': '',
    'support.consent': 'Slažem se da A-To-Do upotrijebi podatke iz ovog obrasca kako bi odgovorio na moju poruku. Detalji u <a href="privacy.html">Pravilima privatnosti</a>.',
    'support.replyTime': 'Odgovorit ćemo e-mailom što je prije moguće.',
    'support.send': 'Pošalji',
    'support.sending': 'Šalje se…',
    'support.sent': 'Hvala - vaša je poruka poslana. Odgovorit ćemo e-mailom.',
    'support.failed': 'Poruku nije bilo moguće poslati. Pokušajte ponovno za trenutak.',
    'support.invalidEmail': 'Upišite ispravnu e-mail adresu.',
  },
};

const supportForm = document.getElementById('support-form');
const nameInput = document.getElementById('support-name');
const emailInput = document.getElementById('support-email');
const kindSelect = document.getElementById('support-kind');
const msgInput = document.getElementById('support-msg');
const consentInput = document.getElementById('support-consent');
const kindHintEl = document.getElementById('support-kind-hint');
const accountNoteEl = document.getElementById('support-account-note');
const statusEl = document.getElementById('support-status');
const submitBtn = document.getElementById('support-submit');
let supportLanguage = 'en';
let accountEmail = null;

const supportStrings = () => SUPPORT_I18N[supportLanguage] || SUPPORT_I18N.en;

function setStatus(key, kind = '') {
  statusEl.dataset.i18n = key;
  statusEl.textContent = supportStrings()[key];
  statusEl.className = `support-status${kind ? ` ${kind}` : ''}`;
}

// The texts that depend on more than the language: the topic's hint, and
// whose account the message goes out from.
function renderSupportExtras(lang) {
  supportLanguage = lang;
  const strings = supportStrings();
  kindHintEl.textContent = kindSelect.value ? strings[`support.hint.${kindSelect.value}`] || '' : '';
  accountNoteEl.textContent = accountEmail ? strings['support.accountNote'].replace('{email}', accountEmail) : '';
  accountNoteEl.classList.toggle('hidden', !accountEmail);
}

kindSelect.onchange = () => renderSupportExtras(supportLanguage);

const topic = new URLSearchParams(location.search).get('topic');
if (topic && kindSelect.querySelector(`option[value="${CSS.escape(topic)}"]`)) kindSelect.value = topic;

supportForm.onsubmit = async (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setStatus('support.invalidEmail', 'error');
    return;
  }
  submitBtn.disabled = true;
  setStatus('support.sending');
  try {
    await apiFetch('/support', {
      method: 'POST',
      body: {
        name: nameInput.value.trim(),
        email,
        kind: kindSelect.value,
        msg: msgInput.value.trim(),
        context: {
          appVersion: window.APP_VERSION || 'dev',
          page: document.referrer || location.href,
          language: supportLanguage,
          userAgent: navigator.userAgent,
        },
      },
    });
    setStatus('support.sent', 'success');
    msgInput.value = '';
    consentInput.checked = false;
  } catch (err) {
    console.error('Sending the support message failed:', err);
    setStatus(err.code === 'INVALID_EMAIL' ? 'support.invalidEmail' : 'support.failed', 'error');
  } finally {
    submitBtn.disabled = false;
  }
};

initSitePage(SUPPORT_I18N, renderSupportExtras);

// Logged in: fill in who's writing (still editable -- the reply goes to
// the email entered), and say the message goes out from the account.
if (getCurrentUserIdFromStoredToken()) {
  apiFetch('/auth/me')
    .then((user) => {
      accountEmail = user.email;
      if (!nameInput.value) nameInput.value = user.nickname || '';
      if (!emailInput.value) emailInput.value = user.email;
      renderSupportExtras(supportLanguage);
    })
    .catch(() => {});
}
