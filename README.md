# GO-FINANCE

## Instalando docker para usar o Postgres

```shell
docker run \
    --name postgres \
    -e POSTGRES_USER=douglasgmsantos \
    -e POSTGRES_PASSWORD=123456 \
    -e POSTGRES_DB=gofinance \
    -p 5432:5432 \
    -d \
    postgres
```

## Acessando container
psql -h localhost -p 5432 -d gofinance -U douglasgmsantos -W

## Scripts de auxilio 
SELECT * FROM pg_extension where extname = 'uuid-ossp';
 - caso não exista registro: CREATE EXTENSION "uuid-ossp";

## Migrations 
- yarn typeorm migration:run
