<?php
require_once __DIR__ . '/../vendor/autoload.php';

use App\Src\Config\Database;

$db = new Database;

if($db->getConnection()){
    echo "funziona";
}else{
    echo "non funziona"; 
}