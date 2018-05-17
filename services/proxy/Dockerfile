FROM nginx:mainline-alpine

ARG DOCKERIZE_VER
ENV DOCKERIZE_VER ${DOCKERIZE_VER:-v0.6.1}
RUN echo "Dockerize version: ${DOCKERIZE_VER}"

RUN apk --update add curl \
    && curl -LO  https://github.com/jwilder/dockerize/releases/download/${DOCKERIZE_VER}/dockerize-alpine-linux-amd64-${DOCKERIZE_VER}.tar.gz \
    && tar xfvz dockerize-alpine-linux-amd64-${DOCKERIZE_VER}.tar.gz \
    && mv dockerize /usr/bin/dockerize \
    && apk del curl libcurl libssh2 ca-certificates \
    && rm -rf /var/cache/apk/*


COPY nginx.tmpl.conf /app/nginx.conf.tmpl
COPY h5bp /etc/nginx/h5bp
COPY h5bp-full /etc/nginx/h5bp-full

## Create empty files for access control and accessory functionalities
RUN touch /etc/nginx/rewrites.conf
RUN touch /etc/nginx/.htpasswd

## Proxy configuration
ENV NGINX_HOST "_"
ENV NGINX_PORT "80"
ENV NGINX_UPSTREAM_SERVER "localhost"
ENV NGINX_UPSTREAM_PORT "3000"

## Nginx HTTP Headers for security
# HSTS Example add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
ENV NGINX_HSTS_HEADER ""
ENV NGINX_CSP_HEADER ""
ENV NGINX_X_XSS_PROTECTION_HEADER 'add_header X-Xss-Protection "1; mode=block" always;'
ENV NGINX_X_CONTENT_TYPE_OPTIONS_HEADER 'add_header X-Content-Type-Options "nosniff" always;'
ENV NGINX_X_FRAME_OPTIONS_HEADER 'add_header X-Frame-Options "SAMEORIGIN" always;'
ENV NGINX_REFERRER_POLICY_HEADER 'add_header Referrer-Policy "no-referrer" always;'

## Static Files Proxy
ENV NGINX_STATIC_FILES_ENABLED "true"
ENV NGINX_STATIC_FILES_ROOT "/usr/share/nginx/html"
ENV NGINX_STATIC_FILES_LOCATION "^~ /static/"

## Basic Auth
ENV NGINX_AUTH_BASIC_ENABLED "false"
ENV NGINX_AUTH_BASIC_HTPASSWD "/etc/nginx/.htpasswd"

## Rewrite Rules
ENV NGINX_REWRITES_ENABLED = "false"
ENV NGINX_REWRITES_CONF = "/etc/nginx/rewrites.conf"

## Misc
# Add the following CIDR IP Ranges to the geo $ip_access_granted variable
# If it's unset the service will allow all traffic (0.0.0.0/0)
# ENV NGINX_WHITELISTED_IP_RANGES ""
ENV NGINX_AUTH_COOKIE_NAME "webapp-access-cookie"
ENV NGINX_AUTH_COOKIE_VALUE "RSog06uO8JhhA4EqVg9WxETffSGbu13xVLl1OQT9LTE0Wg1wso"
ENV NGINX_REAL_IP_CIDR "10.0.0.0/16"
# NGINX_PROXY_PASS_TRAIL_SLASH controls the proxy_pass directive in server {}.
# If set to "true" a trailing slash will be added. true: http://webapp/; false: http://webapp;
ENV NGINX_PROXY_PASS_TRAIL_SLASH "false"
# NGINX_PROXY_REDIRECT controls the proxy_redirect directive in server {}.
# If unset to or to off the following will be added: proxy_redirect   off;
ENV NGINX_PROXY_REDIRECT "off"
# NGINX_PROXY_HEADER_X_FORWARDED_PROTO controls the proxy_set_header        X-Forwarded-Proto in server{}
# If unset it it will use the incoming scheme from the load balancer. This can be used to override the value
ENV NGINX_PROXY_HEADER_X_FORWARDED_PROTO '$scheme'
# Action to perform if access denied
ENV NGINX_NO_ACCESS_ACTION 'return 404;'

CMD ["/usr/bin/dockerize", "-template", "/app/nginx.conf.tmpl:/etc/nginx/nginx.conf", "nginx"]
