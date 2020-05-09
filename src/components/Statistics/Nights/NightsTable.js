import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 400,
    maxWidth: 500
  }
});

export default function ExpensesTable(props) {
  const rows = Object.entries(props.spots);
  const classes = useStyles();

  return (
    // <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <b>Kind of spot</b>
            </TableCell>
            <TableCell align="center">
              <b>Number of nights</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(([spotKind, numberOfNights]) => (
            <TableRow key={spotKind}>
              <TableCell align="center">{spotKind}</TableCell>
              <TableCell align="center">{numberOfNights}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    // </TableContainer>
  );
}
