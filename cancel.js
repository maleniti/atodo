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
  const strings = siteStrings();
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
    bodyEl.textContent = pageText('cancel.resumeFailed');
  }
};

initSitePage('cancel', renderDatedTexts);

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
