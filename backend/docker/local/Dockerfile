FROM php:8.2-apache

# 1. Install drivers and dependencies
RUN apt-get update && apt-get install -y libpq-dev git zip unzip \
    && docker-php-ext-install pdo pdo_pgsql

# 2. Enable Apache Rewrite Module
RUN a2enmod rewrite

# 3. Set the Document Root correctly to the public folder
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e "s!/var/www/html!${APACHE_DOCUMENT_ROOT}!g" /etc/apache2/sites-available/*.conf
RUN sed -ri -e "s!/var/www/html!${APACHE_DOCUMENT_ROOT}!g" /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 4. CRITICAL: Allow .htaccess files to work and set basic security
RUN echo "<Directory /var/www/html/public>\n\
    Options Indexes FollowSymLinks\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>" >> /etc/apache2/apache2.conf

# 5. Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 6. Set working directory to the standard Apache root
WORKDIR /var/www/html

# 7. Copy your files
# Make sure you are running 'docker build' from INSIDE your backend folder 
# or adjust this path to copy only the backend content.
COPY . .

# 8. Install PHP dependencies
RUN composer install --no-interaction --optimize-autoloader

# 9. Set permissions for Apache
RUN chown -R www-data:www-data /var/www/html