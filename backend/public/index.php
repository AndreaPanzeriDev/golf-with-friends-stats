<?php

use App\Src\Controllers\UsersController;

require_once __DIR__ . "/../vendor/autoload.php";

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

switch ($uri) {
    case '/api/users':
        $controller = (new UsersController($method))->crud();
        break;
    case '/api/courses':
        break;
    default:
        echo json_encode(['message' => 'endpoint does not exist']);
}



