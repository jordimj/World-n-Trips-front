import { useNavigate } from 'react-router-dom';
import { ArrowForward } from '@mui/icons-material';
import { Button, Skeleton, Stack, Typography } from '@mui/material';
import useTrips from '@/features/journals/hooks/useTrips';
import { formatTripDates } from '@/utils/date';
import styles from './LastTrip.module.css';

export default function LastTrip() {
  const navigate = useNavigate();
  const { data: trips, isLoading } = useTrips();

  const lastTrip = trips?.at(0);

  if (lastTrip === undefined || isLoading) {
    return (
      <Stack className={styles.root}>
        <Typography className={styles.label}>Last trip</Typography>
        {isLoading ? (
          <Stack gap={2} sx={{ minWidth: 250 }}>
            <Skeleton height={160} />
            <Skeleton height={32} />
          </Stack>
        ) : (
          <Stack gap={2} sx={{ minWidth: 250 }}>
            <Typography sx={{ fontSize: 14 }}>There are no trips saved.</Typography>
            <Typography sx={{ fontSize: 14 }}>Go add some!</Typography>
          </Stack>
        )}
      </Stack>
    );
  }

  return (
    <Stack className={styles.root}>
      <Typography className={styles.label}>Last trip</Typography>
      <Stack gap={3}>
        <img src={lastTrip.picture} />
        <Stack gap={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography sx={{ fontSize: 24, color: 'white' }}>{lastTrip.name}</Typography>
            <Typography sx={{ fontSize: 14, color: 'var(--primary-color-200)' }}>
              {formatTripDates(lastTrip.arrivalDate.date, lastTrip.departureDate.date)}
            </Typography>
          </Stack>
          {lastTrip.summary && (
            <Typography sx={{ fontSize: 14, color: 'var(--primary-color-200)' }}>
              {lastTrip.summary}
            </Typography>
          )}
        </Stack>
        <Button
          variant="contained"
          endIcon={<ArrowForward />}
          onClick={() => navigate(`/journals/${lastTrip.id}`)}
          sx={{ width: 'fit-content', px: 2, ml: 'auto', mt: 1 }}
        >
          View trip details
        </Button>
      </Stack>
    </Stack>
  );
}
