import useCountries from '../../../hooks/useCountries';
import Autocomplete from './Autocomplete';

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
    />
  );
}

export default AutocompleteCountries;
