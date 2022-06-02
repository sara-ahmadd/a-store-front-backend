# Storefront Backend Project

## used Technologies

- application used the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
- morgan from npm for logging request source.
- helmet from npm for security.

### seting up application and running endpoints

- run server on port : PORT=3000
- create 2 databases :
- one for testing.
- the other for development.
- use these information in building database:

- # information needed for database.

- NODE_ENV=dev
- pgHOST =localhost
- pgPORT =5432
- pgUSER =********
- pgPASSWORD =******
- pgDB = store_udacity_dev
- pgDB_TEST = store_udacity_test

- # setting salt and pepper needed for hashing the passwords

- BCRYPT_PASSWORD=your-hashed-password
- SALT_ROUNDS=10

- # adding secret token for JWT authorization.
- TOKEN_SECRET= your-secret-web-token-only-me
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

### resources

- udacity classroom.
- youtube tutorials.
