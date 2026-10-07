import { Fragment } from 'react';
import { Box, FormControlLabel, Stack, Switch, Typography } from '@mui/material';
import useLocalStorage from '@/hooks/useLocalStorage';
import Divider from '@/template/components/Divider';
import TripCard from '@/template/components/TripCard';
import { groupBy } from '@/utils';
import useTrips from '../../hooks/useTrips';

function Trips() {
  const { data: trips = [] } = useTrips();
  const [filterTrips, setFilterTrips] = useLocalStorage<boolean>('filter_trips', false);

  const filteredTrips = filterTrips ? trips.filter((trip) => trip.hasJournals) : trips;
  const groupedTrips = groupBy(
    filteredTrips,
    (trip) => trip.departureDate?.getFullYear().toString() ?? ''
  );

  return (
    <Box textAlign="center">
      <Typography variant="h1">My trips</Typography>
      <FormControlLabel
        control={
          <Switch
            color="default"
            checked={filterTrips}
            onChange={() => setFilterTrips((prev) => !prev)}
          />
        }
        label="Show only trips with journals"
        sx={{ width: '100%', placeContent: 'end' }}
      />
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
