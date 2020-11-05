import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actions from '../../store/actions';

import CountryBox from '../../components/CountryBox/CountryBox';
import './CountriesList.css';

function CountriesList() {
  const countriesBeen = useSelector((state) => state.countriesBeen);
  const isBackMocked = useSelector((state) => state.isBackMocked);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (countriesBeen.length === 0) {
      dispatch(actions.fetchCountriesBeen(isBackMocked));
    }
  }, []);

  const countrySelectedHandler = (countryName) => {
    history.push({ pathname: `/country/${countryName}` });
  };

  let countriesList = (
    <p style={{ textAlign: 'center' }}> Something went wrong! </p>
  );

  if (countriesBeen) {
    countriesList = countriesBeen.map((country) => {
      return (
        <CountryBox
          key={country.id}
          name={country.name.toUpperCase()}
          code={country.alpha2code}
          clicked={() => countrySelectedHandler(country.name)}
        />
      );
    });
  }

  return (
    <div className="Content">
      <h1>List of countries I've been to</h1>
      <section className="Countries"> {countriesList} </section>
    </div>
  );
}

export default CountriesList;
