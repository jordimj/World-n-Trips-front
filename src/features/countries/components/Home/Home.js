import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { ALL_REGIONS } from '../../../../constants';
import * as actions from '../../actions/actions';
import Map from '../Map/Map';
import Sidebar from '../Sidebar/Sidebar';
import styles from './Home.module.css';

function Home() {
  const visitedCountries = useSelector((state) => state.countries.visited);

  const { graduallyColored, selectedContinent, selectedRegion } = useSelector(
    (state) => state.countries.worldMapConf
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (visitedCountries.length === 0) dispatch(actions.fetchVisitedCountries());
  }, []);

  const mapData = graduallyColored
    ? [
        ['Country', 'Number of spots'],
        ...visitedCountries.map((country) => [country.name, country.numberOfSpots]),
      ]
    : [['Country'], ...visitedCountries.map((country) => [country.name])];

  return (
    <Stack className={styles.container}>
      <Typography variant="h1">Countries I've been to</Typography>
      {visitedCountries && (
        <Map
          data={mapData}
          region={selectedRegion === ALL_REGIONS ? selectedContinent : selectedRegion}
        />
      )}
      <Sidebar />
    </Stack>
  );
}

export default Home;
