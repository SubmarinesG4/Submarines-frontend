import * as React from "react";
import Drawer from "@mui/material/Drawer";

import { TenantDrawerProps } from "./TenantDrawer.types";
import { Alert, Snackbar } from "@mui/material";
import NewTenantList from "../NewTenantList";

export default function View(props: TenantDrawerProps) {
	const [errorOpen, setErrorOpen] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState("");

	const handleErrorClose = () => {
		setErrorOpen(false);
	};

	const showError = (message: string) => {
		setErrorMessage(message);
		setErrorOpen(true);
	};

	return (
		<div>
			<React.Fragment key={"top"}>
				<Drawer anchor={"top"} open={props.open}>
					{props.open && (
						<NewTenantList
							toggleDrawer={props.toggleDrawer}
							setDrawerOpenState={props.setDrawerOpenState}
							showError={showError}
						/>
					)}
				</Drawer>
			</React.Fragment>
			<Snackbar open={errorOpen} autoHideDuration={5000} onClose={handleErrorClose}>
				<Alert onClose={handleErrorClose} severity="error" sx={{ width: "100%" }}>
					{errorMessage}
				</Alert>
			</Snackbar>
		</div>
	);
}
