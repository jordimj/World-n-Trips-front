import useTrips from '../../../hooks/useTrips';
import Autocomplete from './Autocomplete';

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

export default AutocompleteTrips;
