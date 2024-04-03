CREATE TABLE users (
  id              text PRIMARY KEY,
  user_name        VARCHAR(250) NOT NULL,
  first_name       VARCHAR(250) NOT NULL,
  last_name        VARCHAR(250) NOT NULL,
  password        VARCHAR(1024) NOT NULL
);