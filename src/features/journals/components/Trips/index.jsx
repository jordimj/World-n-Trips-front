import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider, Stack, Typography } from '@mui/material';
import useLocalStorage from '@/hooks/useLocalStorage';
import { groupBy } from '@/utils';
import * as actions from '../../actions/actions';
import TripCard from '../TripCard';

function Trips() {
  const trips = useSelector((state) => state.journals.trips);
  const [filterTrips] = useLocalStorage('filter_trips');

  const dispatch = useDispatch();

  useEffect(() => {
    if (trips.length === 0) dispatch(actions.fetchTrips());
  }, []);

  const filteredTrips = filterTrips ? trips.filter((trip) => trip.hasJournals) : trips;
  const groupedTrips = groupBy(filteredTrips, (trip) =>
    trip.departureDate.date.slice(0, 4)
  );

  return (
    <Box textAlign="center">
      <Typography variant="h1">My trips</Typography>
      {groupedTrips && (
        <Stack direction="column">
          {Object.entries(groupedTrips)
            .reverse()
            .map(([year, trips]) => (
              <Fragment key={year}>
                <Divider textAlign="left">{year}</Divider>
                <Stack direction="row" flexWrap="wrap" gap={3} sx={{ pt: 3 }}>
                  {trips.map((trip) => (
                    <TripCard key={trip.id} trip={trip} />
                  ))}
                </Stack>
              </Fragment>
            ))}
        </Stack>
      )}
    </Box>
  );
}

export default Trips;
