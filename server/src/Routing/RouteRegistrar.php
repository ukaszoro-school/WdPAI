<?php
declare(strict_types=1);

namespace App\Routing;

use FastRoute\RouteCollector;
use App\Database\Connection;
use App\Controllers\StopController;
use App\Controllers\RouteController;
use App\Controllers\LineController;
use App\Controllers\UserManagerController;
use App\Controllers\SessionController;

final class RouteRegistrar
{
    public function register(RouteCollector $r): void
    {
        $pdo = Connection::get();

        $sessionController = new SessionController($pdo);
        $userController = new UserManagerController($pdo);

        $requireAuth = function(callable $handler) use ($sessionController, $userController) {
            return function(...$args) use ($handler, $sessionController, $userController) {
                $headers = getallheaders();
                $token = $headers['Authorization'] ?? '';

                if (!$token) {
                    http_response_code(401);
                    echo json_encode(['error' => 'Unauthorized']);
                    exit;
                }

                try {
                    $userId = $sessionController->getUserIdByToken($token);
                    $user = $userController->getUserById($userId);
                } catch (\RuntimeException $e) {
                    http_response_code(401);
                    echo json_encode(['error' => 'Unauthorized']);
                    exit;
                }

                return $handler($user, ...$args);
            };
        };

        $requireAdmin = function(callable $handler) use ($requireAuth) {
            return $requireAuth(function(array $user, ...$args) use ($handler) {
                if (!in_array('admin', $user['roles'], true)) {
                    http_response_code(403);
                    echo json_encode(['error' => 'Admin role required']);
                    exit;
                }
                return $handler($user, ...$args);
            });
        };

        $stopController = new StopController($pdo);
        $r->post('/stops', $requireAdmin(function(array $user) use ($stopController) {
            $input = json_decode(file_get_contents('php://input'), true);
            return $stopController->createStop($input);
        }));
        $r->get('/stops', $requireAuth(fn(array $user) => $stopController->getStops()));
        $r->delete('/stops/{id}', $requireAdmin(function(array $user, string $id) use ($stopController) {
            return $stopController->deleteStop((int)$id);
        }));

        $routeController = new RouteController($pdo);
        $r->post('/routes', $requireAdmin(function(array $user) use ($routeController) {
            $input = json_decode(file_get_contents('php://input'), true);
            return $routeController->createRoute($input);
        }));
        $r->get('/routes', $requireAuth(fn(array $user) => $routeController->getRoutes()));
        $r->delete('/routes/{id}', $requireAdmin(function(array $user, string $id) use ($routeController) {
            return $routeController->deleteRoute((int)$id);
        }));

        $lineController = new LineController($pdo);
        $r->get('/lines', $requireAuth(fn(array $user) => $lineController->getLines()));

        $r->get('/users', $requireAuth(fn(array $user) => $userController->getUsers()));
        $r->post('/users', function(array $user) use ($userController) {
        $input = json_decode(file_get_contents('php://input'), true);
        return $userController->createUser($input);
        });
        $r->delete('/users/{id}', $requireAdmin(function(array $user, string $id) use ($userController) {
            return $userController->deleteUser((int)$id);
        }));

        $r->post('/users/{id}/roles', $requireAdmin(function(array $user, string $id) use ($userController) {
            $input = json_decode(file_get_contents('php://input'), true);
            $userController->assignRole((int)$id, $input['role']);
        }));
        $r->delete('/users/{id}/roles', $requireAdmin(function(array $user, string $id) use ($userController) {
            $input = json_decode(file_get_contents('php://input'), true);
            $userController->removeRole((int)$id, $input['role']);
        }));
        $r->post('/users/{id}/duties', $requireAdmin(function(array $user, string $id) use ($userController) {
            $input = json_decode(file_get_contents('php://input'), true);
            $userController->assignDuty((int)$id, $input['route_id']);
        }));
        $r->delete('/users/{id}/duties', $requireAdmin(function(array $user, string $id) use ($userController) {
            $input = json_decode(file_get_contents('php://input'), true);
            $userController->removeDuty((int)$id, $input['route_id']);
        }));

        $r->post('/login', function() use ($sessionController) {
            $input = json_decode(file_get_contents('php://input'), true);
            return ['token' => $sessionController->login($input['username'], $input['password'])];
        });
        $r->post('/logout', $requireAuth(function(array $user) use ($sessionController) {
            $headers = getallheaders();
            $token = $headers['Authorization'] ?? '';
            $sessionController->logout($token);
            return ['success' => true];
        }));

        $r->get('/me', $requireAuth(function(array $user) {
            return array_merge(['logged_in' => true], $user);
        }));
    }
}
