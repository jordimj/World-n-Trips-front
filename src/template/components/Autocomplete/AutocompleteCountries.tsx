import Autocomplete, { Options } from './Autocomplete';
import useCountries from '@/hooks/useCountries';

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

interface MultipleProps {
  onChangeOption: (options: Options) => void;
}

function AutocompleteMultipleCountries(props: MultipleProps) {
  const { onChangeOption } = props;
  const { data, isFetching } = useCountries();

  return (
    <Autocomplete.Multiple
      label="Countries"
      loading={isFetching}
      options={data}
      onChangeOption={onChangeOption}
    />
  );
}

AutocompleteCountries.Multiple = AutocompleteMultipleCountries;

export default AutocompleteCountries;
