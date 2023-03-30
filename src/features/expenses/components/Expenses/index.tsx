import { debounce, Stack, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import { ExpensesFilters } from '../../interfaces';
import Autocomplete from '../../../../template/components/Autocomplete/Autocomplete';
import SearchInput from '../../../countries/components/SearchInput/SearchInput';
import DatePicker from '../../../../template/components/DatePicker/DatePicker';
import ExpensesTable from './ExpensesTable';

function Expenses() {
  const [filters, setFilters] = useState<ExpensesFilters>({ page: 1 });

  const onChangeCountry = (option: number | null) =>
    setFilters((prevFilters) => ({
      ...prevFilters,
      countries: option === null ? [] : [option],
    }));

  const onChangeTrip = (option: number | null) =>
    setFilters((prevFilters) => ({
      ...prevFilters,
      trips: option === null ? [] : [option],
    }));

  const onChangeKeyword = (e: any) => {
    e.preventDefault();
    setFilters((prevFilters) => ({
      ...prevFilters,
      query: e.target.value,
    }));
  };

  const onChangeFrom = (date: Date | null) =>
    setFilters((prevFilters) => ({
      ...prevFilters,
      from: date,
    }));

  const onChangeTo = (date: Date | null) =>
    setFilters((prevFilters) => ({
      ...prevFilters,
      to: date,
    }));

  return (
    <Fragment>
      <Typography variant="h2">Expenses</Typography>
      <Stack direction="row" gap={2} sx={{ p: 2 }}>
        <DatePicker
          label="From"
          date={filters.from ?? null}
          handleChange={onChangeFrom}
        />
        <DatePicker label="To" date={filters.to ?? null} handleChange={onChangeTo} />
        <Autocomplete.Countries onChangeOption={onChangeCountry} />
        <Autocomplete.Trips onChangeOption={onChangeTrip} />
        <SearchInput
          placeholder="Filter by keyword"
          onChange={debounce(onChangeKeyword, 300)}
        />
      </Stack>
      <ExpensesTable filters={filters} />
    </Fragment>
  );
}

export default Expenses;
