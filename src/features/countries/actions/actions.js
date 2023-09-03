import { getVisitedCountries, getCountryStats } from '@/api';
import * as actionTypes from '../types/actionTypes';
import { visitedCountriesMock } from '../__mocks__/visitedCountriesMock';
import { countryStatsMock } from '../__mocks__/countryStatsMock';

const isBackMocked = import.meta.env.VITE_IS_BACKEND_MOCKED === 'true';

const fetchVisitedCountriesStart = () => {
  return {
    type: actionTypes.FETCH_VISITED_COUNTRIES_START,
  };
};

const fetchVisitedCountriesSuccess = (countries) => {
  return {
    type: actionTypes.FETCH_VISITED_COUNTRIES_SUCCESS,
    countries,
  };
};

const fetchVisitedCountriesFail = (error) => {
  return {
    type: actionTypes.FETCH_VISITED_COUNTRIES_FAIL,
    error,
  };
};

export const fetchVisitedCountries = () => {
  return async (dispatch) => {
    dispatch(fetchVisitedCountriesStart());

    try {
      const visitedCountries = isBackMocked
        ? visitedCountriesMock
        : await getVisitedCountries();

      dispatch(fetchVisitedCountriesSuccess(visitedCountries));
    } catch (e) {
      dispatch(fetchVisitedCountriesFail(e));
    }
  };
};

const fetchCountryStatisticsStart = () => {
  return {
    type: actionTypes.FETCH_COUNTRY_STATS_START,
  };
};

const fetchCountryStatisticsSuccess = (countryStatistics) => {
  return {
    type: actionTypes.FETCH_COUNTRY_STATS_SUCCESS,
    countryStatistics,
  };
};

const fetchCountryStatisticsFail = (error) => {
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
        : await getCountryStats(countryName);
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
