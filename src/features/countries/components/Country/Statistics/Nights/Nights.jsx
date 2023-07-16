import { Divider, Stack } from '@mui/material';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import NightShelterIcon from '@mui/icons-material/NightShelter';
import EuroIcon from '@mui/icons-material/Euro';
import { numberFormatter } from '@/utils/number';
import NightsTable from './NightsTable';
import Metric from '../Metric';
import NightsChart from './NightsChart';
import AlsoSleptAt from './AlsoSleptAt';

export default function NightsStatistics({ nights, kmWalked }) {
  const { count, spots, infoExtra } = nights;

  const detailedSpots = Object.entries(spots).map(([spotKind, numberOfNights]) => ({
    spotKind,
    numberOfNights,
  }));

  return (
    <Stack alignItems="center" gap={5}>
      <Divider>Days & nights</Divider>
      <Stack direction="row" gap={3} flexWrap="wrap">
        <Metric
          icon={<DirectionsWalkIcon fontSize="inherit" />}
          label="Kilometers walked"
          metric={numberFormatter(kmWalked)}
          secondaryLabel="Km / day"
          secondaryMetric={numberFormatter(kmWalked / count.total)}
        />
        <Metric
          icon={<NightShelterIcon fontSize="inherit" />}
          label="Nights spent"
          metric={count.total}
        />
        <Metric icon={<EuroIcon fontSize="inherit" />}>
          <NightsChart data={{ 'Free stays': count.free, 'Paid stays': count.paid }} />
        </Metric>
      </Stack>
      <Stack direction="row" alignItems="center" gap={5} sx={{ width: '70%', mb: 6 }}>
        <NightsTable spots={detailedSpots} />
        <AlsoSleptAt infoExtra={infoExtra} />
      </Stack>
    </Stack>
  );
}
