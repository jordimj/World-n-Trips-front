import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import { Grid } from '@material-ui/core';

import Map from '../../components/Map/Map';
import './MapPage.css';
import SelectItems from '../../components/UI/SelectItems/SelectItems';
import ColoredMapSwitch from '../../components/UI/Switch/ColoredMapSwitch';

function MapPage() {
  const countriesBeen = useSelector((state) => state.countriesBeen);

  const dispatch = useDispatch();

  useEffect(() => {
    if (countriesBeen.length === 0) {
      dispatch(actions.fetchCountriesBeen());
    }
  }, []);

  const [graduallyColored, setGraduallyColored] = useState(false);
  const [continent, setContinent] = useState('000');
  const [region, setRegion] = useState('all');

  const coloredMapHandler = () => {
    setGraduallyColored((checked) => !checked);
  };

  let mapData = [];

  if (graduallyColored) {
    mapData = [
      ['Country', 'Number of spots'],
      ...countriesBeen.map((country) => [
        country.name,
        Number(country.numberOfSpots),
      ]),
    ];
  } else {
    mapData = [['Country'], ...countriesBeen.map((country) => [country.name])];
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
        <ColoredMapSwitch
          checked={graduallyColored}
          onChange={coloredMapHandler}
        />
        {countriesBeen && (
          <Map data={mapData} region={region !== 'all' ? region : continent} />
        )}
      </Grid>
    </div>
  );
}

export default MapPage;
