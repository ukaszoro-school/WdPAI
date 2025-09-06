
***

* Full name: `\App\Controllers\UserManagerController`
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

### getUsers

Get all users with their roles and duties.

```php
public getUsers(): array<int,array{id: int, username: string, roles: string[], duties: string[]}>
```

***

### pgArrayToPhpArray

Convert PG array -> PHP array.

```php
private pgArrayToPhpArray(string|null $pgArray): string[]
```

**Parameters:**

| Parameter  | Type             | Description |
|------------|------------------|-------------|
| `$pgArray` | **string\|null** |             |

***

### createUser

Create a new user and assign optional roles.

```php
public createUser(string $username, string $password): array{id: int, username: string, roles: string[], duties: string[]}
```

**Parameters:**

| Parameter   | Type       | Description |
|-------------|------------|-------------|
| `$username` | **string** |             |
| `$password` | **string** |             |

***

### getUserById

Get a single user by ID with roles and duties.

```php
public getUserById(int $id): array{id: int, username: string, roles: string[], duties: string[]}
```

**Parameters:**

| Parameter | Type    | Description |
|-----------|---------|-------------|
| `$id`     | **int** |             |

***

### deleteUser

Delete a user (cascades to perms, duties, sessions).

```php
public deleteUser(int $id): bool
```

**Parameters:**

| Parameter | Type    | Description |
|-----------|---------|-------------|
| `$id`     | **int** |             |

**Return Value:**

True on success

***

### assignDuty

Assign a duty (route) to a user.

```php
public assignDuty(int $userId, string $routeId): void
```

**Parameters:**

| Parameter  | Type       | Description |
|------------|------------|-------------|
| `$userId`  | **int**    |             |
| `$routeId` | **string** |             |

***

### removeDuty

Remove a duty assignment from a user.

```php
public removeDuty(int $userId, string $routeId): void
```

**Parameters:**

| Parameter  | Type       | Description |
|------------|------------|-------------|
| `$userId`  | **int**    |             |
| `$routeId` | **string** |             |

***

### assignRole

Assign a role to a user.

```php
public assignRole(int $userId, string $role): void
```

**Parameters:**

| Parameter | Type       | Description |
|-----------|------------|-------------|
| `$userId` | **int**    |             |
| `$role`   | **string** |             |

***

### removeRole

Remove a role from a user.

```php
public removeRole(int $userId, string $role): void
```

**Parameters:**

| Parameter | Type       | Description |
|-----------|------------|-------------|
| `$userId` | **int**    |             |
| `$role`   | **string** |             |

***
