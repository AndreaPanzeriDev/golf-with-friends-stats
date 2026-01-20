<?php

require_once __DIR__ . '/../vendor/autoload.php';

use App\Config\Database;

final class Migrations
{
    private $db;

    public function __construct()
    {
        $database = new Database();
        $this->db = $database->connection;
    }

    public function __invoke()
    {
        $this->createMigrationsTableIfNotExists();
        $this->runMigrations();
    }

    private function createMigrationsTableIfNotExists()
    {
        $checkTableQuery = "SELECT EXISTS (
            SELECT FROM information_schema.tables
            WHERE table_schema = 'public'
            AND table_name = 'migrations'
        )";

        $result = $this->db->query($checkTableQuery);
        $tableExists = $result->fetchColumn();

        if (!$tableExists) {
            $createTableQuery = "CREATE TABLE migrations (
                id SERIAL PRIMARY KEY,
                migration_name VARCHAR(255) NOT NULL,
                batch INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )";

            $this->db->exec($createTableQuery);
            echo "Migrations table created successfully.\n";
        }
    }

    private function runMigrations()
    {
        $files = array_diff(scandir(__DIR__), ['.', '..', 'migrations.php']);
        $migrationsToRun = [];

        foreach ($files as $file) {
            $class_name = "\App\Migrations\\" . pathinfo($file, PATHINFO_FILENAME);
            if (class_exists($class_name)) {
                $migrationName = pathinfo($file, PATHINFO_FILENAME);
                
                // Check if this migration has already been run
                $checkQuery = "SELECT COUNT(*) FROM migrations WHERE migration_name = ?";
                $stmt = $this->db->prepare($checkQuery);
                $stmt->execute([$migrationName]);
                $alreadyRun = $stmt->fetchColumn() > 0;

                if (!$alreadyRun) {
                    $migrationsToRun[] = ['class' => $class_name, 'name' => $migrationName];
                }
            }
        }

        if (empty($migrationsToRun)) {
            echo "No new migrations to run.\n";
            return;
        }

        // Get the next batch number
        $batchQuery = "SELECT MAX(batch) FROM migrations";
        $result = $this->db->query($batchQuery);
        $lastBatch = $result->fetchColumn();
        $nextBatch = $lastBatch ? $lastBatch + 1 : 1;

        echo "Running " . count($migrationsToRun) . " new migration(s) in batch {$nextBatch}...\n";

        // Run the migrations and record them
        foreach ($migrationsToRun as $migration) {
            try {
                echo "Running migration: {$migration['name']}\n";
                $instance = new $migration['class'];
                $instance->up();

                // Record the migration in the migrations table
                $insertQuery = "INSERT INTO migrations (migration_name, batch) VALUES (?, ?)";
                $stmt = $this->db->prepare($insertQuery);
                $stmt->execute([$migration['name'], $nextBatch]);

                echo "Migration completed: {$migration['name']}\n";
            } catch (Exception $e) {
                echo "Migration failed: {$migration['name']} - Error: " . $e->getMessage() . "\n";
                throw $e;
            }
        }

        echo "All migrations completed successfully.\n";
    }
}

(new Migrations())();
