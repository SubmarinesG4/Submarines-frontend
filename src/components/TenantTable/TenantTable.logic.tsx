import { useGetAllTenantsQuery } from "@/app/services/tenantsApiSlice";
import { UseTenantTableOptions, UseTenantTableReturn } from "./TenantTable.types";

function useLogic(options: UseTenantTableOptions): UseTenantTableReturn {
	const { filter } = options;

	const { data, isLoading, error } = useGetAllTenantsQuery({ filter: filter.name });
	return { data: data?.tenants || [], isLoading, error };
}

export default useLogic;
