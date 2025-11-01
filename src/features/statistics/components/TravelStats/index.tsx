import { Fragment, useState } from 'react';
import { Stack, Typography, SelectChangeEvent } from '@mui/material';
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

  const { data: statistics } = useStatistics(year);

  if (statistics == null) return <Fragment />;

  const { metrics, countries, travels, top5 } = statistics;

  const onYearChange = (e: SelectChangeEvent) =>
    setYear(e.target.value !== 'All time' ? e.target.value : null);

  return (
    <Stack gap={5}>
      <Typography variant="h1">Travel statistics</Typography>
      <YearSelect year={year} onYearChange={onYearChange} />
      {countries && metrics && (
        <Stack direction="row" gap={3} flexWrap="wrap" sx={{ placeSelf: 'center' }}>
          <VisitedCountriesMetric visitedCountries={countries.all.visited} />
          <Stack className={styles.metricsGrid}>
            <Metric.Days metric={metrics.days} />
            <Metric.Nights metric={metrics.nights} />
            <Metric.Trips metric={metrics.trips} />
            <Metric.Walked metric={metrics.kilometersWalked} />
            <Metric.Expenses metric={metrics.expenses} />
            <Metric.Hitchhikes metric={metrics.hitchhikes} />
          </Stack>
        </Stack>
      )}
      {isAllTime && countries && <WorldExploration countries={countries} />}
      <Charts travels={travels} year={year} isAllTime={isAllTime} />
      {top5 && <Top5 top5={top5} />}
    </Stack>
  );
}
