import { useState } from 'react';
import { Stack, Typography, SelectChangeEvent, CircularProgress } from '@mui/material';
import dayjs from 'dayjs';
import Charts from '@/features/statistics/components/Charts';
import WorldExploration from '@/features/statistics/components/WorldExploration';
import Metric from '@/template/components/Metric';
import useStatistics from '../../hooks/useStatistics';
import Top5 from '../Top5';
import VisitedCountriesMetric from '../VisitedCountriesMetric';
import YearSelect from '../YearSelect';
import styles from './TravelStats.module.css';

export default function TravelStats() {
  const [year, setYear] = useState<string | null>(null);
  const isAllTime = year === null;

  const { data: statistics, isLoading } = useStatistics(year);

  const hasStatistics = statistics != null && !isLoading;
  const isSameYear = year === dayjs().year().toString();

  const onYearChange = (e: SelectChangeEvent) =>
    setYear(e.target.value !== 'All time' ? e.target.value : null);

  return (
    <Stack gap={5}>
      <Typography variant="h1">Travel statistics</Typography>
      <YearSelect year={year} onYearChange={onYearChange} />
      {isLoading ? (
        <CircularProgress color="inherit" sx={{ placeSelf: 'center' }} />
      ) : hasStatistics ? (
        <>
          {statistics.countries && statistics.metrics && (
            <Stack direction="row" gap={3} flexWrap="wrap" sx={{ placeSelf: 'center' }}>
              <VisitedCountriesMetric visitedCountries={statistics.countries.all.visited} />
              <Stack className={styles.metricsGrid}>
                <Metric.Days metric={statistics.metrics.days} />
                <Metric.Nights metric={statistics.metrics.nights} />
                <Metric.Trips metric={statistics.metrics.trips} />
                <Metric.Walked metric={statistics.metrics.kilometersWalked} />
                <Metric.Expenses metric={statistics.metrics.expenses} formattedAsNumber />
                <Metric.Hitchhikes metric={statistics.metrics.hitchhikes} />
              </Stack>
            </Stack>
          )}
          {isAllTime && statistics.countries && (
            <WorldExploration countries={statistics.countries} />
          )}
          <Charts travels={statistics.travels} year={year} />
          {statistics.top5 && <Top5 top5={statistics.top5} />}
        </>
      ) : (
        <Typography variant="h3">
          {isSameYear
            ? 'No stats for this year... Go travel a bit!'
            : 'Boring year, man... You did not travel at all.'}
        </Typography>
      )}
    </Stack>
  );
}
