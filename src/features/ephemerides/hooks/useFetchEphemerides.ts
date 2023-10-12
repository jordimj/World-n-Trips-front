import { useQuery } from '@tanstack/react-query';
import { getEphemerides } from '@/api';
import { formatDate } from '@/utils/date';
import { Ephemerides } from '../interfaces';

function useFetchEphemerides() {
  const date = formatDate(new Date());

  return useQuery({
    queryKey: ['ephemerides', date],
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
