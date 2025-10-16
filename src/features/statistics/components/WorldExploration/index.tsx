import { useMemo, useState } from 'react';
import { Stack, Grid } from '@mui/material';
import WorldExplorationMetric from '@/features/statistics/components/WorldExploration/WorldExplorationMetric';
import { RegionsExplored } from '@/features/statistics/types';
import ToggleButton from '@/template/components/ToggleButton';
import styles from './WorldExploration.module.css';

interface Props {
  countries: RegionsExplored;
}

export default function WorldExploration(props: Props) {
  const { countries } = props;

  const [sortedBy, setSortedBy] = useState<'name' | 'visited'>('name');
  const [groupedBy, setGroupedBy] = useState<'continent' | 'region'>('continent');

  const groupedRegions = useMemo(() => {
    if (countries === undefined) return [];

    if (sortedBy === 'name') {
      return countries[groupedBy === 'continent' ? 'byContinent' : 'byRegion'];
    }
    return countries[groupedBy === 'continent' ? 'byContinent' : 'byRegion'].toSorted((a, b) =>
      a.percentage > b.percentage ? -1 : 1
    );
  }, [countries, groupedBy, sortedBy]);

  return (
    <Stack className={styles.root} gap={2}>
      <Stack direction="row" gap={2} justifyContent="end" sx={{ mb: 2 }}>
        <ToggleButton
          active={sortedBy}
          options={[
            { id: 'name', label: 'A-Z', onClick: () => setSortedBy('name') },
            { id: 'visited', label: 'Most visited', onClick: () => setSortedBy('visited') },
          ]}
        />
        <ToggleButton
          active={groupedBy}
          options={[
            { id: 'continent', label: 'Continent', onClick: () => setGroupedBy('continent') },
            { id: 'region', label: 'Region', onClick: () => setGroupedBy('region') },
          ]}
        />
      </Stack>
      <Grid container spacing={3}>
        {groupedRegions.map((region) => (
          <Grid item xs={12} md={6} lg={groupedBy === 'continent' ? 4 : 3}>
            <WorldExplorationMetric {...region} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
