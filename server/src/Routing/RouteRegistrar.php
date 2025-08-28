<?php
declare(strict_types=1);

namespace App\Routing;

use FastRoute\RouteCollector;
use App\Controllers\StopController;
use App\Controllers\RouteController;
use App\Controllers\LineController;
use App\Database\Connection;

final class RouteRegistrar
{
    public function register(RouteCollector $r): void
    {
         $pdo = Connection::get();

         $stopController = new StopController($pdo);
         $r->post('/stops', function () use ($stopController) {
             $input = json_decode(file_get_contents('php://input'), true);
             return $stopController->createStop($input);
         });
         $r->get('/stops', function () use ($stopController) {
             return $stopController->getStops();
         });
         $r->delete('/stops/{id}', function (string $id) use ($stopController) {
             return $stopController->deleteStop((int) $id);
         });

         $routeController = new RouteController($pdo);
         $r->post('/routes', function () use ($routeController) {
             $input = json_decode(file_get_contents('php://input'), true);
             return $routeController->createRoute($input);
         });
         $r->get('/routes', function () use ($routeController) {
             return $routeController->getRoutes();
         });
         $r->delete('/routes/{id}', function (string $id) use ($routeController) {
             return $routeController->deleteRoute((int) $id);
         });

         $lineController = new LineController($pdo);
         $r->get('/lines', function () use ($lineController) {
             return $lineController->getLines();
         });
    }
}

