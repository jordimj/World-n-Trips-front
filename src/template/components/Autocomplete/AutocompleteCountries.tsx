import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
} from '@mui/icons-material';
import { Checkbox, Stack, Typography } from '@mui/material';
import { SxProps } from '@mui/material';
import useCountries from '@/hooks/useCountries';
import CountryFlag from '@/template/components/CountryFlag';
import Autocomplete, { Options } from './Autocomplete';

interface Props {
  onChangeOption: (optionId: number | null) => void;
  sx?: SxProps;
  label?: string;
  valueId?: number | null;
  disabled?: boolean;
}

function AutocompleteCountries(props: Props) {
  const { onChangeOption, sx, label = 'Country', valueId, disabled } = props;
  const { data, isFetching } = useCountries();

  return (
    <Autocomplete
      label={label}
      valueId={valueId}
      disabled={disabled}
      loading={isFetching}
      options={data}
      onChangeOption={onChangeOption}
      renderOption={(props, option, { selected }) => (
        <Stack component="li" direction="row" gap={1} {...props}>
          <CountryFlag name={option.name} />
          <Typography sx={{ ml: 1 }}>{option.name}</Typography>
        </Stack>
      )}
      {...(sx && { sx })}
    />
  );
}

interface MultipleProps {
  onChangeOption: (options: Options) => void;
  value?: Options;
}

function AutocompleteMultipleCountries(props: MultipleProps) {
  const { onChangeOption, value } = props;
  const { data, isFetching } = useCountries(true);

  return (
    <Autocomplete.Multiple
      label="Countries"
      loading={isFetching}
      options={data}
      onChangeOption={onChangeOption}
      value={value}
      renderOption={(props, option, { selected }) => (
        <Stack component="li" direction="row" gap={1} {...props}>
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon />}
            checkedIcon={<CheckBoxIcon />}
            sx={{ m: 0 }}
            checked={selected}
          />
          <CountryFlag name={option.name} />
          <Typography sx={{ ml: 1 }}>{option.name}</Typography>
        </Stack>
      )}
    />
  );
}

AutocompleteCountries.Multiple = AutocompleteMultipleCountries;

export default AutocompleteCountries;
