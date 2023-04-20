import { Divider, Stack } from '@mui/material';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import NightShelterIcon from '@mui/icons-material/NightShelter';
import EuroIcon from '@mui/icons-material/Euro';
import { numberFormatter } from '@/utils/number';
import NightsTable from './NightsTable';
import KPI from '../KPI/KPI';
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
      <Stack
        direction="row"
        gap={3}
        justifyContent="space-between"
        sx={{ width: '100%' }}
      >
        <KPI
          icon={<DirectionsWalkIcon fontSize="inherit" />}
          label="Kilometers walked"
          KPI={numberFormatter(kmWalked)}
          secondaryLabel="Km / day"
          secondaryKPI={numberFormatter(kmWalked / count.total)}
        />
        <KPI
          icon={<NightShelterIcon fontSize="inherit" />}
          label="Nights spent"
          KPI={count.total}
        />
        <KPI icon={<EuroIcon fontSize="inherit" />}>
          <NightsChart data={{ 'Free stays': count.free, 'Paid stays': count.paid }} />
        </KPI>
      </Stack>
      <Stack direction="row" alignItems="center" gap={5} sx={{ width: '70%' }}>
        <NightsTable spots={detailedSpots} />
        <AlsoSleptAt infoExtra={infoExtra} />
      </Stack>
    </Stack>
  );
}
