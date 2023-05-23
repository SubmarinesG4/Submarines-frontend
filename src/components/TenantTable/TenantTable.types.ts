import { Tenant } from "@/types/Tenant"
import React from "react"

export type UseTenantTableOptions = {
    TenantKey: string
}

export type UseTenantTableReturn = {}

export type UseTenantTable = (options: UseTenantTableOptions) => UseTenantTableReturn

export type TenantTableProps = {
    toggleDrawer: (open: boolean) => any
    items: Tenant[]
    changeTenantName: (TenantKey: string) => any
}

export type TenantTableView = React.FC<TenantTableProps>