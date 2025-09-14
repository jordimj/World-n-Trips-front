import { useQuery } from '@tanstack/react-query';
import { getStats } from '@/api';

export default function useStatistics(year: string | null) {
  return useQuery({
    queryKey: ['statistics', year],
    queryFn: async () => {
      const data = await getStats(year);
      return data;
    },
  });
}
