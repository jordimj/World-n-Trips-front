import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Typography } from '@mui/material';
import { percentageFormatter } from '@/utils/number';
import * as actions from '../../actions/actions';
import TravelStatsTable from '../TravelStatsTable';
import BarChart from '../BarChart';
import Timeline from '../Timeline';
import YearSelect from '../YearSelect';
import Top5 from '../Top5';

export default function () {
  const statistics = useSelector((state) => state.statistics.statistics);
  const dispatch = useDispatch();

  const [year, setYear] = useState(null);
  const isAllTime = year === null;

  useEffect(() => {
    dispatch(actions.fetchStatistics(year));
  }, [year]);

  if (!statistics) return <Fragment />;

  const { countries, travels, top5 } = statistics;

  const onYearChange = (e) =>
    setYear(e.target.value !== 'All time' ? e.target.value : null);

  return (
    <Stack textAlign="center" gap={3}>
      <Typography variant="h1">Travel statistics</Typography>
      <YearSelect year={year} onYearChange={onYearChange} />
      {countries && (
        <Stack direction="row" spacing={3} justifyContent="center" sx={{ pt: 3 }}>
          <Stack spacing={2} justifyContent="center" sx={{ pt: 3 }}>
            <Typography fontSize={90}>
              {countries.all.visited} / {countries.all.total}
            </Typography>
            <Typography fontSize={40}>
              I've been to the {percentageFormatter(countries.all.percentage)}
            </Typography>
            <Typography fontSize={40} sx={{ mb: '40px' }}>
              of the world's countries!
            </Typography>
            <TravelStatsTable stats={countries.byContinent} />
          </Stack>
          <TravelStatsTable stats={countries.byRegion} kind="region" />
        </Stack>
      )}
      {travels && (
        <>
          {isAllTime && <BarChart data={travels.perYear} kind="year" />}
          <BarChart data={travels.perMonth} kind="month" isAllTime={isAllTime} />
        </>
      )}
      {!isAllTime && <Timeline year={year} />}
      {top5 && <Top5 top5={top5} />}
    </Stack>
  );
}
