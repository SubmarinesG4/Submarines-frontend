import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import { Translation } from "@/types/Translation";
import { TranslationTableProps } from "./TranslationTable.types";
import { TranslationFromList } from "@/types/TranslationFromList";
import { Filter } from "@/types/Filter";
import { useForm } from "react-hook-form";

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
  { id: "date", label: "Data creazione", minWidth: 100, align: "center" },
  { id: "published", label: "Pubblicato", minWidth: 50, align: "center" },
  { id: "actions", label: "Azioni", minWidth: 50, align: "right" },
];

export default function View(props: TranslationTableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filter, setFilter] = React.useState<Filter>({
    key: null,
    phrase: null,
    published: null,
  });
  const { register, handleSubmit } = useForm();

  const rows: TranslationFromList[] = props.items;

  if (filter.key !== null && filter.key !== "") {
    let filterKey: string = filter.key;
    rows.filter((row) => row.translationKey.includes(filterKey));
  }

  if (filter.phrase !== null && filter.phrase !== "") {
    let filterPhrase: string = filter.phrase;
    rows.filter((row) =>
      row.defaultTranslationinLanguage.includes(filterPhrase)
    );
  }

  if (filter.published !== null) {
    rows.filter((row) => row.published === filter.published);
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterSubmit = (data: any) => (event: any) => {
    setFilter({
      key: data.key,
      phrase: data.phrase,
      published: data.published,
    });
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Button
        onClick={handleFilterSubmit({
          key: null,
          phrase: null,
          published: true,
        })}
      >
        Filtro
      </Button>
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
                    <TableCell key={"date"} align={columns[2].align}>
                      {row.creationDate.toLocaleDateString()}
                    </TableCell>
                    <TableCell key={"published"} align={columns[2].align}>
                      <Chip
                        label={row.published ? "Pubblicato" : "Non pubblicato"}
                        color={row.published ? "success" : "info"}
                      />
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
