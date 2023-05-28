import { useGetTenantQuery } from "@/app/services/tenantsApiSlice";
import {
	Alert,
	Button,
	Drawer,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Snackbar,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Navigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteUserMutation, useInviteUserMutation } from "@/app/services/usersApiSlice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/app/store";
import ConfirmDialog from "@/components/ConfirmDialog";

interface Column {
	id: "userName" | "name" | "lastName" | "actions";
	label: string;
	minWidth?: number;
	align?: "left" | "center" | "right";
}

const columns: readonly Column[] = [
	{ id: "userName", label: "Username", minWidth: 100, align: "left" },
	{ id: "name", label: "Nome", minWidth: 100, align: "left" },
	{
		id: "lastName",
		label: "Cognome",
		minWidth: 250,
		align: "left",
	},
	{ id: "actions", label: "Azioni", minWidth: 50, align: "right" },
];

type InviteUserFormProps = {
	closeDrawer: () => void;
	setError: (error: string | null) => void;
	tenant: string;
};

function InviteUserForm({ closeDrawer, tenant, setError }: InviteUserFormProps) {
	const { register, handleSubmit } = useForm({
		defaultValues: {
			role: "traduttore",
			userEmail: "",
			name: "",
			lastName: "",
		},
	});
	const [inviteUser, status] = useInviteUserMutation();

	useEffect(() => {
		if (!!status.error) {
			setError("error");
		}
	}, [status]);

	const handleFormSubmit = async (data: any) => {
		console.log(data);
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
			setError("error");
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

export default function Tenant() {
	let { id } = useParams();
	if (!id) return <Navigate to="/" replace />;
	const user = useAppSelector((state) => state.userSlice.user);
	const [open, setOpen] = useState(false);
	const [userToDelete, setUserToDelete] = useState<string | boolean>(false);
	const { data, isLoading } = useGetTenantQuery({ id });
	const [error, setError] = useState<string | null>(null);

	const [deleteUser] = useDeleteUserMutation();
	if (isLoading) {
		return <div>Loading</div>;
	}

	function handleDrawer(open: boolean) {
		setOpen(open);
	}

	async function handleUserDelete(username: string) {
		try {
			const result = await deleteUser({
				tenant: data?.tenantName,
				username: username,
			});
			if (!!(result as any).error) {
				throw "Error";
			}
		} catch (e) {
			setError("Error deleting user");
		}
	}

	const isAtLeastAdmin = user?.roles.includes("admin") || user?.roles.includes("super-admin");
	return (
		<>
			<Drawer anchor={"top"} open={open}>
				{open && (
					<Box sx={{ padding: "15px 30px" }}>
						<InviteUserForm tenant={id} closeDrawer={() => handleDrawer(false)} setError={setError} />
					</Box>
				)}
			</Drawer>
			<ConfirmDialog
				open={!!userToDelete}
				setOpen={setUserToDelete}
				action={() => handleUserDelete(userToDelete as string)}
				title="Elimina utente?"
				description="Sicuro di voler eliminare questo utente?"
			/>
			<Snackbar open={!!error} autoHideDuration={5000} onClose={() => setError(null)}>
				<Alert onClose={() => setError(null)} severity="error" sx={{ width: "100%" }}>
					{error}
				</Alert>
			</Snackbar>
			<Paper sx={{ overflow: "hidden", margin: "20px" }}>
				<Box sx={{ padding: "20px" }}>
					<Typography variant="h5">{data?.tenantName}</Typography>
					<Typography variant="body1">{data?.token}</Typography>
					<Typography variant="body1">{data?.defaultTranslationLanguage}</Typography>
					<div>
						{data?.listAvailableLanguages?.map((el: any) => (
							<Typography variant="body1" component={"span"} key={el}>
								{el}
							</Typography>
						))}
					</div>
					<Typography variant="body1">
						{data?.numberTranslationUsed}/{data?.numberTranslationAvailable}
					</Typography>
					<Typography variant="body1">{data?.tenantName}</Typography>
				</Box>
			</Paper>
			<Paper sx={{ overflow: "hidden", margin: "20px" }}>
				<Box sx={{ display: "flex" }}>
					<Typography variant="h5" sx={{ padding: "15px" }}>
						{"Utenti"}
					</Typography>
					{isAtLeastAdmin && (
						<Button variant="contained" sx={{ marginLeft: "1em" }} onClick={() => handleDrawer(true)}>
							Invita utente
						</Button>
					)}
				</Box>
				<TableContainer>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{data.userList.map((row: any) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={row.username}>
										<TableCell key={"userName"} align={columns[0].align}>
											{row.username}
										</TableCell>
										<TableCell key={"name"} align={columns[0].align}>
											{row.name}
										</TableCell>
										<TableCell key={"lastName"} align={columns[0].align}>
											{row.lastName}
										</TableCell>
										{isAtLeastAdmin && (
											<TableCell key={"actions"} align={columns[3].align}>
												<Box
													sx={{
														display: "flex",
														justifyContent: "flex-end",
													}}
												>
													<IconButton sx={{ marginRight: "0.2em" }} onClick={() => setUserToDelete(row.username)}>
														<DeleteIcon />
													</IconButton>
												</Box>
											</TableCell>
										)}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</>
	);
}
