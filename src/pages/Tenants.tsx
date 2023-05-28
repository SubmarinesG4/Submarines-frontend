import { useState } from "react";
import TenantDrawer from "@/components/TenantDrawer";
import TenantTable from "@/components/TenantTable";

export default function Tenants() {
	const [drawerOpenState, setDrawerOpenState] = useState<string>("");

	const closeDrawer = () => {
		setDrawerOpenState("");
	};

	const showNew = () => {
		setDrawerOpenState("new");
	};

	const showEdit = (tenant: string) => {
		setDrawerOpenState(tenant);
	};

	return (
		<>
			<TenantTable showEdit={showEdit} showNew={showNew} />
			<TenantDrawer open={drawerOpenState} closeDrawer={closeDrawer} />
		</>
	);
}
