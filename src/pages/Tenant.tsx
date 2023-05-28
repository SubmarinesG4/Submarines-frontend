import { useGetTenantQuery } from "@/app/services/tenantsApiSlice";
import { Drawer } from "@mui/material";
import { Box } from "@mui/system";
import { Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "@/app/store";
import InviteUserForm from "@/components/InviteUserForm";
import TenantUserTable from "@/components/TenantUserTable";
import TenantDetails from "@/components/TenantDetails";

export default function Tenant() {
	let { id } = useParams();
	if (!id) return <Navigate to="/" replace />;
	return <TenantView tenantName={id} />;
}

function TenantView({ tenantName }: { tenantName: string }) {
	const user = useAppSelector((state) => state.userSlice.user);
	const [open, setOpen] = useState(false);
	const { data, isLoading } = useGetTenantQuery({ id: tenantName });

	function handleDrawer(open: boolean) {
		setOpen(open);
	}

	const isAtLeastAdmin = user!.roles.includes("admin") || user!.roles.includes("super-admin");
	if (isLoading) {
		return <div>Loading</div>;
	}
	return (
		<>
			<Drawer anchor={"top"} open={open}>
				{open && (
					<Box sx={{ padding: "15px 30px" }}>
						<InviteUserForm tenant={tenantName} closeDrawer={() => handleDrawer(false)} />
					</Box>
				)}
			</Drawer>
			<TenantDetails tenant={data} />
			<TenantUserTable
				tenant={tenantName}
				users={data?.userList}
				enableActions={isAtLeastAdmin}
				onNewClick={() => handleDrawer(true)}
			/>
		</>
	);
}
