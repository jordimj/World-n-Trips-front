import { SyntheticEvent, useState } from 'react';
import Box from '@mui/material/Box';
import { StatesVisited } from '@/features/countries/model/country.schema';
import Tabs from '@/template/components/Tabs';
import Spots from './Spots';
import styles from './VisitedSpots.module.css';

interface Props {
  cities: Array<string>;
  states: StatesVisited;
}

export default function VisitedSpots(props: Props) {
  const { cities, states } = props;

  const [tab, setTab] = useState(0);
  const handleChange = (e: SyntheticEvent<Element, Event>, newValue: number) =>
    setTab(newValue);

  return (
    <Box className={styles.root}>
      <Tabs
        value={tab}
        onChange={handleChange}
        centered
        ariaLabel="Tabs with visisted cities & states"
      >
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
