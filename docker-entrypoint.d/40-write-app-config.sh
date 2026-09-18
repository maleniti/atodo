#!/bin/sh
# Runs automatically on container start -- nginx:alpine's own entrypoint
# executes every executable *.sh in /docker-entrypoint.d/ before starting
# nginx. Writes config.js (see config.example.js) from the UNSPLASH_ACCESS_KEY
# and LANDING_VIDEO_URL env vars so an admin can set/rotate them per-deployment
# (docker run -e / compose environment:) without rebuilding the image. Left
# empty if an env var isn't set -- app.js's loadUnsplashAccessKey() then falls
# back to a per-device key entered through the background picker itself (same
# as local dev without a config.js), and landing.js just shows its video
# placeholder instead of an embed.
set -eu

: "${UNSPLASH_ACCESS_KEY:=}"
: "${LANDING_VIDEO_URL:=}"
# Escape backslashes and double quotes so the values can't break out of the
# JS string literals below -- an Unsplash key is alphanumeric and a YouTube
# URL has no quotes in practice, but this costs nothing and removes the
# assumption.
escaped_key=$(printf '%s' "$UNSPLASH_ACCESS_KEY" | sed 's/\\/\\\\/g; s/"/\\"/g')
escaped_video_url=$(printf '%s' "$LANDING_VIDEO_URL" | sed 's/\\/\\\\/g; s/"/\\"/g')

cat > /usr/share/nginx/html/config.js <<JS
// Generated at container startup from the UNSPLASH_ACCESS_KEY/
// LANDING_VIDEO_URL env vars -- see docker-entrypoint.d/40-write-app-config.sh.
// Not persisted anywhere; edits here are lost on the next container start.
window.APP_CONFIG = { unsplashAccessKey: "${escaped_key}", landingVideoUrl: "${escaped_video_url}" };
JS
