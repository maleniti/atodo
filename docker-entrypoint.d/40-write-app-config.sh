#!/bin/sh
# Runs automatically on container start -- nginx:alpine's own entrypoint
# executes every executable *.sh in /docker-entrypoint.d/ before starting
# nginx. Writes config.js (see config.example.js) from the UNSPLASH_ACCESS_KEY
# and API_BASE_URL env vars so an admin can set/rotate them per-deployment
# (docker run -e / compose environment:, or a bind-mounted /atodo/.env --
# see below) without rebuilding the image. Left empty if unset -- app.js's
# loadUnsplashAccessKey() then falls back to a per-device key entered
# through the background picker itself (same as local dev without a
# config.js), and auth.js's apiFetch falls back to a same-origin /atodo/v1.
# (The landing page's video links are interface texts now, edited in the
# admin app -- see landing.js.)
set -eu

# A platform deploying this image via a per-service config file rather than
# discrete env vars (e.g. a docker-compose bind mount) can supply one at
# /atodo/.env in the same KEY=value shape as the .env described in
# CLAUDE.md/atd -- takes priority over either env var below if
# both are somehow given, since that's the more specific, deliberately
# provided source.
if [ -f /atodo/.env ]; then
 set -a
 # shellcheck source=/dev/null
 . /atodo/.env
 set +a
fi

: "${UNSPLASH_ACCESS_KEY:=}"
: "${API_BASE_URL:=}"
# Escape backslashes and double quotes so the values can't break out of the
# JS string literals below -- an Unsplash key is alphanumeric, and an API
# base URL has no quotes in practice, but this costs nothing and removes the
# assumption.
escaped_key=$(printf '%s' "$UNSPLASH_ACCESS_KEY" | sed 's/\\/\\\\/g; s/"/\\"/g')
escaped_api_base_url=$(printf '%s' "$API_BASE_URL" | sed 's/\\/\\\\/g; s/"/\\"/g')

cat > /usr/share/nginx/html/config.js <<JS
// Generated at container startup from the UNSPLASH_ACCESS_KEY/API_BASE_URL
// env vars -- see docker-entrypoint.d/40-write-app-config.sh. Not persisted
// anywhere; edits here are lost on the next container start.
window.APP_CONFIG = { unsplashAccessKey: "${escaped_key}", apiBaseUrl: "${escaped_api_base_url}" };
JS
