
interface Translation {
	translationKey: string
	defaultLanguage: string
	defaultLanguageContent: string
	languages: { language: string, content: string }[]
	modifiedBy: string
	modifiedAt: Date
	createdAt: Date
	published: boolean
}

export type { Translation };
