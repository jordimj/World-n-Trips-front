import { LinearProgress, Stack, Typography } from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { percentageFormatter } from '@/utils/number';
import styles from './VisitedCountriesMetric.module.css';

interface Props {
  visitedCountries: number;
  percentage: number;
}

function VisitedCountriesMetric(props: Props) {
  const { visitedCountries, percentage } = props;

  return (
    <Stack justifyContent="center" gap={1} className={styles.root}>
      <Stack direction="row" alignItems="center" justifyContent="center" gap={2}>
        <TravelExploreIcon className={styles.icon} />
        <Stack alignItems="center">
          <Typography className={styles.label}>Visited countries</Typography>
          <Typography className={styles.metric}>{visitedCountries}</Typography>
          <Typography className={styles.secondaryLabel}>out of 196</Typography>
        </Stack>
      </Stack>
      <Stack gap={1} className={styles.percentage}>
        <Typography className={styles.percentageLabel}>
          {percentageFormatter(percentage)} of recognized countries visited
        </Typography>
        <LinearProgress variant="determinate" value={percentage * 100} />
      </Stack>
    </Stack>
  );
}

export default VisitedCountriesMetric;
