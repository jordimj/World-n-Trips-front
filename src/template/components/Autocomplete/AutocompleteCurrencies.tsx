import useCurrencies from '@/hooks/useCurrencies';
import { Options } from './Autocomplete';
import Autocomplete from './Autocomplete';

interface Props {
  value?: Options;
  onChangeOption: (options: Options) => void;
}

function AutocompleteCurrencies(props: Props) {
  const { value, onChangeOption } = props;
  const { data, isFetching } = useCurrencies();

  const options = data?.map((currency, idx) => ({
    id: idx,
    name: currency,
  })) as Options;

  return (
    <Autocomplete.Multiple
      label="Currencies"
      loading={isFetching}
      value={value}
      options={options}
      onChangeOption={onChangeOption}
    />
  );
}

export default AutocompleteCurrencies;
