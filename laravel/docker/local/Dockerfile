# 1. Use PHP 8.4 FPM (FastCGI Process Manager) on Alpine Linux for a tiny footprint
FROM php:8.4-fpm-alpine

# 2. Install system dependencies required for PHP extensions and Composer
RUN apk add --no-cache \
    bash \
    curl \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    oniguruma-dev \
    libzip-dev \
    icu-dev

# 3. Install PHP extensions that Laravel 12 needs to thrive
RUN docker-php-ext-install \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip \
    intl

# 4. Grab the latest Composer binary from the official Composer image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 5. Set the working directory to match your docker-compose volume
WORKDIR /var/www/html

# 6. Create a system user to match your Linux UID (avoids permission headaches)
# Replace 1000 with your actual UID if 'id -u' returns something else
RUN addgroup -g 1000 laravel && adduser -G laravel -u 1000 -s /bin/sh -D laravel

# 7. Set permissions for the Laravel storage and cache folders
# We do this later via command line if the folders don't exist yet, 
# but we switch to the 'laravel' user for security/convenience
USER laravel

# 8. Start the PHP-FPM server
CMD ["php-fpm"]