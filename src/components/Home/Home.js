import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ALL_REGIONS, WORLD_MAP } from '../../constants';
import * as actions from '../../store/actions';
import Map from '../Map/Map';
import SelectItems from '../UI/SelectItems/SelectItems';
import ColoredMapSwitch from '../UI/Switch/ColoredMapSwitch';
import styles from './Home.module.css';

function Home() {
  const countriesBeen = useSelector((state) => state.countriesBeen);
  const dispatch = useDispatch();

  useEffect(() => {
    if (countriesBeen.length === 0) {
      dispatch(actions.fetchCountriesBeen());
    }
  }, []);

  const [graduallyColored, setGraduallyColored] = useState(false);
  const [continent, setContinent] = useState(WORLD_MAP);
  const [region, setRegion] = useState(ALL_REGIONS);

  const coloredMapHandler = () => {
    setGraduallyColored((checked) => !checked);
  };

  const mapData = graduallyColored
    ? [
        ['Country', 'Number of spots'],
        ...countriesBeen.map((country) => [
          country.name,
          country.numberOfSpots,
        ]),
      ]
    : [['Country'], ...countriesBeen.map((country) => [country.name])];

  return (
    <div className={styles.container}>
      <h1>Countries I've been to</h1>
      <div className={styles.optionsContainer}>
        <SelectItems
          continent={continent}
          setContinent={setContinent}
          region={region}
          setRegion={setRegion}
        />
        <ColoredMapSwitch
          checked={graduallyColored}
          onChange={coloredMapHandler}
        />
      </div>
      {countriesBeen && (
        <Map
          data={mapData}
          region={region === ALL_REGIONS ? continent : region}
        />
      )}
    </div>
  );
}

export default Home;
