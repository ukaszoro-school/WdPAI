<?php
declare(strict_types=1);

namespace App\Controllers;

use PDO;

final class LineController
{
    public function __construct(private PDO $pdo) {}

    /**
     * Get all lines with their lines and timetables.
     *
     * @return string JSON encoded array of lines.
     */
    public function getLines(): string
    {
        $sql = <<<SQL
        SELECT r.route_id, r.time, s.id AS stop_id, s.location
        FROM routes r
        JOIN stops s ON r.stop_id = s.id
        ORDER BY r.route_id, r.time;
        SQL;

        $stmt = $this->pdo->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // group by route_id
        $routes = [];
        foreach ($rows as $row) {
            $rid = $row['route_id'];
            if (!isset($routes[$rid])) {
                $routes[$rid] = [];
            }
            $routes[$rid][] = [
                'id' => (int) $row['stop_id'],
                'location' => $row['location'],
                'time' => $row['time'],
            ];
        }

        $lines = [];
        $lineId = 1;
        $hashToId = [];

        foreach ($routes as $stops) {
            $sequence = array_map(fn($s) => $s['id'], $stops);
            $hash = sha1(json_encode($sequence));

            if (!isset($hashToId[$hash])) {
                $hashToId[$hash] = $lineId++;
                $lines[$hash] = [];
            }

            foreach ($stops as $idx => $stop) {
                if (!isset($lines[$hash][$idx])) {
                    $lines[$hash][$idx] = [
                        'id' => $stop['id'],
                        'location' => $stop['location'],
                        'times' => [],
                    ];
                }
                $lines[$hash][$idx]['times'][] = $stop['time'];
            }
        }

        foreach ($lines as &$line) {
            foreach ($line as &$stop) {
                sort($stop['times']);
            }
        }

        $result = [];
        foreach ($lines as $hash => $stops) {
            $result[] = [
                'id' => $hashToId[$hash],
                'stops' => array_values($stops),
            ];
        }

        return json_encode($result);
    }
}
