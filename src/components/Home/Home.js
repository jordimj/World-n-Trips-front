import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { ALL_REGIONS, WORLD_MAP } from '../../constants';
import * as actions from '../../actions/actions';
import Map from '../Map/Map';
import Sidebar from '../UI/Sidebar/Sidebar';
import styles from './Home.module.css';

function Home() {
  const countriesBeen = useSelector((state) => state.countriesBeen);
  const { graduallyColored, selectedContinent, selectedRegion } = useSelector(
    (state) => state.worldMapConf
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (countriesBeen.length === 0) dispatch(actions.fetchCountriesBeen());
  }, []);

  const mapData = graduallyColored
    ? [
        ['Country', 'Number of spots'],
        ...countriesBeen.map((country) => [country.name, country.numberOfSpots]),
      ]
    : [['Country'], ...countriesBeen.map((country) => [country.name])];

  return (
    <Stack className={styles.container}>
      <Typography variant="h1">Countries I've been to</Typography>
      {countriesBeen && (
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
