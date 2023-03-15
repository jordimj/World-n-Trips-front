import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { KindOfData } from '../types';

enum Urls {
  Day = 'trips',
  Others = 'countries',
}

interface Option {
  id: number;
  name: string;
}

interface Options extends Array<Option> {}

// Fetches the countries or trips, so the data to be inserted can be linked to
function useRelatedTo(dataKind: KindOfData) {
  const endpoint = `http://localhost:8000/${dataKind === 'day' ? Urls.Day : Urls.Others}`;

  return useQuery(
    ['getRelatedTo', dataKind],
    async () => {
      const response = await axios.get(endpoint);
      return response.data as Options;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
}

export default useRelatedTo;
