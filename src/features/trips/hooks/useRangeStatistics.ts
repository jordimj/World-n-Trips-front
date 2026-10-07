import { useQuery } from '@tanstack/react-query';
import { getRangeStatistics } from '@/api';
import { RangeStatisticsSchema } from '../model/statistics.schema';

export default function useRangeStatistics(from?: string, to?: string) {
  return useQuery({
    queryKey: ['range-statistics', from, to],
    enabled: !!from && !!to,
    queryFn: async () => RangeStatisticsSchema.parse(await getRangeStatistics(from!, to!)),
  });
}
