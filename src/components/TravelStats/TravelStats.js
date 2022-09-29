import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack, Typography } from '@mui/material';
import { percentageFormatter } from '../../utils/helpers';
import * as actions from '../../actions/actions';
import TravelStatsTable from './TravelStatsTable/TravelStatsTable';
import BarChart from './Timeline/BarChart';

export default function () {
  const statistics = useSelector((state) => state.statistics);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!statistics) dispatch(actions.fetchStatistics());
  }, []);

  if (!statistics) return <Fragment />;

  const { countries, travels, top5, trips } = statistics;

  return (
    <Box textAlign="center">
      <Typography variant="h1">Travel statistics</Typography>
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
          <BarChart data={travels.perYear} kind="year" />
          <BarChart data={travels.perMonth} kind="month" />
        </>
      )}
      {top5 && (
        <>
          <Typography variant="h2">TOP 5</Typography>
          <Stack direction="row" justifyContent="space-around">
            <TravelStatsTable
              stats={top5.longestInCountry}
              kind="country"
              title="Countries where I stayed the longest"
              shortTable
            />
            <TravelStatsTable
              stats={top5.longestInCities}
              kind="city"
              title="Cities where I stayed the longest"
              shortTable
            />
            <TravelStatsTable
              stats={top5.hitchhiked}
              kind="country"
              title="Countries where I hitchhiked the most"
              format="kilometers"
              shortTable
            />
            <TravelStatsTable
              stats={top5.mostSpent}
              kind="country"
              title="Countries where I spent the most"
              format="currency"
              shortTable
            />
            <TravelStatsTable
              stats={top5.mostExpensiveVisas}
              kind="country"
              title="Most expensive country visas"
              format="currency"
              shortTable
            />
          </Stack>
        </>
      )}
    </Box>
  );
}
