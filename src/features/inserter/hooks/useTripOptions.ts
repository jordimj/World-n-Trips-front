import { useQuery } from '@tanstack/react-query';
import { getTrips } from '@/api';
import useTrips from '@/features/journals/hooks/useTrips';
import { Trips } from '@/features/journals/model/trips.schema';
import { Options } from '@/template/components/Autocomplete/Autocomplete';

export default function useTripOptions() {
  return useTrips({ select: (data) => data.map(({ id, name }) => ({ id, name })) });
}
