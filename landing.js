// Landing page -- video embed + pricing buttons. Depends on auth.js (loaded
// first, see landing.html) for getCurrentUserIdFromStoredToken, and
// optionally on config.js's window.APP_CONFIG.landingVideoUrl (see
// CLAUDE.md's Configuration section) -- left with no video shown at all if
// that isn't set, same fallback spirit as the rest of this app's optional
// config.

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

(function setUpVideo() {
  const videoUrl = window.APP_CONFIG && window.APP_CONFIG.landingVideoUrl;
  const embedUrl = toYouTubeEmbedUrl(videoUrl);
  if (!embedUrl) return; // .video-placeholder (shown by default in landing.html) stays as-is
  document.getElementById('video-iframe').src = embedUrl;
  document.getElementById('video-frame').classList.remove('hidden');
  document.getElementById('video-placeholder').classList.add('hidden');
})();

// Already logged in (localStorage is shared across every page on this
// origin) -> straight to checkout; otherwise to the login screen first, with
// enough in the URL for it to send the visitor on to checkout right after
// (see index.html's login-form submit handler in app.js).
document.querySelectorAll('[data-plan]').forEach((btn) => {
  btn.onclick = () => {
    const plan = btn.dataset.plan;
    const userId = getCurrentUserIdFromStoredToken();
    if (userId) {
      location.href = `checkout.html?plan=${encodeURIComponent(plan)}`;
    } else {
      location.href = `index.html?next=checkout&plan=${encodeURIComponent(plan)}`;
    }
  };
});
