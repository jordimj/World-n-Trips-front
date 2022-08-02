import { Box, Divider } from '@mui/material';
import NightsTable from './NightsTable';
import { getAdverbialNumber, percentageFormatter } from '../../../../utils/helpers';
import DetailRow from '../../CountryDetails/DetailRow/DetailRow';
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
    <Box sx={{ textAlign: '-webkit-center' }}>
      <Divider>Days & nights</Divider>
      <div className={styles.container}>
        <div className={styles.overview}>
          <div className={styles.partition}>
            <DetailRow label="Kilometers walked" value={kmWalked} appendix="km" />
            <DetailRow
              label="Average kilometers walked"
              value={`${(kmWalked / count.total).toFixed(2)} km / day`}
            />
          </div>
          <div className={styles.partition}>
            <DetailRow label="Total of nights" value={count.total} />
            <DetailRow
              label="Free stays"
              value={`${count.free} (${percentageFormatter(count.free / count.total)})`}
            />
            <DetailRow
              label="Paid stays"
              value={`${count.paid} (${percentageFormatter(count.paid / count.total)})`}
            />
          </div>
        </div>

        <NightsTable spots={detailedSpots} />

        {Object.keys(infoExtra).length > 0 && (
          <>
            <h4>Also slept:</h4>
            <ul className={styles.extraInfoList}>
              {Object.entries(infoExtra).map(([spot, nights]) => (
                <li key={spot}>
                  {getAdverbialNumber(nights)} in a {spot.toLowerCase()}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </Box>
  );
}
