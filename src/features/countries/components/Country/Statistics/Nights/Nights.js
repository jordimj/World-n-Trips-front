import { Fragment } from 'react';
import { Divider, Stack, Typography } from '@mui/material';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import NightShelterIcon from '@mui/icons-material/NightShelter';
import EuroIcon from '@mui/icons-material/Euro';
import NightsTable from './NightsTable';
import { getAdverbialNumber, numberFormatter } from '../../../../../../utils/number';
import KPI from '../KPI/KPI';
import NightsChart from './NightsChart';
import styles from './Nights.module.css';

export default function NightsStatistics({ nights, kmWalked }) {
  const { count, spots, infoExtra } = nights;

  const detailedSpots = Object.entries(spots).reduce(
    (acc, current) => [
      ...acc,
      {
        spotKind: current[0],
        numberOfNights: current[1],
      },
    ],
    []
  );

  return (
    <Stack alignItems="center" gap={5}>
      <Divider>Days & nights</Divider>
      <Stack direction="row" gap={3}>
        <KPI
          icon={<DirectionsWalkIcon fontSize="inherit" />}
          label="Kilometers walked"
          KPI={numberFormatter(kmWalked)}
        />
        <KPI
          icon={<DirectionsWalkIcon fontSize="inherit" />}
          label="Kilometers / day"
          KPI={numberFormatter(kmWalked / count.total)}
        />
        <KPI
          icon={<NightShelterIcon fontSize="inherit" />}
          label="Nights spent"
          KPI={count.total}
        />
      </Stack>
      <Stack direction="row" alignItems="center" gap={3} sx={{ width: '70%' }}>
        <NightsTable spots={detailedSpots} />
        <Stack>
          <KPI icon={<EuroIcon fontSize="inherit" />}>
            <NightsChart data={{ 'Free stays': count.free, 'Paid stays': count.paid }} />
          </KPI>
          {Object.keys(infoExtra).length > 0 && (
            <Fragment>
              <Typography variant="h5" sx={{ color: 'var(--primary-color)', mt: 3 }}>
                Also slept:
              </Typography>
              <ul className={styles.extraInfoList}>
                {Object.entries(infoExtra).map(([spot, nights]) => (
                  <li key={spot}>
                    {getAdverbialNumber(nights)} in a {spot.toLowerCase()}
                  </li>
                ))}
              </ul>
            </Fragment>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
