import axios from '../axios';
import * as actionTypes from './actionTypes';
import countriesBeenMocked from '../mock/countriesBeenMock';
import countryInfoWithStatisticsMock from '../mock/countryInfoWithStatisticsMock';

const fetchCountriesBeenStart = () => {
  return {
    type: actionTypes.FETCH_COUNTRIES_BEEN_START,
  };
};

export const fetchCountriesBeenSuccess = (countries) => {
  return {
    type: actionTypes.FETCH_COUNTRIES_BEEN_SUCCESS,
    countries,
  };
};

export const fetchCountriesBeenFail = (error) => {
  return {
    type: actionTypes.FETCH_COUNTRIES_BEEN_FAIL,
    error,
  };
};

export const fetchCountriesBeen = (isBackMocked) => {
  return (dispatch) => {
    dispatch(fetchCountriesBeenStart());

    isBackMocked
      ? dispatch(fetchCountriesBeenSuccess(countriesBeenMocked))
      : axios
          .get('/countriesBeenTo')
          .then((response) => {
            dispatch(fetchCountriesBeenSuccess(response.data));
          })
          .catch((error) => {
            dispatch(fetchCountriesBeenFail(error));
          });
  };
};

export const fetchCountryStatisticsStart = () => {
  return {
    type: actionTypes.FETCH_COUNTRY_STATS_START,
  };
};

export const fetchCountryStatisticsSuccess = (countryStatistics) => {
  return {
    type: actionTypes.FETCH_COUNTRY_STATS_SUCCESS,
    countryStatistics,
  };
};

export const fetchCountryStatisticsFail = (error) => {
  return {
    type: actionTypes.FETCH_COUNTRY_STATS_FAIL,
    error,
  };
};

export const fetchCountryStatistics = (countryName, isBackMocked) => {
  return (dispatch) => {
    dispatch(fetchCountryStatisticsStart());
    isBackMocked
      ? dispatch(fetchCountryStatisticsSuccess(countryInfoWithStatisticsMock))
      : axios
          .get(`/statistics/${countryName}/`)
          .then((response) => {
            dispatch(fetchCountryStatisticsSuccess(response.data));
          })
          .catch((error) => {
            dispatch(fetchCountryStatisticsFail(error));
          });
  };
};
