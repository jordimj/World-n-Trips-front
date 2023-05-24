import { useQuery } from '@tanstack/react-query';
import { getEphemeris } from '@/api';
import { EphemerisList } from '../interfaces';

function useFetchEphemeris() {
  return useQuery({
    queryKey: ['ephemeris'],
    queryFn: async () => {
      const data = await getEphemeris();

      return {
        allEphemeris: data as EphemerisList,
        ephemerisCount: Number(data?.length),
      };
    },
    refetchOnWindowFocus: false,
  });
}

export default useFetchEphemeris;
