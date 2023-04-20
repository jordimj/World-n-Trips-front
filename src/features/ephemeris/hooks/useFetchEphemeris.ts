import { useQuery } from '@tanstack/react-query';
import * as API from '@/api/api';
import { EphemerisList } from '../interfaces';

function useFetchEphemeris() {
  return useQuery({
    queryKey: ['fetch-ephemeris'],
    queryFn: async () => {
      const data = await API.getEphemeris();

      return {
        allEphemeris: data as EphemerisList,
        ephemerisCount: Number(data?.length),
      };
    },
    refetchOnWindowFocus: false,
  });
}

export default useFetchEphemeris;
