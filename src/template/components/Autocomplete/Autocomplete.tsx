import { Autocomplete as MuiAutocomplete, TextField } from '@mui/material';
import AutocompleteCountries from './AutocompleteCountries';
import AutocompleteTrips from './AutocompleteTrips';
import AutocompleteCurrencies from './AutocompleteCurrencies';

interface Option {
  id: number;
  name: string;
}

interface Options extends Array<Option> {}

interface Props {
  label: string;
  loading: boolean;
  options?: Options;
  onChangeOption: (optionId: number | null) => void;
}

function Autocomplete(props: Props) {
  const { label, loading, options, onChangeOption } = props;

  return (
    <MuiAutocomplete
      disablePortal
      id={`autocomplete-${label}`}
      loadingText="Fetching items"
      options={options ?? []}
      loading={loading}
      getOptionLabel={(option) => option.name}
      sx={{ width: 300, backgroundColor: 'white', borderRadius: 'var(--border-radius)' }}
      onChange={(e, value) => onChangeOption(value?.id ?? null)}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}

Autocomplete.Countries = AutocompleteCountries;
Autocomplete.Trips = AutocompleteTrips;
Autocomplete.Currencies = AutocompleteCurrencies;

export default Autocomplete;
