# 🛒 E-Commerce REST API 🚀

## 🐳 Docker Integration

This API is containerized for consistent deployments. **Docker Compose** is used to manage services like the API server and MongoDB database.

### 📦 Running with Docker

1. Ensure Docker and Docker Compose are installed on your machine.

```bash
docker-compose up -d
```

## 📦 Orders

### `GET /api/orders`

- **Description**: Get a list of all orders.
- **Method**: GET
- **Query Parameters**: None
- **Response**: List of orders

### `POST /api/orders`

- **Description**: Create a new order.
- **Method**: POST
- **Request Body**: Order details
- **Response**: Created order

### `GET /api/orders/:id`

- **Description**: Get a single order by ID.
- **Method**: GET
- **Route Parameters**:
  - `id` (required): Order ID
- **Response**: Single order

### `PUT /api/orders/:id`

- **Description**: Update an existing order by ID.
- **Method**: PUT
- **Route Parameters**:
  - `id` (required): Order ID
- **Request Body**: Updated order details
- **Response**: Updated order

### `DELETE /api/orders/:id`

- **Description**: Delete an order by ID.
- **Method**: DELETE
- **Route Parameters**:
  - `id` (required): Order ID
- **Response**: Success or failure message

---

## 📦 Packages

### `GET /api/packages`

- **Description**: Get a list of all packages with query parameters.
- **Method**: GET
- **Query Parameters**:
  - `limit` (optional): Number of packages to return
  - `category` (optional): Filter by package category
- **Response**: List of packages

### `POST /api/packages`

- **Description**: Create a new package.
- **Method**: POST
- **Request Body**: Package details
- **Response**: Created package

### `GET /api/packages/:id`

- **Description**: Get a single package by ID with query parameters.
- **Method**: GET
- **Route Parameters**:
  - `id` (required): Package ID
- **Query Parameters**:
  - `category` (optional): Filter by package category
  - `price` (optional): Filter by package price
- **Response**: Single package

### `PUT /api/packages/:id`

- **Description**: Update an existing package by ID.
- **Method**: PUT
- **Route Parameters**:
  - `id` (required): Package ID
- **Request Body**: Updated package details
- **Response**: Updated package

### `DELETE /api/packages/:id`

- **Description**: Delete a package by ID.
- **Method**: DELETE
- **Route Parameters**:
  - `id` (required): Package ID
- **Response**: Success or failure message

---

## 👤 Users

### `POST /api/auth/register`

- **Description**: Register a new user.
- **Method**: POST
- **Request Body**: User details
- **Response**: Created user

### `POST /api/auth/login`

- **Description**: Login an existing user.
- **Method**: POST
- **Request Body**: Login credentials (email, password)
- **Response**: Authenticated user with token

### `GET /api/auth/logout`

- **Description**: Logout the current user by clearing session or token.
- **Method**: GET
- **Query Parameters**:
  - `id` (optional): User ID
- **Response**: Success or failure message

---
