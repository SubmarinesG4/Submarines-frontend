import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { useForm } from "react-hook-form";
import { NewTranslationListProps } from "./NewTenantList.types";
import { FormGroup } from "@mui/material";

import { isFetchBaseQueryError, isErrorWithMessage } from "@/app/services/helpers";
import useNewTranslationList from "./NewTenantList.logic";
import { usePutTenantMutation } from "@/app/services/tenantsApiSlice";

export default function View(props: NewTranslationListProps) {
	const { register, handleSubmit } = useForm();
	const [putNewTenant, putStatus] = usePutTenantMutation();

	const logic = useNewTranslationList({});

	const handleFormSubmit = (data: any) => {
		props.toggleDrawer(false);
		console.log("HEY");
		putNewTenant({
			tenantName: data.tenantName,
			defaultTranslationLanguage: "it",
			listAvailableLanguages: ["en", "it"],
			numberTranslationAvailable: 20,
		})
			.unwrap()
			.then((payload) => {
				console.log(payload);
				props.setDrawerOpenState(false);
			})
			.catch((err) => {
				if (isFetchBaseQueryError(err)) {
					let errMsg = "error" in err ? err.error : JSON.stringify(err.data).substring(0, 100) + "...";
					console.log(errMsg);
					props.showError(errMsg);
				} else if (isErrorWithMessage(err)) {
					console.log(err.message);
					props.showError(err.message);
				}
			});
	};

	return (
		<Box sx={{ width: "auto", padding: "1em 1em" }} role="presentation">
			<FormGroup>
				<form onSubmit={handleSubmit(handleFormSubmit)}>
					<TextField
						id="outlined-read-only-input"
						label="Key"
						{...register("tenantName", { required: true })}
						sx={{ width: "70%", margin: "0 15% 0 15%" }}
					/>
					<Box display="flex" justifyContent="flex-end" alignItems="flex-end">
						<Button variant="outlined" type="button" sx={{ marginX: "0.5em" }} onClick={props.toggleDrawer(false)}>
							Chiudi
						</Button>
						<Button variant="contained" type="submit" sx={{ marginX: "0.5em" }}>
							Salva
						</Button>
					</Box>
				</form>
			</FormGroup>
		</Box>
	);
}
