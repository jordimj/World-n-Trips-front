import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import useTripOptions from '@/features/inserter/hooks/useTripOptions';
import Autocomplete, { Options } from './Autocomplete';

interface Props {
  value?: Options;
  onChangeOption: (optionId: number | null) => void;
  sx?: SxProps<Theme>;
}

function AutocompleteTrips(props: Props) {
  const { onChangeOption, sx } = props;
  const { data, isFetching } = useTripOptions();

  return (
    <Autocomplete
      label="Trips"
      loading={isFetching}
      options={data}
      onChangeOption={onChangeOption}
      {...(sx && { sx })}
    />
  );
}

interface MultipleProps {
  onChangeOption: (options: Options) => void;
  value?: Options;
  sx?: SxProps<Theme>;
}

function AutocompleteMultipleTrips(props: MultipleProps) {
  const { onChangeOption, value, sx } = props;
  const { data, isFetching } = useTripOptions();

  return (
    <Autocomplete.Multiple
      label="Trips"
      loading={isFetching}
      options={data}
      value={value}
      onChangeOption={onChangeOption}
      {...(sx && { sx })}
    />
  );
}

AutocompleteTrips.Multiple = AutocompleteMultipleTrips;

export default AutocompleteTrips;
