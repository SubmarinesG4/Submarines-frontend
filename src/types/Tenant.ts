interface Tenant {
	tenantKey: string
	tenantName: string
	description: string
	defaultLanguage: string
	user: string
	modifiedBy: string
	modifiedAt: Date
	createdAt: Date
}

interface TableTenant {
	defaultTranslationLanguage: string
	numberTranslationAvailable: number
	tenantName: string
}

export type { Tenant, TableTenant };
