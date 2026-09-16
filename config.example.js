// Copy this file to config.js (gitignored -- never commit real keys) and
// fill in a real Unsplash Access Key to make it the app-wide default for
// every user, so individual users don't need their own Unsplash account to
// pick a background. See CLAUDE.md's "Configuration" section for how this
// gets loaded, both for local dev and the Docker image.
//
// Get a free key at https://unsplash.com/developers (create an app, use its
// "Access Key" -- not the "Secret Key").
window.APP_CONFIG = {
  unsplashAccessKey: '',
};
