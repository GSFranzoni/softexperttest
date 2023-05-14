# Product Management API
This project provides a RESTful API for managing products, purchases, users, and authentication. It is built with the following technologies:
- Doctrine ORM
- Docker and Docker Compose
- MySQL
- React with Vite and Chakra UI

## Demo
A demo of this project is available at https://ecommerce.gsfranzoni.me

You can use the following credentials to login:
- **Email:** admin@softexpert.com
- **Password:** admin

## Installation
Clone this repository to your local machine.

Copy the .env.sample file to .env located at the root of the project and fill in the required values.
You also need to setup the frontend .env file located at ```/resources/js/.env```.

### With Docker
Install Docker and Docker Compose.

Run the following command to start the API:
```bash
docker-compose up -d
```

Install the dependencies:
```bash
docker-compose exec softexpert_server composer install
```

Run the migrations:
```bash
docker-compose exec softexpert_server ./vendor/bin/doctrine-migrations migrations:migrate
```

### Without Docker
Install PHP 8.2, Composer, Npm, and MySQL.

Install the dependencies:
```bash
composer install
```

Run the migrations:
```bash
./vendor/bin/doctrine-migrations migrations:migrate
```

Run the server:
```bash
php -S localhost -t public
```

Install the frontend dependencies:
```bash
cd resources/js
npm install
```

Run the frontend server:
```bash
npm run dev
```

And you're done! The API will be available at http://localhost:3000

## Testing

### With Docker
Run the following command to start the API:
```bash
docker-compose exec softexpert_server vendor/bin/phpunit tests --testdox --colors=always
```

### Without Docker
Run the tests:
```bash
vendor/bin/phpunit tests --testdox --colors=always
```

## Routes
### List all products
```
GET /products
```
Returns a list of all products.
___
### Create a product
```
POST /products
```
Creates a new product.
___
### List all product categories
```
GET /products/categories
```
Returns a list of all product categories.
___
### Create a product category
```
POST /products/categories
```
Creates a new product category.
___
### List all taxes for a product category
```
GET /products/categories/{id}/taxes
```
Returns a list of all taxes for the specified product category.
___
Create a tax for a product category
```
POST /products/categories/{id}/taxes
```
Creates a new tax for the specified product category.
___
### List all purchases
```
GET /purchases
```
Returns a list of all purchases.
___
### Create a purchase
```
POST /purchases
```
Creates a new purchase.
___
### View a purchase
```
GET /purchases/{id}
```
Returns the details of the specified purchase.
___
# List all users
```
GET /users
```
Returns a list of all users.
___
### Create a user
```
POST /users
```
Creates a new user.
___
### Update a user
```
PUT /users/{id}
```
Updates the details of the specified user.
___
### Delete a user
```
DELETE /users/{id}
```
Deletes the specified user.
___
### Login
```
POST /auth/login
```
Logs in a user.
___
### Register
```
POST /auth/register
```
Creates a new user.
___
### Get current user
```
GET /auth/me
```
Returns the details of the current user.
___

## Authentication and Authorization
This API uses JWT (JSON Web Token) for authentication. All endpoints except for /auth/login and /auth/register require a valid JWT token to be provided in the Authorization header.

**Regular users** (with the **ROLE_REGULAR** role) are authorized to access the following endpoints:
- ```/products```
- ```/products/categories```
- ```/products/categories/{id}/taxes```
- ```/purchases```

**Admin users** (with the **ROLE_ADMIN** role) are authorized to manage users in the following endpoints:
- ```/users```
- ```/auth/register```
