import { Box, Stack, Typography } from '@mui/material';
import Chip from '@/template/components/Chip/Chip';
import { formatTripDates } from '@/utils/date';
import styles from './Hero.module.css';

function Hero({ trip }) {
  const hasChip = trip.telework || trip.worktrip;

  return (
    <Box
      className={styles.image}
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${trip.picture}')`,
      }}
    >
      <Stack className={styles.text}>
        <Typography variant="h1">{trip.name}</Typography>
        {trip.summary && <Typography variant="h2">{trip.summary}</Typography>}
        <Typography variant="h3">
          {formatTripDates(trip.arrivalDate.date, trip.departureDate.date)}
        </Typography>
        {hasChip && <Chip variant={trip.telework ? 'telework' : 'worktrip'} />}
      </Stack>
    </Box>
  );
}

export default Hero;
