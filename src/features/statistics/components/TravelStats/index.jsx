import { Fragment, useState } from 'react';
import TodayIcon from '@mui/icons-material/Today';
import { Box, Stack, Typography } from '@mui/material';
import Metric from '@/template/components/Metric';
import Tabs from '@/template/components/Tabs';
import useStatistics from '../../hooks/useStatistics';
import BarChart from '../BarChart';
import Timeline from '../Timeline';
import Top5 from '../Top5';
import TravelStatsTable from '../TravelStatsTable';
import VisitedCountriesMetric from '../VisitedCountriesMetric';
import YearSelect from '../YearSelect';
import styles from './TravelStats.module.css';

export default function () {
  const [year, setYear] = useState(null);
  const isAllTime = year === null;

  const [tab, setTab] = useState(0);
  const handleChange = (e, newValue) => setTab(newValue);

  const { data: statistics } = useStatistics(year);

  if (!statistics) return <Fragment />;

  const { metrics, countries, travels, top5 } = statistics;
  const { days, nights, kilometersWalked, expenses, trips, hitchhikes } = metrics ?? {};

  const onYearChange = (e) =>
    setYear(e.target.value !== 'All time' ? e.target.value : null);

  console.log({ travels, top5 });

  return (
    <Stack gap={3}>
      <Typography variant="h1">Travel statistics</Typography>
      <YearSelect year={year} onYearChange={onYearChange} />
      {countries && (
        <Stack direction="row" gap={3} justifyContent="center" sx={{ pt: 3 }}>
          <VisitedCountriesMetric
            visitedCountries={countries.all.visited}
            percentage={countries.all.percentage}
          />
          <Box className={styles.metricsGrid}>
            <Metric icon={<TodayIcon fontSize="inherit" />} label="Days" metric={days} />
            <Metric.Nights metric={nights} />
            <Metric.Trips metric={trips} />
            <Metric.Walked metric={kilometersWalked} />
            <Metric.Expenses metric={expenses} />
            <Metric.Hitchhikes metric={hitchhikes} />
          </Box>
        </Stack>
      )}
      {countries && (
        <Box className={styles.root}>
          <Tabs value={tab} onChange={handleChange} centered>
            <Tabs.Item label="By continent" className={styles.tab} />
            <Tabs.Item label="By region" className={styles.tab} />
          </Tabs>
          <Tabs.Panel value={tab} index={0}>
            <TravelStatsTable stats={countries.byContinent} />
          </Tabs.Panel>
          <Tabs.Panel value={tab} index={1}>
            <TravelStatsTable stats={countries.byRegion} kind="region" />
          </Tabs.Panel>
        </Box>
      )}
      {!isAllTime && <Timeline year={year} />}
      {travels && (
        <>
          {isAllTime && <BarChart data={travels.perYear} kind="year" />}
          <BarChart data={travels.perMonth} kind="month" isAllTime={isAllTime} />
        </>
      )}
      {top5 && <Top5 top5={top5} />}
    </Stack>
  );
}
