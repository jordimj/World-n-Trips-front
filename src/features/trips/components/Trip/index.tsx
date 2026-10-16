import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material';
import ExpensesStatistics from '@/features/countries/components/Country/Statistics/Expenses/Expenses';
import NightsStatistics from '@/features/countries/components/Country/Statistics/Nights/Nights';
import Hero from '@/features/trips/components/Hero';
import Journals from '@/features/trips/components/Journals';
import useJournals from '@/features/trips/hooks/useJournals';
import useTrips from '@/features/trips/hooks/useTrips';
import useFullWidth from '@/hooks/useFullWidth';
import Divider from '@/template/components/Divider';
import Spinner from '@/template/components/Spinner/Spinner';
import useRangeStatistics from '../../hooks/useRangeStatistics';
import { getTripRange } from '../../utils/date';

export default function Trip() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { fullWidth } = useFullWidth();
  const trips = useTrips();
  const journals = useJournals(tripId);
  const trip = trips.data?.find((item) => item.id === Number(tripId));
  const { from, to, days } = getTripRange(trip?.arrivalDate, trip?.departureDate);
  const statistics = useRangeStatistics(from, to);

  if (trips.isLoading) return <Spinner />;
  if (trips.isError)
    return (
      <Stack alignItems="center" gap={2}>
        <Typography>Unable to load trip.</Typography>
        <Button onClick={() => trips.refetch()}>Retry</Button>
      </Stack>
    );
  if (!trip) return <Typography variant="h2">Trip not found.</Typography>;

  const data = statistics.data;
  return (
    <>
      <Hero trip={trip} />
      <Box
        sx={{
          width: fullWidth ? 'calc(100% - 32px)' : 'min(1600px, calc(100% - 32px))',
          mx: 'auto',
        }}
      >
        {!from || !to ? (
          <Typography sx={{ mt: 6 }}>Add travel data to show this trip’s statistics.</Typography>
        ) : statistics.isError ? (
          <Stack alignItems="center" gap={2} sx={{ mt: 6 }}>
            <Typography>Unable to load trip statistics.</Typography>
            <Button onClick={() => statistics.refetch()}>Retry</Button>
          </Stack>
        ) : statistics.isLoading ? (
          <Spinner />
        ) : data ? (
          <>
            <NightsStatistics
              nights={data.nights}
              kmWalked={data.kilometersWalked}
              dailyCount={days}
              hasDayData={data.hasDayData}
            />
            {!data.hasDayData && (
              <Typography textAlign="center">No day records for this trip.</Typography>
            )}
            {data.expenses ? (
              <ExpensesStatistics
                expenses={data.expenses}
                totalNights={days}
                onViewExpenses={() => navigate('/expenses', { state: { from, to } })}
              />
            ) : (
              <Stack alignItems="center" gap={3} sx={{ mt: 6 }}>
                <Divider>Expenses</Divider>
                <Typography>No expenses recorded for this trip.</Typography>
              </Stack>
            )}
          </>
        ) : null}
        <Journals key={tripId} query={journals} />
      </Box>
    </>
  );
}
