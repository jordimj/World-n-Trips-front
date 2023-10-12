import { useQuery } from '@tanstack/react-query';
import { getEphemerides } from '@/api';
import { Ephemerides } from '../interfaces';

function useFetchEphemerides() {
  return useQuery({
    queryKey: ['ephemerides'],
    queryFn: async () => {
      const data = await getEphemerides();

      return {
        ephemerides: data as Ephemerides,
        ephemeridesCount: Number(data?.length),
      };
    },
    refetchOnWindowFocus: false,
  });
}

export default useFetchEphemerides;
