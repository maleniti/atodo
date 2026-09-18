#!/bin/sh
# Runs automatically on container start -- nginx:alpine's own entrypoint
# executes every executable *.sh in /docker-entrypoint.d/ before starting
# nginx. Writes config.js (see config.example.js) from the UNSPLASH_ACCESS_KEY,
# LANDING_VIDEO_URL_EN, LANDING_VIDEO_URL_HR, and API_BASE_URL env vars so an
# admin can set/rotate them per-deployment (docker run -e / compose
# environment:) without rebuilding the image. Left empty if an env var isn't
# set -- app.js's loadUnsplashAccessKey() then falls back to a per-device key
# entered through the background picker itself (same as local dev without a
# config.js), landing.js just shows its video placeholder instead of an embed
# for whichever language(s) are unset, and auth.js's apiFetch falls back to a
# same-origin /atodo/v1.
set -eu

: "${UNSPLASH_ACCESS_KEY:=}"
: "${LANDING_VIDEO_URL_EN:=}"
: "${LANDING_VIDEO_URL_HR:=}"
: "${API_BASE_URL:=}"
# Escape backslashes and double quotes so the values can't break out of the
# JS string literals below -- an Unsplash key is alphanumeric, and a YouTube/
# API base URL has no quotes in practice, but this costs nothing and removes
# the assumption.
escaped_key=$(printf '%s' "$UNSPLASH_ACCESS_KEY" | sed 's/\\/\\\\/g; s/"/\\"/g')
escaped_video_url_en=$(printf '%s' "$LANDING_VIDEO_URL_EN" | sed 's/\\/\\\\/g; s/"/\\"/g')
escaped_video_url_hr=$(printf '%s' "$LANDING_VIDEO_URL_HR" | sed 's/\\/\\\\/g; s/"/\\"/g')
escaped_api_base_url=$(printf '%s' "$API_BASE_URL" | sed 's/\\/\\\\/g; s/"/\\"/g')

cat > /usr/share/nginx/html/config.js <<JS
// Generated at container startup from the UNSPLASH_ACCESS_KEY/
// LANDING_VIDEO_URL_EN/LANDING_VIDEO_URL_HR/API_BASE_URL env vars -- see
// docker-entrypoint.d/40-write-app-config.sh. Not persisted anywhere; edits
// here are lost on the next container start.
window.APP_CONFIG = { unsplashAccessKey: "${escaped_key}", landingVideoUrlEn: "${escaped_video_url_en}", landingVideoUrlHr: "${escaped_video_url_hr}", apiBaseUrl: "${escaped_api_base_url}" };
JS
