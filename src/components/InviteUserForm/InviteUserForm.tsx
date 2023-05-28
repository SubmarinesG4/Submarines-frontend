import { useInviteUserMutation } from "@/app/services/usersApiSlice";
import { useSnackbarMessage } from "@/hooks/useSnackbarMessage";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

type InviteUserFormProps = {
	closeDrawer: () => void;
	tenant: string;
};

function InviteUserForm({ closeDrawer, tenant }: InviteUserFormProps) {
	const setSnackbarMessage = useSnackbarMessage();
	const { register, handleSubmit } = useForm({
		defaultValues: {
			role: "traduttore",
			userEmail: "",
			name: "",
			lastName: "",
		},
	});
	const [inviteUser] = useInviteUserMutation();

	const handleFormSubmit = async (data: any) => {
		try {
			const result = await inviteUser({
				tenant: tenant,
				name: data.name,
				lastName: data.lastName,
				role: data.role,
				userEmail: data.userEmail,
			});
			if (!!(result as any).error) {
				throw "Error";
			}
			closeDrawer();
		} catch (e) {
			console.log(e);
			setSnackbarMessage("error");
		}
	};

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)}>
			<Typography variant="h5" sx={{ marginBottom: "20px" }}>
				Invita nuovo utente
			</Typography>
			<TextField
				id="email"
				label="Email"
				{...register("userEmail", { required: true })}
				sx={{ width: "70%", margin: "0 15% 20px 15%" }}
			/>
			<Box sx={{ display: "flex", margin: "0 15% 20px 15%" }}>
				<TextField
					id="name"
					label="Nome"
					{...register("name", { required: true })}
					sx={{ flex: 1, marginRight: "20px" }}
				/>
				<TextField id="lastName" label="Cognome" {...register("lastName", { required: true })} sx={{ flex: 1 }} />
			</Box>
			<FormControl fullWidth sx={{ margin: "0 15% 20px 15%", width: "70%" }}>
				<InputLabel id="role-label">Ruolo</InputLabel>
				<Select labelId="role-label" id="role" label="Ruolo" {...register("role", { required: true })}>
					<MenuItem value={"traduttore"}>Traduttore</MenuItem>
					<MenuItem value={"admin"}>Admin</MenuItem>
				</Select>
			</FormControl>
			<Box display="flex" justifyContent="flex-end" alignItems="flex-end">
				<Button variant="outlined" type="button" sx={{ marginX: "0.5em" }} onClick={closeDrawer}>
					Chiudi
				</Button>
				<Button variant="contained" type="submit" sx={{ marginX: "0.5em" }}>
					Salva
				</Button>
			</Box>
		</form>
	);
}
export default InviteUserForm;
