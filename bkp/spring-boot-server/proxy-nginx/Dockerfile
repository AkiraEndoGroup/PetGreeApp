FROM nginx:1.15.1-alpine

ADD default.conf /etc/nginx/conf.d/
ADD nginx.conf /etc/nginx/nginx.conf
RUN mkdir -p /data/nginx/cache
RUN chown -R 100: /data
EXPOSE 80
