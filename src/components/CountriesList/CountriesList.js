import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actions from '../../actions/actions';
import CountryBox from './CountryBox/CountryBox';
import SearchInput from '../../components/UI/SearchInput/SearchInput';
import styles from './CountriesList.module.css';

function CountriesList() {
  const countriesBeen = useSelector((state) => state.countriesBeen);
  const loading = useSelector((state) => state.loading);
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (countriesBeen.length === 0) {
      dispatch(actions.fetchCountriesBeen());
    }
  }, []);

  const countrySelectedHandler = (countryName) => {
    history.push({ pathname: `/country/${countryName}/` });
  };

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  const filteredCountries = countriesBeen.filter((country) =>
    country.name.toLowerCase().includes(keyword)
  );

  const countriesList =
    countriesBeen.length === 0 && !loading ? (
      <p>Something went wrong!</p>
    ) : (
      filteredCountries.map((country) => (
        <CountryBox
          key={country.id}
          name={country.name.toUpperCase()}
          code={country.alpha3code}
          onClick={() => countrySelectedHandler(country.alpha3code)}
        />
      ))
    );

  return (
    <div className={styles.container}>
      <h1>List of countries I've been to</h1>
      <SearchInput placeholder="Filter by name" onChange={onInputChange} />
      <section className={styles.countries}>{countriesList}</section>
    </div>
  );
}

export default CountriesList;
