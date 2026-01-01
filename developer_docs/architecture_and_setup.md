# Architettura del Progetto e Guida alla Setup

Questo documento spiega come configurare l'ambiente di sviluppo con **Docker** e come far comunicare il Frontend (React) con il Backend (PHP).

## 1. Architettura a Container (Docker)

Utilizzeremo `docker-compose` per gestire 3 servizi principali che comunicano tra loro in una rete virtuale privata creata da Docker.

### I Tre Servizi (Containers)

1.  **`db` (PostgreSQL)**: Il database.
    - Ascolta sulla porta `5432` (interna).
    - Mantiene i dati persistenti in un volume Docker.
2.  **`backend` (PHP + Web Server)**:
    - Utilizza un'immagine PHP (es. `php:8.2-apache`).
    - Espone le API sulla porta `8000` (mappata sulla `80` interna del container).
    - Si connette al `db` usando l'host `db` (nome del servizio nel docker-compose).
3.  **`frontend` (React + Vite)**:
    - Utilizza un'immagine Node (es. `node:20`).
    - Espone l'interfaccia utente sulla porta `3000` o `5173`.
    - Durante lo sviluppo, il container fa girare `npm run dev`.

## 2. Comunicazione Frontend - Backend

La domanda chiave è: *Come fa React a chiedere dati a PHP?*

La comunicazione avviene tramite **HTTP Requests** (Protocollo REST).
React gira nel browser dell'utente, mentre PHP gira nel server (o container).

### Flusso della Chiamata
1.  **Browser (React)**: L'utente apre la pagina "Lista Amici".
2.  **JavaScript (Fetch/Axios)**: Il componente React esegue una chiamata asincrona all'URL del backend.
    ```javascript
    // Esempio chiamata React
    const response = await fetch('http://localhost:8000/api/users.php');
    const data = await response.json();
    ```
3.  **Docker Network -> Backend**: La richiesta arriva alla porta `8000` del tuo computer, che Docker gira al container PHP.
4.  **PHP Script**: Il file `users.php` riceve la richiesta.
    - Si connette al DB.
    - Esegue query `SELECT * FROM users`.
    - Prende i risultati e li trasforma in JSON (`json_encode($users)`).
5.  **Risposta**: Il JSON torna al browser.
6.  **React Render**: React riceve i dati e aggiorna la UI mostrandoli.

### CORS (Cross-Origin Resource Sharing)
Poiché Frontend (`localhost:5173`) e Backend (`localhost:8000`) sono su porte diverse, il browser bloccherà le richieste per sicurezza.
**Soluzione**: Nel codice PHP devi aggiungere gli header CORS per permettere l'accesso:
```php
header("Access-Control-Allow-Origin: *"); // O specifico dominio
header("Content-Type: application/json");
```

## 3. Guida Setup Iniziale

### Struttura Directory Consigliata
Crea una cartella radice `golf-stats` e dentro:

```
golf-stats/
├── docker-compose.yml
├── backend/
│   ├── src/ (Codice PHP)
│   ├── Dockerfile
│   └── index.php
└── frontend/
    ├── src/ (Codice React)
    ├── Dockerfile
    └── package.json
```

### Esempio `docker-compose.yml`

```yaml
version: '3.8'
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: golf_db
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    ports:
      - "8000:80"
    volumes:
      - ./backend/src:/var/www/html
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    command: npm run dev
```

Questa configurazione ti permette di modificare i file PHP e React nel tuo computer e vedere le modifiche immediatamente grazie ai `volumes`.
