import useTrips from '../../../hooks/useTrips';
import Autocomplete, { Options } from './Autocomplete';

interface Props {
  onChangeOption: (optionId: number | null) => void;
}

function AutocompleteTrips(props: Props) {
  const { onChangeOption } = props;
  const { data, isFetching } = useTrips();

  return (
    <Autocomplete
      label="Trips"
      loading={isFetching}
      options={data}
      onChangeOption={onChangeOption}
    />
  );
}

interface MultipleProps {
  onChangeOption: (options: Options) => void;
}

function AutocompleteMultipleTrips(props: MultipleProps) {
  const { onChangeOption } = props;
  const { data, isFetching } = useTrips();

  return (
    <Autocomplete.Multiple
      label="Trips"
      loading={isFetching}
      options={data}
      onChangeOption={onChangeOption}
    />
  );
}

AutocompleteTrips.Multiple = AutocompleteMultipleTrips;

export default AutocompleteTrips;
