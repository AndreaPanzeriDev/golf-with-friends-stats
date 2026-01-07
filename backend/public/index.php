<?php

use App\Src\Controllers\UsersController;

require_once __DIR__ . "/../vendor/autoload.php";

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];
$controller = new UsersController();
switch ($uri) {
    case '/api/users':
        $controller->all();
        break;
    case '/api/users/find':
        $controller->find(1);
        break;
    default:
        echo json_encode(['message' => 'endpoint does not exist']);
}



