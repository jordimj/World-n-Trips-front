import * as actionTypes from "./actionTypes";

const initialState = {
	countriesBeen: [],
	continent: "000",
	region: "all",
	error: false,
	isBackMocked: true
};

const setCountries = (state, action) => {
	return {
		...state,
		countriesBeen: action.countries,
		error: false
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
		case actionTypes.SELECT_CONTINENT:
			return {
				...state,
				continent: action.continent,
				region: "all"
			};
		case actionTypes.SELECT_REGION:
			return {
				...state,
				region: action.region
			};
		default:
			return state;
	}
};

export default reducer;
