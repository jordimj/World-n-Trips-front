import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Option {
  id: number;
  name: string;
}

interface Options extends Array<Option> {}

function useTrips() {
  const endpoint = `http://localhost:8000/trips`;

  return useQuery(
    ['getTrips'],
    async () => {
      const response = await axios.get(endpoint);
      return response.data as Options;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
}

export default useTrips;
