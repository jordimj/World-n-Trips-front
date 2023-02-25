import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ImportData, TableData, TableKind } from '../../types';
import DataTableRow from './DataTableRow';
import styles from './DataTable.module.css';

interface DataTableProps {
  dataKind: TableKind;
  rows: ImportData;
  updateParsedData: (
    id: number,
    key: 'category' | 'subcategory' | 'extraInfo',
    value: any
  ) => void;
}

const TABLE_HEADERS = {
  day: ['Date', 'Kilometers'],
  night: ['Date', 'City', 'Slept At', 'Extra Info', 'Free'],
  spot: ['Spot', 'Spot kind', 'State', 'Shire'],
  expense: [
    'Date',
    'Category',
    'Subcategory',
    'Extra info',
    'Value',
    'Currency',
    'Value (EUR)',
  ],
};

export default function DataTable(props: DataTableProps) {
  const { dataKind, rows, updateParsedData } = props;

  return (
    <TableContainer className={styles.paper} component={Paper}>
      <Table size="small" aria-label="table" stickyHeader>
        <TableHead className={styles.head}>
          <TableRow>
            {TABLE_HEADERS[dataKind].map((header: string, idx: number) => (
              <TableCell key={idx} align="center">
                <strong>{header}</strong>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody sx={{ scrollSnapType: 'y mandatory' }}>
          {(rows as TableData).map((row) => (
            <DataTableRow
              key={row.id}
              row={row}
              dataKind={dataKind}
              updateParsedData={updateParsedData}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
