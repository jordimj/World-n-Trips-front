import * as API from '../api/api';
import * as actionTypes from '../types/actionTypes';
import { countriesBeenMock } from '../__mocks__/countriesBeenMock';
import { countryStatsMock } from '../__mocks__/countryStatsMock';

const isBackMocked = process.env.REACT_APP_IS_BACKEND_MOCKED === 'true';

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

export const fetchCountriesBeen = () => {
  return async (dispatch) => {
    dispatch(fetchCountriesBeenStart());

    try {
      const countriesBeen = isBackMocked
        ? countriesBeenMock
        : await API.getCountriesBeen();

      dispatch(fetchCountriesBeenSuccess(countriesBeen));
    } catch (e) {
      dispatch(fetchCountriesBeenFail(e));
    }
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

export const fetchCountryStatistics = (countryName) => {
  return async (dispatch) => {
    dispatch(fetchCountryStatisticsStart());

    try {
      const countryStats = isBackMocked
        ? countryStatsMock
        : await API.getCountryStats(countryName);
      dispatch(fetchCountryStatisticsSuccess(countryStats));
    } catch (e) {
      dispatch(fetchCountryStatisticsFail(e));
    }
  };
};

export const toggleGradualColoring = () => {
  return {
    type: actionTypes.TOGGLE_GRADUAL_COLORING,
  };
};

export const setSelectedContinent = (continent) => {
  return {
    type: actionTypes.SET_SELECTED_CONTINENT,
    continent,
  };
};

export const setSelectedRegion = (region) => {
  return {
    type: actionTypes.SET_SELECTED_REGION,
    region,
  };
};
