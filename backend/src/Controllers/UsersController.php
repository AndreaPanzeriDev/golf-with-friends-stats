<?php

namespace App\Src\Controllers;

use App\Src\Config\Database;
use PDOException;

class UsersController {

    private string $method;
    private $db;


    public function __construct(string $method)
    {
        $this->method = $method;
        $this->db = (new Database)->getConnection();
    }


    public function all(){
        $sql = "SELECT * FROM users;";
        try{
            $results = $this->db->exec($sql);
            echo json_encode($results);
        }catch(PDOException $e){
            echo json_encode(['message' => 'Error while retriving users', 'error' => $e]);
        }
    }
}