import { Tenant } from "@/types/Tenant"
import React from "react"

export type UseTenantDrawerOptions = {
    tenantKey: string
    items: Tenant[]
}

export type UseTenantDrawerReturn = {
    handleSave: () => void
    tenant: Tenant
}

export type UseTenantDrawer = (options: UseTenantDrawerOptions) => UseTenantDrawerReturn

export type TenantDrawerProps = { 
    open: boolean
    toggleDrawer: (open: boolean) => any
    items: Tenant[]
    tenantKey: string
}

export type TenantDrawerView = React.FC<TenantDrawerProps>