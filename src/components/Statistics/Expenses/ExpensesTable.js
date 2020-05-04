import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 300,
    maxWidth: 500
  }
});

export default function ExpensesTable(props) {
  const rows = props.expenses.categories;
  const arrayRows = Object.entries(rows);

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <b>Category</b>
            </TableCell>
            <TableCell align="center">
              <b>Amount</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arrayRows.map(([category, amount]) => (
            <TableRow key={category}>
              <TableCell align="center" component="th" scope="row">
                {category}
              </TableCell>
              <TableCell align="center">
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "EUR"
                }).format(amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
