import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import Chip from '@/template/components/Chip/Chip';
import { formatTripDates } from '@/utils/date';
import styles from './TripCard.module.css';

function TripCard({ trip }) {
  const navigate = useNavigate();

  const hasChip = trip.telework || trip.worktrip;

  return (
    <Card className={styles.card}>
      <CardActionArea onClick={() => navigate(`/journals/${trip.id}`)}>
        <CardMedia component="img" alt={trip.name} height="250" image={trip.picture} />
        {hasChip && (
          <Chip
            className={styles.chip}
            variant={trip.telework ? 'telework' : 'worktrip'}
          />
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
