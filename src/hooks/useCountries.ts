import { useQuery } from '@tanstack/react-query';
import * as API from '@/api/api';

interface Option {
  id: number;
  name: string;
}

interface Options extends Array<Option> {}

function useCountries() {
  const endpoint = `http://localhost:8000/countries`;

  return useQuery(
    ['getCountries'],
    async () => {
      const response = await API.getCountries();
      return response as Options;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
}

export default useCountries;
