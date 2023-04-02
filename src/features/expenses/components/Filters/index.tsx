import { Dispatch, Fragment, SetStateAction } from 'react';
import { debounce, Stack } from '@mui/material';
import SearchInput from '../../../countries/components/SearchInput/SearchInput';
import DatePicker from '../../../../template/components/DatePicker/DatePicker';
import { Options } from '../../../../template/components/Autocomplete/Autocomplete';
import AutocompleteCountries from '../../../../template/components/Autocomplete/AutocompleteCountries';
import AutocompleteTrips from '../../../../template/components/Autocomplete/AutocompleteTrips';
import AutocompleteCurrencies from '../../../../template/components/Autocomplete/AutocompleteCurrencies';
import { ExpensesFilters } from '../../interfaces';

interface Props {
  filters: ExpensesFilters;
  setFilters: Dispatch<SetStateAction<ExpensesFilters>>;
}

function Filters(props: Props) {
  const { filters, setFilters } = props;

  const onChangeCountry = (options: Options) =>
    setFilters((prevFilters) => ({
      ...prevFilters,
      countries: options.map((option) => option.id),
    }));

  const onChangeTrip = (options: Options) =>
    setFilters((prevFilters) => ({
      ...prevFilters,
      trips: options.map((option) => option.id),
    }));

  const onChangeCurrency = (options: Options) =>
    setFilters((prevFilters) => ({
      ...prevFilters,
      currencies: options.map((option) => option.name),
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
      <Stack direction="row" gap={2} sx={{ p: 2 }}>
        <DatePicker
          label="From"
          date={filters.from ?? null}
          handleChange={onChangeFrom}
        />
        <DatePicker label="To" date={filters.to ?? null} handleChange={onChangeTo} />
        <SearchInput
          placeholder="Filter by keyword"
          onChange={debounce(onChangeKeyword, 300)}
        />
      </Stack>
      <Stack direction="row" gap={2} sx={{ p: 2 }}>
        <AutocompleteCountries.Multiple onChangeOption={onChangeCountry} />
        <AutocompleteTrips.Multiple onChangeOption={onChangeTrip} />
        <AutocompleteCurrencies onChangeOption={onChangeCurrency} />
      </Stack>
    </Fragment>
  );
}

export default Filters;
