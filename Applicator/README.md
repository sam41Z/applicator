# Applicator API
Spring Boot application to serve the applicator APIs.

## API Doc
[Swagger UI](http://localhost:8080/swagger-ui/index.html#/)

## jOOQ
[jOOQ](https://www.jooq.org/) is used in the data access layer.
### Codegen
jOOQ code can be generated using `mvn clean package`
>Disclaimer: It might throw a compile error `package org.jooq does not exist`. While annoying the code is generated correctly and  is working.

## Database
Used database: `PostgreSQL`
### Migrations
The database is migrated using `Flyway`. Location of the migration is configured in the application `.yaml` (default: `db/migration`).
Test data for integration tests is generated using `db/testdata`

### Container
A database container to use when running the application can be started using `docker compose -f compose.yaml up`