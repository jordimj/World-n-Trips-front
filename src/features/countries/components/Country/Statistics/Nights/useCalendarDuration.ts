import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Trips } from '@/features/trips/model/trips.schema';
import { getTripRange } from '@/features/trips/utils/date';

/** Read dates already loaded by the trip page without adding a request. */
export default function useCalendarDuration(recordedDays = 0, tripDays = 0) {
  const { tripId } = useParams();
  const { data: trips } = useQuery<Trips>({ queryKey: ['trips'], enabled: false });
  const trip = tripId ? trips?.find((item) => item.id === Number(tripId)) : undefined;
  const { days } = getTripRange(trip?.arrivalDate, trip?.departureDate);
  const calendarDays = days > 0 ? days : tripId && tripDays > 0 ? tripDays : 0;
  return {
    days: calendarDays > 0 ? calendarDays : recordedDays > 0 ? recordedDays : null,
    basis: calendarDays > 0 ? 'calendar' : 'recorded',
  } as const;
}
