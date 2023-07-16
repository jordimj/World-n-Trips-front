import { Fragment, ReactNode } from 'react';
import { Stack, Typography } from '@mui/material';
import styles from './Metric.module.css';

interface Props {
  icon: ReactNode;
  label?: string;
  metric: string;
  secondaryLabel?: string;
  secondaryMetric?: string;
  children?: ReactNode;
}

function Metric(props: Props) {
  const { icon, label, metric, secondaryLabel, secondaryMetric, children } = props;

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      gap={1}
      className={styles.root}
      sx={{
        width: secondaryMetric ? '500px' : '215px',
      }}
    >
      <Stack alignItems="center" flex={1}>
        {icon}
      </Stack>
      {children ?? (
        <Fragment>
          <Stack alignItems="center" flex={3}>
            <Typography className={styles.label}>{label}</Typography>
            <Typography className={styles.metric}>{metric}</Typography>
          </Stack>
          {secondaryMetric && (
            <Stack alignItems="center" flex={2}>
              <Typography className={styles.label}>{secondaryLabel}</Typography>
              <Typography className={styles.metric}>{secondaryMetric}</Typography>
            </Stack>
          )}
        </Fragment>
      )}
    </Stack>
  );
}

export default Metric;
