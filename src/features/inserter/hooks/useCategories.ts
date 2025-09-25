import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/api';

function useCategories(enabled: boolean) {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await getCategories();
      return response as Record<string, Array<string>>;
    },
    enabled,
    refetchOnWindowFocus: false,
  });
}

export default useCategories;
