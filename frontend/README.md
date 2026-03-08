# Frontend - QR Generator

Next.js frontend pro generování QR kódů s možností uložení do databáze backendu.

## Co frontend dělá

- Poskytuje web UI pro vytvoření QR kódu (text, URL, email, ...).
- Umožňuje vybrat si typ QR kódu z dropdown menu.
- Generuje QR kód voláním backendu (`/api/v1/qr`).
- Zobrazuje vygenerovaný QR kód uživateli.
- Umožňuje si QR kód stáhnout nebo zkopírovat do schránky.

## Tech stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- TailwindCSS + Radix UI
- React Hook Form + Zod (validace)
- TanStack React Query
- Axios

## Rychlý start

1. Nainstaluj dependencies:

```bash
pnpm install
```

2. Priprav env (volitelné, pokud běží backend na localhost:3001):

```bash
cp .env.example .env.local  # pokud existuje
```

3. Spusť dev server:

```bash
pnpm dev
```

Frontend běží na [http://localhost:3000](http://localhost:3000).

## Env proměnné

Použité proměnné (ve výchozím settings):

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Pokud jsi změnil port backendu, uprav `NEXT_PUBLIC_API_URL` v `.env.local`.

## Struktura projektu

```
src/
├── app/              # Next.js App Router pages
│   ├── page.tsx      # Hlavní stránka (/)
│   ├── layout.tsx    # Root layout
│   └── admin/        # Admin sekce (login, dashboard)
├── api/              # API klient
│   ├── axios.ts      # Axios instance s baseURL
│   ├── apiEndpoints.ts
│   └── qr.ts
├── components/
│   ├── client/       # Client-side komponenty
│   │   ├── QrForm.tsx
│   │   ├── SelectTypeForm.tsx
│   │   ├── EmailForm.tsx
│   │   ├── UrlForm.tsx
│   │   └── ImageQR.tsx
│   └── ui/           # Reusable UI komponenty (form fields, buttons, ...)
├── hooks/
│   ├── useGetIdParam.ts
│   └── api/
│       └── qr.ts     # React Query hooks pro QR API
├── utils/
│   ├── schemas/      # Zod validační schémata (emailSchema, qrSchema, ...)
│   ├── helpers/      # Utility funkce (decode, encode, getFormsMap)
│   ├── consts/       # Konstanty
│   ├── types/        # TypeScript typy
│   └── providers/    # Context providers (QueryProvider)
└── middleware.ts     # Next.js middleware
```

## Hlavní komponenty

- **SelectTypeForm**: Dropdown pro výběr typu QR kódu (url, email, atd.).
- **UrlForm / EmailForm**: Formuláře pro konkrétní typ QR kódu.
- **ImageQR**: Komponenta pro zobrazení vygenerovaného QR kódu.
- **FormSelectWrapper**: Wrapper, který vybere správný formulář na základě типu.

## Komunikace s backendem

Frontend volá backend přes Axios s baseURL `http://localhost:3001`:

```typescript
POST /api/v1/qr
{
  "type": "url",
  "data": { "url": "https://example.com" }
}
```

Odpověď:
```json
{
  "code": "QRAB12"
}
```

## Užitečné skripty

```bash
pnpm dev          # Spusti dev server s Turbopack
pnpm build        # Build pro produkci
pnpm start        # Start prod serveru
pnpm lint         # ESLint check
```

## Validace formulářů

- EmailForm: validuje email, subject, body (Zod schema)
- UrlForm: validuje URL (Zod schema)
- Globální `ValidationPipe` není na frontendu, validace je cliente-side
