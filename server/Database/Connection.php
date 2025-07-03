<?php
declare(strict_types=1);

namespace App\Database;

use PDO;
use PDOException;

final class Connection
{
    public static function get(): PDO
    {
        $dsn = 'pgsql:host=localhost;port=5432;dbname=pgdb';
        $user = 'pguser';
        $password = '3344';

        try {
            $pdo = new PDO($dsn, $user, $password, [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ]);
            return $pdo;
        } catch (PDOException $e) {
            throw new \RuntimeException('DB connection failed: ' . $e->getMessage());
        }
    }
}
