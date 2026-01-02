FROM php:8.1.34-apache-trixie

# 1. Installiamo i driver per Postgres
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# 2. Cambiamo la DocumentRoot di Apache per puntare a backend/src
# Invece di /var/www/html, ora punterà a /var/www/html/backend/src
ENV APACHE_DOCUMENT_ROOT /var/www/html/backend/src

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/htdocs!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 3. Impostiamo la cartella di lavoro
WORKDIR /var/www/html

# 4. Copiamo tutto il progetto (assumendo context: . nel compose)
COPY . .

# 5. Permessi (opzionale ma consigliato per evitare errori di scrittura)
RUN chown -R www-data:www-data /var/www/html