# Frontend - QR Generator

## Tech Stack

- **Framework**: Next.js 15.5.2 (App Router, Turbopack)
- **React**: 19.1.0
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS 4.1+ with shadcn/ui components
- **Forms**: React Hook Form 7.62.0 + Zod 4.1.5 validation
- **Internationalization**: next-intl 4.8+ (Czech/English)
- **Data Fetching**: TanStack Query (React Query) + Axios
- **Icons**: Lucide React 0.542.0
- **UI Components**: Radix UI primitives with CVA (Class Variance Authority)

## Project Structure

```
src/
├── app/[locale]/          # Next.js App Router pages (localized)
├── components/
│   ├── client/           # Client components only
│   │   └── qr-generator/ # QR form components
│   │       └── form/     # Field components per QR type
│   └── ui/               # Reusable UI components (shadcn/ui)
│       ├── form/         # Form wrapper components
│       └── reusable/     # Button, Select, etc.
├── utils/
│   ├── schemas/          # Zod validation schemas per QR type
│   ├── helpers/          # Utility functions (cn, etc.)
│   ├── providers/        # React context providers
│   └── types/            # TypeScript type definitions
├── hooks/
│   └── api/              # React Query hooks for API calls
├── api/                  # Axios client configuration
├── i18n/                 # next-intl routing and request config
└── middleware.ts         # Locale detection and routing
messages/
├── en.json               # English translations
└── cs.json               # Czech translations
```

## Code Conventions

### File Naming
- Components: PascalCase (`FormBase.tsx`, `FieldsEmail.tsx`)
- Utilities: camelCase (`cn.ts`, `urlSync.ts`)
- Schemas: camelCase with "Schema" suffix (`baseSchema.ts`, `emailSchema.ts`)
- Types: camelCase with type extension (`OutputType.ts`)

### Component Patterns
- **Client Components**: Mark with `"use client"` directive at the top
- **Server Components**: Default for pages, no directive needed
- **Props Type**: Define inline or with `ComponentNameProps` type
- **Exports**: Named exports preferred over default (except for pages)

### Styling
- Use Tailwind utility classes directly
- Use `cn()` helper from `@/utils/helpers/cn` for conditional classes
- shadcn/ui components use CVA for variants
- Icons from lucide-react with consistent sizing (`h-4 w-4` for inline, `size-9` for buttons)

### Form Handling

#### Schema Factory Pattern
All validation schemas use factory functions that accept translation function:

```typescript
export const createValidateXFields = (t: (key: string) => string) => 
  (data: FormValues, ctx: RefinementCtx) => {
    // Validation logic with translated error messages
    if (!data.field) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('fieldRequired'),
        path: ['field']
      })
    }
  }
```

#### URL Synchronization
Each Fields component manages its own URL parameters using `urlSync.ts` helpers:

```typescript
import { syncQrFieldsInUrl } from '@/utils/helpers/urlSync'

// In component:
const fieldValue = watch('fieldName')
useEffect(() => {
  syncQrFieldsInUrl('qrType', { fieldName: fieldValue })
}, [fieldValue])
```

#### Form State Management
- Use `FormContext` wrapper that provides React Hook Form context
- Mode: `onChange` for immediate validation
- Schema created with `createSchema(tValidation)` factory
- Default values parsed from URL searchParams on server

### Internationalization

#### Translation Keys Structure
```json
{
  "common": { /* UI labels and messages */ },
  "qrTypes": { /* QR type names */ },
  "form": { /* Form field labels and placeholders */ },
  "validation": { /* Error messages */ }
}
```

#### Usage in Components
```typescript
import { useTranslations, useLocale } from 'next-intl'

const t = useTranslations('common')
const tValidation = useTranslations('validation')
const locale = useLocale() // 'cs' | 'en'
```

#### Supported Locales
- `cs` (Czech) - default locale, no URL prefix
- `en` (English) - uses `/en` URL prefix

### API Integration

#### React Query Pattern
```typescript
// In hooks/api/*.ts
export const useGenerateQrSvg = () => {
  return useMutation({
    mutationFn: (payload: QrPayload) => 
      qrApi.generateQrSvg(payload),
  })
}
```

#### API Client
- Base client in `src/api/client.ts`
- API URL from environment: `NEXT_PUBLIC_API_URL`
- Module-specific clients (e.g., `qr.ts`) use base client

### TypeScript Guidelines

#### Type Safety
- No explicit `any` types (lint rule enforced)
- Use proper type inference where possible
- Define types for API responses and payloads
- Union types for QR types: `"url" | "text" | "email" | "wifi" | "event" | "geo" | "contact"`

#### Common Types
```typescript
type QrType = "url" | "text" | "email" | "wifi" | "event" | "geo" | "contact"
type FormValues = z.infer<ReturnType<typeof createSchema>>
type SupportedLocale = (typeof routing.locales)[number]
```

### Next.js 15 App Router Patterns

#### Server Components with searchParams
```typescript
type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function Page({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : undefined
  return <ClientComponent searchParams={params} />
}
```

#### Client Component Hook Usage
- `useRouter()` from `next/navigation` (not `next/router`)
- `usePathname()`, `useSearchParams()` available in client components
- Locale-aware navigation from `@/i18n/routing`

### Component Responsibilities

#### FormBase
- Main form wrapper and orchestrator
- Manages schema creation with translations
- Handles form submission and QR generation
- Controls SVG display and error states
- Provides reset functionality

#### Field Components
- One component per QR type (e.g., `FieldsEmail`, `FieldsWifi`)
- Manage their own URL synchronization
- Use React Hook Form `register()` for field binding
- Watch their specific fields for URL sync

#### SelectQrType
- Only manages QR type selection and URL sync for type parameter
- Does not handle other fields' URL params (delegated to Fields components)

## Best Practices

### Performance
- Use `useMemo` for schema creation (depends on translation function)
- Debounce is NOT used for URL sync (direct updates on field change)
- Components key-ed by locale to force remount on language change

### Accessibility
- Use semantic HTML elements
- Label all form inputs properly
- Error messages connected to fields via aria-invalid
- Focus management in forms

### Error Handling
- Form validation errors shown inline per field
- API errors displayed in error message area
- TypeScript strict mode catches type errors at compile time

### State Management
- React Hook Form for form state
- URL searchParams as source of truth for initial form values
- Local state (`useState`) for UI state (SVG display, errors)
- No global state management needed

## Development Workflow

### Running Dev Server
```bash
pnpm dev  # Runs with Turbopack
```

### Linting
```bash
pnpm lint      # Check for issues
pnpm lint:fix  # Auto-fix issues
```

### Adding New QR Type
1. Create schema file in `utils/schemas/[type]Schema.ts`
2. Export fields, defaultValues, and createValidate function
3. Add to `baseSchema.ts` imports and unified schema
4. Create Fields component in `components/client/qr-generator/form/fields/`
5. Add URL sync logic in new Fields component
6. Add case in `getPayloadPreview.ts`
7. Add translations to `messages/*.json`
8. Add type to union in relevant places

## Common Pitfalls

❌ **Don't**:
- Use `any` types (will fail linting)
- Create schemas without translation factory pattern
- Centralize URL sync in SelectQrType (each Fields manages own params)
- Forget to await searchParams in server components
- Use `form.watch()` conditionally (React hooks rules)

✅ **Do**:
- Import from aliases (`@/` for `src/`)
- Use `cn()` for combining Tailwind classes
- Create schemas with `createSchema(t)` factory
- Handle async searchParams properly in pages
- Keep Fields components self-contained
