// Landing page -- video embed + pricing buttons. Depends on auth.js (loaded
// first, see landing.html) for getCurrentUserIdFromStoredToken, on
// site-i18n.js for initSitePage, and optionally on config.js's
// window.APP_CONFIG.landingVideoUrlEn/landingVideoUrlHr (see CLAUDE.md's
// Configuration section) -- left with no video shown at all for a language
// whose URL isn't set, same fallback spirit as the rest of this app's
// optional config.

// Accepts a plain watch URL (youtube.com/watch?v=ID), a short link
// (youtu.be/ID), or an already-embeddable URL, and returns the
// youtube.com/embed/ID form iframes actually need -- or null if `url`
// doesn't look like a YouTube URL at all, so the caller can fall back to the
// placeholder instead of embedding something broken.
function toYouTubeEmbedUrl(url) {
  if (!url) return null;
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  const host = parsed.hostname.replace(/^www\./, '');
  let videoId = null;
  if (host === 'youtu.be') {
    videoId = parsed.pathname.slice(1);
  } else if (host === 'youtube.com' || host === 'm.youtube.com') {
    if (parsed.pathname === '/watch') videoId = parsed.searchParams.get('v');
    else if (parsed.pathname.startsWith('/embed/')) videoId = parsed.pathname.slice('/embed/'.length);
  }
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}`;
}

// Each language has its own separately-recorded walkthrough (not just
// captions on one video), so this re-picks and re-embeds on every language
// change -- called once with the initially-resolved language and again on
// every EN/HR toggle click (see initSitePage below). Unlike a one-shot
// setup, has to handle switching *back* to a placeholder too (a visitor
// touring both languages could land on one with no video configured after
// having just seen one that did).
function setUpVideo(lang) {
  const videoUrl = window.APP_CONFIG && window.APP_CONFIG[lang === 'hr' ? 'landingVideoUrlHr' : 'landingVideoUrlEn'];
  const embedUrl = toYouTubeEmbedUrl(videoUrl);
  const iframe = document.getElementById('video-iframe');
  if (!embedUrl) {
    iframe.src = '';
    document.getElementById('video-frame').classList.add('hidden');
    document.getElementById('video-placeholder').classList.remove('hidden');
    return;
  }
  iframe.src = embedUrl;
  document.getElementById('video-frame').classList.remove('hidden');
  document.getElementById('video-placeholder').classList.add('hidden');
}

// Already logged in (localStorage is shared across every page on this
// origin) -> straight to checkout (same marketing-language storage carries
// over there on its own, see site-i18n.js -- no need to pass it in the
// URL); otherwise to the login screen first, with enough in the URL for it
// to send the visitor on to checkout right after (see index.html's
// login-form submit handler in app.js), plus `lang` so that login screen
// itself matches this page's current language (see boot() in app.js).
document.querySelectorAll('[data-plan]').forEach((btn) => {
  btn.onclick = () => {
    const plan = btn.dataset.plan;
    const userId = getCurrentUserIdFromStoredToken();
    if (userId) {
      location.href = `checkout.html?plan=${encodeURIComponent(plan)}`;
    } else {
      location.href = `index.html?next=checkout&plan=${encodeURIComponent(plan)}&lang=${getStoredMarketingLanguage() || 'en'}`;
    }
  };
});

const LANDING_I18N = {
  en: {
    'nav.login': 'Log in',
    'nav.privacy': 'Privacy Policy',
    'nav.terms': 'Terms of Service',
    'hero.title': 'The to-do list that actually keeps up with you',
    'hero.subtitle':
      'Recurring tasks, overdue & failed-appointment tracking, work timers, and per-task notes -- all in one fast, no-nonsense list.',
    'hero.getStarted': 'Get started free',
    'hero.seePricing': 'See pricing',
    'hero.videoPlaceholder': 'Video walkthrough coming soon.',
    'features.heading': 'What you get',
    'features.recurringTitle': 'Flexible recurring tasks',
    'features.recurringBody':
      'Daily, weekly, or monthly patterns -- specific weekdays, "the 2nd Tuesday", or a handful of exact days each month.',
    'features.overdueTitle': 'Overdue & failed tracking',
    'features.overdueBody':
      "A missed task carries over until you deal with it; an appointment past its due date is marked failed instead, so nothing quietly slips away.",
    'features.timersTitle': 'Work timers & focus mode',
    'features.timersBody':
      "Start a countdown or count-up timer on whatever you're working on right now, and pick it back up later exactly where you left off.",
    'features.notesTitle': 'Notes & activity history',
    'features.notesBody': 'Keep context on every task -- notes you wrote, and a running log of everything that happened to it.',
    'features.agendaTitle': "Today's agenda",
    'features.agendaBody': "A side panel that always shows what's actually on your plate today, without digging through the full list.",
    'features.responsiveTitle': 'Works everywhere',
    'features.responsiveBody': 'A responsive layout that works as well on your phone as it does on your desktop.',
    'pricing.heading': 'Pricing',
    'pricing.freeTitle': 'Free',
    'pricing.freeLimit1': 'Up to 10 one-off tasks',
    'pricing.freeLimit2': 'Up to 5 recurring tasks',
    'pricing.freeLimit3': 'Up to 5 notes per task',
    'pricing.monthlyTitle': 'Pro -- Monthly',
    'pricing.perMonth': '/ month',
    'pricing.proBenefit1': 'Unlimited tasks, recurring or not',
    'pricing.proBenefit2': 'Unlimited notes on every task',
    'pricing.proBenefit3': 'No more subscription reminders cluttering your list',
    'pricing.subscribeMonthly': 'Subscribe monthly',
    'pricing.yearlyTitle': 'Pro -- Yearly',
    'pricing.perYear': '/ year',
    'pricing.save': 'Save ~17% vs. monthly',
    'priceList.label': 'Price list (CSV)',
    'priceList.download': 'Download',
    'priceList.unavailable': "The price list can't be loaded right now.",
    'pricing.subscribeYearly': 'Subscribe yearly',
  },
  hr: {
    'nav.login': 'Prijava',
    'nav.privacy': 'Pravila privatnosti',
    'nav.terms': 'Uvjeti korištenja',
    'hero.title': 'Popis obveza koji zaista prati vaš tempo',
    'hero.subtitle':
      'Ponavljajući zadaci, praćenje zakašnjelih i neuspjelih termina, mjerači vremena rada i bilješke po zadatku -- sve u jednom brzom, jednostavnom popisu.',
    'hero.getStarted': 'Započnite besplatno',
    'hero.seePricing': 'Pogledajte cijene',
    'hero.videoPlaceholder': 'Video vodič uskoro stiže.',
    'features.heading': 'Što dobivate',
    'features.recurringTitle': 'Fleksibilni ponavljajući zadaci',
    'features.recurringBody':
      'Dnevni, tjedni ili mjesečni obrasci -- određeni dani u tjednu, "drugi utorak", ili nekoliko točnih dana u mjesecu.',
    'features.overdueTitle': 'Praćenje zakašnjelih i neuspjelih',
    'features.overdueBody':
      'Propušten zadatak prenosi se dalje dok ga ne riješite; termin nakon isteka roka umjesto toga se označava neuspjelim, tako da vam ništa ne promakne.',
    'features.timersTitle': 'Mjerači vremena rada i način fokusa',
    'features.timersBody':
      'Pokrenite odbrojavanje ili mjerenje vremena za ono na čemu trenutačno radite, i nastavite kasnije točno gdje ste stali.',
    'features.notesTitle': 'Bilješke i povijest aktivnosti',
    'features.notesBody': 'Zadržite kontekst na svakom zadatku -- bilješke koje ste napisali i tekući zapis svega što se s njim dogodilo.',
    'features.agendaTitle': 'Današnji raspored',
    'features.agendaBody': 'Bočna ploča koja uvijek prikazuje što je stvarno na redu danas, bez pretraživanja cijelog popisa.',
    'features.responsiveTitle': 'Radi svugdje',
    'features.responsiveBody': 'Responzivan izgled koji radi jednako dobro na mobitelu kao i na računalu.',
    'pricing.heading': 'Cijene',
    'pricing.freeTitle': 'Besplatno',
    'pricing.freeLimit1': 'Do 10 jednokratnih zadataka',
    'pricing.freeLimit2': 'Do 5 ponavljajućih zadataka',
    'pricing.freeLimit3': 'Do 5 bilješki po zadatku',
    'pricing.monthlyTitle': 'Pro -- Mjesečno',
    'pricing.perMonth': '/ mjesec',
    'pricing.proBenefit1': 'Neograničen broj zadataka, ponavljajućih ili ne',
    'pricing.proBenefit2': 'Neograničen broj bilješki na svakom zadatku',
    'pricing.proBenefit3': 'Bez podsjetnika za pretplatu koji zatrpavaju popis',
    'pricing.subscribeMonthly': 'Pretplatite se mjesečno',
    'pricing.yearlyTitle': 'Pro -- Godišnje',
    'pricing.perYear': '/ godina',
    'pricing.save': 'Ušteda ~17% u odnosu na mjesečno',
    'priceList.label': 'Cjenik (CSV)',
    'priceList.download': 'Preuzmi',
    'priceList.unavailable': 'Cjenik trenutno nije moguće učitati.',
    'pricing.subscribeYearly': 'Pretplatite se godišnje',
  },
};

// The published price list (Croatian law: Odluka o objavi cjenika, NN
// 101/2026): every version still due -- each replaced one stays available
// for 30 days -- offered for download, oldest first. The backend lists the
// price lists and the moments their prices took effect
// (GET /maleniti/v1/price-lists/atodo/versions, see the API's
// routes/priceLists.js); every such moment starts a version, valid until
// the next one, and downloading it asks for the list as it stood then.
const PRICE_LIST_URL = `${(window.APP_CONFIG && window.APP_CONFIG.apiBaseUrl) || ''}/maleniti/v1/price-lists/atodo`;
const priceListSelect = document.getElementById('price-list-version');
const priceListDownloadBtn = document.getElementById('price-list-download-btn');
const priceListStatus = document.getElementById('price-list-status');
let priceListVersions = null; // [{ from, until }], until null = still valid
let priceListLanguage = 'hr';

function formatPriceListMoment(iso, lang) {
  return new Intl.DateTimeFormat(lang === 'hr' ? 'hr-HR' : 'en-GB', {
    timeZone: 'Europe/Zagreb', day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(new Date(iso));
}

function priceListVersionLabel({ from, until }, lang) {
  const since = formatPriceListMoment(from, lang);
  if (until) return `${since} – ${formatPriceListMoment(until, lang)}`;
  return lang === 'hr' ? `od ${since} (važeći)` : `since ${since} (current)`;
}

function renderPriceListVersions(lang) {
  priceListLanguage = lang;
  if (!priceListVersions) return;
  const selected = priceListSelect.value;
  priceListSelect.innerHTML = '';
  for (const version of priceListVersions) {
    const option = document.createElement('option');
    option.value = version.from;
    option.textContent = priceListVersionLabel(version, lang);
    priceListSelect.appendChild(option);
  }
  // The current version unless one was picked already.
  priceListSelect.value = selected || priceListVersions[priceListVersions.length - 1].from;
}

function showPriceListUnavailable() {
  priceListStatus.dataset.i18n = 'priceList.unavailable';
  priceListStatus.textContent = (LANDING_I18N[priceListLanguage] || LANDING_I18N.en)['priceList.unavailable'];
  priceListStatus.classList.remove('hidden');
}

async function loadPriceListVersions() {
  try {
    const response = await fetch(`${PRICE_LIST_URL}/versions`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const { priceLists } = await response.json();
    const moments = [...new Set(priceLists.flatMap((list) => list.priceChanges))].sort();
    if (moments.length === 0) throw new Error('no price list versions');
    priceListVersions = moments.map((from, i) => ({ from, until: moments[i + 1] || null }));
    renderPriceListVersions(priceListLanguage);
    priceListSelect.disabled = false;
    priceListDownloadBtn.disabled = false;
  } catch (err) {
    console.error('Failed to load price list versions:', err);
    showPriceListUnavailable();
  }
}

// A plain navigation: the response is an attachment, so the browser saves
// it (under the file name the backend gives it) and stays on this page.
priceListDownloadBtn.onclick = () => {
  const link = document.createElement('a');
  link.href = `${PRICE_LIST_URL}?at=${encodeURIComponent(priceListSelect.value)}&lang=${priceListLanguage}`;
  document.body.appendChild(link);
  link.click();
  link.remove();
};

initSitePage(LANDING_I18N, (lang) => {
  setUpVideo(lang);
  fillAnchorPrices(document, lang);
  renderPriceListVersions(lang);
});
loadPriceListVersions();
