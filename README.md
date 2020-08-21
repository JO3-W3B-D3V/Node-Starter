# Node Starter
This repository includes some demonstration Node based application that 
uses Jest for the unit testing & technologies such as Express & Knex.

## Run the Application 
In order to run the application you simply need to run the following command:

```bash 
$ npm run-script start
```

| Endpoint              | Method | Description                                           |
| --------------------- | ------ | ----------------------------------------------------- |
| /users?page=:page     | GET    | Return a page of users. **The page arg is optional.** |
| /users/:id            | GET    | Return a specific user.                               |
| /users                | POST   | Create a new user.                                    | 

## Docker 
In order to run the application with Docker, you'll need to run the following command(s):

```bash 
$ docker build -t node-demo .
$ docker run -p 80:3000 node-demo
```

## Migrations

In order to run the database migrations, you'll need to run the following command:

```bash
$ npx knex migrate:latest
$ npx knex migrate:latest --env test
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

## Todo

- Implement a complete & mature CI/CD pipeline.
- Implement a Dockerfile.
- etc.
