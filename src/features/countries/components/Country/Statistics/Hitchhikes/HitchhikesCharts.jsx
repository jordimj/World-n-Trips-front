import { useState } from 'react';
import { Box } from '@mui/material';
import Tabs, { a11yProps } from '@/template/components/Tabs';
import HitchhikesChart from './HitchikesChart';

function HitchhikesCharts({ statsPerHour }) {
  const [tab, setTab] = useState(0);
  const onChange = (e, newTab) => setTab(newTab);

  return (
    <Box sx={{ width: '90%', mt: 6, mx: 'auto' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={onChange}>
          <Tabs.Item label="Number of cars hitchhiked per hour" {...a11yProps(0)} />
          <Tabs.Item label="Kilometers hitchhiked per hour" {...a11yProps(1)} />
          <Tabs.Item label="Minutes waiting on the road per hour" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <Tabs.Panel value={tab} index={0}>
        <HitchhikesChart stats={statsPerHour} chartKind="rides" />
      </Tabs.Panel>
      <Tabs.Panel value={tab} index={1}>
        <HitchhikesChart stats={statsPerHour} chartKind="distance" />
      </Tabs.Panel>
      <Tabs.Panel value={tab} index={2}>
        <HitchhikesChart stats={statsPerHour} chartKind="minutes" />
      </Tabs.Panel>
    </Box>
  );
}

export default HitchhikesCharts;
