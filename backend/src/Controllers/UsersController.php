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
                $this->create();
                break;
            case 'PUT':
                $this->update();
                break;
            case 'DELETE':
                $this->delete();
                break;
            default:
                echo json_encode(['error' => 'method not supported'], 405);
        }
    }

    /**
     * REGOLE:
     * per le chiamate che non prevedono alcun tipo di dato di ritorno possiamo usare exec
     * mentre per quelle che prevedono dei risultati, specialmente se più di uno, è meglio usare un prepare
     */

    public function all()
    {
        try {
            $stmt = $this->db->connection->prepare("SELECT * FROM users;");
            $stmt->execute();
            echo json_encode($stmt->fetchall(PDO::FETCH_ASSOC));
        } catch (PDOException $e) {
            http_response_code(422);
            echo json_encode($e);
        }
    }

    public function find()
    {
        try {
            $stmt = $this->db->connection->prepare('SELECT * FROM users WHERE id = :id;');
            $stmt->execute(['id' => $this->id]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($user) {
                echo json_encode($user);
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'User not found']);
            }
        } catch (PDOException $e) {
            http_response_code(422);
            echo json_encode($e);
        }
    }


    public function create()
    {
        $json_ricevuto = file_get_contents('php://input');
        $dati = json_decode($json_ricevuto, true);
        try {
            $stmt = $this->db->connection->prepare('INSERT INTO users (name, email) VALUES (:name, :email)');
            $stmt->execute(['name' => $dati['name'], 'email' => $dati['email']]);
            echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
        } catch (PDOException $e) {
            http_response_code(422);
            echo json_encode($e);
        }
    }


    public function update()
    {
        $json_ricevuto = file_get_contents('php://input');
        $dati = json_decode($json_ricevuto, true);
        try {
            $stmt = $this->db->connection->prepare('UPDATE users SET name = :name, email = :email, updated_at = :updated_at WHERE id = :id RETURNING *');
            $stmt->execute(['id' => $dati['id'], 'name' => $dati['name'], 'email' => $dati['email'], 'updated_at' => date('Y-m-d H:i:s')]);
            echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
        } catch (PDOException $e) {
            http_response_code(422);
            echo json_encode($e);
        }
    }


    public function delete()
    {
        try {
            $stmt = $this->db->connection->prepare('DELETE FROM users WHERE id = :id;');
            $stmt->execute(['id' => $this->id]);
            echo json_encode(['message' => 'user deleted successfully']);
        } catch (PDOException $e) {
            http_response_code(422);
            echo json_encode($e);
        }
    }
}
