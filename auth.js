// ---------------------------------------------------------------------------
// Shared account/subscription primitives -- the pieces of app.js's mock auth
// that other static pages (landing.html, checkout.html) also need, since
// they aren't part of the app.js SPA and can't load it (app.js assumes
// index.html's own DOM exists and would throw trying to query it). Pure
// storage/token functions only, no DOM beyond localStorage -- same UMD-lite
// spirit as recurrence.js, just for account state instead of date math.
//
// Loaded before app.js (see index.html's <script> order) so app.js can use
// these as plain globals without its own copies -- there's exactly one
// definition of each, here.
// ---------------------------------------------------------------------------

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

const AUTH_TOKEN_KEY = 'advanced-todo-auth-token';
const USERS_STORAGE_KEY = 'advanced-todo-users';

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}
function saveUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

// The token is a base64'd JSON blob (not a real JWT -- there's no signature,
// nothing else to actually verify it), just enough structure that a real
// backend swap only changes what's inside, not how it's used. See app.js's
// own Auth section comment for the fuller rationale.
function decodeToken(token) {
  return JSON.parse(atob(token));
}

// Subscription -- embedded in the bearer token itself, so every limit check
// elsewhere reads it from the decoded token rather than from some
// separately-mutable place the UI could poke directly, the same way a real
// backend would embed a subscription claim in a signed JWT after checking
// its own database. Same caveat as the rest of this mock auth: this token
// has no signature, so embedding it here isn't actually tamper-proof yet --
// it's structured to swap cleanly for a real signed claim later, not a real
// security boundary today.
//
// null (never subscribed) | { id, plan: 'trial' | 'pro', billingInterval:
// 'monthly' | 'annual' | null (null for a trial), startedAt, expiresAt,
// cancelAtPeriodEnd, scheduledDeletion }. Only the current/most recent
// subscription is kept, no history -- there's no backend yet to reconcile a
// real billing history against. "Active" is never cached as its own flag:
// it's always Date.now() < expiresAt, checked live wherever it matters (see
// describeSubscription), so an expired trial/subscription is correctly
// detected without needing a fresh token just because time passed.
// cancelAtPeriodEnd doesn't change that -- it only changes what the
// Settings section displays (see renderSettingsSubscriptionSection in
// app.js); nothing in this mock actually auto-renews a subscription past
// its expiresAt anyway, so "cancelling" one has no other effect here yet.
// scheduledDeletion is the one exception: once expiresAt passes, getMe() in
// app.js checks it and actually deletes the account (see
// scheduleAccountDeletion/cancelScheduledAccountDeletion below).
const TRIAL_DURATION_MS = 14 * 24 * 60 * 60 * 1000;
const MONTHLY_BILLING_MS = 30 * 24 * 60 * 60 * 1000;
const ANNUAL_BILLING_MS = 365 * 24 * 60 * 60 * 1000;

function mintToken(user) {
  return btoa(JSON.stringify({ sub: user.id, issuedAt: Date.now(), subscription: user.subscription || null }));
}

function describeSubscription(subscription) {
  if (!subscription) return { plan: 'free', active: false, subscription: null };
  return { plan: subscription.plan, active: Date.now() < subscription.expiresAt, subscription };
}

// Starts a 14-day trial for `userId` -- identical to a paid Pro subscription
// while it lasts (see canCreateTaskOfKind/canCompleteOrNoteTask in app.js).
// Returns a freshly minted token reflecting the new subscription, to replace
// whatever's in localStorage -- re-minting a token outside of login() is
// deliberate; nothing else changes a claim the token carries except this and
// startPaidSubscription/cancelSubscription below.
//
// Deliberately doesn't check for a prior trial -- repeat trials are fine for
// now (useful for testing); a real backend is expected to allow only one
// trial per account, but that's not enforced here yet.
function startTrialSubscription(userId) {
  const users = loadUsers();
  const user = users.find((u) => u.id === userId);
  if (!user) return null;
  user.subscription = {
    id: uid(),
    plan: 'trial',
    billingInterval: null,
    startedAt: Date.now(),
    expiresAt: Date.now() + TRIAL_DURATION_MS,
    cancelAtPeriodEnd: false,
    scheduledDeletion: false,
  };
  saveUsers(users);
  return mintToken(user);
}

// Grants a paid Pro subscription -- the mock stand-in for a completed Stripe
// checkout (see checkout.html, which is the only caller). billingInterval:
// 'monthly' | 'annual'; expiresAt is set to one billing period from now,
// same as a real subscription's first period would be.
function startPaidSubscription(userId, billingInterval) {
  const users = loadUsers();
  const user = users.find((u) => u.id === userId);
  if (!user) return null;
  const durationMs = billingInterval === 'annual' ? ANNUAL_BILLING_MS : MONTHLY_BILLING_MS;
  user.subscription = {
    id: uid(),
    plan: 'pro',
    billingInterval: billingInterval === 'annual' ? 'annual' : 'monthly',
    startedAt: Date.now(),
    expiresAt: Date.now() + durationMs,
    cancelAtPeriodEnd: false,
    scheduledDeletion: false,
  };
  saveUsers(users);
  return mintToken(user);
}

// Marks the current subscription to not renew -- access/limits stay exactly
// as they are until expiresAt (see describeSubscription/isSubscriptionActive
// in app.js), same as a real "cancel at period end" would behave; there's
// just no actual renewal job here yet for this to meaningfully interrupt.
// No-ops (returns null) if there's nothing active to cancel.
function cancelSubscription(userId) {
  const users = loadUsers();
  const user = users.find((u) => u.id === userId);
  if (!user || !user.subscription || !describeSubscription(user.subscription).active) return null;
  user.subscription.cancelAtPeriodEnd = true;
  saveUsers(users);
  return mintToken(user);
}

// The alternative to deleting a paying subscriber's account outright (see
// the Settings "Delete account" flow in app.js) -- keeps full access until
// the current period ends, same as cancelSubscription above (which this
// also does -- a subscription slated for deletion has nothing left to
// renew into), then getMe() in app.js deletes it for real once expiresAt
// passes and nobody's undone it via cancelScheduledAccountDeletion below.
// No-ops (returns null) if there's no active subscription to schedule
// against.
function scheduleAccountDeletion(userId) {
  const users = loadUsers();
  const user = users.find((u) => u.id === userId);
  if (!user || !user.subscription || !describeSubscription(user.subscription).active) return null;
  user.subscription.cancelAtPeriodEnd = true;
  user.subscription.scheduledDeletion = true;
  saveUsers(users);
  return mintToken(user);
}

// Undoes scheduleAccountDeletion -- deliberately leaves cancelAtPeriodEnd
// alone (see its own comment): "cancel the deletion" only promises to keep
// the account around, not to silently resume billing the user never asked
// to resume. No-ops (returns null) if there's no subscription at all.
function cancelScheduledAccountDeletion(userId) {
  const users = loadUsers();
  const user = users.find((u) => u.id === userId);
  if (!user || !user.subscription) return null;
  user.subscription.scheduledDeletion = false;
  saveUsers(users);
  return mintToken(user);
}

// Data-retention policy (see the Privacy Policy): an account untouched for
// 12 months is deleted -- see login()/getMe() in app.js, the only two
// callers of isUserInactive/recordUserActivity below. A fixed 365 days,
// same approximation-of-a-calendar-period style as TRIAL_DURATION_MS/
// MONTHLY_BILLING_MS/ANNUAL_BILLING_MS above.
const INACTIVITY_LIMIT_MS = 365 * 24 * 60 * 60 * 1000;

// lastLoginAt (set only by a fresh email/password login) and lastActiveAt
// (also touched by simply resuming an already-stored token, see getMe) are
// deliberately separate fields -- lastActiveAt is the one that actually
// gates deletion (see isUserInactive), so an account someone keeps using via
// a long-lived token, without ever re-entering their password, still reads
// as active. Both are meant to eventually live on a real backend's user
// row, same as everything else in this file.
function recordUserActivity(userId) {
  const users = loadUsers();
  const user = users.find((u) => u.id === userId);
  if (!user) return;
  user.lastActiveAt = Date.now();
  saveUsers(users);
}

// Falls back to lastLoginAt, then to "now" (never treats an account that
// simply predates these fields as already-expired -- same
// don't-punish-pre-existing-data reasoning as normalizeLoadedTasks'
// createdAt backfill in app.js) for an account that's never had either
// field recorded.
function isUserInactive(user) {
  const lastActive = user.lastActiveAt || user.lastLoginAt || Date.now();
  return Date.now() - lastActive > INACTIVITY_LIMIT_MS;
}

// The visitor id behind whatever token is currently stored, or null if
// there's none/it's unreadable -- landing.html/checkout.html use this to
// decide whether a paid-plan click can go straight to checkout or needs a
// login first (see landing.js), without needing the rest of app.js's
// account/profile machinery.
function getCurrentUserIdFromStoredToken() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) return null;
  try {
    return decodeToken(token).sub;
  } catch {
    return null;
  }
}
