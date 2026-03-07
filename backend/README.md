# Backend - QR Generator

NestJS backend pro generovani QR kodu, jejich renderovani (SVG/PNG/Base64) a volitelne ulozeni do PostgreSQL.

## Co backend umi

- Vygenerovat QR kod z payloadu bez ulozeni (`/api/v1/qr/svg`, `/api/v1/qr/png`, `/api/v1/qr/base64`).
- Ulozit QR kod do DB a vratit kratky kod (napr. `QRAB12`).
- Nacist, upravit a smazat ulozeny QR kod.
- Vratit ulozeny QR kod jako SVG/PNG/Base64.
- Poskytnout Swagger dokumentaci.

## Tech stack

- Node.js + NestJS
- MikroORM + PostgreSQL
- Swagger (`@nestjs/swagger`)
- `qr-code-styling`, `qrcode`, `sharp`

## Rychly start

1. Nainstaluj dependencies:

```bash
pnpm install
```

2. Priprav env:

```bash
cp .env.example .env
```

3. Spust infrastrukturu (Postgres + pgAdmin):

```bash
docker compose up -d
```

4. Proved migrace:

```bash
pnpm db:migration:create   # jen pokud jsi menil entity
pnpm db:migration:up
```

5. (Volitelne) napln seed data:

```bash
pnpm db:seed
```

6. Spust backend:

```bash
pnpm start:dev
```

Default local URL je [http://localhost:3001](http://localhost:3001) a pgAdmin bezi na [http://localhost:5050](http://localhost:5050) (dle `.env.example`).

## Env promenne

Pouzite promenne (viz `.env.example`):

```env
PORT=3001
BASE_PATH=
DB_HOST=localhost
DB_PORT=5436
DB_NAME=qr_generator
DB_USER=postgres
DB_PASSWORD=secret
DB_SSL=false
```

Poznamka: `BASE_PATH` se aktualne pouziva pro Swagger server metadata, ne pro global prefix rout.

## Docker a pgAdmin

- PostgreSQL: `localhost:5436`
- pgAdmin: [http://localhost:5050](http://localhost:5050)
- pgAdmin login:
  - email: `admin@example.com`
  - password: `admin123`
- Pri registraci serveru v pgAdmin:
  - host: `postgres`
  - port: `5432`
  - database: `qr_generator`
  - username: `postgres`
  - password: `secret`

## API prehled

### Health

- `GET /health` -> `{ "status": "ok" }`

### QR bez ulozeni (render z payloadu)

- `GET /api/v1/qr/svg`
- `GET /api/v1/qr/png`
- `GET /api/v1/qr/base64`

Body ma tvar:

```json
{
  "type": "text",
  "data": "Hello World"
}
```

Poznamka: endpointy pouzivaji `GET` s body (tak je to implementovano v kontroleru).

### QR s ulozenim (entity)

- `POST /api/v1/qr` - vytvori zaznam, vraci `{ code }`
- `GET /api/v1/qr/:code` - vrati ulozenou entitu
- `PUT /api/v1/qr/:code` - prepise `type` + `data` + `svg`
- `DELETE /api/v1/qr/:code` - smaze zaznam (`204`)
- `GET /api/v1/qr/:code/svg`
- `GET /api/v1/qr/:code/png`
- `GET /api/v1/qr/:code/base64`

U entity endpointu backend nastavuje response header `X-QR-Code-ID`.

## Podporovane typy `type`

- `text`
- `link`
- `email`
- `call`
- `sms`
- `wifi`
- `geo`
- `event`
- `contact`
- `sepa`
- `spd`
- `otpauth`

### Minimalni payload priklady

```json
{ "type": "text", "data": "Ahoj" }
{ "type": "link", "data": { "url": "https://example.com" } }
{ "type": "email", "data": { "to": "john@example.com" } }
{ "type": "call", "data": { "phone": "+420123456789" } }
{ "type": "sms", "data": { "phone": "+420123456789", "body": "Ahoj" } }
{ "type": "wifi", "data": { "ssid": "OfficeWiFi", "password": "secret", "encryption": "WPA2" } }
{ "type": "geo", "data": { "latitude": 50.087, "longitude": 14.421 } }
{ "type": "event", "data": { "title": "Meeting", "start": "2026-03-07T12:00:00Z" } }
{ "type": "contact", "data": { "firstName": "John", "lastName": "Doe" } }
{ "type": "sepa", "data": { "name": "Company s.r.o.", "iban": "CZ6508000000192000145399" } }
{ "type": "spd", "data": { "accountName": "Company s.r.o.", "iban": "CZ6508000000192000145399" } }
{ "type": "otpauth", "data": { "type": "totp", "label": "john@example.com", "secret": "BASE32SECRET" } }
```

## Validace a chovani

- Globalni `ValidationPipe`: `whitelist: true`, `forbidNonWhitelisted: true`.
- `type` je enum; vychozi hodnota je `text`.
- Pro `type=text` je `data` string, pro ostatni typy objekt.
- Pri nenalezeni kodu backend vraci chybu (`ConflictException`).

## Swagger

- UI: [http://localhost:3001/swagger](http://localhost:3001/swagger)
- YAML: [http://localhost:3001/swagger/yaml](http://localhost:3001/swagger/yaml)

## Databaze prikazy

```bash
pnpm db:migration:create
pnpm db:migration:up
pnpm db:fresh
pnpm db:fresh:seed
pnpm db:seed
```

## Uzitecne skripty

```bash
pnpm build
pnpm start
pnpm start:dev
pnpm start:prod
pnpm lint
pnpm test
```
