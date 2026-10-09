// Support page -- A-To-Do's contact form: billing, account trouble, bugs,
// suggestions, complaints. POST /atodo/v1/support (auth.js's apiFetch,
// which sends the stored session token if there is one, so a logged-in
// visitor's message is filed under their account -- and their name and
// email are filled in). Works logged out too: someone who can't log in
// needs it most. ?topic=<kind> preselects the topic (the FAQ links here
// that way). Depends on config.js, version.js (the client's version, sent
// along to help diagnose bugs), auth.js and site-i18n.js.

const supportForm = document.getElementById('support-form');
const nameInput = document.getElementById('support-name');
const emailInput = document.getElementById('support-email');
const kindSelect = document.getElementById('support-kind');
const msgInput = document.getElementById('support-msg');
const consentInput = document.getElementById('support-consent');
const kindHintEl = document.getElementById('support-kind-hint');
const accountNoteEl = document.getElementById('support-account-note');
const statusEl = document.getElementById('support-status');
const submitBtn = document.getElementById('support-submit');
let supportLanguage = 'en';
let accountEmail = null;

const supportStrings = () => siteStrings();

function setStatus(key, kind = '') {
  statusEl.dataset.i18n = key;
  statusEl.textContent = supportStrings()[key];
  statusEl.className = `support-status${kind ? ` ${kind}` : ''}`;
}

// The texts that depend on more than the language: the topic's hint, and
// whose account the message goes out from.
function renderSupportExtras(lang) {
  supportLanguage = lang;
  const strings = supportStrings();
  kindHintEl.textContent = kindSelect.value ? strings[`support.hint.${kindSelect.value}`] || '' : '';
  accountNoteEl.textContent = accountEmail ? strings['support.accountNote'].replace('{email}', accountEmail) : '';
  accountNoteEl.classList.toggle('hidden', !accountEmail);
}

kindSelect.onchange = () => renderSupportExtras(supportLanguage);

const topic = new URLSearchParams(location.search).get('topic');
if (topic && kindSelect.querySelector(`option[value="${CSS.escape(topic)}"]`)) kindSelect.value = topic;

supportForm.onsubmit = async (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setStatus('support.invalidEmail', 'error');
    return;
  }
  submitBtn.disabled = true;
  setStatus('support.sending');
  try {
    await apiFetch('/support', {
      method: 'POST',
      body: {
        name: nameInput.value.trim(),
        email,
        kind: kindSelect.value,
        msg: msgInput.value.trim(),
        context: {
          appVersion: window.APP_VERSION || 'dev',
          page: document.referrer || location.href,
          language: supportLanguage,
          userAgent: navigator.userAgent,
        },
      },
    });
    setStatus('support.sent', 'success');
    msgInput.value = '';
    consentInput.checked = false;
  } catch (err) {
    console.error('Sending the support message failed:', err);
    setStatus(err.code === 'INVALID_EMAIL' ? 'support.invalidEmail' : 'support.failed', 'error');
  } finally {
    submitBtn.disabled = false;
  }
};

initSitePage('support', renderSupportExtras);

// Logged in: fill in who's writing (still editable -- the reply goes to
// the email entered), and say the message goes out from the account.
if (getCurrentUserIdFromStoredToken()) {
  apiFetch('/auth/me')
    .then((user) => {
      accountEmail = user.email;
      if (!nameInput.value) nameInput.value = user.nickname || '';
      if (!emailInput.value) emailInput.value = user.email;
      renderSupportExtras(supportLanguage);
    })
    .catch(() => {});
}
