FROM nginxinc/nginx-unprivileged:1.25-bookworm

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# USER root

# RUN mkdir -p /home/app/web/staticfiles
# RUN chmod 755 /home/app/web/staticfiles

# USER nginx