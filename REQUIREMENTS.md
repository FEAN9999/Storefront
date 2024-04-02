### API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

### API Endpoints

`GET /` - Homepage

`GET /products` - READ all products\
`GET /products/:id` - READ specific product by product id\
`PUT /products/:id` - UPDATE specific product by product id\
`POST /products` - CREATE product\
`DELETE /products` - DELETE product by product id

`GET /users` - READ all users\
`GET /users/:id` - READ specific user by user id\
`PUT /users/:id` - UPDATE specific user by user id\
`POST /users` - CREATE user\
`DELETE /users` - DELETE specific user by user id

`GET /orders` - READ all orders\
`GET /orders/:userId` - READ orders by user id\
`POST /orders` - CREATE order\
`DELETE /orders` - DELETE specific order by order id\
`POST /orders/products` - CREATE order with product id\
`PUT /orders/products/:id` - UPDATE order with product id\
`DELETE /orders/products/:id` - DELETE order product by order product id

## Data Shapes

### Product

The table includes the following fields:

- id
- name
- price
  The SQL schema for this table is as follows:

```sql
CREATE TABLE products (
    id    SERIAL PRIMARY KEY,
    name  VARCHAR(100) NOT NULL,
    price integer      NOT NULL
)
```

### User

The table includes the following fields:

- id
- user_name
- first_name
- last_name
- password
  The SQL schema for this table is as follows:

```sql
CREATE TABLE "users" (
     id              SERIAL PRIMARY KEY,
  user_name        VARCHAR(250) NOT NULL,
  first_name       VARCHAR(250) NOT NULL,
  last_name        VARCHAR(250) NOT NULL,
  password        VARCHAR(1024) NOT NULL
)
```

### Orders

The table includes the following fields:

- id
- user_id
- status (active or complete)
  The SQL schema for this table is as follows:

```sql
CREATE TABLE orders (
      id      SERIAL PRIMARY KEY,
    status  VARCHAR(100),
    user_id bigint REFERENCES users(id)
);
```

### order_products

The table includes the following fields:

- id
- product_id
- order_id
- quantity
  The SQL schema for this table is as follows:

```sql
CREATE TABLE order_products (
       id         SERIAL PRIMARY KEY,
    quantity   integer,
    order_id   bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);
```
