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

const fetchCountriesBeenSuccess = (countries) => {
  return {
    type: actionTypes.FETCH_COUNTRIES_BEEN_SUCCESS,
    countries,
  };
};

const fetchCountriesBeenFail = (error) => {
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

const fetchStatisticsStart = () => {
  return {
    type: actionTypes.FETCH_STATS_START,
  };
};

const fetchStatisticsSuccess = (statistics) => {
  return {
    type: actionTypes.FETCH_STATS_SUCCESS,
    statistics,
  };
};

const fetchStatisticsFail = (error) => {
  return {
    type: actionTypes.FETCH_STATS_FAIL,
    error,
  };
};

export const fetchStatistics = () => {
  return async (dispatch) => {
    dispatch(fetchStatisticsStart());

    try {
      const stats = await API.getStats();
      dispatch(fetchStatisticsSuccess(stats));
    } catch (e) {
      dispatch(fetchStatisticsFail(e));
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
        : await API.getCountryStats(countryName);
      dispatch(fetchCountryStatisticsSuccess(countryStats));
    } catch (e) {
      dispatch(fetchCountryStatisticsFail(e));
    }
  };
};

const fetchTripsStart = () => {
  return {
    type: actionTypes.FETCH_TRIPS_START,
  };
};

const fetchTripsSuccess = (trips) => {
  return {
    type: actionTypes.FETCH_TRIPS_SUCCESS,
    trips,
  };
};

const fetchTripsFail = (error) => {
  return {
    type: actionTypes.FETCH_TRIPS_FAIL,
    error,
  };
};

export const fetchTrips = () => {
  return async (dispatch) => {
    dispatch(fetchTripsStart());

    try {
      const trips = await API.getTrips();
      dispatch(fetchTripsSuccess(trips));
    } catch (e) {
      dispatch(fetchTripsFail(e));
    }
  };
};

const fetchJournalsStart = () => {
  return {
    type: actionTypes.FETCH_JOURNALS_START,
  };
};

const fetchJournalsSuccess = (journals) => {
  return {
    type: actionTypes.FETCH_JOURNALS_SUCCESS,
    journals,
  };
};

const fetchJournalsFail = (error) => {
  return {
    type: actionTypes.FETCH_JOURNALS_FAIL,
    error,
  };
};

export const fetchJournals = (tripId) => {
  return async (dispatch) => {
    dispatch(fetchJournalsStart());

    try {
      const journals = await API.getJournals(tripId);
      dispatch(fetchJournalsSuccess(journals));
    } catch (e) {
      dispatch(fetchJournalsFail(e));
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
