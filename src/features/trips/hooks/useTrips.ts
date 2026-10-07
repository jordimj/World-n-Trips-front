import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getTrips } from '@/api';
import { TripsSchema } from '../model/trips.schema';
import { Trips } from '../model/trips.schema';

type UseTripsSelect<T> = Pick<UseQueryOptions<Trips, unknown, T>, 'select'>;

export default function useTrips<T = Trips>(options?: UseTripsSelect<T>) {
  return useQuery({
    queryKey: ['trips'],
    queryFn: async () => {
      const data = await getTrips();
      return TripsSchema.parse(data);
    },
    ...options,
  });
}
