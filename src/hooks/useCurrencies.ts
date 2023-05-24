import { useQuery } from '@tanstack/react-query';
import { getCurrencies } from '@/api';

function useCurrencies() {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: async () => {
      const data = await getCurrencies();
      return data as Array<string>;
    },
    refetchOnWindowFocus: false,
  });
}

export default useCurrencies;
