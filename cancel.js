// Checkout-cancelled page -- no auth.js dependency, just site-i18n.js.

const CANCEL_I18N = {
  en: {
    'cancel.title': 'No charge made',
    'cancel.body': "Your payment was cancelled and you haven't been charged. You can pick a plan again any time.",
    'cancel.backToPricing': 'Back to pricing',
    'cancel.unavailableTitle': 'Payments are unavailable right now',
    'cancel.unavailableBody': "We can't take payments at the moment, so nothing was charged. Please try again later.",
    'cancel.subscribedTitle': "You're already subscribed",
    'cancel.subscribedBody': 'This account already has an active Pro subscription, so nothing was charged. You can manage it in Settings.',
    'nav.privacy': 'Privacy Policy',
    'nav.terms': 'Terms of Service',
  },
  hr: {
    'cancel.title': 'Nije izvršeno plaćanje',
    'cancel.body': 'Vaše plaćanje je otkazano i niste naplaćeni. Plan možete odabrati ponovno u bilo kojem trenutku.',
    'cancel.backToPricing': 'Povratak na cijene',
    'cancel.unavailableTitle': 'Plaćanje trenutno nije moguće',
    'cancel.unavailableBody': 'Plaćanja trenutno ne možemo primati, pa ništa nije naplaćeno. Pokušajte ponovno kasnije.',
    'cancel.subscribedTitle': 'Već imate pretplatu',
    'cancel.subscribedBody': 'Ovaj račun već ima aktivnu Pro pretplatu, pa ništa nije naplaćeno. Njome možete upravljati u Postavkama.',
    'nav.privacy': 'Pravila privatnosti',
    'nav.terms': 'Uvjeti korištenja',
  },
};

// ?reason= (see checkout.js) swaps in a more specific explanation than the
// default "payment cancelled" one.
const reason = new URLSearchParams(location.search).get('reason');
if (reason === 'unavailable' || reason === 'subscribed') {
  document.querySelector('[data-i18n="cancel.title"]').dataset.i18n = `cancel.${reason}Title`;
  document.querySelector('[data-i18n="cancel.body"]').dataset.i18n = `cancel.${reason}Body`;
}

initSitePage(CANCEL_I18N);
