CREATE TABLE orders
(
    id      text PRIMARY KEY,
    status  VARCHAR(100),
    user_id text REFERENCES users(id)
);