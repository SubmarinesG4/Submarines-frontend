import { Tenant } from "@/types/Tenant"

export type UseTenantDrawerOptions = {
	tenantKey: string
	items: Tenant[]
}

export type UseTenantDrawerReturn = {
	handleSave: () => void
	tenant: Tenant
}

export type TenantDrawerProps = {
	open: boolean;
	toggleDrawer: (open: boolean) => any;
	setDrawerOpenState: (open: boolean) => any;
}
