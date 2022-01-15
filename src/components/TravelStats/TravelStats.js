import React, { useEffect } from 'react';
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

  const { countries, travels } = statistics;

  return (
    <Box textAlign="center">
      <h1>Travel statistics</h1>
      {countries && (
        <Stack direction="row" spacing={3} justifyContent="center" sx={{ pt: 3 }}>
          <Stack spacing={3} justifyContent="center" sx={{ pt: 3 }}>
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
          <TravelStatsTable stats={countries.byRegion} />
        </Stack>
      )}
      {travels && (
        <>
          <BarChart data={travels.perYear} kind="year" />
          <BarChart data={travels.perMonth} kind="month" />
        </>
      )}
    </Box>
  );
}
