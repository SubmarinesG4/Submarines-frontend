import { useGetAllTenantsQuery } from "@/app/services/api";
import { UseTenantTableOptions, UseTenantTableReturn } from "./TenantTable.types";

function useLogic(options: UseTenantTableOptions): UseTenantTableReturn {
	const { data } = useGetAllTenantsQuery();
	return { tenants: data?.tenants || [] };
}

export default useLogic;
