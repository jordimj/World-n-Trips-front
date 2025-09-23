import { useQuery } from '@tanstack/react-query';
import { getTrips } from '@/api';
import { TripsSchema } from '../model/trips.schema';

export default function useTrips() {
  return useQuery({
    queryKey: ['trips'],
    queryFn: async () => {
      const data = await getTrips();
      return TripsSchema.parse(data);
    },
    refetchOnWindowFocus: false,
  });
}
