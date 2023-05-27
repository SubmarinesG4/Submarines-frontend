import { Tenant } from "@/types/Tenant";
import { UseTenantDrawerOptions, UseTenantDrawerReturn } from "./TenantDrawer.types";

function useLogic(options: UseTenantDrawerOptions): UseTenantDrawerReturn {
	const { tenantKey, items } = options;
	const tenant: Tenant = items.filter((item) => item.tenantKey === tenantKey)[0];

	function handleSave() {
		// TODO: implement
	}

	return {
		handleSave,
		tenant,
	};
}

export default useLogic;
