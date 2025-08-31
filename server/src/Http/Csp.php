<?php
declare(strict_types=1);

namespace App\Http;

final class Csp
{
    private static ?Csp $instance = null;
    private array $hashes = [];
    private string $baseDir;

    private function __construct(string $baseDir)
    {
        $this->baseDir = rtrim($baseDir, '/');
    }

    public static function getInstance(string $baseDir = __DIR__ . '/../../../site'): Csp
    {
        if (self::$instance === null) {
            self::$instance = new self($baseDir);
            // run for all requests
            register_shutdown_function([self::$instance, 'sendHeader']);
        }
        return self::$instance;
    }

    public function integrity(string $relativePath): string
    {
        $filePath = realpath($this->baseDir . '/' . ltrim($relativePath, '/'));
        if ($filePath === false || !is_file($filePath)) {
            throw new \RuntimeException("CSP: File not found for path $relativePath");
        }

        $content = file_get_contents($filePath);
        $algo = 'sha256';
        $hash = base64_encode(hash($algo, $content, true));
        $formatted = "'$algo-$hash'";

        $type = $this->guessType($relativePath);
        $this->hashes[$type][$formatted] = true;

        return "$algo-$hash";
    }

    private function guessType(string $path): string
    {
        $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
        return match ($ext) {
            'css' => 'style',
            'js'  => 'script',
            default => 'script',
        };
    }

    public function sendHeader(): void
    {
        $scriptHashes = isset($this->hashes['script']) ? implode(' ', array_keys($this->hashes['script'])) : '';

        $directives = [
            "default-src 'self'",
            "script-src 'self' $scriptHashes",
            "style-src 'self' 'unsafe-inline'",
        ];

        header('Content-Security-Policy: ' . implode('; ', $directives));
    }
}
