import { ALL_REGIONS, WORLD_MAP } from '@/constants';
import * as actionTypes from '../types/actionTypes';

const initialState = {
  visited: [],
  country: null,
  worldMapConf: {
    graduallyColored: false,
    selectedContinent: WORLD_MAP,
    selectedRegion: ALL_REGIONS,
  },
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_VISITED_COUNTRIES_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_VISITED_COUNTRIES_SUCCESS:
      return {
        ...state,
        visited: action.countries,
        loading: false,
      };
    case actionTypes.FETCH_VISITED_COUNTRIES_FAIL:
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
      const { info, citiesVisited, statesVisited, ...statistics } =
        action.countryStatistics;

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
    case actionTypes.TOGGLE_GRADUAL_COLORING:
      return {
        ...state,
        worldMapConf: {
          ...state.worldMapConf,
          graduallyColored: !state.worldMapConf.graduallyColored,
        },
      };
    case actionTypes.SET_SELECTED_CONTINENT:
      return {
        ...state,
        worldMapConf: {
          ...state.worldMapConf,
          selectedContinent: action.continent,
          selectedRegion: ALL_REGIONS,
        },
      };
    case actionTypes.SET_SELECTED_REGION:
      return {
        ...state,
        worldMapConf: {
          ...state.worldMapConf,
          selectedRegion: action.region,
        },
      };
    default:
      return state;
  }
};

export default reducer;
