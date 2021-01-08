import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actions from '../../store/actions';
import CountryBox from '../../components/CountryBox/CountryBox';
import SearchInput from '../../components/UI/SearchInput/SearchInput';
import styles from './CountriesList.module.css';

function CountriesList() {
  const countriesBeen = useSelector((state) => state.countriesBeen);
  const [keyword, setKeyword] = useState('');

  const filteredCountries = countriesBeen.filter((country) =>
    country.name.toLowerCase().includes(keyword)
  );

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

  let countriesList = (
    <p style={{ textAlign: 'center' }}> Something went wrong! </p>
  );

  if (countriesBeen) {
    countriesList = filteredCountries.map((country) => {
      return (
        <CountryBox
          key={country.id}
          name={country.name.toUpperCase()}
          code={country.alpha3code}
          onClick={() => countrySelectedHandler(country.alpha3code)}
        />
      );
    });
  }

  return (
    <div className="Content">
      <h1>List of countries I've been to</h1>
      <SearchInput placeholder="Filter by name" onChange={onInputChange} />
      <section className={styles.countries}>{countriesList}</section>
    </div>
  );
}

export default CountriesList;
