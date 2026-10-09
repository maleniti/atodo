// ---------------------------------------------------------------------------
// Interface texts, shared by every page (index.html's app and the marketing/
// legal pages alike). The texts aren't in this repository: they live in the
// API's database (the maleniti schema's translations, edited in the admin
// app) and are fetched per language and bundle -- 'common' (every page),
// 'app' (the to-do app), or one page's own ('landing', 'faq', ...) -- from
// GET /atodo/v1/translations. A text a language lacks comes back in
// English already.
//
// Each page fetches its texts on every load (the API answers 304 until a
// text changes), so an edit in the admin app shows on the next reload, no
// client release needed. The last answer per language and bundles is kept
// in localStorage, used only when the API can't be reached (an update in
// progress, offline): a page then still reads, if possibly a little out of
// date. Never reached at all, a page shows its keys.
// ---------------------------------------------------------------------------

const I18N_CACHE_PREFIX = 'atodo-i18n:';

function apiBase() {
  return (window.APP_CONFIG && window.APP_CONFIG.apiBaseUrl) || '';
}

// { language, strings, fresh }: fresh false when it came from the cache (or
// nowhere), so a caller may try again later.
async function loadTranslations(lang, bundles) {
  const cacheKey = `${I18N_CACHE_PREFIX}${bundles.join(',')}:${lang}`;
  try {
    const query = new URLSearchParams({ lang, bundles: bundles.join(',') });
    const res = await fetch(`${apiBase()}/atodo/v1/translations?${query}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    try {
      localStorage.setItem(cacheKey, JSON.stringify({ language: data.language, strings: data.strings }));
    } catch {
      // Storage full or blocked: just not cached.
    }
    return { language: data.language, strings: data.strings || {}, fresh: true };
  } catch (err) {
    console.error(`Failed to load the ${bundles.join(', ')} texts (${lang}):`, err);
    try {
      const cached = JSON.parse(localStorage.getItem(cacheKey));
      if (cached && cached.strings) return { language: cached.language || lang, strings: cached.strings, fresh: false };
    } catch {
      // Nothing usable cached.
    }
    return { language: lang, strings: {}, fresh: false };
  }
}

// Every language there is ([{ id, name }]) -- Settings' language list.
async function loadLanguages() {
  const res = await fetch(`${apiBase()}/atodo/v1/languages`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()).languages || [];
}

// A text from `strings` with its {placeholder} tokens filled from `vars` --
// a plain templating scheme, not full ICU pluralization/gendering, which
// none of these texts need. A missing key shows as itself (easier to notice
// and fix than a silent blank).
function formatTranslation(strings, key, vars) {
  const str = strings[key] ?? key;
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, name) => (vars[name] != null ? vars[name] : `{${name}}`));
}
