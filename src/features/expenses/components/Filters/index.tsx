import { Dispatch, Fragment, SetStateAction } from 'react';
import { Box, debounce, Slider, Stack } from '@mui/material';
import SearchInput from '@/features/countries/components/SearchInput/SearchInput';
import DatePicker from '@/template/components/DatePicker/DatePicker';
import { Options } from '@/template/components/Autocomplete/Autocomplete';
import AutocompleteCountries from '@/template/components/Autocomplete/AutocompleteCountries';
import AutocompleteTrips from '@/template/components/Autocomplete/AutocompleteTrips';
import AutocompleteCurrencies from '@/template/components/Autocomplete/AutocompleteCurrencies';
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

  const sliderMarks = Array.from({ length: 11 }, (_, idx) => ({
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
        <DatePicker
          label="From"
          date={filters.from ?? null}
          handleChange={onChangeFrom}
        />
        <DatePicker label="To" date={filters.to ?? null} handleChange={onChangeTo} />
        <AutocompleteCountries.Multiple
          initial={filters.countries}
          onChangeOption={onChangeCountry}
        />
        <AutocompleteTrips.Multiple onChangeOption={onChangeTrip} />
        <AutocompleteCurrencies onChangeOption={onChangeCurrency} />
      </Box>
      <Stack direction="row" gap={4} sx={{ px: 2 }}>
        <Box sx={{ px: 2, width: '100%' }}>
          <Slider
            getAriaLabel={() => 'Minimum and maximum price'}
            value={filters.price}
            min={0}
            max={1000}
            onChange={debounce(onChangePrice, 300)}
            valueLabelDisplay="auto"
            getAriaValueText={(value) => `${value} €`}
            disableSwap
            marks={sliderMarks}
          />
        </Box>
        <SearchInput
          placeholder="Filter by keyword"
          onChange={debounce(onChangeKeyword, 300)}
        />
      </Stack>
    </Stack>
  );
}

export default Filters;
