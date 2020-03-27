import axios from "../axios";
import * as actionTypes from "./actionTypes";
import countriesBeenMocked from "../mock/countriesBeenMock";

export const setCountries = countries => {
	return {
		type: actionTypes.SET_COUNTRIES,
		countries
	};
};

export const fetchCountriesFailed = error => {
	console.log(error);
	return {
		type: actionTypes.FETCH_COUNTRIES_FAILED
	};
};

export const initCountries = isBackMocked => {
	return isBackMocked
		? dispatch => dispatch(setCountries(countriesBeenMocked))
		: dispatch => {
				axios
					.get("http://127.0.0.1:8000/countriesBeenTo")
					.then(response => {
						dispatch(setCountries(response.data));
					})
					.catch(error => {
						dispatch(fetchCountriesFailed(error));
					});
		  };
};

export const selectContinent = continent => {
	return {
		type: actionTypes.SELECT_CONTINENT,
		continent
	};
};

export const selectRegion = region => {
	return {
		type: actionTypes.SELECT_REGION,
		region
	};
};
