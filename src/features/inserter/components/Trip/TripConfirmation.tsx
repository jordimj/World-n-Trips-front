import { Fragment } from 'react';
import TripCard from '@/template/components/TripCard';
import useInserterContext from '../../hooks/useInserterContext';

export default function TripConfirmation() {
  const {
    state: { trip },
  } = useInserterContext();

  if (trip === undefined) return <Fragment />;

  const parsedTrip = {
    ...trip,
    picture: trip.coverImage,
  };

  return <TripCard trip={parsedTrip} />;
}
