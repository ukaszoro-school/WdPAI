<?php
declare(strict_types=1);

namespace App\Http;

final class StaticFileServer
{
    private string $siteRoot;

    public function __construct(string $siteRoot)
    {
        $realPath = realpath($siteRoot);
        if ($realPath === false || !is_dir($realPath)) {
            throw new \InvalidArgumentException("Site root '$siteRoot' is not a valid directory.");
        }
        $this->siteRoot = $realPath;
    }

    public function serve(string $requestUri): bool
    {
        $path = parse_url($requestUri, PHP_URL_PATH) ?? '/';

        $staticPath = realpath($this->siteRoot . $path);

        if ($staticPath !== false && $path == '/') {
            include($this->siteRoot . '/index.html.template');
            exit;
        }

        if (
            $staticPath !== false &&
            str_starts_with($staticPath, $this->siteRoot) &&
            is_file($staticPath)
        ) {
            $this->sendFile($staticPath);
            exit;
        }

        return false;
    }

    private function sendFile(string $filePath): void
    {
        $extension = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
        $mimeMap = [
            'css'  => 'text/css',
            'js'   => 'application/javascript',
            'json' => 'application/json',
            'html' => 'text/html',
            'jpg'  => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'png'  => 'image/png',
            'svg'  => 'image/svg+xml',
            'ico'  => 'image/x-icon',
        ];

        $mimeType = $mimeMap[$extension] ?? mime_content_type($filePath) ?: 'application/octet-stream';

        if ($extension === 'template') {
            http_response_code(404);
        } else {
            header('Content-Type: ' . $mimeType);
            header('Content-Length: ' . filesize($filePath));
            readfile($filePath);
        }
    }
}
