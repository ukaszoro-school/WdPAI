<?php
declare(strict_types=1);

namespace App\Routing;

use FastRoute\RouteCollector;
use App\Controllers\HomeController;
use App\Controllers\UserController;
use App\Controllers\TestController;
use App\Controllers\StopController;
use App\Database\Connection;

final class RouteRegistrar
{
    public function register(RouteCollector $r): void
    {
        $r->get('/', [HomeController::class, 'index']);
        $r->get('/users', [UserController::class, 'getUsers']);
        $r->get('/test', [TestController::class, 'testFunction']);

        // test
        $r->get('/books/{id}', fn(string $id) => "Book #{$id}");

        $r->get('/user/{id:\d+}', fn(string $id) => "User #{$id}");

        $r->get('/articles/{id:\d+}[/{title}]', 
            fn(string $id, ?string $title = null) =>
                "Article #{$id}<br>Title: " . ($title ?? '')
        );

         $pdo = Connection->get();
         $stopController = new StopController($pdo);

         $r->post('/stops', function () use ($stopController) {
             $input = json_decode(file_get_contents('php://input'), true);
             return $stopController->createStop($input);
         });

         $r->get('/stops', function () use ($stopController) {
             return $stopController->getStops();
         });
    }
}

