import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { euroFormatter, percentageFormatter } from '../../../../utils/helpers';

const useStyles = makeStyles({
  table: {
    minWidth: 400,
    maxWidth: 700,
  },
});

export default function ExpensesTable({ sum, categories, totalNights }) {
  const arrayRows = Object.entries(categories);

  const classes = useStyles();

  return (
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center">
            <b>Category</b>
          </TableCell>
          <TableCell align="center">
            <b>Amount</b>
          </TableCell>
          <TableCell align="center">
            <b>Percentage</b>
          </TableCell>
          <TableCell align="center">
            <b>Spent / day</b>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {arrayRows.map(([category, amount]) => (
          <TableRow key={category}>
            <TableCell align="center" component="th" scope="row">
              {category}
            </TableCell>
            <TableCell align="center">{euroFormatter(amount)}</TableCell>
            <TableCell align="center">
              {percentageFormatter(amount / sum)}
            </TableCell>
            <TableCell align="center">
              {euroFormatter(amount / totalNights)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
