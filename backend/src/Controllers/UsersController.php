<?php

namespace App\Src\Controllers;

use App\Config\Database;
use PDO;
use PDOException;


header('Content-Type: application/json');
class UsersController
{
    private $db;
    protected string $method;
    private int|null $id;

    public function __construct(string $method)
    {
        $this->db = new Database();
        $this->method = $method;
        $this->id = $_GET['id'] ?? null;
    }


    public function crud()
    {
        switch ($this->method) {
            case 'GET':
                $this->id !== null ? $this->find() : $this->all();
                break;
            case 'POST':
                break;
            case 'PUT':
                break;
            case 'DELETE':
                $this->delete();
                break;
            default:
                echo json_encode(['error' => 'method not supported'], 405);
        }
    }


    public function all()
    {
        try {
            $results = $this->db->connection->query("SELECT * FROM users;");
            echo json_encode($results->fetchall(PDO::FETCH_ASSOC));
        } catch (PDOException $e) {
            http_response_code(404);
            echo json_encode(['message' => 'Error while retriving users', 'error' => $e]);
        }
    }

    public function find()
    {
        try {
            $stmt = $this->db->connection->prepare('SELECT * FROM users WHERE id = :id;');
            $stmt->execute(['id' => $this->id]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if($user){
                echo json_encode($user);
            }else{
                http_response_code(404);
                echo json_encode(['message' => 'User not found']);
            }
        } catch (PDOException $e) {
            echo json_encode(['message' => 'Error while retriving users', 'error' => $e]);
        }
    }


    public function delete()
    {
        try {
            $stmt = $this->db->connection->prepare('DELETE FROM users WHERE id = :id;');
            $stmt->execute(['id' => $this->id]);
            echo json_encode(['message' => 'user deleted successfully']);
        } catch (PDOException $e) {
            echo json_encode(['message' => 'Error while retriving users', 'error' => $e]);
        }
    }
}
