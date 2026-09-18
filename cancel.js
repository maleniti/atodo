// Checkout-cancelled page -- no auth.js dependency, just site-i18n.js.

const CANCEL_I18N = {
  en: {
    'cancel.title': 'No charge made',
    'cancel.body': "Your payment was cancelled and you haven't been charged. You can pick a plan again any time.",
    'cancel.backToPricing': 'Back to pricing',
    'nav.privacy': 'Privacy Policy',
    'nav.terms': 'Terms of Service',
  },
  hr: {
    'cancel.title': 'Nije izvršeno plaćanje',
    'cancel.body': 'Vaše plaćanje je otkazano i niste naplaćeni. Plan možete odabrati ponovno u bilo kojem trenutku.',
    'cancel.backToPricing': 'Povratak na cijene',
    'nav.privacy': 'Pravila privatnosti',
    'nav.terms': 'Uvjeti korištenja',
  },
};

initSitePage(CANCEL_I18N);
