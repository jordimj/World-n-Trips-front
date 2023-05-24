import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/api';

function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await getCategories();
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
}

export default useCategories;
