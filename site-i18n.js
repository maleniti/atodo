// ---------------------------------------------------------------------------
// Language handling shared by every page in the marketing/subscription/
// legal flow (landing.html, checkout.html, success.html, cancel.html,
// privacy.html, terms.html) -- NOT used by index.html/app.js, which has its
// own i18n system (see the "i18n" section at the top of app.js) with its own
// storage (the user's profile, per account). This one is simpler: EN/HR
// only, one shared preference for every page in this flow, no per-account
// storage since a visitor here may not be logged in at all.
//
// Priority for the language a page actually opens in (see
// resolveInitialSiteLanguage):
//   1. A `?lang=en|hr` URL param -- the explicit handoff used when a link
//      inside the logged-in app (Settings, the avatar menu, ...) points out
//      here, so the destination matches the app's own current language
//      (see app.js's updateOutboundLegalLinks). Consumed once, then
//      stripped from the URL.
//   2. Whatever was last chosen in this flow (the toggle below, or a
//      previous handoff) -- lets clicking between these pages, or through
//      the whole subscription flow, keep the same language without needing
//      to keep passing it in the URL.
//   3. IP-based geolocation, same country-code rule as app.js's own
//      detectLanguageAndTimeFormatFromLocation (only language, not time
//      format -- these pages don't show times).
// ---------------------------------------------------------------------------

const SITE_LANG_STORAGE_KEY = 'advanced-todo-marketing-language';

function getStoredMarketingLanguage() {
  return localStorage.getItem(SITE_LANG_STORAGE_KEY);
}
function setStoredMarketingLanguage(lang) {
  localStorage.setItem(SITE_LANG_STORAGE_KEY, lang);
}

async function detectSiteLanguageFromIP() {
  try {
    const res = await fetch('https://ipwho.is/');
    if (res.ok) {
      const data = await res.json();
      if (data && data.success !== false && data.country_code === 'HR') return 'hr';
    }
  } catch {
    // Offline, blocked, or the service is down -- fall through to English,
    // same as app.js's own detection does.
  }
  return 'en';
}

async function resolveInitialSiteLanguage() {
  const params = new URLSearchParams(location.search);
  const handoff = params.get('lang');
  if (handoff === 'en' || handoff === 'hr') {
    setStoredMarketingLanguage(handoff);
    params.delete('lang');
    const newSearch = params.toString();
    history.replaceState(null, '', location.pathname + (newSearch ? `?${newSearch}` : '') + location.hash);
    return handoff;
  }
  const stored = getStoredMarketingLanguage();
  if (stored === 'en' || stored === 'hr') return stored;
  const detected = await detectSiteLanguageFromIP();
  setStoredMarketingLanguage(detected);
  return detected;
}

// `dict` is { en: { key: string }, hr: { key: string } } -- plain text goes
// through data-i18n (textContent), markup (lists, paragraphs, links) goes
// through data-i18n-html (innerHTML), same split app.js's own
// applyStaticTranslations uses. Falls back to English, then to the raw key,
// same reasoning as app.js's t().
function applySiteTranslations(lang, dict) {
  const strings = dict[lang] || dict.en || {};
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    el.textContent = strings[key] ?? dict.en[key] ?? key;
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.dataset.i18nHtml;
    el.innerHTML = strings[key] ?? dict.en[key] ?? key;
  });
  document.querySelectorAll('.lang-toggle [data-lang]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  // Every plain link into index.html (the login/register screen) gets the
  // same `?lang=` handoff checkout/success's own dynamic links use (see
  // boot() in app.js) -- "clicking through to Log in" is explicitly one of
  // the hops that should preserve the chosen language. Marked with a class
  // rather than matched by href, since a couple of these also carry
  // next=checkout&plan=... (see landing.js) that this must leave alone.
  document.querySelectorAll('a.js-login-link').forEach((el) => {
    const url = new URL(el.getAttribute('href'), location.href);
    url.searchParams.set('lang', lang);
    el.setAttribute('href', url.pathname + '?' + url.searchParams.toString());
  });
}

// Resolves the language, applies it, and wires the EN/HR toggle buttons
// (any element matching `.lang-toggle [data-lang]`) to switch languages
// live -- no reload, just a fresh applySiteTranslations pass. Call once per
// page, after its own `dict` is defined.
async function initSitePage(dict, onLanguageChange) {
  const lang = await resolveInitialSiteLanguage();
  applySiteTranslations(lang, dict);
  if (onLanguageChange) onLanguageChange(lang);
  document.querySelectorAll('.lang-toggle [data-lang]').forEach((btn) => {
    btn.onclick = () => {
      setStoredMarketingLanguage(btn.dataset.lang);
      applySiteTranslations(btn.dataset.lang, dict);
      if (onLanguageChange) onLanguageChange(btn.dataset.lang);
    };
  });
  return lang;
}
