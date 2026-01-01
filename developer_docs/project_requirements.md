# Specifiche del Progetto: Golf with Friends Stats

## 1. Panoramica
Il progetto consiste in un'applicazione web gestionale per tracciare le partite di golf giocate con un gruppo di amici. L'obiettivo è mantenere uno storico delle partite, calcolare statistiche di vittoria/sconfitta e gestire l'organizzazione di futuri eventi tramite calendario.

## 2. Funzionalità Richieste

### 2.1 Gestione Utenti (Menu Amici)
- **Lista Amici**: Visualizzazione di tutti gli utenti registrati/amici aggiunti.
- **Aggiungi/Rimuovi**: Possibilità di aggiungere nuovi amici al sistema o rimuoverli.
- **Dettaglio Utente**: Pagina dedicata per ogni amico che mostra:
    - Numero totale partite giocate.
    - Numero partite vinte.
    - Numero partite perse (o piazzamenti).
    - (Opzionale) Media punteggio.

### 2.2 Gestione Percorsi (Course)
- **Lista Percorsi**: Elenco dei campi da golf salvati.
- **Aggiungi Percorso**: Form per inserire un nuovo campo con:
    - **Nome**: Nome del club o del percorso.
    - **Luogo**: Indirizzo fisico o indicazione "Online" (es. simulatori).
    - **Numero di Buche**: (es. 9 o 18).

### 2.3 Gestione Partite (Match Tracking)
- **Registra Partita**: Possibilità di inserire una nuova partita giocata.
    - Selezione del Percorso.
    - Selezione dei Partecipanti.
    - Inserimento Punteggi/Vincitore.
    - Data della partita.

### 2.4 Dashboard
La dashboard sarà la pagina principale e offrirà una visione d'insieme.
**Suggerimenti per i contenuti:**
- **Riepilogo Rapido**: Widget con le proprie statistiche (Partite Giocate mese corrente, Ultima Vittoria).
- **Leaderboard**: Classifica generale aggiornata degli amici (chi ha vinto più partite).
- **Ultima Partita**: Box con i dettagli dell'ultima partita giocata (chi ha vinto, dove, quando).
- **Prossimi Eventi**: Anteprima dei prossimi eventi dal calendario.
- **Grafico Andamento**: (Opzionale) Grafico a linea dei propri punteggi nelle ultime 5-10 partite.


### 2.5 Internazionalizzazione
- Supporto Multi-lingua (Italiano/Inglese inizialmente).
- Switch lingua nell'interfaccia utente.

### 2.6 Calendario ed Eventi
- Integrazione con **Google Calendar** (o visualizzazione simile).
- Possibilità di aggiungere un evento "Partita di Golf" al calendario e invitare i partecipanti.

## 3. Struttura Dati Dettagliata (Schema DB Proposto)

Per soddisfare la richiesta di distinguere tra **Partite su Corso** e **Prove Libere/Tornei**, e utilizzare una relazione polimorfica per i punteggi, proponiamo il seguente schema ER:

### Entità Principali

1.  **`users`**: Gli amici/giocatori.
    - `id` (PK), `name`, `email`, `created_at`.

2.  **`courses`**: I campi da golf ufficiali/standard.
    - `id` (PK), `name`, `location`, `holes_count` (es. 9, 18).

### Entità "Giocabili" (Polimorfismo)

Qui distinguiamo i due tipi di eventi:

3.  **`matches`**: Partite standard giocate su un `Course`.
    - `id` (PK), `course_id` (FK -> courses), `date`, `notes`.

4.  **`tournaments`** (o `free_practices`): Prove libere o mini-tornei gestiti autonomamente (anche online o senza un Course codificato).
    - `id` (PK), `name` (es. "Torneo di Natale"), `location` (Text, es. "Online" o "Giardino di Marco"), `date`, `description`.

### Punteggi (Tabella Pivot Polimorfica)

Questa tabella collega un Utente a un "Evento Giocato" (che può essere un `Match` o un `Tournament`).

5.  **`scores`**:
    - `id` (PK)
    - `user_id` (FK -> users)
    - `scoreable_type`: Stringa che indica il tipo di evento (es. `'match'` o `'tournament'`).
    - `scoreable_id`: L'ID dell'evento specifico.
    - `points_total`: Il punteggio finale (es. colpi totali o punti stableford).
    - `is_winner`: Boolean (true se ha vinto l'evento).
    - `details`: Campo JSON per dettagli extra (es. punteggi buca per buca se servono).

### Esempio di Relazione Polimorfica
- Se Mario gioca una **Partita Standard** (ID 10):
    - `scores` avrà: `user_id=Mario`, `scoreable_type='match'`, `scoreable_id=10`.
- Se Mario partecipa al **Torneo Online** (ID 5):
    - `scores` avrà: `user_id=Mario`, `scoreable_type='tournament'`, `scoreable_id=5`.

## 4. Stack Tecnologico (Scelto per finalità didattiche)

- **Infrastruttura**: Docker (docker-compose) per orchestrare i container.
- **Backend (API)**: PHP Puro (Vanilla PHP). Gestirà la logica di business e l'interazione con il DB.
- **Frontend (UI)**: React.js con Vite + **react-i18next** per le traduzioni.
- **Styling**: Tailwind CSS + Ant Design.
- **Database**: PostgreSQL.

## 5. Struttura del Progetto

Il progetto sarà organizzato in un monorepo (o due repo distinte) gestite tramite Docker Compose:
- `/backend`: Codice sorgente PHP.
- `/frontend`: Codice sorgente React.
- `docker-compose.yml`: File di orchestrazione per avviare BE, FE e DB.

## 6. Suddivisione in Task (Roadmap per l'Utente)

Vedi documento dedicato: `development_roadmap.md` per la lista dettagliata dei task tecnici da "sviluppatore".
