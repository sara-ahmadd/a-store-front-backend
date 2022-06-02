# storefront backend project

## API Endpoints

#### Products

- Index [token required]
- Show [token required]
- Create [token required]
- edit [token required]
- delete [token required]

#### Users

- Index [token required]
- Show [token required]
- Create N[token required]
- edit [token required]
- delete [token required]

#### Orders

- Index [token required]
- Show [token required]
- Create [token required]
- edit [token required]
- delete [token required]

### order_products

- Create [token required]
- Show [token required]
- edit [token required]
  **endpoints**

  **- users table endpoints:**

- (post method)[localhost:3000/users/create] to create user and request body contains{email,firstname,lastname, password}.
  -(get method)[localhost:3000/users/index] to get all users.[require token]
  -(get method)[localhost:3000/users/show/:id] to get specific user with id of user as a parameter.[require token]
  -(patch method)[localhost:3000/users/edit] to update a specific user and request body contains{email,firstname,lastname, password}.[require token]
  -(delete method)[localhost:3000/users/delete:id] to delete specific user with id of user as a parameter.[require token]

  - **\_(post method)[localhost:3000/users/authenticate] to authenticate a specific user and request body contains{email,firstname,lastname, password} this endpoint returns the token used with all requests done by that user.**

  **_products table endpoints:_**

  - (post method)[localhost:3000/products/create/product] to create product and request body contains{name,price}.[require token]
    -(get method)[localhost:3000/products/index] to get all products.[require token]
    -(get method)[localhost:3000/products/show/:id] to get specific product with id of the product as a parameter.[require token]
    -(patch method)[localhost:3000/products/edit] to update a specific product and request body contains{name,price}.[require token]
    -(delete method)[localhost:3000/products/delete:id] to delete specific product with id of the product as a parameter.[require token]

    **_orders table endpoints:_**

- (post method)[localhost:3000/orders/create/order] to create order and request body contains{status,user_id}.[require token]
  -(get method)[localhost:3000/orders/index/:id] to get all orders of a user with user_id as a parameter.[require token]
  -(get method)[localhost:3000/orders/show/:id] to get specific order with user_id as a parameter.[require token]
  -(patch method)[localhost:3000/orders/edit] to update a specific product and request body contains{status,user_id}}.[require token]
  -(delete method)[localhost:3000/orders/delete:id] to delete specific order with user_id as a parameter.[require token]

  **_order-Products table endpoints:_**

- (post method)[localhost:3000/cart/orders-products/:id/products] to add products in an order and request body contains{quantity,Order_id,Product_id}with Order_id as a parameter..[require token]
- (patch method)[localhost:3000/cart/orders-products/:id/products/edit] to update products in an order and request body contains{quantity,Product_id}with Order_id as a parameter.[require token]
- (get method) [localhost:3000/cart/orders-products/:id/products/show] to show products in an order with Order_id as a parameter.[require token]

## Data Shapes

#### Products

- id
- name
- price

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    price FLOAT NOT NULL
);
```

#### Users

- id
- firstName
- lastName
- password

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR (255) NOT NULL UNIQUE,
    firstName VARCHAR (255) NOT NULL,
    lastName VARCHAR (255) NOT NULL,
    password VARCHAR (255) NOT NULL
);
```

### orders

- id
- status of order (active or complete)
- user_id

```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15),
    user_id bigint REFERENCES users(id)
);
```

#### Order_products

- id
- id of each product in the order(product_id)
- id of each order in orders table (order_id)
- quantity of each product in the order

```sql
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);
```
