import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { expenseEuroFormatter, percentageFormatter } from "../../../utils/helpers";

const useStyles = makeStyles({
  table: {
    minWidth: 400,
    maxWidth: 700
  }
});

export default function ExpensesTable(props) {
  const { sumInEuros, categories } = props.expenses;
  const totalNights = props.totalNights;
  const arrayRows = Object.entries(categories);

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
              <TableCell align="center">
                {expenseEuroFormatter(amount)}
              </TableCell>
              <TableCell align="center">
                {percentageFormatter(amount/sumInEuros)}
              </TableCell>
              <TableCell align="center">
                {expenseEuroFormatter(amount/totalNights)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
