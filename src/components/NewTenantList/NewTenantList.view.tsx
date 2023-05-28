import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { Controller, useForm } from "react-hook-form";
import { NewTranslationListProps } from "./NewTenantList.types";
import {
	Chip,
	FormControl,
	FormGroup,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	Stack,
	Typography,
} from "@mui/material";

import { isFetchBaseQueryError, isErrorWithMessage } from "@/app/services/helpers";
import useNewTranslationList from "./NewTenantList.logic";
import { usePutTenantMutation } from "@/app/services/tenantsApiSlice";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";

export default function View(props: NewTranslationListProps) {
	const { register, handleSubmit, control } = useForm({
		defaultValues: { languages: [], tenantName: "", numberOfTranslations: 200, defaultLanguage: "" },
	});
	const [putNewTenant, putStatus] = usePutTenantMutation();
	const [availableLang, setAvailableLang] = useState<string[]>([]);
	const logic = useNewTranslationList({});

	const handleFormSubmit = (data: any) => {
		props.toggleDrawer(false);
		putNewTenant({
			tenantName: data.tenantName,
			defaultTranslationLanguage: data.defaultLanguage,
			listAvailableLanguages: data.languages,
			numberTranslationAvailable: Number(data.numberOfTranslations),
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
	const languages = ["en", "de", "it", "es", "fr"];
	return (
		<Box sx={{ width: "auto", padding: "1em 1em" }} role="presentation">
			<FormGroup>
				<form onSubmit={handleSubmit(handleFormSubmit)}>
					<Typography variant="h5">Nuovo Tenant</Typography>
					<TextField
						id="tenantName"
						label="TenantName"
						{...register("tenantName", { required: true })}
						sx={{ width: "70%", margin: "0 15% 20px 15%" }}
					/>
					<TextField
						id="numberOfTranslations"
						label="Numero traduzioni"
						{...register("numberOfTranslations", { required: true })}
						sx={{ width: "70%", margin: "0 15% 20px 15%" }}
					/>
					<FormControl sx={{ width: "70%", margin: "0 15% 20px 15%" }}>
						<InputLabel>Languages</InputLabel>
						<Controller
							name="languages"
							control={control}
							defaultValue={[]}
							render={({ field: { onChange, value } }) => (
								<Select
									multiple
									value={value}
									onChange={(e) => {
										onChange(e);
										setAvailableLang(e.target.value as string[]);
									}}
									input={<OutlinedInput label="Multiple Select" />}
									renderValue={(selected) => (
										<Stack gap={1} direction="row" flexWrap="wrap">
											{selected.map((v) => (
												<Chip
													key={v}
													label={v}
													onDelete={() => {
														onChange(value.filter((item) => item !== v));
														setAvailableLang(value.filter((item) => item !== v));
													}}
													deleteIcon={<CancelIcon onMouseDown={(event) => event.stopPropagation()} />}
												/>
											))}
										</Stack>
									)}
								>
									{languages.map((language) => (
										<MenuItem key={language} value={language}>
											{language}
										</MenuItem>
									))}
								</Select>
							)}
						/>
					</FormControl>
					{availableLang.length > 0 && (
						<FormControl sx={{ width: "70%", margin: "0 15% 20px 15%" }}>
							<InputLabel>DefaultLanguage</InputLabel>
							<Controller
								name="defaultLanguage"
								control={control}
								defaultValue={""}
								render={({ field: { onChange, value } }) => (
									<Select
										value={availableLang.includes(value) ? value : ""}
										onChange={onChange}
										input={<OutlinedInput label="Select default language" />}
									>
										{availableLang.map((language) => (
											<MenuItem key={language} value={language}>
												{language}
											</MenuItem>
										))}
									</Select>
								)}
							/>
						</FormControl>
					)}
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
