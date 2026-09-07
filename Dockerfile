FROM nginx:alpine

COPY index.html style.css app.js recurrence.js sharedInputBehavior.js /usr/share/nginx/html/

EXPOSE 80
