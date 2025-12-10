import { Dispatch, Fragment, SetStateAction } from 'react';
import { Box, debounce, Slider, Stack } from '@mui/material';
import { Options } from '@/template/components/Autocomplete/Autocomplete';
import AutocompleteCountries from '@/template/components/Autocomplete/AutocompleteCountries';
import AutocompleteCurrencies from '@/template/components/Autocomplete/AutocompleteCurrencies';
import AutocompleteTrips from '@/template/components/Autocomplete/AutocompleteTrips';
import DatePicker from '@/template/components/DatePicker/DatePicker';
import SearchInput from '@/template/components/SearchInput';
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
      countries: options,
    }));

  const onChangeTrip = (trips: Options) =>
    setFilters((prevFilters) => ({
      ...prevFilters,
      trips,
    }));

  const onChangeCurrency = (currencies: Options) =>
    setFilters((prevFilters) => ({
      ...prevFilters,
      currencies,
    }));

  const onChangeKeyword = (e: any) => {
    e.preventDefault();
    setFilters((prevFilters) => ({
      ...prevFilters,
      query: e.target.value,
    }));
  };

  const onChangeFrom = (from: Date | null) =>
    setFilters((prevFilters) => ({
      ...prevFilters,
      from,
    }));

  const onChangeTo = (to: Date | null) =>
    setFilters((prevFilters) => ({
      ...prevFilters,
      to,
    }));

  const onChangePrice = (e: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) return;

    setFilters((prevFilters) => {
      const [minPrice, maxPrice] = prevFilters.price;
      const [newMin, newMax] = newValue;

      const price =
        activeThumb === 0
          ? [Math.min(newMin, maxPrice), maxPrice]
          : [minPrice, Math.max(newMax, minPrice)];

      return {
        ...prevFilters,
        price,
      };
    });
  };

  const sliderMarks = Array.from({ length: 14 }, (_, idx) => ({
    value: idx * 100,
    label: `${idx * 100} €`,
  }));

  return (
    <Stack gap={2}>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap={2}
        sx={{ px: 2 }}
      >
        <DatePicker label="From" date={filters.from ?? null} handleChange={onChangeFrom} />
        <DatePicker label="To" date={filters.to ?? null} handleChange={onChangeTo} />
        <AutocompleteCountries.Multiple
          value={filters.countries}
          onChangeOption={onChangeCountry}
        />
        <AutocompleteTrips.Multiple value={filters.trips} onChangeOption={onChangeTrip} />
        <AutocompleteCurrencies value={filters.currencies} onChangeOption={onChangeCurrency} />
      </Box>
      <Stack direction="row" gap={4} sx={{ px: 2 }}>
        <Box sx={{ px: 2, width: '100%' }}>
          <Slider
            getAriaLabel={() => 'Minimum and maximum price'}
            value={filters.price}
            min={0}
            max={1300}
            onChange={debounce(onChangePrice, 300)}
            valueLabelDisplay="auto"
            getAriaValueText={(value) => `${value} €`}
            disableSwap
            marks={sliderMarks}
          />
        </Box>
        <SearchInput placeholder="Filter by keyword" onChange={debounce(onChangeKeyword, 300)} />
      </Stack>
    </Stack>
  );
}

export default Filters;
