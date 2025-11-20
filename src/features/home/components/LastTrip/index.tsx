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
      <Stack gap={2}>
        <img src={lastTrip.picture} />
        <Stack sx={{ color: 'var(--primary-color-700)' }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography sx={{ color: 'var(--primary-color-950)' }}>{lastTrip.name}</Typography>
            <Typography sx={{ fontSize: 14 }}>
              {formatTripDates(lastTrip.arrivalDate.date, lastTrip.departureDate.date)}
            </Typography>
          </Stack>
          {lastTrip.summary && <Typography sx={{ fontSize: 12 }}>{lastTrip.summary}</Typography>}
        </Stack>
        <Button
          endIcon={<ArrowForward />}
          onClick={() => navigate(`/journals/${lastTrip.id}`)}
          sx={{ fontSize: 14, width: 'fit-content', px: 1, ml: 'auto' }}
        >
          View trip details
        </Button>
      </Stack>
    </Stack>
  );
}
