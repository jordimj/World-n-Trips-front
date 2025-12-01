import { Fragment, ReactNode } from 'react';
import {
  DirectionsWalk as DirectionsWalkIcon,
  Euro as EuroIcon,
  LocalAirport as LocalAirportIcon,
  Money as MoneyIcon,
  NightShelter as NightShelterIcon,
  ThumbUp as ThumbUpIcon,
  Today as TodayIcon,
} from '@mui/icons-material';
import { Stack, SxProps, Typography } from '@mui/material';
import { euroFormatter, numberFormatter } from '@/utils/number';
import styles from './Metric.module.css';

interface Props {
  icon: ReactNode;
  label?: string;
  metric: string | number;
  secondaryLabel?: string;
  secondaryMetric?: string;
  children?: ReactNode;
  sx?: SxProps;
}

function Metric(props: Props) {
  const { icon, label, metric, secondaryLabel, secondaryMetric, children, sx } = props;

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      gap={1}
      className={styles.root}
      sx={{
        width: secondaryMetric ? 'var(--spacing-14)' : 'var(--spacing-12)',
        ...sx,
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

Metric.Days = (props: { metric: number }) => {
  const { metric } = props;

  return (
    <Metric icon={<TodayIcon fontSize="inherit" />} label="Days" metric={numberFormatter(metric)} />
  );
};

Metric.Walked = (props: { metric: number }) => {
  const { metric } = props;

  return (
    <Metric
      icon={<DirectionsWalkIcon fontSize="inherit" />}
      label="Kilometers walked"
      metric={numberFormatter(metric)}
    />
  );
};

Metric.Expenses = (props: {
  metric: number;
  label?: string;
  withMoneyIcon?: boolean;
  formattedAsNumber?: boolean;
}) => {
  const {
    metric,
    label = 'Total expenses',
    withMoneyIcon = false,
    formattedAsNumber = false,
  } = props;

  return (
    <Metric
      icon={withMoneyIcon ? <MoneyIcon fontSize="inherit" /> : <EuroIcon fontSize="inherit" />}
      label={label}
      metric={formattedAsNumber ? numberFormatter(metric) : euroFormatter(metric)}
      sx={{ flexGrow: 1 }}
    />
  );
};

Metric.Hitchhikes = (props: { metric: number }) => {
  const { metric } = props;

  return (
    <Metric
      icon={<ThumbUpIcon fontSize="inherit" />}
      label="Kilometers hitchhiked"
      metric={numberFormatter(metric)}
      sx={{ flexGrow: 1 }}
    />
  );
};

Metric.Nights = (props: { metric: number }) => {
  const { metric } = props;

  return (
    <Metric
      icon={<NightShelterIcon fontSize="inherit" />}
      label="Nights away"
      metric={numberFormatter(metric)}
    />
  );
};

Metric.Trips = (props: { metric: number }) => {
  const { metric } = props;

  return <Metric icon={<LocalAirportIcon fontSize="inherit" />} label="Trips" metric={metric} />;
};

export default Metric;
