import { useQuery } from '@tanstack/react-query';
import * as API from '@/api/api';

function useCurrencies() {
  return useQuery({
    queryKey: ['fetch-currencies'],
    queryFn: async () => {
      const data = await API.getCurrencies();

      return data as Array<string>;
    },
    refetchOnWindowFocus: false,
  });
}

export default useCurrencies;
