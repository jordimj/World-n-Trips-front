import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ALL_REGIONS } from '@/constants';
import useVisitedCountries from '@/features/countries/hooks/useVisitedCountries';
import { RootState } from '@/store';
import Map from '../Map/Map';
import Sidebar from '../Sidebar';
import styles from './Home.module.css';

function Home() {
  const { data: visitedCountries } = useVisitedCountries();

  const { graduallyColored, selectedContinent, selectedRegion } = useSelector(
    (state: RootState) => state.countries.worldMapConf
  );

  const mapData = graduallyColored
    ? [
        ['Country', 'Number of spots'],
        ...(visitedCountries ?? []).map((country) => [
          country.name,
          country.numberOfSpots,
        ]),
      ]
    : [['Country'], ...(visitedCountries ?? []).map((country) => [country.name])];

  return (
    <Stack className={styles.container}>
      <Typography variant="h1">Countries I've been to</Typography>
      <Map
        data={mapData}
        region={selectedRegion === ALL_REGIONS ? selectedContinent : selectedRegion}
      />
      <Sidebar />
    </Stack>
  );
}

export default Home;
