<?php

namespace App\Migrations;

use App\Src\Config\Database;
use PDOException;

final class CreateUsersTable
{
    private $db;

    public function __construct()
    {
        $this->db = (new Database())->getConnection();
    }

    public function up()
    {
        $sql = "CREATE TABLE users (
         id SERIAL PRIMARY KEY,
         name varchar(80) NOT NULL,
         email varchar(80) NOT NULL UNIQUE,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );";

        try {
            $this->db->exec($sql);
            echo "users table create successfully";
        } catch (PDOException $e) {
            echo "error during users table creation: " . $e;
        }
    }

    public function down()
    {
        $sql = "DROP TABLE users;";
        try {
            $this->db->exec($sql);
            echo "users table create successfully";
        } catch (PDOException $e) {
            echo "error during users table creation: " . $e;
        }
    }
}
