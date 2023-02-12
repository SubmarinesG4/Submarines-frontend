
interface Translation {
	projectId: string
	translationKey: string
	languages: { language: string, content: string }[]
}

export type { Translation };
