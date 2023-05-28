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

interface TenantDetailed {
	defaultTranslationLanguage: string
	listAvailableLanguages: string[]
	numberTranslationAvailable: number
	numberTranslationUsed: number
	tenantName: string
	token: string
	userList: TenantUser[]
}

interface TableTenant {
	defaultTranslationLanguage: string
	numberTranslationAvailable: number
	tenantName: string
}

interface TenantUser {
	creationDate: string
	lastName: string
	name: string
	userEmail: string
	username: string
}

export type { Tenant, TableTenant, TenantUser, TenantDetailed };
