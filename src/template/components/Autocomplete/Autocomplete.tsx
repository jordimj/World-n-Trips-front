import { Autocomplete as MuiAutocomplete, Checkbox, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

interface Option {
  id: number;
  name: string;
}

export interface Options extends Array<Option> {}

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

interface AutocompleteMultipleProps {
  label: string;
  loading: boolean;
  options?: Options;
  onChangeOption: (options: Options) => void;
}

function AutocompleteMultiple(props: AutocompleteMultipleProps) {
  const { label, loading, options, onChangeOption } = props;

  return (
    <MuiAutocomplete
      disablePortal
      id={`autocomplete-${label}`}
      loadingText="Fetching items"
      options={options ?? []}
      loading={loading}
      getOptionLabel={(option) => option.name}
      sx={{
        minWidth: 300,
        backgroundColor: 'white',
        borderRadius: 'var(--border-radius)',
        flexGrow: 1,
      }}
      onChange={(e, value) => onChangeOption(value)}
      renderInput={(params) => <TextField {...params} label={label} />}
      multiple
      limitTags={3}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
    />
  );
}

Autocomplete.Multiple = AutocompleteMultiple;

export default Autocomplete;
