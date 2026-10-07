import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
} from '@mui/icons-material';
import {
  Autocomplete as MuiAutocomplete,
  Checkbox,
  TextField,
  AutocompleteProps,
} from '@mui/material';
import styles from './Autocomplete.module.css';

export interface Option {
  id: number;
  name: string;
}

export interface Options extends Array<Option> {}

interface Props
  extends Pick<AutocompleteProps<Option, false, false, false>, 'renderOption' | 'sx' | 'disabled'> {
  label: string;
  valueId?: number | null;
  loading: boolean;
  options?: Options;
  onChangeOption: (optionId: number | null) => void;
}

function Autocomplete(props: Props) {
  const { label, valueId, disabled, loading, options, onChangeOption, renderOption, sx } = props;

  return (
    <MuiAutocomplete
      disablePortal
      disabled={disabled}
      {...(valueId !== undefined && {
        value: options?.find((option) => option.id === valueId) ?? null,
      })}
      isOptionEqualToValue={(option, value) => option.id === value.id}
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
      {...(renderOption !== undefined && { renderOption })}
      {...(sx && { sx })}
    />
  );
}

interface AutocompleteMultipleProps
  extends Pick<AutocompleteProps<Option, true, false, false>, 'renderOption'> {
  label: string;
  loading: boolean;
  options?: Options;
  onChangeOption: (options: Options) => void;
  value?: Options;
}

function AutocompleteMultiple(props: AutocompleteMultipleProps) {
  const { label, loading, options, onChangeOption, value, renderOption } = props;

  return (
    <MuiAutocomplete
      disablePortal
      id={`autocomplete-${label}`}
      loadingText="Fetching items"
      value={value ?? []}
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
      renderOption={
        renderOption ??
        ((props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={<CheckBoxOutlineBlankIcon />}
              checkedIcon={<CheckBoxIcon />}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.name}
          </li>
        ))
      }
      classes={{
        root: styles.root,
        paper: styles.paper,
      }}
      sx={{
        backgroundColor: 'white!important',
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--primary-color-500)!important',
        },
      }}
    />
  );
}

Autocomplete.Multiple = AutocompleteMultiple;

export default Autocomplete;
