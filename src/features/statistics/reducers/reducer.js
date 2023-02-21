import * as actionTypes from '../types/actionTypes';

const initialState = {
  statistics: null,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_STATS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_STATS_SUCCESS:
      return {
        ...state,
        statistics: action.statistics,
        loading: false,
      };
    case actionTypes.FETCH_STATS_FAIL:
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
