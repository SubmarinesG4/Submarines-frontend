import { TableTenant, Tenant } from "@/types/Tenant"
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export type UseTenantTableOptions = {
	filter: { name: string };
}

export type UseTenantTableReturn = {
	data: TableTenant[]
	isLoading: boolean;
	error: FetchBaseQueryError | SerializedError | undefined;
}

export type TenantTableProps = {
	showNew: () => any;
	showEdit: (tenant: string) => any;
};
