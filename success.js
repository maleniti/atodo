// Subscribed/thank-you page -- no auth.js dependency (nothing left to do
// here but link onward), just site-i18n.js for language handling.

const SUCCESS_I18N = {
  en: {
    'success.title': 'Thanks for subscribing!',
    'success.body': 'Your A-To-Do Pro subscription is active. Log back in to pick up right where you left off.',
    'success.loginCta': 'Go to login',
    'nav.privacy': 'Privacy Policy',
    'nav.terms': 'Terms of Service',
  },
  hr: {
    'success.title': 'Hvala na pretplati!',
    'success.body': 'Vaša A-To-Do Pro pretplata je aktivna. Prijavite se ponovno da nastavite točno gdje ste stali.',
    'success.loginCta': 'Idi na prijavu',
    'nav.privacy': 'Pravila privatnosti',
    'nav.terms': 'Uvjeti korištenja',
  },
};

initSitePage(SUCCESS_I18N);
