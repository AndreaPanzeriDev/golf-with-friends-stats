# Golf with Friends Stats

A comprehensive management system for tracking golf statistics, managing friends/users, and organizing golf events.

## Features

- **User & Friend Management**: Add and remove friends to build your golf network.
- **Statistics Tracking**: Keep track of games played, won, and lost for each user.
- **Course Management**: Manage golf courses including details like holes and pars.
- **Event Scheduling**: Seamless integration with Google Calendar for organizing matches.
- **Dashboard**: A central hub for viewing stats and upcoming events.

## Tech Stack

### Backend
- **Language**: PHP 8.1+
- **Database**: PostgreSQL
- **Architecture**: Custom Vanilla PHP implementation
- **Containerization**: Docker

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript major version 5
- **Styling**: Vanilla CSS (with responsive design)

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- Docker and Docker Compose
- (Optional) Node.js and Composer if you wish to run tools outside containers.

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/AndreaPanzeriDev/golf-with-friends-stats.git
    cd golf-with-friends-stats
    ```

2.  **Environment Setup**
    Copy the example Docker Compose file to create your local configuration.
    ```bash
    cp docker-compose-example.yml docker-compose.yml
    ```
    *Note: Verify the contents of `docker-compose.yml` match your local port requirements.*

3.  **Backend Environment Setup**
    Navigate to the backend directory, copy the example environment file, and configure your database connection details.
    ```bash
    cd backend
    cp .env.example .env
    ```
    Open `.env` and fill in the database credentials (matches those in `docker-compose.yml`):
    ```ini
    DB_HOST=db
    DB_PORT=5432
    DB_NAME=golf_db
    DB_USER=user
    DB_PASSWORD=password
    ```

4.  **Start the Application**
    Spin up the backend and database containers.
    ```bash
    cd .. # Return to root
    docker compose up -d
    ```

4.  **Install Dependencies**
    
    **Backend:**
    You can install PHP dependencies via a temporary container if you don't have Composer locally:
    ```bash
    docker compose exec backend composer install
    ```
    
    **Frontend:**
    Navigate to the frontend directory and install Node modules:
    ```bash
    cd frontend
    npm install
    ```

5.  **Run Migrations**
    Initialize the database schema.
    ```bash
    # Run from the root directory
    docker compose exec backend php backend/migrations/migrations.php
    ```

6.  **Run Frontend Development Server**
    ```bash
    cd frontend
    npm run dev
    ```

The application should now be accessible. Check the terminal output for the frontend URL (typically `http://localhost:5173`).
