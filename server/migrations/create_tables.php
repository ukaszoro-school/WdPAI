<?php
declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';

$pdo = \App\Database\Connection::get();

$sql = <<<SQL
CREATE TABLE IF NOT EXISTS stops (
    id SERIAL PRIMARY KEY,
    location TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS routes (
    id SERIAL PRIMARY KEY,
    route_id TEXT NOT NULL,
    time TIME NOT NULL,
    stop_id INTEGER NOT NULL REFERENCES stops(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);
SQL;

$pdo->exec($sql);

echo "Tables created successfully.\n";

