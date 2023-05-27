export type UserRole = "traduttore" | "admin" | "super-admin" | "unauthenticated";

type UserAttributes = {
	['custom:tenantId']: string
	sub: string
	given_name: string
	family_name: string
	email: string
}

export type User = {
	username: string
	roles: UserRole[]
	attributes: UserAttributes
}