import { useParams } from 'react-router-dom';
import useTrips from '@/features/trips/hooks/useTrips';
import { getTripRange } from '@/features/trips/utils/date';

/** Read dates already loaded by the trip page without adding a request. */
export default function useCalendarDuration(recordedDays = 0, tripDays = 0) {
  const { tripId } = useParams();
  const { data: trips } = useTrips({ enabled: false });
  const trip = tripId ? trips?.find((item) => item.id === Number(tripId)) : undefined;
  const { days } = getTripRange(trip?.arrivalDate, trip?.departureDate);
  const calendarDays = days > 0 ? days : tripId && tripDays > 0 ? tripDays : 0;
  return {
    days: calendarDays > 0 ? calendarDays : recordedDays > 0 ? recordedDays : null,
    basis: calendarDays > 0 ? 'calendar' : 'recorded',
  } as const;
}
