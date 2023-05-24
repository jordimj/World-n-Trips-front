import { useQuery } from '@tanstack/react-query';
import { getAvailableDates } from '@/api';

function useJournalAvailableDates() {
  return useQuery({
    queryKey: ['journalAvailableDates'],
    queryFn: () => getAvailableDates(),
  });
}

export default useJournalAvailableDates;
