import * as actionTypes from '../types/actionTypes';

const initialState = {
  countriesBeen: [],
  country: null,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_COUNTRIES_BEEN_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_COUNTRIES_BEEN_SUCCESS:
      return {
        ...state,
        countriesBeen: action.countries,
        loading: false,
      };
    case actionTypes.FETCH_COUNTRIES_BEEN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.FETCH_COUNTRY_STATS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_COUNTRY_STATS_SUCCESS:
      const {
        info,
        citiesVisited,
        statesVisited,
        ...statistics
      } = action.countryStatistics;

      return {
        ...state,
        country: { info, citiesVisited, statesVisited, statistics },
        loading: false,
      };
    case actionTypes.FETCH_COUNTRY_STATS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
