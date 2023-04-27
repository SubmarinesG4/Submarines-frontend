import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Translation } from '@/types/Translation';
import { TranslationTableProps } from './TranslationTable.types';

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

export default function View(props: TranslationTableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const rows: Translation[] = props.items;

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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.translationKey}>
                    <TableCell key={'key'} align={columns[0].align}>
                      { row.translationKey }
                    </TableCell>
                    <TableCell key={'translation'} align={columns[1].align}>
                      { row.defaultLanguageContent }
                    </TableCell>
                    <TableCell key={'actions'} align={columns[2].align}>
                      <IconButton sx={{ marginRight: '0.2em' }} onClick={props.changeTranslationKey(row.translationKey)}><Edit /></IconButton>
                      <IconButton onClick={() => {}}><Delete /></IconButton>
                    </TableCell>
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