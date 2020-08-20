# Node POC
This repository includes some demonstration Node based application that 
uses Jest for the unit testing & technologies such as Express & Knex.

## Run the Application 
In order to run the application you simply need to run the following command:

```bash 
$ npm run-script start
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