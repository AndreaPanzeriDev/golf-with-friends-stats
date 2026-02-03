<?php

namespace App\Config;

use PDO;
use PDOException;

final class Database
{

    public $connection;

    public function __construct()
    {
        $db_host = getenv('DB_HOST') ?: 'localhost';
        $db_name = getenv('DB_NAME') ?: 'golf_stats';
        $db_user = getenv('DB_USER') ?: 'user';
        $db_pswd = getenv('DB_PASSWORD') ?: 'password';
        $db_port = getenv('DB_PORT') ?: '5432';
        try {
            $this->connection = new PDO('pgsql:host=' . $db_host . ';port=' . $db_port . ';dbname=' . $db_name . ";", $db_user, $db_pswd);
        } catch (PDOException $e) {
            echo "Connection error: " . $e;
        }
    }

    public function getConnection()
    {
        return $this->connection;
    }
}