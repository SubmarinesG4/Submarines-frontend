import { useState } from "react";
import NavBar from "@/components/NavBar";
import TenantDrawer from "@/components/TenantDrawer";
import TenantTable from "@/components/TenantTable";
import { Button } from "@mui/material";
import { Tenant } from "@/types/Tenant";

export default function Tenants() {
	const [drawerOpenState, setDrawerOpenState] = useState(false);
	const [tenantKey, setTenantKey] = useState<string>("");

	const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (event.type === "keydown") {
			return;
		}
		setDrawerOpenState(open);
	};

	const changeTenantKey = (tenantKey: string) => (event: any) => {
		setTenantKey(tenantKey);
		setDrawerOpenState(true);
	};

	function createData(
		tenantKey: string,
		tenantName: string,
		defaultLanguage: string,
		description: string,
		user: string,
		modifiedBy: string,
		modifiedAt: Date,
		createdAt: Date
	): Tenant {
		return { tenantKey, tenantName, defaultLanguage, description, user, modifiedBy, modifiedAt, createdAt };
	}

	function getTenants(tenantKey: string): Tenant[] {
		return [
			createData("fj489hg934", "Tenant 1", "it", "Ciao user", "User1", "admin", new Date(), new Date()),
			createData("fj489hg93", "Tenant 2", "it", "Sono io", "User3", "admin", new Date(), new Date()),
			createData("fj489hg94", "Tenant 3", "it", "Ciao", "User2", "admin", new Date(), new Date()),
			createData("fj489hg34", "Tenant 4", "it", "Ciao", "User4", "admin", new Date(), new Date()),
		];
	}

	return (
		<div>
			<NavBar />
			<TenantTable toggleDrawer={toggleDrawer} items={getTenants(tenantKey)} changeTenantName={changeTenantKey} />
			{tenantKey !== "" && (
				<TenantDrawer
					open={drawerOpenState}
					toggleDrawer={toggleDrawer}
					items={getTenants(tenantKey)}
					tenantKey={tenantKey}
				/>
			)}
		</div>
	);
}
