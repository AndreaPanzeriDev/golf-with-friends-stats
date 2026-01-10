<?php

use App\Src\Controllers\UsersController;

require_once __DIR__ . "/../vendor/autoload.php";

header('Content-Type: application/json');
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// 2. Intercettiamo il Pre-flight
if ($method === 'OPTIONS') {
    // Rispondiamo con uno status 200 (OK) e terminiamo lo script
    http_response_code(200);
    exit;
}
switch ($uri) {
    case '/api/users':
        $controller = (new UsersController($method))->crud();
        break;
    case '/api/courses':
        break;
    default:
        echo json_encode(['message' => 'endpoint does not exist']);
}



