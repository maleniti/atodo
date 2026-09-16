FROM nginx:alpine

COPY index.html style.css app.js recurrence.js sharedInputBehavior.js /usr/share/nginx/html/

# Writes config.js (the Unsplash Access Key -- see config.example.js) from
# the UNSPLASH_ACCESS_KEY env var at container start. Deliberately not COPYed
# alongside the files above: it must be regenerated per-container, not baked
# into the image, so the key can be set/rotated via `docker run -e`/compose
# without a rebuild.
COPY docker-entrypoint.d/40-write-app-config.sh /docker-entrypoint.d/40-write-app-config.sh
RUN chmod +x /docker-entrypoint.d/40-write-app-config.sh

EXPOSE 80
