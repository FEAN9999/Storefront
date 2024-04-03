CREATE TABLE order_products
(
    id         text PRIMARY KEY,
    quantity   integer,
    order_id   text REFERENCES orders(id) ON DELETE CASCADE,
    product_id text REFERENCES products(id) ON DELETE CASCADE
);