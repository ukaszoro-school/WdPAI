
***

* Full name: `\App\Controllers\RouteController`
* This class is marked as **final** and can't be subclassed
* This class is a **Final class**

## Properties

### pdo

```php
private \PDO $pdo
```

***

## Methods

### __construct

```php
public __construct(\PDO $pdo): mixed
```

**Parameters:**

| Parameter | Type     | Description |
|-----------|----------|-------------|
| `$pdo`    | **\PDO** |             |

***

### createRoute

```php
public createRoute(array<string,mixed> $data): string
```

**Parameters:**

| Parameter | Type                    | Description |
|-----------|-------------------------|-------------|
| `$data`   | **array<string,mixed>** |             |

***

### deleteRoute

Delete a route by ID.

```php
public deleteRoute(int $id): string
```

**Parameters:**

| Parameter | Type    | Description |
|-----------|---------|-------------|
| `$id`     | **int** | Route ID    |

**Return Value:**

JSON response

***

### getRoutes

```php
public getRoutes(): string
```

***
