import { useQuery } from '@tanstack/react-query';
import * as API from '@/api/api';

function useCategories() {
  return useQuery(
    ['getCategories'],
    async () => {
      const response = await API.getCategories();
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
}

export default useCategories;
