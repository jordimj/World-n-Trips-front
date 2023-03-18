import { Fragment, ReactNode } from 'react';
import { Stack, Typography } from '@mui/material';

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
      gap={3}
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: 'var(--navbar-color)',
        color: 'white',
        borderRadius: 'var(--border-radius)',
        p: 3,
        fontSize: '75px',
        minWidth: '300px',
        flexGrow: 1,
      }}
    >
      {icon}
      {children ?? (
        <Fragment>
          <Stack alignItems="center">
            <Typography
              sx={{
                textTransform: 'uppercase',
                fontSize: '14px',
                color: 'var(--primary-color)',
              }}
            >
              {label}
            </Typography>
            <Typography sx={{ fontSize: 30, fontWeight: 700 }}>{KPI}</Typography>
          </Stack>
          {secondaryKPI && (
            <Stack>
              <Typography
                sx={{
                  textTransform: 'uppercase',
                  fontSize: '14px',
                  color: 'var(--primary-color)',
                }}
              >
                {secondaryLabel}
              </Typography>
              <Typography sx={{ fontSize: 30, fontWeight: 700 }}>
                {secondaryKPI}
              </Typography>
            </Stack>
          )}
        </Fragment>
      )}
    </Stack>
  );
}

export default KPI;