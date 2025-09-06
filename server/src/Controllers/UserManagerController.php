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
        $stmt = $this->pdo->query("
            SELECT
                creds.id,
                creds.username,
                ARRAY_REMOVE(ARRAY_AGG(perms.role), NULL) AS roles,
                ARRAY_REMOVE(ARRAY_AGG(duties.route_id), NULL) AS duties
            FROM creds
            LEFT JOIN perms ON perms.user_id = creds.id
            LEFT JOIN duties ON duties.user_id = creds.id
            GROUP BY creds.id, creds.username
        ");

        $users = [];
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $roles = $row['roles'];
            $duties = $row['duties'];
            $roles = $this->pgArrayToPhpArray($roles);
            $duties = $this->pgArrayToPhpArray($duties);
            $users[] = [
                'id' => (int)$row['id'],
                'username' => $row['username'],
                'roles' => $roles,
                'duties' => $duties,
            ];
        }
        return $users;
    }

    /**
     * Convert PG array -> PHP array.
     *
     * @param string|null $pgArray
     * @return string[]
     */
    private function pgArrayToPhpArray(?string $pgArray): array
    {
        if ($pgArray === null || $pgArray === '{}' || $pgArray === '{NULL}') {
            return [];
        }
        $pgArray = trim($pgArray, '{}');
        if ($pgArray === '') {
            return [];
        }
        $items = str_getcsv($pgArray, ',');
        return array_values(array_filter($items, fn($v) => $v !== 'NULL' && $v !== ''));
    }

    /**
     * Create a new user and assign optional roles.
     * @param string $username
     * @param string $password
     * @return array{id: int, username: string, roles: array<string>, duties: array<string>}
     */
    public function createUser(string $username, string $password): array
    {
        if (empty($username) || empty($password)) {
            throw new \InvalidArgumentException("username and password are required");
        }

        $hash = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $this->pdo->prepare("INSERT INTO creds (username, password_hash) VALUES (:username, :password_hash) RETURNING id");
        $stmt->execute([
            ':username' => $username,
            ':password_hash' => $hash,
        ]);
        $id = (int)$stmt->fetchColumn();

        // first user is an admin
        $countStmt = $this->pdo->query("SELECT COUNT(*) FROM creds");
        $userCount = (int)$countStmt->fetchColumn();
        if ($userCount === 1) {
            $roleStmt = $this->pdo->prepare("INSERT INTO perms (user_id, role) VALUES (:user_id, :role)");
            $roleStmt->execute([':user_id' => $id, ':role' => 'admin']);
        } else {
            $roleStmt = $this->pdo->prepare("INSERT INTO perms (user_id, role) VALUES (:user_id, :role)");
            $roleStmt->execute([':user_id' => $id, ':role' => 'driver']);
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
                    COALESCE(ARRAY_AGG(DISTINCT p.role), '{}') AS roles,
                    COALESCE(ARRAY_AGG(DISTINCT d.route_id), '{}') AS duties
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

        $user['roles'] = $this->pgArrayToPhpArray($user['roles']);
        $user['duties'] = $this->pgArrayToPhpArray($user['duties']);

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
        $check = $this->pdo->prepare(
            "SELECT user_id, route_id
             FROM duties
             WHERE user_id = :user_id AND route_id = :route_id"
        );
        $check->execute([':user_id' => $userId, ':route_id' => $routeId]);
        $route = $check->fetch(PDO::FETCH_ASSOC);

        if ($route) {
            return; // Skip
        }
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
