import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

interface Column {
  id: 'key' | 'translation' | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'key', label: 'Key', minWidth: 100 },
  { id: 'translation', label: 'Traduzione\u00a0(italiano)', minWidth: 250 },
  { id: 'actions', label: 'Azioni', minWidth: 50, align: 'right' },
];

interface Data {
  key: string;
  translation: string,
  actions: React.ReactElement,
}

function createData(
  key: string,
  translation: string,
  actions: React.ReactElement,
): Data {
  return { key, translation, actions };
}

const rows = [
  createData('India', 'IN', <div><Button><Edit /></Button><Button><Delete /></Button></div>),
  createData('China', 'CN', <div><Button><Edit /></Button><Button><Delete /></Button></div>),
  createData('Italy', 'IT', <div><Button><Edit /></Button><Button><Delete /></Button></div>),
  createData('United States', 'US', <div><Button><Edit /></Button><Button><Delete /></Button></div>),
  createData('Canada', 'CA', <div><Button><Edit /></Button><Button><Delete /></Button></div>),
  createData('Australia', 'AU', <div><Button><Edit /></Button><Button><Delete /></Button></div>),
  createData('Germany', 'DE', <div><Button><Edit /></Button><Button><Delete /></Button></div>),
  createData('Ireland', 'IE', <div><Button><Edit /></Button><Button><Delete /></Button></div>),
  createData('Mexico', 'MX', <div><Button><Edit /></Button><Button><Delete /></Button></div>),
  createData('Japan', 'JP', <div><Button><Edit /></Button><Button><Delete /></Button></div>),
  createData('France', 'FR', <div><Button><Edit /></Button><Button><Delete /></Button></div>),
  createData('United Kingdom', 'GB', <div><Button><Edit /></Button><Button><Delete /></Button></div>),
  createData('Russia', 'RU', <div><Button><Edit /></Button><Button><Delete /></Button></div>),
  createData('Nigeria', 'NG', <div><Button><Edit /></Button><Button><Delete /></Button></div>),
  createData('Brazil', 'BR', <div><Button><Edit /></Button><Button><Delete /></Button></div>),
];

export default function TranslationTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.key}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          { value }
                        </TableCell>
                      );
                    })}
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