import { useState } from 'react';
import { Stack } from '@mui/material';
import { StatesVisited } from '@/features/countries/model/country.schema';
import ToggleButton from '@/template/components/ToggleButton';
import Spots from './Spots';
import styles from './VisitedSpots.module.css';

interface Props {
  cities: Array<string>;
  states: StatesVisited;
}

export default function VisitedSpots(props: Props) {
  const { cities, states } = props;

  const [active, setActive] = useState<'cities' | 'states'>('cities');

  return (
    <Stack className={styles.root} gap={4}>
      <ToggleButton
        active={active}
        options={[
          {
            id: 'cities',
            label: `Visited cities (${cities.length})`,
            onClick: () => setActive('cities'),
          },
          {
            id: 'states',
            label: `Visited states (${states.length})`,
            onClick: () => setActive('states'),
          },
        ]}
      />
      <Spots spots={active === 'cities' ? cities : states.map((state) => state.name)} />
    </Stack>
  );
}
