<?php
declare(strict_types=1);

namespace App\Controllers;

use PDO;

final class RouteController
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    /**
    * @param array<string, mixed> $data
    */
    public function createRoute(array $data): string
    {
        if (empty($data['route_id'])) {
            http_response_code(400);
            return json_encode(['error' => 'route_id is required']);
        }
        if (empty($data['time'])) {
            http_response_code(400);
            return json_encode(['error' => 'time is required']);
        }
        if (empty($data['stop_id'])) {
            http_response_code(400);
            return json_encode(['error' => 'stop_id is required']);
        }

        $stmt = $this->pdo->prepare('INSERT INTO routes (route_id, time, stop_id) VALUES (:route_id, :time, :stop_id) RETURNING id');
        $stmt->execute(['route_id' => $data['route_id'], 'time' => $data['time'], 'stop_id' => $data['stop_id']]);
        $id = $stmt->fetchColumn();

        return json_encode(['id' => $id]);
    }

    /**
     * Delete a route by ID.
     *
     * @param int $id Route ID
     * @return string JSON response
     */
    public function deleteRoute(int $id): string
    {
        $stmt = $this->pdo->prepare('DELETE FROM routes WHERE id = :id');
        $stmt->execute(['id' => $id]);

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            return json_encode(['error' => "Route with id {$id} not found"]);
        }

        return json_encode(['message' => "Route {$id} deleted"]);
    }

    public function getRoutes(): string
    {
        $stmt = $this->pdo->query('SELECT id, route_id, time, stop_id FROM routes ORDER BY id ASC');
        $routes = $stmt->fetchAll();

        return json_encode($routes);
    }
}

