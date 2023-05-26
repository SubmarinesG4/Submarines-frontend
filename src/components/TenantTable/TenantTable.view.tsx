import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Tenant } from "@/types/Tenant";
import { TenantTableProps } from "./TenantTable.types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useTenantTable } from ".";
import {
	Box,
	Button,
	Chip,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

interface Column {
	id: "name" | "description" | "user" | "actions";
	label: string;
	minWidth?: number;
	align?: "right";
}

const columns: readonly Column[] = [
	{ id: "name", label: "Nome", minWidth: 100 },
	{ id: "user", label: "Numero traduzioni", minWidth: 150 },
	{ id: "actions", label: "Visualizza", minWidth: 50, align: "right" },
];

export default function View(props: TenantTableProps) {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const { tenants } = useTenantTable();
	const rows: Tenant[] = props.items;

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{ width: "100%", overflow: "hidden" }}>
			<Box display="flex" justifyContent="flex-start" alignItems="center" sx={{ marginY: "1em", marginX: "1em" }}>
				<Typography variant="h5" component="div">
					Tenants
				</Typography>
				<Button variant="contained" sx={{ marginLeft: "1em" }} onClick={props.showNew && props.showNew()}>
					Nuovo tenant
				</Button>
			</Box>
			{/* <Box display="flex" justifyContent="flex-end" alignItems="flex-end" sx={{ marginY: "1em", marginX: "1em" }}>
				<TextField
					id="phrase-filter-field"
					label="Frase"
					sx={{ maxWidth: "200px" }}
					variant="filled"
					size="small"
					value={phraseFilter}
					onChange={(event) => setPhraseFilter(event.target.value)}
				/>
				<DatePicker
					label="Data creazione"
					sx={{ marginLeft: "1em", maxWidth: "200px" }}
					slotProps={{ textField: { variant: "filled", size: "small" } }}
					value={dateFilter}
					onChange={(newValue) => setDateFilter(newValue)}
				/>
				<FormControl sx={{ marginLeft: "1em" }}>
					<InputLabel id="language-filter-field-label">Pubblicato</InputLabel>
					<Select
						labelId="published-filter-field-label"
						id="published-filter-field"
						label="Pubblicato"
						sx={{ minWidth: "200px", maxWidth: "250px" }}
						variant="filled"
						size="small"
						value={publishedFilter}
						onChange={(event) => setPublishedFilter(event.target.value as number)}
					>
						<MenuItem value={-1}>Tutti</MenuItem>
						<MenuItem value={1}>Pubblicato</MenuItem>
						<MenuItem value={0}>Non pubblicato</MenuItem>
					</Select>
				</FormControl>
				<Button
					sx={{ marginLeft: "1em" }}
					variant="text"
					onClick={() => {
						setPhraseFilter("");
						setDateFilter(null);
						setPublishedFilter(-1);
					}}
				>
					Reset filtri
				</Button>
			</Box> */}
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
						{tenants.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
							return (
								<TableRow hover role="checkbox" tabIndex={-1} key={row.tenantName}>
									<TableCell key={"name"} align={columns[0].align}>
										{row.tenantName}
									</TableCell>
									<TableCell key={"user"} align={columns[1].align}>
										{row.numberTranslationAvailable}
									</TableCell>
									<TableCell key={"actions"} align={columns[2].align}>
										<IconButton sx={{ marginRight: "0.2em" }} onClick={props.changeTenantName(row.tenantName)}>
											<VisibilityIcon />
										</IconButton>{" "}
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
