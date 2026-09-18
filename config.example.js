// Copy this file to config.js (gitignored -- never commit real keys) and
// fill in a real Unsplash Access Key to make it the app-wide default for
// every user, so individual users don't need their own Unsplash account to
// pick a background. See CLAUDE.md's "Configuration" section for how this
// gets loaded, both for local dev and the Docker image.
//
// Get a free key at https://unsplash.com/developers (create an app, use its
// "Access Key" -- not the "Secret Key").
//
// landingVideoUrl: a YouTube link (a plain watch URL, a youtu.be short link,
// or an already-embeddable one all work -- see landing.js's
// toYouTubeEmbedUrl) for the walkthrough video on landing.html. Left empty,
// that page just shows a placeholder instead of a video.
window.APP_CONFIG = {
  unsplashAccessKey: '',
  landingVideoUrl: '',
};
