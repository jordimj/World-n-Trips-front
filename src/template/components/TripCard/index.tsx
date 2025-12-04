import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import Chip from '@/template/components/Chip/Chip';
import ConditionalWrapper from '@/template/components/ConditionalWrapper/ConditionalWrapper';
import { formatTripDates } from '@/utils/date';
import styles from './TripCard.module.css';

interface Trip {
  id?: number;
  name: string;
  picture?: string;
  telework?: boolean;
  worktrip?: boolean;
  arrivalDate?: Date;
  departureDate?: Date;
}

interface Props {
  trip: Trip;
}

function TripCard(props: Props) {
  const { trip } = props;

  const navigate = useNavigate();
  const hasChip = trip.telework || trip.worktrip;

  return (
    <Card className={styles.card}>
      <ConditionalWrapper
        condition={trip.id !== undefined}
        wrapper={(children) => (
          <CardActionArea onClick={() => navigate(`/journals/${trip.id}`)}>
            {children}
          </CardActionArea>
        )}
      >
        <CardMedia component="img" alt={trip.name} height="250" image={trip.picture} />
        {hasChip && (
          <Chip className={styles.chip} variant={trip.telework ? 'telework' : 'worktrip'} />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5">
            {trip.name}
          </Typography>
          {trip.arrivalDate && trip.departureDate && (
            <Typography variant="body2" color="text.secondary">
              {formatTripDates(trip.arrivalDate, trip.departureDate)}
            </Typography>
          )}
        </CardContent>
      </ConditionalWrapper>
    </Card>
  );
}

export default TripCard;
