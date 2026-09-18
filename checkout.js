// Mock checkout "processing" page -- stands in for the round trip through a
// real Stripe Checkout session (create session -> redirect to Stripe ->
// Stripe redirects back here once paid) that doesn't exist yet, since Stripe
// integration is backend work for later. Depends on auth.js (see
// checkout.html) for getCurrentUserIdFromStoredToken/startPaidSubscription/
// AUTH_TOKEN_KEY.

function planPrice(billingInterval) {
  return billingInterval === 'annual' ? '€20/year' : '€2/month';
}

// Stand-in for polling a real backend endpoint (e.g. GET a checkout
// session's status) once Stripe is wired up server-side -- resolves once
// the (mocked) payment is confirmed. Deliberately polls on an interval
// rather than resolving immediately, so this keeps the same shape/timing a
// real implementation would have and the loading state is actually visible
// for a moment rather than flashing by.
function pollPaymentStatus() {
  return new Promise((resolve) => {
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      // A real implementation checks the session's actual status here
      // instead of just counting polls.
      if (attempts >= 2) {
        clearInterval(interval);
        resolve('paid');
      }
    }, 900);
  });
}

async function runCheckout() {
  const params = new URLSearchParams(location.search);
  const plan = params.get('plan') === 'annual' ? 'annual' : 'monthly';
  document.getElementById('checkout-plan-summary').textContent = `Subscribing to A-To-Do Pro – ${planPrice(plan)}.`;
  document.getElementById('checkout-cancel-link').href = `cancel.html?plan=${encodeURIComponent(plan)}`;

  // Shouldn't normally happen -- landing.js only sends already-logged-in
  // visitors straight here -- but a direct/bookmarked visit to this URL
  // without a token has nothing to grant the subscription to.
  const userId = getCurrentUserIdFromStoredToken();
  if (!userId) {
    location.href = `index.html?next=checkout&plan=${encodeURIComponent(plan)}`;
    return;
  }

  await pollPaymentStatus();

  const token = startPaidSubscription(userId, plan);
  if (token) localStorage.setItem(AUTH_TOKEN_KEY, token);
  location.href = 'success.html';
}

runCheckout();
