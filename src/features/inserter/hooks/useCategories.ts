import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function useCategories() {
  const endpoint = `http://localhost:8000/categories`;

  return useQuery(
    ['getCategories'],
    async () => {
      const response = await axios.get(endpoint);
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
}

export default useCategories;
