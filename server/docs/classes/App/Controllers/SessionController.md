
***

* Full name: `\App\Controllers\SessionController`
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

### login

Authenticate user and create a session token.

```php
public login(string $username, string $password): string
```

**Parameters:**

| Parameter   | Type       | Description |
|-------------|------------|-------------|
| `$username` | **string** |             |
| `$password` | **string** |             |

**Return Value:**

Session token

**Throws:**

if authentication fails
- [`RuntimeException`](../../RuntimeException)

***

### getUserIdByToken

Get user id by session token

```php
public getUserIdByToken(string $token): int
```

**Parameters:**

| Parameter | Type       | Description |
|-----------|------------|-------------|
| `$token`  | **string** |             |

**Throws:**

if token is invalid
- [`RuntimeException`](../../RuntimeException)

***
