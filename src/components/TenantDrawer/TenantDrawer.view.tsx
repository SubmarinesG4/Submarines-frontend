import Drawer from "@mui/material/Drawer";

import { TenantDrawerProps } from "./TenantDrawer.types";
import NewTenantForm from "../NewTenantForm";
import { useSnackbarMessage } from "@/hooks/useSnackbarMessage";
import EditTenantForm from "../EditTenantForm";

export default function View(props: TenantDrawerProps) {
	const setSnackbarMessage = useSnackbarMessage();

	return (
		<Drawer anchor={"top"} open={!!props.open}>
			{props.open === "new" && <NewTenantForm closeDrawer={props.closeDrawer} showError={setSnackbarMessage} />}
			{props.open && props.open !== "new" && (
				<EditTenantForm tenantName={props.open} closeDrawer={props.closeDrawer} showError={setSnackbarMessage} />
			)}
		</Drawer>
	);
}
