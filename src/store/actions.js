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
					.get("/countriesBeenTo")
					.then(response => {
						dispatch(setCountries(response.data));
					})
					.catch(error => {
						dispatch(fetchCountriesFailed(error));
					});
		  };
};

export const setCountryInfo = countryInfo => {
	return {
		type: actionTypes.SET_COUNTRY_INFO,
		countryInfo
	};
};

export const getCountryInfo = (countryName, isBackMocked) => {
	return isBackMocked
		? dispatch => dispatch(setCountryInfo(countriesBeenMocked)) // [TODO] mock
		: dispatch => {
				axios
					.get(`/countryByName/${countryName}/`)
					.then(response => {
						dispatch(setCountryInfo(response.data));
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
