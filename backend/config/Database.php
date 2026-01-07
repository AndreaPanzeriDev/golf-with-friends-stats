<?php

namespace App\Config;

use PDO;
use PDOException;

final class Database
{

    protected $connection;

    public function __construct()
    {
        $db_host = getenv('DB_HOST') ?? 'localhost';
        $db_name = getenv('DB_NAME');
        $db_user = getenv('DB_USER');
        $db_pswd = getenv('DB_PASSWORD');
        $db_port = getenv('DB_PORT') ?? '5432';
        try {
            $this->connection = new PDO('pgsql:host=' . $db_host . ';port=' . $db_port . ';dbname=' . $db_name . ";", $db_user, $db_pswd);
        } catch (PDOException $e) {
            echo "Connection error: " . $e;
        }
    }

    public function get($sql)
    {
        try {
            $statement = $this->connection->query($sql);
        } catch (PDOException $e) {
            return json_encode(['message' => 'SQL error', 'error' => $e]);
        }
        return json_encode($statement->fetchall(PDO::FETCH_ASSOC));
    }
}
