import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import * as actions from '../../actions/actions';
import { addDatesToTripCard, groupBy } from '../../utils/helpers';
import Chip from '../UI/Chip/Chip';

export default function () {
  const trips = useSelector((state) => state.trips);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (trips !== []) dispatch(actions.fetchTrips());
  }, []);

  const groupedTrips = groupBy(trips, (trip) => trip.departureDate.date.slice(0, 4));

  return (
    <Box textAlign="center">
      <Typography variant="h1">My trips</Typography>
      {groupedTrips && (
        <Stack direction="column">
          {Object.entries(groupedTrips)
            .reverse()
            .map(([year, items]) => (
              <Fragment>
                <Divider textAlign="left">{year}</Divider>
                <Stack
                  direction="row"
                  gap={3}
                  justifyContent="flex-start"
                  flexWrap="wrap"
                  sx={{ pt: 3 }}
                >
                  {items.map((trip) => (
                    <Card
                      key={trip.id}
                      sx={{
                        width: 380,
                        cursor: trip.hasJournals ? 'pointer' : 'auto',
                      }}
                      onClick={() =>
                        trip.hasJournals ? navigate(`/journals/${trip.id}`) : {}
                      }
                    >
                      <CardMedia
                        component="img"
                        alt={trip.name}
                        height="250"
                        image={trip.picture}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {trip.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {addDatesToTripCard(trip.arrivalDate, trip.departureDate)}
                        </Typography>
                        {trip.telework && <Chip variant="telework" />}
                        {trip.worktrip && <Chip variant="worktrip" />}
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              </Fragment>
            ))}
        </Stack>
      )}
    </Box>
  );
}
