# GO-FINANCE

## Iniciando a API Node.js (back-end)

1. Instalando postgres com Docker

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

2. Crie um arquivo "ormconfig.json" e configure os bancos:
```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "douglasgmsantos",
  "password": "123456",
  "database": "gofinance",
  "entities": [
    "./src/modules/**/infra/typeorm/entities/*.ts"
  ],
  "migrations": [
    "./src/shared/infra/typeorm/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations/"
  }
}
```

3. Execute o comando:
```
yarn install && yarn typeorm migration:run && yarn dev:server
```
