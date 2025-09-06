# Fleet Manager 🚌

## Buiding

Using Docker:

```
docker build -f Dockerfile -t fleetmanager
```

Using Podman:

```
podman build -f Dockerfile -t fleetmanager
```

## Running

Using Docker:

```
docker run -p 8080:8080 localhost/fleetmanager
```

Using Podman:

```
podman run -p 8080:8080 localhost/fleetmanager
```

## Documentation

### `\App\Controllers`

#### Classes

| Class                                                                      |
|----------------------------------------------------------------------------|
| [`LineController`](./server/docs/classes/App/Controllers/LineController.md)               |
| [`RouteController`](./server/docs/classes/App/Controllers/RouteController.md)             |
| [`SessionController`](./server/docs/classes/App/Controllers/SessionController.md)         |
| [`StopController`](./server/docs/classes/App/Controllers/StopController.md)               |
| [`UserManagerController`](./server/docs/classes/App/Controllers/UserManagerController.md) |

### `\App\Database`

#### Classes

| Class                                             |
|---------------------------------------------------|
| [`Connection`](./server/docs/classes/App/Database/Connection.md) |

### `\App\Http`

#### Classes

| Class                                                     |
|-----------------------------------------------------------|
| [`Csp`](./server/docs/classes/App/Http/Csp.md)                           |
| [`StaticFileServer`](./server/docs/classes/App/Http/StaticFileServer.md) |

### `\App\Routing`

#### Classes

| Class                                                    |
|----------------------------------------------------------|
| [`RouteRegistrar`](./server/docs/classes/App/Routing/RouteRegistrar.md) |

