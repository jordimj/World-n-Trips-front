import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import * as actions from '../../actions/actions';
import { addDatesToTripCard } from '../../utils/helpers';
import Chip from '../UI/Chip/Chip';

export default function () {
  const trips = useSelector((state) => state.trips);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (trips !== []) dispatch(actions.fetchTrips());
  }, []);

  return (
    <Box textAlign="center">
      <Typography variant="h1">My trips</Typography>
      {trips && (
        <Stack
          direction="row"
          gap={3}
          justifyContent="center"
          flexWrap={'wrap'}
          sx={{ pt: 3 }}
        >
          {trips.map((trip) => (
            <Card
              key={trip.id}
              sx={{ width: 380 }}
              onClick={() => navigate(`/journals/${trip.id}`)}
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
      )}
    </Box>
  );
}
