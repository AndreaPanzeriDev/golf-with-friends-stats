<?php

namespace App\Src\Controllers;

use App\Config\Database;
use PDOException;

class UsersController {

    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function all(){
        
        $sql = "SELECT * FROM users;";
        try{
           echo $this->db->get($sql);      
        }catch(PDOException $e){
            echo json_encode(['message' => 'Error while retriving users', 'error' => $e]);
        }
    }

    public function find($id){
        $sql = 'SELECT * FROM users WHERE id = "' .$id .  '";';
        try{
           echo $this->db->get($sql);      
        }catch(PDOException $e){
            echo json_encode(['message' => 'Error while retriving users', 'error' => $e]);
        }
    }
}