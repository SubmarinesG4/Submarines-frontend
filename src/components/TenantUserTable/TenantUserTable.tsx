import { TenantUser } from "@/types/Tenant";
import {
	Button,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "../ConfirmDialog";
import { useSnackbarMessage } from "@/hooks/useSnackbarMessage";
import { useDeleteUserMutation } from "@/app/services/usersApiSlice";
import { useState } from "react";

type TenantUserTableProps = {
	enableActions: boolean;
	users: TenantUser[];
	onNewClick?: () => void;
	tenant: string;
};

interface Column {
	id: "userName" | "name" | "lastName" | "actions";
	label: string;
	minWidth?: number;
	align?: "left" | "center" | "right";
}

const columns: readonly Column[] = [
	{
		id: "userName",
		label: "Username",
		minWidth: 100,
		align: "left",
	},
	{
		id: "name",
		label: "Nome",
		minWidth: 100,
		align: "left",
	},
	{
		id: "lastName",
		label: "Cognome",
		minWidth: 250,
		align: "left",
	},
	{
		id: "actions",
		label: "Azioni",
		minWidth: 50,
		align: "right",
	},
];

function TenantUserTable({ tenant, enableActions, users, onNewClick }: TenantUserTableProps) {
	const [userToDelete, setUserToDelete] = useState<string>("");
	const [deleteUser] = useDeleteUserMutation();
	const setSnackbarMessage = useSnackbarMessage();

	async function handleUserDelete(username: string) {
		try {
			const result = await deleteUser({
				tenant: tenant,
				username: username,
			});
			if (!!(result as any).error) {
				throw "Error";
			}
		} catch (e) {
			setSnackbarMessage("Error deleting user");
		}
	}

	return (
		<>
			<ConfirmDialog
				open={!!userToDelete}
				setOpen={() => setUserToDelete("")}
				action={() => handleUserDelete(userToDelete)}
				title="Elimina utente?"
				description="Sicuro di voler eliminare questo utente?"
			/>
			<Paper sx={{ overflow: "hidden", margin: "20px" }}>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Typography variant="h5" sx={{ padding: "15px", flex: 1 }}>
						{"Utenti"}
					</Typography>
					{enableActions && (
						<Button variant="contained" sx={{ margin: "20px 0px", marginRight: "1em" }} onClick={onNewClick}>
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
							{users.map((user) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={user.username}>
										<TableCell key={"userName"} align={columns[0].align}>
											{user.username}
										</TableCell>
										<TableCell key={"name"} align={columns[0].align}>
											{user.name}
										</TableCell>
										<TableCell key={"lastName"} align={columns[0].align}>
											{user.lastName}
										</TableCell>
										{enableActions && (
											<TableCell key={"actions"} align={columns[3].align}>
												<Box
													sx={{
														display: "flex",
														justifyContent: "flex-end",
													}}
												>
													<IconButton sx={{ marginRight: "0.2em" }} onClick={() => setUserToDelete(user.username)}>
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

export default TenantUserTable;
