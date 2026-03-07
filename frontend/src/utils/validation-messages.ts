import { getTranslations } from 'next-intl/server'

export async function getValidationMessages() {
	const t = await getTranslations('validation')
	
	return {
		urlRequired: t('urlRequired'),
		urlInvalid: t('urlInvalid'),
		textRequired: t('textRequired'),
		emailRequired: t('emailRequired'),
		emailInvalid: t('emailInvalid'),
		subjectRequired: t('subjectRequired'),
		bodyRequired: t('bodyRequired'),
	}
}
