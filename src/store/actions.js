import axios from "../axios";
import * as actionTypes from "./actionTypes";

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

export const initCountries = () => {
    return dispatch => {
        axios
            .get('http://127.0.0.1:8000/countriesBeenTo')
            .then(response => {
                dispatch(setCountries(response.data));
            })
            .catch(error => {
                dispatch(fetchCountriesFailed(error));
            });
    };
};
