import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { IconButton } from '@mui/material';
import { Tenant } from '@/types/Tenant';
import { TenantTableProps } from './TenantTable.types';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Column {
  id: 'name' | 'description' | 'user' | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Nome', minWidth: 100 },
  { id: 'description', label: 'Descrizione tenant', minWidth: 100 },
  { id: 'user', label: 'Utenti', minWidth: 150 },
  { id: 'actions', label: 'Visualizza', minWidth: 50, align: 'right' },
];

export default function View(props: TenantTableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const rows: Tenant[] = props.items;

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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.tenantName}>
                    <TableCell key={'name'} align={columns[0].align}>
                      { row.tenantName }
                    </TableCell>
                    <TableCell key={'description'} align={columns[1].align}>
                      { row.description }
                    </TableCell>
                    <TableCell key={'user'} align={columns[2].align}>
                      { row.user }
                    </TableCell>
                    <TableCell key={'actions'} align={columns[3].align}>
                      <IconButton sx={{ marginRight: '0.2em' }} onClick={props.changeTenantName(row.tenantName)}><VisibilityIcon /></IconButton>                    </TableCell>
                  </TableRow>
                );
              })
            }
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