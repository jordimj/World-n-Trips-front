import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import useExpenses from '../../hooks/useExpenses';
import { useState } from 'react';
import { ExpensesFilters } from '../../interfaces';
import Autocomplete from '../../../../template/components/Autocomplete/Autocomplete';
import SearchInput from '../../../countries/components/SearchInput/SearchInput';
import { formatFullDate } from '../../../../utils/date';
import DatePicker from '../../../../template/components/DatePicker/DatePicker';
import Spinner from '../../../../template/components/Spinner/Spinner';
import styles from './index.module.css';

function Expenses() {
  const [filters, setFilters] = useState<ExpensesFilters>({ page: 1 });
  const { data, isFetching } = useExpenses(filters);

  const onChangeCountry = (option: number | null) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      countries: option === null ? [] : [option],
    }));
  };

  const onChangeTrip = (option: number | null) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      trips: option === null ? [] : [option],
    }));
  };

  // fer el debounce
  const onChangeKeyword = (e: any) => {
    e.preventDefault();
    setFilters((prevFilters) => ({
      ...prevFilters,
      query: e.target.value,
    }));
  };

  const onChangeFrom = (date: Date | null) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      from: date,
    }));
  };

  const onChangeTo = (date: Date | null) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      to: date,
    }));
  };

  const hasResults = !isFetching && data && data.length > 0;

  return (
    <Stack>
      <Typography variant="h2">Expenses</Typography>
      <Stack direction="row" gap={2} sx={{ p: 2 }}>
        <DatePicker date={filters.from ?? null} handleChange={onChangeFrom} />
        <DatePicker date={filters.to ?? null} handleChange={onChangeTo} />
        <Autocomplete.Countries onChangeOption={onChangeCountry} />
        <Autocomplete.Trips onChangeOption={onChangeTrip} />
        <SearchInput placeholder="Filter by keyword" onChange={onChangeKeyword} />
      </Stack>
      <TableContainer className={styles.paper} component={Paper}>
        <Table size="small" aria-label="table" stickyHeader>
          <TableHead className={styles.head}>
            <TableRow>
              <TableCell align="center">Day</TableCell>
              <TableCell align="center">Country</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Subcategory</TableCell>
              <TableCell align="center">Detailed info</TableCell>
              <TableCell align="center">Value</TableCell>
              <TableCell align="center">Currency</TableCell>
              <TableCell align="center">Value (EUR)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ scrollSnapType: 'y mandatory' }}>
            {isFetching ? (
              <Spinner />
            ) : hasResults ? (
              data?.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell align="center">
                    <Typography>{formatFullDate(expense.day)}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{expense.country}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{expense.category}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{expense.subcategory}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{expense.infoExtra}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{expense.value}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{expense.currency}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{expense.valueEur}</Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <Typography sx={{ px: 2, py: 1 }}>
                  No results matching these criteria
                </Typography>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default Expenses;
