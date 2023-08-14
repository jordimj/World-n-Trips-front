import { Autocomplete as MuiAutocomplete, Checkbox, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import styles from './Autocomplete.module.css';

export interface Option {
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
      classes={{
        root: styles.root,
        paper: styles.paper,
      }}
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
  initial?: Options;
}

function AutocompleteMultiple(props: AutocompleteMultipleProps) {
  const { label, loading, options, onChangeOption, initial } = props;

  return (
    <MuiAutocomplete
      disablePortal
      id={`autocomplete-${label}`}
      loadingText="Fetching items"
      value={initial ?? []}
      isOptionEqualToValue={(option, val) => option.id === val.id}
      options={options ?? []}
      loading={loading}
      getOptionLabel={(option) => option.name}
      onChange={(e, value) => onChangeOption(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          sx={{
            '& label': { color: 'var(--text-color)' },
            '& label.Mui-focused': { color: 'var(--text-color)!important' },
          }}
        />
      )}
      multiple
      limitTags={1}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon />}
            checkedIcon={<CheckBoxIcon />}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      classes={{
        root: styles.root,
        paper: styles.paper,
      }}
      sx={{
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--primary-color-500)!important',
        },
      }}
    />
  );
}

Autocomplete.Multiple = AutocompleteMultiple;

export default Autocomplete;
