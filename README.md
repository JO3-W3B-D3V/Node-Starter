# Node Starter

This repository includes some demonstration Node based application that
uses Jest for the unit testing & technologies such as Express & Knex.

## Run the Application

In order to run the application you simply need to run the following command:

```bash
$ npm run-script start
```

| Endpoint          | Method | Description                                           |
| ----------------- | ------ | ----------------------------------------------------- |
| /users?page=:page | GET    | Return a page of users. **The page arg is optional.** |
| /users            | POST   | Create a new user.                                    |
| /users            | put    | Update an existing user.                              |
| /users/:id        | GET    | Return a specific user.                               |
| /users/:id        | PUT    | Update an existing user.                              |
| /users/:id        | DELETE | Delete an existing user.                              |

## Docker

In order to run the application with Docker, you'll need to run the following command(s):

```bash
$ docker build -t node-demo .
$ docker run -p 80:3000 node-demo
```

## Migrationa

In order to run the database migrations, you'll need to run the following command(s):

```bash
$ npx knex migrate:latest
$ npx knex seed:run
$ npx knex migrate:latest --env test
$ npx knex seed:run --env test
```

Alternatively you _can_ just run this command:

```bash
$ npm run-script local:setup
```

## Unit Tests

In order to urn the unit tests, you'll need to run the following command:

```bash
$ npm run-script test
```

If you would like some debugging information, you can also run:

```bash
$ npm run-script test:debug
```

## Security

In order to run some security scans, you'll need to use [Snyk](https://snyk.io/).
This means at some point you'll want to provide credentials, via the use of the following
command:

```bash
$ npx snyk auth
```

You can then scan the dependencies for vulnerabilities via the following command:

```bash
$ npx snyk test
```

## Todo

- Implement a complete & mature CI/CD pipeline.
- Implement a Dockerfile.
- etc.
