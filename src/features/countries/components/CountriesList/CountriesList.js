import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Checkbox,
  ListItemText,
  ListSubheader,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import * as actions from '../../actions/actions';
import CountryBox from './CountryBox/CountryBox';
import SearchInput from '../SearchInput/SearchInput';
import Select from '../../../../template/components/Select/Select';
import { DATABASE_REGIONS } from '../../../../constants/continentsAndRegions';
import styles from './CountriesList.module.css';

function CountriesList() {
  const visitedCountries = useSelector((state) => state.countries.visited);
  const loading = useSelector((state) => state.countries.loading);

  const [selectedContinents, setSelectedContinents] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [keyword, setKeyword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (visitedCountries.length === 0) dispatch(actions.fetchVisitedCountries());
  }, []);

  const countrySelectedHandler = (countryName) => navigate(`/country/${countryName}/`);

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  const onContinentChange = (e) =>
    setSelectedContinents(
      typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value
    );

  const onRegionChange = (e) =>
    setSelectedRegions(
      typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value
    );

  const filteredCountries = visitedCountries.filter((country) => {
    if (selectedContinents.length === 0 && selectedRegions.length === 0)
      return country.name.toLowerCase().includes(keyword);

    if (selectedContinents.length > 0 && selectedRegions.length === 0)
      return (
        country.name.toLowerCase().includes(keyword) &&
        selectedContinents.includes(country.continent)
      );

    return (
      country.name.toLowerCase().includes(keyword) &&
      selectedRegions.includes(country.region)
    );
  });

  return (
    <Fragment>
      <Typography variant="h1">Countries I've been to</Typography>
      <Stack direction="row" gap={3} sx={{ m: 5 }}>
        <Select.Multiple
          label="Continent"
          value={selectedContinents}
          onChange={onContinentChange}
        >
          {Object.keys(DATABASE_REGIONS).map((region) => (
            <MenuItem key={region} value={region}>
              <Checkbox checked={selectedContinents.indexOf(region) > -1} />
              <ListItemText primary={region} />
            </MenuItem>
          ))}
        </Select.Multiple>
        <Select.Multiple
          label="Region"
          value={selectedRegions}
          onChange={onRegionChange}
          disabled={selectedContinents.length === 0}
        >
          {selectedContinents
            .map((continent) => [
              <ListSubheader key={continent}>{continent}</ListSubheader>,
              DATABASE_REGIONS[continent].map((region) => (
                <MenuItem key={region} value={region}>
                  <Checkbox checked={selectedRegions.indexOf(region) > -1} />
                  <ListItemText primary={region} />
                </MenuItem>
              )),
            ])
            .flat()}
        </Select.Multiple>
        <SearchInput placeholder="Filter by name" onChange={onInputChange} />
      </Stack>
      <section className={styles.countries}>
        {visitedCountries.length === 0 && !loading ? (
          <Typography>Something went wrong!</Typography>
        ) : (
          filteredCountries.map((country) => (
            <CountryBox
              key={country.alpha3code}
              name={country.name.toUpperCase()}
              code={country.alpha3code}
              onClick={() => countrySelectedHandler(country.alpha3code)}
            />
          ))
        )}
      </section>
    </Fragment>
  );
}

export default CountriesList;
