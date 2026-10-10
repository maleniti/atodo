// The Privacy Policy and Terms of Service pages (privacy.html, terms.html):
// the document as published, from GET /atodo/v1/legal/:kind -- written and
// published in the admin app's Legal tab, not part of the interface texts.
// Its title and body (HTML) come in the page's language (else English);
// "Last updated" is when the version was published, the same in every
// language, written out in the page's. Switching the language (the EN/HR
// toggle, site-i18n.js) loads the document in that one. Depends on
// i18n.js/site-i18n.js (and config.js, for the API's address).

const LEGAL_DATE_LOCALES = { en: 'en-GB', hr: 'hr-HR' };

function formatLegalDate(iso, lang) {
  return new Intl.DateTimeFormat(LEGAL_DATE_LOCALES[lang] || lang, {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Zagreb',
  }).format(new Date(iso));
}

function initLegalPage(kind) {
  const titleEl = document.getElementById('legal-title');
  const updatedEl = document.getElementById('legal-updated');
  const bodyEl = document.getElementById('legal-body');
  const loads = {};
  let seq = 0;

  const showDocument = async (lang) => {
    const mine = ++seq;
    if (!loads[lang]) {
      loads[lang] = fetch(`${apiBase()}/atodo/v1/legal/${kind}?lang=${encodeURIComponent(lang)}`)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .catch((err) => {
          delete loads[lang]; // try again on the next switch
          throw err;
        });
    }
    try {
      const doc = await loads[lang];
      if (mine !== seq) return;
      titleEl.textContent = doc.title;
      document.title = `${doc.title} -- A-To-Do`;
      updatedEl.textContent = pageText('legal.lastUpdated', { date: formatLegalDate(doc.publishedAt, lang) });
      bodyEl.innerHTML = doc.body;
    } catch (err) {
      if (mine !== seq) return;
      console.error(`Failed to load the ${kind} document:`, err);
      updatedEl.textContent = '';
      bodyEl.textContent = pageText('legal.unavailable');
    }
  };

  initSitePage(null, showDocument);
}
