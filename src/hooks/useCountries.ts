import { useQuery } from '@tanstack/react-query';
import { getCountries } from '@/api';
import { Options } from '@/template/components/Autocomplete/Autocomplete';

function useCountries() {
  return useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const response = await getCountries();
      return response as Options;
    },
    refetchOnWindowFocus: false,
  });
}

export default useCountries;
