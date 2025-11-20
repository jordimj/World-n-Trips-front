import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import TodayIcon from '@mui/icons-material/Today';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { Skeleton, Stack, Typography } from '@mui/material';
import useStatistics from '@/features/statistics/hooks/useStatistics';
import styles from './TravelSummary.module.css';

export default function TravelSummary() {
  const { data: statistics, isLoading } = useStatistics();

  const visited = statistics?.countries?.all.visited;
  const trips = statistics?.metrics?.trips;
  const days = statistics?.metrics?.days;

  return (
    <Stack className={styles.root}>
      <Typography className={styles.title}>Travel statistics</Typography>
      <MetricItem
        icon={<TravelExploreIcon className={styles.icon} />}
        label="Countries visited"
        value={visited}
        isLoading={isLoading}
      />
      <MetricItem
        icon={<LocalAirportIcon className={styles.icon} />}
        label="Total trips"
        value={trips}
        isLoading={isLoading}
      />
      <MetricItem
        icon={<TodayIcon className={styles.icon} />}
        label="Days traveling"
        value={days}
        isLoading={isLoading}
      />
    </Stack>
  );
}

function MetricItem(props: {
  icon: React.ReactNode;
  label: string;
  value?: number;
  isLoading: boolean;
}) {
  const { icon, label, value, isLoading = false } = props;
  return (
    <Stack className={styles.metricItem}>
      <Stack direction="row" alignItems="center" gap={3}>
        {icon}
        <Stack>
          <Typography className={styles.label}>{label}</Typography>
          {isLoading ? (
            <Skeleton width={64} height={32} />
          ) : (
            <Typography className={styles.value}>{value}</Typography>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
