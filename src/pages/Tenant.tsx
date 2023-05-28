import { useGetTenantQuery } from "@/app/services/tenantsApiSlice";
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
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteUserMutation, useInviteUserMutation } from "@/app/services/usersApiSlice";

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

export default function Tenant() {
	let { id } = useParams();
	if (!id) return <>error</>;

	const { data, isLoading } = useGetTenantQuery({ id });
	const [deleteUser] = useDeleteUserMutation();
	const [inviteUser] = useInviteUserMutation();
	if (isLoading) {
		return <div>Loading</div>;
	}
	return (
		<>
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
					<Button
						variant="contained"
						sx={{ marginLeft: "1em" }}
						onClick={() => inviteUser({ tenant: data?.tenantName })}
					>
						Invita utente
					</Button>
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
										<TableCell key={"actions"} align={columns[3].align}>
											<Box
												sx={{
													display: "flex",
													justifyContent: "flex-end",
												}}
											>
												<IconButton
													sx={{ marginRight: "0.2em" }}
													onClick={() => deleteUser({ tenant: data?.tenantName, username: row.username })}
												>
													<DeleteIcon />
												</IconButton>
											</Box>
										</TableCell>
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
