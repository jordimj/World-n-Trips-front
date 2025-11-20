import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import ToggleButton from '@/template/components/ToggleButton';
import HitchhikesChart from './HitchikesChart';

function HitchhikesCharts({ statsPerHour }) {
  const [visibleChart, setVisibleChart] = useState('rides');

  return (
    <Box
      sx={{
        backgroundColor: 'var(--background-color-light)',
        boxShadow: 'var(--box-shadow)',
        borderRadius: 'var(--border-radius)',
        p: 3,
        mt: 2,
        width: '100%',
      }}
    >
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h5">
          {visibleChart === 'rides'
            ? 'Number of cars hitchhiked per hour'
            : visibleChart === 'distance'
              ? 'Kilometers hitchhiked per hour'
              : 'Minutes waiting on the road per hour'}
        </Typography>
        <ToggleButton
          active={visibleChart}
          options={[
            { id: 'rides', label: 'Rides', onClick: () => setVisibleChart('rides') },
            { id: 'distance', label: 'Distance', onClick: () => setVisibleChart('distance') },
            { id: 'minutes', label: 'Waiting', onClick: () => setVisibleChart('minutes') },
          ]}
        />
      </Stack>
      <HitchhikesChart stats={statsPerHour} chartKind={visibleChart} />
    </Box>
  );
}

export default HitchhikesCharts;
