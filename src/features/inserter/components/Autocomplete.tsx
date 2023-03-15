import CircularProgress from '@mui/material/CircularProgress';
import { TableKind } from '../types';
import { Autocomplete as MuiAutocomplete, TextField } from '@mui/material';
import useRelatedTo from '../hooks/useRelatedTo';

export default function Autocomplete({
  dataKind,
  onChangeOption,
}: {
  dataKind: TableKind;
  onChangeOption: (optionId: number | null) => void;
}) {
  const { data: options, isFetching } = useRelatedTo(dataKind);

  if (isFetching) return <CircularProgress />;

  return (
    <MuiAutocomplete
      disablePortal
      id="autocomplete-trips-and-countries"
      options={options ?? []}
      getOptionLabel={(option) => option.name}
      sx={{ width: 300, backgroundColor: 'white', borderRadius: 'var(--border-radius)' }}
      onChange={(e, value) => onChangeOption(value?.id ?? null)}
      renderInput={(params) => (
        <TextField {...params} label={dataKind === 'day' ? 'Trips' : 'Countries'} />
      )}
    />
  );
}
