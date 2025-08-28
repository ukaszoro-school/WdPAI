<?php
declare(strict_types=1);

namespace App\Controllers;

use PDO;

final class StopController
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    /**
    * @param array<string, mixed> $data
    */
    public function createStop(array $data): string
    {
        if (empty($data['location'])) {
            http_response_code(400);
            return json_encode(['error' => 'location is required']);
        }

        $stmt = $this->pdo->prepare('INSERT INTO stops (location) VALUES (:location) RETURNING id');
        $stmt->execute(['location' => $data['location']]);
        $id = $stmt->fetchColumn();

        return json_encode(['id' => $id, 'location' => $data['location']]);
    }

    /**
     * Delete a stop by ID.
     *
     * @param int $id Stop ID
     * @return string JSON response
     */
    public function deleteStop(int $id): string
    {
        $stmt = $this->pdo->prepare('DELETE FROM stops WHERE id = :id');
        $stmt->execute(['id' => $id]);

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            return json_encode(['error' => "Stop with id {$id} not found"]);
        }

        return json_encode(['message' => "Stop {$id} deleted"]);
    }

    public function getStops(): string
    {
        $stmt = $this->pdo->query('SELECT id, location FROM stops ORDER BY id ASC');
        $stops = $stmt->fetchAll();

        return json_encode($stops);
    }
}
