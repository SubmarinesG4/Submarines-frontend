import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Filter } from "@/types/Filter";
import { useForm } from "react-hook-form";
import LaunchIcon from "@mui/icons-material/Launch";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import useTenantTable from "./TenantTable.logic";
import { TenantTableProps } from "./TenantTable.types";
import { useNavigate } from "react-router-dom";
import { useDeleteTenantMutation } from "@/app/services/tenantsApiSlice";
import ConfirmDialog from "../ConfirmDialog";
import { useSnackbarMessage } from "@/hooks/useSnackbarMessage";

interface Column {
  id: "key" | "defaultLanguage" | "translationNumber" | "actions";
  label: string;
  minWidth?: number;
  align?: "left" | "center" | "right";
}

const columns: readonly Column[] = [
  { id: "key", label: "Key", minWidth: 100, align: "left" },
  {
    id: "defaultLanguage",
    label: "Lingua di default",
    minWidth: 100,
    align: "left",
  },
  {
    id: "translationNumber",
    label: "Numero traduzioni",
    minWidth: 250,
    align: "left",
  },
  { id: "actions", label: "Azioni", minWidth: 50, align: "right" },
];

export default function View(props: TenantTableProps) {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { register, handleSubmit, control, reset } = useForm<Filter>();
  const [queryFilter, setQueryFilter] = React.useState({
    name: "",
  });
  const [tenantToDelete, setTenantToDelete] = React.useState<string | boolean>(
    false
  );

  const setSnackbarMessage = useSnackbarMessage();

  const { data, isLoading, error } = useTenantTable({ filter: queryFilter });
  const [deleteTenant] = useDeleteTenantMutation();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFormSubmit = (f: Filter) => {
    let filter = {
      name: f.phrase,
    };
    setQueryFilter(filter);
  };

  const handleReset = () => {
    reset({ phrase: "" });
    setQueryFilter({ name: "" });
  };

  async function handleTenantDelete(tenant: string) {
    try {
      const result = await deleteTenant({
        tenant: tenant,
      });
      if (!!(result as any).error) {
        throw "Error";
      }
    } catch (e) {
      setSnackbarMessage("Error deleting user");
    }
  }

  const handleTableRendering = () => {
    if (isLoading) {
      return <Box sx={{ margin: "1em" }}>Loading...</Box>;
    } else if (error) {
      return <Box sx={{ margin: "1em" }}>Errore nel fetch dei tenant</Box>;
    } else {
      return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <Box>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              sx={{ marginY: "1em", marginX: "1em" }}
            >
              <Typography variant="h5" component="div">
                Tenants
              </Typography>
              <Button
                variant="contained"
                sx={{ marginLeft: "1em" }}
                onClick={props.showNew}
              >
                Nuovo Tenant
              </Button>
            </Box>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
                sx={{ marginY: "1em", marginX: "1em" }}
              >
                <TextField
                  id="phrase-filter-field"
                  label="Chiave"
                  sx={{ maxWidth: "200px" }}
                  variant="filled"
                  size="small"
                  {...register("phrase")}
                />
                <Button sx={{ marginLeft: "1em" }} variant="text" type="submit">
                  Filtra
                </Button>
                <Button
                  sx={{ marginLeft: "1em" }}
                  variant="text"
                  type="button"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </Box>
            </form>
          </Box>
          {data.length > 0 && (
            <Box>
              <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.tenantName}
                          >
                            <TableCell key={"key"} align={columns[0].align}>
                              {row.tenantName}
                            </TableCell>
                            <TableCell
                              key={"defaultLanguage"}
                              align={columns[1].align}
                            >
                              {row.defaultTranslationLanguage}
                            </TableCell>
                            <TableCell
                              key={"numberTranslations"}
                              align={columns[2].align}
                            >
                              {row.numberTranslationAvailable}
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
                                  onClick={() =>
                                    navigate(`/translations/${row.tenantName}`)
                                  }
                                >
                                  <LaunchIcon />
                                </IconButton>
                                <IconButton
                                  sx={{ marginRight: "0.2em" }}
                                  onClick={() => props.showEdit(row.tenantName)}
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton
                                  sx={{ marginRight: "0.2em" }}
                                  onClick={() =>
                                    navigate(`/tenant/${row.tenantName}`)
                                  }
                                >
                                  <InfoIcon />
                                </IconButton>
                                <IconButton
                                  sx={{ marginRight: "0.2em" }}
                                  onClick={() =>
                                    setTenantToDelete(row.tenantName)
                                  }
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
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          )}
          {data.length === 0 && <Box sx={{ margin: "1em" }}>Nessun Tenant</Box>}
        </Paper>
      );
    }
  };

  return (
    <div>
      <ConfirmDialog
        title={`Elimina ${tenantToDelete}?`}
        description={"Sicuro di voler eliminare questo tenant?"}
        open={!!tenantToDelete}
        setOpen={setTenantToDelete}
        action={() => handleTenantDelete(tenantToDelete as string)}
      />
      {handleTableRendering()}
    </div>
  );
}
