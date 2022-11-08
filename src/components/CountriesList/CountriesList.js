import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import * as actions from '../../actions/actions';
import CountryBox from './CountryBox/CountryBox';
import SearchInput from '../../components/UI/SearchInput/SearchInput';
import styles from './CountriesList.module.css';

function CountriesList() {
  const countriesBeen = useSelector((state) => state.countriesBeen);
  const loading = useSelector((state) => state.loading);
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (countriesBeen.length === 0) dispatch(actions.fetchCountriesBeen());
  }, []);

  const countrySelectedHandler = (countryName) => navigate(`/country/${countryName}/`);

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  const filteredCountries = countriesBeen.filter((country) =>
    country.name.toLowerCase().includes(keyword)
  );

  const countriesList =
    countriesBeen.length === 0 && !loading ? (
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
    );

  return (
    <Fragment>
      <Typography variant="h1">List of countries I've been to</Typography>
      <SearchInput placeholder="Filter by name" onChange={onInputChange} />
      <section className={styles.countries}>{countriesList}</section>
    </Fragment>
  );
}

export default CountriesList;
