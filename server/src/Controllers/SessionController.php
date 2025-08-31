<?php
declare(strict_types=1);

namespace App\Controllers;

use PDO;
use RuntimeException;

final class SessionController
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    /**
     * Authenticate user and create a session token.
     *
     * @param string $username
     * @param string $password
     * @return string Session token
     * @throws RuntimeException if authentication fails
     */
    public function login(string $username, string $password): string
    {
        $stmt = $this->pdo->prepare("SELECT id, password_hash FROM creds WHERE username = :username");
        $stmt->execute([':username' => $username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || !password_verify($password, $user['password_hash'])) {
            throw new RuntimeException("Invalid credentials");
        }

        $token = bin2hex(random_bytes(32));

        $stmt = $this->pdo->prepare(
            "INSERT INTO sessions (user_id, session_token) VALUES (:user_id, :session_token)"
        );
        $stmt->execute([
            ':user_id' => $user['id'],
            ':session_token' => $token,
        ]);

        return $token;
    }

    /**
     * Get user id by session token
     *
     * @param string $token
     * @return int
     * @throws RuntimeException if token is invalid
     */
    public function getUserIdByToken(string $token): int
    {
        $stmt = $this->pdo->prepare("SELECT user_id FROM sessions WHERE session_token = :token");
        $stmt->execute([':token' => $token]);
        $userId = $stmt->fetchColumn();

        if (!$userId) {
            throw new RuntimeException("Invalid or expired session token");
        }

        return (int)$userId;
    }
}
