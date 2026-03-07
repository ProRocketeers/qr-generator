import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
	// Podporované jazyky
	locales: ['cs', 'en'],

	// Výchozí jazyk
	defaultLocale: 'cs',

	// Prefixovat locale v URL (např. /en/page)
	localePrefix: 'as-needed', // 'cs' nebude mít prefix, 'en' bude mít /en
})

// Export navigačních funkcí s lokalizací
export const { Link, redirect, usePathname, useRouter, getPathname } =
	createNavigation(routing)
