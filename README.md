# Storefront

## Description

This is a project for creating an online storefront.

## Installation

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Configure the environment variables.
4. Start the application using `npm start`.

## Initialize PostgreSQL and connect to database

```shell
# start PostgreSQL
$ psql -h localhost -U postgres

# create database for dev env
$ CREATE DATABASE storefront;

```

## Migration script for `test` database

```shell
$ npm run test
```

## Migration script for `dev` database

```shell
$ npm run dev
```

## Ports

Application :

```shell
3000
```

Database :

````shell
5432
```

## Environment Variables

Create the `.env` file.
Setting default

```shell
POSTGRES_HOST=localhost
POSTGRES_DB_DEV=storefront
POSTGRES_DB_TEST=storefront_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD='123456'
ENV=dev
TOKEN_SECRET=secret
````

## Contributing

Contributions are welcome!

## License

This project is licensed under the [MIT License](./LICENSE).
