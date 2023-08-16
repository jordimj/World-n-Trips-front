import { Checkbox, Stack, Typography } from '@mui/material';
import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
} from '@mui/icons-material';
import useCountries from '@/hooks/useCountries';
import CountryFlag from '@/template/components/CountryFlag';
import Autocomplete, { Options } from './Autocomplete';

interface Props {
  onChangeOption: (optionId: number | null) => void;
}

function AutocompleteCountries(props: Props) {
  const { onChangeOption } = props;
  const { data, isFetching } = useCountries();

  return (
    <Autocomplete
      label="Countries"
      loading={isFetching}
      options={data}
      onChangeOption={onChangeOption}
      renderOption={(props, option, { selected }) => (
        <Stack component="li" direction="row" gap={1} {...props}>
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon />}
            checkedIcon={<CheckBoxIcon />}
            sx={{ m: 0 }}
            checked={selected}
          />
          <CountryFlag name={option.name} height={32} />
          <Typography sx={{ ml: 1 }}>{option.name}</Typography>
        </Stack>
      )}
    />
  );
}

interface MultipleProps {
  onChangeOption: (options: Options) => void;
  initial?: Options;
}

function AutocompleteMultipleCountries(props: MultipleProps) {
  const { onChangeOption, initial } = props;
  const { data, isFetching } = useCountries();

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
          <CountryFlag name={option.name} height={32} />
          <Typography sx={{ ml: 1 }}>{option.name}</Typography>
        </Stack>
      )}
    />
  );
}

AutocompleteCountries.Multiple = AutocompleteMultipleCountries;

export default AutocompleteCountries;
