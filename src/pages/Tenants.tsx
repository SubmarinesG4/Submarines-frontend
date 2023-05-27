import { useState } from "react";
import TenantDrawer from "@/components/TenantDrawer";
import TenantTable from "@/components/TenantTable";

export default function Tenants() {
	const [drawerOpenState, setDrawerOpenState] = useState(false);

	const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (event.type === "keydown") {
			return;
		}
		setDrawerOpenState(open);
	};

	const showNew = () => (event: any) => {
		setDrawerOpenState(true);
	};

	return (
		<div>
			<TenantTable toggleDrawer={toggleDrawer} showNew={showNew} />
			<TenantDrawer open={drawerOpenState} toggleDrawer={toggleDrawer} setDrawerOpenState={setDrawerOpenState} />
		</div>
	);
}
