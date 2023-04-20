import { Options } from './Autocomplete';
import Autocomplete from './Autocomplete';
import useCurrencies from '@/hooks/useCurrencies';

interface Props {
  onChangeOption: (options: Options) => void;
}

function AutocompleteCurrencies(props: Props) {
  const { onChangeOption } = props;
  const { data, isFetching } = useCurrencies();

  const options = data?.map((currency, idx) => ({
    id: idx,
    name: currency,
  })) as Options;

  return (
    <Autocomplete.Multiple
      label="Currencies"
      loading={isFetching}
      options={options}
      onChangeOption={onChangeOption}
    />
  );
}

export default AutocompleteCurrencies;
