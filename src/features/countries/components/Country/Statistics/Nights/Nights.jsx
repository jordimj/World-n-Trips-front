import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import EuroIcon from '@mui/icons-material/Euro';
import { Stack, Typography } from '@mui/material';
import Divider from '@/template/components/Divider';
import Metric from '@/template/components/Metric';
import { numberFormatter } from '@/utils/number';
import AlsoSleptAt from './AlsoSleptAt';
import NightsChart from './NightsChart';
import NightsTable from './NightsTable';

export default function NightsStatistics({
  nights,
  kmWalked,
  dailyCount = nights.count.total,
  hasDayData = true,
}) {
  const { count, spots, infoExtra } = nights;

  const detailedSpots = Object.entries(spots).map(([spotKind, numberOfNights]) => ({
    spotKind,
    numberOfNights,
  }));

  return (
    <Stack alignItems="center" gap={5} sx={{ mt: 6 }}>
      <Divider>Days & nights</Divider>
      <Stack
        direction="row"
        gap={3}
        flexWrap="wrap"
        sx={{ width: '100%', justifyContent: 'center' }}
      >
        <Metric
          icon={<DirectionsWalkIcon fontSize="inherit" />}
          label="Kilometers walked"
          sx={{ width: { xs: '100%', sm: 'var(--spacing-14)' }, minWidth: 0 }}
          metric={hasDayData ? numberFormatter(kmWalked) : '—'}
          secondaryLabel="Km / day"
          secondaryMetric={
            hasDayData && dailyCount > 0 ? numberFormatter(kmWalked / dailyCount) : '—'
          }
        />
        <Metric.Nights metric={count.total} />
        {count.total > 0 && (
          <Metric icon={<EuroIcon fontSize="inherit" />}>
            <NightsChart data={{ 'Free stays': count.free, 'Paid stays': count.paid }} />
          </Metric>
        )}
      </Stack>
      {count.total === 0 ? (
        <Typography>No nights recorded for this trip.</Typography>
      ) : (
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems="center"
          gap={5}
          sx={{ width: { xs: '100%', md: '70%' } }}
        >
          <NightsTable spots={detailedSpots} />
          <AlsoSleptAt infoExtra={infoExtra} />
        </Stack>
      )}
    </Stack>
  );
}
