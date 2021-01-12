import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  Grid,
} from '@material-ui/core';

import CONTINENTS_AND_REGIONS from '../../../constants/continentsAndRegions';
import { WORLD_MAP } from '../../../constants';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: 180,
  },
  formHelperText: {
    textAlign: 'right',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const { continent, setContinent, region, setRegion } = props;
  const classes = useStyles();

  const continentSelectedHandler = (event) => {
    setContinent(event.target.value);
    setRegion('all');
  };

  const regionSelectedHandler = (event) => {
    setRegion(event.target.value);
  };

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
    <Grid container direction="row" justify="center" alignItems="center">
      <FormControl className={classes.formControl}>
        <InputLabel id="continent-select-label">Continent</InputLabel>
        <Select
          labelId="continent-select-label"
          id="continent-select"
          value={continent}
          onChange={continentSelectedHandler}
        >
          {continentSelectOptions}
        </Select>
        <FormHelperText className={classes.formHelperText}>
          Continent to be shown
        </FormHelperText>
      </FormControl>

      <FormControl
        disabled={continent === WORLD_MAP}
        className={classes.formControl}
      >
        <InputLabel id="region-helper-label">Region</InputLabel>
        <Select
          labelId="region-helper-label"
          id="region-helper"
          value={region}
          onChange={regionSelectedHandler}
        >
          {regionSelectOptions}
        </Select>
        <FormHelperText className={classes.formHelperText}>
          Region to be shown
        </FormHelperText>
      </FormControl>
    </Grid>
  );
}
