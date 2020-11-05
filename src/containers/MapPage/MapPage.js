import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import { Grid } from '@material-ui/core';

import Map from '../../components/Map/Map';
import './MapPage.css';
import SelectItems from '../../components/Navigation/SelectItems/SelectItems';
import SwitchWithLabel from '../../components/shared/SwitchWithLabel';

function MapPage() {
  const countriesBeen = useSelector((state) => state.countriesBeen);
  const isBackMocked = useSelector((state) => state.isBackMocked);

  const dispatch = useDispatch();

  useEffect(() => {
    if (countriesBeen.length === 0) {
      dispatch(actions.fetchCountriesBeen(isBackMocked));
    }
  }, []);

  const [graduallyColored, setGraduallyColored] = useState(false);
  const [continent, setContinent] = useState('000');
  const [region, setRegion] = useState('all');

  const coloredMapHandler = () => {
    setGraduallyColored((graduallyColored) => !graduallyColored);
  };

  let mapData = [];

  if (graduallyColored) {
    mapData = countriesBeen.map((country) => [
      country.name,
      Number(country.numberOfSpots),
    ]);
    mapData.unshift(['Country', 'Number of spots']);
  } else {
    mapData = countriesBeen.map((country) => [country.name]);
    mapData.unshift(['Country']);
  }

  return (
    <div className="Content">
      <h1>Countries I've been to</h1>
      <Grid container direction="column" justify="center" alignItems="center">
        <SelectItems
          continent={continent}
          setContinent={setContinent}
          region={region}
          setRegion={setRegion}
        />
        <SwitchWithLabel onChange={coloredMapHandler} />
        {countriesBeen && (
          <Map data={mapData} region={region !== 'all' ? region : continent} />
        )}
      </Grid>
    </div>
  );
}

export default MapPage;
