// Anchor prices ("sidrene cijene"): Croatian law (Odluka o isticanju dodatne
// cijene, NN 101/2026, from 17 Nov 2026) requires every price shown to
// consumers -- on the website, in ads -- to carry, clearly and right next
// to it, the regular price that applied on 10 Sept 2026 (or on the day a
// plan was introduced, if later). They're fixed by that date: changing a
// plan's price later changes `price` here, never `anchor`.
//
// Shared by landing/checkout/terms (site-i18n.js's pages) and the app
// itself, which each have their own i18n -- so a page marks where a badge
// goes with an empty <span data-anchor-plan="monthly"></span> (inside its
// translated text, too), and calls fillAnchorPrices() with its current
// language after every (re)translation.
const ANCHOR_PRICES = {
  free: { price: 0, anchor: 0 },
  monthly: { price: 2, anchor: 2 },
  annual: { price: 20, anchor: 20 },
};

const ANCHOR_PRICE_STRINGS = {
  en: {
    required: 'Anchor price must be shown in accordance with Croatian law.',
    differs: 'Anchor price is not the price you pay.',
  },
  hr: {
    required: 'Sidrena cijena mora biti istaknuta u skladu s hrvatskim zakonom.',
    differs: 'Sidrena cijena nije cijena koju plaćate.',
  },
};

const ANCHOR_ICON_SVG =
  '<svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
  '<circle cx="12" cy="5" r="2.5"/><path d="M12 7.5V21"/><path d="M8.5 11h7"/><path d="M4.5 13.5a7.5 7.5 0 0 0 15 0"/><path d="M4.5 13.5l-1.5 1.5M19.5 13.5l1.5 1.5"/></g></svg>';

// Written like the prices it sits next to ("€2"), in either language.
function formatAnchorAmount(amount) {
  return `€${amount}`;
}

// The tooltip is a CSS one off data-tip (see .anchor-price in style.css and
// landing.css), shown on hover and on focus -- tabindex makes a tap focus it,
// so it works on touch screens too, where a plain title never shows.
function fillAnchorPrices(root, lang) {
  const strings = ANCHOR_PRICE_STRINGS[lang] || ANCHOR_PRICE_STRINGS.en;
  root.querySelectorAll('[data-anchor-plan]').forEach((el) => {
    const plan = ANCHOR_PRICES[el.dataset.anchorPlan];
    if (!plan) return;
    const tip = plan.anchor === plan.price ? strings.required : `${strings.required} ${strings.differs}`;
    const amount = formatAnchorAmount(plan.anchor);
    el.className = 'anchor-price';
    el.tabIndex = 0;
    el.dataset.tip = tip;
    el.setAttribute('aria-label', `${amount}. ${tip}`);
    el.innerHTML = `${ANCHOR_ICON_SVG}<span class="anchor-price-amount">${amount}</span>`;
  });
}
