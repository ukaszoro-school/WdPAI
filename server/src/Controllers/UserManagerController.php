<?php
declare(strict_types=1);

namespace App\Controllers;

use PDO;

final class UserManagerController
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    /**
     * Get all users with their roles and duties.
     *
     * @return array<int, array{ id: int, username: string, roles: array<string>, duties: array<string> }>
     */
    public function getUsers(): array
    {
        $stmt = $this->pdo->query(
            "SELECT c.id, c.username,
                    ARRAY_AGG(DISTINCT p.role) AS roles,
                    ARRAY_AGG(DISTINCT d.route_id) AS duties
             FROM creds c
             LEFT JOIN perms p ON p.user_id = c.id
             LEFT JOIN duties d ON d.user_id = c.id
             GROUP BY c.id, c.username
             ORDER BY c.id ASC"
        );

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Create a new user and assign optional roles.
     *
     * @param array{username: string, password: string} $data
     * @return array{id: int, username: string, roles: array<string>, duties: array<string>}
     */
    public function createUser(array $data): array
    {
        if (empty($data['username']) || empty($data['password'])) {
            throw new \InvalidArgumentException("username and password are required");
        }

        $hash = password_hash($data['password'], PASSWORD_DEFAULT);

        $stmt = $this->pdo->prepare("INSERT INTO creds (username, password_hash) VALUES (:username, :password_hash) RETURNING id");
        $stmt->execute([
            ':username' => $data['username'],
            ':password_hash' => $hash,
        ]);
        $id = (int)$stmt->fetchColumn();

        // first user is an admin
        $countStmt = $this->pdo->query("SELECT COUNT(*) FROM creds");
        $userCount = (int)$countStmt->fetchColumn();
        if ($userCount === 1) {
            $roleStmt = $this->pdo->prepare("INSERT INTO perms (user_id, role) VALUES (:user_id, :role)");
            $roleStmt->execute([':user_id' => $id, ':role' => 'admin']);
        }

        return $this->getUserById($id);
    }

    /**
     * Get a single user by ID with roles and duties.
     *
     * @param int $id
     * @return array{id: int, username: string, roles: array<string>, duties: array<string>}
     */
    public function getUserById(int $id): array
    {
        $stmt = $this->pdo->prepare(
            "SELECT c.id, c.username,
                    ARRAY_AGG(DISTINCT p.role) AS roles,
                    ARRAY_AGG(DISTINCT d.route_id) AS duties
             FROM creds c
             LEFT JOIN perms p ON p.user_id = c.id
             LEFT JOIN duties d ON d.user_id = c.id
             WHERE c.id = :id
             GROUP BY c.id, c.username"
        );
        $stmt->execute([':id' => $id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            throw new \RuntimeException("User not found");
        }

        return $user;
    }

    /**
     * Delete a user (cascades to perms, duties, sessions).
     *
     * @param int $id
     * @return bool True on success
     */
    public function deleteUser(int $id): bool
    {
        $stmt = $this->pdo->prepare("DELETE FROM creds WHERE id = :id");
        return $stmt->execute([':id' => $id]);
    }

    /**
     * Assign a duty (route) to a user.
     *
     * @param int $userId
     * @param string $routeId
     */
    public function assignDuty(int $userId, string $routeId): void
    {
        $stmt = $this->pdo->prepare(
            "INSERT INTO duties (user_id, route_id) VALUES (:user_id, :route_id)
             ON CONFLICT DO NOTHING"
        );
        $stmt->execute([':user_id' => $userId, ':route_id' => $routeId]);
    }

    /**
     * Remove a duty assignment from a user.
     *
     * @param int $userId
     * @param string $routeId
     */
    public function removeDuty(int $userId, string $routeId): void
    {
        $stmt = $this->pdo->prepare("DELETE FROM duties WHERE user_id = :user_id AND route_id = :route_id");
        $stmt->execute([':user_id' => $userId, ':route_id' => $routeId]);
    }

    /**
     * Assign a role to a user.
     *
     * @param int $userId
     * @param string $role
     */
    public function assignRole(int $userId, string $role): void
    {
        $stmt = $this->pdo->prepare(
            "INSERT INTO perms (user_id, role) VALUES (:user_id, :role) ON CONFLICT DO NOTHING"
        );
        $stmt->execute([':user_id' => $userId, ':role' => $role]);
    }

    /**
     * Remove a role from a user.
     *
     * @param int $userId
     * @param string $role
     */
    public function removeRole(int $userId, string $role): void
    {
        $stmt = $this->pdo->prepare("DELETE FROM perms WHERE user_id = :user_id AND role = :role");
        $stmt->execute([':user_id' => $userId, ':role' => $role]);
    }
}
