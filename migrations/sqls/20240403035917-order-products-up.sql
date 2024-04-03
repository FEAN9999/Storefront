CREATE TABLE order_products
(
    id         text PRIMARY KEY,
    quantity   integer,
    order_id   text REFERENCES orders(id),
    product_id text REFERENCES products(id)
);