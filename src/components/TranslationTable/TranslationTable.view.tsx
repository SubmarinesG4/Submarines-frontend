import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
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
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import { Translation } from "@/types/Translation";
import { TranslationTableProps } from "./TranslationTable.types";
import { TranslationFromList } from "@/types/TranslationFromList";
import { Filter } from "@/types/Filter";
import { useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import { api } from "@/app/services/api";

interface Column {
  id: "key" | "translation" | "actions" | "date" | "published";
  label: string;
  minWidth?: number;
  align?: "left" | "center" | "right";
}

const columns: readonly Column[] = [
  { id: "key", label: "Key", minWidth: 100, align: "left" },
  {
    id: "translation",
    label: "Traduzione\u00a0(default)",
    minWidth: 250,
    align: "left",
  },
  { id: "actions", label: "Azioni", minWidth: 50, align: "right" },
];

export default function View(props: TranslationTableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { register, handleSubmit } = useForm();
  const [phraseFilter, setPhraseFilter] = React.useState<string>("");
  const [dateFilter, setDateFilter] = React.useState<Date | null>(null);
  const [publishedFilter, setPublishedFilter] = React.useState<number>(-1);

  const { data, error, isLoading } = api.useGetAllTranslationsQuery({
    tenant: "tenant3",
  });
  console.log(data);

  /* const ts1 =
    api.useGetTranslationQuery({ tenant: "tenant3", key: "test1" }).data || [];
  console.log(ts1); */

  const rows: TranslationFromList[] = props.items;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ marginY: "1em", marginX: "1em" }}
      >
        <Typography variant="h5" component="div">
          Traduzioni
        </Typography>
        <Button
          variant="contained"
          sx={{ marginLeft: "1em" }}
          onClick={props.showNew()}
        >
          Nuova Traduzione
        </Button>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
        sx={{ marginY: "1em", marginX: "1em" }}
      >
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
            onChange={(event) =>
              setPublishedFilter(event.target.value as number)
            }
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
      </Box>
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.translationKey}
                  >
                    <TableCell key={"key"} align={columns[0].align}>
                      {row.translationKey}
                    </TableCell>
                    <TableCell key={"translation"} align={columns[1].align}>
                      {row.defaultTranslationinLanguage}
                    </TableCell>
                    <TableCell key={"actions"} align={columns[2].align}>
                      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <IconButton
                          sx={{ marginRight: "0.2em" }}
                          onClick={props.showEdit(row.translationKey)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={props.showHistory(row.translationKey)}
                        >
                          <HistoryIcon />
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
