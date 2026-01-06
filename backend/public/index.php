<?php


require_once __DIR__ . "/../vendor/autoload.php";

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

print_r($uri);


// switch ($uri) {
//     case '/api/users':
//         echo "ciao";
//         // $controller = new UsersController($method);
//         // $controller->all();
//         break;
//     default:
//         echo json_encode(['message' => 'endpoint does not exist']);
// }



