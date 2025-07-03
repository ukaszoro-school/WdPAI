<?php
declare(strict_types=1);

use FastRoute\RouteCollector;
use FastRoute\Dispatcher;
use App\Routing\RouteRegistrar;
use App\Http\StaticFileServer;

require __DIR__ . '/../vendor/autoload.php';

$siteRoot = __DIR__ . '/../../site';
$staticServer = new StaticFileServer($siteRoot);
if ($staticServer->serve($_SERVER['REQUEST_URI'])) {
    exit;
}

$dispatcher = FastRoute\simpleDispatcher(
    fn(RouteCollector $r) => (new RouteRegistrar())->register($r)
);

$httpMethod = $_SERVER['REQUEST_METHOD'];
$uri        = $_SERVER['REQUEST_URI'];

if (false !== $pos = strpos($uri, '?')) {
    $uri = substr($uri, 0, $pos);
}
$uri = rawurldecode($uri);

$routeInfo = $dispatcher->dispatch($httpMethod, $uri);

switch ($routeInfo[0]) {
    case Dispatcher::NOT_FOUND:
        http_response_code(404);
        echo '404 Not Found';
        break;

    case Dispatcher::METHOD_NOT_ALLOWED:
        http_response_code(405);
        echo '405 Method Not Allowed';
        break;

    case Dispatcher::FOUND:
        $handler = $routeInfo[1];
        $vars    = $routeInfo[2];

        echo $handler(...array_values($vars));
        break;
}
