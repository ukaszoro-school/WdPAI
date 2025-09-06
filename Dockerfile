FROM alpine:3.22.1

ENV POSTGRES_USER=pguser
ENV POSTGRES_PASSWORD=3344
ENV POSTGRES_DB=pgdb
ENV PGDATA=/var/lib/postgresql/data
ENV PYTHONWARNINGS="ignore::UserWarning"

RUN apk add --no-cache bash curl unzip postgresql postgresql-client nginx php83 php83-fpm php83-pdo php83-pdo_pgsql php83-json php83-mbstring php83-openssl php83-session php83-phar supervisor npm nodejs

RUN mkdir -p "$PGDATA" /run/nginx /app && chown -R postgres:postgres "$PGDATA"

USER postgres
RUN initdb -D "$PGDATA"

USER root
RUN mkdir -p /run/postgresql
RUN chown -R postgres /run/postgresql
WORKDIR /app
COPY server /app/server
COPY site /app/site
COPY web /app/web

USER postgres
RUN pg_ctl -D "$PGDATA" -l /dev/stderr start && \
    psql --username=postgres --dbname=postgres -c "CREATE USER ${POSTGRES_USER} WITH PASSWORD '${POSTGRES_PASSWORD}';" && \
    psql --username=postgres --dbname=postgres -c "CREATE DATABASE ${POSTGRES_DB} OWNER ${POSTGRES_USER};" && \
    php server/migrations/create_tables.php && \
    pg_ctl -D "$PGDATA" stop

USER root

RUN mkdir -p /etc/nginx/conf.d
COPY ./conf/nginx.conf /etc/nginx/http.d/default.conf

# listen on socket instead of TCP
RUN sed -i 's|^;*listen =.*|listen = /run/php-fpm.sock|' /etc/php83/php-fpm.d/www.conf && \
    sed -i 's|^;*listen.owner =.*|listen.owner = nginx|' /etc/php83/php-fpm.d/www.conf && \
    sed -i 's|^;*listen.group =.*|listen.group = nginx|' /etc/php83/php-fpm.d/www.conf && \
    sed -i 's|^;*catch_workers_output =.*|catch_workers_output = yes|' /etc/php83/php-fpm.d/www.conf

COPY ./conf/supervisord.conf /etc/supervisord.conf

WORKDIR /app/web
RUN npm install && npm run build

EXPOSE 8080 5432

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
