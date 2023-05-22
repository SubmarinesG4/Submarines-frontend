
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

export type { Tenant };
