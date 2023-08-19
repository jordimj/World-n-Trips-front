import { useQuery } from '@tanstack/react-query';
import { getCountries } from '@/api';
import { Options } from '@/template/components/Autocomplete/Autocomplete';

function useCountries(onlyVisited: boolean = false) {
  return useQuery({
    queryKey: ['countries', onlyVisited],
    queryFn: async () => {
      const response = await getCountries(onlyVisited);
      return response as Options;
    },
    refetchOnWindowFocus: false,
  });
}

export default useCountries;
