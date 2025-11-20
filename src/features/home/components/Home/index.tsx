import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ALL_REGIONS } from '@/constants';
import useVisitedCountries from '@/features/countries/hooks/useVisitedCountries';
import LastTrip from '@/features/home/components/LastTrip';
import TravelSummary from '@/features/home/components/TravelSummary';
import { useGeolocation } from '@/features/home/hooks/useGeolocation';
import { RootState } from '@/store';
import Map from '../../../countries/components/Map/Map';
import styles from './Home.module.css';

function Home() {
  const { data: visitedCountries } = useVisitedCountries();

  const { graduallyColored, selectedContinent, selectedRegion } = useSelector(
    (state: RootState) => state.home.worldMapConf
  );

  const mapData = graduallyColored
    ? [
        ['Country', 'Number of spots'],
        ...(visitedCountries ?? []).map((country) => [country.name, country.numberOfSpots]),
      ]
    : [['Country'], ...(visitedCountries ?? []).map((country) => [country.name])];

  const { position } = useGeolocation();
  console.log({ position });

  return (
    <Stack className={styles.container}>
      <Map
        data={mapData}
        region={selectedRegion === ALL_REGIONS ? selectedContinent : selectedRegion}
      />
      <Stack gap={2}>
        <TravelSummary />
        <LastTrip />
      </Stack>
    </Stack>
  );
}

export default Home;
