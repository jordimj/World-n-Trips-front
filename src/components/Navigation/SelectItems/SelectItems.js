import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Grid } from '@material-ui/core';

import countryAndRegionsInfo from '../../../utils/countryAndRegionsInfo';

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

  let continentSelectOptions = [];
  for (let continent in countryAndRegionsInfo) {
    continentSelectOptions.push(
      <MenuItem
        key={countryAndRegionsInfo[continent].name}
        value={countryAndRegionsInfo[continent].code}
      >
        {countryAndRegionsInfo[continent].name}
      </MenuItem>
    );
  }

  let regionSelectOptions = [
    <option key="all" value="all">
      All
    </option>,
  ];

  const continentCodes = {
    africa: '002',
    europe: '150',
    americas: '019', // [TODO] Check if there is a better map for America
    asia: '142',
    oceania: '009',
  };

  if (continent !== '000') {
    const key = Object.keys(continentCodes).filter((key) => {
      return continentCodes[key] === continent;
    })[0];

    regionSelectOptions.push(
      countryAndRegionsInfo[key].regions.map((region) => (
        <MenuItem key={region.name} value={region.code}>
          {region.name}
        </MenuItem>
      ))
    );
  }

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <FormControl className={classes.formControl}>
        <InputLabel id="continent-select-label">Continent</InputLabel>
        <Select
          labelId="continent-select-label"
          id="continent-select"
          value={continent}
          onChange={(e) => continentSelectedHandler(e)}
        >
          {continentSelectOptions}
        </Select>
        <FormHelperText className={classes.formHelperText}>
          Continent to be shown
        </FormHelperText>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="region-helper-label">Region</InputLabel>
        <Select
          labelId="region-helper-label"
          id="region-helper"
          value={region}
          onChange={(e) => regionSelectedHandler(e)}
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
