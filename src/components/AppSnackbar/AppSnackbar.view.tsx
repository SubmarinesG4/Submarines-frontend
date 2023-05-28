import { Alert, Snackbar } from "@mui/material";
import useSnackbar from "./AppSnackbar.logic";

function AppSnackbar() {
	const { message, emptyMessage } = useSnackbar();

	return (
		<Snackbar open={!!message} autoHideDuration={5000} onClose={emptyMessage}>
			<Alert onClose={emptyMessage} severity="error" sx={{ width: "100%" }}>
				{message}
			</Alert>
		</Snackbar>
	);
}

export default AppSnackbar;
