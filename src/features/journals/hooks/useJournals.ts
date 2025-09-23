import { useQuery } from '@tanstack/react-query';
import { getJournals } from '@/api';
import { JournalsSchema } from '../model/journals.schema';

export default function useJournals(tripId: string | undefined) {
  return useQuery({
    queryKey: ['journals', tripId],
    queryFn: async () => {
      if (tripId === undefined) return [];
      const data = await getJournals(Number(tripId));
      return JournalsSchema.parse(data);
    },
    enabled: !!tripId,
    refetchOnWindowFocus: false,
  });
}
