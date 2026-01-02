# Roadmap di Sviluppo - Golf with Friends Stats

Questa roadmap è pensata per guidarti passo dopo passo nell'implementazione del progetto, mettendo in pratica Docker, PHP e React.

## Fase 1: Setup Ambiente (Infrastruttura)
Obiettivo: Avere i 3 container (FE, BE, DB) che girano e si "vedono".

- [x] Installa Docker Desktop (se non presente).
- [x] Crea la struttura delle cartelle (`backend`, `frontend`, `docker-compose.yml`).
- [x] Scrivi il `Dockerfile` per il Backend (PHP + Apache).
- [x] Scrivi il `docker-compose.yml` includendo Postgres.
- [x] Crea un file `index.php` di test in `backend/src` (es. `<?php echo "Hello from PHP"; ?>`).
- [x] Inizializza il progetto React nel frontend (`npm create vite@latest`).
- [?] Scrivi il `Dockerfile` per il Frontend.
- [x] Avvia tutto con `docker-compose up -d --build`.
- [x] Verifica accesso a:
    - Backend: `http://localhost:8000`
    - Frontend: `http://localhost:5173`

## Fase 2: Backend Core & Database
Obiettivo: Creare il database e le prime API funzionanti.

- [ ] Collegati al container DB e crea lo schema iniziale (Tabelle `users`, `courses`).
- [ ] Scrivi lo script PHP per la connessione al DB (`db.php`) usando PDO.
- [ ] Crea l'API "Lista Amici" (`api/users.php`):
    - Deve restituire JSON.
    - Gestire Headers CORS.
- [ ] Crea l'API "Aggiungi Amico" (POST request).
- [ ] Testa le API con Postman o cURL.

## Fase 3: Frontend Base & Integrazione
Obiettivo: Visualizzare i dati del backend in React.

- [ ] Installa Tailwind CSS e Ant Design nel frontend.
- [ ] Installa e configura **react-i18next** per il supporto multilingua.
- [ ] Configura il layout base (Navbar, Sidebar).
- [ ] Crea la pagina "Amici".
- [ ] Implementa la chiamata `fetch` all'API `http://localhost:8000/api/users.php`.
- [ ] Mostra la lista degli amici in una tabella Ant Design.
- [ ] Aggiungi un form/modale per creare un nuovo amico (chiamata POST).

## Fase 4: Funzionalità Avanzate
Obiettivo: Completare le feature di business.

- [ ] **Percorsi**: Implementa CRUD (Create, Read, Update, Delete) per i campi da golf (BE + FE).
- [ ] **Partite e Polimorfismo**:
    - Crea tabelle `matches` (partite su corso) e `tournaments` (prove libere).
    - Crea tabella `scores` con campi `scoreable_id` e `scoreable_type` (Relazione Polimorfica).
    - Implementa logica PHP per salvare punteggi collegati a entità diverse.
    - API per salvare una partita complessa (transazione SQL).
    - UI per form di inserimento partita (Select Corso, Select Multipla Amici).
- [ ] **Dashboard**: Calcola semplici statistiche in PHP (es. `COUNT(*)`) e mostrale in React.

## Fase 5: Polish & Calendar
- [ ] Migliora lo stile con Tailwind.
- [ ] Aggiungi gestione errori (es. DB offline).
- [ ] (Opzionale) Integrazione Google Calendar API.
