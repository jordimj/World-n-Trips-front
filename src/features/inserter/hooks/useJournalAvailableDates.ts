import { useQuery } from '@tanstack/react-query';
import { getAvailableDates } from '../../../api/api';

function useJournalAvailableDates() {
  return useQuery({
    queryKey: ['journal-available-dates'],
    queryFn: () => getAvailableDates(),
  });
}

export default useJournalAvailableDates;
