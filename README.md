# Node Starter

This repository includes some demonstration Node based application that
uses Jest for the unit testing & technologies such as Express & Knex.

## Requirements

- Install Node
- Install Docker
- Install VSCode

#### VSCode Suggestions (Optional)

- Install the font family called 'Fira Code'
- Install the icon theme called 'VSCode-icons'
- Install the extension called 'Bracket Pair Colorizer 2'
- Install the extension called 'Code Spell Checker'
- Install the extension called 'Find Related Files'
- Install the extension called 'GitLens — Git supercharged'
- Install the extension called 'Indent Rainbow'
- Install the extension called 'Path Intellisense'
- Install the extension called 'Sonar Lint'
- Install the extension called 'Jest Snippets'
- Install the extension called 'NPM Intellisense'
- Install the extension called 'Prettier — Code formatter'
- Install the extension called 'Version Lens'
- Install the theme called 'Monokai ST3'

#### Other Suggestions (Optional)

- Install 'Windows Terminal' from the MS store.
- Install Postman
- Install Chocolatey

## Run the Application

In order to run the application you simply need to run the following command(s):

```bash
$ npm run-script local:setup
$ npm run-script start
```

| Endpoint          | Method | Description                                           |
| ----------------- | ------ | ----------------------------------------------------- |
| /users?page=:page | GET    | Return a page of users. **The page arg is optional.** |
| /users            | POST   | Create a new user.                                    |
| /users            | PUT    | Update an existing user.                              |
| /users/:id        | GET    | Return a specific user.                               |
| /users/:id        | PUT    | Update an existing user.                              |
| /users/:id        | DELETE | Delete an existing user.                              |

## Docker

In order to run the application with Docker, you'll need to run the following command(s):

```bash
$ docker build -t node-demo .
$ docker run -p 80:3000 node-demo
```

## Migration

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

## General Quality

Through the use of tools such as Synk, ESLint, SonarLint, etc. You can run some quality
checks locally, to do so run the following script:

```bash
$ npm run quality
```

## Todo

- Implement a complete & mature CI/CD pipeline.
- Implement a Dockerfile.
- Use a number of monitoring technologies, i.e. AppSensor.
- etc.
