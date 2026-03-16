# Architettura del Progetto e Guida alla Setup

Questo documento spiega come configurare l'ambiente di sviluppo con **Docker** e come far comunicare il Frontend (React) con il Backend (Laravel).

## 1. Architettura a Container (Docker)

Utilizziamo `docker-compose` per gestire i servizi che comunicano tra loro in una rete virtuale privata creata da Docker.

### Struttura dei Servizi

1.  **`backend` (Laravel + Apache)**:
    - Utilizza PHP 8.4 con Apache.
    - Espone sulla porta `80` interna del container.
    - Nginx Proxy Manager reindirizza il traffico HTTP al container.
    - Utilizza Eloquent ORM per comunicare con il database.
2.  **`db` (PostgreSQL)**: Il database.
    - Configurato in Laravel tramite `.env`.
    - Accessibile tramite host definito in `DB_HOST`.
3.  **`frontend` (React + Vite)**:
    - Utilizza un'immagine Node.
    - Durante lo sviluppo, il container fa girare `npm run dev`.

## 2. Struttura Directory

```
golf-with-friends-stats/
├── docker-compose.yml
├── laravel/
│   ├── app/                 # Codice applicazione (Controllers, Models, etc.)
│   ├── bootstrap/           # Bootstrapping Laravel
│   ├── config/             # Configurazioni Laravel
│   ├── database/           # Migrations, Seeders, Factories
│   ├── public/             # Entry point pubblico (index.php)
│   ├── resources/          # Views, Assets
│   ├── routes/             # Definizione route (web.php, api.php, etc.)
│   ├── storage/            # Log, cache, file upload
│   ├── vendor/             # Dipendenze Composer
│   ├── .env                # Variabili ambiente
│   ├── artisan             # CLI Laravel
│   ├── composer.json       # Dipendenze PHP
│   └── docker/local/Dockerfile
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
└── developer_docs/
    └── architecture_and_setup.md
```

## 3. Comunicazione Frontend - Backend

React e Laravel comunicano tramite **HTTP Requests** (API REST).

### Flusso della Chiamata

1.  **Browser (React)**: L'utente interagisce con l'app.
2.  **JavaScript**: Il componente React esegue una chiamata API.
    ```javascript
    // Esempio chiamata React
    const response = await fetch('http://golf-stats.local/api/users');
    const data = await response.json();
    ```
3.  **Nginx Proxy Manager**: Riceve la richiesta e la inoltra al container Laravel sulla porta 80.
4.  **Laravel Router**: La richiesta viene instradata al controller appropriato in base a `routes/web.php` o `routes/api.php`.
5.  **Controller**: Il controller processa la richiesta, usa Eloquent per interrogare il DB.
6.  **Risposta**: Laravel restituisce JSON al browser.
7.  **React**: Riceve i dati e aggiorna la UI.

### Routing in Laravel

Le route sono definite in:
- `routes/web.php` - Route per pagine web (con CSRF protection)
- `routes/api.php` - Route per API REST (senza CSRF, usa token)

```php
// routes/api.php esempio
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
```

### CORS

Laravel gestisce CORS automaticamente tramite il file `config/cors.php` (installando il package `fruitcake/laravel-cors` o Laravel 12 built-in CORS). Non servono header manuali.

## 4. Guida Setup Iniziale

### Prerequisiti

- Docker e Docker Compose
- Nginx Proxy Manager (o altro reverse proxy)
- PHP 8.4+ (per sviluppo locale diretto, opzionale)

### Configurazione Nginx Proxy Manager

1. Aggiungi in `/etc/hosts`:
   ```
   127.0.0.1 golf-stats.local
   ```

2. In Nginx Proxy Manager, crea un nuovo host:
   - **Domain Names**: `golf-stats.local`
   - **Scheme**: `http`
   - **Forward Hostname / IP**: `golf_backend` (nome del container)
   - **Port**: `80`

### Configurazione Database

Il file `laravel/.env` contiene la configurazione del database:

```env
DB_CONNECTION=pgsql
DB_HOST=postgres_db
DB_PORT=5432
DB_DATABASE=golf
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

**Nota**: Assicurati che il servizio PostgreSQL sia raggiungibile con il nome specificato in `DB_HOST`. Su Linux, se PostgreSQL è in esecuzione sull'host, potrebbe essere necessario usare l'IP dell'host o configurare `extra_hosts` in Docker.

### Avvio dei Container

```bash
# Build e avvio
docker-compose up -d --build

# Vedere i log
docker-compose logs -f backend

# Accedere al container
docker-compose exec backend sh
```

### Comandi Laravel Utili

```bash
# Eseguire migrazioni
docker-compose exec backend php artisan migrate

# Creare una nuova migrazione
docker-compose exec backend php artisan make:migration create_users_table

# Creare un controller
docker-compose exec backend php artisan make:controller UserController

# Pulire cache
docker-compose exec backend php artisan optimize:clear

# Liste route
docker-compose exec backend php artisan route:list
```

### Sviluppo Locale

I volumi Docker mountano le directory locali, quindi le modifiche ai file sono immediatamente disponibili nel container:

```yaml
volumes:
  - ./laravel:/var/www/html
```

## 5. Differenze rispetto a PHP Plain

| Aspetto | PHP Plain | Laravel |
|---------|-----------|---------|
| Routing | File PHP separati (`api/users.php`) | Route file centralizzati (`routes/web.php`, `routes/api.php`) |
| Database | PDO raw queries | Eloquent ORM |
| Struttura | File sparsi | MVC (Model-View-Controller) |
| Autoload | `spl_autoload_register` | Composer autoloader |
| CORS | Header manuali | Configurazione centralizzata |
| Configurazione | Variabili spread | File `.env` + `config/` |

## 6. Troubleshooting

### Permission Errors

Se hai errori di permessi:
```bash
docker-compose exec backend chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
```

### Database Connection Failed

- Verifica che PostgreSQL sia in esecuzione sull'host
- Controlla le credenziali in `laravel/.env`
- Prova a pingare `host.docker.internal` dal container:
  ```bash
  docker-compose exec backend ping host.docker.internal
  ```

### Modifiche non visibili

Dopo modifiche a config o classi:
```bash
docker-compose exec backend php artisan optimize:clear
```
