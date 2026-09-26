// ---------------------------------------------------------------------------
// API client -- talks to the real backend (see api-spec.yaml) at
// window.APP_CONFIG.apiBaseUrl (see config.example.js/CLAUDE.md's
// Configuration section). Shared by every page that needs account/
// subscription/task data -- index.html (via app.js), landing.html
// (landing.js), checkout.html (checkout.js) -- since none of those can load
// the whole app.js SPA script (it assumes index.html's own DOM exists and
// would throw trying to query it elsewhere). Loaded before app.js (see
// index.html's <script> order) so app.js can use these as plain globals
// without its own copies -- there's exactly one definition of each, here.
// ---------------------------------------------------------------------------

// Still generated client-side, unlike an account's id -- a task's id is
// needed synchronously in the middle of a lot of local task-list logic
// (recurring-series splits, manual occurrences, merging a series, ...) that
// would otherwise have to await a round trip partway through building a
// single save. See PUT /tasks in api-spec.yaml, which accepts
// client-generated ids rather than inventing its own.
function uid() {
  return Math.random().toString(36).slice(2, 9);
}

const AUTH_TOKEN_KEY = 'advanced-todo-auth-token';

// Matches every error response's shape in api-spec.yaml ({ code, message })
// -- err.code is what every catch block in this app actually branches on
// (to show its own translated copy), `message` is just a fallback. Used
// both for a real error apiFetch() received from the server and locally,
// wherever a client-side check throws before ever making a request (a
// malformed email, a client-side validity check, ...).
function codeError(code, message) {
  const err = new Error(message || code);
  err.code = code;
  return err;
}

// window.APP_CONFIG.apiBaseUrl left empty (no config.js, or an empty value
// in it) resolves to a same-origin `/atodo/v1` -- only ever right if the
// backend happens to be reverse-proxied onto this same origin; there's no
// other "disabled" fallback the way e.g. the Unsplash key has one, since
// this app can't do anything at all without a real backend to talk to.
const API_BASE = `${(window.APP_CONFIG && window.APP_CONFIG.apiBaseUrl) || ''}/atodo/v1`;

// Every endpoint in api-spec.yaml goes through here. Adds the bearer token
// (from localStorage, unless `token` is passed explicitly -- see getMe in
// app.js, called with a token that isn't stored yet: boot()'s stored-token
// path passes it before deciding it's still valid, and the login submit
// handler passes login()'s freshly-minted one before saving it) and turns
// any non-2xx response into a codeError() carrying the server's own `code`,
// so every existing `err.code === '...'` check throughout app.js keeps
// working unchanged.
async function apiFetch(path, { method = 'GET', body, token } = {}) {
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  const authToken = token !== undefined ? token : localStorage.getItem(AUTH_TOKEN_KEY);
  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, { method, headers, body: body !== undefined ? JSON.stringify(body) : undefined });
  } catch {
    // Offline, DNS failure, CORS rejection, the server's just not there --
    // fetch() itself throws rather than resolving with a response for any
    // of these, so this is the only place that can catch them.
    throw codeError('NETWORK_ERROR', 'Could not reach the server. Check your connection and try again.');
  }

  if (res.status === 204) return null;
  let data = null;
  try {
    data = await res.json();
  } catch {
    // No body, or not valid JSON -- data stays null; only a problem below
    // if the response wasn't ok, where there's supposed to be an Error body.
  }
  if (!res.ok) throw codeError((data && data.code) || 'UNKNOWN_ERROR', data && data.message);
  return data;
}

// Reads a token's claims client-side, without a network round trip -- for
// quick, non-authoritative UI reads only (e.g. "should the Subscribe button
// show right now"); GET /auth/me is the actual source of truth for whether
// the account/subscription are still genuinely in that state (see api-spec.
// yaml's Token schema -- nothing here re-verifies a signature, so this is
// not itself a security boundary). Handles both a real three-part JWT
// (header.payload.signature, base64url-encoded) and a bare base64 JSON
// blob, so this doesn't need to know or care which kind of token a given
// backend actually issues.
function decodeToken(token) {
  const payloadSegment = token.split('.')[1] || token;
  const base64 = payloadSegment.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(atob(base64));
}

// active is never cached as its own flag: it's always Date.now() <
// expiresAt, checked live wherever it matters, so an expired trial/
// subscription is correctly detected without needing a fresh token just
// because time passed. cancelAtPeriodEnd doesn't change that -- it only
// changes what the Settings section displays (see
// renderSettingsSubscriptionSection in app.js); the backend is expected to
// still honor access until expiresAt regardless of it.
function describeSubscription(subscription) {
  if (!subscription) return { plan: 'free', active: false, subscription: null };
  return { plan: subscription.plan, active: Date.now() < subscription.expiresAt, subscription };
}

// POST /subscriptions/trial -- starts a 14-day Pro trial for the current
// account -- only while the User's trialAvailable is true (409
// TRIAL_UNAVAILABLE otherwise, see api-spec.yaml). Returns both the fresh token the response carries (see
// api-spec.yaml -- every subscription-mutating endpoint re-issues one,
// since the subscription claim it embeds just changed) and the updated
// user, so the caller doesn't need a separate getMe() round trip just to
// see the new subscription (see subscribeCurrentUserToTrial in app.js).
async function startTrialSubscription() {
  return apiFetch('/subscriptions/trial', { method: 'POST' });
}

// POST /subscriptions/checkout-sessions -- the mock-Stripe stand-in this
// function used to be (minting a Pro subscription directly) is gone: a real
// payment has to actually go through Stripe's own hosted checkout page, so
// this only creates the session and returns where to redirect the browser.
// checkout.js does the redirect, then polls pollCheckoutSessionStatus below
// once Stripe redirects back.
async function createCheckoutSession(billingInterval, successUrl, cancelUrl) {
  return apiFetch('/subscriptions/checkout-sessions', {
    method: 'POST',
    body: { billingInterval, successUrl, cancelUrl },
  });
}

// GET /subscriptions/checkout-sessions/{sessionId} -- see checkout.js's own
// pollPaymentStatus, which calls this on an interval until status isn't
// 'pending' anymore. Once 'paid', `token` reflects the now-active Pro
// subscription.
async function getCheckoutSessionStatus(sessionId) {
  return apiFetch(`/subscriptions/checkout-sessions/${encodeURIComponent(sessionId)}`);
}

// POST /subscriptions/cancel -- stops future renewal; access/limits are
// untouched until expiresAt. Throws codeError('NO_ACTIVE_SUBSCRIPTION') if
// there's nothing active to cancel (see cancelCurrentUserSubscription in
// app.js, which already only offers this when there is). Returns
// { token, user }, same as startTrialSubscription above.
// POST /subscriptions/portal-session -- Stripe's hosted Customer Portal
// ("Manage billing" in Settings, see app.js's openBillingPortal): updating
// the card and cancelling happen on Stripe's own page, which sends the
// browser back to returnUrl afterward. Returns { url } to redirect to.
async function createBillingPortalSession(returnUrl) {
  return apiFetch('/subscriptions/portal-session', { method: 'POST', body: { returnUrl } });
}

async function cancelSubscription() {
  return apiFetch('/subscriptions/cancel', { method: 'POST' });
}

// POST /users/me/schedule-deletion -- the alternative to DELETE /users/me
// for a paying subscriber who doesn't want to forfeit the rest of a period
// they already paid for (see the Settings "Delete account" flow in app.js):
// keeps full access until the subscription's expiresAt, but cancels it (see
// cancelSubscription above) and flags the account itself for deletion once
// that passes -- enforced server-side (see GET /auth/me in api-spec.yaml),
// not by anything running here. Returns { token, user }, same as
// startTrialSubscription above.
async function scheduleAccountDeletion() {
  return apiFetch('/users/me/schedule-deletion', { method: 'POST' });
}

// Undoes scheduleAccountDeletion -- deliberately leaves the subscription's
// own cancellation alone server-side (see api-spec.yaml's own note on this
// endpoint): "cancel the deletion" only promises to keep the account
// around, not to silently resume billing nobody asked to resume. Returns
// { token, user }, same as startTrialSubscription above.
async function cancelScheduledAccountDeletion() {
  return apiFetch('/users/me/schedule-deletion', { method: 'DELETE' });
}

// POST /users/me/change-password -- requires currentPassword (see
// api-spec.yaml's own note on why a bearer token alone isn't enough here),
// so this throws codeError('INVALID_CREDENTIALS') the same way login()
// does for a wrong password, not just for an expired/invalid session.
// Returns only { token } -- the account's own User fields don't change, so
// there's no user to hand back the way the subscription-mutating endpoints
// above do.
async function changePassword(currentPassword, newPassword) {
  return apiFetch('/users/me/change-password', { method: 'POST', body: { currentPassword, newPassword } });
}

// The visitor id behind whatever token is currently stored, or null if
// there's none/it's unreadable -- landing.html/checkout.html use this to
// decide whether a paid-plan click can go straight to checkout or needs a
// login first (see landing.js), without needing a network round trip just
// to answer that.
function getCurrentUserIdFromStoredToken() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) return null;
  try {
    return decodeToken(token).sub;
  } catch {
    return null;
  }
}
