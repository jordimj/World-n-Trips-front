import { useQuery } from '@tanstack/react-query';
import * as API from '@/api/api';

interface Option {
  id: number;
  name: string;
}

interface Options extends Array<Option> {}

function useTrips() {
  return useQuery(
    ['getTrips'],
    async () => {
      const response = await API.getTrips();
      return response.data as Options;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
}

export default useTrips;
