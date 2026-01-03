FROM php:8.1.34-apache-trixie

# 1. Installiamo i driver per Postgres e dipendenze per Composer
RUN apt-get update && apt-get install -y libpq-dev git zip unzip \
    && docker-php-ext-install pdo pdo_pgsql

# 2. Cambiamo la DocumentRoot di Apache per puntare a backend/src
# Invece di /var/www/html, ora punterà a /var/www/html/backend/src
ENV APACHE_DOCUMENT_ROOT /var/www/html/backend/src

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/htdocs!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Installiamo composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 3. Impostiamo la cartella di lavoro
WORKDIR /var/www/html/backend

# 4. Copiamo tutto il progetto (assumendo context: . nel compose)
# Nota: Poiché abbiamo cambiato WORKDIR, dobbiamo assicurarci di copiare nel posto giusto se usiamo percorsi relativi.
# Ma COPY . . di solito copia nella WORKDIR corrente.
# Tuttavia, per sicurezza e chiarezza, se vogliamo copiare tutto il contesto (che include backend e frontend) in /var/www/html,
# forse è meglio mantenere la copia in /var/www/html e POI cambiare WORKDIR.

WORKDIR /var/www/html
COPY . .

WORKDIR /var/www/html/backend

# 5. Installiamo le dipendenze PHP
RUN composer install

# 6. Permessi
RUN chown -R www-data:www-data /var/www/html