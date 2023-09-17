import useInserterContext from '../../hooks/useInserterContext';
import TripCard from '@/features/journals/components/TripCard';
import { Fragment } from 'react';

export default function TripConfirmation() {
  const {
    state: { trip },
  } = useInserterContext();

  if (trip === undefined) return <Fragment />;

  const parsedTrip = {
    ...trip,
    picture: trip.coverImage,
    arrivalDate: { date: trip.arrivalDate },
    departureDate: { date: trip.departureDate },
  };

  return <TripCard trip={parsedTrip} />;
}
