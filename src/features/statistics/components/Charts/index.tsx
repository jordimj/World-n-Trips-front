import { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Travels } from '@/features/statistics/types';
import ToggleButton from '@/template/components/ToggleButton';
import BarChart from '../BarChart';
import Timeline from '../Timeline';
import styles from './Charts.module.css';

interface Props {
  travels: Travels;
  year: string | null;
}

export default function Charts(props: Props) {
  const { travels, year } = props;

  const [visibleChart, setVisibleChart] = useState<'year' | 'month' | 'timeline'>('year');
  const isAllTime = year === null;

  return (
    <Box className={styles.root}>
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h5">
          {visibleChart === 'timeline'
            ? 'Travel Timeline'
            : `Number of days traveling per ${visibleChart}`}
        </Typography>
        <ToggleButton
          active={visibleChart}
          options={[
            isAllTime
              ? { id: 'year', label: 'Year', onClick: () => setVisibleChart('year') }
              : { id: 'timeline', label: 'Timeline', onClick: () => setVisibleChart('timeline') },
            { id: 'month', label: 'Month', onClick: () => setVisibleChart('month') },
          ]}
        />
      </Stack>
      {visibleChart === 'year' ? (
        <BarChart data={travels.perYear} kind="year" />
      ) : visibleChart === 'month' ? (
        <BarChart data={travels.perMonth} kind="month" isAllTime={isAllTime} />
      ) : (
        <Timeline year={year} />
      )}
    </Box>
  );
}
