// Landing page -- video embed + pricing buttons. Depends on auth.js (loaded
// first, see landing.html) for getCurrentUserIdFromStoredToken and on
// site-i18n.js for initSitePage. The walkthrough video's link is one of the
// page's texts ('landing.videoUrl', set per language in the admin app) --
// a language whose link is empty shows a placeholder instead.

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
// having just seen one that did). A language that hasn't a link of its own
// gets English's (the API's fallback for any text).
function setUpVideo() {
  const embedUrl = toYouTubeEmbedUrl(pageText('landing.videoUrl').trim());
  const iframe = document.getElementById('video-iframe');
  if (!embedUrl) {
    iframe.src = '';
    document.getElementById('video-frame').classList.add('hidden');
    document.getElementById('video-placeholder').classList.remove('hidden');
    return;
  }
  if (iframe.getAttribute('src') !== embedUrl) iframe.src = embedUrl;
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
function subscribeTo(plan) {
  const userId = getCurrentUserIdFromStoredToken();
  if (userId) {
    location.href = `checkout.html?plan=${encodeURIComponent(plan)}`;
  } else {
    location.href = `index.html?next=checkout&plan=${encodeURIComponent(plan)}&lang=${getStoredMarketingLanguage() || 'en'}`;
  }
}

// The pricing cards: the products the price list features on the landing
// page (featured_ord set), in that order, the highlighted one(s) outlined --
// all from the API (anchor-prices.js's loadSitePrices), so a product, its
// name, price, place or highlight changes in the admin app, not here. What a
// card says beyond that depends on its kind: a free plan (no billing
// interval) lists the free limits and leads to sign-up; a subscription
// lists Pro's benefits and leads to checkout for its plan.
const PLAN_FOR_INTERVAL = { month: 'monthly', year: 'annual' };

async function renderPricingCards(lang) {
  const grid = document.getElementById('pricing-grid');
  const strings = siteStrings();
  let products;
  try {
    products = await loadSitePrices(lang);
  } catch {
    grid.innerHTML = `<p class="pricing-unavailable">${escapeLandingHtml(strings['pricing.unavailable'])}</p>`;
    return;
  }
  if (lang !== currentLandingLanguage) return; // toggled again meanwhile
  const monthly = products.find((p) => p.billing_interval === 'month');
  const featured = products.filter((p) => p.featured_ord !== null).sort((a, b) => a.featured_ord - b.featured_ord);
  grid.innerHTML = featured.map((product) => {
    const plan = PLAN_FOR_INTERVAL[product.billing_interval];
    const per = product.billing_interval ? ` <span>${escapeLandingHtml(strings[product.billing_interval === 'year' ? 'pricing.perYear' : 'pricing.perMonth'])}</span>` : '';
    const savePercent = product.billing_interval === 'year' && monthly
      ? Math.round((1 - product.price_eur / (12 * monthly.price_eur)) * 100) : 0;
    const benefits = plan
      ? ['pricing.proBenefit1', 'pricing.proBenefit2', 'pricing.proBenefit3']
      : ['pricing.freeLimit1', 'pricing.freeLimit2', 'pricing.freeLimit3'];
    const button = plan
      ? `<button type="button" class="btn btn-primary" data-plan="${plan}">${escapeLandingHtml(strings[plan === 'annual' ? 'pricing.subscribeYearly' : 'pricing.subscribeMonthly'])}</button>`
      : `<a class="btn btn-secondary" href="index.html?lang=${lang}">${escapeLandingHtml(strings['hero.getStarted'])}</a>`;
    return `<div class="pricing-card${product.highlight ? ' highlight' : ''}">
      <h3>${escapeLandingHtml(product.name)}</h3>
      <div class="price">${escapeLandingHtml(formatSitePrice(product.price_eur, lang))}${per} <span class="js-anchor"></span></div>
      ${savePercent > 0 ? `<p class="save">${escapeLandingHtml(strings['pricing.save'].replace('{percent}', savePercent))}</p>` : ''}
      <ul>${benefits.map((key) => `<li>${escapeLandingHtml(strings[key])}</li>`).join('')}</ul>
      ${button}
    </div>`;
  }).join('');
  grid.querySelectorAll('.js-anchor').forEach((el, i) => renderAnchorBadge(el, featured[i], lang));
  grid.querySelectorAll('[data-plan]').forEach((btn) => {
    btn.onclick = () => subscribeTo(btn.dataset.plan);
  });
}

function escapeLandingHtml(text) {
  const div = document.createElement('div');
  div.textContent = text == null ? '' : String(text);
  return div.innerHTML;
}

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
  priceListStatus.textContent = pageText('priceList.unavailable');
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

let currentLandingLanguage = null;

initSitePage('landing', (lang) => {
  currentLandingLanguage = lang;
  setUpVideo(lang);
  renderPricingCards(lang);
  renderPriceListVersions(lang);
});
loadPriceListVersions();
