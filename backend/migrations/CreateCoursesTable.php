<?php

namespace App\Migrations;

use App\Src\Config\Database;
use PDOException;

final class CreateCoursesTable
{
    private $db;

    public function __construct()
    {
        $this->db = (new Database())->getConnection();
    }

    public function up()
    {
        $sql = "CREATE TABLE courses (
         id SERIAL PRIMARY KEY,
         name varchar(80) NOT NULL,
         location varchar(255) NOT NULL UNIQUE,
         holes_count int NOT NULL,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );";

        try {
            $this->db->exec($sql);
            echo "courses table create successfully";
        } catch (PDOException $e) {
            echo "error during courses table creation: " . $e;
        }
    }

    public function down()
    {
        $sql = "DROP TABLE courses;";
        try {
            $this->db->exec($sql);
            echo "courses table dropped successfully";
        } catch (PDOException $e) {
            echo "error during courses table drop: " . $e;
        }
    }
}
