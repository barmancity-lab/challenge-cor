# Challenge telecom

Service to check weather


## Installation of dependencies

```sh
npm install
```



### Environments

Normally exists 4. local, development, qa and production. These are set by the ENV called **NODE_ENV**

```sh
NODE_ENV=local
```

The specfic configurations are in **app/config**.

## To run  local

To run the service challenge weather, the following  command has to be run

```sh
npm run  local-default
```

If you want to run in mode **watch** (reload the service for each change)

```sh
npm run  local-default-w
```

## Swagger

There is an endpoint to see the swagger file

run the service and go to:

[http://localhost:3053/v1/api-docs](http://localhost:3053/v1/api-docs/)


## Unit testing

to run the tests
    
```sh
npm run unit-test
```

## Coverage

To see the current coverage

```sh
npm run coverage
```

To see more details on the console

```sh
npm run coverage-table
```

To get and html report inside your project and see more details about the coverage

```sh
npm run coverage-html
```

To see if the all type of coverages are ok (over 80%)

```sh
npm run coverage-check
```

## Linter

To run eslint

```sh
npm run eslint
```

To run eslint with **watch**

```sh
npm run eslint-w
```

if you want eslint to fix some errores (**not** all the errors can be fixed)

```sh
npm run eslint-fix
```
