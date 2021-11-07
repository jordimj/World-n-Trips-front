import React from 'react';
import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
} from '@material-ui/core';

import CONTINENTS_AND_REGIONS from '../../../constants/continentsAndRegions';
import { WORLD_MAP } from '../../../constants';
import styles from './SelectItems.module.css';

export default function SimpleSelect(props) {
  const { continent, setContinent, region, setRegion } = props;

  const continentSelectedHandler = (event) => {
    setContinent(event.target.value);
    setRegion('all');
  };

  const regionSelectedHandler = (event) => setRegion(event.target.value);

  const continentSelectOptions = CONTINENTS_AND_REGIONS.map((continent) => (
    <MenuItem key={continent.name} value={continent.code}>
      {continent.name}
    </MenuItem>
  ));

  const regionSelectOptions =
    continent === WORLD_MAP
      ? [
          <MenuItem key="all" value="all">
            All
          </MenuItem>,
        ]
      : [
          <MenuItem key="all" value="all">
            All
          </MenuItem>,
          ...CONTINENTS_AND_REGIONS.find(
            (cont) => cont.code === continent
          ).regions.map((region) => (
            <MenuItem key={region.name} value={region.code}>
              {region.name}
            </MenuItem>
          )),
        ];

  return (
    <>
      <FormControl className={styles.root}>
        <InputLabel id="continent-select-label" className={styles.text}>
          Continent
        </InputLabel>
        <Select
          labelId="continent-select-label"
          id="continent-select"
          className={styles.select}
          value={continent}
          onChange={continentSelectedHandler}
        >
          {continentSelectOptions}
        </Select>
        <FormHelperText className={styles.formHelperText}>
          Continent to be shown
        </FormHelperText>
      </FormControl>

      <FormControl disabled={continent === WORLD_MAP} className={styles.root}>
        <InputLabel id="region-helper-label" className={styles.text}>
          Region
        </InputLabel>
        <Select
          labelId="region-helper-label"
          id="region-helper"
          className={styles.select}
          value={region}
          onChange={regionSelectedHandler}
        >
          {regionSelectOptions}
        </Select>
        <FormHelperText className={styles.formHelperText}>
          Region to be shown
        </FormHelperText>
      </FormControl>
    </>
  );
}
