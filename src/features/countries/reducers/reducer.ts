import { ALL_REGIONS, WORLD_MAP } from '@/constants';
import { MapAction } from '../actions';
import * as actionTypes from '../types/actionTypes';

const initialState = {
  worldMapConf: {
    graduallyColored: false,
    selectedContinent: WORLD_MAP,
    selectedRegion: ALL_REGIONS,
  },
};

const reducer = (state = initialState, action: MapAction) => {
  switch (action.type) {
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
