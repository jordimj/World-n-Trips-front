import { LinearProgress, Stack, Typography } from '@mui/material';
import { ContinentStats } from '@/features/statistics/types';
import { percentageFormatter } from '@/utils/number';
import styles from './WorldExplorationMetric.module.css';

export default function WorldExplorationMetric(props: ContinentStats) {
  const { name, visited, total, percentage } = props;

  return (
    <Stack justifyContent="center" gap={2} className={styles.root}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: '100%' }}
      >
        <Typography variant="h6">{name}</Typography>
        <Typography variant="caption" sx={{ color: 'var(--primary-color-100)' }}>
          {visited}/{total}
        </Typography>
      </Stack>
      <Stack gap={1}>
        <LinearProgress
          variant="determinate"
          value={percentage * 100}
          sx={{
            '& .MuiLinearProgress-bar': {
              transition: 'transform 0.5s ease-out',
            },
          }}
        />
        <Typography variant="caption" sx={{ color: 'var(--primary-color-100)' }}>
          {percentageFormatter(percentage)} explored
        </Typography>
      </Stack>
    </Stack>
  );
}
