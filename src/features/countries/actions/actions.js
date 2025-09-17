import { getVisitedCountries } from '@/api';
import { visitedCountriesMock } from '../__mocks__/visitedCountriesMock';
import * as actionTypes from '../types/actionTypes';

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
