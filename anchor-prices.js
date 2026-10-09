// A-To-Do's prices, as the published price list has them right now -- the
// API's GET /maleniti/v1/price-lists/atodo/current (see the API's
// routes/priceLists.js), the same prices checkout charges. Nothing here
// hardcodes an amount: the price list is the one place prices change.
//
// Every price shown also carries its anchor price ("sidrena cijena"):
// Croatian law (Odluka o isticanju dodatne cijene, NN 101/2026, from 17 Nov
// 2026) requires the regular price that applied on 10 Sept 2026 (or when a
// plan was introduced) clearly next to every price shown to consumers.
//
// Shared by landing/checkout (site-i18n.js's pages) and the app itself,
// which each have their own i18n -- so a page marks where a price goes with
// an empty <span data-price-plan="monthly"></span> and its badge with
// <span data-anchor-plan="monthly"></span> (inside translated text too),
// and calls fillAnchorPrices() with its current language after every
// (re)translation. Plans are named by billing interval: monthly, annual.
// The prices load once per page; until then the placeholders stay empty,
// and are filled as soon as they arrive (or show "—" if they can't load).

const SITE_PRICES_URL = `${(window.APP_CONFIG && window.APP_CONFIG.apiBaseUrl) || ''}/maleniti/v1/price-lists/atodo/current`;
const PLAN_INTERVALS = { monthly: 'month', annual: 'year' };

// The tooltip's texts ('anchorPrice.required', 'anchorPrice.differs', in
// the 'common' bundle) come through pageText(), which each page defines
// over its own loaded texts (app.js, site-i18n.js).

const ANCHOR_ICON_SVG =
  '<svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
  '<circle cx="12" cy="5" r="2.5"/><path d="M12 7.5V21"/><path d="M8.5 11h7"/><path d="M4.5 13.5a7.5 7.5 0 0 0 15 0"/><path d="M4.5 13.5l-1.5 1.5M19.5 13.5l1.5 1.5"/></g></svg>';

// Per language (product names differ; amounts don't): a promise of the
// products, [{ code, name, price_eur, anchor_eur, special_sale,
// featured_ord, highlight, billing_interval }].
const sitePriceRequests = {};
let sitePrices = null; // the first products to arrive, for the amounts
let sitePricesFailed = false;
let lastFillLanguage = null;

function loadSitePrices(lang = 'hr') {
  if (!sitePriceRequests[lang]) {
    sitePriceRequests[lang] = fetch(`${SITE_PRICES_URL}?lang=${encodeURIComponent(lang)}`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(({ products }) => {
        const first = !sitePrices;
        sitePrices = products;
        if (first && lastFillLanguage) fillAnchorPrices(document, lastFillLanguage);
        return products;
      })
      .catch((err) => {
        console.error('Failed to load prices:', err);
        delete sitePriceRequests[lang];
        sitePricesFailed = true;
        if (lastFillLanguage) fillAnchorPrices(document, lastFillLanguage);
        throw err;
      });
  }
  return sitePriceRequests[lang];
}

function planProduct(products, plan) {
  return (products || []).find((p) => p.billing_interval === PLAN_INTERVALS[plan]) || null;
}

// "€2" / "€2.20" in English, "2 €" / "2,20 €" in Croatian.
function formatSitePrice(amount, lang) {
  const number = Number.isInteger(amount) ? String(amount) : amount.toFixed(2);
  return lang === 'hr' ? `${number.replace('.', ',')} €` : `€${number}`;
}

// The badge for a product: an anchor icon and its anchor price, explained
// by a CSS tooltip off data-tip (see .anchor-price in style.css and
// landing.css), shown on hover and on focus -- tabindex makes a tap focus
// it, so it works on touch screens too, where a plain title never shows.
function renderAnchorBadge(el, product, lang) {
  const required = pageText('anchorPrice.required');
  const anchor = product.anchor_eur ?? product.price_eur;
  const tip = anchor === product.price_eur ? required : `${required} ${pageText('anchorPrice.differs')}`;
  const amount = formatSitePrice(anchor, lang);
  el.className = 'anchor-price';
  el.tabIndex = 0;
  el.dataset.tip = tip;
  el.setAttribute('aria-label', `${amount}. ${tip}`);
  el.innerHTML = `${ANCHOR_ICON_SVG}<span class="anchor-price-amount">${amount}</span>`;
}

function fillAnchorPrices(root, lang) {
  lastFillLanguage = lang;
  if (!sitePrices && !sitePricesFailed) loadSitePrices(lang).catch(() => {});
  root.querySelectorAll('[data-price-plan]').forEach((el) => {
    const product = planProduct(sitePrices, el.dataset.pricePlan);
    el.textContent = product ? formatSitePrice(product.price_eur, lang) : sitePricesFailed ? '—' : '';
  });
  root.querySelectorAll('[data-anchor-plan]').forEach((el) => {
    const product = planProduct(sitePrices, el.dataset.anchorPlan);
    if (product) renderAnchorBadge(el, product, lang);
    else el.innerHTML = '';
  });
}
