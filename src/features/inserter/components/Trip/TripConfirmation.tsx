import { Fragment } from 'react';
import Stack from '@mui/material/Stack';
import TripCard from '@/template/components/TripCard';
import useInserterContext from '../../hooks/useInserterContext';

export default function TripConfirmation() {
  const {
    state: { trip },
  } = useInserterContext();

  if (trip === undefined) return <Fragment />;

  const parsedTrip = {
    ...trip,
    telework: trip.work === 'telework',
    worktrip: trip.work === 'worktrip',
    picture: trip.coverImage,
  };

  return (
    <Stack gap={2} alignItems="center">
      <TripCard trip={parsedTrip} summary={trip.summary} />
    </Stack>
  );
}
