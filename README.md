# Node Starter

[![Build Status](https://github.com/JO3-W3B-D3V/Node-Starter/workflows/Continuous%20Integration/badge.svg)](https://github.com/JO3-W3B-D3V/Node-Starter/actions?query=workflow%3A%22Continuous+Integration%22)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=JO3-W3B-D3V_Node-Starter&metric=alert_status)](https://sonarcloud.io/dashboard?id=JO3-W3B-D3V_Node-Starter)
[![SonarCloud Coverage](https://sonarcloud.io/api/project_badges/measure?project=JO3-W3B-D3V_Node-Starter&metric=coverage)](https://sonarcloud.io/component_measures/metric/coverage/list?id=JO3-W3B-D3V_Node-Starter)
[![SonarCloud Bugs](https://sonarcloud.io/api/project_badges/measure?project=JO3-W3B-D3V_Node-Starter&metric=bugs)](https://sonarcloud.io/component_measures/metric/reliability_rating/list?id=JO3-W3B-D3V_Node-Starter)
[![SonarCloud Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=JO3-W3B-D3V_Node-Starter&metric=vulnerabilities)](https://sonarcloud.io/component_measures/metric/vulnerabilities/list?id=JO3-W3B-D3V_Node-Starter)
[![SonarCloud Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=JO3-W3B-D3V_Node-Starter&metric=reliability_rating)](https://sonarcloud.io/component_measures/metric/reliability_rating/list?id=JO3-W3B-D3V_Node-Starter)
[![SonarCloud Security Rating](https://sonarcloud.io/api/project_badges/measure?project=JO3-W3B-D3V_Node-Starter&metric=security_rating)](https://sonarcloud.io/component_measures/metric/security_rating/list?id=JO3-W3B-D3V_Node-Starter)
[![SonarCloud Tech Debt](https://sonarcloud.io/api/project_badges/measure?project=JO3-W3B-D3V_Node-Starter&metric=sqale_index)](https://sonarcloud.io/component_measures/metric/sqale_index/list?id=JO3-W3B-D3V_Node-Starter)
[![SonarCloud Code Smells](https://sonarcloud.io/api/project_badges/measure?project=JO3-W3B-D3V_Node-Starter&metric=code_smells)](https://sonarcloud.io/component_measures/metric/code_smells/list?id=JO3-W3B-D3V_Node-Starter)
[![Known Vulnerabilities](https://snyk.io/test/github/JO3-W3B-D3V/Node-Starter/badge.svg?targetFile=package.json)](https://snyk.io/test/github/JO3-W3B-D3V/Node-Starter?targetFile=package.json)
[![Code Climate](https://codeclimate.com/github/JO3-W3B-D3V/Node-Starter/badges/gpa.svg)](https://codeclimate.com/github/JO3-W3B-D3V/Node-Starter)

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/E1E024921)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/JO3W3BD3V?locale.x=en_GB)

<hr/>

This repository includes some demonstration Node based application that
uses Jest for the unit testing & technologies such as Express & Knex.

<hr/>

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

- Use a number of monitoring technologies, i.e. AppSensor.
- etc.
