import * as actionTypes from './actionTypes';

const initialState = {
    countriesBeen: [],
    error: false
};

const setCountries = (state, action) => {
    return {
        ...state,
        countriesBeen: action.countries,
    };
};

const fetchCountriesFailed = (state, action) => {
    return {
        ...state,
        error: true
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_COUNTRIES:
            return setCountries(state, action);
        case actionTypes.FETCH_COUNTRIES_FAILED:
            return fetchCountriesFailed(state, action);
        default:
            return state;
    }
};

export default reducer;