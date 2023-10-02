import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import Chip from '@/template/components/Chip/Chip';
import { formatTripDates } from '@/utils/date';

function TripCard({ trip }) {
  const navigate = useNavigate();

  const hasChip = trip.telework || trip.worktrip;

  return (
    <Card
      sx={{
        position: 'relative',
        width: 380,
        border: '1px solid var(--primary-color-100)',
        '&:hover': {
          boxShadow: 'var(--card-box-shadow)',
          border: '1px solid var(--primary-color-700)',
        },
      }}
    >
      <CardActionArea onClick={() => navigate(`/journals/${trip.id}`)}>
        <CardMedia component="img" alt={trip.name} height="250" image={trip.picture} />
        {hasChip && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 'var(--spacing-4)',
            }}
          >
            <Chip variant={trip.telework ? 'telework' : 'worktrip'} />
          </Box>
        )}
        <CardContent>
          <Typography gutterBottom variant="h5">
            {trip.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatTripDates(trip.arrivalDate.date, trip.departureDate.date)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default TripCard;
