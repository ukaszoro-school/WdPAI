
***

* Full name: `\App\Controllers\StopController`
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

### createStop

```php
public createStop(array<string,mixed> $data): string
```

**Parameters:**

| Parameter | Type                    | Description |
|-----------|-------------------------|-------------|
| `$data`   | **array<string,mixed>** |             |

***

### deleteStop

Delete a stop by ID.

```php
public deleteStop(int $id): string
```

**Parameters:**

| Parameter | Type    | Description |
|-----------|---------|-------------|
| `$id`     | **int** | Stop ID     |

**Return Value:**

JSON response

***

### getStops

```php
public getStops(): string
```

***
