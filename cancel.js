// Checkout-cancelled page -- also where checkout.js sends a visitor it
// couldn't (or mustn't) take a payment from, with ?reason= saying why:
//   unavailable -- payments are off right now;
//   subscribed  -- the account already has an active subscription: on to
//                  the to-do list instead;
//   resumable   -- it has a cancelled subscription whose paid period is
//                  still running: a new one would charge again for time
//                  already paid for, so it's offered to resume that one
//                  (POST /subscriptions/resume, auth.js) -- renewing again
//                  at the period's end, nothing charged now.
// Depends on auth.js (and config.js) for that, and site-i18n.js.

const CANCEL_I18N = {
  en: {
    'cancel.title': 'No charge made',
    'cancel.body': "Your payment was cancelled and you haven't been charged. You can pick a plan again any time.",
    'cancel.backToPricing': 'Back to pricing',
    'cancel.toTodoList': 'Go to my to-do list',
    'cancel.unavailableTitle': 'Payments are unavailable right now',
    'cancel.unavailableBody': "We can't take payments at the moment, so nothing was charged. Please try again later.",
    'cancel.subscribedTitle': "You're already subscribed",
    'cancel.subscribedBody': 'This account already has an active Pro subscription, so nothing was charged. You can manage it in Settings.',
    'cancel.resumableTitle': 'Your subscription is cancelled, but still active',
    'cancel.resumableBody': "It's paid up and stays active until it ends, so nothing was charged. Resume it to keep it renewing - you won't be charged anything until then.",
    'cancel.resumableBodyDated': "Your {interval} subscription is paid up until {date}, so nothing was charged. Resume it to keep it renewing - you won't be charged anything until then.",
    'cancel.resume': 'Resume subscription',
    'cancel.resumedTitle': 'Subscription resumed',
    'cancel.resumedBody': 'Your subscription will renew again at the end of the period you already paid for. Nothing was charged now.',
    'cancel.resumedBodyDated': 'Your {interval} subscription will renew on {date}. Nothing was charged now.',
    'cancel.resumeFailed': "Your subscription couldn't be resumed. Please try again, or resume it in Settings.",
    'cancel.monthly': 'monthly',
    'cancel.annual': 'yearly',
    'nav.privacy': 'Privacy Policy',
    'nav.terms': 'Terms of Service',
  },
  hr: {
    'cancel.title': 'Nije izvršeno plaćanje',
    'cancel.body': 'Vaše plaćanje je otkazano i niste naplaćeni. Plan možete odabrati ponovno u bilo kojem trenutku.',
    'cancel.backToPricing': 'Povratak na cijene',
    'cancel.toTodoList': 'Na moj popis obveza',
    'cancel.unavailableTitle': 'Plaćanje trenutno nije moguće',
    'cancel.unavailableBody': 'Plaćanja trenutno ne možemo primati, pa ništa nije naplaćeno. Pokušajte ponovno kasnije.',
    'cancel.subscribedTitle': 'Već imate pretplatu',
    'cancel.subscribedBody': 'Ovaj račun već ima aktivnu Pro pretplatu, pa ništa nije naplaćeno. Njome možete upravljati u Postavkama.',
    'cancel.resumableTitle': 'Vaša je pretplata otkazana, ali još je aktivna',
    'cancel.resumableBody': 'Plaćena je i aktivna je do isteka, pa ništa nije naplaćeno. Nastavite je kako bi se i dalje obnavljala - do tada vam se ništa neće naplatiti.',
    'cancel.resumableBodyDated': 'Vaša {interval} pretplata plaćena je do {date}, pa ništa nije naplaćeno. Nastavite je kako bi se i dalje obnavljala - do tada vam se ništa neće naplatiti.',
    'cancel.resume': 'Nastavi pretplatu',
    'cancel.resumedTitle': 'Pretplata je nastavljena',
    'cancel.resumedBody': 'Vaša će se pretplata ponovno obnoviti na kraju već plaćenog razdoblja. Sada ništa nije naplaćeno.',
    'cancel.resumedBodyDated': 'Vaša {interval} pretplata obnovit će se {date} – sada ništa nije naplaćeno.',
    'cancel.resumeFailed': 'Pretplatu nije bilo moguće nastaviti. Pokušajte ponovno ili je nastavite u Postavkama.',
    'cancel.monthly': 'mjesečna',
    'cancel.annual': 'godišnja',
    'nav.privacy': 'Pravila privatnosti',
    'nav.terms': 'Uvjeti korištenja',
  },
};

const reason = new URLSearchParams(location.search).get('reason');
const titleEl = document.querySelector('[data-i18n="cancel.title"]');
const bodyEl = document.getElementById('cancel-body');
const resumeBtn = document.getElementById('resume-btn');
const todoListLink = document.getElementById('todo-list-link');
const pricingLink = document.getElementById('pricing-link');
let pageLanguage = 'en';
let subscription = null; // the account's, once known (resumable only)
let resumed = false;

if (reason === 'unavailable' || reason === 'subscribed' || reason === 'resumable') {
  titleEl.dataset.i18n = `cancel.${reason}Title`;
  bodyEl.dataset.i18n = `cancel.${reason}Body`;
}
if (reason === 'subscribed' || reason === 'resumable') {
  // Nothing to pick on the pricing page for an account that's subscribed.
  pricingLink.classList.add('hidden');
  todoListLink.classList.remove('hidden');
}
if (reason === 'resumable') {
  resumeBtn.classList.remove('hidden');
  todoListLink.classList.add('btn-secondary-flow');
}

// The texts that name the subscription's interval and end date, once known
// (they're plain data-i18n otherwise).
function renderDatedTexts(lang) {
  pageLanguage = lang;
  const strings = CANCEL_I18N[lang] || CANCEL_I18N.en;
  if (resumed) {
    titleEl.textContent = strings['cancel.resumedTitle'];
  }
  if (!subscription || !subscription.expiresAt) {
    if (resumed) bodyEl.textContent = strings['cancel.resumedBody'];
    return;
  }
  const date = new Date(subscription.expiresAt).toLocaleDateString(lang === 'hr' ? 'hr-HR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const interval = strings[subscription.billingInterval === 'annual' ? 'cancel.annual' : 'cancel.monthly'];
  bodyEl.textContent = strings[resumed ? 'cancel.resumedBodyDated' : 'cancel.resumableBodyDated']
    .replace('{interval}', interval).replace('{date}', date);
}

resumeBtn.onclick = async () => {
  resumeBtn.disabled = true;
  try {
    const { token, user } = await resumeSubscription();
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    subscription = user.subscription;
    resumed = true;
    delete titleEl.dataset.i18n;
    delete bodyEl.dataset.i18n;
    resumeBtn.classList.add('hidden');
    todoListLink.classList.remove('btn-secondary-flow');
    renderDatedTexts(pageLanguage);
  } catch (err) {
    console.error('Resuming the subscription failed:', err);
    resumeBtn.disabled = false;
    delete bodyEl.dataset.i18n;
    bodyEl.textContent = (CANCEL_I18N[pageLanguage] || CANCEL_I18N.en)['cancel.resumeFailed'];
  }
};

initSitePage(CANCEL_I18N, renderDatedTexts);

// Which subscription it is, and until when it's paid -- for the texts above.
if (reason === 'resumable' && getCurrentUserIdFromStoredToken()) {
  apiFetch('/auth/me')
    .then((user) => {
      subscription = user.subscription;
      if (!resumed) delete bodyEl.dataset.i18n;
      renderDatedTexts(pageLanguage);
    })
    .catch((err) => console.error('Failed to load the subscription:', err));
}
