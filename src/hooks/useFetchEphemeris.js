import { useQuery } from '@tanstack/react-query';
import * as API from '../api/api';

function useFetchEphemeris() {
  return useQuery({
    queryKey: ['fetch-ephemeris'],
    queryFn: async () => {
      const data = await API.getEphemeris();

      return {
        ephemeris: data,
        ephemerisCount: data?.length,
      };
    },
  });
}

export default useFetchEphemeris;
