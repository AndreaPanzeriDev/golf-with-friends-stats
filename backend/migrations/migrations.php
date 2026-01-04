<?php

require_once __DIR__ . '/../vendor/autoload.php';

final class Migrations
{

    public function __invoke()
    {
        $files = array_diff(scandir(__DIR__), ['.', '..', 'migrations.php']);

        foreach ($files as $file) {
            $class_name = "\App\Migrations\\" . pathinfo($file, PATHINFO_FILENAME);
            if (class_exists($class_name)) {
                $instance = new $class_name;
                $instance->up();
            } else {
                continue;
            }
        }
    }
}

(new Migrations())();
