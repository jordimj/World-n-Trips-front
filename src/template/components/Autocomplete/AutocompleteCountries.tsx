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
}

function AutocompleteCountries(props: Props) {
  const { onChangeOption, sx } = props;
  const { data, isFetching } = useCountries();

  return (
    <Autocomplete
      label="Country"
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
  initial?: Options;
}

function AutocompleteMultipleCountries(props: MultipleProps) {
  const { onChangeOption, initial } = props;
  const { data, isFetching } = useCountries(true);

  return (
    <Autocomplete.Multiple
      label="Countries"
      loading={isFetching}
      options={data}
      onChangeOption={onChangeOption}
      initial={initial}
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
