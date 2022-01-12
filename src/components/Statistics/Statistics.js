import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack, Typography } from '@mui/material';
import { percentageFormatter } from '../../utils/helpers';
import * as actions from '../../actions/actions';
import StatsTable from './StatsTable';

export default function () {
  const statistics = useSelector((state) => state.statistics);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!statistics) dispatch(actions.fetchStatistics());
  }, []);

  return (
      <Box textAlign="center">
        <h1>Travel statistics</h1>
        {statistics && (
            <Stack
                direction="row"
                spacing={3}
                justifyContent="center"
                sx={{ pt: 3 }}
            >
              <Stack
                  spacing={3}
                  justifyContent="center"
                  sx={{ pt: 3 }}
              >
                <Typography fontSize={90}>
                  {statistics.countries.all.visited} / {statistics.countries.all.total}
                </Typography>
                <Typography fontSize={40}>
                  I've been to the {percentageFormatter(statistics.countries.all.percentage)}
                </Typography>
                <Typography fontSize={40} sx={{ mb: '40px' }}>of the world's countries!</Typography>
                <StatsTable stats={statistics.countries.byContinent} />
              </Stack>
              <StatsTable stats={statistics.countries.byRegion} />
            </Stack>
        )}
      </Box>
  );
}
