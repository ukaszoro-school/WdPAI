
***

* Full name: `\App\Controllers\LineController`
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

### getLines

Get all lines with their lines and timetables.

```php
public getLines(): string
```

**Return Value:**

JSON encoded array of lines.

***
