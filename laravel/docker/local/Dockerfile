# 1. Use PHP 8.4 with Apache on Debian for full compatibility
FROM php:8.4-apache

# 2. Install system dependencies required for PHP extensions and Composer
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    libonig-dev \
    libzip-dev \
    libicu-dev \
    libpq-dev \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# 3. Install PHP extensions that Laravel needs
RUN docker-php-ext-install \
    pdo_mysql \
    pdo_pgsql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip \
    intl

# 4. Enable Apache Rewrite Module
RUN a2enmod rewrite

# 5. Set the Document Root to Laravel's public folder
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e "s!/var/www/html!${APACHE_DOCUMENT_ROOT}!g" /etc/apache2/sites-available/*.conf
RUN sed -ri -e "s!/var/www/html!${APACHE_DOCUMENT_ROOT}!g" /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 6. Allow .htaccess files and set basic security
RUN echo "<Directory /var/www/html/public>\n\
    Options Indexes FollowSymLinks\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>" >> /etc/apache2/apache2.conf

# 7. Grab the latest Composer binary
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 8. Set the working directory
WORKDIR /var/www/html

# 9. Create a system user to match your Linux UID (avoids permission headaches)
# Replace 1000 with your actual UID if 'id -u' returns something else
RUN usermod -u 1000 www-data && groupmod -g 1000 www-data

# 10. Set permissions for the Laravel storage and bootstrap cache folders
RUN mkdir -p storage/logs storage/framework/cache storage/framework/sessions storage/framework/views bootstrap/cache && \
    chown -R www-data:www-data /var/www/html && \
    chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# 11. Copy Laravel files (for initial build)
# For development, volumes override this
COPY . .

# 12. Install PHP dependencies
RUN composer install --no-interaction --optimize-autoloader
