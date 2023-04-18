import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styles from '../VisitedSpots/VisitedSpots.module.css';

function TabPanel({ children, active, index }) {
  return (
    <div role="tabpanel" hidden={active !== index}>
      {active === index && children}
    </div>
  );
}

const getSpots = (spots) => (
  <Box className={styles.visitedSpots}>
    {spots.map((spot) => (
      <Box key={spot} className={styles.item}>
        {spot}
      </Box>
    ))}
  </Box>
);

export default function VisitedSpots({ cities, states }) {
  const [active, setActive] = useState(0);
  const handleChange = (event, newValue) => setActive(newValue);

  return (
    <Box className={styles.visitedSpotsContainer}>
      <Tabs
        value={active}
        onChange={handleChange}
        centered
        sx={{ borderBottom: 1, borderColor: 'divider' }}
        TabIndicatorProps={{
          style: {
            backgroundColor: 'var(--navbar-color)',
          },
        }}
      >
        <Tab label="Visited cities" className={styles.tab} />
        <Tab label="Visited states" className={styles.tab} />
      </Tabs>
      <TabPanel active={active} index={0}>
        {getSpots(cities)}
      </TabPanel>
      <TabPanel active={active} index={1}>
        {getSpots(states.map((state) => state.name))}
      </TabPanel>
    </Box>
  );
}
