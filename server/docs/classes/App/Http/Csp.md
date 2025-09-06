
***

* Full name: `\App\Http\Csp`
* This class is marked as **final** and can't be subclassed
* This class is a **Final class**

## Properties

### instance

```php
private static ?\App\Http\Csp $instance
```

* This property is **static**.

***

### hashes

```php
private array $hashes
```

***

### baseDir

```php
private string $baseDir
```

***

## Methods

### __construct

```php
private __construct(string $baseDir): mixed
```

**Parameters:**

| Parameter  | Type       | Description |
|------------|------------|-------------|
| `$baseDir` | **string** |             |

***

### getInstance

```php
public static getInstance(string $baseDir = __DIR__ . '/../../../site'): \App\Http\Csp
```

* This method is **static**.
**Parameters:**

| Parameter  | Type       | Description |
|------------|------------|-------------|
| `$baseDir` | **string** |             |

***

### integrity

```php
public integrity(string $relativePath): string
```

**Parameters:**

| Parameter       | Type       | Description |
|-----------------|------------|-------------|
| `$relativePath` | **string** |             |

***

### guessType

```php
private guessType(string $path): string
```

**Parameters:**

| Parameter | Type       | Description |
|-----------|------------|-------------|
| `$path`   | **string** |             |

***

### sendHeader

```php
public sendHeader(): void
```

***
