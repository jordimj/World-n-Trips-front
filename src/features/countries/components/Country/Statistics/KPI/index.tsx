import { Fragment, ReactNode } from 'react';
import { Stack, Typography } from '@mui/material';
import styles from './KPI.module.css';

interface Props {
  icon: ReactNode;
  label?: string;
  KPI: string;
  secondaryLabel?: string;
  secondaryKPI?: string;
  children?: ReactNode;
}

function KPI(props: Props) {
  const { icon, label, KPI, secondaryLabel, secondaryKPI, children } = props;

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      gap={1}
      className={styles.root}
      sx={{
        width: secondaryKPI ? '500px' : '215px',
      }}
    >
      <Stack alignItems="center" flex={1}>
        {icon}
      </Stack>
      {children ?? (
        <Fragment>
          <Stack alignItems="center" flex={3}>
            <Typography className={styles.label}>{label}</Typography>
            <Typography className={styles.kpi}>{KPI}</Typography>
          </Stack>
          {secondaryKPI && (
            <Stack alignItems="center" flex={2}>
              <Typography className={styles.label}>{secondaryLabel}</Typography>
              <Typography className={styles.kpi}>{secondaryKPI}</Typography>
            </Stack>
          )}
        </Fragment>
      )}
    </Stack>
  );
}

export default KPI;
