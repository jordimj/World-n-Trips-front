import { useQuery } from '@tanstack/react-query';
import { getTrips } from '@/api';
import { Options } from '@/template/components/Autocomplete/Autocomplete';

function useTrips() {
  return useQuery({
    queryKey: ['trips'],
    queryFn: async () => {
      const response = await getTrips();
      return response as Options;
    },
    refetchOnWindowFocus: false,
  });
}

export default useTrips;
