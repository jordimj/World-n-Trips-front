import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@/template/components/Tabs';
import Spots from './Spots';
import styles from './VisitedSpots.module.css';

export default function VisitedSpots({ cities, states }) {
  const [tab, setTab] = useState(0);
  const handleChange = (e, newValue) => setTab(newValue);

  return (
    <Box className={styles.root}>
      <Tabs value={tab} onChange={handleChange} centered>
        <Tabs.Item label="Visited cities" className={styles.tab} />
        <Tabs.Item label="Visited states" className={styles.tab} />
      </Tabs>
      <Tabs.Panel value={tab} index={0}>
        <Spots spots={cities} />
      </Tabs.Panel>
      <Tabs.Panel value={tab} index={1}>
        <Spots spots={states.map((state) => state.name)} />
      </Tabs.Panel>
    </Box>
  );
}
