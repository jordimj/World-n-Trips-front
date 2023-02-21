import * as actionTypes from '../types/actionTypes';

const initialState = {
  journals: [],
  trips: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_JOURNALS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_JOURNALS_SUCCESS:
      return {
        ...state,
        journals: action.journals,
        loading: false,
      };
    case actionTypes.FETCH_JOURNALS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.FETCH_TRIPS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_TRIPS_SUCCESS:
      return {
        ...state,
        trips: action.trips,
        loading: false,
      };
    case actionTypes.FETCH_TRIPS_FAIL:
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
