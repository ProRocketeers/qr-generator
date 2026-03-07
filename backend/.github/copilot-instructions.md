# Backend QR Generator - Copilot Instructions

## Přehled projektu

NestJS backend pro generování a správu QR kódů s podporou ukládání do PostgreSQL databáze.

**Tech stack:**
- NestJS 11 + TypeScript
- MikroORM 6 pro ORM + PostgreSQL
- Swagger dokumentace (`@nestjs/swagger`)
- Validace přes `class-validator`, `class-transformer`
- QR generování: `qr-code-styling`, `qrcode`, `sharp`
- Containerizace: Docker Compose (PostgreSQL + pgAdmin)

## Struktura projektu

```
src/
├── main.ts                    # Bootstrap aplikace, port 3001
├── app.module.ts              # Root module (ConfigModule, MikroORM, QrModule, HealthModule)
├── configs/
│   ├── mikro-orm.config.ts   # DB config (PostgreSQL, migrations, entities)
│   └── swagger.config.ts     # Swagger setup
├── encoders/                  # Enkodéry payloadu na QR string pro každý typ
│   ├── encodeText.ts
│   ├── encodeLink.ts
│   ├── encodeEmail.ts
│   ├── encodeCall.ts
│   ├── encodeSms.ts
│   ├── encodeWifi.ts
│   ├── encodeGeo.ts
│   ├── encodeEvent.ts
│   ├── encodeContact.ts
│   ├── encodePaymentSEPA.ts
│   ├── encodePaymentSPD.ts
│   └── encodeOTPAuth.ts
├── helpers/                   # Utility funkce pro SVG/PNG transformace
│   ├── cleanSvg.ts
│   ├── svgToBase64.ts
│   └── svgToPng.ts
├── health/                    # Health check endpoint
├── qr/                        # QR modul
│   ├── qr.controller.ts      # QR generování bez ukládání (POST /api/v1/qr/svg|png|base64)
│   ├── qrEntity.controller.ts # CRUD operace s QR entitami (POST|GET|PUT|DELETE /api/v1/qr/:code)
│   ├── qr.entity.ts          # MikroORM entita
│   ├── qr.module.ts
│   ├── qrCode.service.ts     # Hlavní service pro vytvoření QR kódu
│   ├── qrEntity.service.ts   # Service pro DB operace
│   ├── qrString.service.ts   # Mapování typu na enkodér
│   ├── qrStyle.service.ts    # Stylování QR kódu
│   └── dto/
│       └── index.dto.ts      # DTOs (CreateQrRequestDto, CreateQrResponseDto)
├── polyfills/                 # DOM/Canvas polyfilly pro Node.js (happy-dom)
└── types/
    └── index.ts              # QrType enum
```

## API Kontrakt

### Generování bez ukládání (render z payloadu)

```
POST /api/v1/qr/svg
POST /api/v1/qr/png
POST /api/v1/qr/base64
```

**Request Body:**
```typescript
{
  type: "text" | "link" | "email" | "call" | "sms" | "wifi" | "geo" | "event" | "contact" | "sepa" | "spd" | "otpauth",
  data: string | object  // string pro type=text, object pro ostatní
}
```

**Response:** SVG/PNG/Base64 (status 201)

### CRUD s uložením do DB

```
POST   /api/v1/qr         -> { code: "QRAB12" }
GET    /api/v1/qr/:code   -> { code, type, data, svg, createdAt, updatedAt }
PUT    /api/v1/qr/:code   -> { code, type, data, createdAt, updatedAt }
DELETE /api/v1/qr/:code   -> 204
GET    /api/v1/qr/:code/svg
GET    /api/v1/qr/:code/png
GET    /api/v1/qr/:code/base64
```

**Header:** `X-QR-Code-ID` je návratový header u entity endpointů.

## Kódovací konvence

### NestJS Best Practices

1. **Controllers:**
   - Použij `@Body()`, `@Param()`, `@Res()` pro parametry
   - Nastav `@ApiTags()`, `@ApiOperation()`, `@ApiOkResponse()` pro Swagger
   - Pro odpovědi s custom content-type používej `@Res()` a `res.type().send()`
   - Nastav správný HTTP status přes `res.status(201)`

2. **Services:**
   - Business logika patří do services, ne do controllerů
   - Service vrací pure data, controller formátuje response
   - Injektuj repository přes `@InjectRepository(Entity)`

3. **Validace:**
   - Globální `ValidationPipe` je nastaven v `main.ts`
   - V DTO použij `class-validator` dekorátory (`@IsEnum`, `@IsString`, `@IsObject`)
   - `whitelist: true`, `forbidNonWhitelisted: true`

4. **Error handling:**
   - Vyhazuj NestJS exceptions (`ConflictException`, `NotFoundException`)
   - Nevracej raw errory z DB, zabal je do meaningful business exceptions

### MikroORM

1. **Entities:**
   - Použij dekorátory `@Entity()`, `@PrimaryKey()`, `@Property()`, `@Enum()`
   - Pro JSON data: `@Property({ type: 'json', columnType: 'jsonb' })`
   - Pro timestamp automatiku: `@Property({ onUpdate: () => new Date() })`

2. **Repository pattern:**
   - Získej EntityManager přes `this.repo.getEntityManager()`
   - Pro flush použij `persistAndFlush()` nebo `removeAndFlush()`
   - Async find operations vždy awaituji

3. **Migrace:**
   - Po změně entity spusť: `pnpm db:migration:create`
   - Aplikuj: `pnpm db:migration:up`
   - Pro seed: `pnpm db:seed`

### QR Payload struktura

Každý typ má specifický payload shape:

```typescript
// text
{ type: "text", data: "Hello World" }

// link
{ type: "link", data: { url: "https://example.com" } }

// email
{ type: "email", data: { to: "john@example.com", subject?: string, body?: string } }

// call
{ type: "call", data: { phone: "+420123456789" } }

// sms
{ type: "sms", data: { phone: "+420123456789", body?: string } }

// wifi
{ type: "wifi", data: { ssid: string, password?: string, encryption?: "WPA2"|"WPA"|"WEP"|"nopass", hidden?: boolean } }

// geo
{ type: "geo", data: { latitude: number, longitude: number, altitude?: number } }

// event (iCalendar VEVENT)
{ type: "event", data: { title: string, start: string, end?: string, location?: string, description?: string } }

// contact (vCard)
{ type: "contact", data: { firstName: string, lastName?: string, email?: string, phone?: string, ... } }

// sepa (SEPA payment)
{ type: "sepa", data: { name: string, iban: string, bic?: string, amount?: string, currency?: string } }

// spd (Short Payment Descriptor - CZ)
{ type: "spd", data: { accountName: string, iban: string, amount?: string, variableSymbol?: string } }

// otpauth (TOTP/HOTP)
{ type: "otpauth", data: { type: "totp"|"hotp", label: string, secret: string, issuer?: string } }
```

## Environment Variables

```env
PORT=3001
BASE_PATH=              # Swagger server base path
DB_HOST=localhost
DB_PORT=5436            # Port mappovaný v docker-compose
DB_NAME=qr_generator
DB_USER=postgres
DB_PASSWORD=secret
DB_SSL=false
```

## Spouštění a testování

```bash
# Development
pnpm install
pnpm start:dev          # Watch mode na portu 3001

# Docker infrastruktura
docker compose up -d    # Postgres + pgAdmin

# Database
pnpm db:migration:up    # Aplikuj migrace
pnpm db:seed            # Seed data

# Build & Production
pnpm build
pnpm start:prod

# Linting
pnpm lint
```

**Přístup:**
- Backend: http://localhost:3001
- Swagger: http://localhost:3001/swagger
- pgAdmin: http://localhost:5050 (admin@example.com / admin123)

## Důležité poznámky

1. **Polyfilly:** Node.js nemá DOM/Canvas API - používáme `happy-dom` polyfilly v `src/polyfills/` pro QR knihovny.

2. **SVG cleaning:** `cleanSvg()` helper odstraňuje namespace a XML deklarace před odesláním SVG klientovi.

3. **Unique QR code:** `QrEntityService.generateCode()` generuje 6-ti znakové unikátní kódy ve formátu `QRXXXX`.

4. **Response streaming:** Pro binární výstupy (PNG, SVG) nepoužívej JSON response, ale `res.type().send(buffer)`.

5. **Validace payloadů:** Každý enkodér (`src/encoders/`) validuje svůj payload a hází chybu při neplatných datech.

## Časté problémy

- **Canvas errors:** Node.js nemá Canvas API → řeší se polyfillem v `src/polyfills/canvas-env.ts`
- **Migration create selhává:** Ujisti se, že entity jsou správně importovány v `mikro-orm.config.ts`
- **Port 5436 už obsazen:** Změň v `docker-compose.yaml` a `.env` na jiný port
- **CORS errory:** `app.enableCors()` je v `main.ts`, zkontroluj že backend běží před frontendem

## Přidávání nových QR typů

1. Vytvoř enkodér v `src/encoders/encodeNewType.ts`
2. Přidej typ do `QrType` enum v `src/types/index.ts`
3. Registruj enkodér v `QrStringService.QrTypeMapper`
4. Aktualizuj testy a Swagger dokumentaci
5. Přidej do README payload příklad
