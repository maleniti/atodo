// Checkout flow -- creates a real Stripe Checkout session server-side (see
// api-spec.yaml's POST /subscriptions/checkout-sessions) and redirects the
// browser to Stripe's own hosted page. This same page is also where Stripe
// redirects back to once the visitor finishes paying (successUrl points
// here, with a `session_id` -- see runCheckout below): it then polls
// GET /subscriptions/checkout-sessions/{sessionId} until the backend's own
// webhook-driven confirmation catches up, before finally forwarding on to
// success.html. cancelUrl points straight at cancel.html instead, since
// there's nothing to confirm/wait for on a cancelled payment. Depends on
// auth.js (see checkout.html) for apiFetch/AUTH_TOKEN_KEY/
// getCurrentUserIdFromStoredToken/createCheckoutSession/
// getCheckoutSessionStatus, and site-i18n.js for initSitePage/
// getStoredMarketingLanguage.

function planPrice(billingInterval) {
  return billingInterval === 'annual' ? '€20/year' : '€2/month';
}

const CHECKOUT_I18N = {
  en: {
    'checkout.title': 'Processing your payment…',
    'checkout.summaryDefault': 'Setting up your subscription.',
    'checkout.summary': 'Subscribing to A-To-Do Pro – {price}.',
    'checkout.cancelLink': 'Cancel',
    'nav.privacy': 'Privacy Policy',
    'nav.terms': 'Terms of Service',
  },
  hr: {
    'checkout.title': 'Obrada plaćanja…',
    'checkout.summaryDefault': 'Postavljanje vaše pretplate.',
    'checkout.summary': 'Pretplata na A-To-Do Pro – {price}.',
    'checkout.cancelLink': 'Odustani',
    'nav.privacy': 'Pravila privatnosti',
    'nav.terms': 'Uvjeti korištenja',
  },
};

const params = new URLSearchParams(location.search);
const plan = params.get('plan') === 'annual' ? 'annual' : 'monthly';
const returningSessionId = params.get('session_id');

// Re-rendered on every language change (initial resolution or a toggle
// click, see initSitePage) since it's built from `plan`, not a plain
// data-i18n swap.
function renderPlanSummary(lang) {
  const summary = (CHECKOUT_I18N[lang] || CHECKOUT_I18N.en)['checkout.summary'];
  document.getElementById('checkout-plan-summary').textContent = summary.replace('{price}', planPrice(plan));
}

// Polls on an interval until the session's status isn't 'pending' anymore
// -- real payment confirmation happens on Stripe's own page before this
// even runs, but the backend's own record of it (via Stripe's webhook) can
// lag the redirect back here by a moment.
function pollCheckoutSessionStatus(sessionId) {
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      let result;
      try {
        result = await getCheckoutSessionStatus(sessionId);
      } catch (err) {
        clearInterval(interval);
        reject(err);
        return;
      }
      if (result.status !== 'pending') {
        clearInterval(interval);
        resolve(result);
      }
    }, 1500);
  });
}

async function runCheckout() {
  document.getElementById('checkout-cancel-link').href = `cancel.html?plan=${encodeURIComponent(plan)}`;

  // Shouldn't normally happen -- landing.js only sends already-logged-in
  // visitors straight here -- but a direct/bookmarked visit to this URL
  // without a token has nothing to create a checkout session (or resume
  // polling one) for.
  const userId = getCurrentUserIdFromStoredToken();
  if (!userId) {
    location.href = `index.html?next=checkout&plan=${encodeURIComponent(plan)}&lang=${getStoredMarketingLanguage() || 'en'}`;
    return;
  }

  try {
    if (returningSessionId) {
      // Stripe just redirected back here with a completed (or abandoned)
      // session -- resume polling it instead of starting a new one.
      const result = await pollCheckoutSessionStatus(returningSessionId);
      if (result.status === 'paid') {
        if (result.token) localStorage.setItem(AUTH_TOKEN_KEY, result.token);
        location.href = 'success.html';
      } else {
        location.href = `cancel.html?plan=${encodeURIComponent(plan)}`;
      }
      return;
    }

    // {CHECKOUT_SESSION_ID} is Stripe Checkout's own success_url
    // placeholder -- Stripe substitutes it with the real session id before
    // redirecting back, which is how returningSessionId above gets set.
    const successUrl = `${location.origin}${location.pathname}?plan=${encodeURIComponent(plan)}&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${location.origin}/cancel.html?plan=${encodeURIComponent(plan)}`;
    const { checkoutUrl } = await createCheckoutSession(plan, successUrl, cancelUrl);
    location.href = checkoutUrl;
  } catch {
    location.href = `cancel.html?plan=${encodeURIComponent(plan)}`;
  }
}

initSitePage(CHECKOUT_I18N, renderPlanSummary);
runCheckout();
