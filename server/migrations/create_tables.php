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

CREATE TABLE IF NOT EXISTS creds (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password_hash TEXT NOT NULL
);

CREATE TYPE ROLE AS ENUM ('admin', 'driver');
CREATE TABLE IF NOT EXISTS perms (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES creds(id) ON DELETE CASCADE,
    role ROLE NOT NULL
);

CREATE TABLE IF NOT EXISTS duties (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES creds(id) ON DELETE CASCADE,
    route_id TEXT NOT NULL
);

CREATE OR REPLACE FUNCTION check_if_driver()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*)
        FROM perms
        WHERE user_id = NEW.user_id
          AND role = 'driver') < 1 THEN
        RAISE EXCEPTION 'User % is not a driver!', NEW.user_id;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_if_driver
BEFORE INSERT ON duties
FOR EACH ROW
EXECUTE FUNCTION check_if_driver();

CREATE OR REPLACE FUNCTION remove_orphan_duties()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM duties d
    WHERE d.route_id = OLD.route_id
      AND NOT EXISTS (
          SELECT 1
          FROM routes r
          WHERE r.route_id = OLD.route_id
      );
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_remove_orphan_duties
AFTER DELETE ON routes
FOR EACH ROW
EXECUTE FUNCTION remove_orphan_duties();
SQL;

$pdo->exec($sql);

echo "Tables created successfully.\n";
